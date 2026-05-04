"use client";
import * as React from "react";
import { cn } from "../utils/cn";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  /** Initials shown when no image (auto-derived from `name` if not given). */
  fallback?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Status indicator dot. */
  status?: "online" | "away" | "busy" | "offline";
  /** Deterministic gradient background from `name` or `fallback`. */
  fake?: boolean;
}

const SIZES = {
  xs: { box: "size-6", text: "text-[10px]", dot: "size-2" },
  sm: { box: "size-8", text: "text-xs", dot: "size-2" },
  md: { box: "size-10", text: "text-sm", dot: "size-2.5" },
  lg: { box: "size-12", text: "text-base", dot: "size-3" },
  xl: { box: "size-16", text: "text-lg", dot: "size-3.5" },
} as const;

const STATUS_COLOR = {
  online: "#10b981",
  away: "#facc15",
  busy: "#ef4444",
  offline: "#6b7186",
} as const;

function deriveInitials(input?: string) {
  if (!input) return "?";
  return input
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]!.toUpperCase())
    .join("");
}

function gradientFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const a = h % 360;
  const b = (a + 50) % 360;
  return `linear-gradient(135deg, hsl(${a} 70% 60%), hsl(${b} 75% 50%))`;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, alt, fallback, name, size = "md", status, fake, className, style, ...props }, ref) => {
    const [errored, setErrored] = React.useState(false);
    const initials = fallback ?? deriveInitials(name);
    const showImage = src && !errored;
    const s = SIZES[size];

    return (
      <span
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full overflow-visible select-none",
          s.box,
          className,
        )}
        style={style}
        {...props}
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full overflow-hidden flex items-center justify-center font-semibold",
            s.text,
          )}
          style={{
            background: showImage ? "transparent" : fake ? gradientFor(name ?? initials) : "var(--ds-paper-deep)",
            color: showImage ? "transparent" : fake ? "white" : "var(--ds-ink-soft)",
            border: "1px solid var(--ds-line)",
          }}
        >
          {showImage ? (
            <img
              src={src}
              alt={alt ?? name ?? "avatar"}
              className="w-full h-full object-cover"
              onError={() => setErrored(true)}
            />
          ) : (
            initials
          )}
        </span>
        {status && (
          <span
            aria-label={status}
            className={cn("absolute bottom-0 right-0 rounded-full ring-2", s.dot)}
            style={{ background: STATUS_COLOR[status], boxShadow: "0 0 0 2px var(--ds-paper)" }}
          />
        )}
      </span>
    );
  },
);
Avatar.displayName = "Avatar";

export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
}

export function AvatarGroup({ max = 3, className, children, ...props }: AvatarGroupProps) {
  const items = React.Children.toArray(children);
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;
  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {visible}
      {overflow > 0 && (
        <span className="relative inline-flex items-center justify-center size-10 rounded-full bg-[var(--ds-paper-deep)] border border-[var(--ds-line)] text-xs font-medium text-[var(--ds-ink-soft)]">
          +{overflow}
        </span>
      )}
    </div>
  );
}
