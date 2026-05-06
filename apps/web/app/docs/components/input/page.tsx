import { Input } from "@disenio/ui";
import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";
import { A11yAudit } from "../../../_components/docs/A11yAudit";

const SNIPPETS = {
  basic: `<Input label="Email" placeholder="hola@disenio.studio" />`,
  withHint: `<Input
  label="Email"
  placeholder="hola@disenio.studio"
  hint="We'll never share it."
/>`,
  error: `<Input
  label="Email"
  placeholder="hola@disenio.studio"
  defaultValue="hola"
  error="Needs an @"
/>`,
  usage: `import { Input } from "@/components/ui/input";

export default function Example() {
  return <Input label="Email" placeholder="hola@disenio.studio" />;
}`,
};

export default async function InputPage() {
  const [hBasic, hWithHint, hError, hUsage] = await Promise.all([
    highlight(SNIPPETS.basic),
    highlight(SNIPPETS.withHint),
    highlight(SNIPPETS.error),
    highlight(SNIPPETS.usage),
  ]);

  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Components"
        title="Input"
        description="Single-line text field. Built-in label, hint, error, and slot for leading/trailing content."
        badge="primitive"
      />

      <section id="preview" className="flex flex-col gap-4">
        <Preview code={SNIPPETS.basic} highlightedCode={hBasic}>
          <div className="w-full max-w-sm">
            <Input label="Email" placeholder="hola@disenio.studio" />
          </div>
        </Preview>
      </section>

      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio.studio add input" />
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
            <div className="w-full max-w-sm">
              <Input label="Email" placeholder="hola@disenio.studio" hint="We'll never share it." />
            </div>
          </Preview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-medium text-[var(--ds-ink-soft)] mono uppercase tracking-wider">
            Error state
          </h3>
          <Preview code={SNIPPETS.error} highlightedCode={hError}>
            <div className="w-full max-w-sm">
              <Input label="Email" placeholder="hola@disenio.studio" defaultValue="hola" error="Needs an @" />
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
            { name: "leading", type: "ReactNode", description: "Content before the input — icons, prefixes." },
            { name: "trailing", type: "ReactNode", description: "Content after the input — icons, suffixes." },
            { name: "...rest", type: "InputHTMLAttributes", description: "All standard <input> props are forwarded." },
          ]}
        />
      </section>

      <section id="a11y" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Accessibility</h2>
        <A11yAudit
          keyboard="↹ focus · type to enter · ↵ submit form"
          aria="aria-describedby auto-wired to hint or error · aria-invalid on error"
        />
      </section>
    </article>
  );
}
