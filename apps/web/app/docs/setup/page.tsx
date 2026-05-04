import { PageHeader } from "../../_components/docs/PageHeader";
import { StackSetup } from "../../_components/docs/StackSetup";
import Link from "next/link";

export default function SetupPage() {
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Getting Started"
        title="Set up with your stack"
        description="Pick your framework. Every step has a copy button. Total time from zero to a styled <Button> is about 90 seconds."
      />

      <StackSetup />

      <section id="missing" className="flex flex-col gap-3 surface p-5 mt-6">
        <h2 className="font-semibold">Don't see your stack?</h2>
        <p className="text-sm text-[var(--ds-ink-soft)]">
          disenio works in any React project that can run Tailwind v4. The CLI just copies plain TSX.
          Open a <a href="https://github.com" className="underline">GitHub issue</a> with your setup
          and we'll add a tab — usually within a day.
        </p>
        <p className="text-sm text-[var(--ds-ink-soft)]">
          For more depth, see the full{" "}
          <Link className="underline" href="/docs/installation">
            Installation
          </Link>{" "}
          and{" "}
          <Link className="underline" href="/docs/cli">
            CLI reference
          </Link>{" "}
          pages.
        </p>
      </section>
    </article>
  );
}
