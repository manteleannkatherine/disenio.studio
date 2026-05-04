import * as React from "react";
import { cn } from "../utils/cn";

/**
 * Disenio layout primitives — composable, semantic, theme-aware.
 *
 *   Stack     vertical with consistent gap
 *   Cluster   horizontal wrap with gap, alignment, justification
 *   Switcher  row above threshold, stack below
 *   Sidebar   sidebar + content, stacks responsively
 *   Center    constrain max-width and center
 *   Grid      responsive auto-fit grid
 *   Spacer    grows to fill flex space
 *   Divider   horizontal or vertical hairline
 */

type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number | string;

const GAP_SCALE: Record<Exclude<Gap, number | string>, string> = {
  none: "0",
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2.5rem",
  "2xl": "4rem",
};

function resolveGap(g: Gap | undefined): string | undefined {
  if (g === undefined) return undefined;
  if (typeof g === "number") return `${g}px`;
  if (typeof g === "string" && !(g in GAP_SCALE)) return g;
  return GAP_SCALE[g as keyof typeof GAP_SCALE];
}

/* ────────────────────────────  Stack  ──────────────────────────── */
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof React.JSX.IntrinsicElements;
  gap?: Gap;
  align?: "start" | "center" | "end" | "stretch";
}
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ as: Tag = "div", gap = "md", align, className, style, ...props }, ref) => {
    const Component = Tag as React.ElementType;
    return (
      <Component
        ref={ref}
        className={cn("flex flex-col", className)}
        style={{ gap: resolveGap(gap), alignItems: align, ...style }}
        {...props}
      />
    );
  },
);
Stack.displayName = "Stack";

/* ────────────────────────────  Cluster  ──────────────────────────── */
export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof React.JSX.IntrinsicElements;
  gap?: Gap;
  align?: "start" | "center" | "end" | "baseline" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
}
const JUSTIFY = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
} as const;
const ALIGN = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  baseline: "baseline",
  stretch: "stretch",
} as const;
export const Cluster = React.forwardRef<HTMLDivElement, ClusterProps>(
  ({ as: Tag = "div", gap = "md", align = "center", justify = "start", wrap = true, className, style, ...props }, ref) => {
    const Component = Tag as React.ElementType;
    return (
      <Component
        ref={ref}
        className={cn("flex", className)}
        style={{
          gap: resolveGap(gap),
          alignItems: ALIGN[align],
          justifyContent: JUSTIFY[justify],
          flexWrap: wrap ? "wrap" : "nowrap",
          ...style,
        }}
        {...props}
      />
    );
  },
);
Cluster.displayName = "Cluster";

/* ────────────────────────────  Switcher  ──────────────────────────── */
export interface SwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Below this width, items stack. Above, they share a row. */
  threshold?: string;
  gap?: Gap;
  /** Soft cap on items per row. */
  limit?: number;
}
export const Switcher = React.forwardRef<HTMLDivElement, SwitcherProps>(
  ({ threshold = "30rem", gap = "md", limit = 4, className, style, ...props }, ref) => {
    const g = resolveGap(gap) ?? "1rem";
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap", className)}
        style={
          {
            gap: g,
            ["--ds-switcher-threshold" as string]: threshold,
            ["--ds-switcher-limit" as string]: String(limit),
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {React.Children.map(props.children, (child) => (
          <div
            style={{
              flexBasis: `calc((${threshold} - 100%) * 999)`,
              flexGrow: 1,
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  },
);
Switcher.displayName = "Switcher";

/* ────────────────────────────  Sidebar  ──────────────────────────── */
export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "left" places the first child as the side; "right" the second. */
  side?: "left" | "right";
  sideWidth?: string;
  /** Min width the content column must keep before the layout collapses. */
  contentMin?: string;
  gap?: Gap;
  noStretch?: boolean;
}
export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    { side = "left", sideWidth = "var(--ds-sidebar-width, 18rem)", contentMin = "50%", gap = "md", noStretch, className, style, children, ...props },
    ref,
  ) => {
    const items = React.Children.toArray(children);
    if (items.length !== 2) {
      // graceful fallback — render as a stack if not exactly 2 children
      return (
        <Stack ref={ref as React.Ref<HTMLDivElement>} className={className} style={style} gap={gap} {...props}>
          {children}
        </Stack>
      );
    }
    const [first, second] = items;
    const sideEl = side === "left" ? first : second;
    const mainEl = side === "left" ? second : first;
    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap", className)}
        style={{ gap: resolveGap(gap), alignItems: noStretch ? "flex-start" : "stretch", ...style }}
        {...props}
      >
        <div style={{ flexBasis: sideWidth, flexGrow: 1 }}>{sideEl}</div>
        <div style={{ flexBasis: 0, flexGrow: 999, minInlineSize: contentMin }}>{mainEl}</div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

/* ────────────────────────────  Center  ──────────────────────────── */
export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof React.JSX.IntrinsicElements;
  /** Max-width. Accepts a token ("prose"|"narrow"|"wide") or any CSS length. */
  max?: "narrow" | "prose" | "wide" | string;
  /** Horizontal padding. */
  pad?: Gap;
  /** Center child text horizontally too. */
  text?: boolean;
}
const MAX_PRESETS: Record<"narrow" | "prose" | "wide", string> = {
  narrow: "32rem",
  prose: "65ch",
  wide: "72rem",
};
export const Center = React.forwardRef<HTMLDivElement, CenterProps>(
  ({ as: Tag = "div", max = "prose", pad = "md", text = false, className, style, ...props }, ref) => {
    const Component = Tag as React.ElementType;
    const maxW = (MAX_PRESETS as Record<string, string>)[max as string] ?? max;
    return (
      <Component
        ref={ref}
        className={cn("mx-auto box-content", className)}
        style={{
          maxInlineSize: maxW,
          paddingInline: resolveGap(pad),
          textAlign: text ? "center" : undefined,
          ...style,
        }}
        {...props}
      />
    );
  },
);
Center.displayName = "Center";

/* ────────────────────────────  Grid  ──────────────────────────── */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Min width for an auto-sized column. */
  min?: string;
  gap?: Gap;
}
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ min = "16rem", gap = "md", className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid", className)}
      style={{
        gap: resolveGap(gap),
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}, 100%), 1fr))`,
        ...style,
      }}
      {...props}
    />
  ),
);
Grid.displayName = "Grid";

/* ────────────────────────────  Spacer  ──────────────────────────── */
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: Gap;
}
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ size, className, style, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden
      className={cn(size === undefined && "flex-1", className)}
      style={size !== undefined ? { flexBasis: resolveGap(size), flexShrink: 0, ...style } : style}
      {...props}
    />
  ),
);
Spacer.displayName = "Spacer";

/* ────────────────────────────  Divider  ──────────────────────────── */
export interface DividerProps extends React.HTMLAttributes<HTMLHRElement | HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: React.ReactNode;
}
export function Divider({ orientation = "horizontal", label, className, style, ...props }: DividerProps) {
  if (label && orientation === "horizontal") {
    return (
      <div
        role="separator"
        className={cn("flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[var(--ds-muted)] mono", className)}
        style={style}
      >
        <span className="flex-1 h-px bg-[var(--ds-line)]" />
        <span>{label}</span>
        <span className="flex-1 h-px bg-[var(--ds-line)]" />
      </div>
    );
  }
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("self-stretch w-px bg-[var(--ds-line)]", className)}
        style={style}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      />
    );
  }
  return (
    <hr
      className={cn("border-0 h-px bg-[var(--ds-line)]", className)}
      style={style}
      {...(props as React.HTMLAttributes<HTMLHRElement>)}
    />
  );
}
