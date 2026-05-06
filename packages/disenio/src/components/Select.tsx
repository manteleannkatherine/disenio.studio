"use client";
import * as React from "react";
import { cn } from "../utils/cn";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  label,
  disabled,
  className,
}: SelectProps) {
  const reactId = React.useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const current = isControlled ? value : internal;
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === current);

  const select = (val: string) => {
    if (!isControlled) setInternal(val);
    onValueChange?.(val);
    setOpen(false);
    // Defer focus until after the close has flushed, so the outside-click
    // listener doesn't see a re-render mid-flight on Safari/Firefox.
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || listRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const onKey = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[active];
      if (opt && !opt.disabled) select(opt.value);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={reactId} className="text-xs uppercase tracking-[0.12em] text-[var(--ds-ink-soft)]">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          id={reactId}
          ref={triggerRef}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={onKey}
          className={cn(
            "w-full h-10 px-3.5 flex items-center justify-between gap-2 rounded-[var(--ds-field-radius)] border bg-[var(--ds-paper)] border-[var(--ds-line)]",
            "text-[0.95rem] text-left transition-[border-color,box-shadow] duration-150",
            "focus-visible:outline-none focus-visible:border-[var(--ds-ink)] focus-visible:shadow-[0_0_0_4px_color-mix(in_oklab,var(--ds-accent)_25%,transparent)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          <span className={selected ? "text-[var(--ds-ink)]" : "text-[var(--ds-muted)]"}>
            {selected?.label ?? placeholder}
          </span>
          <span className="text-[var(--ds-muted)]" aria-hidden>
            ▾
          </span>
        </button>
        {open && (
          <ul
            ref={listRef}
            role="listbox"
            className="absolute top-full left-0 right-0 mt-1.5 z-30 max-h-64 overflow-y-auto rounded-[var(--ds-radius)] border bg-[var(--ds-paper)] border-[var(--ds-line)] shadow-[var(--ds-shadow)] p-1"
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === current;
              const isActive = i === active;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => {
                    // Run on mousedown so we close before the document's
                    // outside-click listener has a chance to disagree.
                    if (opt.disabled) return;
                    e.preventDefault();
                    e.stopPropagation();
                    select(opt.value);
                  }}
                  onClick={(e) => {
                    // Click is a fallback for keyboard / assistive tech.
                    if (opt.disabled) return;
                    e.stopPropagation();
                    if (open) select(opt.value);
                  }}
                  className="px-3 h-9 flex items-center justify-between gap-2 rounded-md text-sm cursor-pointer transition-colors"
                  style={{
                    background: isActive ? "var(--ds-paper-deep)" : "transparent",
                    color: opt.disabled ? "var(--ds-muted)" : "var(--ds-ink)",
                    pointerEvents: opt.disabled ? "none" : undefined,
                  }}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <span className="text-[var(--ds-accent)]" aria-hidden>
                      ✓
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
