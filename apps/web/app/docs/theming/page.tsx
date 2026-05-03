import { PageHeader } from "../../_components/docs/PageHeader";
import { FeelSwitcher } from "../../_components/FeelSwitcher";
import { AccentPicker } from "../../_components/AccentPicker";
import { ThemeExport } from "../../_components/ThemeExport";
import { CodeBlock } from "../../_components/docs/CodeBlock";

const TOKENS = [
  { name: "--ds-paper", desc: "Page background." },
  { name: "--ds-paper-deep", desc: "Recessed surfaces (sidebars, code blocks)." },
  { name: "--ds-ink", desc: "Primary text." },
  { name: "--ds-ink-soft", desc: "Secondary text and labels." },
  { name: "--ds-muted", desc: "Tertiary text, hints, captions." },
  { name: "--ds-line", desc: "Borders and dividers." },
  { name: "--ds-accent", desc: "Brand accent — buttons, focus rings, highlights." },
  { name: "--ds-accent-ink", desc: "Text on accent backgrounds (auto-contrast)." },
  { name: "--ds-radius", desc: "Default surface radius." },
  { name: "--ds-button-radius", desc: "Button-specific radius (Feels override this)." },
  { name: "--ds-field-radius", desc: "Input/textarea radius." },
  { name: "--ds-duration", desc: "Default transition duration." },
  { name: "--ds-easing", desc: "Default transition curve." },
  { name: "--ds-shadow", desc: "Surface shadow language." },
];

export default function ThemingPage() {
  return (
    <article className="flex flex-col gap-12 max-w-3xl pb-24">
      <PageHeader
        eyebrow="Getting Started"
        title="Theming"
        description="Pick a Feel, choose an accent, and export a CSS file you commit. Every component on this site reads from the same tokens — what you preview is what you ship."
      />

      <section id="editor" className="flex flex-col gap-5">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Live editor</h2>
        <p className="text-[var(--ds-ink-soft)]">
          Switch the Feel — Modern, Modern Dark, Editorial, Playful, Brutalist, Clinical — and
          watch every page on this site re-tune. Pick an accent. When you like it, copy the CSS.
        </p>
        <div className="surface p-5 flex flex-col gap-5">
          <FeelSwitcher />
          <AccentPicker />
        </div>
      </section>

      <section id="export" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Export</h2>
        <p className="text-[var(--ds-ink-soft)]">
          The block below reflects the current state. Copy it into{" "}
          <code className="mono text-sm bg-[var(--ds-paper-deep)] px-1 py-0.5 rounded">app/styles/theme.css</code>.
        </p>
        <ThemeExport />
      </section>

      <section id="apply" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Apply</h2>
        <p className="text-[var(--ds-ink-soft)]">Import it once at the top of your global stylesheet:</p>
        <CodeBlock
          filename="app/globals.css"
          lang="css"
          code={`@import "tailwindcss";
@import "./styles/theme.css";`}
        />
      </section>

      <section id="tokens" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Token reference</h2>
        <div className="surface overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b hairline bg-[var(--ds-paper-deep)]">
                <th className="text-left px-4 py-2.5 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)] font-normal">
                  Token
                </th>
                <th className="text-left px-4 py-2.5 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)] font-normal">
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((t, i) => (
                <tr key={t.name} className={i < TOKENS.length - 1 ? "border-b hairline" : ""}>
                  <td className="px-4 py-3 mono text-[12.5px] text-[var(--ds-accent)] align-top">{t.name}</td>
                  <td className="px-4 py-3 text-[var(--ds-ink-soft)] align-top">{t.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
