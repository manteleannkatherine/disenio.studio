"use client";
import Link from "next/link";
import { useState } from "react";
import { encodeThemeHash, FEELS, useTheme, type Feel } from "@disenio/ui";

interface CuratedTheme {
  name: string;
  by: string;
  feel: Feel;
  accent: string;
  blurb: string;
}

const GALLERY: CuratedTheme[] = [
  {
    name: "Stripe-ish",
    by: "ann",
    feel: "modern",
    accent: "#635bff",
    blurb: "Saturated indigo + crisp grids.",
  },
  {
    name: "Linear-ish",
    by: "ann",
    feel: "modernDark",
    accent: "#5e6ad2",
    blurb: "Cool gray tight type, dark first.",
  },
  {
    name: "Stark Mag",
    by: "ann",
    feel: "stark",
    accent: "#ff0000",
    blurb: "Mono, hard edges, magazine red.",
  },
  {
    name: "Editorial Light",
    by: "ann",
    feel: "editorial",
    accent: "#a85a2c",
    blurb: "Warm paper, ink type, terracotta.",
  },
  {
    name: "Pastel Pop",
    by: "ann",
    feel: "playful",
    accent: "#ff8fb1",
    blurb: "Round, springy, candy pink.",
  },
  {
    name: "Synthwave",
    by: "ann",
    feel: "modernDark",
    accent: "#ff3ad6",
    blurb: "Pure black + neon magenta.",
  },
];

function MiniPreview({ feel, accent }: { feel: Feel; accent: string }) {
  const t = FEELS[feel].tokens;
  const radius = t.radius;
  return (
    <div
      className="h-32 w-full p-3 flex flex-col gap-2"
      style={{
        background: t.paper,
        borderBottom: `1px solid ${t.line}`,
        borderRadius: `${radius} ${radius} 0 0`,
        fontFamily: t.fontSans,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] uppercase tracking-[0.18em]"
          style={{ color: t.muted, fontFamily: "ui-monospace, Menlo, monospace" }}
        >
          {FEELS[feel].label.toLowerCase()}
        </span>
        <span className="size-2 rounded-full" style={{ background: accent }} />
      </div>
      <div className="text-base font-semibold" style={{ color: t.ink, letterSpacing: t.letterSpacing }}>
        Aa Bb Cc
      </div>
      <div className="flex items-center gap-1.5 mt-auto">
        <span
          className="h-6 px-2.5 inline-flex items-center text-[10px] font-medium"
          style={{ background: accent, color: "#fff", borderRadius: t.buttonRadius }}
        >
          Action
        </span>
        <span
          className="h-6 px-2.5 inline-flex items-center text-[10px]"
          style={{
            background: t.paperDeep,
            color: t.inkSoft,
            borderRadius: t.buttonRadius,
            border: `1px solid ${t.line}`,
          }}
        >
          Ghost
        </span>
        <span
          className="ml-auto h-6 w-12"
          style={{ background: t.paperDeep, borderRadius: t.fieldRadius, border: `1px solid ${t.line}` }}
        />
      </div>
    </div>
  );
}

export function ThemeGallery() {
  const { setFeel, setAccent } = useTheme();
  const [copied, setCopied] = useState<string | null>(null);

  const apply = (t: CuratedTheme) => {
    setFeel(t.feel);
    setAccent(t.accent);
    if (typeof globalThis.scrollTo === "function") {
      globalThis.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const copyShare = async (t: CuratedTheme) => {
    const hash = encodeThemeHash({ feel: t.feel, accent: t.accent });
    const url = `${globalThis.location.origin}/?t=${hash}`;
    await navigator.clipboard.writeText(url);
    setCopied(t.name);
    setTimeout(() => setCopied(null), 1600);
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {GALLERY.map((t) => (
        <article key={t.name} className="surface overflow-hidden flex flex-col">
          <MiniPreview feel={t.feel} accent={t.accent} />
          <div className="p-4 flex flex-col gap-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="serif text-lg tracking-[-0.02em]">{t.name}</h3>
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
                @{t.by}
              </span>
            </div>
            <p className="text-sm text-[var(--ds-ink-soft)] flex-1">{t.blurb}</p>
            <div className="flex items-center gap-2 pt-2 border-t hairline">
              <button
                onClick={() => apply(t)}
                className="flex-1 h-9 inline-flex items-center justify-center text-sm font-medium transition-transform hover:-translate-y-px text-white"
                style={{
                  borderRadius: "var(--ds-button-radius)",
                  background: "var(--ds-brand-gradient)",
                }}
              >
                Apply
              </button>
              <button
                onClick={() => copyShare(t)}
                className="h-9 px-3 inline-flex items-center justify-center text-xs mono uppercase tracking-wider text-[var(--ds-ink-soft)] hover:text-[var(--ds-ink)] border hairline transition-colors"
                style={{ borderRadius: "var(--ds-button-radius)" }}
              >
                {copied === t.name ? "✓ Copied" : "Share"}
              </button>
            </div>
          </div>
        </article>
      ))}
      <article className="surface overflow-hidden flex flex-col items-center justify-center text-center p-6 gap-3 min-h-[280px] sm:col-span-2 lg:col-span-1">
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
          your turn
        </span>
        <h3 className="serif text-xl tracking-[-0.02em]">Make and submit a theme</h3>
        <p className="text-sm text-[var(--ds-ink-soft)] max-w-[28ch]">
          Open the editor, share the URL, and we'll feature the best ones here.
        </p>
        <Link
          href="/docs/theming"
          className="h-9 px-4 inline-flex items-center justify-center text-sm font-medium border hairline mt-1 hover:bg-[var(--ds-paper-deep)] transition-colors"
          style={{ borderRadius: "var(--ds-button-radius)" }}
        >
          Open editor →
        </Link>
      </article>
    </div>
  );
}
