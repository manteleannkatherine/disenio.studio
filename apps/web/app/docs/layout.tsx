import { SiteNav } from "../_components/SiteNav";
import { DocsSidebar } from "../_components/docs/DocsSidebar";
import { MobileSidebarTrigger } from "../_components/docs/MobileSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex gap-10">
        <aside className="hidden lg:block w-[220px] shrink-0 border-r hairline">
          <DocsSidebar />
        </aside>
        <main className="flex-1 min-w-0 py-8 lg:py-12">
          <div className="lg:hidden mb-6 flex items-center gap-2 text-sm text-[var(--ds-ink-soft)]">
            <MobileSidebarTrigger />
            <span className="mono text-[10px] uppercase tracking-[0.18em]">Docs nav</span>
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
