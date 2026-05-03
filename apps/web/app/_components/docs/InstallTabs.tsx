"use client";
import { useState } from "react";
import { CopyButton } from "./CopyButton";

const MGRS = [
  { id: "pnpm", label: "pnpm", prefix: "pnpm dlx" },
  { id: "npm", label: "npm", prefix: "npx" },
  { id: "yarn", label: "yarn", prefix: "yarn dlx" },
  { id: "bun", label: "bun", prefix: "bunx" },
] as const;

type Mgr = (typeof MGRS)[number]["id"];

export function InstallTabs({ command }: { command: string }) {
  const [active, setActive] = useState<Mgr>("pnpm");
  const prefix = MGRS.find((m) => m.id === active)!.prefix;
  const fullCmd = `${prefix} ${command}`;

  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center justify-between px-2 h-11 border-b hairline">
        <div className="flex items-center gap-1 p-1">
          {MGRS.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className="px-3 h-7 rounded-md text-xs font-medium transition-colors"
              style={{
                background: active === m.id ? "var(--ds-paper-deep)" : "transparent",
                color: active === m.id ? "var(--ds-ink)" : "var(--ds-muted)",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
        <CopyButton text={fullCmd} />
      </div>
      <pre className="px-4 py-3.5 text-[13px] mono overflow-x-auto text-[var(--ds-ink)]">
        <span className="text-[var(--ds-muted)] mr-2">$</span>
        {fullCmd}
      </pre>
    </div>
  );
}
