#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY = JSON.parse(readFileSync(join(__dirname, "registry.json"), "utf8"));
const CWD = process.cwd();
const CONFIG_PATH = join(CWD, "disenio.json");
const LOCK_PATH = join(CWD, "disenio.lock.json");

const C = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
};
const log = {
  info: (m) => console.log(`${C.cyan}›${C.reset} ${m}`),
  ok: (m) => console.log(`${C.green}✓${C.reset} ${m}`),
  warn: (m) => console.log(`${C.yellow}!${C.reset} ${m}`),
  err: (m) => console.error(`${C.red}✗${C.reset} ${m}`),
  brand: () => console.log(`${C.bold}${C.magenta}disenio.studio${C.reset} ${C.dim}v${REGISTRY.version}${C.reset}`),
};

function sha(text) {
  return createHash("sha256").update(text).digest("hex").slice(0, 16);
}
function rel(absPath) {
  return absPath.replace(CWD + "/", "");
}
function loadConfig() {
  return existsSync(CONFIG_PATH) ? JSON.parse(readFileSync(CONFIG_PATH, "utf8")) : null;
}
function loadLock() {
  return existsSync(LOCK_PATH) ? JSON.parse(readFileSync(LOCK_PATH, "utf8")) : { items: {} };
}
function saveLock(lock) {
  writeFileSync(LOCK_PATH, JSON.stringify(lock, null, 2));
}
function resolveTarget(filePath, config) {
  const aliases = config?.aliases ?? { ui: "components/ui", lib: "lib" };
  if (filePath.startsWith("components/ui/")) return resolve(CWD, aliases.ui, filePath.replace("components/ui/", ""));
  if (filePath.startsWith("lib/")) return resolve(CWD, aliases.lib, filePath.replace("lib/", ""));
  return resolve(CWD, filePath);
}
function findItem(id) {
  return [...REGISTRY.components, ...(REGISTRY.pairs ?? [])].find((c) => c.id === id);
}

function writeFileSafe(absPath, content, { overwrite }) {
  if (existsSync(absPath) && !overwrite) {
    log.warn(`exists, skipped — ${rel(absPath)} ${C.dim}(use --overwrite)${C.reset}`);
    return false;
  }
  mkdirSync(dirname(absPath), { recursive: true });
  writeFileSync(absPath, content);
  log.ok(rel(absPath));
  return true;
}

function recordLock(lock, comp, files) {
  lock.items[comp.id] = {
    name: comp.name,
    kind: comp.kind ?? "component",
    version: REGISTRY.version,
    installedAt: new Date().toISOString(),
    files: files.map(({ path, content }) => ({ path, sha: sha(content) })),
  };
}

/* ─────────────────────────────  themes  ───────────────────────────── */
const DEFAULT_ACCENT = "#6d4cf2";

