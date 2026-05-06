import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";
import { A11yAudit } from "../../../_components/docs/A11yAudit";
import { DataTableDemo } from "./_demo";

const SNIPPETS = {
  basic: `<DataTable
  data={users}
  columns={[
    { id: "name", header: "Name", accessor: "name", sortable: true },
    { id: "email", header: "Email", accessor: "email" },
    { id: "role", header: "Role", accessor: (u) => u.role.toUpperCase() },
  ]}
  searchable
  pageSize={5}
/>`,
  usage: `import { DataTable } from "@/components/ui/data-table";`,
};

export default async function DataTablePage() {
  const [hBasic, hUsage] = await Promise.all([highlight(SNIPPETS.basic), highlight(SNIPPETS.usage)]);
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Components"
        title="DataTable"
        description="Sortable headers, free-text filter, optional paging. No virtualization — built for ≤ 5,000 rows."
        badge="primitive · lite"
      />

      <Preview code={SNIPPETS.basic} highlightedCode={hBasic}>
        <div className="w-full">
          <DataTableDemo />
        </div>
      </Preview>

      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio.studio add data-table" />
      </section>

      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>

      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">API</h2>
        <PropsTable
          rows={[
            { name: "data", type: "T[]", description: "Row objects to render." },
            { name: "columns", type: "DataTableColumn<T>[]", description: "Column descriptors with id, header, accessor, optional cell renderer + sort key." },
            { name: "searchable", type: "boolean", default: "false", description: "Show the filter input." },
            { name: "pageSize", type: "number", description: "Rows per page. Omit to show all." },
            { name: "rowKey", type: "(row, i) => Key", description: "Stable key per row. Defaults to index." },
            { name: "empty", type: "ReactNode", description: "Rendered when filtered results are empty." },
          ]}
        />
      </section>

      <section id="column" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Column descriptor</h2>
        <PropsTable
          rows={[
            { name: "id", type: "string", description: "Stable column id (used for sort state)." },
            { name: "header", type: "ReactNode", description: "Header text or element." },
            { name: "accessor", type: "keyof T | (row) => ReactNode", description: "How to read the value for each row." },
            { name: "cell", type: "(row) => ReactNode", description: "Custom cell renderer. Defaults to accessor output." },
            { name: "sortable", type: "boolean", default: "false", description: "Allow click-to-sort on the header." },
            { name: "sortValue", type: "(row) => string|number|Date", description: "Override sort key extraction." },
            { name: "align", type: '"left" | "right" | "center"', default: '"left"', description: "Cell text alignment." },
            { name: "width", type: "string", description: "Optional CSS width." },
          ]}
        />
      </section>

      <section id="a11y" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Accessibility</h2>
        <A11yAudit
          keyboard="↹ focus header · ↵ toggle sort · ↹ next column"
          aria="semantic <table>/<thead>/<tbody> · sort header is a button"
        />
      </section>
    </article>
  );
}
