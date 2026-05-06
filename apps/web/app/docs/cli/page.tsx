import { PageHeader } from "../../_components/docs/PageHeader";
import { CodeBlock } from "../../_components/docs/CodeBlock";

const COMMANDS = [
  {
    cmd: "disenio.studio init",
    desc: "Interactive scaffold. Prompts for a Feel and an install scope. Writes disenio.json, the cn util, and theme.css. Use --yes to skip prompts.",
  },
  {
    cmd: "disenio.studio add <component...>",
    desc: "Copy one or more components into your repo. Pass --overwrite to replace existing files.",
  },
  {
    cmd: "disenio.studio add --all",
    desc: "Install every component and every pair in one shot. Mix with names to add extras (e.g. --pairs button).",
  },
  {
    cmd: "disenio.studio add --components",
    desc: "Install all components, skip pairs.",
  },
  {
    cmd: "disenio.studio add --pairs",
    desc: "Install all pairs, skip components.",
  },
  {
    cmd: "disenio.studio theme list",
    desc: "List all available Feels. The active one is marked ✓.",
  },
  {
    cmd: "disenio.studio theme apply <name>",
    desc: "Switch your theme.css to a different Feel. Use --accent <hex> to override the accent.",
  },
  {
    cmd: "disenio.studio list",
    desc: "List all available components and pairs by id.",
  },
  {
    cmd: "disenio.studio diff [id...]",
    desc: "Compare local copies against upstream + your lockfile. Classifies each file as in-sync, local-edit, upstream-update, or both.",
  },
  {
    cmd: "disenio.studio update [id...]",
    desc: "Pull the latest upstream into your repo. Refuses to clobber locally-edited files unless --force is passed.",
  },
];

const RECIPES = [
  {
    title: "Interactive setup (recommended)",
    desc: "Run init with no flags. You'll be prompted to pick a Feel and how many components to install up front.",
    code: `npx disenio.studio init`,
  },
  {
    title: "One-shot install (CI / scripts)",
    desc: "All choices passed as flags — no prompts, no surprises. Auto-skipped in non-TTY environments too.",
    code: `npx disenio.studio init --yes --theme stark --all`,
  },
  {
    title: "Just scaffold, add later",
    desc: "Skip the bulk install. You'll add components one at a time as you go.",
    code: `npx disenio.studio init --skip-install`,
  },
  {
    title: "Install just one",
    desc: "Pick a single primitive when you know what you need.",
    code: `npx disenio.studio add button`,
  },
  {
    title: "Install a few",
    desc: "Pass any number of ids — components and pairs both work.",
    code: `npx disenio.studio add button input card form-field`,
  },
  {
    title: "Install everything later",
    desc: "If you scaffolded empty, this fills the registry into your repo.",
    code: `npx disenio.studio add --all`,
  },
  {
    title: "Switch themes anytime",
    desc: "Apply a different Feel to your existing theme.css. Optional --accent overrides the brand color.",
    code: `npx disenio.studio theme apply playful --accent "#ff5e3a"`,
  },
  {
    title: "Bring your own gradient",
    desc: "By default the brand gradient auto-derives from --ds-accent via color-mix. Pass --gradient with 2–5 hex stops to ship your own (skips the auto-derive).",
    code: `npx disenio.studio init --yes --accent "#ff5e3a" --gradient "ff8a4c,ff5e3a,b91d2e"`,
  },
  {
    title: "Re-install with overwrite",
    desc: "Force a clean copy from the registry, replacing any local edits.",
    code: `npx disenio.studio add --all --overwrite`,
  },
];

const THEMES_LIST = [
  { id: "modernDark", label: "Modern · Dark", blurb: "Pure black, gradient brand, electric. (default)" },
  { id: "modern", label: "Modern", blurb: "Crisp white, geometric sans, violet→blue accent." },
  { id: "editorial", label: "Editorial", blurb: "Warm paper, ink type, generous restraint." },
  { id: "playful", label: "Playful", blurb: "Bouncy springs, soft pastels, rounded everything." },
  { id: "stark", label: "Stark", blurb: "Hard edges, mono type, no apology." },
  { id: "clinical", label: "Clinical", blurb: "Cool grays, precise spacing, subtle motion." },
];