const THEMES = {
  modernDark: {
    label: "Modern · Dark",
    blurb: "Soft near-black, gradient brand, electric.",
    tokens: {
      paper: "#14161e", paperDeep: "#0d0f15",
      ink: "#f6f7fb", inkSoft: "#d2d6e2", muted: "#a4a9bc", line: "#2a2d38",
      radius: "12px", buttonRadius: "10px", fieldRadius: "10px",
      duration: "180ms", easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      shadow: "0 18px 40px -16px rgba(110, 76, 242, 0.45)",
      fontSans: 'Inter, ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      fontSerif: 'Inter, ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      letterSpacing: "-0.02em",
    },
  },
  modern: {
    label: "Modern",
    blurb: "Crisp white, geometric sans, violet→blue accent.",
    tokens: {
      paper: "#ffffff", paperDeep: "#f5f6fa",
      ink: "#0e1018", inkSoft: "#3a3f55", muted: "#7a8094", line: "#e4e6ee",
      radius: "12px", buttonRadius: "10px", fieldRadius: "10px",
      duration: "180ms", easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      shadow: "0 14px 30px -16px rgba(70,40,200,0.18)",
      fontSans: 'Inter, ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      fontSerif: 'Inter, ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      letterSpacing: "-0.02em",
    },
  },
  editorial: {
    label: "Editorial",
    blurb: "Warm paper, ink type, generous restraint.",
    tokens: {
      paper: "#f4efe6", paperDeep: "#ebe4d6",
      ink: "#14110f", inkSoft: "#4a423b", muted: "#8a7f72", line: "#d9cfbd",
      radius: "14px", buttonRadius: "999px", fieldRadius: "12px",
      duration: "180ms", easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      shadow: "0 12px 28px -20px rgba(20,17,15,0.18)",
      fontSans: 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial',
      fontSerif: '"Instrument Serif", Georgia, serif',
      letterSpacing: "-0.01em",
    },
  },
  playful: {
    label: "Playful",
    blurb: "Bouncy springs, soft pastels, rounded everything.",
    tokens: {
      paper: "#fbf7ff", paperDeep: "#f1e9ff",
      ink: "#1c0f3d", inkSoft: "#4b3a78", muted: "#8a7eb0", line: "#e0d3f5",
      radius: "20px", buttonRadius: "999px", fieldRadius: "18px",
      duration: "260ms", easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      shadow: "0 18px 36px -18px rgba(70,40,140,0.25)",
      fontSans: 'ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      fontSerif: '"Instrument Serif", Georgia, serif',
      letterSpacing: "-0.005em",
    },
  },
  stark: {
    label: "Stark",
    blurb: "Hard edges, mono type, no apology.",
    tokens: {
      paper: "#ffffff", paperDeep: "#f0f0f0",
      ink: "#000000", inkSoft: "#1a1a1a", muted: "#666666", line: "#000000",
      radius: "0px", buttonRadius: "0px", fieldRadius: "0px",
      duration: "0ms", easing: "steps(1, end)",
      shadow: "6px 6px 0 0 #000",
      fontSans: 'ui-monospace, "JetBrains Mono", Menlo, monospace',
      fontSerif: 'ui-monospace, "JetBrains Mono", Menlo, monospace',
      letterSpacing: "0em",
    },
  },
  clinical: {
    label: "Clinical",
    blurb: "Cool grays, precise spacing, subtle motion.",
    tokens: {
      paper: "#fafbfc", paperDeep: "#f1f3f6",
      ink: "#0b1220", inkSoft: "#334155", muted: "#64748b", line: "#dde3ec",
      radius: "8px", buttonRadius: "8px", fieldRadius: "8px",
      duration: "120ms", easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      shadow: "0 4px 12px -6px rgba(15,23,42,0.12)",
      fontSans: 'ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      fontSerif: 'ui-sans-serif, system-ui, "Helvetica Neue", Arial',
      letterSpacing: "-0.005em",
    },
  },
};

/* ─────────────────────────────  prompts  ───────────────────────────── */
/* Tiny zero-dep prompts. Skip automatically if not a TTY (CI safe). */

const isInteractive = stdin.isTTY && stdout.isTTY;

async function ask(question, defaultValue = "") {
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    const hint = defaultValue ? ` ${C.dim}(${defaultValue})${C.reset}` : "";
    const answer = await rl.question(`${C.cyan}?${C.reset} ${question}${hint} `);
    return answer.trim() || defaultValue;
  } finally {
    rl.close();
  }
}

async function pickFromList(question, choices, defaultId) {
  console.log(`${C.cyan}?${C.reset} ${question}`);
  choices.forEach((c, i) => {
    const marker = c.id === defaultId ? `${C.green}●${C.reset}` : "○";
    console.log(`  ${marker} ${C.bold}${(i + 1).toString().padEnd(2)}${C.reset} ${C.cyan}${c.id.padEnd(14)}${C.reset} ${C.dim}${c.label}${c.blurb ? " — " + c.blurb : ""}${C.reset}`);
  });
  const defaultIdx = choices.findIndex((c) => c.id === defaultId) + 1;
  const raw = await ask(`  Pick a number or id`, String(defaultIdx));
  const num = Number.parseInt(raw, 10);
  if (!Number.isNaN(num) && num >= 1 && num <= choices.length) return choices[num - 1].id;
  const match = choices.find((c) => c.id === raw);
  return match ? match.id : defaultId;
}

