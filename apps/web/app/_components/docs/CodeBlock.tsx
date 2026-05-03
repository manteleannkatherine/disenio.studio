import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  hideCopy?: boolean;
}

export async function CodeBlock({ code, lang = "tsx", filename, hideCopy }: CodeBlockProps) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light-default", dark: "github-dark-default" },
    defaultColor: false,
  });

  return (
    <div className="surface overflow-hidden">
      {(filename || !hideCopy) && (
        <div className="flex items-center justify-between px-4 h-10 border-b hairline">
          <div className="flex items-center gap-2 min-w-0">
            <span className="size-2 rounded-full bg-[var(--ds-accent)] shrink-0" />
            <span className="mono text-xs text-[var(--ds-ink-soft)] truncate">{filename ?? lang}</span>
          </div>
          {!hideCopy && <CopyButton text={code.trim()} />}
        </div>
      )}
      <div
        className="px-4 py-4 text-[12.5px] leading-relaxed mono overflow-x-auto [&_pre]:bg-transparent [&_pre]:!bg-transparent [&_code]:bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
