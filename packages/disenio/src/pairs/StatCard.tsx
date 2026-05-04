import * as React from "react";
import { cn } from "../utils/cn";

/**
 * StatCard — the dashboard pair: label + big value + delta.
 *
 *   <StatCard label="Installs (7d)" value="1,284" delta="+18%" />
 */

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  delta?: React.ReactNode;
  /** Force the delta tint regardless of leading sign. */
  trend?: "up" | "down" | "flat";
  hint?: React.ReactNode;
  icon?: React.ReactNode;
}

function inferTrend(delta: React.ReactNode): "up" | "down" | "flat" {
  if (typeof delta !== "string") return "flat";
  const s = delta.trim();
  if (s.startsWith("+")) return "up";
  if (s.startsWith("-") || s.startsWith("−")) return "down";
  return "flat";
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ label, value, delta, trend, hint, icon, className, ...props }, ref) => {
    const t = trend ?? inferTrend(delta);
    const tints = {
      up: "text-[var(--ds-accent)]",
      down: "text-red-500",
      flat: "text-[var(--ds-muted)]",
    } as const;
    const arrow = { up: "↗", down: "↘", flat: "→" } as const;
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2 p-4 rounded-[var(--ds-radius)] border bg-[var(--ds-paper)] border-[var(--ds-line)]",
          "shadow-[inset_0_1px_0_var(--ds-surface-highlight),var(--ds-shadow)]",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
            {label}
          </span>
          {icon && <span className="text-[var(--ds-muted)]">{icon}</span>}
        </div>
        <span className="serif text-3xl tracking-[-0.02em] font-semibold text-[var(--ds-ink)]">
          {value}
        </span>
        <div className="flex items-center justify-between min-h-[1rem]">
          {delta && (
            <span className={cn("mono text-xs flex items-center gap-1", tints[t])}>
              <span aria-hidden>{arrow[t]}</span>
              {delta}
            </span>
          )}
          {hint && <span className="text-xs text-[var(--ds-muted)]">{hint}</span>}
        </div>
      </div>
    );
  },
);
StatCard.displayName = "StatCard";
