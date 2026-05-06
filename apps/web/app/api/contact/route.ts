import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const INQUIRY_FROM = process.env.INQUIRY_FROM ?? "onboarding@resend.dev";
const INQUIRY_TO = process.env.INQUIRY_TO ?? "hello@creativekat.studio";

const TOPICS = new Set(["collab", "theme", "feedback", "press", "hi"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Per-topic subject line — short, lowercase, scannable in a single inbox.
 * Filterable by sender (no [tag] prefix needed). */
function buildSubject(topic: string, name: string) {
  switch (topic) {
    case "collab":
      return `collab · ${name}`;
    case "theme":
      return `theme request · ${name}`;
    case "feedback":
      return `feedback · ${name}`;
    case "press":
      return `press inquiry · ${name}`;
    case "hi":
      return `${name} says hi`;
    default:
      return `inquiry · ${name}`;
  }
}

const lastHit = new Map<string, number>();
const RATE_LIMIT_MS = 30_000;

function clean(s: unknown, max: number) {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  if (!RESEND_API_KEY) {
    console.error("RESEND_API_KEY missing");
    return NextResponse.json({ error: "Mail service not configured." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const name = clean(b.name, 200);
  const email = clean(b.email, 320);
  const topic = clean(b.topic, 40);
  const topicLabel = clean(b.topicLabel, 100) || topic;
  const message = clean(b.message, 5000);
  const honey = clean(b.website, 200);

  // Honeypot — silent success so bots don't learn they were caught.
  if (honey) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }
  if (!TOPICS.has(topic)) {
    return NextResponse.json({ error: "Unknown topic." }, { status: 400 });
  }

  // Best-effort rate limit by IP.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const now = Date.now();
  const prev = lastHit.get(ip) ?? 0;
  if (now - prev < RATE_LIMIT_MS) {
    return NextResponse.json({ error: "Please wait a moment before sending another." }, { status: 429 });
  }
  lastHit.set(ip, now);

  const subject = buildSubject(topic, name);
  const sentAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });

  const text = [
    `New inquiry · disenio.studio`,
    ``,
    `From:  ${name} <${email}>`,
    `Topic: ${topicLabel}`,
    `Sent:  ${sentAt} UTC`,
    `IP:    ${ip}`,
    ``,
    `─────────────────────────────`,
    ``,
    message,
    ``,
    `─────────────────────────────`,
    `Reply directly to this email — replies go to ${email}.`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <title>${escape(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,system-ui,sans-serif;color:#0a0b10;">
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">
      ${escape(name)} (${escape(email)}): ${escape(message.slice(0, 90))}…
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f5f9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 1px 0 rgba(15,18,32,0.04),0 18px 50px -24px rgba(15,18,32,0.18);">
            <!-- Brand bar -->
            <tr>
              <td style="height:6px;background:linear-gradient(135deg,#b27bff 0%,#6d4cf2 50%,#2f5dff 100%);line-height:6px;font-size:6px;">&nbsp;</td>
            </tr>

            <!-- Header -->
            <tr>
              <td style="padding:28px 32px 8px 32px;">
                <p style="margin:0 0 4px 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8a90a3;">
                  New inquiry · disenio.studio
                </p>
                <h1 style="margin:0;font-size:22px;line-height:1.25;letter-spacing:-0.01em;color:#0a0b10;font-weight:600;">
                  ${escape(topicLabel)}
                </h1>
              </td>
            </tr>

            <!-- From card -->
            <tr>
              <td style="padding:16px 32px 0 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f9fc;border:1px solid #e6e8f0;border-radius:10px;">
                  <tr>
                    <td style="padding:14px 16px;">
                      <p style="margin:0 0 4px 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#8a90a3;">
                        From
                      </p>
                      <p style="margin:0;font-size:15px;line-height:1.5;color:#0a0b10;">
                        <strong style="font-weight:600;">${escape(name)}</strong>
                        <span style="color:#6b7186;"> · </span>
                        <a href="mailto:${escape(email)}" style="color:#6d4cf2;text-decoration:none;">${escape(email)}</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:20px 32px 0 32px;">
                <p style="margin:0 0 8px 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:10px;letter-spacing:0.16em;text-transform:uppercase;color:#8a90a3;">
                  Message
                </p>
                <div style="font-size:15px;line-height:1.6;color:#1a1c26;white-space:pre-wrap;">${escape(message)}</div>
              </td>
            </tr>

            <!-- Reply CTA -->
            <tr>
              <td style="padding:24px 32px 8px 32px;">
                <a href="mailto:${escape(email)}?subject=${encodeURIComponent("Re: " + subject)}"
                   style="display:inline-block;background:linear-gradient(135deg,#b27bff 0%,#6d4cf2 50%,#2f5dff 100%);color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:11px 18px;border-radius:9999px;">
                  Reply to ${escape(name)} →
                </a>
                <p style="margin:10px 0 0 0;font-size:12px;color:#8a90a3;">
                  Or just hit reply in your mail client — it's wired to <strong style="color:#6b7186;font-weight:600;">${escape(email)}</strong>.
                </p>
              </td>
            </tr>

            <!-- Meta footer -->
            <tr>
              <td style="padding:24px 32px 28px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #ececf3;">
                  <tr>
                    <td style="padding-top:14px;">
                      <p style="margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#a4a9bc;">
                        ${escape(sentAt)} UTC &nbsp;·&nbsp; topic: ${escape(topic)} &nbsp;·&nbsp; ip: ${escape(ip)}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Outer attribution -->
          <p style="margin:18px 0 0 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#a4a9bc;">
            disenio.studio · a creativekat.studio project
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  // Auto-reply to the sender confirming receipt — branded as CreativeKat Studio.
  const firstName = name.split(" ")[0] || name;
  const confirmSubject = "We got your note · CreativeKat Studio";
  const confirmText = [
    `— WE GOT IT`,
    ``,
    `Thanks, ${firstName} — your note landed safely.`,
    ``,
    `We read every message that comes through here. Expect a reply within 1–3 business days, usually sooner.`,
    ``,
    `In the meantime, feel free to take a look around the studio:`,
    `· disenio.studio  — copy-paste design toolkit`,
    `· creativekat.studio — small, careful digital products`,
    ``,
    `— YOUR MESSAGE`,
    ``,
    message,
    ``,
    `Just hit reply if you forgot to add something — this thread will route to us directly.`,
    ``,
    `─────────────────────────────`,
    `EST. 2026 — SMALL, CAREFUL DIGITAL PRODUCTS.`,
    `creativekat.studio · ${INQUIRY_TO}`,
  ].join("\n");

  const confirmHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <title>${escape(confirmSubject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,system-ui,sans-serif;color:#0a0b10;">
    <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">
      Your note landed safely. We reply within 1–3 business days, usually sooner.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f5f9;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #ececf3;border-radius:16px;overflow:hidden;">

            <!-- Brand -->
            <tr>
              <td style="padding:24px 32px 20px 32px;border-bottom:1px solid #ececf3;">
                <div style="font-size:20px;font-weight:600;letter-spacing:-0.025em;color:#0a0b10;">
                  creativekat<span style="background:linear-gradient(135deg,#b27bff 0%,#6d4cf2 50%,#2f5dff 100%);-webkit-background-clip:text;background-clip:text;color:transparent;">.studio</span>
                </div>
              </td>
            </tr>

            <!-- Eyebrow + headline -->
            <tr>
              <td style="padding:24px 32px 0 32px;">
                <p style="margin:0 0 8px 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8a90a3;">
                  — We got it
                </p>
                <h1 style="margin:0 0 14px 0;font-size:24px;line-height:1.25;letter-spacing:-0.015em;color:#0a0b10;font-weight:600;">
                  Thanks, ${escape(firstName)} — your note landed safely.
                </h1>
                <p style="margin:0 0 12px 0;font-size:15px;line-height:1.6;color:#3a3e4d;">
                  We read every message that comes through here. Expect a reply within <strong style="color:#0a0b10;font-weight:600;">1–3 business days</strong>, usually sooner.
                </p>
                <p style="margin:0 0 16px 0;font-size:15px;line-height:1.6;color:#3a3e4d;">
                  In the meantime, feel free to take a look around the studio:
                </p>
              </td>
            </tr>

            <!-- Pill links -->
            <tr>
              <td style="padding:0 32px 4px 32px;">
                <a href="https://disenio.studio" style="display:inline-block;padding:9px 16px;margin:0 6px 8px 0;border:1px solid #d8dbe6;border-radius:9999px;font-size:13px;color:#0a0b10;text-decoration:none;font-weight:500;">
                  disenio.studio ↗
                </a>
                <a href="https://creativekat.studio" style="display:inline-block;padding:9px 16px;margin:0 6px 8px 0;border:1px solid #d8dbe6;border-radius:9999px;font-size:13px;color:#0a0b10;text-decoration:none;font-weight:500;">
                  creativekat.studio ↗
                </a>
              </td>
            </tr>

            <!-- Your message -->
            <tr>
              <td style="padding:20px 32px 0 32px;">
                <p style="margin:0 0 8px 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8a90a3;">
                  — Your message
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f9fc;border:1px solid #e6e8f0;border-radius:10px;">
                  <tr>
                    <td style="padding:14px 16px;">
                      <div style="font-size:14px;line-height:1.6;color:#1a1c26;white-space:pre-wrap;">${escape(message)}</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Reply note -->
            <tr>
              <td style="padding:18px 32px 22px 32px;">
                <p style="margin:0;font-size:14px;line-height:1.6;color:#6b7186;">
                  Just hit reply if you forgot to add something — this thread will route to us directly.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:0 32px 26px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #ececf3;">
                  <tr>
                    <td style="padding-top:18px;">
                      <p style="margin:0 0 6px 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#0a0b10;font-weight:500;">
                        Est. 2026 — small, careful digital products.
                      </p>
                      <p style="margin:0;font-size:13px;color:#6b7186;">
                        <a href="https://creativekat.studio" style="color:#6b7186;text-decoration:none;">creativekat.studio</a>
                        &nbsp;·&nbsp;
                        <a href="mailto:${escape(INQUIRY_TO)}" style="color:#6b7186;text-decoration:none;">${escape(INQUIRY_TO)}</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  try {
    const resend = new Resend(RESEND_API_KEY);

    // 1. Notification to inbox (must succeed).
    const { error } = await resend.emails.send({
      from: INQUIRY_FROM,
      to: INQUIRY_TO,
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("resend admin error", error);
      return NextResponse.json({ error: "Mail provider rejected the message." }, { status: 502 });
    }

    // 2. Auto-reply to the sender (best-effort — don't fail the request if this errors).
    try {
      await resend.emails.send({
        from: INQUIRY_FROM,
        to: email,
        replyTo: INQUIRY_TO,
        subject: confirmSubject,
        text: confirmText,
        html: confirmHtml,
      });
    } catch (confirmErr) {
      console.error("confirmation send failed (non-fatal)", confirmErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route failed", err);
    return NextResponse.json({ error: "Something broke on our end." }, { status: 500 });
  }
}
