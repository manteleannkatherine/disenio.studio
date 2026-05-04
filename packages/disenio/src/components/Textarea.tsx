import * as React from "react";
import { cn } from "../utils/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const reactId = React.useId();
    const textareaId = id ?? reactId;
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={textareaId} className="text-xs uppercase tracking-[0.12em] text-[var(--ds-ink-soft)]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "min-h-[112px] w-full resize-y rounded-xl border bg-[var(--ds-paper)] px-3.5 py-2.5",
            "text-[0.95rem] text-[var(--ds-ink)] placeholder:text-[var(--ds-muted)]",
            "border-[var(--ds-line)] shadow-[inset_0_1px_0_var(--ds-surface-highlight)]",
            "outline-none transition-[border-color,box-shadow] duration-150",
            "focus:border-[var(--ds-ink)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--ds-accent)_25%,transparent)]",
            error && "border-[var(--ds-accent)]",
            className,
          )}
          {...props}
        />
        {(hint || error) && (
          <p className={cn("text-xs", error ? "text-[var(--ds-accent)]" : "text-[var(--ds-muted)]")}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
