import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "../_lib/og";

export const runtime = "edge";
export const alt = "Changelog · disenio.studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOg({
    eyebrow: "Changelog",
    title: <span>What&apos;s shipped, when.</span>,
    tagline:
      "disenio.studio is built in the open. Every release lands here with notes and a date.",
    meta: ["built in the open"],
  });
}
