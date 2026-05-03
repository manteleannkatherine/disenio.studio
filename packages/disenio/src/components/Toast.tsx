"use client";
import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "../utils/cn";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  tone?: "neutral" | "accent" | "danger";
  duration?: number;
}

interface ToastCtx {
  toast: (t: Omit<Toast, "id"> & { id?: string }) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((curr) => curr.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback<ToastCtx["toast"]>(
    (t) => {
      const id = t.id ?? Math.random().toString(36).slice(2);
      const duration = t.duration ?? 4000;
      setToasts((curr) => [...curr, { ...t, id }]);
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration);
      }
      return id;
    },
    [dismiss],
  );

  const value = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        createPortal(
          <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[360px] max-w-[calc(100vw-2rem)] pointer-events-none">
            {toasts.map((t) => (
              <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

function ToastItem({ toast: t, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const tones = {
    neutral: "border-[var(--ds-line)]",
    accent: "border-[var(--ds-accent)]",
    danger: "border-red-500",
  };
  const dot = {
    neutral: "bg-[var(--ds-muted)]",
    accent: "bg-[var(--ds-accent)]",
    danger: "bg-red-500",
  };
  return (
    <div
      role="status"
      className={cn(
        "pointer-events-auto rounded-[var(--ds-radius)] border bg-[var(--ds-paper)] p-4 shadow-[var(--ds-shadow)]",
        "flex items-start gap-3 animate-[slideUp_180ms_var(--ds-easing)]",
        tones[t.tone ?? "neutral"],
      )}
    >
      <span className={cn("size-2 mt-2 rounded-full shrink-0", dot[t.tone ?? "neutral"])} />
      <div className="flex-1 min-w-0">
        {t.title && <div className="font-medium text-[var(--ds-ink)]">{t.title}</div>}
        {t.description && <div className="text-sm text-[var(--ds-ink-soft)] mt-0.5">{t.description}</div>}
      </div>
      <button
        onClick={onDismiss}
        className="text-[var(--ds-muted)] hover:text-[var(--ds-ink)] transition-colors text-lg leading-none"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
