import { Tooltip, Button } from "@disenio/ui";
import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";

const SNIPPETS = {
  basic: `<Tooltip content="Save your changes">
  <Button>Save</Button>
</Tooltip>`,
  sides: `<Tooltip content="On top" side="top"><Button size="sm">Top</Button></Tooltip>
<Tooltip content="On right" side="right"><Button size="sm">Right</Button></Tooltip>
<Tooltip content="On bottom" side="bottom"><Button size="sm">Bottom</Button></Tooltip>
<Tooltip content="On left" side="left"><Button size="sm">Left</Button></Tooltip>`,
  usage: `import { Tooltip } from "@/components/ui/tooltip";`,
};

export default async function TooltipPage() {
  const [hBasic, hSides, hUsage] = await Promise.all([
    highlight(SNIPPETS.basic), highlight(SNIPPETS.sides), highlight(SNIPPETS.usage),
  ]);
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader eyebrow="Components" title="Tooltip" description="Hover/focus-triggered hint. Four sides, configurable delay, keyboard-accessible." badge="primitive" />
      <Preview code={SNIPPETS.basic} highlightedCode={hBasic}>
        <Tooltip content="Save your changes">
          <Button>Save</Button>
        </Tooltip>
      </Preview>
      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio add tooltip" />
      </section>
      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>
      <section id="sides" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Sides</h2>
        <Preview code={SNIPPETS.sides} highlightedCode={hSides}>
          <Tooltip content="On top" side="top"><Button size="sm">Top</Button></Tooltip>
          <Tooltip content="On right" side="right"><Button size="sm">Right</Button></Tooltip>
          <Tooltip content="On bottom" side="bottom"><Button size="sm">Bottom</Button></Tooltip>
          <Tooltip content="On left" side="left"><Button size="sm">Left</Button></Tooltip>
        </Preview>
      </section>
      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">API</h2>
        <PropsTable rows={[
          { name: "content", type: "ReactNode", description: "What to show inside the tooltip." },
          { name: "children", type: "ReactElement", description: "The trigger element. Pointer/focus events get cloned onto it." },
          { name: "side", type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: "Position relative to the trigger." },
          { name: "delay", type: "number (ms)", default: "200", description: "Hover delay before showing." },
        ]}/>
      </section>
    </article>
  );
}
