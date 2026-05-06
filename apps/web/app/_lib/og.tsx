/* Shared Open Graph renderer.
 * Each route's opengraph-image.tsx wraps `renderOg` with its own copy.
 * Visual: 1200×630, dark paper, accent gradient blob, brand mark, eyebrow → title → tagline. */
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export type OgInput = {
  eyebrow?: string;
  title: string | React.ReactNode;
  tagline?: string;
  /** Mono caps row at the bottom (e.g. "13 components · 9 pairs · 6 feels"). */
  meta?: string[];
};

export function renderOg({ eyebrow, title, tagline, meta }: OgInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0b10",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          color: "#f6f7fb",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Accent gradient blob */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #6d4cf2 0%, #2f5dff 40%, transparent 70%)",
            opacity: 0.55,
          }}
        />

        {/* Brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 64 64">
            <defs>
              <linearGradient
                id="og-grad"
                x1="0"
                y1="0"
                x2="64"
                y2="64"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#b27bff" />
                <stop offset="50%" stopColor="#6d4cf2" />
                <stop offset="100%" stopColor="#2f5dff" />
              </linearGradient>
            </defs>
            <path
              d="M14 8 H30 A26 26 0 0 1 30 56 H14 V44 H30 A14 14 0 0 0 30 20 H14 Z"
              fill="url(#og-grad)"
            />
            <circle cx="14" cy="44" r="8" fill="#a875ff" />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: "-0.04em",
            }}
          >
            <span>disenio</span>
            <span
              style={{
                background:
                  "linear-gradient(135deg, #b27bff 0%, #6d4cf2 50%, #2f5dff 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              .studio
            </span>
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: 24,
          }}
        >
          {eyebrow && (
            <div
              style={{
                display: "flex",
                fontSize: 22,
                color: "#a4a9bc",
                fontFamily: "ui-monospace, monospace",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              {eyebrow}
            </div>
          )}

          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              letterSpacing: "-0.045em",
              lineHeight: 0.95,
              display: "flex",
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            {title}
          </div>

          {tagline && (
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#d2d6e2",
                maxWidth: 900,
                lineHeight: 1.35,
              }}
            >
              {tagline}
            </div>
          )}

          {meta && meta.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 32,
                fontSize: 22,
                color: "#a4a9bc",
                fontFamily: "ui-monospace, monospace",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                marginTop: 8,
              }}
            >
              {meta.flatMap((m, i) =>
                i === 0
                  ? [<span key={`m-${m}`}>{m}</span>]
                  : [
                      <span key={`s-${m}`} style={{ color: "#6d4cf2" }}>
                        ·
                      </span>,
                      <span key={`m-${m}`}>{m}</span>,
                    ],
              )}
            </div>
          )}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
