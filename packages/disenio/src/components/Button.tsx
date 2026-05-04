import * as React from "react";
import { cn } from "../utils/cn";

type Variant = "solid" | "accent" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  solid: "bg-[var(--ds-ink)] text-[var(--ds-paper)] border-[var(--ds-ink)] hover:opacity-95",
  accent: "bg-[var(--ds-accent)] text-[var(--ds-accent-ink)] border-[var(--ds-accent)] hover:opacity-95",
  ghost: "bg-transparent text-[var(--ds-ink)] border-transparent hover:bg-[var(--ds-paper-deep)]",
  outline: "bg-transparent text-[var(--ds-ink)] border-[var(--ds-line)] hover:bg-[var(--ds-paper-deep)]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border font-medium",
        "transition-[transform,box-shadow,background] duration-150 ease-out",
        "active:translate-y-[0.5px] hover:-translate-y-[0.5px]",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color-mix(in_oklab,var(--ds-accent)_30%,transparent)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        "shadow-[inset_0_1px_0_var(--ds-surface-highlight),var(--ds-shadow)]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
