import { Stack, Cluster, Switcher, Sidebar, Center, Grid, Spacer, Divider, Button, Card, CardHeader, CardTitle, CardContent, Badge } from "@disenio/ui";
import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { highlight } from "../../../_components/docs/highlight";

const SNIPPETS = {
  stack: `<Stack gap="md">
  <Card>One</Card>
  <Card>Two</Card>
  <Card>Three</Card>
</Stack>`,
  cluster: `<Cluster gap="sm" justify="between">
  <Cluster gap="sm">
    <Badge>Status</Badge>
    <Badge tone="accent">v0.2</Badge>
  </Cluster>
  <Button size="sm">Action</Button>
</Cluster>`,
  switcher: `<Switcher threshold="32rem" gap="md">
  <Card>One</Card>
  <Card>Two</Card>
  <Card>Three</Card>
</Switcher>`,
  sidebar: `<Sidebar sideWidth="220px" gap="lg">
  <aside>Side</aside>
  <main>Content</main>
</Sidebar>`,
  center: `<Center max="prose">
  <p>Constrained, centered content.</p>
</Center>`,
  grid: `<Grid min="14rem" gap="md">
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
  <Card>4</Card>
</Grid>`,
  spacer: `<Cluster gap="sm">
  <Button>Cancel</Button>
  <Spacer />
  <Button variant="accent">Save</Button>
</Cluster>`,
  divider: `<Stack gap="md">
  <p>Above</p>
  <Divider label="or" />
  <p>Below</p>
</Stack>`,
  usage: `import {
  Stack, Cluster, Switcher, Sidebar,
  Center, Grid, Spacer, Divider,
} from "@/components/ui/layout";`,
};

const dummyCard = (label: string, w?: string) => (
  <div className="surface-deep px-4 py-3 text-sm" style={{ width: w }}>
    {label}
  </div>
);

