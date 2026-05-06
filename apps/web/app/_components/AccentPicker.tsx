"use client";
import { useTheme } from "@disenio/ui";

const PRESETS = [
  "#ff5b1f", // marigold
  "#e11d48", // rose
  "#7c3aed", // violet
  "#0ea5e9", // sky
  "#10b981", // emerald
  "#facc15", // saffron
  "#14110f", // ink
];

export function AccentPicker() {
  const { accent, setAccent } = useTheme();
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">Accent</span>
      <div className="flex items-center gap-2">
        {PRESETS.map((c) => (
          <button
            key={c}
            onClick={() => setAccent(c)}
            aria-label={`Set accent ${c}`}
            className="size-7 rounded-full transition-transform hover:scale-110"
            style={{ background: c, ...(accent.toLowerCase() === c.toLowerCase() ? { boxShadow: "0 0 0 2px var(--ds-paper), 0 0 0 4px var(--ds-ink)" } : {}) }}
          />
        ))}
        <label className="size-7 rounded-full grid place-items-center cursor-pointer surface-deep relative overflow-hidden" title="Custom">
          <span className="mono text-xs">+</span>
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
}
