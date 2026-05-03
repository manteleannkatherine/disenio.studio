import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button } from "@disenio/ui";
import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";

const SNIPPETS = {
  basic: `<Card className="w-[320px]">
  <CardHeader>
    <CardTitle>Pro plan</CardTitle>
    <CardDescription>Premium blocks and themes.</CardDescription>
  </CardHeader>
  <CardContent>$96 once. Lifetime.</CardContent>
  <CardFooter>
    <Button variant="accent" size="sm">Buy</Button>
  </CardFooter>
</Card>`,
  usage: `import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";`,
};

export default async function CardPage() {
  const [hBasic, hUsage] = await Promise.all([highlight(SNIPPETS.basic), highlight(SNIPPETS.usage)]);
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader eyebrow="Components" title="Card" description="A surface for grouped content. Compose with Header, Title, Description, Content, Footer." badge="content-aware" />
      <Preview code={SNIPPETS.basic} highlightedCode={hBasic}>
        <Card className="w-[320px]">
          <CardHeader>
            <CardTitle>Pro plan</CardTitle>
            <CardDescription>Premium blocks and themes.</CardDescription>
          </CardHeader>
          <CardContent>$96 once. Lifetime.</CardContent>
          <CardFooter>
            <Button variant="accent" size="sm">Buy</Button>
          </CardFooter>
        </Card>
      </Preview>
      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio add card" />
      </section>
      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>
      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Anatomy</h2>
        <PropsTable
          rows={[
            { name: "Card", type: "div", description: "Outer surface. Forwards all div props." },
            { name: "CardHeader", type: "div", description: "Section above the divider for title/description." },
            { name: "CardTitle", type: "h3", description: "Heading text." },
            { name: "CardDescription", type: "p", description: "Subtitle text." },
            { name: "CardContent", type: "div", description: "Main body region." },
            { name: "CardFooter", type: "div", description: "Section below a divider for actions." },
          ]}
        />
      </section>
    </article>
  );
}
