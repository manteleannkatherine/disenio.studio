import * as React from "react";
import { cn } from "../utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "accent" | "ink";
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  const tones = {
    neutral: "bg-[var(--ds-paper)] text-[var(--ds-ink-soft)] border-[var(--ds-line)]",
    accent: "bg-[var(--ds-accent)] text-[var(--ds-accent-ink)] border-[var(--ds-accent)]",
    ink: "bg-[var(--ds-ink)] text-[var(--ds-paper)] border-[var(--ds-ink)]",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
