"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn";

interface DialogCtx {
  open: boolean;
  setOpen: (v: boolean) => void;
}
const DialogContext = React.createContext<DialogCtx | null>(null);

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, defaultOpen, onOpenChange, children }: DialogProps) {
  const isControlled = open !== undefined;
  const [internal, setInternal] = React.useState(defaultOpen ?? false);
  const value = isControlled ? open! : internal;
  const setOpen = (v: boolean) => {
    if (!isControlled) setInternal(v);
    onOpenChange?.(v);
  };
  return <DialogContext.Provider value={{ open: value, setOpen }}>{children}</DialogContext.Provider>;
}

export function DialogTrigger({ children, asChild }: { children: React.ReactElement; asChild?: boolean }) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("DialogTrigger must be inside <Dialog>");
  if (asChild) {
    return React.cloneElement(children, { onClick: () => ctx.setOpen(true) } as React.HTMLAttributes<HTMLElement>);
  }
  return <button onClick={() => ctx.setOpen(true)}>{children}</button>;
}

export interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("DialogContent must be inside <Dialog>");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!ctx.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") ctx.setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [ctx]);

  if (!mounted || !ctx.open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[90] grid place-items-center p-4 animate-[fadeIn_150ms_ease-out]">
      <button
        aria-label="Close"
        onClick={() => ctx.setOpen(false)}
        className="absolute inset-0 cursor-default"
        style={{ background: "color-mix(in oklab, var(--ds-ink) 50%, transparent)", backdropFilter: "blur(6px)" }}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative w-full max-w-md rounded-[var(--ds-radius)] border bg-[var(--ds-paper)] border-[var(--ds-line)]",
          "shadow-[var(--ds-shadow)] animate-[scaleIn_180ms_var(--ds-easing)]",
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export function DialogHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-1 p-5 border-b border-[var(--ds-line)]", className)}>{children}</div>;
}

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("text-lg font-semibold tracking-[-0.01em]", className)}>{children}</h2>;
}

export function DialogDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-sm text-[var(--ds-ink-soft)]", className)}>{children}</p>;
}

export function DialogBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-5", className)}>{children}</div>;
}

export function DialogFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-end gap-2 p-5 border-t border-[var(--ds-line)]", className)}>
      {children}
    </div>
  );
}

export function DialogClose({ children, asChild }: { children: React.ReactElement; asChild?: boolean }) {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("DialogClose must be inside <Dialog>");
  if (asChild) {
    return React.cloneElement(children, { onClick: () => ctx.setOpen(false) } as React.HTMLAttributes<HTMLElement>);
  }
  return <button onClick={() => ctx.setOpen(false)}>{children}</button>;
}