async function confirm(question, defaultYes = true) {
  const def = defaultYes ? "Y/n" : "y/N";
  const raw = (await ask(question, def)).toLowerCase();
  if (!raw || raw === def.toLowerCase()) return defaultYes;
  return raw.startsWith("y");
}

function parseFlagValue(args, name) {
  const i = args.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (i < 0) return null;
  if (args[i].includes("=")) return args[i].split("=")[1];
  return args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : null;
}

/* parseGradient("ff8a4c,ff5e3a,b91d2e") → ["#ff8a4c","#ff5e3a","#b91d2e"]
 * Accepts 2–5 stops, with or without leading "#". */
function parseGradient(raw) {
  if (!raw) return null;
  const stops = raw
    .split(",")
    .map((s) => s.trim().replace(/^#/, ""))
    .filter(Boolean)
    .map((s) => `#${s}`);
  if (stops.length < 2 || stops.length > 5) return null;
  // Quick hex sanity check (3, 4, 6, or 8 hex digits)
  const ok = stops.every((s) => /^#[0-9a-fA-F]{3,8}$/.test(s));
  return ok ? stops : null;
}

function buildGradientCss(stops, accent) {
  if (stops && stops.length > 0) {
    // Explicit stops, evenly distributed.
    const positioned = stops.map((c, i) => `${c} ${Math.round((i / (stops.length - 1)) * 100)}%`);
    return `linear-gradient(135deg, ${positioned.join(", ")})`;
  }
  // Derived: lighter → accent → darker, auto-tunes when --ds-accent changes.
  return `linear-gradient(135deg, color-mix(in oklab, ${accent} 65%, white 35%) 0%, ${accent} 50%, color-mix(in oklab, ${accent} 75%, black 25%) 100%)`;
}

function renderThemeCss(themeId, accent = DEFAULT_ACCENT, gradientStops = null) {
  const theme = THEMES[themeId];
  if (!theme) return null;
  const t = theme.tokens;
  // When the gradient is explicit, write it as-is. When derived, reference
  // the CSS var so changing --ds-accent at runtime auto-rerenders the gradient.
  const gradient = gradientStops
    ? buildGradientCss(gradientStops, accent)
    : `linear-gradient(135deg, color-mix(in oklab, var(--ds-accent) 65%, white 35%) 0%, var(--ds-accent) 50%, color-mix(in oklab, var(--ds-accent) 75%, black 25%) 100%)`;

  return `/* disenio.studio · ${theme.label} — ${theme.blurb} */
:root {
  --ds-paper: ${t.paper};
  --ds-paper-deep: ${t.paperDeep};
  --ds-ink: ${t.ink};
  --ds-ink-soft: ${t.inkSoft};
  --ds-muted: ${t.muted};
  --ds-line: ${t.line};
  --ds-accent: ${accent};
  --ds-accent-ink: #ffffff;
  --ds-radius: ${t.radius};
  --ds-button-radius: ${t.buttonRadius};
  --ds-field-radius: ${t.fieldRadius};
  --ds-duration: ${t.duration};
  --ds-easing: ${t.easing};
  --ds-shadow: ${t.shadow};
  --ds-font-sans: ${t.fontSans};
  --ds-font-serif: ${t.fontSerif};
  --ds-letter-spacing: ${t.letterSpacing};
  --ds-brand-gradient: ${gradient};
}
`;
}

/* ─────────────────────────────  init  ───────────────────────────── */
async function commandInit(args) {
  const overwrite = args.includes("--overwrite");
  const yes = args.includes("--yes") || args.includes("-y") || args.includes("--no-interactive");
  const allFlag = args.includes("--all");
  const componentsFlag = args.includes("--components");
  const pairsFlag = args.includes("--pairs");
  const skipFlag = args.includes("--skip-install");

  let themeId = parseFlagValue(args, "theme");
  let accent = parseFlagValue(args, "accent") ?? DEFAULT_ACCENT;
  const gradientRaw = parseFlagValue(args, "gradient");
  const gradientStops = gradientRaw ? parseGradient(gradientRaw) : null;
  if (gradientRaw && !gradientStops) {
    log.err(`Invalid --gradient value. Pass 2–5 hex stops, comma-separated. Example: --gradient "ff8a4c,ff5e3a,b91d2e"`);
    process.exit(1);
  }

  if (existsSync(CONFIG_PATH) && !overwrite) {
    log.warn("disenio.json already exists. Use --overwrite to replace.");
    return;
  }

  // Decide whether to prompt: interactive TTY + no overriding flags + no --yes.
  const anyScopeFlagPassed = allFlag || componentsFlag || pairsFlag || skipFlag;
  const shouldPrompt = isInteractive && !yes && (!themeId || !anyScopeFlagPassed);

  let scope;
  if (allFlag) scope = "all";
  else if (componentsFlag) scope = "components";
  else if (pairsFlag) scope = "pairs";
  else if (skipFlag) scope = "none";

  if (shouldPrompt) {
    console.log("");
    if (!themeId) {
      themeId = await pickFromList(
        "Pick a Feel for your theme.css",
        Object.entries(THEMES).map(([id, t]) => ({ id, label: t.label, blurb: t.blurb })),
        "modernDark",
      );
      console.log("");
    }
    if (!scope) {
      scope = await pickFromList(
        "Install components now?",
        [
          { id: "all", label: "Everything", blurb: "all components + pairs" },
          { id: "components", label: "Components only", blurb: "skip pairs" },
          { id: "pairs", label: "Pairs only", blurb: "skip components" },
          { id: "none", label: "Just scaffold", blurb: "I'll add them one by one" },
        ],
        "all",
      );
      console.log("");
    }
  }

  themeId = themeId ?? "modernDark";
  scope = scope ?? "all";

  if (!THEMES[themeId]) {
    log.err(`Unknown theme: ${themeId}`);
    console.log(`  Available: ${Object.keys(THEMES).join(", ")}`);
    process.exit(1);
  }

  // Scaffold: config, util, theme, lock.
  const cfg = {
    aliases: { ui: "components/ui", lib: "lib" },
    theme: "app/styles/theme.css",
    feel: themeId,
  };
  writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2));
  log.ok("disenio.json");

  const lock = { version: REGISTRY.version, items: {} };

  for (const f of REGISTRY.shared.utils.files) {
    writeFileSafe(resolveTarget(f.path, cfg), f.content, { overwrite });
  }
  lock.items["__util_cn"] = {
    name: "cn",
    kind: "util",
    version: REGISTRY.version,
    installedAt: new Date().toISOString(),
    files: REGISTRY.shared.utils.files.map((f) => ({ path: f.path, sha: sha(f.content) })),
  };

  const themeCss = renderThemeCss(themeId, accent, gradientStops);
  writeFileSafe(resolve(CWD, cfg.theme), themeCss, { overwrite });

  // Install scope.
  if (scope !== "none") {
    const ids = [];
    if (scope === "all" || scope === "components") ids.push(...REGISTRY.components.map((c) => c.id));
    if (scope === "all" || scope === "pairs") ids.push(...(REGISTRY.pairs ?? []).map((c) => c.id));

    for (const id of ids) {
      const comp = findItem(id);
      if (!comp) continue;
      for (const f of comp.files) {
        writeFileSafe(resolveTarget(f.path, cfg), f.content, { overwrite });
      }
      recordLock(lock, comp, comp.files);
    }
    log.ok(`Installed ${ids.length} item(s) (${scope})`);
  }

  saveLock(lock);
  log.ok("disenio.lock.json");
  console.log("");
  log.info(`Theme: ${C.bold}${THEMES[themeId].label}${C.reset} ${C.dim}(switch with disenio.studio theme apply <name>)${C.reset}`);
  if (scope === "none") log.info(`Next: ${C.bold}disenio.studio add button${C.reset}`);
}

/* ─────────────────────────────  theme  ───────────────────────────── */
function commandTheme(args) {
  const sub = args[0];
  const cfg = loadConfig();

  if (sub === "list" || !sub) {
    console.log("");
    console.log(`${C.bold}Available themes${C.reset}`);
    for (const [id, t] of Object.entries(THEMES)) {
      const active = cfg?.feel === id ? `${C.green} ✓ active${C.reset}` : "";
      console.log(`  ${C.cyan}${id.padEnd(14)}${C.reset} ${C.dim}${t.label}${C.reset}${active}`);
      console.log(`  ${" ".repeat(14)} ${C.dim}${t.blurb}${C.reset}`);
    }
    return;
  }

  if (sub === "apply") {
    if (!cfg) {
      log.err("No disenio.json found. Run `disenio.studio init` first.");
      process.exit(1);
    }
    const themeId = args[1];
    const accent = parseFlagValue(args, "accent") ?? DEFAULT_ACCENT;
    const gradientRaw = parseFlagValue(args, "gradient");
    const gradientStops = gradientRaw ? parseGradient(gradientRaw) : null;
    if (gradientRaw && !gradientStops) {
      log.err(`Invalid --gradient value. Pass 2–5 hex stops, comma-separated. Example: --gradient "ff8a4c,ff5e3a,b91d2e"`);
      process.exit(1);
    }
    if (!themeId || !THEMES[themeId]) {
      log.err(`Specify a theme. Available: ${Object.keys(THEMES).join(", ")}`);
      process.exit(1);
    }
    const themeCss = renderThemeCss(themeId, accent, gradientStops);
    writeFileSync(resolve(CWD, cfg.theme), themeCss);
    cfg.feel = themeId;
    writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2));
    log.ok(`Applied ${C.bold}${THEMES[themeId].label}${C.reset} → ${cfg.theme}`);
    return;
  }

  log.err(`Unknown theme subcommand: ${sub}. Try: list, apply <name>`);
  process.exit(1);
}

