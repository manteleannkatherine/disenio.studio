"use client";
import * as React from "react";

export type Feel = "modern" | "modernDark" | "editorial" | "playful" | "stark" | "clinical";

export interface FeelTokens {
  radius: string;
  duration: string;
  easing: string;
  shadow: string;
  fontSerif: string;
  fontSans: string;
  letterSpacing: string;
  buttonRadius: string;
  fieldRadius: string;
  paper: string;
  paperDeep: string;
  ink: string;
  inkSoft: string;
  muted: string;
  line: string;
}

export const BRAND_GRADIENT = "linear-gradient(135deg, #b27bff 0%, #6d4cf2 50%, #2f5dff 100%)";

export const FEELS: Record<Feel, { label: string; blurb: string; tokens: FeelTokens }> = {
  modern: {
    label: "Modern",
    blurb: "Crisp white, geometric sans, violet→blue accent.",
    tokens: {
      radius: "12px",
      duration: "180ms",
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      shadow: "0 14px 30px -16px rgba(70,40,200,0.18)",
      fontSerif: 'Inter, ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      fontSans: 'Inter, ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      letterSpacing: "-0.02em",
      buttonRadius: "10px",
      fieldRadius: "10px",
      paper: "#ffffff",
      paperDeep: "#f5f6fa",
      ink: "#0e1018",
      inkSoft: "#3a3f55",
      muted: "#7a8094",
      line: "#e4e6ee",
    },
  },
  modernDark: {
    label: "Modern · Dark",
    blurb: "Soft near-black, gradient brand, electric.",
    tokens: {
      radius: "12px",
      duration: "180ms",
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      shadow: "none",
      fontSerif: 'Inter, ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      fontSans: 'Inter, ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      letterSpacing: "-0.02em",
      buttonRadius: "10px",
      fieldRadius: "10px",
      paper: "#14161e",
      paperDeep: "#0d0f15",
      ink: "#f6f7fb",
      inkSoft: "#d2d6e2",
      muted: "#a4a9bc",
      line: "#2a2d38",
    },
  },
  editorial: {
    label: "Editorial",
    blurb: "Warm paper, ink type, generous restraint.",
    tokens: {
      radius: "14px",
      duration: "180ms",
      easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      shadow: "0 12px 28px -20px rgba(20,17,15,0.18)",
      fontSerif: '"Instrument Serif", Georgia, serif',
      fontSans: 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial',
      letterSpacing: "-0.01em",
      buttonRadius: "999px",
      fieldRadius: "12px",
      paper: "#f4efe6",
      paperDeep: "#ebe4d6",
      ink: "#14110f",
      inkSoft: "#4a423b",
      muted: "#8a7f72",
      line: "#d9cfbd",
    },
  },
  playful: {
    label: "Playful",
    blurb: "Bouncy springs, soft pastels, rounded everything.",
    tokens: {
      radius: "20px",
      duration: "260ms",
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      shadow: "0 18px 36px -18px rgba(70,40,140,0.25)",
      fontSerif: '"Instrument Serif", Georgia, serif',
      fontSans: 'ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      letterSpacing: "-0.005em",
      buttonRadius: "999px",
      fieldRadius: "18px",
      paper: "#fbf7ff",
      paperDeep: "#f1e9ff",
      ink: "#1c0f3d",
      inkSoft: "#4b3a78",
      muted: "#8a7eb0",
      line: "#e0d3f5",
    },
  },
  stark: {
    label: "Stark",
    blurb: "Hard edges, mono type, no apology.",
    tokens: {
      radius: "0px",
      duration: "0ms",
      easing: "steps(1, end)",
      shadow: "6px 6px 0 0 #000",
      fontSerif: 'ui-monospace, "JetBrains Mono", Menlo, monospace',
      fontSans: 'ui-monospace, "JetBrains Mono", Menlo, monospace',
      letterSpacing: "0em",
      buttonRadius: "0px",
      fieldRadius: "0px",
      paper: "#ffffff",
      paperDeep: "#f0f0f0",
      ink: "#000000",
      inkSoft: "#1a1a1a",
      muted: "#666666",
      line: "#000000",
    },
  },
  clinical: {
    label: "Clinical",
    blurb: "Cool grays, precise spacing, subtle motion.",
    tokens: {
      radius: "8px",
      duration: "120ms",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      shadow: "0 4px 12px -6px rgba(15,23,42,0.12)",
      fontSerif: 'ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      fontSans: 'ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      letterSpacing: "-0.005em",
      buttonRadius: "8px",
      fieldRadius: "8px",
      paper: "#fafbfc",
      paperDeep: "#f1f3f6",
      ink: "#0b1220",
      inkSoft: "#334155",
      muted: "#64748b",
      line: "#dde3ec",
    },
  },
};

