import type { Metadata } from "next";
import { SiteNav } from "../_components/SiteNav";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Collab, custom themes, feedback, or just to say hi — drop a line. disenio.studio is built by CreativeKat Studio.",
  openGraph: {
    title: "Contact · disenio.studio",
    description: "Collab, custom themes, feedback, or just to say hi.",
  },
};

const CONTACT_EMAIL = "hello@creativekat.studio";

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <header className="mb-12 flex flex-col gap-3">
          <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
            Contact
          </span>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight">
            Let&apos;s build something
          </h1>
          <p className="text-[var(--ds-ink-soft)] max-w-xl">
            Collab, a custom theme, feedback on a component, or just to say hi —
            drop a line and you&apos;ll hear back within a couple of days. disenio.studio is a
            small, focused project from{" "}
            <a
              href="https://creativekat.studio"
              target="_blank"
              rel="noreferrer"
              className="underline-offset-4 hover:text-[var(--ds-ink)] hover:underline"
            >
              CreativeKat Studio
            </a>
            .
          </p>
        </header>

        <ContactForm to={CONTACT_EMAIL} />

        <footer className="mt-16 pt-8 border-t hairline flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-[var(--ds-muted)]">
          <span>
            Prefer email directly?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[var(--ds-ink-soft)] underline-offset-4 hover:text-[var(--ds-ink)] hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </span>
          <span className="mono text-xs">no autoresponders, no funnels</span>
        </footer>
      </main>
    </>
  );
}
