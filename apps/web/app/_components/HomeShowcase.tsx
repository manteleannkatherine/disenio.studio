"use client";
import {
  Button,
  Input,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Stack,
  Cluster,
  FormField,
  Toolbar,
  StatCard,
  EmptyState,
} from "@disenio/ui";

export function HomeShowcase() {
  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* Stats — full width */}
      <div className="lg:col-span-3 grid sm:grid-cols-3 gap-3">
        <StatCard label="Installs (7d)" value="1,284" delta="+18%" />
        <StatCard label="Pro revenue (MTD)" value="$2,304" delta="+9%" />
        <StatCard label="Churn" value="0.8%" delta="-0.2%" />
      </div>

      {/* Form pair */}
      <div className="surface p-5 flex flex-col gap-4">
        <Cluster justify="between">
          <span className="serif text-xl tracking-[-0.02em]">Form pair</span>
          <Badge tone="accent">FormField</Badge>
        </Cluster>
        <Stack gap="md">
          <FormField label="Email" hint="We'll never share it." required>
            <Input placeholder="hola@disenio.studio" />
          </FormField>
          <FormField label="Password" error="Too short">
            <Input type="password" defaultValue="hola" />
          </FormField>
        </Stack>
        <Cluster justify="between" className="pt-2 border-t hairline">
          <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
            a11y wired · WCAG AA
          </span>
          <Button variant="accent" size="sm">Send →</Button>
        </Cluster>
      </div>

      {/* Toolbar pair */}
      <div className="surface p-5 flex flex-col gap-4">
        <Cluster justify="between">
          <span className="serif text-xl tracking-[-0.02em]">Toolbar pair</span>
          <Badge tone="accent">Toolbar</Badge>
        </Cluster>
        <Toolbar>
          <Toolbar.Search placeholder="Search" />
          <Toolbar.Filters>
            <Badge>active</Badge>
            <Badge tone="ink">3</Badge>
          </Toolbar.Filters>
          <Toolbar.Actions>
            <Button size="sm" variant="accent">+ New</Button>
          </Toolbar.Actions>
        </Toolbar>
        <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
          slot-based · auto-arranges
        </span>
      </div>

      {/* Tabs */}
      <div className="surface p-5 flex flex-col gap-4">
        <Cluster justify="between">
          <span className="serif text-xl tracking-[-0.02em]">Tabs</span>
          <Badge>primitive</Badge>
        </Cluster>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="text-sm text-[var(--ds-ink-soft)] mt-3">
            Switch between related views without navigating away.
          </TabsContent>
          <TabsContent value="usage" className="text-sm text-[var(--ds-ink-soft)] mt-3">
            Controlled or uncontrolled. Pass <code className="mono text-xs">defaultValue</code>.
          </TabsContent>
          <TabsContent value="api" className="text-sm text-[var(--ds-ink-soft)] mt-3">
            <code className="mono text-xs">Tabs · TabsList · TabsTrigger · TabsContent</code>
          </TabsContent>
        </Tabs>
      </div>

      {/* Empty state — full width */}
      <div className="lg:col-span-2">
        <EmptyState
          title="No components yet"
          description="Run `disenio add button` to install your first one. Or just browse the registry — it ships 11 components, 4 pairs, and 8 layouts out of the box."
          action={
            <Cluster gap="sm">
              <Button variant="accent" size="sm">Browse components</Button>
              <Button variant="ghost" size="sm">Read docs</Button>
            </Cluster>
          }
        />
      </div>

      {/* Settings card */}
      <div className="surface p-5 flex flex-col gap-4">
        <Cluster justify="between">
          <span className="serif text-xl tracking-[-0.02em]">Settings</span>
          <Badge>Card</Badge>
        </Cluster>
        <Stack gap="md">
          <Switch defaultChecked label="Email notifications" description="Weekly digest." />
          <Switch label="Dark mode" description="Match system." />
          <Switch defaultChecked disabled label="2FA" description="Required by org." />
        </Stack>
      </div>

      {/* Pricing card — featured */}
      <div className="lg:col-span-3">
        <Card>
          <CardHeader>
            <Cluster justify="between">
              <CardTitle>Disenio Pro</CardTitle>
              <Badge tone="accent">popular</Badge>
            </Cluster>
            <CardDescription>Marketing Kit + Dashboard Kit + Email Kit.</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="sm">
              <Cluster gap="sm" align="baseline">
                <span className="serif text-5xl tracking-[-0.02em] font-semibold">$96</span>
                <span className="text-sm text-[var(--ds-muted)]">lifetime · all updates</span>
              </Cluster>
              <ul className="text-sm text-[var(--ds-ink-soft)] mt-3 grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                <li>· 30+ premium pages</li>
                <li>· 8 hand-crafted Feels</li>
                <li>· Email components</li>
                <li>· Figma kit</li>
                <li>· Pro CLI features</li>
                <li>· Priority support</li>
              </ul>
            </Stack>
          </CardContent>
          <CardFooter>
            <Cluster gap="sm" className="w-full">
              <Button variant="accent">Notify me at launch</Button>
              <Button variant="ghost">See what's included</Button>
            </Cluster>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
