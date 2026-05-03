"use client";
import { Button, useToast } from "@disenio/ui";

export function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" onClick={() => toast({ title: "Saved", description: "Your changes were saved." })}>
        Show toast
      </Button>
      <Button size="sm" variant="accent" onClick={() => toast({ title: "Welcome", tone: "accent" })}>
        Accent toast
      </Button>
      <Button size="sm" variant="outline" onClick={() => toast({ title: "Could not save", description: "Try again.", tone: "danger" })}>
        Danger toast
      </Button>
    </div>
  );
}
