import { Textarea } from "@disenio/ui";
import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";

const SNIPPETS = {
  basic: `<Textarea label="Message" placeholder="Tell us what you're building…" />`,
  withHint: `<Textarea
  label="Message"
  placeholder="Tell us what you're building…"
  hint="Up to 280 characters."
/>`,
  usage: `import { Textarea } from "@/components/ui/textarea";

export default function Example() {
  return <Textarea label="Message" placeholder="…" />;
}`,
};

export default async function TextareaPage() {
  const [hBasic, hWithHint, hUsage] = await Promise.all([
    highlight(SNIPPETS.basic),
    highlight(SNIPPETS.withHint),
    highlight(SNIPPETS.usage),
  ]);

  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Components"
        title="Textarea"
        description="Multi-line text field with the same affordances as Input — label, hint, error."
        badge="primitive"
      />

      <section id="preview" className="flex flex-col gap-4">
        <Preview code={SNIPPETS.basic} highlightedCode={hBasic}>
          <div className="w-full max-w-md">
            <Textarea label="Message" placeholder="Tell us what you're building…" />
          </div>
        </Preview>
      </section>

      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio add textarea" />
      </section>

      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>

      <section id="examples" className="flex flex-col gap-6">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Examples</h2>
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-[var(--ds-ink-soft)] mono uppercase tracking-wider">
            With hint
          </h3>
          <Preview code={SNIPPETS.withHint} highlightedCode={hWithHint}>
            <div className="w-full max-w-md">
              <Textarea label="Message" placeholder="Tell us what you're building…" hint="Up to 280 characters." />
            </div>
          </Preview>
        </div>
      </section>

      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">API</h2>
        <PropsTable
          rows={[
            { name: "label", type: "string", description: "Label text rendered above the field." },
            { name: "hint", type: "string", description: "Helper text below the field." },
            { name: "error", type: "string", description: "Error text. Replaces hint and styles the field." },
            { name: "...rest", type: "TextareaHTMLAttributes", description: "All standard <textarea> props are forwarded." },
          ]}
        />
      </section>
    </article>
  );
}