/* ─────────────────────────────  add  ───────────────────────────── */
function commandAdd(args) {
  const overwrite = args.includes("--overwrite");
  const all = args.includes("--all");
  const onlyPairs = args.includes("--pairs");
  const onlyComponents = args.includes("--components");

  let ids = args.filter((a) => !a.startsWith("--"));
  if (all || onlyPairs || onlyComponents) {
    const pool = [];
    if (all || onlyComponents) pool.push(...REGISTRY.components.map((c) => c.id));
    if (all || onlyPairs) pool.push(...(REGISTRY.pairs ?? []).map((c) => c.id));
    ids = [...new Set([...ids, ...pool])];
    log.info(`installing ${C.bold}${ids.length}${C.reset} item(s) from the registry`);
  }
  if (ids.length === 0) {
    log.err("Specify at least one id, or use --all / --components / --pairs.");
    process.exit(1);
  }
  const cfg = loadConfig() ?? { aliases: { ui: "components/ui", lib: "lib" } };
  const lock = loadLock();
  lock.version ??= REGISTRY.version;
  lock.items ??= {};

  for (const id of ids) {
    const comp = findItem(id);
    if (!comp) {
      log.err(`Unknown id: ${id}`);
      console.log(`  Components: ${REGISTRY.components.map((c) => c.id).join(", ")}`);
      if (REGISTRY.pairs?.length) console.log(`  Pairs:      ${REGISTRY.pairs.map((c) => c.id).join(", ")}`);
      continue;
    }
    log.info(`adding ${C.bold}${comp.name}${C.reset}${comp.kind === "pair" ? C.dim + " (pair)" + C.reset : ""}`);

    for (const dep of comp.deps) {
      if (dep === "utils/cn") {
        for (const f of REGISTRY.shared.utils.files) {
          writeFileSafe(resolveTarget(f.path, cfg), f.content, { overwrite });
        }
      }
    }
    for (const f of comp.files) {
      writeFileSafe(resolveTarget(f.path, cfg), f.content, { overwrite });
    }
    recordLock(lock, comp, comp.files);
  }
  saveLock(lock);
}

