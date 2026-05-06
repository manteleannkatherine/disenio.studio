import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const INQUIRY_FROM = process.env.INQUIRY_FROM ?? "onboarding@resend.dev";
const INQUIRY_TO = process.env.INQUIRY_TO ?? "hello@creativekat.studio";

const TOPICS = new Set(["collab", "theme", "feedback", "press", "hi"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const subject = `[disenio.studio] ${topicLabel} — ${name}`;
  const text = `From: ${name} <${email}>\nTopic: ${topicLabel}\nIP: ${ip}\n\n${message}`;
  const html = `
    <div style="font-family:ui-sans-serif,system-ui;line-height:1.55;color:#0a0b10">
      <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#6b7186">
        New inquiry · disenio.studio
      </p>
      <h2 style="margin:0 0 8px;font-size:20px">${escape(topicLabel)}</h2>
      <p style="margin:0 0 4px"><strong>${escape(name)}</strong> &lt;${escape(email)}&gt;</p>
      <p style="margin:0 0 16px;font-size:12px;color:#6b7186">IP: ${escape(ip)}</p>
      <hr style="border:none;border-top:1px solid #e6e8f0;margin:16px 0" />
      <pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;margin:0">${escape(message)}</pre>
    </div>
  `;

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: INQUIRY_FROM,
      to: INQUIRY_TO,
      replyTo: `${name} <${email}>`,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("resend error", error);
      return NextResponse.json({ error: "Mail provider rejected the message." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route failed", err);
    return NextResponse.json({ error: "Something broke on our end." }, { status: 500 });
  }
}
