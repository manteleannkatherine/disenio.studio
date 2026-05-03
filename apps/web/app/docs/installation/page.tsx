import { PageHeader } from "../../_components/docs/PageHeader";
import { CodeBlock } from "../../_components/docs/CodeBlock";
import { InstallTabs } from "../../_components/docs/InstallTabs";

export default function InstallationPage() {
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Getting Started"
        title="Installation"
        description="Drop disenio.io into a fresh or existing project in under a minute. The CLI installs tokens, utilities, and a starter theme — you stay in control of everything else."
      />

      <section id="prereqs" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Prerequisites</h2>
        <ul className="flex flex-col gap-2 list-disc pl-5 text-[var(--ds-ink-soft)]">
          <li>Node 20+ (or Bun 1.1+)</li>
          <li>A React project (Next.js, Vite, Remix, Astro all supported)</li>
          <li>Tailwind CSS v4 (the toolkit uses Tailwind for utility classes)</li>
        </ul>
      </section>

      <section id="init" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">1. Initialize</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Run the init command from your project root. It writes a <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">disenio.json</code> config, drops a starter theme into
          <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">app/styles/theme.css</code>, and adds the <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">cn</code> utility.
        </p>
        <InstallTabs command="disenio init" />
      </section>

      <section id="add-component" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">2. Add a component</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Components copy into your repo as plain TSX — no runtime dependency on disenio.
        </p>
        <InstallTabs command="disenio add button" />
      </section>

      <section id="import" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">3. Import and use</h2>
        <CodeBlock
          filename="app/page.tsx"
          code={`import { Button } from "@/components/ui/button";

export default function Home() {
  return <Button variant="accent">Hola</Button>;
}`}
        />
      </section>

      <section id="theme-css" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">4. Wire the theme</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Import the generated theme stylesheet at the top of your global CSS.
        </p>
        <CodeBlock
          filename="app/globals.css"
          lang="css"
          code={`@import "tailwindcss";
@import "./styles/theme.css";`}
        />
      </section>
    </article>
  );
}
