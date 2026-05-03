import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  badge,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  badge?: string;
}) {
  return (
    <header className="flex flex-col gap-3 pb-8 border-b hairline">
      {eyebrow && (
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">{eyebrow}</span>
      )}
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="serif text-4xl md:text-5xl tracking-[-0.04em] font-semibold">{title}</h1>
        {badge && (
          <span className="mono text-[10px] uppercase tracking-[0.18em] surface-deep px-2.5 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      {description && <p className="text-[var(--ds-ink-soft)] text-lg max-w-[60ch]">{description}</p>}
    </header>
  );
}
