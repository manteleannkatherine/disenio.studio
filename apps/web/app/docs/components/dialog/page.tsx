import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";
import { DialogDemo } from "./_demo";

const SNIPPETS = {
  basic: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="accent">Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete project</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogBody>
      Are you sure?
    </DialogBody>
    <DialogFooter>
      <DialogClose asChild><Button variant="ghost" size="sm">Cancel</Button></DialogClose>
      <Button variant="accent" size="sm">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  usage: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter, DialogClose } from "@/components/ui/dialog";`,
};

export default async function DialogPage() {
  const [hBasic, hUsage] = await Promise.all([highlight(SNIPPETS.basic), highlight(SNIPPETS.usage)]);
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader eyebrow="Components" title="Dialog" description="Modal overlay anchored to the viewport. Closes on Escape or backdrop click. Locks body scroll." badge="primitive" />
      <Preview code={SNIPPETS.basic} highlightedCode={hBasic}>
        <DialogDemo />
      </Preview>
      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio.studio add dialog" />
      </section>
      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>
      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">API</h2>
        <PropsTable
          rows={[
            { name: "Dialog.open", type: "boolean", description: "Controlled open state." },
            { name: "Dialog.defaultOpen", type: "boolean", default: "false", description: "Uncontrolled initial state." },
            { name: "Dialog.onOpenChange", type: "(v: boolean) => void", description: "Fires when open state changes." },
            { name: "DialogTrigger.asChild", type: "boolean", description: "Use the child as the trigger element instead of wrapping." },
            { name: "DialogClose.asChild", type: "boolean", description: "Same pattern for the close action." },
          ]}
        />
      </section>
    </article>
  );
}