/* ─────────────────────────────  diff  ───────────────────────────── */
function classify({ disk, locked, upstream }) {
  // Returns one of: "missing" | "in-sync" | "local-edit" | "upstream-update" | "both"
  if (disk === null) return "missing";
  const localEdited = disk !== locked;
  const upstreamChanged = locked !== upstream;
  if (!localEdited && !upstreamChanged) return "in-sync";
  if (localEdited && !upstreamChanged) return "local-edit";
  if (!localEdited && upstreamChanged) return "upstream-update";
  return "both";
}

function commandDiff(args) {
  const ids = args.filter((a) => !a.startsWith("--"));
  const cfg = loadConfig();
  const lock = loadLock();

  if (!cfg) {
    log.err("No disenio.json found. Run `disenio.studio init` first.");
    process.exit(1);
  }

  const targetIds = ids.length > 0 ? ids : Object.keys(lock.items).filter((id) => !id.startsWith("__"));

  let any = false;
  for (const id of targetIds) {
    const item = lock.items[id];
    if (!item) {
      log.warn(`${id} — not in lockfile (was it ever added?)`);
      continue;
    }
    const comp = findItem(id);
    if (!comp) {
      log.warn(`${id} — no longer in registry`);
      continue;
    }

    for (const file of comp.files) {
      const upstream = sha(file.content);
      const lockedFile = item.files.find((f) => f.path === file.path);
      const lockedSha = lockedFile?.sha ?? "missing";
      const abs = resolveTarget(file.path, cfg);
      const diskSha = existsSync(abs) ? sha(readFileSync(abs, "utf8")) : null;

      const state = classify({ disk: diskSha, locked: lockedSha, upstream });
      if (state === "in-sync") continue;
      any = true;

      const tag =
        state === "local-edit" ? `${C.yellow}local-edit     ${C.reset}` :
        state === "upstream-update" ? `${C.cyan}upstream-update${C.reset}` :
        state === "both" ? `${C.magenta}both           ${C.reset}` :
        `${C.red}missing        ${C.reset}`;

      console.log(`  ${tag} ${C.bold}${id}${C.reset} ${C.dim}${file.path}${C.reset}`);
      if (state === "local-edit" || state === "both") {
        console.log(`    ${C.dim}local sha:    ${diskSha?.slice(0, 8)} (modified since install)${C.reset}`);
      }
      if (state === "upstream-update" || state === "both") {
        console.log(`    ${C.dim}upstream sha: ${upstream.slice(0, 8)} (newer than your install)${C.reset}`);
      }
    }
  }
  if (!any) log.ok("Everything is in sync.");
}

