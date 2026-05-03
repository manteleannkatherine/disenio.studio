import type { Metadata } from "next";
import Link from "next/link";
import { BrandLockup } from "../_components/BrandMark";

export const metadata: Metadata = {
  title: "disenio.io · studio",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/components", label: "Components" },
  { href: "/admin/themes", label: "Themes" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/changelog", label: "Changelog" },
  { href: "/admin/sales", label: "Sales" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 grid grid-cols-[240px_1fr] min-h-screen">
      <aside className="border-r hairline p-5 flex flex-col gap-6 bg-[var(--ds-paper-deep)]">
        <Link href="/" className="flex flex-col gap-1">
          <BrandLockup height={36} />
          <span className="mono text-[9px] uppercase tracking-[0.18em] text-[var(--ds-muted)] pl-9">studio</span>
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 h-9 rounded-lg flex items-center text-sm text-[var(--ds-ink-soft)] hover:bg-[var(--ds-paper)] hover:text-[var(--ds-ink)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto surface p-3 text-xs text-[var(--ds-ink-soft)]">
          <p className="font-medium text-[var(--ds-ink)] mb-1">Hidden by default</p>
          <p className="text-[var(--ds-muted)]">noindex · gate with auth before deploy.</p>
        </div>
      </aside>
      <main className="p-10">{children}</main>
    </div>
  );
}
