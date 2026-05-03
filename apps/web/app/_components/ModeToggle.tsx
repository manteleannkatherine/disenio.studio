"use client";
import { useTheme } from "@disenio/ui";

export function ModeToggle() {
  const { feel, setFeel } = useTheme();
  const isDark = feel === "modernDark";
  const next = isDark ? "modern" : "modernDark";
  return (
    <button
      onClick={() => setFeel(next)}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="relative inline-flex items-center h-9 w-16 rounded-full border hairline transition-colors"
      style={{ background: "var(--ds-paper-deep)" }}
    >
      <span
        className="absolute top-1 size-7 rounded-full transition-transform duration-300 ease-out grid place-items-center"
        style={{
          transform: isDark ? "translateX(32px)" : "translateX(4px)",
          background: isDark ? "var(--ds-brand-gradient)" : "var(--ds-paper)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        {isDark ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ds-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        )}
      </span>
    </button>
  );
}
