#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..", "..", "..");
const componentsDir = join(repoRoot, "packages", "disenio", "src", "components");
const pairsDir = join(repoRoot, "packages", "disenio", "src", "pairs");
const themeDir = join(repoRoot, "packages", "disenio", "src", "theme");
const utilsDir = join(repoRoot, "packages", "disenio", "src", "utils");

function readRel(absPath) {
  return readFileSync(absPath, "utf8");
}

// Rewrite the package's internal relative imports to user-facing path aliases.
function transformComponent(src) {
  return src.replaceAll(/from\s+["']\.\.\/utils\/cn["']/g, 'from "@/lib/cn"');
}

const META = {
  Button: { id: "button", deps: ["utils/cn"], primitive: true },
  Input: { id: "input", deps: ["utils/cn"], primitive: true },
  Textarea: { id: "textarea", deps: ["utils/cn"], primitive: true },
  Badge: { id: "badge", deps: ["utils/cn"], primitive: true },
  Card: { id: "card", deps: ["utils/cn"], primitive: true },
  Switch: { id: "switch", deps: ["utils/cn"], primitive: true },
  Tabs: { id: "tabs", deps: ["utils/cn"], primitive: true },
  Toast: { id: "toast", deps: ["utils/cn"], primitive: true },
  Dialog: { id: "dialog", deps: ["utils/cn"], primitive: true },
  Select: { id: "select", deps: ["utils/cn"], primitive: true },
  Layout: { id: "layout", deps: ["utils/cn"], primitive: true },
};

const PAIR_META = {
  FormField: { id: "form-field", deps: ["utils/cn"] },
  Toolbar: { id: "toolbar", deps: ["utils/cn"] },
  EmptyState: { id: "empty-state", deps: ["utils/cn"] },
  StatCard: { id: "stat-card", deps: ["utils/cn"] },
};

const components = [];
for (const file of readdirSync(componentsDir)) {
  if (!file.endsWith(".tsx")) continue;
  const name = basename(file, ".tsx");
  const meta = META[name];
  if (!meta) continue;
  components.push({
    id: meta.id,
    name,
    kind: "component",
    deps: meta.deps,
    files: [
      {
        path: `components/ui/${meta.id}.tsx`,
        content: transformComponent(readRel(join(componentsDir, file))),
      },
    ],
  });
}

const pairs = [];
for (const file of readdirSync(pairsDir)) {
  if (!file.endsWith(".tsx")) continue;
  const name = basename(file, ".tsx");
  const meta = PAIR_META[name];
  if (!meta) continue;
  pairs.push({
    id: meta.id,
    name,
    kind: "pair",
    deps: meta.deps,
    files: [
      {
        path: `components/ui/${meta.id}.tsx`,
        content: transformComponent(readRel(join(pairsDir, file))),
      },
    ],
  });
}

const utils = {
  id: "utils/cn",
  files: [
    {
      path: "lib/cn.ts",
      content: readRel(join(utilsDir, "cn.ts")),
    },
  ],
};

const theme = {
  id: "theme",
  files: [
    {
      path: "components/ui/theme-provider.tsx",
      content: readRel(join(themeDir, "ThemeProvider.tsx")),
    },
  ],
};

const registry = {
  $schema: "https://disenio.io/registry.schema.json",
  version: "0.2.0",
  components: components.toSorted((a, b) => a.id.localeCompare(b.id)),
  pairs: pairs.toSorted((a, b) => a.id.localeCompare(b.id)),
  shared: { utils, theme },
};

const out = join(__dirname, "..", "registry.json");
writeFileSync(out, JSON.stringify(registry, null, 2));
console.log(`Wrote ${components.length} components + ${pairs.length} pairs → ${out}`);
