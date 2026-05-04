import * as React from "react";
import { cn } from "../utils/cn";

/**
 * PageHeading — the universal page title pair: eyebrow + title + description + actions.
 *
 *   <PageHeading
 *     eyebrow="Settings"
 *     title="Workspace"
 *     description="Manage members, billing, and integrations."
 *     actions={<Button>+ Invite</Button>}
 *   />
 */

export interface PageHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  /** Add a thin bottom rule. */
  divided?: boolean;
}

export const PageHeading = React.forwardRef<HTMLDivElement, PageHeadingProps>(
  ({ eyebrow, title, description, actions, divided, className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "flex flex-col gap-3 pb-6",
        divided && "border-b border-[var(--ds-line)]",
        className,
      )}
      {...props}
    >
      {eyebrow && (
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
          {eyebrow}
        </span>
      )}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1.5 min-w-0">
          <h1 className="serif text-3xl md:text-4xl tracking-[-0.04em] font-semibold text-[var(--ds-ink)]">
            {title}
          </h1>
          {description && (
            <p className="text-[var(--ds-ink-soft)] max-w-[60ch]">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </header>
  ),
);
PageHeading.displayName = "PageHeading";
