"use client";
import { useEffect, useState } from "react";
import { useTheme } from "@disenio/ui";

interface A11yAuditProps {
  /** Component-specific keyboard summary, e.g. "↹ focus · ↵ activate" */
  keyboard?: string;
  /** ARIA roles/landmarks the component sets */
  aria?: string;
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return {
    r: Number.parseInt(full.slice(0, 2), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    b: Number.parseInt(full.slice(4, 6), 16),
  };
}

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  const ch = [r, g, b]
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * ch[0]! + 0.7152 * ch[1]! + 0.0722 * ch[2]!;
}

function contrastRatio(a: string, b: string) {
  const la = relativeLuminance(hexToRgb(a));
  const lb = relativeLuminance(hexToRgb(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

function readVar(name: string): string {
  if (typeof window === "undefined") return "#000000";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#000000";
}

export function A11yAudit({ keyboard, aria }: A11yAuditProps) {
  const { feel, accent } = useTheme();
  const [paper, setPaper] = useState("#000000");
  const [ink, setInk] = useState("#ffffff");

  useEffect(() => {
    setPaper(readVar("--ds-paper"));
    setInk(readVar("--ds-ink"));
  }, [feel, accent]);

  const accentVsPaper = contrastRatio(accent, paper);
  const inkVsPaper = contrastRatio(ink, paper);

  const verdict = (ratio: number) => {
    if (ratio >= 7) return { label: "AAA", tint: "var(--ds-accent)" };
    if (ratio >= 4.5) return { label: "AA", tint: "var(--ds-accent)" };
    if (ratio >= 3) return { label: "AA Large", tint: "#facc15" };
    return { label: "Fail", tint: "#ef4444" };
  };

  return (
    <div className="surface p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="serif text-lg tracking-[-0.02em] font-semibold">A11y · live audit</h3>
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
          updates with theme
        </span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <ContrastRow label="Accent on paper" ratio={accentVsPaper} verdict={verdict(accentVsPaper)} />
        <ContrastRow label="Ink on paper" ratio={inkVsPaper} verdict={verdict(inkVsPaper)} />
      </div>

      {(keyboard || aria) && (
        <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t hairline">
          {keyboard && (
            <div className="flex flex-col gap-1.5">
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
                Keyboard
              </span>
              <span className="mono text-xs text-[var(--ds-ink-soft)]">{keyboard}</span>
            </div>
          )}
          {aria && (
            <div className="flex flex-col gap-1.5">
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
                ARIA
              </span>
              <span className="mono text-xs text-[var(--ds-ink-soft)]">{aria}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ContrastRow({
  label,
  ratio,
  verdict,
}: {
  label: string;
  ratio: number;
  verdict: { label: string; tint: string };
}) {
  return (
    <div className="surface-deep p-3 flex flex-col gap-1.5">
      <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
        {label}
      </span>
      <div className="flex items-baseline justify-between">
        <span className="serif text-2xl tracking-[-0.02em] font-semibold">{ratio.toFixed(2)}</span>
        <span
          className="mono text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
          style={{ background: verdict.tint, color: "white" }}
        >
          {verdict.label}
        </span>
      </div>
    </div>
  );
}
