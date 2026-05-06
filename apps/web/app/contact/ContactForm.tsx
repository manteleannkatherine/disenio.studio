"use client";
import * as React from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  FormField,
  Stack,
  Card,
  CardContent,
  useToast,
} from "@disenio/ui";

const TOPICS = [
  { value: "collab", label: "Collab — design or build together" },
  { value: "theme", label: "Custom theme — for my product" },
  { value: "feedback", label: "Feedback — a bug or an idea" },
  { value: "press", label: "Press / interview" },
  { value: "hi", label: "Just to say hi" },
];

type Errors = { name?: string; email?: string; message?: string };

export function ContactForm({ to }: { to: string }) {
  const { toast } = useToast();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [topic, setTopic] = React.useState("collab");
  const [message, setMessage] = React.useState("");
  const [website, setWebsite] = React.useState(""); // honeypot
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  function reset() {
    setName("");
    setEmail("");
    setTopic("collab");
    setMessage("");
    setErrors({});
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const next: Errors = {};
    if (!name.trim()) next.name = "Tell me who you are.";
    if (!email.trim()) next.email = "I'll need an address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That doesn't look like an email.";
    if (!message.trim()) next.message = "Even one line is fine.";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    const topicLabel = TOPICS.find((t) => t.value === topic)?.label ?? topic;

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, topicLabel, message, website }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? `Request failed (${res.status})`);
      }

      setSent(true);
      reset();
      toast({
        title: "Message sent",
        description: `I'll reply from ${to} within a couple of days.`,
        variant: "success",
      });
    } catch (err) {
      toast({
        title: "Couldn't send that",
        description:
          err instanceof Error
            ? err.message
            : `Try again, or email ${to} directly.`,
        variant: "error",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <Card>
        <CardContent>
          <div className="flex flex-col gap-3 py-4">
            <span className="mono text-[12px] uppercase tracking-[0.14em] text-[var(--ds-accent)]">
              Sent
            </span>
            <h2 className="serif text-2xl tracking-[-0.02em]">
              Got it. Talk soon.
            </h2>
            <p className="text-[var(--ds-ink-soft)]">
              Your message is on its way to{" "}
              <span className="text-[var(--ds-ink)]">{to}</span>. I read every one
              and reply within a couple of days — usually faster.
            </p>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" onClick={() => setSent(false)}>
                Send another
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <Stack gap={5}>
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField label="Your name" required error={errors.name}>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Lovelace"
                  disabled={submitting}
                />
              </FormField>
              <FormField label="Email" required error={errors.email}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ada@example.com"
                  disabled={submitting}
                />
              </FormField>
            </div>

            <FormField label="What's this about?">
              <Select
                value={topic}
                onValueChange={setTopic}
                options={TOPICS}
                disabled={submitting}
              />
            </FormField>

            <FormField
              label="Message"
              required
              hint="No template needed. A few sentences is plenty."
              error={errors.message}
            >
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                placeholder="Tell me what you're working on…"
                disabled={submitting}
              />
            </FormField>

            {/* Honeypot — hidden from humans, bots fill it */}
            <div aria-hidden="true" className="hidden">
              <label>
                Website
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
            </div>

            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-xs text-[var(--ds-muted)]">
                Goes to {to}. No mailing list, no autoresponders.
              </span>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Sending…" : "Send message"}
              </Button>
            </div>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
