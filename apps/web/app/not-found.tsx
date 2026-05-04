import Link from "next/link";
import { SiteNav } from "./_components/SiteNav";

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center gap-6">
        <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
          404
        </span>
        <h1 className="serif text-[clamp(3rem,8vw,6rem)] tracking-[-0.045em] font-semibold">
          Nothing here.
        </h1>
        <p className="text-[var(--ds-ink-soft)] max-w-md">
          The page you're looking for has been moved, renamed, or never existed. It happens.
        </p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-11 px-5 text-white font-medium transition-transform hover:-translate-y-0.5"
            style={{ borderRadius: "var(--ds-button-radius)", background: "var(--ds-brand-gradient)" }}
          >
            Back home →
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center h-11 px-5 font-medium border hairline transition-colors hover:bg-[var(--ds-paper-deep)]"
            style={{ borderRadius: "var(--ds-button-radius)" }}
          >
            Browse docs
          </Link>
        </div>
      </main>
    </>
  );
}
