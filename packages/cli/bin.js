#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

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
  brand: () => console.log(`${C.bold}${C.magenta}disenio${C.reset} ${C.dim}v${REGISTRY.version}${C.reset}`),
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

/* ─────────────────────────────  init  ───────────────────────────── */
function commandInit(args) {
  const overwrite = args.includes("--overwrite");
  if (existsSync(CONFIG_PATH) && !overwrite) {
    log.warn("disenio.json already exists. Use --overwrite to replace.");
    return;
  }
  const cfg = {
    aliases: { ui: "components/ui", lib: "lib" },
    theme: "app/styles/theme.css",
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

  const starterTheme = `:root {
  --ds-paper: #000000;
  --ds-paper-deep: #0c0d12;
  --ds-ink: #f6f7fb;
  --ds-ink-soft: #b8bdcd;
  --ds-muted: #6b7186;
  --ds-line: #1c1e28;
  --ds-accent: #6d4cf2;
  --ds-accent-ink: #ffffff;
  --ds-radius: 12px;
  --ds-button-radius: 10px;
  --ds-field-radius: 10px;
  --ds-duration: 180ms;
  --ds-easing: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ds-shadow: 0 18px 40px -16px rgba(110, 76, 242, 0.45);
}
`;
  writeFileSafe(resolve(CWD, cfg.theme), starterTheme, { overwrite });

  saveLock(lock);
  log.ok("disenio.lock.json");
  console.log("");
  log.info(`Next: ${C.bold}disenio add button${C.reset}`);
}

/* ─────────────────────────────  add  ───────────────────────────── */
function commandAdd(args) {
  const overwrite = args.includes("--overwrite");
  const ids = args.filter((a) => !a.startsWith("--"));
  if (ids.length === 0) {
    log.err("Specify at least one id. Try: disenio add button input");
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
    log.err("No disenio.json found. Run `disenio init` first.");
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
    log.err("No disenio.json found. Run `disenio init` first.");
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
        log.warn(`${id} — locally edited AND upstream changed. Use --force to overwrite (you'll lose your edits) or run \`disenio diff ${id}\`.`);
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
  console.log(`  disenio init                ${C.dim}# scaffold disenio.json + utils + theme${C.reset}`);
  console.log(`  disenio add <id...>         ${C.dim}# copy components into your repo${C.reset}`);
  console.log(`  disenio diff [id...]        ${C.dim}# show what changed locally vs upstream${C.reset}`);
  console.log(`  disenio update [id...]      ${C.dim}# pull latest upstream into your repo${C.reset}`);
  console.log(`  disenio list                ${C.dim}# list available components${C.reset}`);
  console.log("");
  console.log(`${C.bold}Flags${C.reset}`);
  console.log(`  --overwrite                 ${C.dim}# add/init: replace existing files${C.reset}`);
  console.log(`  --force                     ${C.dim}# update: overwrite even if locally edited${C.reset}`);
}

const [, , cmd, ...rest] = process.argv;

switch (cmd) {
  case "init":   log.brand(); console.log(""); commandInit(rest); break;
  case "add":    log.brand(); console.log(""); commandAdd(rest); break;
  case "diff":   log.brand(); console.log(""); commandDiff(rest); break;
  case "update": log.brand(); console.log(""); commandUpdate(rest); break;
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
