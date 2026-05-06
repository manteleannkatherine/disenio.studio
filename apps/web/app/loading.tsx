export default function Loading() {
  return (
    <div className="flex-1 grid place-items-center px-6 py-20">
      <div className="flex flex-col items-center gap-4">
        <span className="size-3 rounded-full animate-pulse" style={{ background: "var(--ds-brand-gradient)" }} />
        <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
          Loading…
        </span>
      </div>
    </div>
  );
}
