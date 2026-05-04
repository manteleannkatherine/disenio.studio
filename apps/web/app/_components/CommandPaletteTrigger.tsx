"use client";
import { useEffect, useState } from "react";

export function CommandPaletteTrigger() {
  const [mod, setMod] = useState<"⌘" | "Ctrl">("⌘");

  useEffect(() => {
    if (typeof navigator !== "undefined" && !navigator.userAgent.includes("Mac")) {
      setMod("Ctrl");
    }
  }, []);

  const open = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }),
    );
  };

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Search docs"
      className="hidden md:inline-flex items-center gap-2 h-9 pl-3 pr-1.5 rounded-md border hairline text-sm text-[var(--ds-muted)] hover:text-[var(--ds-ink)] transition-colors"
    >
      <span aria-hidden>⌕</span>
      <span>Search</span>
      <kbd className="mono text-[10px] surface-deep px-1.5 py-0.5 rounded ml-2">{mod} K</kbd>
    </button>
  );
}
