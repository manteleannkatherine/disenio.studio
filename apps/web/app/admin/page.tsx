const STATS = [
  { k: "Installs (7d)", v: "1,284", d: "+18%" },
  { k: "Theme exports", v: "342", d: "+24%" },
  { k: "Pro revenue (MTD)", v: "$2,304", d: "+9%" },
  { k: "GH stars", v: "5,712", d: "+2%" },
];

const ACTIVITY = [
  { who: "registry", what: "published @disenio/ui v0.1.4", when: "2m ago" },
  { who: "blog", what: "drafted: Why feels beat themes", when: "1h ago" },
  { who: "sales", what: "Pro purchase — $96 (Berlin)", when: "3h ago" },
  { who: "sales", what: "Studio inquiry — acme.co", when: "yesterday" },
];

export default function AdminHome() {
  return (
    <div className="flex flex-col gap-10 max-w-5xl">
      <header className="flex items-end justify-between">
        <div>
          <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">studio</span>
          <h1 className="serif text-4xl mt-1">Buenas tardes, Ann.</h1>
          <p className="text-[var(--ds-ink-soft)] mt-1">Here's what's moving today.</p>
        </div>
        <button className="h-10 px-4 rounded-full bg-[var(--ds-ink)] text-[var(--ds-paper)] text-sm font-medium" style={{ borderRadius: "var(--ds-button-radius)" }}>
          + New post
        </button>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map((s) => (
          <div key={s.k} className="surface p-4 flex flex-col gap-2">
            <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">{s.k}</span>
            <span className="serif text-3xl">{s.v}</span>
            <span className="text-xs text-[var(--ds-accent)] mono">{s.d}</span>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="surface p-5 lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="serif text-xl">Activity</h2>
            <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">live</span>
          </div>
          <ul className="flex flex-col divide-y hairline">
            {ACTIVITY.map((a) => (
              <li key={a.what} className="flex items-center justify-between py-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="mono text-[12px] uppercase tracking-[0.14em] surface-deep px-2 py-0.5 rounded-full">{a.who}</span>
                  <span>{a.what}</span>
                </div>
                <span className="text-xs text-[var(--ds-muted)]">{a.when}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="surface p-5 flex flex-col gap-3">
          <h2 className="serif text-xl">Quick actions</h2>
          {["Publish a theme pack", "Add a Pro block", "Schedule a changelog", "Invite a contributor"].map((q) => (
            <button key={q} className="text-left text-sm px-3 h-10 rounded-lg surface-deep hover:bg-[var(--ds-paper)] transition-colors">
              {q} →
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
