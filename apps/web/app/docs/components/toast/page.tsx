import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";
import { ToastDemo } from "./_demo";

const SNIPPETS = {
  basic: `const { toast } = useToast();

<Button onClick={() => toast({
  title: "Saved",
  description: "Your changes were saved.",
})}>
  Show toast
</Button>`,
  provider: `// app/layout.tsx
import { ToastProvider } from "@/components/ui/toast";

export default function RootLayout({ children }) {
  return <ToastProvider>{children}</ToastProvider>;
}`,
};

export default async function ToastPage() {
  const [hBasic, hProvider] = await Promise.all([highlight(SNIPPETS.basic), highlight(SNIPPETS.provider)]);
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader eyebrow="Components" title="Toast" description="Transient notifications. Fire from anywhere via useToast()." badge="primitive" />
      <Preview code={SNIPPETS.basic} highlightedCode={hBasic}>
        <ToastDemo />
      </Preview>
      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio add toast" />
      </section>
      <section id="provider" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Wire the provider</h2>
        <p className="text-[var(--ds-ink-soft)]">Wrap your app once. The provider portals into <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">document.body</code> so toasts always render on top.</p>
        <CodeBlock filename="app/layout.tsx" code={SNIPPETS.provider} />
      </section>
      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">API</h2>
        <PropsTable
          rows={[
            { name: "toast({ title })", type: "string", description: "Headline of the toast." },
            { name: "toast({ description })", type: "string", description: "Supporting body text." },
            { name: "toast({ tone })", type: '"neutral" | "accent" | "danger"', default: '"neutral"', description: "Visual emphasis." },
            { name: "toast({ duration })", type: "number (ms)", default: "4000", description: "Auto-dismiss timer. Pass 0 to keep until manually dismissed." },
            { name: "dismiss(id)", type: "(id: string) => void", description: "Dismiss a specific toast by id." },
          ]}
        />
      </section>
    </article>
  );
}
