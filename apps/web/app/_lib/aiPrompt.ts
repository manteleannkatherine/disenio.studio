/* Single source of truth for the AI integration prompt.
 * Used by /ai (rendered with copy button) and /llms.txt (served as text/plain). */

export const AI_PROMPT = `# disenio.studio — AI integration

A copy-paste React design toolkit. Components live in the user's repo as plain TSX, themed by CSS variables. Not a runtime dependency.

## Install
- npm: \`disenio.studio\` (CLI only — do NOT \`import\` anything from \`disenio.studio\`).
- Bare \`npx disenio.studio init\` is interactive (prompts for Feel + scope).
- For agents, scripts, CI: pass flags. Example: \`npx disenio.studio init --yes --theme modernDark --all\`.
- After init, components import from \`@/components/ui/<name>\`.

## What lands in the repo after init
- \`disenio.json\` — config (aliases, theme path, active feel)
- \`disenio.lock.json\` — lockfile for diff/update
- \`lib/cn.ts\` — class-name helper
- \`app/styles/theme.css\` — CSS variables on \`:root\`
- \`components/ui/*.tsx\` — copied components

## Components (14)
button, input, textarea, badge, card, switch, tabs, toast, dialog, select, avatar, tooltip, data-table, layout

## Pairs (9) — composed components, prefer over hand-assembling
form-field, toolbar, empty-state, stat-card, filter-bar, auth-card, page-heading, comment-row, price-card

## Layout primitives
Stack, Cluster, Switcher, Sidebar, Center, Grid, Spacer, Divider

## Theme tokens — always reference these, never hardcode
Color: --ds-paper, --ds-paper-deep, --ds-ink, --ds-ink-soft, --ds-muted, --ds-line, --ds-accent, --ds-accent-ink
Gradient: --ds-brand-gradient (auto-derived from --ds-accent via color-mix; use as background only)
Shape/motion: --ds-radius, --ds-button-radius, --ds-field-radius, --ds-duration, --ds-easing, --ds-shadow
Type: --ds-font-sans, --ds-font-serif, --ds-letter-spacing

## House classes (in globals.css)
- \`mono\`, \`serif\` — type
- \`hairline\` — 1px border from --ds-line
- \`surface\`, \`surface-deep\` — themed cards
- \`brand-text\` — text colored with the brand gradient

## Conventions
1. Prefer pairs. Need a labeled input? \`<FormField label="Email"><Input /></FormField>\`, not hand-rolled.
2. Layout: prefer \`<Stack gap={4}>\`, \`<Cluster>\`, \`<Sidebar>\` over custom flex/grid.
3. Color/radius/motion: always a CSS var. Never \`#0a0b10\`, always \`var(--ds-paper)\`.
4. Eyebrow labels: \`<span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-muted)]">…</span>\`.
5. Headings: \`serif\` class with tight tracking (\`tracking-[-0.02em]\` to \`-0.04em\`).
6. Borders: \`border hairline\`.
7. Brand-emphasis buttons: \`background: var(--ds-brand-gradient)\`, \`color: white\`, \`borderRadius: var(--ds-button-radius)\`.

## Themes (Feels)
\`modernDark\` (default), \`modern\`, \`editorial\`, \`playful\`, \`stark\`, \`clinical\`. Switch with \`npx disenio.studio theme apply <id>\`. Override accent with \`--accent\`; gradient with \`--gradient "hex,hex,..."\`.

## Common commands
- \`npx disenio.studio add <id...>\` — copy components
- \`npx disenio.studio add --all\` — install everything
- \`npx disenio.studio theme apply <id> [--accent <hex>]\` — switch Feel
- \`npx disenio.studio diff\` / \`update\` — lockfile-tracked sync with upstream

Full flag and command reference: https://disenio.studio/docs/cli
`;