export interface ThemeState {
  feel: Feel;
  accent: string;
  calm: boolean;
  setFeel: (f: Feel) => void;
  setAccent: (hex: string) => void;
  setCalm: (v: boolean) => void;
  exportCss: () => string;
}

const ThemeCtx = React.createContext<ThemeState | null>(null);

function applyTokens(feel: Feel, accent: string) {
  if (typeof document === "undefined") return;
  const t = FEELS[feel].tokens;
  const r = document.documentElement.style;
  r.setProperty("--ds-paper", t.paper);
  r.setProperty("--ds-paper-deep", t.paperDeep);
  r.setProperty("--ds-ink", t.ink);
  r.setProperty("--ds-ink-soft", t.inkSoft);
  r.setProperty("--ds-muted", t.muted);
  r.setProperty("--ds-line", t.line);
  r.setProperty("--ds-radius", t.radius);
  r.setProperty("--ds-duration", t.duration);
  r.setProperty("--ds-easing", t.easing);
  r.setProperty("--ds-shadow", t.shadow);
  r.setProperty("--ds-font-serif", t.fontSerif);
  r.setProperty("--ds-font-sans", t.fontSans);
  r.setProperty("--ds-letter-spacing", t.letterSpacing);
  r.setProperty("--ds-button-radius", t.buttonRadius);
  r.setProperty("--ds-field-radius", t.fieldRadius);
  // Inset highlight rim disappears on dark surfaces — the white sheen reads bad on near-black.
  const isDarkPaper = isHexDark(t.paper);
  r.setProperty("--ds-surface-highlight", isDarkPaper ? "transparent" : "color-mix(in oklab, white 60%, transparent)");
  r.setProperty("--ds-accent", accent);
  // accent-ink: pick black or paper based on luminance
  const ink = readableInk(accent);
  r.setProperty("--ds-accent-ink", ink);
  // Brand gradient is derived from the accent so it auto-tunes when users
  // pick their own brand color. Explicit overrides happen in disenio.json
  // via the CLI's --gradient flag (and live in theme.css directly).
  r.setProperty(
    "--ds-brand-gradient",
    `linear-gradient(135deg, color-mix(in oklab, ${accent} 65%, white 35%) 0%, ${accent} 50%, color-mix(in oklab, ${accent} 75%, black 25%) 100%)`,
  );
}

/* ──────────────  Share-link encoding  ────────────── */

function toBase64Url(s: string) {
  if (typeof btoa !== "undefined") return btoa(s).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
  // node fallback
  return Buffer.from(s).toString("base64url");
}
function fromBase64Url(s: string) {
  const padded = s.replaceAll("-", "+").replaceAll("_", "/") + "===".slice((s.length + 3) % 4);
  if (typeof atob !== "undefined") return atob(padded);
  return Buffer.from(s, "base64url").toString("utf8");
}

export function encodeThemeHash(state: { feel: Feel; accent: string }): string {
  return toBase64Url(JSON.stringify([state.feel, state.accent]));
}

