"use client";
import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  label: string;
  level: 2 | 3;
}

export function DocsToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0% 0% -75% 0%", threshold: [0, 1] },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-24 flex flex-col gap-2 py-8">
      <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)] mb-2">
        On this page
      </span>
      <ul className="flex flex-col gap-1.5 text-sm">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: item.level === 3 ? 12 : 0 }}>
            <a
              href={`#${item.id}`}
              className="block transition-colors hover:text-[var(--ds-ink)]"
              style={{ color: active === item.id ? "var(--ds-ink)" : "var(--ds-muted)" }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
