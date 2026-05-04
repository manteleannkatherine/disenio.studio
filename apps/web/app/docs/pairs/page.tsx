import {
  Button,
  Input,
  Badge,
  FormField,
  Toolbar,
  EmptyState,
  StatCard,
  Stack,
} from "@disenio/ui";
import { PageHeader } from "../../_components/docs/PageHeader";
import { Preview } from "../../_components/docs/Preview";
import { CodeBlock } from "../../_components/docs/CodeBlock";
import { InstallTabs } from "../../_components/docs/InstallTabs";
import { highlight } from "../../_components/docs/highlight";

const SNIPPETS = {
  formField: `<FormField label="Email" hint="We'll never share it." required>
  <Input placeholder="hola@disenio.io" />
</FormField>`,
  toolbar: `<Toolbar>
  <Toolbar.Search placeholder="Search components" />
  <Toolbar.Filters>
    <Badge>active</Badge>
    <Badge tone="accent">pro</Badge>
  </Toolbar.Filters>
  <Toolbar.Actions>
    <Button size="sm">+ New</Button>
  </Toolbar.Actions>
</Toolbar>`,
  empty: `<EmptyState
  title="No components yet"
  description="Run \`disenio add button\` to install your first one."
  action={<Button variant="accent" size="sm">Browse components</Button>}
/>`,
  stat: `<StatCard label="Installs (7d)" value="1,284" delta="+18%" />
<StatCard label="Pro revenue (MTD)" value="$2,304" delta="+9%" />
<StatCard label="Churn" value="0.8%" delta="-0.2%" />`,
  philosophy: `// What every other library ships:
import { Button } from "ui/button";
import { Input } from "ui/input";

// What you compose by hand, every project, every time:
<div className="flex flex-col gap-1.5">
  <label className="text-xs uppercase tracking-wider">Email</label>
  <input className="..." />
  <span className="text-xs text-muted">We'll never share it.</span>
</div>

// What disenio.io ships instead:
<FormField label="Email" hint="We'll never share it.">
  <Input placeholder="hola@disenio.io" />
</FormField>`,
};

export default async function PairsPage() {
  const [hForm, hTool, hEmpty, hStat, hPhil] = await Promise.all([
    highlight(SNIPPETS.formField),
    highlight(SNIPPETS.toolbar),
    highlight(SNIPPETS.empty),
    highlight(SNIPPETS.stat),
    highlight(SNIPPETS.philosophy),
  ]);

  return (
    <article className="flex flex-col gap-12 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Pairs"
        title="Pairs over primitives"
        description="The middle layer between primitives and full templates. Components that always ship together, glued in the way they actually appear in real products. The unit of reuse that other libraries ignore."
        badge="thesis"
      />

      <section id="why" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Why pairs?</h2>
        <p className="text-[var(--ds-ink-soft)] leading-relaxed">
          Every UI library ships <em>primitives</em> — Button, Input, Card. Every product
          composes them by hand, badly, the same way, in every codebase, forever. A label
          paired with an input paired with a hint is the unit you actually ship. Documenting
          components in isolation lies about how they get used.
        </p>
        <CodeBlock code={SNIPPETS.philosophy} filename="why pairs.tsx" />
      </section>

      <section id="form-field" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">FormField</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Label + control + hint/error, with proper a11y wiring (aria-describedby, aria-invalid)
          forwarded to the wrapped control automatically.
        </p>
        <Preview code={SNIPPETS.formField} highlightedCode={hForm}>
          <Stack gap="md" className="w-full max-w-sm">
            <FormField label="Email" hint="We'll never share it." required>
              <Input placeholder="hola@disenio.io" />
            </FormField>
            <FormField label="Password" error="Too short">
              <Input type="password" defaultValue="hola" />
            </FormField>
          </Stack>
        </Preview>
        <InstallTabs command="disenio add form-field" />
      </section>

      <section id="toolbar" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Toolbar</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Search + filters + actions, auto-arranged. Slots are <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">Toolbar.Search</code>,{" "}
          <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">Toolbar.Filters</code>,{" "}
          <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">Toolbar.Actions</code>.
        </p>
        <Preview code={SNIPPETS.toolbar} highlightedCode={hTool}>
          <div className="w-full">
            <Toolbar>
              <Toolbar.Search placeholder="Search components" />
              <Toolbar.Filters>
                <Badge>active</Badge>
                <Badge tone="accent">pro</Badge>
              </Toolbar.Filters>
              <Toolbar.Actions>
                <Button size="sm" variant="accent">+ New</Button>
              </Toolbar.Actions>
            </Toolbar>
          </div>
        </Preview>
        <InstallTabs command="disenio add toolbar" />
      </section>

      <section id="empty-state" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">EmptyState</h2>
        <p className="text-[var(--ds-ink-soft)]">
          The placeholder you ship instead of a blank screen. Default illustration is theme-aware;
          pass <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">art</code> to override.
        </p>
        <Preview code={SNIPPETS.empty} highlightedCode={hEmpty}>
          <div className="w-full max-w-md">
            <EmptyState
              title="No components yet"
              description="Run `disenio add button` to install your first one."
              action={<Button variant="accent" size="sm">Browse components</Button>}
            />
          </div>
        </Preview>
        <InstallTabs command="disenio add empty-state" />
      </section>

      <section id="stat-card" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">StatCard</h2>
        <p className="text-[var(--ds-ink-soft)]">
          The dashboard pair. Label + big value + delta, with auto-tint based on the leading sign.
        </p>
        <Preview code={SNIPPETS.stat} highlightedCode={hStat}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <StatCard label="Installs (7d)" value="1,284" delta="+18%" />
            <StatCard label="Pro revenue (MTD)" value="$2,304" delta="+9%" />
            <StatCard label="Churn" value="0.8%" delta="-0.2%" />
          </div>
        </Preview>
        <InstallTabs command="disenio add stat-card" />
      </section>

      <section id="next" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">More pairs landing</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Filter Bar",
            "Search Results",
            "Auth Card",
            "Comment Thread",
            "Page Heading",
            "Confirm Dialog",
          ].map((p) => (
            <div key={p} className="surface-deep p-4 flex items-center justify-between text-sm">
              <span>{p}</span>
              <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">soon</span>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
