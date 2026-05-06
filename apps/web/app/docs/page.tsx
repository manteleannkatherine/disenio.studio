import Link from "next/link";
import { PageHeader } from "../_components/docs/PageHeader";

export default function DocsHome() {
  return (
    <article className="flex flex-col gap-10 max-w-3xl">
      <PageHeader
        eyebrow="Docs"
        title="Introduction"
        description="disenio.studio is a copy-paste design toolkit. Components live in your repo as plain TSX, theme tokens travel as CSS variables, and a “Feel” swaps radius, motion, and shadow language together. Re-skin in seconds, own forever."
      />

      <section id="philosophy" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Philosophy</h2>
        <p className="text-[var(--ds-ink-soft)] leading-relaxed">
          Most component libraries lock you into their abstractions. disenio.studio ships
          components as <em>source</em> — you copy them into your project, theme them with
          CSS variables, and edit them when you need to. There's no version lock, no
          runtime dependency, no fighting the framework.
        </p>
      </section>

      <section id="how-it-works" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">How it works</h2>
        <ol className="flex flex-col gap-3 list-decimal pl-5 text-[var(--ds-ink-soft)] leading-relaxed">
          <li>
            <Link className="text-[var(--ds-ink)] underline underline-offset-4" href="/docs/installation">Install</Link>{" "}
            the toolkit's tokens and utilities into your project.
          </li>
          <li>
            <Link className="text-[var(--ds-ink)] underline underline-offset-4" href="/docs/cli">Add components</Link>{" "}
            with the CLI — they land as plain TSX, yours to edit.
          </li>
          <li>
            <Link className="text-[var(--ds-ink)] underline underline-offset-4" href="/docs/theming">Pick a Feel</Link>{" "}
            and an accent — the theme editor exports a CSS file you commit.
          </li>
        </ol>
      </section>

      <section id="next" className="flex flex-col gap-4 pb-12">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Next</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { href: "/docs/installation", title: "Installation", desc: "Quickstart for Next.js, Vite, Astro." },
            { href: "/docs/theming", title: "Theming", desc: "Live editor and exportable tokens." },
            { href: "/docs/components", title: "Components", desc: "Browse the full set." },
            { href: "/docs/cli", title: "CLI reference", desc: "Every disenio command." },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="surface p-4 flex flex-col gap-1.5 hover:-translate-y-0.5 transition-transform"
            >
              <span className="font-medium">{c.title} →</span>
              <span className="text-sm text-[var(--ds-muted)]">{c.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
