"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTIONS = [
  {
    title: "Getting Started",
    items: [
      { href: "/docs", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/cli", label: "CLI" },
      { href: "/docs/theming", label: "Theming" },
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
      { href: "/docs/components/select", label: "Select" },
      { href: "/docs/components/switch", label: "Switch" },
      { href: "/docs/components/tabs", label: "Tabs" },
      { href: "/docs/components/textarea", label: "Textarea" },
      { href: "/docs/components/toast", label: "Toast" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-7 py-8 pr-6 sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
      {SECTIONS.map((section) => (
        <div key={section.title} className="flex flex-col gap-1.5">
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)] px-3 mb-1">
            {section.title}
          </span>
          {section.items.map((item) => {
            const active = pathname === item.href;
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