export function decodeThemeHash(hash: string): { feel: Feel; accent: string } | null {
  try {
    const decoded = JSON.parse(fromBase64Url(hash));
    if (!Array.isArray(decoded) || decoded.length !== 2) return null;
    const [feel, accent] = decoded;
    if (!(feel in FEELS) || typeof accent !== "string") return null;
    return { feel: feel as Feel, accent };
  } catch {
    return null;
  }
}

function isHexDark(hex: string) {
  const h = hex.replace("#", "");
  if (h.length < 3) return false;
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum < 0.4;
}

function readableInk(hex: string) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#14110f" : "#ffffff";
}

export function ThemeProvider({
  children,
  defaultFeel = "modernDark",
  defaultAccent = "#6d4cf2",
}: {
  children: React.ReactNode;
  defaultFeel?: Feel;
  defaultAccent?: string;
}) {
  const [feel, setFeelState] = React.useState<Feel>(defaultFeel);
  const [accent, setAccentState] = React.useState<string>(defaultAccent);
  const [calm, setCalmState] = React.useState<boolean>(false);

  // Read shared theme from URL once on mount + restore calm preference
  React.useEffect(() => {
    if (globalThis.window === undefined) return;
    const params = new URLSearchParams(globalThis.location.search);
    const hash = params.get("t");
    if (hash) {
      const decoded = decodeThemeHash(hash);
      if (decoded) {
        setFeelState(decoded.feel);
        setAccentState(decoded.accent);
      }
    }
    // Calm: localStorage wins, otherwise inherit from prefers-reduced-motion
    const stored = globalThis.localStorage?.getItem("disenio:calm");
    if (stored === "1" || stored === "0") {
      setCalmState(stored === "1");
    } else if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setCalmState(true);
    }
  }, []);

  // Apply calm-mode token override (kills motion, snaps easings to linear)
  React.useEffect(() => {
    if (globalThis.document === undefined) return;
    const root = document.documentElement;
    if (calm) {
      root.dataset.dsCalm = "1";
      root.style.setProperty("--ds-duration", "0ms");
      root.style.setProperty("--ds-easing", "linear");
    } else {
      delete root.dataset.dsCalm;
      // restore from current Feel
      const t = FEELS[feel].tokens;
      root.style.setProperty("--ds-duration", t.duration);
      root.style.setProperty("--ds-easing", t.easing);
    }
    globalThis.localStorage?.setItem("disenio:calm", calm ? "1" : "0");
  }, [calm, feel]);

  React.useEffect(() => {
    applyTokens(feel, accent);
  }, [feel, accent]);

  const value = React.useMemo<ThemeState>(
    () => ({
      feel,
      accent,
      calm,
      setFeel: setFeelState,
      setAccent: setAccentState,
      setCalm: setCalmState,
      exportCss: () => {
        const t = FEELS[feel].tokens;
        return `:root {
  --ds-paper: ${t.paper};
  --ds-paper-deep: ${t.paperDeep};
  --ds-ink: ${t.ink};
  --ds-ink-soft: ${t.inkSoft};
  --ds-muted: ${t.muted};
  --ds-line: ${t.line};
  --ds-radius: ${t.radius};
  --ds-duration: ${t.duration};
  --ds-easing: ${t.easing};
  --ds-shadow: ${t.shadow};
  --ds-font-serif: ${t.fontSerif};
  --ds-font-sans: ${t.fontSans};
  --ds-letter-spacing: ${t.letterSpacing};
  --ds-button-radius: ${t.buttonRadius};
  --ds-field-radius: ${t.fieldRadius};
  --ds-accent: ${accent};
  --ds-accent-ink: ${readableInk(accent)};
  --ds-brand-gradient: linear-gradient(135deg, color-mix(in oklab, ${accent} 65%, white 35%) 0%, ${accent} 50%, color-mix(in oklab, ${accent} 75%, black 25%) 100%);
}`;
      },
    }),
    [feel, accent, calm],
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
