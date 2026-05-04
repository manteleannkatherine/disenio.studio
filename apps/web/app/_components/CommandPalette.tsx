"use client";
import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

interface PaletteItem {
  id: string;
  title: string;
  group: "Getting Started" | "Pairs" | "Components" | "Pages";
  href: string;
  keywords?: string;
}

const ITEMS: PaletteItem[] = [
  // Pages / Getting Started
  { id: "home",        title: "Home",                 group: "Pages",            href: "/" },
  { id: "docs",        title: "Introduction",         group: "Getting Started",  href: "/docs" },
  { id: "setup",       title: "Set up with your stack", group: "Getting Started", href: "/docs/setup", keywords: "next vite astro remix tanstack install" },
  { id: "install",     title: "Installation",         group: "Getting Started",  href: "/docs/installation" },
  { id: "cli",         title: "CLI reference",        group: "Getting Started",  href: "/docs/cli", keywords: "init add diff update list lockfile" },
  { id: "theming",     title: "Theming",              group: "Getting Started",  href: "/docs/theming", keywords: "feel accent token export share" },
  // Pairs
  { id: "pairs",       title: "Why pairs",            group: "Pairs",            href: "/docs/pairs", keywords: "thesis composition" },
  { id: "form-field",  title: "FormField",            group: "Pairs",            href: "/docs/pairs#form-field" },
  { id: "toolbar",     title: "Toolbar",              group: "Pairs",            href: "/docs/pairs#toolbar" },
  { id: "filter-bar",  title: "FilterBar",            group: "Pairs",            href: "/docs/pairs#filter-bar" },
  { id: "empty-state", title: "EmptyState",           group: "Pairs",            href: "/docs/pairs#empty-state" },
  { id: "stat-card",   title: "StatCard",             group: "Pairs",            href: "/docs/pairs#stat-card" },
  { id: "auth-card",   title: "AuthCard",             group: "Pairs",            href: "/docs/pairs#auth-card", keywords: "login signin signup" },
  { id: "page-heading",title: "PageHeading",          group: "Pairs",            href: "/docs/pairs#page-heading" },
  { id: "comment-row", title: "CommentRow",           group: "Pairs",            href: "/docs/pairs#comment-row" },
  { id: "price-card",  title: "PriceCard",            group: "Pairs",            href: "/docs/pairs#price-card", keywords: "pricing tier" },
  // Components
  { id: "all-components", title: "All components",    group: "Components",       href: "/docs/components" },
  { id: "avatar",      title: "Avatar",               group: "Components",       href: "/docs/components/avatar", keywords: "user image initials" },
  { id: "badge",       title: "Badge",                group: "Components",       href: "/docs/components/badge" },
  { id: "button",      title: "Button",               group: "Components",       href: "/docs/components/button" },
  { id: "card",        title: "Card",                 group: "Components",       href: "/docs/components/card" },
  { id: "data-table",  title: "DataTable",            group: "Components",       href: "/docs/components/data-table", keywords: "sort filter table grid" },
  { id: "dialog",      title: "Dialog",               group: "Components",       href: "/docs/components/dialog", keywords: "modal popup" },
  { id: "input",       title: "Input",                group: "Components",       href: "/docs/components/input", keywords: "text field" },
  { id: "layout",      title: "Layout (Stack, Cluster, Grid…)", group: "Components", href: "/docs/components/layout", keywords: "stack cluster sidebar center grid spacer divider switcher" },
  { id: "select",      title: "Select",               group: "Components",       href: "/docs/components/select", keywords: "dropdown menu" },
  { id: "switch",      title: "Switch",               group: "Components",       href: "/docs/components/switch", keywords: "toggle" },
  { id: "tabs",        title: "Tabs",                 group: "Components",       href: "/docs/components/tabs" },
  { id: "textarea",    title: "Textarea",             group: "Components",       href: "/docs/components/textarea" },
  { id: "toast",       title: "Toast",                group: "Components",       href: "/docs/components/toast", keywords: "notification snackbar" },
  { id: "tooltip",     title: "Tooltip",              group: "Components",       href: "/docs/components/tooltip", keywords: "hint hover" },
];

function fuzzy(query: string, items: PaletteItem[]) {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items
    .map((it) => {
      const hay = `${it.title} ${it.keywords ?? ""}`.toLowerCase();
      let score = 0;
      if (hay.startsWith(q)) score += 100;
      if (hay.includes(q)) score += 40;
      // chars-in-order match
      let i = 0;
      for (const ch of hay) {
        if (ch === q[i]) i++;
        if (i === q.length) break;
      }
      if (i === q.length) score += 20;
      return { it, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.it);
}

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => fuzzy(query, ITEMS), [query]);

  // Group results in a stable order
  const grouped = useMemo(() => {
    const order: PaletteItem["group"][] = ["Getting Started", "Pairs", "Components", "Pages"];
    return order
      .map((group) => ({ group, items: results.filter((r) => r.group === group) }))
      .filter((g) => g.items.length > 0);
  }, [results]);

  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  // Toggle on Cmd/Ctrl+K, close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Reset state when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Reset active when query changes
  useEffect(() => setActive(0), [query]);

  // Scroll active into view
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(flat.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = flat[active];
      if (item) navigate(item.href);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
      <button
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="absolute inset-0 cursor-default"
        style={{
          background: "color-mix(in oklab, var(--ds-ink) 50%, transparent)",
          backdropFilter: "blur(6px)",
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search docs"
        className="relative w-full max-w-xl rounded-[var(--ds-radius)] border bg-[var(--ds-paper)] border-[var(--ds-line)] shadow-[var(--ds-shadow)] overflow-hidden animate-[scaleIn_180ms_var(--ds-easing)]"
      >
        <div className="flex items-center gap-3 px-4 h-12 border-b hairline">
          <span className="text-[var(--ds-muted)]" aria-hidden>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search components, pairs, docs…"
            className="flex-1 bg-transparent outline-none text-[var(--ds-ink)] placeholder:text-[var(--ds-muted)] text-sm"
          />
          <kbd className="mono text-[10px] text-[var(--ds-muted)] surface-deep px-1.5 py-0.5 rounded">esc</kbd>
        </div>
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-2">
          {grouped.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[var(--ds-muted)]">No results.</div>
          ) : (
            grouped.map((g) => (
              <div key={g.group} className="flex flex-col gap-0.5">
                <div className="px-4 pt-2 pb-1 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
                  {g.group}
                </div>
                {g.items.map((item) => {
                  const idx = flat.indexOf(item);
                  const isActive = idx === active;
                  return (
                    <button
                      key={item.id}
                      data-idx={idx}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => navigate(item.href)}
                      className="text-left px-4 h-9 flex items-center justify-between gap-3 transition-colors"
                      style={{
                        background: isActive ? "var(--ds-paper-deep)" : "transparent",
                        color: "var(--ds-ink)",
                      }}
                    >
                      <span className="text-sm">{item.title}</span>
                      <span
                        className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)] truncate max-w-[40%]"
                        title={item.href}
                      >
                        {item.href}
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between gap-2 px-4 h-9 border-t hairline mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
          <span>↑↓ navigate · ↵ open · esc close</span>
          <span>{flat.length} result{flat.length === 1 ? "" : "s"}</span>
        </div>
      </div>
    </div>
  );
}
