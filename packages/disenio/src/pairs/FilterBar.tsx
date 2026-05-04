import * as React from "react";
import { cn } from "../utils/cn";

/**
 * FilterBar — chips of active filters with a clear-all action.
 *
 *   <FilterBar>
 *     <FilterBar.Chip onRemove={...}>Status: open</FilterBar.Chip>
 *     <FilterBar.Chip onRemove={...}>Sort: newest</FilterBar.Chip>
 *     <FilterBar.ClearAll onClear={...} />
 *   </FilterBar>
 */

interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FilterBar = Object.assign(
  React.forwardRef<HTMLDivElement, FilterBarProps>(({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-2 p-2 rounded-[var(--ds-radius)] bg-[var(--ds-paper-deep)] border border-[var(--ds-line)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )),
  { Chip: FilterChip, ClearAll: FilterClearAll },
);
(FilterBar as React.ForwardRefExoticComponent<unknown>).displayName = "FilterBar";

function FilterChip({
  children,
  onRemove,
  className,
}: {
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-7 pl-2.5 pr-1.5 rounded-full border bg-[var(--ds-paper)] border-[var(--ds-line)] text-xs",
        className,
      )}
    >
      <span className="text-[var(--ds-ink-soft)]">{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove filter"
          className="size-4 rounded-full inline-flex items-center justify-center text-[var(--ds-muted)] hover:text-[var(--ds-ink)] hover:bg-[var(--ds-paper-deep)] transition-colors"
        >
          ×
        </button>
      )}
    </span>
  );
}
FilterChip.displayName = "FilterBar.Chip";

function FilterClearAll({ onClear }: { onClear?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="ml-auto h-7 px-2 text-xs mono uppercase tracking-wider text-[var(--ds-muted)] hover:text-[var(--ds-ink)] transition-colors"
    >
      clear all
    </button>
  );
}
FilterClearAll.displayName = "FilterBar.ClearAll";
