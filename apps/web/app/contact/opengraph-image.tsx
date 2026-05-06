import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "../_lib/og";

export const runtime = "edge";
export const alt = "Contact · disenio.studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOg({
    eyebrow: "Contact",
    title: <span>Let&apos;s build something.</span>,
    tagline:
      "Collab, custom themes, feedback, or just to say hi. A real human reads every message.",
    meta: ["hello@creativekat.studio"],
  });
}
