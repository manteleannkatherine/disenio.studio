import { Switch } from "@disenio/ui";
import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";

const SNIPPETS = {
  basic: `<Switch label="Notifications" description="Send me product updates." defaultChecked />`,
  controlled: `const [on, setOn] = useState(false);

<Switch checked={on} onCheckedChange={setOn} label="Public profile" />`,
  usage: `import { Switch } from "@/components/ui/switch";`,
};

export default async function SwitchPage() {
  const [hBasic, hControlled, hUsage] = await Promise.all([
    highlight(SNIPPETS.basic),
    highlight(SNIPPETS.controlled),
    highlight(SNIPPETS.usage),
  ]);
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader eyebrow="Components" title="Switch" description="Toggle a single boolean. Controlled or uncontrolled, with optional label + description." badge="primitive" />
      <Preview code={SNIPPETS.basic} highlightedCode={hBasic}>
        <Switch label="Notifications" description="Send me product updates." defaultChecked />
      </Preview>
      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio add switch" />
      </section>
      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>
      <section id="examples" className="flex flex-col gap-3">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Controlled</h2>
        <Preview code={SNIPPETS.controlled} highlightedCode={hControlled}>
          <Switch label="Public profile" />
        </Preview>
      </section>
      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">API</h2>
        <PropsTable
          rows={[
            { name: "checked", type: "boolean", description: "Controlled value." },
            { name: "defaultChecked", type: "boolean", default: "false", description: "Uncontrolled initial value." },
            { name: "onCheckedChange", type: "(v: boolean) => void", description: "Fires when toggled." },
            { name: "disabled", type: "boolean", default: "false", description: "Disable interaction." },
            { name: "label", type: "string", description: "Optional label rendered next to the control." },
            { name: "description", type: "string", description: "Optional sub-label below the label." },
          ]}
        />
      </section>
    </article>
  );
}
