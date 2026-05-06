/* Single source of truth for the AI integration prompt.
 * Used by /ai (rendered with copy button) and /llms.txt (served as text/plain). */

export const AI_PROMPT = `# disenio.studio — AI integration

You are helping a developer work with disenio.studio, a copy-paste React design toolkit. Components are not a runtime dependency — they live in the user's repo as plain TSX, themed by CSS variables.

## How it's installed
- npm package: \`disenio.studio\` (https://www.npmjs.com/package/disenio.studio)
- The package is a CLI only — it has no runtime exports. Do NOT \`import\` from \`disenio.studio\`.
- CLI bare run is **interactive**: \`npx disenio.studio init\` prompts for a Feel and an install scope (all / components / pairs / none).
- For non-interactive use (CI, scripts, AI agents), pass flags: \`npx disenio.studio init --yes --theme stark --all\`. The \`--yes\` flag is auto-applied when stdin isn't a TTY.
- After init: \`npx disenio.studio add <id>\` for individual components.
- Components copy to \`components/ui/<name>.tsx\` (path aliased via \`disenio.json\`)
- A \`cn\` helper lands at \`lib/cn.ts\`
- A starter theme lands at \`app/styles/theme.css\` (CSS variables on \`:root\`)
- A lockfile \`disenio.lock.json\` tracks installed components for diff/update
- The \`disenio.json\` config also stores the active \`feel\` for theme-switching.

## Components (14)
button, input, textarea, badge, card, switch, tabs, toast, dialog, select, avatar, tooltip, data-table, layout

## Pairs — composed components (9)
form-field, toolbar, empty-state, stat-card, filter-bar, auth-card, page-heading, comment-row

## Layout primitives
Stack, Cluster, Switcher, Sidebar, Center, Grid, Spacer, Divider

## Theme tokens — always use these, never hardcode
Color
- --ds-paper          background
- --ds-paper-deep     deeper background
- --ds-ink            primary text
- --ds-ink-soft       body / muted text
- --ds-muted          eyebrow / least prominent
- --ds-line           hairlines / borders
- --ds-accent         brand accent
- --ds-accent-ink     text on accent
- --ds-brand-gradient gradient (use as background only) — by default this is auto-derived from --ds-accent via color-mix, so it follows whatever brand color the user picks. Override with the CLI's --gradient flag for explicit stops.

Shape & motion
- --ds-radius, --ds-button-radius, --ds-field-radius
- --ds-duration, --ds-easing
- --ds-shadow, --ds-surface-highlight

Type
- --ds-font-sans, --ds-font-serif
- --ds-letter-spacing

## House classes (defined in globals.css)
- \`mono\`           — monospace; pair with \`uppercase tracking-[0.14em]\` for eyebrows
- \`serif\`          — display serif for headings
- \`hairline\`       — 1px border using --ds-line
- \`surface\`        — paper card with hairline border
- \`surface-deep\`   — deeper paper card with hairline border
- \`brand-text\`     — text colored with the brand gradient

## Conventions when generating UI
1. Prefer pairs over assembling primitives. Need a labeled input? Use \`<FormField label="Email"><Input /></FormField>\`, not a hand-rolled \`<label><input/></label>\`.
2. Use layout primitives (\`<Stack gap={4}>\`, \`<Cluster>\`, \`<Sidebar>\`) over custom flex/grid for the common cases.
3. Color, radius, motion: always reference a CSS variable. Never \`#0a0b10\`, always \`var(--ds-paper)\`.
4. Eyebrow labels: \`<span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">…</span>\`
5. Headings: \`serif\` class, tight tracking (\`tracking-[-0.02em]\` to \`-0.04em\`).
6. Borders: \`border hairline\` (the \`hairline\` class supplies the color from \`--ds-line\`).
7. Buttons that need brand emphasis: background \`var(--ds-brand-gradient)\`, color \`white\`, radius \`var(--ds-button-radius)\`.

## Imports
- During development inside the disenio.studio monorepo, import from \`@disenio/ui\`.
- In a consumer project after \`disenio.studio add\`, import from the local path (e.g. \`@/components/ui/button\`). Both surfaces are API-identical.

## Themes (Feels)
There are six built-in themes. The active one is stored in \`disenio.json\` as \`"feel"\` and rendered as CSS variables in \`app/styles/theme.css\`:
- \`modernDark\` — pure black, gradient brand, electric (default)
- \`modern\` — crisp white, geometric sans, violet→blue accent
- \`editorial\` — warm paper, ink type, generous restraint
- \`playful\` — bouncy springs, soft pastels, rounded everything
- \`stark\` — hard edges, mono type, no apology
- \`clinical\` — cool grays, precise spacing, subtle motion

## CLI commands the user can run
- \`npx disenio.studio init\` — interactive scaffold (prompts for theme + scope)
- \`npx disenio.studio init --yes --theme <id> --all\` — silent scaffold with full install
- \`npx disenio.studio init --skip-install\` — scaffold only (no components copied)
- \`npx disenio.studio add <id...>\` — copy specific components into the repo
- \`npx disenio.studio add --all\` — install every component and pair in one shot
- \`npx disenio.studio add --components\` — install all components, skip pairs
- \`npx disenio.studio add --pairs\` — install all pairs, skip components
- \`npx disenio.studio theme list\` — list available Feels (active marked ✓)
- \`npx disenio.studio theme apply <id>\` — switch theme.css to a different Feel
- \`npx disenio.studio diff [id...]\` — show drift between local files, lockfile, and upstream
- \`npx disenio.studio update [id...]\` — pull upstream changes (with \`--force\` to overwrite local edits)
- \`npx disenio.studio list\` — list available components

## CLI flags
- \`--yes / -y\` — skip prompts, use defaults (CI safe)
- \`--theme <id>\` — pick a Feel (init / theme apply)
- \`--accent <hex>\` — override the accent color (init / theme apply). The brand gradient auto-derives from this via CSS color-mix, so changing the accent re-tunes \`--ds-brand-gradient\` automatically.
- \`--gradient <hex,hex,...>\` — explicit brand gradient stops (2–5 hex values, comma-separated). Skips auto-derive. Example: \`--gradient "ff8a4c,ff5e3a,b91d2e"\` (init / theme apply)
- \`--all / --components / --pairs\` — bulk install scope (init / add)
- \`--skip-install\` — init only, no components
- \`--overwrite\` — replace existing files (init / add)
- \`--force\` — overwrite locally-edited files (update)

## Key principles
- Copy-paste, not runtime dependency — the user owns the source.
- Pairs are the unit between primitives and templates. Document and ship them as first-class.
- Theme tokens > theme prisons. Every visual decision is one CSS variable away.
- Lockfile-tracked diff/update keeps owned components on an upgrade path.

## Resources
- Site:  https://disenio.studio
- Docs:  https://disenio.studio/docs
- Showcase: https://disenio.studio/showcase
- Changelog: https://disenio.studio/changelog
- Contact: hello@creativekat.studio
`;
