"use client";
import { useState, type ReactNode } from "react";
import { CopyButton } from "./CopyButton";

interface PreviewProps {
  children: ReactNode;
  code: string;
  highlightedCode: string;
}

export function Preview({ children, code, highlightedCode }: PreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  return (
    <div className="surface overflow-hidden">
      <div className="flex items-center justify-between px-2 h-11 border-b hairline">
        <div className="flex items-center gap-1 p-1">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-3 h-7 rounded-md text-xs font-medium uppercase tracking-wider transition-colors"
              style={{
                background: tab === t ? "var(--ds-paper-deep)" : "transparent",
                color: tab === t ? "var(--ds-ink)" : "var(--ds-muted)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "code" && <CopyButton text={code} />}
      </div>
      {tab === "preview" ? (
        <div className="p-8 min-h-[200px] flex items-center justify-center bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--ds-ink)_8%,transparent)_1px,transparent_0)] [background-size:18px_18px]">
          <div className="flex flex-wrap items-center justify-center gap-3 w-full">{children}</div>
        </div>
      ) : (
        <div
          className="px-4 py-4 text-[12.5px] leading-relaxed mono overflow-x-auto [&_pre]:bg-transparent [&_code]:bg-transparent"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      )}
    </div>
  );
}
