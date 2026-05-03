import { Badge } from "@disenio/ui";
import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";

const SNIPPETS = {
  tones: `<Badge tone="neutral">neutral</Badge>
<Badge tone="accent">accent</Badge>
<Badge tone="ink">ink</Badge>`,
  usage: `import { Badge } from "@/components/ui/badge";

export default function Example() {
  return <Badge tone="accent">popular</Badge>;
}`,
};

export default async function BadgePage() {
  const [hTones, hUsage] = await Promise.all([highlight(SNIPPETS.tones), highlight(SNIPPETS.usage)]);

  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Components"
        title="Badge"
        description="Compact label for status, category, or count. Three tones tuned to the active theme."
        badge="primitive"
      />

      <section id="preview" className="flex flex-col gap-4">
        <Preview code={SNIPPETS.tones} highlightedCode={hTones}>
          <Badge tone="neutral">neutral</Badge>
          <Badge tone="accent">accent</Badge>
          <Badge tone="ink">ink</Badge>
        </Preview>
      </section>

      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio add badge" />
      </section>

      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>

      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">API</h2>
        <PropsTable
          rows={[
            { name: "tone", type: '"neutral" | "accent" | "ink"', default: '"neutral"', description: "Visual tone." },
            { name: "...rest", type: "HTMLAttributes<HTMLSpanElement>", description: "All standard <span> props are forwarded." },
          ]}
        />
      </section>
    </article>
  );
}
