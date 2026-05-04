import Link from "next/link";
import { Button, Input, Textarea, Badge, Card, CardHeader, CardTitle, CardDescription, Switch, Tabs, TabsList, TabsTrigger, Stack, Cluster } from "@disenio/ui";
import { PageHeader } from "../../_components/docs/PageHeader";

const ITEMS = [
  {
    href: "/docs/components/badge",
    name: "Badge",
    desc: "Compact label for status, category, or count.",
    preview: <Badge tone="accent">popular</Badge>,
  },
  {
    href: "/docs/components/button",
    name: "Button",
    desc: "The primary action primitive. Four variants, three sizes.",
    preview: <Button variant="accent" size="sm">Click me</Button>,
  },
  {
    href: "/docs/components/card",
    name: "Card",
    desc: "Surface for grouped content with header, body, footer.",
    preview: (
      <Card className="w-[180px]">
        <CardHeader className="!p-3">
          <CardTitle className="!text-sm">Pro</CardTitle>
          <CardDescription className="!text-xs">$96 once</CardDescription>
        </CardHeader>
      </Card>
    ),
  },
  {
    href: "/docs/components/dialog",
    name: "Dialog",
    desc: "Modal overlay with backdrop, escape, scroll lock.",
    preview: (
      <div className="w-[180px] h-16 rounded-md border hairline bg-[var(--ds-paper)] shadow-[var(--ds-shadow)] grid place-items-center text-xs text-[var(--ds-ink-soft)]">
        modal preview
      </div>
    ),
  },
  {
    href: "/docs/components/input",
    name: "Input",
    desc: "Single-line text field with label, hint, error states.",
    preview: <Input placeholder="hola@disenio.io" className="!h-9" />,
  },
  {
    href: "/docs/components/layout",
    name: "Layout",
    desc: "Stack, Cluster, Switcher, Sidebar, Center, Grid, Spacer, Divider — 8 in one.",
    preview: (
      <Stack gap="xs" className="w-full max-w-[180px]">
        <Cluster gap="xs">
          <span className="surface-deep h-5 flex-1 rounded-sm" />
          <span className="surface-deep h-5 flex-1 rounded-sm" />
        </Cluster>
        <span className="surface-deep h-5 w-full rounded-sm" />
        <Cluster gap="xs">
          <span className="surface-deep h-5 flex-1 rounded-sm" />
          <span className="surface-deep h-5 flex-1 rounded-sm" />
          <span className="surface-deep h-5 flex-1 rounded-sm" />
        </Cluster>
      </Stack>
    ),
  },
  {
    href: "/docs/components/select",
    name: "Select",
    desc: "Choose one of many. Keyboard nav, theme-aware.",
    preview: (
      <div className="w-full max-w-[180px] h-9 px-3 flex items-center justify-between rounded-md border hairline bg-[var(--ds-paper)] text-sm text-[var(--ds-muted)]">
        Select… <span aria-hidden>▾</span>
      </div>
    ),
  },
  {
    href: "/docs/components/switch",
    name: "Switch",
    desc: "Toggle a boolean. Controlled or uncontrolled.",
    preview: <Switch defaultChecked />,
  },
  {
    href: "/docs/components/tabs",
    name: "Tabs",
    desc: "Switch between related views without navigating.",
    preview: (
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">One</TabsTrigger>
          <TabsTrigger value="b">Two</TabsTrigger>
        </TabsList>
      </Tabs>
    ),
  },
  {
    href: "/docs/components/textarea",
    name: "Textarea",
    desc: "Multi-line text field with the same affordances as Input.",
    preview: <Textarea placeholder="Tell us…" className="!min-h-[60px] !text-xs" />,
  },
  {
    href: "/docs/components/toast",
    name: "Toast",
    desc: "Transient notifications. Fire from anywhere.",
    preview: (
      <div className="w-[200px] rounded-md border hairline bg-[var(--ds-paper)] shadow-[var(--ds-shadow)] p-3 flex items-start gap-2">
        <span className="size-2 mt-1.5 rounded-full bg-[var(--ds-accent)]" />
        <div className="text-xs"><div className="font-medium">Saved</div><div className="text-[var(--ds-muted)]">Your changes</div></div>
      </div>
    ),
  },
];

export default function ComponentsIndex() {
  return (
    <article className="flex flex-col gap-10 max-w-4xl pb-24">
      <PageHeader
        eyebrow="Components"
        title="All components"
        description="Ten primitives shipping in v0.2. More land each week."
      />
      <div className="grid sm:grid-cols-2 gap-4">
        {ITEMS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="surface p-5 flex flex-col gap-4 hover:-translate-y-0.5 transition-transform group"
          >
            <div className="h-28 surface-deep rounded-lg flex items-center justify-center px-3 overflow-hidden">
              {c.preview}
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium flex items-center gap-2">
                {c.name}
                <span className="text-[var(--ds-muted)] group-hover:text-[var(--ds-ink)] transition-colors">→</span>
              </span>
              <span className="text-sm text-[var(--ds-muted)]">{c.desc}</span>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
