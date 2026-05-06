import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "../_components/SiteNav";

export const metadata: Metadata = {
  title: "Showcase",
  description:
    "Real projects built with disenio.studio. See the toolkit in production — or submit yours.",
  openGraph: {
    title: "Showcase · disenio.studio",
    description: "Real projects built with disenio.studio.",
  },
};

type Status = "live" | "building" | "open";

type Project = {
  name: string;
  by: string;
  href?: string;
  blurb: string;
  tags: string[];
  status: Status;
  /** Optional gradient or accent override per card. */
  accent?: string;
};

const PROJECTS: Project[] = [
  {
    name: "disenio.studio",
    by: "CreativeKat Studio",
    href: "https://disenio.studio",
    blurb:
      "The toolkit's own site. Live theme switching, share-as-URL themes, and the entire docs surface — every component you can copy is rendered here in production.",
    tags: ["marketing", "docs", "live theme"],
    status: "live",
    accent: "linear-gradient(135deg, #b27bff 0%, #6d4cf2 50%, #2f5dff 100%)",
  },
  {
    name: "Turo LMS",
    by: "Creative Space Dubai",
    blurb:
      "A learning management system for course creators — first real production test of the toolkit. Pairs and primitives are getting hammered against course cards, lesson players, and quiz forms.",
    tags: ["LMS", "Next.js", "pairs in the wild"],
    status: "building",
    accent: "linear-gradient(135deg, #ffb86c 0%, #f25c6d 50%, #b91d73 100%)",
  },
  {
    name: "Open spot",
    by: "Could be you",
    blurb:
      "Building something with disenio.studio? Send a screenshot and a one-liner — featured projects get a real card here with a backlink.",
    tags: ["submit", "any kit", "any feel"],
    status: "open",
  },
];

const STATUS_LABELS: Record<Status, string> = {
  live: "live",
  building: "in progress",
  open: "open spot",
};

export default function ShowcasePage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <header className="mb-16 grid md:grid-cols-2 gap-8 items-end">
          <div className="flex flex-col gap-3">
            <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
              Showcase
            </span>
            <h1 className="serif text-5xl sm:text-6xl tracking-[-0.04em] font-semibold leading-[0.95]">
              Made with the toolkit.
              <br />
              <span className="brand-text italic">Or about to be.</span>
            </h1>
          </div>
          <div className="flex flex-col gap-4 max-w-md">
            <p className="text-[var(--ds-ink-soft)]">
              Honest list. One project live, one in progress, and an open slot for whoever&apos;s
              shipping next. We feature real things — not concept screens.
            </p>
            <Link
              href="/contact"
              className="self-start inline-flex items-center gap-2 text-sm font-medium text-white px-5 h-11 transition-transform hover:-translate-y-0.5"
              style={{
                borderRadius: "var(--ds-button-radius)",
                background: "var(--ds-brand-gradient)",
                boxShadow: "0 12px 30px -12px rgba(110,76,242,0.6)",
              }}
            >
              Submit your project →
            </Link>
          </div>
        </header>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <li
              key={p.name}
              className="surface flex flex-col overflow-hidden group"
            >
              {/* Visual */}
              <div
                className="aspect-[16/10] relative overflow-hidden"
                style={{
                  background:
                    p.accent ??
                    "color-mix(in oklab, var(--ds-paper-deep) 80%, var(--ds-paper))",
                }}
              >
                {/* Soft grid texture */}
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--ds-paper) 1px, transparent 1px), linear-gradient(90deg, var(--ds-paper) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Status pill */}
                <span
                  className="absolute top-4 left-4 mono text-[11px] uppercase tracking-[0.16em] px-2.5 py-1 rounded-full backdrop-blur-md"
                  style={{
                    background:
                      "color-mix(in oklab, var(--ds-paper) 60%, transparent)",
                    color: "var(--ds-ink)",
                    border: "1px solid color-mix(in oklab, var(--ds-ink) 20%, transparent)",
                  }}
                >
                  {STATUS_LABELS[p.status]}
                </span>
                {/* Big monogram */}
                <span
                  className="absolute bottom-4 right-5 serif text-7xl leading-none tracking-[-0.04em] opacity-80"
                  style={{ color: "white" }}
                >
                  {p.status === "open" ? "+" : p.name.charAt(0)}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="serif text-2xl tracking-[-0.02em]">{p.name}</h2>
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs mono uppercase tracking-wider text-[var(--ds-muted)] hover:text-[var(--ds-ink)] transition-colors shrink-0"
                    >
                      Visit ↗
                    </a>
                  )}
                </div>
                <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                  by {p.by}
                </span>
                <p className="text-sm text-[var(--ds-ink-soft)] leading-relaxed flex-1">
                  {p.blurb}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t hairline">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="mono text-[11px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full"
                      style={{
                        background: "var(--ds-paper-deep)",
                        color: "var(--ds-ink-soft)",
                        border: "1px solid var(--ds-line)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <section className="mt-20 surface-deep p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border hairline rounded-[var(--ds-radius)]">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
              Featured next
            </span>
            <h2 className="serif text-2xl sm:text-3xl tracking-[-0.02em]">
              Build something opinionated. Get a permanent backlink.
            </h2>
            <p className="text-sm text-[var(--ds-ink-soft)]">
              No design review, no waiting list — send a URL, a screenshot, and one sentence on
              what you used. If it&apos;s real, it ships here.
            </p>
          </div>
          <Link
            href="/contact"
            className="self-start sm:self-auto inline-flex items-center gap-2 text-sm font-medium text-white px-5 h-11 transition-transform hover:-translate-y-0.5"
            style={{
              borderRadius: "var(--ds-button-radius)",
              background: "var(--ds-brand-gradient)",
            }}
          >
            Submit yours →
          </Link>
        </section>
      </main>
    </>
  );
}
