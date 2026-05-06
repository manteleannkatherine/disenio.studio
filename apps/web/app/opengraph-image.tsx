import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "disenio.studio — a copy-paste design toolkit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          color: "#f6f7fb",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient blob */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, #6d4cf2 0%, #2f5dff 40%, transparent 70%)",
            opacity: 0.6,
          }}
        />

        {/* Brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#b27bff" />
                <stop offset="50%" stopColor="#6d4cf2" />
                <stop offset="100%" stopColor="#2f5dff" />
              </linearGradient>
            </defs>
            <path d="M14 8 H30 A26 26 0 0 1 30 56 H14 V44 H30 A14 14 0 0 0 30 20 H14 Z" fill="url(#g)" />
            <circle cx="14" cy="44" r="8" fill="#a875ff" />
          </svg>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 600, letterSpacing: "-0.04em" }}>
            <span>disenio</span>
            <span
              style={{
                background: "linear-gradient(135deg, #b27bff 0%, #6d4cf2 50%, #2f5dff 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              .io
            </span>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: 24,
          }}
        >
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
            <span>A design toolkit with a</span>
            <span
              style={{
                background: "linear-gradient(135deg, #b27bff 0%, #6d4cf2 50%, #2f5dff 100%)",
                backgroundClip: "text",
                color: "transparent",
                fontStyle: "italic",
              }}
            >
              feel.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: 32,
              fontSize: 22,
              color: "#b8bdcd",
              fontFamily: "ui-monospace, monospace",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
            }}
          >
            <span>13 components</span>
            <span style={{ color: "#6d4cf2" }}>·</span>
            <span>9 pairs</span>
            <span style={{ color: "#6d4cf2" }}>·</span>
            <span>6 feels</span>
            <span style={{ color: "#6d4cf2" }}>·</span>
            <span>cli</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
