"use client";
import * as React from "react";
import { useTheme } from "@disenio/ui";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export function GradientPicker() {
  const { accent, gradient, setGradient } = useTheme();

  // Treat "no explicit gradient" as Auto. The seed for Custom mode is the
  // current accent flanked by a lighter and darker variant — gives the user
  // an immediately editable starting point.
  const isCustom = Boolean(gradient && gradient.length >= 2);

  function enterCustom() {
    setGradient([
      mixHex(accent, "#ffffff", 0.45),
      accent,
      mixHex(accent, "#000000", 0.4),
    ]);
  }

  function exitCustom() {
    setGradient(null);
  }

  function setStop(i: number, value: string) {
    if (!gradient) return;
    const next = [...gradient];
    next[i] = value;
    setGradient(next);
  }

  function addStop() {
    if (!gradient || gradient.length >= 5) return;
    // Insert a midpoint mix between the last two stops so it feels natural.
    const a = gradient.at(-2) ?? accent;
    const b = gradient.at(-1) ?? accent;
    const mid = mixHex(a, b, 0.5);
    setGradient([...gradient.slice(0, -1), mid, b]);
  }

  function removeStop(i: number) {
    if (!gradient || gradient.length <= 2) return;
    setGradient(gradient.filter((_, idx) => idx !== i));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
          Gradient
        </span>
        <div
          role="tablist"
          aria-label="Gradient mode"
          className="flex items-center gap-0.5 surface-deep rounded-full p-0.5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!isCustom}
            onClick={exitCustom}
            className="px-2.5 h-6 rounded-full text-[11px] mono uppercase tracking-[0.14em] transition-colors"
            style={{
              background: !isCustom ? "var(--ds-paper)" : "transparent",
              color: !isCustom ? "var(--ds-ink)" : "var(--ds-muted)",
            }}
          >
            Auto
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isCustom}
            onClick={isCustom ? undefined : enterCustom}
            className="px-2.5 h-6 rounded-full text-[11px] mono uppercase tracking-[0.14em] transition-colors"
            style={{
              background: isCustom ? "var(--ds-paper)" : "transparent",
              color: isCustom ? "var(--ds-ink)" : "var(--ds-muted)",
            }}
          >
            Custom
          </button>
        </div>
      </div>

      {/* Live gradient preview bar */}
      <div
        className="h-9 rounded-full border hairline"
        style={{ background: "var(--ds-brand-gradient)" }}
        aria-hidden
      />

      {isCustom && gradient && (
        <div className="flex flex-col gap-2">
          {gradient.map((stop, i) => {
            const safe = HEX_RE.test(stop) ? stop : "#000000";
            return (
              <div key={`stop-${i}`} className="flex items-center gap-2">
                <span className="mono text-[10px] tracking-[0.14em] text-[var(--ds-muted)] w-6 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <label
                  className="size-8 rounded-md border hairline overflow-hidden shrink-0 cursor-pointer relative"
                  style={{ background: safe }}
                  aria-label={`Stop ${i + 1} color`}
                >
                  <input
                    type="color"
                    value={safe}
                    onChange={(e) => setStop(i, e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </label>
                <input
                  type="text"
                  value={stop}
                  onChange={(e) => setStop(i, e.target.value)}
                  spellCheck={false}
                  className="flex-1 h-8 px-2.5 mono text-xs rounded-md border hairline bg-[var(--ds-paper)] text-[var(--ds-ink)] focus:outline-none focus:border-[var(--ds-accent)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeStop(i)}
                  disabled={gradient.length <= 2}
                  aria-label={`Remove stop ${i + 1}`}
                  className="size-8 inline-flex items-center justify-center rounded-md text-[var(--ds-muted)] hover:text-[var(--ds-ink)] hover:bg-[var(--ds-paper-deep)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ×
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={addStop}
            disabled={gradient.length >= 5}
            className="self-start mono text-[11px] uppercase tracking-[0.14em] px-3 py-1.5 rounded-full border hairline text-[var(--ds-ink-soft)] hover:text-[var(--ds-ink)] hover:bg-[var(--ds-paper-deep)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            + Add stop {gradient.length >= 5 && "(max 5)"}
          </button>
        </div>
      )}

      {!isCustom && (
        <p className="text-xs text-[var(--ds-muted)]">
          Auto-derived from your accent via{" "}
          <code className="mono text-[11px] bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">
            color-mix
          </code>
          . Switch to Custom for explicit stops.
        </p>
      )}
    </div>
  );
}

/* Quick hex mixer for the seed values when entering Custom mode.
 * Linear in sRGB — good enough for an editable starting point. */
function mixHex(a: string, b: string, t: number): string {
  const ra = parseHex(a);
  const rb = parseHex(b);
  if (!ra || !rb) return a;
  const lerp = (x: number, y: number) => Math.round(x + (y - x) * t);
  const r = lerp(ra[0], rb[0]);
  const g = lerp(ra[1], rb[1]);
  const bb = lerp(ra[2], rb[2]);
  return `#${[r, g, bb].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function parseHex(hex: string): [number, number, number] | null {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  if (full.length !== 6) return null;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return [r, g, b];
}
