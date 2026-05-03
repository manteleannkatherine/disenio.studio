import * as React from "react";
import { cn } from "../utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, leading, trailing, id, ...props }, ref) => {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-xs uppercase tracking-[0.12em] text-[var(--ds-ink-soft)]">
            {label}
          </label>
        )}
        <div
          className={cn(
            "group flex items-center gap-2 rounded-xl border bg-[var(--ds-paper)] px-3.5",
            "border-[var(--ds-line)] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",
            "transition-[border-color,box-shadow] duration-150",
            "focus-within:border-[var(--ds-ink)] focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--ds-accent)_25%,transparent)]",
            error && "border-[var(--ds-accent)] focus-within:border-[var(--ds-accent)]",
          )}
        >
          {leading && <span className="text-[var(--ds-muted)]">{leading}</span>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "h-10 w-full bg-transparent text-[var(--ds-ink)] placeholder:text-[var(--ds-muted)]",
              "outline-none text-[0.95rem]",
              className,
            )}
            {...props}
          />
          {trailing && <span className="text-[var(--ds-muted)]">{trailing}</span>}
        </div>
        {(hint || error) && (
          <p className={cn("text-xs", error ? "text-[var(--ds-accent)]" : "text-[var(--ds-muted)]")}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";
