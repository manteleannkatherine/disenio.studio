"use client";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      className="text-xs mono uppercase tracking-wider text-[var(--ds-ink-soft)] hover:text-[var(--ds-ink)] transition-colors"
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}
