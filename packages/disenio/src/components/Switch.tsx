"use client";
import * as React from "react";
import { cn } from "../utils/cn";

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  id?: string;
  className?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, defaultChecked, onCheckedChange, disabled, label, description, id, className }, ref) => {
    const reactId = React.useId();
    const switchId = id ?? reactId;
    const isControlled = checked !== undefined;
    const [internal, setInternal] = React.useState(defaultChecked ?? false);
    const value = isControlled ? checked : internal;

    const toggle = () => {
      if (disabled) return;
      if (!isControlled) setInternal(!value);
      onCheckedChange?.(!value);
    };

    const control = (
      <button
        ref={ref}
        id={switchId}
        type="button"
        role="switch"
        aria-checked={value}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color-mix(in_oklab,var(--ds-accent)_25%,transparent)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
        style={{
          background: value ? "var(--ds-accent)" : "var(--ds-paper-deep)",
          borderColor: value ? "var(--ds-accent)" : "var(--ds-line)",
        }}
      >
        <span
          aria-hidden
          className="size-[18px] rounded-full bg-white transition-transform duration-150 ease-out shadow"
          style={{ transform: value ? "translateX(22px)" : "translateX(2px)" }}
        />
      </button>
    );

    if (!label && !description) return control;

    return (
      <div className="flex items-start gap-3">
        {control}
        <label htmlFor={switchId} className="flex flex-col gap-0.5 cursor-pointer select-none">
          {label && <span className="text-sm font-medium text-[var(--ds-ink)]">{label}</span>}
          {description && <span className="text-xs text-[var(--ds-muted)]">{description}</span>}
        </label>
      </div>
    );
  },
);
Switch.displayName = "Switch";
