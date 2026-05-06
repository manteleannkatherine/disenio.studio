import { Tabs, TabsList, TabsTrigger, TabsContent } from "@disenio/ui";
import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";

const SNIPPETS = {
  basic: `<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
    <TabsTrigger value="team">Team</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Account settings…</TabsContent>
  <TabsContent value="billing">Billing settings…</TabsContent>
  <TabsContent value="team">Team settings…</TabsContent>
</Tabs>`,
  usage: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";`,
};

export default async function TabsPage() {
  const [hBasic, hUsage] = await Promise.all([highlight(SNIPPETS.basic), highlight(SNIPPETS.usage)]);
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader eyebrow="Components" title="Tabs" description="Switch between related views without navigating away. Controlled or uncontrolled." badge="primitive" />
      <Preview code={SNIPPETS.basic} highlightedCode={hBasic}>
        <Tabs defaultValue="account" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="text-sm text-[var(--ds-ink-soft)]">Account settings…</TabsContent>
          <TabsContent value="billing" className="text-sm text-[var(--ds-ink-soft)]">Billing settings…</TabsContent>
          <TabsContent value="team" className="text-sm text-[var(--ds-ink-soft)]">Team settings…</TabsContent>
        </Tabs>
      </Preview>
      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio.studio add tabs" />
      </section>
      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>
      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">API</h2>
        <PropsTable
          rows={[
            { name: "Tabs.value", type: "string", description: "Controlled active tab." },
            { name: "Tabs.defaultValue", type: "string", description: "Uncontrolled initial tab." },
            { name: "Tabs.onValueChange", type: "(v: string) => void", description: "Fires on switch." },
            { name: "TabsTrigger.value", type: "string", description: "Identifier matching a TabsContent." },
            { name: "TabsContent.value", type: "string", description: "Renders only when Tabs.value matches." },
          ]}
        />
      </section>
    </article>
  );
}
