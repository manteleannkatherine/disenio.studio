import Link from "next/link";
import { SiteNav } from "./_components/SiteNav";
import { FeelSwitcher } from "./_components/FeelSwitcher";
import { AccentPicker } from "./_components/AccentPicker";
import { ThemeExport } from "./_components/ThemeExport";
import { BrandLockup } from "./_components/BrandMark";
import { ShareThemeButton } from "./_components/ShareThemeButton";
import { HomeShowcase } from "./_components/HomeShowcase";
import { ThemeGallery } from "./_components/ThemeGallery";

export default function Home() {
  return (
    <>
      <SiteNav />

      {/* Hero */}
      <section className="relative px-6">
        <div className="mx-auto max-w-6xl pt-16 lg:pt-20 pb-16 grid lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-7 flex flex-col gap-7">
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="https://www.npmjs.com/package/disenio.studio"
                target="_blank"
                rel="noreferrer"
                className="mono text-[12px] uppercase tracking-[0.14em] surface-deep px-3 py-1 rounded-full inline-flex items-center gap-1.5 hover:text-[var(--ds-ink)] transition-colors"
              >
                <span aria-hidden className="relative flex size-1.5">
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: "#22c55e", opacity: 0.6 }}
                  />
                  <span
                    className="relative size-1.5 rounded-full"
                    style={{ background: "#22c55e" }}
                  />
                </span>
                live on npm · v0.2 ↗
              </a>
              <span
                className="mono text-[12px] uppercase tracking-[0.14em] px-3 py-1 rounded-full"
                style={{ background: "var(--ds-brand-gradient)", color: "white" }}
              >
                new · pairs · diff/update CLI
              </span>
              <Link
                href="/ai"
                className="mono text-[12px] uppercase tracking-[0.14em] surface-deep px-3 py-1 rounded-full inline-flex items-center gap-1.5 hover:text-[var(--ds-ink)] transition-colors"
              >
                <span
                  aria-hidden
                  className="size-1.5 rounded-full"
                  style={{ background: "var(--ds-accent)" }}
                />
                AI-ready · prompt included →
              </Link>
            </div>

            <h1 className="serif text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.045em] font-semibold">
              A design toolkit
              <br />
              with a <span className="brand-text italic">feel</span>.
            </h1>

            <p className="text-lg text-[var(--ds-ink-soft)] max-w-[54ch] leading-relaxed">
              disenio.studio is a copy-paste component library you can re-skin in seconds.
              Pick a Feel, choose an accent, share the URL — the whole site re-tunes around you.
              Then copy the source and own it forever.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/docs/setup"
                className="inline-flex items-center justify-center h-12 px-6 text-white font-medium transition-transform hover:-translate-y-0.5"
                style={{
                  borderRadius: "var(--ds-button-radius)",
                  background: "var(--ds-brand-gradient)",
                  boxShadow: "0 12px 30px -12px rgba(110,76,242,0.6)",
                }}
              >
                Get started → npx disenio.studio init
              </Link>
              <Link
                href="/docs/components"
                className="inline-flex items-center justify-center h-12 px-6 font-medium border hairline transition-colors hover:bg-[var(--ds-paper-deep)]"
                style={{ borderRadius: "var(--ds-button-radius)" }}
              >
                Browse components
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t hairline">
              {[
                { v: "11", l: "components" },
                { v: "8", l: "layout primitives" },
                { v: "4", l: "pairs" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col gap-1">
                  <span className="serif text-3xl tracking-[-0.02em]">{s.v}</span>
                  <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live theme card */}
          <div className="lg:col-span-5">
            <div className="surface p-6 flex flex-col gap-5 lg:sticky lg:top-24" id="theme">
              <div className="flex items-center justify-between">
                <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
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
                <Link
                  href="/docs/theming"
                  className="text-xs mono uppercase tracking-wider text-[var(--ds-ink-soft)] hover:text-[var(--ds-ink)] transition-colors"
                >
                  Full theme docs →
                </Link>
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
              <span>live diff against upstream</span>
              <span className="text-[var(--ds-accent)]">✦</span>
              <span>share themes as URLs</span>
              <span className="text-[var(--ds-accent)]">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section id="why" className="px-6">
        <div className="mx-auto max-w-6xl py-24 flex flex-col gap-12">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                01 · why disenio.studio
              </span>
              <h2 className="serif text-4xl md:text-5xl mt-2 tracking-[-0.04em] font-semibold">
                What other libraries don't ship.
              </h2>
            </div>
            <p className="text-[var(--ds-ink-soft)] max-w-[52ch]">
              Most copy-paste libraries dump primitives in your repo and walk away. disenio.studio
              ships the layer everyone else skips — pairs, layouts, an upgrade path, and a viral
              theme system.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                k: "Feels system",
                d: "Six themes that bundle radius, motion, shadow, and type — not just color. Switch above to watch.",
                href: "/docs/theming",
              },
              {
                k: "Pairs",
                d: "FormField, Toolbar, EmptyState, StatCard. The unit between primitives and templates that nobody else documents.",
                href: "/docs/pairs",
              },
              {
                k: "diff & update",
                d: "Lockfile-tracked components. Run `disenio.studio diff` to see what changed upstream, `update` to pull it in.",
                href: "/docs/cli",
              },
              {
                k: "Share themes",
                d: "Click Share. Send the URL. The recipient sees the entire site rendered in your theme. Built-in viral.",
                href: "/docs/theming",
              },
            ].map((x) => (
              <Link
                key={x.k}
                href={x.href}
                className="surface p-5 flex flex-col gap-3 min-h-[180px] hover:-translate-y-1 transition-transform group"
              >
                <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                  feature
                </span>
                <h3 className="serif text-2xl tracking-[-0.02em]">{x.k}</h3>
                <p className="text-sm text-[var(--ds-ink-soft)] flex-1">{x.d}</p>
                <span className="text-[var(--ds-muted)] group-hover:text-[var(--ds-ink)] transition-colors text-sm">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Themes in the wild */}
      <section id="themes" className="px-6">
        <div className="mx-auto max-w-6xl py-24 flex flex-col gap-10">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                02 · themes in the wild
              </span>
              <h2 className="serif text-4xl md:text-5xl mt-2 tracking-[-0.04em] font-semibold">
                Curated themes you can apply or share.
              </h2>
            </div>
            <p className="text-[var(--ds-ink-soft)] max-w-[52ch]">
              Every theme below is a real <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">/t/&lt;hash&gt;</code> URL.
              Click <em>Apply</em> to render the entire site in that theme — or copy the share link to send it to anyone.
            </p>
          </div>
          <ThemeGallery />

          {/* Built with strip */}
          <div className="mt-8 pt-8 border-t hairline flex flex-col gap-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                built with disenio.studio
              </span>
              <Link
                href="/showcase"
                className="text-xs mono uppercase tracking-wider text-[var(--ds-ink-soft)] hover:text-[var(--ds-ink)] transition-colors"
              >
                See full showcase →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                {
                  name: "disenio.studio",
                  by: "CreativeKat Studio",
                  note: "live · this site",
                  status: "live" as const,
                  accent: "linear-gradient(135deg, #b27bff 0%, #6d4cf2 50%, #2f5dff 100%)",
                  href: "/",
                },
                {
                  name: "Turo LMS",
                  by: "Creative Space Dubai",
                  note: "in progress · pairs in the wild",
                  status: "building" as const,
                  accent: "linear-gradient(135deg, #ffb86c 0%, #f25c6d 50%, #b91d73 100%)",
                  href: "/showcase",
                },
                {
                  name: "Open spot",
                  by: "Could be you",
                  note: "send a screenshot — get featured",
                  status: "open" as const,
                  accent: "color-mix(in oklab, var(--ds-paper-deep) 80%, var(--ds-paper))",
                  href: "/contact",
                },
              ].map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  className="surface-deep overflow-hidden flex flex-col hover:-translate-y-0.5 transition-transform"
                >
                  <div
                    className="aspect-[16/9] relative"
                    style={{ background: s.accent }}
                  >
                    <div
                      className="absolute inset-0 opacity-25 mix-blend-overlay"
                      style={{
                        backgroundImage:
                          "linear-gradient(var(--ds-paper) 1px, transparent 1px), linear-gradient(90deg, var(--ds-paper) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <span
                      className="absolute bottom-3 right-4 serif text-5xl leading-none tracking-[-0.04em] opacity-80"
                      style={{ color: "white" }}
                    >
                      {s.status === "open" ? "+" : s.name.charAt(0)}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-1">
                    <span className="text-sm font-medium">{s.name}</span>
                    <span className="text-[11px] mono uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                      by {s.by}
                    </span>
                    <span className="text-xs text-[var(--ds-ink-soft)] mt-1">{s.note}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="px-6 bg-[var(--ds-paper-deep)] border-y hairline">
        <div className="mx-auto max-w-6xl py-24 flex flex-col gap-10">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                03 · showcase
              </span>
              <h2 className="serif text-4xl md:text-5xl mt-2 tracking-[-0.04em] font-semibold">
                Built from the toolkit, theme-aware.
              </h2>
            </div>
            <p className="text-[var(--ds-ink-soft)] max-w-[52ch]">
              These are pairs and primitives composed in the wild. Change the Feel above — every
              card, button, badge, and stat re-tunes in real time.
            </p>
          </div>
          <HomeShowcase />
        </div>
      </section>

      {/* Install */}
      <section id="install" className="px-6">
        <div className="mx-auto max-w-6xl py-24 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
              04 · install
            </span>
            <h2 className="serif text-4xl md:text-5xl tracking-[-0.04em] font-semibold">
              Four commands. Yours forever.
            </h2>
            <p className="text-[var(--ds-ink-soft)]">
              No runtime dependency. No version lock. Components copy into your repo as plain TSX,
              styled with CSS variables you exported from the editor.
            </p>
            <a
              href="https://www.npmjs.com/package/disenio.studio"
              target="_blank"
              rel="noreferrer"
              className="self-start mono text-[12px] uppercase tracking-[0.14em] surface-deep px-3 py-1.5 rounded-full inline-flex items-center gap-2 hover:text-[var(--ds-ink)] transition-colors"
            >
              <span aria-hidden className="relative flex size-1.5">
                <span
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ background: "#22c55e", opacity: 0.6 }}
                />
                <span
                  className="relative size-1.5 rounded-full"
                  style={{ background: "#22c55e" }}
                />
              </span>
              Live on npm · view package ↗
            </a>
            <Link
              href="/docs/setup"
              className="inline-flex items-center gap-2 text-sm text-[var(--ds-ink)] underline underline-offset-4 hover:text-[var(--ds-accent)] transition-colors"
            >
              Setup guide for your stack →
            </Link>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-3">
            {[
              { c: "npx disenio.studio init", d: "Drop tokens, the cn util, and a starter theme." },
              { c: "npx disenio.studio add button form-field stack", d: "Copy components and pairs as source." },
              { c: "npx disenio.studio diff", d: "See what changed locally vs upstream." },
              { c: "npx disenio.studio update --force", d: "Pull the latest into your repo." },
            ].map((s, i) => (
              <div key={s.c} className="surface p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="mono text-[10px] text-[var(--ds-muted)] w-6 shrink-0">
                    0{i + 1}
                  </span>
                  <code className="mono text-sm truncate">{s.c}</code>
                </div>
                <span className="text-xs text-[var(--ds-ink-soft)] hidden md:block shrink-0">
                  {s.d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI bridge */}
      <section className="px-6">
        <div className="mx-auto max-w-6xl pb-16">
          <div
            className="surface-deep relative overflow-hidden p-6 sm:p-8 grid sm:grid-cols-[1fr_auto] gap-6 items-center border hairline"
            style={{ borderRadius: "var(--ds-radius)" }}
          >
            <div
              aria-hidden
              className="absolute -right-20 -top-24 size-72 rounded-full opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, var(--ds-accent) 0%, transparent 70%)",
              }}
            />
            <div className="relative flex flex-col gap-2">
              <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                — Building with Claude or Cursor?
              </span>
              <h3 className="serif text-2xl sm:text-3xl tracking-[-0.025em] font-semibold">
                Drop one prompt instead of explaining the toolkit.
              </h3>
              <p className="text-sm text-[var(--ds-ink-soft)] max-w-xl">
                We wrote the system prompt for you. Conventions, tokens, pairs, CLI commands —
                everything an AI assistant needs to ship correct code on the first try.
              </p>
            </div>
            <Link
              href="/ai"
              className="relative inline-flex items-center justify-center h-11 px-5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 self-start sm:self-auto whitespace-nowrap"
              style={{
                borderRadius: "var(--ds-button-radius)",
                background: "var(--ds-brand-gradient)",
                boxShadow: "0 12px 30px -12px rgba(110,76,242,0.55)",
              }}
            >
              Grab the prompt →
            </Link>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="px-6 bg-[var(--ds-paper-deep)] border-y hairline">
        <div className="mx-auto max-w-6xl py-24 flex flex-col gap-12">
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                05 · roadmap
              </span>
              <h2 className="serif text-4xl md:text-5xl mt-2 tracking-[-0.04em] font-semibold">
                What we&apos;re shipping next.
              </h2>
            </div>
            <p className="text-[var(--ds-ink-soft)] max-w-[52ch]">
              Built in public. The list is short on purpose — we&apos;d rather ship three things
              well than promise twelve. Want a vote?{" "}
              <Link
                href="/contact"
                className="underline-offset-4 hover:text-[var(--ds-ink)] hover:underline"
              >
                Tell us
              </Link>
              .
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                kind: "shipped",
                label: "Shipped",
                dot: "var(--ds-accent)",
                glow:
                  "0 0 0 4px color-mix(in oklab, var(--ds-accent) 22%, transparent)",
                items: [
                  "Live on npm — npx disenio.studio init",
                  "14 components",
                  "9 pairs",
                  "8 layout primitives",
                  "6 Feels",
                  "CLI: init / add / diff / update",
                  "Share themes as URLs",
                  "AI integration prompt",
                ],
              },
              {
                kind: "next",
                label: "Next up",
                dot: "var(--ds-ink)",
                glow: "none",
                items: [
                  "Combobox & Multiselect",
                  "Date / range picker",
                  "Drawer / Sheet",
                  "Command palette (as a primitive)",
                  "Marketing Kit (10 sections)",
                  "Live install metrics on the site",
                ],
              },
              {
                kind: "later",
                label: "Later",
                dot: "var(--ds-muted)",
                glow: "none",
                items: [
                  "Dashboard Kit",
                  "Email Kit",
                  "Hosted Studio (custom domain)",
                  "Figma plugin",
                  "Theme marketplace",
                ],
              },
            ].map((col) => (
              <div
                key={col.kind}
                className="surface p-6 flex flex-col gap-5 relative"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="size-2 rounded-full shrink-0"
                    style={{ background: col.dot, boxShadow: col.glow }}
                  />
                  <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-ink-soft)]">
                    {col.label}
                  </span>
                  <span className="mono text-[11px] text-[var(--ds-muted)] ml-auto">
                    {col.items.length}
                  </span>
                </div>
                <ul className="flex flex-col gap-2">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-[var(--ds-ink-soft)]"
                    >
                      <span
                        className="mono text-[var(--ds-muted)] mt-0.5 select-none"
                        aria-hidden
                      >
                        {col.kind === "shipped" ? "✓" : col.kind === "next" ? "→" : "·"}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Notify CTA */}
          <div
            className="surface relative overflow-hidden p-6 sm:p-8 grid sm:grid-cols-[1fr_auto] gap-6 items-center"
            style={{ borderRadius: "var(--ds-radius)" }}
          >
            <div
              aria-hidden
              className="absolute -left-32 -bottom-24 size-72 rounded-full opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, var(--ds-accent) 0%, transparent 70%)",
              }}
            />
            <div className="relative flex flex-col gap-2">
              <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                — Want a heads up?
              </span>
              <h3 className="serif text-2xl sm:text-3xl tracking-[-0.025em] font-semibold">
                Get notified when the next drop ships.
              </h3>
              <p className="text-sm text-[var(--ds-ink-soft)] max-w-xl">
                One short email when something on the roadmap goes live. No mailing list, no
                drip funnel — just a heads up. Unsubscribe with one click.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center h-11 px-5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 self-start sm:self-auto whitespace-nowrap"
              style={{
                borderRadius: "var(--ds-button-radius)",
                background: "var(--ds-brand-gradient)",
                boxShadow: "0 12px 30px -12px rgba(110,76,242,0.55)",
              }}
            >
              Notify me →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6">
        <div className="mx-auto max-w-6xl py-14 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="flex flex-col gap-3">
            <BrandLockup height={48} />
            <p className="text-sm text-[var(--ds-ink-soft)] max-w-md">
              A copy-paste design toolkit. Modern. Customizable. Yours.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                Product
              </span>
              <Link href="/docs/components">Components</Link>
              <Link href="/docs/pairs">Pairs</Link>
              <Link href="/docs/theming">Theming</Link>
              <Link href="/docs/cli">CLI</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                Learn
              </span>
              <Link href="/docs">Docs</Link>
              <Link href="/docs/setup">Setup</Link>
              <Link href="/docs/installation">Installation</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                Project
              </span>
              <a href="#roadmap">Roadmap</a>
              <a href="/changelog">Changelog</a>
              <a href="/contact">Contact</a>
              <a href="/ai">Use with AI</a>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl py-6 border-t hairline flex items-center justify-between text-xs text-[var(--ds-muted)]">
          <span>
            © 2026 disenio.studio · a{" "}
            <a
              href="https://creativekat.studio"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-[var(--ds-ink)] hover:underline"
            >
              creativekat.studio
            </a>{" "}
            project
          </span>
          <span className="mono">made with restraint</span>
        </div>
      </footer>
    </>
  );
}
