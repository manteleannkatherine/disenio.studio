export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="surface overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b hairline bg-[var(--ds-paper-deep)]">
            <th className="text-left px-4 py-2.5 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)] font-normal">Prop</th>
            <th className="text-left px-4 py-2.5 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)] font-normal">Type</th>
            <th className="text-left px-4 py-2.5 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)] font-normal">Default</th>
            <th className="text-left px-4 py-2.5 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)] font-normal">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.name} className={i < rows.length - 1 ? "border-b hairline" : ""}>
              <td className="px-4 py-3 mono text-[13px] font-medium align-top">{r.name}</td>
              <td className="px-4 py-3 mono text-[12px] text-[var(--ds-accent)] align-top">{r.type}</td>
              <td className="px-4 py-3 mono text-[12px] text-[var(--ds-muted)] align-top">{r.default ?? "—"}</td>
              <td className="px-4 py-3 text-[var(--ds-ink-soft)] align-top">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
