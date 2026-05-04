import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Toolbar — search + filters + actions, all aligned in one row that wraps.
 *
 *   <Toolbar>
 *     <Toolbar.Search placeholder="Search components" />
 *     <Toolbar.Filters>
 *       <Badge>active</Badge>
 *     </Toolbar.Filters>
 *     <Toolbar.Actions>
 *       <Button>+ New</Button>
 *     </Toolbar.Actions>
 *   </Toolbar>
 *
 * The slots auto-arrange: Search anchors left, Filters in the middle (pushable),
 * Actions stick to the right via flex-grow.
 */

interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof React.JSX.IntrinsicElements;
}

export const Toolbar = Object.assign(
  React.forwardRef<HTMLDivElement, ToolbarProps>(
    ({ as: Tag = "div", className, children, ...props }, ref) => {
      const Component = Tag as React.ElementType;
      return (
        <Component
          ref={ref}
          role="toolbar"
          className={cn(
            "flex flex-wrap items-center gap-3 p-2 rounded-[var(--ds-radius)] border bg-[var(--ds-paper)] border-[var(--ds-line)]",
            className,
          )}
          {...props}
        >
          {children}
        </Component>
      );
    },
  ),
  {
    Search: ToolbarSearch,
    Filters: ToolbarFilters,
    Actions: ToolbarActions,
    Divider: ToolbarDivider,
  },
);

(Toolbar as React.ForwardRefExoticComponent<unknown>).displayName = "Toolbar";

function ToolbarSearch({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative flex-1 min-w-[180px]">
      <span aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ds-muted)] text-sm">
        ⌕
      </span>
      <input
        type="search"
        className={cn(
          "w-full h-9 pl-8 pr-3 rounded-[var(--ds-field-radius)] border bg-[var(--ds-paper)] border-[var(--ds-line)]",
          "text-sm text-[var(--ds-ink)] placeholder:text-[var(--ds-muted)]",
          "outline-none transition-[border-color,box-shadow] duration-150",
          "focus:border-[var(--ds-ink)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--ds-accent)_25%,transparent)]",
          className,
        )}
        {...props}
      />
    </div>
  );
}
ToolbarSearch.displayName = "Toolbar.Search";

function ToolbarFilters({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)} {...props}>
      {children}
    </div>
  );
}
ToolbarFilters.displayName = "Toolbar.Filters";

function ToolbarActions({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2 ml-auto", className)} {...props}>
      {children}
    </div>
  );
}
ToolbarActions.displayName = "Toolbar.Actions";

function ToolbarDivider() {
  return <div aria-hidden className="self-stretch w-px bg-[var(--ds-line)]" />;
}
ToolbarDivider.displayName = "Toolbar.Divider";