export default function CliPage() {
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Getting Started"
        title="CLI reference"
        description="The disenio.studio CLI is the only runtime piece of the toolkit. Everything else is source code in your repo."
        badge="v0.2"
      />

      <section id="install-cli" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Run anywhere</h2>
        <p className="text-[var(--ds-ink-soft)]">
          The CLI runs via <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">npx</code> /
          <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">pnpm dlx</code> /
          <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">bunx</code>.
          You don&apos;t need to install it as a project dependency.
        </p>
        <CodeBlock
          lang="bash"
          code={`# pick a manager
pnpm dlx disenio.studio add button input
npx     disenio.studio add button input
bunx    disenio.studio add button input`}
        />
      </section>

      <section id="install-everything" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">
          Recipes
        </h2>
        <p className="text-[var(--ds-ink-soft)]">
          The <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">add</code> command takes any
          number of ids, plus three bulk flags for when you want a batch.
        </p>
        <div className="flex flex-col gap-3">
          {RECIPES.map((r) => (
            <div key={r.title} className="surface p-4 flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium">{r.title}</span>
                <span className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
                  recipe
                </span>
              </div>
              <p className="text-sm text-[var(--ds-ink-soft)]">{r.desc}</p>
              <code className="mono text-[13px] bg-[var(--ds-paper-deep)] border hairline rounded px-3 py-2 mt-1 overflow-x-auto whitespace-nowrap">
                {r.code}
              </code>
            </div>
          ))}
        </div>
      </section>

      <section id="commands" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Commands</h2>
        <div className="flex flex-col gap-3">
          {COMMANDS.map((c) => (
            <div key={c.cmd} className="surface p-4 flex flex-col gap-1.5">
              <code className="mono text-sm font-medium">{c.cmd}</code>
              <p className="text-sm text-[var(--ds-ink-soft)]">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="themes" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Themes</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Six built-in Feels. Pick at <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">init</code>,
          or switch anytime with <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">theme apply</code>.
          The active Feel is stored in <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">disenio.json</code>.
        </p>

        <div
          className="surface p-4 flex flex-col gap-2 mt-1"
          style={{ borderRadius: "var(--ds-radius)" }}
        >
          <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
            — Brand gradient
          </span>
          <p className="text-sm text-[var(--ds-ink-soft)]">
            By default <code className="mono text-[13px] bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">--ds-brand-gradient</code> auto-derives
            from <code className="mono text-[13px] bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">--ds-accent</code> via CSS{" "}
            <code className="mono text-[13px] bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">color-mix()</code> — so changing the accent
            re-tunes the gradient automatically.
          </p>
          <p className="text-sm text-[var(--ds-ink-soft)]">
            Pass <code className="mono text-[13px] bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">--gradient &quot;hex,hex,hex&quot;</code> to ship your
            own stops (skips the derive). Use 2 stops for a clean fade or 3+ for a richer transition.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {THEMES_LIST.map((t) => (
            <div
              key={t.id}
              className="surface p-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 items-baseline"
            >
              <code className="mono text-sm font-medium text-[var(--ds-ink)]">{t.id}</code>
              <p className="text-sm text-[var(--ds-ink-soft)]">
                <span className="font-medium text-[var(--ds-ink)]">{t.label}</span> — {t.blurb}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="flags" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Flags</h2>
        <div className="flex flex-col gap-3">
          {[
            { f: "--yes, -y", d: "Used with `init`. Skip prompts, use defaults. Auto-applied in non-TTY environments (CI, piped scripts)." },
            { f: "--theme <id>", d: "Used with `init` or `theme apply`. Pick a Feel by id. See Themes above for the list." },
            { f: "--accent <hex>", d: "Used with `init` or `theme apply`. Override the brand accent (default `#6d4cf2`). The gradient auto-derives from this via color-mix unless you pass --gradient." },
            { f: "--gradient <hex,hex,...>", d: "Used with `init` or `theme apply`. Explicit brand gradient stops (2–5 hex values, comma-separated). Skips the auto-derive. Example: `--gradient \"ff8a4c,ff5e3a,b91d2e\"`." },
            { f: "--all", d: "Used with `init` or `add`. Install every component and every pair." },
            { f: "--components", d: "Used with `init` or `add`. Install all components, skip pairs." },
            { f: "--pairs", d: "Used with `init` or `add`. Install all pairs, skip components." },
            { f: "--skip-install", d: "Used with `init`. Scaffold only — no components or pairs copied." },
            { f: "--overwrite", d: "Used with `init` or `add`. Replace existing files instead of skipping." },
            { f: "--force", d: "Used with `update`. Overwrite even files you've locally edited." },
          ].map((f) => (
            <div
              key={f.f}
              className="surface p-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 items-baseline"
            >
              <code className="mono text-sm font-medium text-[var(--ds-ink)]">{f.f}</code>
              <p className="text-sm text-[var(--ds-ink-soft)]">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
