import { SiteNav } from "./_components/SiteNav";
import { FeelSwitcher } from "./_components/FeelSwitcher";
import { AccentPicker } from "./_components/AccentPicker";
import { ThemeExport } from "./_components/ThemeExport";
import { ComponentShowcase } from "./_components/ComponentShowcase";
import { BrandLockup } from "./_components/BrandMark";
import { ShareThemeButton } from "./_components/ShareThemeButton";

export default function Home() {
  return (
    <>
      <SiteNav />

      {/* Hero */}
      <section className="relative px-6">
        <div className="mx-auto max-w-6xl pt-20 pb-16 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 flex flex-col gap-7">
            <div className="flex items-center gap-2">
              <span className="mono text-[10px] uppercase tracking-[0.18em] surface-deep px-3 py-1 rounded-full">
                v0.1 · early access
              </span>
              <span className="text-[var(--ds-muted)] text-xs">— diseñado en cualquier parte</span>
            </div>
            <h1 className="serif text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.045em] font-semibold">
              A design toolkit
              <br />
              with a <span className="brand-text italic">feel</span>.
            </h1>
            <p className="text-lg text-[var(--ds-ink-soft)] max-w-[52ch] leading-relaxed">
              disenio.io is a copy-paste component library you can re-skin in seconds.
              Pick a Feel — Editorial, Playful, Brutalist, Clinical — choose an accent, and the
              whole page changes around you. Then copy the CSS and own it forever.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#install"
                className="inline-flex items-center justify-center h-12 px-6 text-white font-medium transition-transform hover:-translate-y-0.5"
                style={{ borderRadius: "var(--ds-button-radius)", background: "var(--ds-brand-gradient)", boxShadow: "0 12px 30px -12px rgba(110,76,242,0.6)" }}
              >
                npx disenio init →
              </a>
              <a
                href="#components"
                className="inline-flex items-center justify-center h-12 px-6 font-medium border hairline transition-colors hover:bg-[var(--ds-paper-deep)]"
                style={{ borderRadius: "var(--ds-button-radius)" }}
              >
                Browse components
              </a>
            </div>
            <div className="flex items-center gap-6 pt-2">
              <div className="flex -space-x-2">
                {["#ff5b1f", "#7c3aed", "#10b981", "#0ea5e9"].map((c) => (
                  <span key={c} className="size-7 rounded-full border-2" style={{ background: c, borderColor: "var(--ds-paper)" }} />
                ))}
              </div>
              <span className="text-sm text-[var(--ds-ink-soft)]">
                <span className="serif text-xl">2,400+</span> developers theming.
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="surface p-6 flex flex-col gap-5 sticky top-24" id="theme">
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
                  live theme
                </span>
                <span className="size-2 rounded-full bg-[var(--ds-accent)] animate-pulse" />
              </div>
              <FeelSwitcher />
              <AccentPicker />
              <div className="border-t hairline pt-4">
                <ThemeExport />
              </div>
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <a
                  href="/docs/theming"
                  className="text-xs mono uppercase tracking-wider text-[var(--ds-ink-soft)] hover:text-[var(--ds-ink)] transition-colors"
                >
                  Full theme docs →
                </a>
                <ShareThemeButton />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y hairline overflow-hidden bg-[var(--ds-paper-deep)]">
        <div className="flex marquee-track whitespace-nowrap py-5 gap-12 serif text-3xl text-[var(--ds-ink-soft)]">
          {(["a", "b"] as const).map((k) => (
            <div key={k} className="flex gap-12 shrink-0">
              <span>copy → own → restyle</span>
              <span className="text-[var(--ds-accent)]">✦</span>
              <span>theme tokens, not theme prisons</span>
              <span className="text-[var(--ds-accent)]">✦</span>
              <span>pairs over primitives</span>
              <span className="text-[var(--ds-accent)]">✦</span>
              <span>RTL · A11y · Print · Email</span>
              <span className="text-[var(--ds-accent)]">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feels */}
      <section id="feels" className="px-6">
        <div className="mx-auto max-w-6xl py-24 flex flex-col gap-10">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">02 · feels</span>
              <h2 className="serif text-5xl mt-2 tracking-[-0.04em] font-semibold">Six moods, one system.</h2>
            </div>
            <p className="text-[var(--ds-ink-soft)] max-w-[52ch]">
              Most libraries call this "themes" and stop at color. A <em className="serif italic">feel</em> bundles
              radius, motion curves, shadow language, and typography into a coherent personality. Switch above and watch the whole site re-tune.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { f: "Modern", desc: "Crisp white. Geometric. Violet→blue accent." },
              { f: "Modern · Dark", desc: "Pure black. Gradient brand. Electric." },
              { f: "Editorial", desc: "Warm paper. Ink type. Generous restraint." },
              { f: "Playful", desc: "Springy. Pastel. Round everywhere." },
              { f: "Brutalist", desc: "Hard edges. Mono. No apologies." },
              { f: "Clinical", desc: "Cool grays. Tight. Subtle motion." },
            ].map((x) => (
              <div key={x.f} className="surface p-5 flex flex-col gap-3 min-h-[180px]">
                <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">feel</span>
                <h3 className="serif text-2xl">{x.f}</h3>
                <p className="text-sm text-[var(--ds-ink-soft)]">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Components */}
      <section id="components" className="px-6 bg-[var(--ds-paper-deep)] border-y hairline">
        <div className="mx-auto max-w-6xl py-24 flex flex-col gap-10">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">03 · components</span>
              <h2 className="serif text-5xl mt-2 tracking-[-0.04em] font-semibold">Pairs, not parts.</h2>
            </div>
            <p className="text-[var(--ds-ink-soft)] max-w-[52ch]">
              Components shown solo lie. disenio.io documents the unit you actually ship: a button next to its input,
              a card next to its peers. Every sample below reacts to the live theme.
            </p>
          </div>
          <ComponentShowcase />
        </div>
      </section>

      {/* Install */}
      <section id="install" className="px-6">
        <div className="mx-auto max-w-6xl py-24 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">04 · install</span>
            <h2 className="serif text-5xl tracking-[-0.04em] font-semibold">One command. Yours forever.</h2>
            <p className="text-[var(--ds-ink-soft)]">
              No runtime dependency. No version lock. Components copy into your repo as plain TSX,
              styled with CSS variables you already export from the theme editor.
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-3">
            {[
              { c: "npx disenio init", d: "Drop tokens + utils into your repo." },
              { c: "npx disenio add button input textarea", d: "Copy components as source." },
              { c: "npx disenio theme apply ./theme.css", d: "Use the theme you exported above." },
            ].map((s, i) => (
              <div key={s.c} className="surface p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="mono text-[10px] text-[var(--ds-muted)] w-6">0{i + 1}</span>
                  <code className="mono text-sm">{s.c}</code>
                </div>
                <span className="text-xs text-[var(--ds-ink-soft)] hidden sm:block">{s.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 bg-[var(--ds-paper-deep)] border-y hairline">
        <div className="mx-auto max-w-6xl py-24 flex flex-col gap-10">
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-3">
            <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">05 · pricing</span>
            <h2 className="serif text-5xl tracking-[-0.04em] font-semibold">Free core. Pay for polish.</h2>
            <p className="text-[var(--ds-ink-soft)]">
              The library, themes, and docs are MIT. Buy time you'd otherwise spend designing.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
            {[
              { n: "Open", p: "Free", b: "MIT components, 4 Feels, theme editor.", cta: "Get started" },
              { n: "Pro", p: "$96", b: "Premium blocks, dashboards, marketing kits, 30+ themes.", cta: "Buy lifetime", featured: true },
              { n: "Studio", p: "$480", b: "Custom Feel, Figma kit, 1:1 design review.", cta: "Talk to us" },
            ].map((p) => (
              <div
                key={p.n}
                className="surface p-6 flex flex-col gap-4"
                style={p.featured ? { borderColor: "var(--ds-ink)", borderWidth: 2 } : undefined}
              >
                <div className="flex items-center justify-between">
                  <h3 className="serif text-2xl">{p.n}</h3>
                  {p.featured && (
                    <span className="mono text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full" style={{ background: "var(--ds-accent)", color: "var(--ds-accent-ink)" }}>
                      Popular
                    </span>
                  )}
                </div>
                <div className="serif text-5xl">{p.p}</div>
                <p className="text-sm text-[var(--ds-ink-soft)] min-h-[60px]">{p.b}</p>
                <a
                  href="#install"
                  className="inline-flex items-center justify-center h-11 font-medium transition-transform hover:-translate-y-0.5"
                  style={{
                    borderRadius: "var(--ds-button-radius)",
                    background: p.featured ? "var(--ds-accent)" : "transparent",
                    color: p.featured ? "var(--ds-accent-ink)" : "var(--ds-ink)",
                    border: p.featured ? "1px solid var(--ds-accent)" : "1px solid var(--ds-line)",
                  }}
                >
                  {p.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6">
        <div className="mx-auto max-w-6xl py-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <BrandLockup height={48} />
            <p className="text-sm text-[var(--ds-ink-soft)] max-w-md">
              A copy-paste design toolkit. Modern. Customizable. Yours.
            </p>
          </div>
          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">Product</span>
              <a href="#components">Components</a>
              <a href="#feels">Feels</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">Project</span>
              <a href="https://github.com">GitHub ↗</a>
              <a href="#install">Changelog</a>
              <a href="#feels">Roadmap</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl py-6 border-t hairline flex items-center justify-between text-xs text-[var(--ds-muted)]">
          <span>© 2026 disenio.io</span>
          <span className="mono">made with restraint</span>
        </div>
      </footer>
    </>
  );
}
