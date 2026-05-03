"use client";
import { useTheme } from "@disenio/ui";
import { useState } from "react";

export function ThemeExport() {
  const { exportCss } = useTheme();
  const [copied, setCopied] = useState(false);
  const css = exportCss();

  const onCopy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center justify-between px-4 h-11 border-b hairline">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[var(--ds-accent)]" />
          <span className="mono text-xs text-[var(--ds-ink-soft)]">theme.css</span>
        </div>
        <button
          onClick={onCopy}
          className="text-xs mono uppercase tracking-wider text-[var(--ds-ink-soft)] hover:text-[var(--ds-ink)] transition-colors"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="p-4 text-[12px] leading-relaxed mono overflow-x-auto text-[var(--ds-ink-soft)] max-h-[280px]">
        {css}
      </pre>
    </div>
  );
}
