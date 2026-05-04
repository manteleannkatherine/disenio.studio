import { Avatar, AvatarGroup } from "@disenio/ui";
import { PageHeader } from "../../../_components/docs/PageHeader";
import { Preview } from "../../../_components/docs/Preview";
import { CodeBlock } from "../../../_components/docs/CodeBlock";
import { InstallTabs } from "../../../_components/docs/InstallTabs";
import { PropsTable } from "../../../_components/docs/PropsTable";
import { highlight } from "../../../_components/docs/highlight";

const SNIPPETS = {
  sizes: `<Avatar name="Ana Mantel" size="xs" fake />
<Avatar name="Ana Mantel" size="sm" fake />
<Avatar name="Ana Mantel" size="md" fake />
<Avatar name="Ana Mantel" size="lg" fake />
<Avatar name="Ana Mantel" size="xl" fake />`,
  status: `<Avatar name="Ana" fake status="online" />
<Avatar name="Bo"  fake status="busy" />
<Avatar name="Cam" fake status="away" />`,
  group: `<AvatarGroup max={3}>
  <Avatar name="Ana" fake />
  <Avatar name="Bo"  fake />
  <Avatar name="Cam" fake />
  <Avatar name="Dee" fake />
  <Avatar name="Eva" fake />
</AvatarGroup>`,
  usage: `import { Avatar, AvatarGroup } from "@/components/ui/avatar";`,
};

export default async function AvatarPage() {
  const [hSizes, hStatus, hGroup, hUsage] = await Promise.all([
    highlight(SNIPPETS.sizes), highlight(SNIPPETS.status), highlight(SNIPPETS.group), highlight(SNIPPETS.usage),
  ]);
  return (
    <article className="flex flex-col gap-10 max-w-3xl pb-24">
      <PageHeader eyebrow="Components" title="Avatar" description="Image with fallback initials, deterministic gradient, status dot, and a group with overflow." badge="primitive" />
      <Preview code={SNIPPETS.sizes} highlightedCode={hSizes}>
        <Avatar name="Ana Mantel" size="xs" fake />
        <Avatar name="Ana Mantel" size="sm" fake />
        <Avatar name="Ana Mantel" size="md" fake />
        <Avatar name="Ana Mantel" size="lg" fake />
        <Avatar name="Ana Mantel" size="xl" fake />
      </Preview>
      <section id="install" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Installation</h2>
        <InstallTabs command="disenio add avatar" />
      </section>
      <section id="usage" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Usage</h2>
        <CodeBlock filename="example.tsx" code={SNIPPETS.usage} />
      </section>
      <section id="status" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Status</h2>
        <Preview code={SNIPPETS.status} highlightedCode={hStatus}>
          <Avatar name="Ana" fake status="online" />
          <Avatar name="Bo" fake status="busy" />
          <Avatar name="Cam" fake status="away" />
          <Avatar name="Dee" fake status="offline" />
        </Preview>
      </section>
      <section id="group" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">Group</h2>
        <Preview code={SNIPPETS.group} highlightedCode={hGroup}>
          <AvatarGroup max={3}>
            <Avatar name="Ana" fake />
            <Avatar name="Bo" fake />
            <Avatar name="Cam" fake />
            <Avatar name="Dee" fake />
            <Avatar name="Eva" fake />
          </AvatarGroup>
        </Preview>
      </section>
      <section id="api" className="flex flex-col gap-4">
        <h2 className="serif text-2xl tracking-[-0.03em] font-semibold scroll-mt-24">API</h2>
        <PropsTable rows={[
          { name: "src", type: "string", description: "Image URL." },
          { name: "name", type: "string", description: "Used to derive initials and fake gradient seed." },
          { name: "fallback", type: "string", description: "Override the auto-derived initials." },
          { name: "size", type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: "Box size." },
          { name: "status", type: '"online" | "away" | "busy" | "offline"', description: "Indicator dot in the corner." },
          { name: "fake", type: "boolean", default: "false", description: "Use a deterministic gradient background instead of paper." },
        ]}/>
      </section>
    </article>
  );
}
