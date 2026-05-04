"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SECTIONS = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/setup", label: "Set up with your stack" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/cli", label: "CLI" },
      { href: "/docs/theming", label: "Theming" },
    ],
  },
  {
    title: "Pairs",
    items: [
      { href: "/docs/pairs", label: "Why pairs" },
      { href: "/docs/pairs#form-field", label: "FormField" },
      { href: "/docs/pairs#toolbar", label: "Toolbar" },
      { href: "/docs/pairs#empty-state", label: "EmptyState" },
      { href: "/docs/pairs#stat-card", label: "StatCard" },
    ],
  },
  {
    title: "Components",
    items: [
      { href: "/docs/components", label: "All components" },
      { href: "/docs/components/badge", label: "Badge" },
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/card", label: "Card" },
      { href: "/docs/components/dialog", label: "Dialog" },
      { href: "/docs/components/input", label: "Input" },
      { href: "/docs/components/layout", label: "Layout" },
      { href: "/docs/components/select", label: "Select" },
      { href: "/docs/components/switch", label: "Switch" },
      { href: "/docs/components/tabs", label: "Tabs" },
      { href: "/docs/components/textarea", label: "Textarea" },
      { href: "/docs/components/toast", label: "Toast" },
    ],
  },
];

function splitHref(href: string) {
  const i = href.indexOf("#");
  if (i === -1) return { path: href, hash: "" };
  return { path: href.slice(0, i), hash: href.slice(i + 1) };
}

export function DocsSidebar() {
  const pathname = usePathname();
  const [hash, setHash] = useState<string>("");

  // Track URL hash (clicks + back/forward) and scroll-spy through page sections.
  useEffect(() => {
    const sync = () => setHash(globalThis.location?.hash.replace("#", "") ?? "");
    sync();
    globalThis.addEventListener("hashchange", sync);

    // Find candidate section ids from sidebar entries on this pathname
    const ids = SECTIONS
      .flatMap((s) => s.items)
      .filter((i) => splitHref(i.href).path === pathname)
      .map((i) => splitHref(i.href).hash)
      .filter(Boolean);

    if (ids.length === 0) {
      return () => globalThis.removeEventListener("hashchange", sync);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHash(entry.target.id);
            return;
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: [0, 1] },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      globalThis.removeEventListener("hashchange", sync);
      observer.disconnect();
    };
  }, [pathname]);

  // Best-match active: prefer items whose path AND hash match; if no hash item
  // on this path is active yet, the bare-path entry wins.
  function isActive(itemHref: string) {
    const { path, hash: itemHash } = splitHref(itemHref);
    if (path !== pathname) return false;
    if (itemHash) return hash === itemHash;
    // Bare-path entry: only "active" when no hash entry on this path matches
    const sectionItems = SECTIONS.flatMap((s) => s.items);
    const hasMatchingHash = sectionItems.some((i) => {
      const sp = splitHref(i.href);
      return sp.path === pathname && sp.hash && sp.hash === hash;
    });
    return !hasMatchingHash;
  }

  return (
    <nav className="flex flex-col gap-7 py-8 pr-6 sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
      {SECTIONS.map((section) => (
        <div key={section.title} className="flex flex-col gap-1.5">
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)] px-3 mb-1">
            {section.title}
          </span>
          {section.items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex items-center px-3 h-8 text-sm rounded-md transition-colors"
                style={{
                  color: active ? "var(--ds-ink)" : "var(--ds-ink-soft)",
                  background: active ? "var(--ds-paper-deep)" : "transparent",
                  fontWeight: active ? 500 : 400,
                }}
              >
                {active && (
                  <span
                    className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full"
                    style={{ background: "var(--ds-brand-gradient)" }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
