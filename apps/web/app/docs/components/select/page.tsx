import { Select } from "@disenio/ui";
import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";
import { A11yAudit } from "../../../_components/docs/A11yAudit";

const OPTIONS = [
  { value: "modern", label: "Modern" },
  { value: "modernDark", label: "Modern · Dark" },
  { value: "editorial", label: "Editorial" },
  { value: "playful", label: "Playful" },
  { value: "stark", label: "Stark" },
  { value: "clinical", label: "Clinical" },
];

const SNIPPETS = {
  basic: `<Select
  label="Feel"
  options={[
    { value: "modern", label: "Modern" },
    { value: "editorial", label: "Editorial" },
    { value: "playful", label: "Playful" },
  ]}
  defaultValue="modern"
/>`,
  usage: `import { Select } from "@/components/ui/select";`,
};

export default async function SelectPage() {
  const [hBasic, hUsage] = await Promise.all([highlight(SNIPPETS.basic), highlight(SNIPPETS.usage)]);
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader eyebrow="Components" title="Select" description="Choose one option from a list. Full keyboard nav (↑↓ Enter Esc), click-outside-to-close, theme-aware." badge="primitive" />
      <Preview code={SNIPPETS.basic} highlightedCode={hBasic}>
        <div className="w-full max-w-xs">
          <Select label="Feel" options={OPTIONS} defaultValue="modern" />
        </div>
      </Preview>
      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio add select" />
      </section>
      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>
      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">API</h2>
        <PropsTable
          rows={[
            { name: "options", type: "{ value, label, disabled? }[]", description: "Selectable options." },
            { name: "value", type: "string", description: "Controlled selected value." },
            { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
            { name: "onValueChange", type: "(v: string) => void", description: "Fires when a new value is selected." },
            { name: "placeholder", type: "string", default: '"Select…"', description: "Shown when no value is selected." },
            { name: "label", type: "string", description: "Optional label above the trigger." },
            { name: "disabled", type: "boolean", default: "false", description: "Disable the trigger." },
          ]}
        />
      </section>

      <section id="a11y" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Accessibility</h2>
        <A11yAudit
          keyboard="↑↓ navigate · ↵ pick · esc close · ↹ focus"
          aria="role=listbox · aria-haspopup · aria-expanded · aria-selected on options"
        />
      </section>
    </article>
  );
}
