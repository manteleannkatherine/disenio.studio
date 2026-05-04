import * as React from "react";
import { cn } from "../utils/cn";

/**
 * FormField — the canonical pair: label + control + hint/error.
 *
 *   <FormField label="Email" hint="We never share">
 *     <Input placeholder="hola@disenio.io" />
 *   </FormField>
 *
 * Renders a `<label>` wrapping the control region so clicking the label focuses
 * the first focusable child. Use `error` to flip color + a11y wiring.
 */

export interface FormFieldProps extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "children"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  /** Render label/hint side-by-side with the control instead of stacked. */
  inline?: boolean;
}

export const FormField = React.forwardRef<HTMLLabelElement, FormFieldProps>(
  ({ label, hint, error, required, inline, className, children, ...props }, ref) => {
    const hintId = React.useId();
    const errorId = React.useId();
    const described = error ? errorId : hint ? hintId : undefined;

    const control = React.Children.map(children, (child) =>
      React.isValidElement(child)
        ? React.cloneElement(child as React.ReactElement<{ "aria-describedby"?: string; "aria-invalid"?: boolean }>, {
            "aria-describedby": described,
            "aria-invalid": Boolean(error) || undefined,
          })
        : child,
    );

    return (
      <label
        ref={ref}
        className={cn(
          "flex gap-2",
          inline ? "flex-row items-center justify-between" : "flex-col",
          className,
        )}
        {...props}
      >
        {label && (
          <span className="text-xs uppercase tracking-[0.12em] text-[var(--ds-ink-soft)]">
            {label}
            {required && <span className="ml-1 text-[var(--ds-accent)]">*</span>}
          </span>
        )}
        <div className={cn("flex flex-col gap-1.5", inline && "flex-1")}>
          {control}
          {error ? (
            <span id={errorId} className="text-xs text-[var(--ds-accent)]">
              {error}
            </span>
          ) : hint ? (
            <span id={hintId} className="text-xs text-[var(--ds-muted)]">
              {hint}
            </span>
          ) : null}
        </div>
      </label>
    );
  },
);
FormField.displayName = "FormField";
