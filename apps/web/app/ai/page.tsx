import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "../_components/SiteNav";
import { AI_PROMPT } from "../_lib/aiPrompt";
import { CopyPromptButton } from "./CopyPromptButton";

export const metadata: Metadata = {
  title: "Use with AI",
  description:
    "One prompt, drop into Claude / Cursor / ChatGPT. Teach your AI assistant the disenio.studio conventions in a paragraph.",
  openGraph: {
    title: "Use with AI · disenio.studio",
    description: "One prompt to teach Claude / Cursor / ChatGPT the toolkit.",
  },
};

const TARGETS = [
  {
    name: "Claude",
    note: "Paste into a project's instructions, or as the first message.",
  },
  {
    name: "Cursor",
    note: "Drop into .cursorrules, or @-mention as a doc.",
  },
  {
    name: "ChatGPT",
    note: "Save as a Custom GPT instruction, or pin to a project.",
  },
  {
    name: "Any IDE assistant",
    note: "It's plain markdown — works with Continue, Cody, Copilot Chat, JetBrains AI.",
  },
];

export default function AiPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <header className="mb-12 grid md:grid-cols-2 gap-8 items-end">
          <div className="flex flex-col gap-3">
            <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
              Use with AI
            </span>
            <h1 className="serif text-5xl sm:text-6xl tracking-[-0.04em] font-semibold leading-[0.95]">
              One prompt.
              <br />
              <span className="brand-text italic">Any assistant.</span>
            </h1>
          </div>
          <div className="flex flex-col gap-4 max-w-md">
            <p className="text-[var(--ds-ink-soft)]">
              Drop this into Claude, Cursor, ChatGPT, or your IDE assistant of choice. It teaches
              the toolkit&apos;s conventions — pairs over primitives, theme tokens over hex codes,
              CLI commands — in one paragraph.
            </p>
            <p className="text-sm text-[var(--ds-muted)]">
              Also exposed as{" "}
              <Link
                href="/llms.txt"
                className="underline-offset-4 hover:text-[var(--ds-ink-soft)] hover:underline"
              >
                /llms.txt
              </Link>{" "}
              for AI agents that follow the{" "}
              <a
                href="https://llmstxt.org"
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:text-[var(--ds-ink-soft)] hover:underline"
              >
                llms.txt convention
              </a>
              .
            </p>
          </div>
        </header>

        {/* Where to paste */}
        <section className="mb-10">
          <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)] block mb-4">
            — Where to paste
          </span>
          <ul className="grid sm:grid-cols-2 gap-3">
            {TARGETS.map((t) => (
              <li
                key={t.name}
                className="surface-deep p-4 flex flex-col gap-1 border hairline"
                style={{ borderRadius: "var(--ds-radius)" }}
              >
                <span className="text-sm font-medium">{t.name}</span>
                <span className="text-xs text-[var(--ds-muted)]">{t.note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Prompt block */}
        <section>
          <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
            <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">
              — The prompt
            </span>
            <CopyPromptButton prompt={AI_PROMPT} />
          </div>
          <pre
            className="surface-deep p-5 sm:p-6 overflow-x-auto text-[13px] leading-relaxed mono whitespace-pre-wrap break-words border hairline"
            style={{
              borderRadius: "var(--ds-radius)",
              color: "var(--ds-ink-soft)",
            }}
          >
            {AI_PROMPT}
          </pre>
        </section>

        <footer className="mt-12 pt-8 border-t hairline flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-[var(--ds-muted)]">
          <span>
            Found a gap?{" "}
            <Link
              href="/contact"
              className="text-[var(--ds-ink-soft)] underline-offset-4 hover:text-[var(--ds-ink)] hover:underline"
            >
              Tell us
            </Link>{" "}
            — the prompt should help, not hallucinate.
          </span>
          <span className="mono text-xs">written for humans and machines</span>
        </footer>
      </main>
    </>
  );
}
