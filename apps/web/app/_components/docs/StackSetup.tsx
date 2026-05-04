"use client";
import { useState } from "react";
import { CopyButton } from "./CopyButton";

interface Step {
  title: string;
  body?: string;
  cmd?: string;
  lang?: string;
  file?: string;
  code?: string;
  note?: string;
}

interface Stack {
  id: string;
  label: string;
  blurb: string;
  steps: Step[];
}

const STACKS: Stack[] = [
  {
    id: "nextjs",
    label: "Next.js",
    blurb: "App Router, React 19, Tailwind v4. The recommended stack.",
    steps: [
      {
        title: "1. Create a Next.js project",
        body: "Skip if you have one already.",
        cmd: "npx create-next-app@latest my-app --typescript --tailwind --app --use-npm --yes",
      },
      {
        title: "2. Initialize disenio.io",
        body: "Drops disenio.json, the cn util, and a starter theme.css.",
        cmd: "cd my-app && npx disenio init",
      },
      {
        title: "3. Add the components you need",
        cmd: "npx disenio add button input form-field stack",
      },
      {
        title: "4. Wire the theme into globals",
        file: "app/globals.css",
        lang: "css",
        code: `@import "tailwindcss";
@import "../app/styles/theme.css";`,
      },
      {
        title: "5. Wrap your app with ThemeProvider",
        file: "app/layout.tsx",
        lang: "tsx",
        code: `import { ThemeProvider } from "@/components/ui/theme-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body><ThemeProvider>{children}</ThemeProvider></body>
    </html>
  );
}`,
      },
      {
        title: "6. Use a component",
        file: "app/page.tsx",
        lang: "tsx",
        code: `import { Button } from "@/components/ui/button";

export default function Home() {
  return <Button variant="accent">Hola</Button>;
}`,
      },
    ],
  },
  {
    id: "vite",
    label: "Vite (React)",
    blurb: "Vite + React + TypeScript + Tailwind v4.",
    steps: [
      {
        title: "1. Create a Vite project",
        cmd: "npm create vite@latest my-app -- --template react-ts && cd my-app && npm install",
      },
      {
        title: "2. Install Tailwind v4",
        cmd: "npm install tailwindcss @tailwindcss/vite",
      },
      {
        title: "3. Wire the Vite plugin",
        file: "vite.config.ts",
        lang: "ts",
        code: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`,
      },
      {
        title: "4. Initialize disenio.io",
        cmd: "npx disenio init",
      },
      {
        title: "5. Update tsconfig for the @/ alias",
        file: "tsconfig.json",
        lang: "json",
        code: `{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}`,
        note: "And install vite-tsconfig-paths if Vite doesn't auto-resolve aliases:",
      },
      {
        title: "6. Add components and wire CSS",
        cmd: "npx disenio add button input",
        note: "Then import @/styles/theme.css from src/main.tsx alongside index.css.",
      },
    ],
  },
  {
    id: "astro",
    label: "Astro",
    blurb: "Astro + React islands + Tailwind v4.",
    steps: [
      {
        title: "1. Create an Astro project",
        cmd: "npm create astro@latest my-app -- --template basics --yes && cd my-app",
      },
      {
        title: "2. Add React + Tailwind",
        cmd: "npx astro add react tailwind --yes",
      },
      {
        title: "3. Initialize disenio.io",
        cmd: "npx disenio init",
      },
      {
        title: "4. Add components",
        cmd: "npx disenio add button input",
      },
      {
        title: "5. Use them in an island",
        file: "src/pages/index.astro",
        lang: "astro",
        code: `---
import { Button } from "@/components/ui/button";
---
<Button client:load variant="accent">Hola</Button>`,
        note: "Use client:load (or another client directive) so React components hydrate.",
      },
    ],
  },
  {
    id: "remix",
    label: "Remix",
    blurb: "Remix Vite + Tailwind v4.",
    steps: [
      {
        title: "1. Create a Remix app",
        cmd: "npx create-remix@latest my-app --no-install --yes && cd my-app && npm install",
      },
      {
        title: "2. Install Tailwind v4 + Vite plugin",
        cmd: "npm install tailwindcss @tailwindcss/vite",
      },
      {
        title: "3. Add the plugin to vite.config",
        file: "vite.config.ts",
        lang: "ts",
        code: `import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({ plugins: [remix(), tailwindcss()] });`,
      },
      {
        title: "4. Initialize disenio.io",
        cmd: "npx disenio init",
      },
      {
        title: "5. Add components",
        cmd: "npx disenio add button form-field",
      },
    ],
  },
  {
    id: "tanstack",
    label: "TanStack Start",
    blurb: "TanStack Start + React + Tailwind v4.",
    steps: [
      {
        title: "1. Bootstrap a TanStack Start app",
        cmd: "npm create @tanstack/start@latest my-app && cd my-app && npm install",
      },
      {
        title: "2. Install Tailwind v4",
        cmd: "npm install tailwindcss @tailwindcss/vite",
      },
      {
        title: "3. Initialize disenio.io",
        cmd: "npx disenio init",
      },
      {
        title: "4. Add components",
        cmd: "npx disenio add button input",
      },
    ],
  },
];

export function StackSetup() {
  const [active, setActive] = useState<string>("nextjs");
  const stack = STACKS.find((s) => s.id === active)!;

  return (
    <div className="flex flex-col gap-6">
      {/* Stack picker */}
      <div className="flex items-center gap-2 flex-wrap">
        {STACKS.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className="h-9 px-4 rounded-full border text-sm font-medium transition-all"
              style={{
                background: isActive ? "var(--ds-brand-gradient)" : "var(--ds-paper)",
                color: isActive ? "white" : "var(--ds-ink-soft)",
                borderColor: isActive ? "transparent" : "var(--ds-line)",
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-[var(--ds-ink-soft)]">{stack.blurb}</p>

      {/* Steps */}
      <ol className="flex flex-col gap-5">
        {stack.steps.map((step) => (
          <li key={step.title} className="flex flex-col gap-2.5">
            <div className="font-semibold text-[var(--ds-ink)]">{step.title}</div>
            {step.body && <div className="text-sm text-[var(--ds-ink-soft)]">{step.body}</div>}
            {step.cmd && <CommandRow cmd={step.cmd} />}
            {step.code && <CodeRow code={step.code} file={step.file} lang={step.lang ?? "tsx"} />}
            {step.note && <div className="text-xs text-[var(--ds-muted)] italic">{step.note}</div>}
          </li>
        ))}
      </ol>
    </div>
  );
}

function CommandRow({ cmd }: { cmd: string }) {
  return (
    <div className="surface flex items-center justify-between gap-3 px-4 py-3">
      <code className="mono text-[13px] text-[var(--ds-ink)] truncate">
        <span className="text-[var(--ds-muted)] mr-2">$</span>
        {cmd}
      </code>
      <CopyButton text={cmd} />
    </div>
  );
}

function CodeRow({ code, file, lang }: { code: string; file?: string; lang: string }) {
  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center justify-between px-4 h-10 border-b hairline">
        <span className="mono text-xs text-[var(--ds-ink-soft)]">{file ?? lang}</span>
        <CopyButton text={code} />
      </div>
      <pre className="px-4 py-3 mono text-[12.5px] leading-relaxed overflow-x-auto text-[var(--ds-ink)]">{code}</pre>
    </div>
  );
}
