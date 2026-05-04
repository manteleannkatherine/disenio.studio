"use client";
import * as React from "react";
import { cn } from "../utils/cn";

type Side = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: Side;
  delay?: number;
  className?: string;
}

export function Tooltip({ content, children, side = "top", delay = 200, className }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = React.useId();

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(false);
  };

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const child = React.cloneElement(children, {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    "aria-describedby": tooltipId,
  } as React.HTMLAttributes<HTMLElement>);

  const positions: Record<Side, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
  };

  return (
    <span className="relative inline-flex">
      {child}
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            "absolute z-50 px-2.5 py-1.5 rounded-md text-xs whitespace-nowrap pointer-events-none",
            "bg-[var(--ds-ink)] text-[var(--ds-paper)] shadow-[var(--ds-shadow)]",
            "animate-[fadeIn_120ms_ease-out]",
            positions[side],
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
}
