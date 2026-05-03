"use client";
import { FEELS, useTheme, type Feel } from "@disenio/ui";

export function FeelSwitcher() {
  const { feel, setFeel } = useTheme();
  const order: Feel[] = ["modern", "modernDark", "editorial", "playful", "brutalist", "clinical"];
  return (
    <div className="surface-deep p-1.5 inline-flex gap-1 flex-wrap" style={{ borderRadius: 999 }}>
      {order.map((f) => {
        const active = feel === f;
        return (
          <button
            key={f}
            onClick={() => setFeel(f)}
            className="px-3 h-8 rounded-full text-xs font-medium transition-all whitespace-nowrap"
            style={{
              background: active ? "var(--ds-ink)" : "transparent",
              color: active ? "var(--ds-paper)" : "var(--ds-ink-soft)",
            }}
          >
            {FEELS[f].label}
          </button>
        );
      })}
    </div>
  );
}
