"use client";
import { Button, Input, Textarea, Badge } from "@disenio/ui";
import { useState } from "react";

export function ComponentShowcase() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const valid = email.includes("@") || email === "";

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Buttons pair */}
      <div className="surface p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="serif text-2xl">Buttons</h3>
          <Badge tone="neutral">primitive</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="solid">Primary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mono text-xs text-[var(--ds-muted)]">
          radius, motion, shadow respond to current Feel.
        </div>
      </div>

      {/* Form pair */}
      <div className="surface p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="serif text-2xl">Form pair</h3>
          <Badge tone="accent">pair</Badge>
        </div>
        <Input
          label="Email"
          placeholder="hola@disenio.io"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!valid ? "Needs an @" : undefined}
          hint={valid ? "We'll never share it." : undefined}
          leading={<span className="mono text-xs">@</span>}
        />
        <Textarea
          label="Message"
          placeholder="Tell us what you're building…"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          hint={`${msg.length} / 280`}
        />
        <div className="flex items-center justify-between pt-2 border-t hairline">
          <span className="mono text-[10px] uppercase tracking-[0.18em] text-[var(--ds-muted)]">
            keyboard ↹ tested · WCAG AA
          </span>
          <Button variant="accent" size="sm">Send →</Button>
        </div>
      </div>

      {/* Card pair */}
      <div className="surface p-6 flex flex-col gap-4 lg:col-span-2">
        <div className="flex items-center justify-between">
          <h3 className="serif text-2xl">Pricing trio</h3>
          <Badge tone="ink">content-aware</Badge>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { name: "Open", price: "Free", blurb: "MIT-licensed components, themes, docs.", cta: "npm install", featured: false },
            { name: "Pro", price: "$96", blurb: "Premium blocks, dashboards, marketing kits.", cta: "Buy lifetime", featured: true },
            { name: "Studio", price: "$480", blurb: "Custom themes + Figma kit + 1:1 review.", cta: "Talk to us", featured: false },
          ].map((p) => (
            <div
              key={p.name}
              className="surface-deep p-5 flex flex-col gap-3"
              style={p.featured ? { borderColor: "var(--ds-ink)", boxShadow: "var(--ds-shadow)" } : undefined}
            >
              <div className="flex items-center justify-between">
                <span className="serif text-xl">{p.name}</span>
                {p.featured && <Badge tone="accent">Popular</Badge>}
              </div>
              <div className="serif text-4xl">{p.price}</div>
              <p className="text-sm text-[var(--ds-ink-soft)] min-h-[40px]">{p.blurb}</p>
              <Button variant={p.featured ? "accent" : "outline"} size="sm" className="w-full">
                {p.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
