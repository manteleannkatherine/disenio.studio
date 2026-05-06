"use client";
import { encodeThemeHash, useTheme } from "@disenio/ui";
import { useState } from "react";

export function ShareThemeButton() {
  const { feel, accent, gradient } = useTheme();
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const hash = encodeThemeHash({ feel, accent, gradient });
    const url = `${globalThis.location.origin}/?t=${hash}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      onClick={onShare}
      className="inline-flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium text-white transition-transform hover:-translate-y-px"
      style={{ background: "var(--ds-brand-gradient)" }}
    >
      {copied ? (
        <>
          <span aria-hidden>✓</span> URL copied
        </>
      ) : (
        <>
          <ShareIcon /> Share this theme
        </>
      )}
    </button>
  );
}

function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" />
    </svg>
  );
}
