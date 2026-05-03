import { PageHeader } from "../../_components/docs/PageHeader";
import { CodeBlock } from "../../_components/docs/CodeBlock";

const COMMANDS = [
  {
    cmd: "disenio init",
    desc: "Initialize the toolkit in your project. Writes disenio.json, drops the cn util, sets up the theme stylesheet.",
  },
  {
    cmd: "disenio add <component...>",
    desc: "Copy one or more components into your repo. Pass --overwrite to replace existing files.",
  },
  {
    cmd: "disenio theme apply <file.css>",
    desc: "Apply an exported theme file (from /docs/theming). Overwrites your active theme.css.",
  },
  {
    cmd: "disenio theme export",
    desc: "Print your current theme tokens to stdout. Useful for committing theme snapshots.",
  },
  {
    cmd: "disenio diff",
    desc: "Compare your local component copies against the upstream registry. See what changed.",
  },
  {
    cmd: "disenio update <component>",
    desc: "Pull the latest upstream version of a component into your repo. Three-way merge if you've edited it.",
  },
];

export default function CliPage() {
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Getting Started"
        title="CLI reference"
        description="The disenio CLI is the only runtime piece of the toolkit. Everything else is source code in your repo."
        badge="planned · v0.2"
      />

      <section id="install-cli" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Run anywhere</h2>
        <p className="text-[var(--ds-ink-soft)]">
          The CLI runs via <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">npx</code> /
          <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">pnpm dlx</code> /
          <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">bunx</code>.
          You don't need to install it as a project dependency.
        </p>
        <CodeBlock
          lang="bash"
          code={`# pick a manager
pnpm dlx disenio add button input
npx     disenio add button input
bunx    disenio add button input`}
        />
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
    </article>
  );
}
