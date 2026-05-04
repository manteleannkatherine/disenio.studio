import * as React from "react";
import { cn } from "../utils/cn";
import { FeelEmptyArt } from "../illustrations/EmptyArt";

/**
 * EmptyState — the placeholder you ship instead of a blank screen.
 *
 *   <EmptyState
 *     title="No components yet"
 *     description="Run `disenio add button` to install your first one."
 *     action={<Button variant="accent" size="sm">Browse components</Button>}
 *   />
 *
 * Pass a custom illustration via `art` (defaults to a Feel-aware geometric mark).
 */

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  art?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, action, art, size = "md", className, ...props }, ref) => {
    const sizes = {
      sm: { pad: "p-6", art: 48, gap: "gap-2", title: "text-base" },
      md: { pad: "p-10", art: 72, gap: "gap-3", title: "text-lg" },
      lg: { pad: "p-14", art: 96, gap: "gap-4", title: "text-xl" },
    } as const;
    const s = sizes[size];
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center text-center rounded-[var(--ds-radius)] border bg-[var(--ds-paper)] border-[var(--ds-line)]",
          s.pad,
          s.gap,
          className,
        )}
        {...props}
      >
        <div aria-hidden className="text-[var(--ds-muted)]">
          {art ?? <FeelEmptyArt size={s.art} />}
        </div>
        <div className={cn("font-semibold tracking-[-0.01em] text-[var(--ds-ink)]", s.title)}>{title}</div>
        {description && (
          <div className="text-sm text-[var(--ds-ink-soft)] max-w-[44ch]">{description}</div>
        )}
        {action && <div className="pt-2">{action}</div>}
      </div>
    );
  },
);
EmptyState.displayName = "EmptyState";

