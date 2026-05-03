import { SiteNav } from "../_components/SiteNav";
import { DocsSidebar } from "../_components/docs/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <div className="mx-auto max-w-7xl px-6 flex gap-10">
        <aside className="hidden lg:block w-[220px] shrink-0 border-r hairline">
          <DocsSidebar />
        </aside>
        <main className="flex-1 min-w-0 py-12">{children}</main>
      </div>
    </>
  );
}
