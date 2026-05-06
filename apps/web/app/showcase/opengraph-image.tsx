import { renderOg, OG_SIZE, OG_CONTENT_TYPE } from "../_lib/og";

export const runtime = "edge";
export const alt = "Showcase · disenio.studio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function OgImage() {
  return renderOg({
    eyebrow: "Showcase",
    title: (
      <>
        <span>Made with the toolkit.</span>
        <span
          style={{
            background:
              "linear-gradient(135deg, #b27bff 0%, #6d4cf2 50%, #2f5dff 100%)",
            backgroundClip: "text",
            color: "transparent",
            fontStyle: "italic",
          }}
        >
          Or about to be.
        </span>
      </>
    ),
    tagline:
      "Real projects shipping with disenio.studio. One live, one in progress, an open slot for what's next.",
  });
}
