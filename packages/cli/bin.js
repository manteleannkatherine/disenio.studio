#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REGISTRY = JSON.parse(readFileSync(join(__dirname, "registry.json"), "utf8"));
const CWD = process.cwd();

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

function loadConfig() {
  const path = join(CWD, "disenio.json");
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeFileSafe(absPath, content, { overwrite }) {
  if (existsSync(absPath) && !overwrite) {
    log.warn(`exists, skipped — ${absPath.replace(CWD + "/", "")} (use --overwrite)`);
    return false;
  }
  mkdirSync(dirname(absPath), { recursive: true });
  writeFileSync(absPath, content);
  log.ok(absPath.replace(CWD + "/", ""));
  return true;
}

function resolveTarget(filePath, config) {
  // map registry filePath ("components/ui/button.tsx") → user's project layout
  const aliases = config?.aliases ?? { ui: "components/ui", lib: "lib" };
  if (filePath.startsWith("components/ui/")) {
    return resolve(CWD, aliases.ui, filePath.replace("components/ui/", ""));
  }
  if (filePath.startsWith("lib/")) {
    return resolve(CWD, aliases.lib, filePath.replace("lib/", ""));
  }
  return resolve(CWD, filePath);
}

function commandInit(args) {
  const overwrite = args.includes("--overwrite");
  if (existsSync(join(CWD, "disenio.json")) && !overwrite) {
    log.warn("disenio.json already exists. Use --overwrite to replace.");
    return;
  }
  const cfg = {
    $schema: "https://disenio.io/config.schema.json",
    aliases: { ui: "components/ui", lib: "lib" },
    theme: "app/styles/theme.css",
  };
  writeFileSync(join(CWD, "disenio.json"), JSON.stringify(cfg, null, 2));
  log.ok("disenio.json");

  // Drop the cn util
  for (const f of REGISTRY.shared.utils.files) {
    writeFileSafe(resolveTarget(f.path, cfg), f.content, { overwrite });
  }

  // Drop a starter theme
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

  console.log("");
  log.info(`Next: ${C.bold}disenio add button${C.reset}`);
}

function commandAdd(args) {
  const overwrite = args.includes("--overwrite");
  const ids = args.filter((a) => !a.startsWith("--"));
  if (ids.length === 0) {
    log.err("Specify at least one component. Try: disenio add button input");
    process.exit(1);
  }

  const cfg = loadConfig() ?? { aliases: { ui: "components/ui", lib: "lib" } };

  for (const id of ids) {
    const comp = REGISTRY.components.find((c) => c.id === id);
    if (!comp) {
      log.err(`Unknown component: ${id}`);
      console.log(`  Available: ${REGISTRY.components.map((c) => c.id).join(", ")}`);
      continue;
    }
    log.info(`adding ${C.bold}${comp.name}${C.reset}`);

    // copy shared deps first
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
  }
}

function commandList() {
  log.brand();
  console.log("");
  console.log(`${C.bold}Components${C.reset} (${REGISTRY.components.length})`);
  for (const c of REGISTRY.components) {
    console.log(`  ${C.cyan}${c.id.padEnd(12)}${C.reset} ${C.dim}${c.name}${C.reset}`);
  }
}

function commandHelp() {
  log.brand();
  console.log("");
  console.log(`${C.bold}Usage${C.reset}`);
  console.log(`  disenio init              ${C.dim}# scaffold disenio.json + utils + starter theme${C.reset}`);
  console.log(`  disenio add <id...>       ${C.dim}# copy components into your repo${C.reset}`);
  console.log(`  disenio list              ${C.dim}# list available components${C.reset}`);
  console.log(`  disenio --help            ${C.dim}# this${C.reset}`);
  console.log("");
  console.log(`${C.bold}Flags${C.reset}`);
  console.log(`  --overwrite               ${C.dim}# replace existing files${C.reset}`);
}

const [, , cmd, ...rest] = process.argv;

switch (cmd) {
  case "init":
    log.brand(); console.log("");
    commandInit(rest); break;
  case "add":
    log.brand(); console.log("");
    commandAdd(rest); break;
  case "list":
  case "ls":
    commandList(); break;
  case "--help":
  case "-h":
  case "help":
  case undefined:
    commandHelp(); break;
  default:
    log.err(`Unknown command: ${cmd}`);
    commandHelp();
    process.exit(1);
}
