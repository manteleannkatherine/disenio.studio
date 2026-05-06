"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLockup } from "./BrandMark";
import { ModeToggle } from "./ModeToggle";
import { CommandPaletteTrigger } from "./CommandPaletteTrigger";

const NAV_LINKS = [
  { href: "/docs", label: "Docs" },
  { href: "/showcase", label: "Showcase" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* Floating pill — always centered, lifts on scroll */}
      <div className="sticky top-0 z-40 pointer-events-none px-4 pt-4 sm:pt-5">
        <div className="mx-auto max-w-5xl pointer-events-auto">
          <div
            className="relative flex items-center gap-3 sm:gap-4 px-3 sm:px-4 h-16 sm:h-[72px] transition-all duration-300"
            style={{
              borderRadius: 9999,
              background: scrolled
                ? "color-mix(in oklab, var(--ds-paper) 72%, transparent)"
                : "color-mix(in oklab, var(--ds-paper) 55%, transparent)",
              backdropFilter: "blur(18px) saturate(140%)",
              WebkitBackdropFilter: "blur(18px) saturate(140%)",
              border: "1px solid color-mix(in oklab, var(--ds-ink) 8%, transparent)",
              boxShadow: scrolled
                ? "0 12px 40px -16px rgba(0,0,0,0.6), 0 0 0 1px color-mix(in oklab, var(--ds-ink) 4%, transparent) inset"
                : "0 0 0 1px color-mix(in oklab, var(--ds-ink) 4%, transparent) inset",
            }}
          >
            {/* Accent dot — live indicator */}
            <Link
              href="/"
              className="flex items-center gap-2.5 pl-2 group shrink-0"
              aria-label="disenio.studio home"
            >
              <span
                className="size-1.5 rounded-full"
                style={{
                  background: "var(--ds-accent)",
                  boxShadow:
                    "0 0 0 3px color-mix(in oklab, var(--ds-accent) 25%, transparent)",
                }}
              />
              <BrandLockup height={36} />
            </Link>

            {/* Mono separator */}
            <span
              aria-hidden
              className="hidden md:inline-block h-5 w-px"
              style={{ background: "color-mix(in oklab, var(--ds-ink) 12%, transparent)" }}
            />

            {/* Center links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm flex-1 justify-center">
              {NAV_LINKS.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="relative px-3 py-1.5 rounded-full transition-colors"
                    style={{
                      color: active ? "var(--ds-ink)" : "var(--ds-ink-soft)",
                      background: active
                        ? "color-mix(in oklab, var(--ds-ink) 8%, transparent)"
                        : "transparent",
                    }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right cluster */}
            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
              <span className="hidden sm:flex items-center">
                <CommandPaletteTrigger />
              </span>
              <ModeToggle />
              <Link
                href="/docs/setup"
                className="hidden sm:inline-flex items-center justify-center h-9 px-4 text-sm font-medium text-white transition-transform hover:-translate-y-px shrink-0"
                style={{
                  borderRadius: 9999,
                  background: "var(--ds-brand-gradient)",
                  boxShadow: "0 8px 24px -10px rgba(110,76,242,0.55)",
                }}
              >
                Install
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="lg:hidden inline-flex items-center justify-center size-9 rounded-full transition-colors hover:bg-[color-mix(in_oklab,var(--ds-ink)_8%,transparent)]"
              >
                <span className="relative block w-4 h-3">
                  <span
                    className="absolute left-0 right-0 h-px transition-transform"
                    style={{
                      background: "var(--ds-ink)",
                      top: open ? "50%" : "0",
                      transform: open ? "rotate(45deg)" : "none",
                    }}
                  />
                  <span
                    className="absolute left-0 right-0 h-px transition-opacity"
                    style={{
                      background: "var(--ds-ink)",
                      top: "50%",
                      opacity: open ? 0 : 1,
                    }}
                  />
                  <span
                    className="absolute left-0 right-0 h-px transition-transform"
                    style={{
                      background: "var(--ds-ink)",
                      bottom: open ? "auto" : "0",
                      top: open ? "50%" : "auto",
                      transform: open ? "rotate(-45deg)" : "none",
                    }}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Mobile/tablet menu — drops out of the pill */}
          {open && (
            <div
              className="lg:hidden mt-2 p-2 flex flex-col"
              style={{
                borderRadius: 24,
                background: "color-mix(in oklab, var(--ds-paper) 85%, transparent)",
                backdropFilter: "blur(18px) saturate(140%)",
                WebkitBackdropFilter: "blur(18px) saturate(140%)",
                border: "1px solid color-mix(in oklab, var(--ds-ink) 8%, transparent)",
                boxShadow: "0 18px 50px -20px rgba(0,0,0,0.6)",
              }}
            >
              {NAV_LINKS.map((l) => {
                const active = isActive(l.href);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="px-4 py-3 rounded-2xl text-sm transition-colors"
                    style={{
                      color: active ? "var(--ds-ink)" : "var(--ds-ink-soft)",
                      background: active
                        ? "color-mix(in oklab, var(--ds-ink) 8%, transparent)"
                        : "transparent",
                    }}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                href="/docs/setup"
                className="mt-2 inline-flex items-center justify-center h-11 px-4 text-sm font-medium text-white"
                style={{
                  borderRadius: 9999,
                  background: "var(--ds-brand-gradient)",
                }}
              >
                Install
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Spacer offset — keeps content from sliding under the floating pill */}
      <div aria-hidden className="h-2" />
    </>
  );
}
