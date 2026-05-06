"use client";
import * as React from "react";
import { Button, useToast } from "@disenio/ui";

export function CopyPromptButton({ prompt }: { prompt: string }) {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      toast({
        title: "Prompt copied",
        description: "Paste into your AI assistant.",
        tone: "accent",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Couldn't copy",
        description: "Select the text and copy manually.",
        tone: "danger",
      });
    }
  }

  return (
    <Button onClick={handleCopy} variant="outline">
      {copied ? "Copied ✓" : "Copy prompt"}
    </Button>
  );
}