/* ─────────────────────────────  update  ───────────────────────────── */
function commandUpdate(args) {
  const force = args.includes("--force");
  const ids = args.filter((a) => !a.startsWith("--"));
  const cfg = loadConfig();
  const lock = loadLock();

  if (!cfg) {
    log.err("No disenio.json found. Run `disenio.studio init` first.");
    process.exit(1);
  }

  const targetIds = ids.length > 0 ? ids : Object.keys(lock.items).filter((id) => !id.startsWith("__"));

  let updated = 0;
  let blocked = 0;

  for (const id of targetIds) {
    const item = lock.items[id];
    if (!item) {
      log.warn(`${id} — not in lockfile, skipping`);
      continue;
    }
    const comp = findItem(id);
    if (!comp) {
      log.warn(`${id} — no longer in registry`);
      continue;
    }

    for (const file of comp.files) {
      const upstream = sha(file.content);
      const lockedSha = item.files.find((f) => f.path === file.path)?.sha ?? "missing";
      const abs = resolveTarget(file.path, cfg);
      const diskSha = existsSync(abs) ? sha(readFileSync(abs, "utf8")) : null;

      const state = classify({ disk: diskSha, locked: lockedSha, upstream });

      if (state === "in-sync") continue;
      if (state === "local-edit" && !force) {
        log.warn(`${id} — locally edited; upstream unchanged. Pass --force to overwrite.`);
        blocked++;
        continue;
      }
      if (state === "both" && !force) {
        log.warn(`${id} — locally edited AND upstream changed. Use --force to overwrite (you'll lose your edits) or run \`disenio.studio diff ${id}\`.`);
        blocked++;
        continue;
      }
      // upstream-update or missing or forced both
      mkdirSync(dirname(abs), { recursive: true });
      writeFileSync(abs, file.content);
      log.ok(`updated ${rel(abs)}`);
      updated++;
    }
    recordLock(lock, comp, comp.files);
  }
  saveLock(lock);
  if (updated > 0) log.info(`${updated} file(s) updated.`);
  if (blocked > 0) log.warn(`${blocked} file(s) blocked. Resolve manually or pass --force.`);
  if (updated === 0 && blocked === 0) log.ok("Nothing to update.");
}

