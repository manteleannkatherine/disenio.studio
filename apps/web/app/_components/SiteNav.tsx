import Link from "next/link";
import { BrandLockup } from "./BrandMark";
import { ModeToggle } from "./ModeToggle";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[color-mix(in_oklab,var(--ds-paper)_75%,transparent)] border-b hairline">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-20">
        <Link href="/" className="flex items-center gap-2 group">
          <BrandLockup height={40} />
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)] ml-2">
            v0.1
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-[var(--ds-ink-soft)]">
          <Link href="/docs" className="hover:text-[var(--ds-ink)] transition-colors">Docs</Link>
          <Link href="/docs/components" className="hover:text-[var(--ds-ink)] transition-colors">Components</Link>
          <Link href="/docs/theming" className="hover:text-[var(--ds-ink)] transition-colors">Theming</Link>
          <Link href="/#pricing" className="hover:text-[var(--ds-ink)] transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <a
            href="https://github.com"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[var(--ds-ink-soft)] hover:text-[var(--ds-ink)] transition-colors"
          >
            GitHub ↗
          </a>
          <Link
            href="#install"
            className="inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white transition-transform hover:-translate-y-px"
            style={{ borderRadius: "var(--ds-button-radius)", background: "var(--ds-brand-gradient)" }}
          >
            Install
          </Link>
        </div>
      </div>
    </header>
  );
}