export default async function LayoutPage() {
  const [hStack, hCluster, hSwitcher, hSidebar, hCenter, hGrid, hSpacer, hDivider, hUsage] = await Promise.all([
    highlight(SNIPPETS.stack),
    highlight(SNIPPETS.cluster),
    highlight(SNIPPETS.switcher),
    highlight(SNIPPETS.sidebar),
    highlight(SNIPPETS.center),
    highlight(SNIPPETS.grid),
    highlight(SNIPPETS.spacer),
    highlight(SNIPPETS.divider),
    highlight(SNIPPETS.usage),
  ]);

  return (
    <article className="flex flex-col gap-12 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Components"
        title="Layout"
        description="Eight composable primitives — Stack, Cluster, Switcher, Sidebar, Center, Grid, Spacer, Divider — that replace 90% of the CSS you'd hand-roll. Tiny, semantic, theme-aware."
        badge="primitive · 8 in one"
      />

      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio.studio add layout" />
      </section>

      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>

      <section id="stack" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Stack</h2>
        <p className="text-[var(--ds-ink-soft)]">Vertical layout with consistent gap. The most-used primitive.</p>
        <Preview code={SNIPPETS.stack} highlightedCode={hStack}>
          <Stack gap="md" className="w-full max-w-md">
            {dummyCard("One")}
            {dummyCard("Two")}
            {dummyCard("Three")}
          </Stack>
        </Preview>
      </section>

      <section id="cluster" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Cluster</h2>
        <p className="text-[var(--ds-ink-soft)]">Horizontal flex-wrap with gap, alignment, and justification. The toolbar primitive.</p>
        <Preview code={SNIPPETS.cluster} highlightedCode={hCluster}>
          <div className="w-full max-w-md">
            <Cluster gap="sm" justify="between">
              <Cluster gap="sm">
                <Badge>status</Badge>
                <Badge tone="accent">v0.2</Badge>
              </Cluster>
              <Button size="sm">Action</Button>
            </Cluster>
          </div>
        </Preview>
      </section>

      <section id="switcher" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Switcher</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Items share a row above a threshold and stack below it — using only flex-basis math, no media queries.
          Resize the preview to watch it flip.
        </p>
        <Preview code={SNIPPETS.switcher} highlightedCode={hSwitcher}>
          <Switcher threshold="20rem" gap="md" className="w-full">
            {dummyCard("One")}
            {dummyCard("Two")}
            {dummyCard("Three")}
          </Switcher>
        </Preview>
      </section>

      <section id="sidebar" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Sidebar</h2>
        <p className="text-[var(--ds-ink-soft)]">Two-up layout that collapses gracefully when the content column gets too narrow.</p>
        <Preview code={SNIPPETS.sidebar} highlightedCode={hSidebar}>
          <Sidebar sideWidth="120px" gap="md" className="w-full">
            <div className="surface-deep p-4 text-sm">Side</div>
            <div className="surface-deep p-4 text-sm">Content</div>
          </Sidebar>
        </Preview>
      </section>

      <section id="center" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Center</h2>
        <p className="text-[var(--ds-ink-soft)]">Constrains a max-width and centers it. Presets: <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 rounded">narrow</code>, <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 rounded">prose</code>, <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 rounded">wide</code>, or any CSS length.</p>
        <Preview code={SNIPPETS.center} highlightedCode={hCenter}>
          <div className="w-full">
            <Center max="prose" pad="md">
              <div className="surface-deep p-4 text-sm">
                A column of comfortable reading width — the “prose” preset is 65ch.
              </div>
            </Center>
          </div>
        </Preview>
      </section>

      <section id="grid" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Grid</h2>
        <p className="text-[var(--ds-ink-soft)]">Auto-fit responsive grid. Set the minimum column width, columns flow.</p>
        <Preview code={SNIPPETS.grid} highlightedCode={hGrid}>
          <Grid min="8rem" gap="md" className="w-full">
            {dummyCard("1")}
            {dummyCard("2")}
            {dummyCard("3")}
            {dummyCard("4")}
            {dummyCard("5")}
            {dummyCard("6")}
          </Grid>
        </Preview>
      </section>

      <section id="spacer" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Spacer</h2>
        <p className="text-[var(--ds-ink-soft)]">Fills available space inside a flex parent. Useful inside Cluster.</p>
        <Preview code={SNIPPETS.spacer} highlightedCode={hSpacer}>
          <div className="w-full max-w-md">
            <Cluster gap="sm">
              <Button variant="ghost" size="sm">Cancel</Button>
              <Spacer />
              <Button variant="accent" size="sm">Save</Button>
            </Cluster>
          </div>
        </Preview>
      </section>

      <section id="divider" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Divider</h2>
        <p className="text-[var(--ds-ink-soft)]">Horizontal or vertical hairline. Optional centered label.</p>
        <Preview code={SNIPPETS.divider} highlightedCode={hDivider}>
          <Stack gap="md" className="w-full max-w-sm">
            <span className="text-sm">Sign in with email</span>
            <Divider label="or" />
            <Button variant="outline" size="sm">Continue with GitHub</Button>
          </Stack>
        </Preview>
      </section>

      <section id="composing" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Composing</h2>
        <p className="text-[var(--ds-ink-soft)]">
          The whole point: glue them together. A profile card is a Stack of Clusters. A pricing trio is a Grid of Cards. A docs page is a Sidebar wrapping a Center wrapping a Stack.
        </p>
        <Preview code={`<Card>\n  <CardHeader>\n    <Cluster justify="between">\n      <CardTitle>Disenio Pro</CardTitle>\n      <Badge tone="accent">popular</Badge>\n    </Cluster>\n  </CardHeader>\n  <CardContent>\n    <Stack gap="sm">\n      <p>Premium blocks + 30 themes.</p>\n      <Cluster gap="sm">\n        <Button size="sm">Buy</Button>\n        <Button size="sm" variant="ghost">Demo</Button>\n      </Cluster>\n    </Stack>\n  </CardContent>\n</Card>`} highlightedCode={await highlight(`<Card>
  <CardHeader>
    <Cluster justify="between">
      <CardTitle>Disenio Pro</CardTitle>
      <Badge tone="accent">popular</Badge>
    </Cluster>
  </CardHeader>
  <CardContent>
    <Stack gap="sm">
      <p>Premium blocks + 30 themes.</p>
      <Cluster gap="sm">
        <Button size="sm">Buy</Button>
        <Button size="sm" variant="ghost">Demo</Button>
      </Cluster>
    </Stack>
  </CardContent>
</Card>`)}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <Cluster justify="between">
                <CardTitle>Disenio Pro</CardTitle>
                <Badge tone="accent">popular</Badge>
              </Cluster>
            </CardHeader>
            <CardContent>
              <Stack gap="sm">
                <p className="text-sm text-[var(--ds-ink-soft)]">Premium blocks + 30 themes.</p>
                <Cluster gap="sm">
                  <Button size="sm" variant="accent">Buy</Button>
                  <Button size="sm" variant="ghost">Demo</Button>
                </Cluster>
              </Stack>
            </CardContent>
          </Card>
        </Preview>
      </section>
    </article>
  );
}