/* ─────────────────────────────  list / help  ───────────────────────────── */
function commandList() {
  log.brand();
  console.log("");
  console.log(`${C.bold}Components${C.reset} (${REGISTRY.components.length})`);
  for (const c of REGISTRY.components) {
    console.log(`  ${C.cyan}${c.id.padEnd(14)}${C.reset} ${C.dim}${c.name}${C.reset}`);
  }
  if (REGISTRY.pairs?.length) {
    console.log("");
    console.log(`${C.bold}Pairs${C.reset} (${REGISTRY.pairs.length})`);
    for (const c of REGISTRY.pairs) {
      console.log(`  ${C.magenta}${c.id.padEnd(14)}${C.reset} ${C.dim}${c.name}${C.reset}`);
    }
  }
}

function commandHelp() {
  log.brand();
  console.log("");
  console.log(`${C.bold}Usage${C.reset}`);
  console.log(`  disenio.studio init                ${C.dim}# scaffold disenio.json + utils + theme${C.reset}`);
  console.log(`  disenio.studio init --theme stark  ${C.dim}# init with a specific Feel${C.reset}`);
  console.log(`  disenio.studio add <id...>         ${C.dim}# copy components into your repo${C.reset}`);
  console.log(`  disenio.studio add --all           ${C.dim}# install every component and pair${C.reset}`);
  console.log(`  disenio.studio theme list          ${C.dim}# list available Feels${C.reset}`);
  console.log(`  disenio.studio theme apply <name>  ${C.dim}# switch your theme.css to a different Feel${C.reset}`);
  console.log(`  disenio.studio diff [id...]        ${C.dim}# show what changed locally vs upstream${C.reset}`);
  console.log(`  disenio.studio update [id...]      ${C.dim}# pull latest upstream into your repo${C.reset}`);
  console.log(`  disenio.studio list                ${C.dim}# list available components${C.reset}`);
  console.log("");
  console.log(`${C.bold}Flags${C.reset}`);
  console.log(`  --yes, -y                   ${C.dim}# init: skip prompts, use defaults (CI safe)${C.reset}`);
  console.log(`  --theme <name>              ${C.dim}# init/theme: pick a Feel (modernDark, modern, …)${C.reset}`);
  console.log(`  --accent <hex>              ${C.dim}# init/theme: override accent color${C.reset}`);
  console.log(`  --gradient <hex,hex,...>    ${C.dim}# init/theme: explicit brand gradient stops (2–5)${C.reset}`);
  console.log(`  --all                       ${C.dim}# init/add: install everything${C.reset}`);
  console.log(`  --components                ${C.dim}# init/add: install all components (no pairs)${C.reset}`);
  console.log(`  --pairs                     ${C.dim}# init/add: install all pairs${C.reset}`);
  console.log(`  --skip-install              ${C.dim}# init: just scaffold, don't add components${C.reset}`);
  console.log(`  --overwrite                 ${C.dim}# add/init: replace existing files${C.reset}`);
  console.log(`  --force                     ${C.dim}# update: overwrite even if locally edited${C.reset}`);
}

const [, , cmd, ...rest] = process.argv;

async function main() {
  switch (cmd) {
    case "init":   log.brand(); console.log(""); await commandInit(rest); break;
    case "add":    log.brand(); console.log(""); commandAdd(rest); break;
    case "diff":   log.brand(); console.log(""); commandDiff(rest); break;
    case "update": log.brand(); console.log(""); commandUpdate(rest); break;
    case "theme":  log.brand(); commandTheme(rest); break;
    case "list":
    case "ls":     commandList(); break;
    case "--help":
    case "-h":
    case "help":
    case undefined: commandHelp(); break;
    default:
      log.err(`Unknown command: ${cmd}`);
      commandHelp();
      process.exit(1);
  }
}

main().catch((err) => {
  log.err(err?.message ?? String(err));
  process.exit(1);
});
