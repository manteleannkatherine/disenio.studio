import {
  Button,
  Input,
  Badge,
  FormField,
  Toolbar,
  EmptyState,
  StatCard,
  Stack,
  AuthCard,
  PageHeading,
  CommentRow,
  PriceCard,
  Avatar,
} from "@disenio/ui";
import { PageHeader } from "../../_components/docs/PageHeader";
import { Preview } from "../../_components/docs/Preview";
import { CodeBlock } from "../../_components/docs/CodeBlock";
import { InstallTabs } from "../../_components/docs/InstallTabs";
import { highlight } from "../../_components/docs/highlight";
import { FilterBarDemo } from "./_demos";

const SNIPPETS = {
  formField: `<FormField label="Email" hint="We'll never share it." required>
  <Input placeholder="hola@disenio.studio" />
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
  filter: `<FilterBar>
  <FilterBar.Chip onRemove={...}>Status: open</FilterBar.Chip>
  <FilterBar.Chip onRemove={...}>Sort: newest</FilterBar.Chip>
  <FilterBar.ClearAll onClear={...} />
</FilterBar>`,
  auth: `<AuthCard
  title="Welcome back"
  description="Sign in to your account."
  providers={
    <>
      <AuthCard.Provider>Continue with Google</AuthCard.Provider>
      <AuthCard.Provider>Continue with GitHub</AuthCard.Provider>
    </>
  }
  footer={<>No account? <a>Sign up</a></>}
>
  <FormField label="Email"><Input /></FormField>
  <FormField label="Password"><Input type="password" /></FormField>
  <Button variant="accent">Sign in</Button>
</AuthCard>`,
  pageHeading: `<PageHeading
  eyebrow="Settings"
  title="Workspace"
  description="Manage members, billing, and integrations."
  actions={<Button>+ Invite</Button>}
  divided
/>`,
  comment: `<CommentRow
  author="Ana Mantel"
  meta="2h ago"
  badge={<Badge tone="accent">author</Badge>}
  avatar={<Avatar name="Ana Mantel" fake />}
  actions={<><a>Reply</a> <a>Like</a></>}
>
  This is the comment body. It can be any ReactNode.
</CommentRow>`,
  price: `<PriceCard
  name="Pro"
  price="$96"
  period="lifetime"
  description="All premium kits + lifetime updates."
  features={["Marketing Kit", "Dashboard Kit", "30+ themes", "Figma file"]}
  cta="Buy lifetime"
  featured
/>`,
  philosophy: `// What every other library ships:
import { Button } from "ui/button";
import { Input } from "ui/input";

// What you compose by hand, every project, every time:
<div className="flex flex-col gap-1.5">
  <label className="text-xs uppercase tracking-wider">Email</label>
  <input className="..." />
  <span className="text-xs text-muted">We'll never share it.</span>
</div>

// What disenio.studio ships instead:
<FormField label="Email" hint="We'll never share it.">
  <Input placeholder="hola@disenio.studio" />
</FormField>`,
};

export default async function PairsPage() {
  const [hForm, hTool, hEmpty, hStat, hPhil, hFilter, hAuth, hHeading, hComment, hPrice] =
    await Promise.all([
      highlight(SNIPPETS.formField),
      highlight(SNIPPETS.toolbar),
      highlight(SNIPPETS.empty),
      highlight(SNIPPETS.stat),
      highlight(SNIPPETS.philosophy),
      highlight(SNIPPETS.filter),
      highlight(SNIPPETS.auth),
      highlight(SNIPPETS.pageHeading),
      highlight(SNIPPETS.comment),
      highlight(SNIPPETS.price),
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
              <Input placeholder="hola@disenio.studio" />
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

      <section id="filter-bar" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">FilterBar</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Active-filter chips with a clear-all action. Drop above any list view.
        </p>
        <Preview code={SNIPPETS.filter} highlightedCode={hFilter}>
          <FilterBarDemo />
        </Preview>
        <InstallTabs command="disenio add filter-bar" />
      </section>

      <section id="auth-card" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">AuthCard</h2>
        <p className="text-[var(--ds-ink-soft)]">
          The canonical sign-in form: title, providers, divider, fields, primary action, footer.
        </p>
        <Preview code={SNIPPETS.auth} highlightedCode={hAuth}>
          <AuthCard
            title="Welcome back"
            description="Sign in to continue."
            providers={
              <>
                <AuthCard.Provider>Continue with Google</AuthCard.Provider>
                <AuthCard.Provider>Continue with GitHub</AuthCard.Provider>
              </>
            }
            footer={<>No account? <span className="text-[var(--ds-ink)] underline">Sign up</span></>}
          >
            <FormField label="Email">
              <Input placeholder="hola@disenio.studio" />
            </FormField>
            <FormField label="Password">
              <Input type="password" placeholder="••••••" />
            </FormField>
            <Button variant="accent">Sign in →</Button>
          </AuthCard>
        </Preview>
        <InstallTabs command="disenio add auth-card" />
      </section>

      <section id="page-heading" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">PageHeading</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Eyebrow + title + description + actions. The header you put at the top of every page.
        </p>
        <Preview code={SNIPPETS.pageHeading} highlightedCode={hHeading}>
          <div className="w-full">
            <PageHeading
              eyebrow="Settings"
              title="Workspace"
              description="Manage members, billing, and integrations."
              actions={
                <>
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button variant="accent" size="sm">+ Invite</Button>
                </>
              }
              divided
            />
          </div>
        </Preview>
        <InstallTabs command="disenio add page-heading" />
      </section>

      <section id="comment-row" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">CommentRow</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Avatar + author + meta + body, with optional badge and actions row.
        </p>
        <Preview code={SNIPPETS.comment} highlightedCode={hComment}>
          <Stack gap="lg" className="w-full max-w-md">
            <CommentRow
              author="Ana Mantel"
              meta="2h ago"
              badge={<Badge tone="accent">author</Badge>}
              avatar={<Avatar name="Ana Mantel" fake />}
              actions={
                <>
                  <button className="hover:text-[var(--ds-ink)] transition-colors">Reply</button>
                  <button className="hover:text-[var(--ds-ink)] transition-colors">Like</button>
                </>
              }
            >
              The pairs philosophy is exactly what was missing — every team rebuilds these by hand.
            </CommentRow>
            <CommentRow
              author="Sam"
              meta="1h ago"
              avatar={<Avatar name="Sam" fake />}
              actions={<button className="hover:text-[var(--ds-ink)] transition-colors">Reply</button>}
            >
              +1. The diff/update CLI is the killer feature for me.
            </CommentRow>
          </Stack>
        </Preview>
        <InstallTabs command="disenio add comment-row" />
      </section>

      <section id="price-card" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">PriceCard</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Pricing-table cell. Name + price + features + CTA, with a featured variant for the popular tier.
        </p>
        <Preview code={SNIPPETS.price} highlightedCode={hPrice}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <PriceCard
              name="Open"
              price="Free"
              description="MIT components, layouts, pairs, CLI."
              features={["11 components", "8 layouts", "9 pairs", "6 Feels"]}
              cta="Get started"
            />
            <PriceCard
              name="Pro"
              price="$96"
              period="lifetime"
              description="All premium kits."
              features={["Marketing Kit", "30+ themes", "Figma file", "Priority support"]}
              cta="Buy lifetime"
              featured
            />
            <PriceCard
              name="Studio"
              price="$19"
              period="/mo"
              description="Hosted CMS for your project."
              features={["Theme presets", "Blog + changelog", "Custom domain"]}
              cta="Talk to us"
            />
          </div>
        </Preview>
        <InstallTabs command="disenio add price-card" />
      </section>

      <section id="next" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">More pairs landing</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Search Results",
            "Confirm Dialog",
            "Notification Item",
            "Stepper",
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
