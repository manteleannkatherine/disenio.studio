import { Button } from "@disenio/ui";
import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";
import { A11yAudit } from "../../../_components/docs/A11yAudit";

const SNIPPETS = {
  basic: `<Button variant="accent">Hola</Button>`,
  variants: `<Button variant="solid">Solid</Button>
<Button variant="accent">Accent</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`,
  sizes: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
  usage: `import { Button } from "@/components/ui/button";

export default function Example() {
  return <Button variant="accent">Send →</Button>;
}`,
};

export default async function ButtonPage() {
  const [hVariants, hSizes, hUsage] = await Promise.all([
    highlight(SNIPPETS.variants),
    highlight(SNIPPETS.sizes),
    highlight(SNIPPETS.usage),
  ]);

  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Components"
        title="Button"
        description="The primary action primitive. Four variants, three sizes, fully theme-aware."
        badge="primitive"
      />

      <section id="preview" className="flex flex-col gap-4">
        <Preview code={SNIPPETS.variants} highlightedCode={hVariants}>
          <Button variant="solid">Solid</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </Preview>
      </section>

      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio add button" />
      </section>

      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>

      <section id="examples" className="flex flex-col gap-6">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-[var(--ds-ink-soft)] mono uppercase tracking-wider">
            Sizes
          </h3>
          <Preview code={SNIPPETS.sizes} highlightedCode={hSizes}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </Preview>
        </div>
      </section>

      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">API</h2>
        <PropsTable
          rows={[
            { name: "variant", type: '"solid" | "accent" | "ghost" | "outline"', default: '"solid"', description: "Visual style." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Height and horizontal padding." },
            { name: "...rest", type: "ButtonHTMLAttributes", description: "All standard <button> props are forwarded." },
          ]}
        />
      </section>

      <section id="a11y" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Accessibility</h2>
        <A11yAudit
          keyboard="↹ focus · ↵ activate · space activate"
          aria="role=button · aria-disabled when disabled"
        />
      </section>
    </article>
  );
}
