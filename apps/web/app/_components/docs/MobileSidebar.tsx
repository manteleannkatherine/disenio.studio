"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DocsSidebar } from "./DocsSidebar";

export function MobileSidebarTrigger() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label="Open docs navigation"
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center justify-center size-10 -ml-2 rounded-md hover:bg-[var(--ds-paper-deep)] transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>
      {open && (
        <div className="lg:hidden fixed inset-0 z-[80]">
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default"
            style={{
              background: "color-mix(in oklab, var(--ds-ink) 50%, transparent)",
              backdropFilter: "blur(6px)",
            }}
          />
          <aside
            role="dialog"
            aria-modal="true"
            className="absolute top-0 left-0 bottom-0 w-[280px] bg-[var(--ds-paper)] border-r hairline overflow-y-auto px-4 animate-[slideInLeft_180ms_var(--ds-easing)]"
          >
            <DocsSidebar />
          </aside>
        </div>
      )}
    </>
  );
}
