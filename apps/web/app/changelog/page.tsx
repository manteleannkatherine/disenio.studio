import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "../_components/SiteNav";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "What's shipped, when. disenio.studio is built in the open — every release with notes, dates, and the why.",
  openGraph: {
    title: "Changelog · disenio.studio",
    description: "What's shipped, when. Built in the open.",
  },
};

type Entry = {
  date: string;
  version: string;
  tag?: "release" | "ship" | "polish" | "brand";
  title: string;
  notes: string[];
};

const ENTRIES: Entry[] = [
  {
    date: "2026-05-07",
    version: "0.2.0",
    tag: "release",
    title: "Live on npm. Install from anywhere.",
    notes: [
      "`disenio.studio` is now publicly installable: `npx disenio.studio init` works in any directory.",
      "Brand sweep: every command in docs and on the site uses the full `disenio.studio` name.",
      "Contact form wired to a real API with branded HTML auto-reply from CreativeKat Studio.",
      "Showcase page · AI integration page · /llms.txt for AI agents.",
    ],
  },
  {
    date: "2026-05-06",
    version: "0.1.9",
    tag: "brand",
    title: "Rebrand: disenio.io → disenio.studio.",
    notes: [
      "New domain, new identity. Same toolkit underneath.",
      "Theme tokens tuned: softer paper, more legible eyebrow labels.",
      "OG images per route. Floating pill nav.",
    ],
  },
  {
    date: "2026-05-04",
    version: "0.2.0",
    tag: "ship",
    title: "Theme Gallery + the Stark feel.",
    notes: [
      "Theme Gallery — six curated Feels you can flip through and share as URLs.",
      "Stark — a new minimal feel built around line work and zero shadow.",
      "Dark mode polish across components; better contrast at small text sizes.",
    ],
  },
  {
    date: "2026-05-04",
    version: "0.1.5",
    tag: "ship",
    title: "Pairs, layout primitives, diff/update.",
    notes: [
      "Pairs landed: FormField, Toolbar, EmptyState, StatCard, FilterBar, AuthCard, PageHeading, CommentRow.",
      "Layout primitives: Stack, Cluster, Switcher, Sidebar, Center, Grid, Spacer, Divider.",
      "CLI gained `disenio.studio diff` and `disenio.studio update` — lockfile-tracked components with an upgrade path.",
      "Share themes as URLs — encode the whole token set into a link.",
      "Setup guide for fresh and existing projects.",
    ],
  },
  {
    date: "2026-05-04",
    version: "0.1.0",
    tag: "ship",
    title: "Docs site, six components, and the CLI.",
    notes: [
      "First public docs site with live previews and a11y notes.",
      "Six new components: Tabs, Toast, Dialog, Select, Avatar, Tooltip, plus DataTable.",
      "CLI v1 — `init` and `add`, with config-driven aliases.",
    ],
  },
  {
    date: "2026-05-03",
    version: "0.0.1",
    tag: "brand",
    title: "Day one. disenio.studio is born.",
    notes: [
      "Monorepo scaffolded.",
      "First three primitives: Button, Input, Card.",
      "Token surface drafted: paper, ink, accent, radius, motion, shadow.",
    ],
  },
];

const TAG_LABELS: Record<NonNullable<Entry["tag"]>, string> = {
  release: "release",
  ship: "ship",
  polish: "polish",
  brand: "brand",
};

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function ChangelogPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <header className="mb-16 flex flex-col gap-3">
          <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
            Changelog
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight">
            What&apos;s shipped, when.
          </h1>
          <p className="text-[var(--ds-ink-soft)] max-w-xl">
            disenio.studio is built in the open. Every release lands here with notes
            and a date — so you always know what changed and when.{" "}
            <Link
              href="/contact"
              className="underline-offset-4 hover:text-[var(--ds-ink)] hover:underline"
            >
              Suggest something
            </Link>{" "}
            for the next one.
          </p>
        </header>

        <ol className="flex flex-col">
          {ENTRIES.map((entry, i) => (
            <li
              key={entry.version}
              className="grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 pb-12"
            >
              {/* Left rail: date + version + tag */}
              <div className="flex flex-col gap-2 pt-1 w-24 sm:w-32 shrink-0">
                <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                  {formatDate(entry.date)}
                </span>
                <span className="mono text-xs text-[var(--ds-ink-soft)]">
                  v{entry.version}
                </span>
                {entry.tag && (
                  <span
                    className="mono text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 rounded-full self-start"
                    style={{
                      background: "var(--ds-paper-deep)",
                      color: "var(--ds-ink-soft)",
                      border: "1px solid var(--ds-line)",
                    }}
                  >
                    {TAG_LABELS[entry.tag]}
                  </span>
                )}
              </div>

              {/* Right column: title + notes, with a connecting hairline */}
              <div className="relative flex flex-col gap-3 border-l hairline pl-6 sm:pl-8 pb-2">
                {/* Dot on the rail */}
                <span
                  className="absolute -left-[5px] top-2 size-2.5 rounded-full"
                  style={{
                    background:
                      i === 0 ? "var(--ds-accent)" : "var(--ds-line)",
                    boxShadow:
                      i === 0
                        ? "0 0 0 4px color-mix(in oklab, var(--ds-accent) 18%, transparent)"
                        : "none",
                  }}
                />
                <h2 className="serif text-2xl tracking-[-0.02em] leading-tight">
                  {entry.title}
                </h2>
                <ul className="flex flex-col gap-1.5 text-[var(--ds-ink-soft)] text-[15px] leading-relaxed">
                  {entry.notes.map((n) => (
                    <li key={n} className="flex gap-3">
                      <span className="text-[var(--ds-muted)] select-none">·</span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <footer className="mt-8 pt-8 border-t hairline flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-[var(--ds-muted)]">
          <span>
            Following along?{" "}
            <Link
              href="/contact"
              className="text-[var(--ds-ink-soft)] underline-offset-4 hover:text-[var(--ds-ink)] hover:underline"
            >
              Get notified
            </Link>{" "}
            when something big ships.
          </span>
          <span className="mono text-xs">built in the open</span>
        </footer>
      </main>
    </>
  );
}
