"use client";
import { useTheme } from "@disenio/ui";

export function CalmToggle() {
  const { calm, setCalm } = useTheme();
  return (
    <button
      type="button"
      onClick={() => setCalm(!calm)}
      aria-pressed={calm}
      aria-label={`${calm ? "Disable" : "Enable"} calm mode`}
      title={`${calm ? "Disable" : "Enable"} calm mode (reduces motion)`}
      className="hidden sm:inline-flex items-center justify-center size-9 rounded-md border hairline transition-colors hover:bg-[var(--ds-paper-deep)]"
      style={{
        color: calm ? "var(--ds-accent)" : "var(--ds-ink-soft)",
      }}
    >
      {calm ? (
        // filled "calm" leaf
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 21c8.284 0 18-3 18-18C12 3 3 12 3 21Z" />
        </svg>
      ) : (
        // outline leaf
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 21c8.284 0 18-3 18-18C12 3 3 12 3 21Z" />
          <path d="M3 21c2-3 5.5-5 9-7" opacity="0.7" />
        </svg>
      )}
    </button>
  );
}
