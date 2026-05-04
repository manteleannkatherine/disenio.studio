import * as React from "react";
import { cn } from "../utils/cn";

/**
 * PriceCard — the pricing-table pair: name + price + features + cta.
 *
 *   <PriceCard
 *     name="Pro"
 *     price="$96"
 *     period="lifetime"
 *     description="All premium kits."
 *     features={["Marketing Kit", "30+ themes", "Figma file"]}
 *     cta="Buy"
 *     featured
 *   />
 */

export interface PriceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: React.ReactNode;
  price: React.ReactNode;
  period?: React.ReactNode;
  description?: React.ReactNode;
  features?: React.ReactNode[];
  cta?: React.ReactNode;
  ctaHref?: string;
  onCta?: () => void;
  badge?: React.ReactNode;
  featured?: boolean;
}

export const PriceCard = React.forwardRef<HTMLDivElement, PriceCardProps>(
  (
    {
      name,
      price,
      period,
      description,
      features,
      cta,
      ctaHref,
      onCta,
      badge,
      featured,
      className,
      ...props
    },
    ref,
  ) => {
    const ctaContent = cta ?? "Get started";
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-4 p-6 rounded-[var(--ds-radius)] bg-[var(--ds-paper)] border",
          featured ? "border-[var(--ds-accent)]" : "border-[var(--ds-line)]",
          className,
        )}
        style={
          featured
            ? { borderWidth: 2, boxShadow: "var(--ds-shadow)" }
            : undefined
        }
        {...props}
      >
        <div className="flex items-center justify-between">
          <h3 className="serif text-2xl tracking-[-0.02em] font-semibold text-[var(--ds-ink)]">{name}</h3>
          {badge ?? (featured && (
            <span
              className="mono text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full"
              style={{ background: "var(--ds-accent)", color: "var(--ds-accent-ink)" }}
            >
              popular
            </span>
          ))}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="serif text-5xl tracking-[-0.02em] font-semibold text-[var(--ds-ink)]">{price}</span>
          {period && <span className="text-sm text-[var(--ds-muted)]">{period}</span>}
        </div>
        {description && <p className="text-sm text-[var(--ds-ink-soft)]">{description}</p>}
        {features && features.length > 0 && (
          <ul className="flex flex-col gap-2 text-sm text-[var(--ds-ink-soft)]">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 size-1.5 rounded-full bg-[var(--ds-accent)] shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}
        {ctaHref ? (
          <a
            href={ctaHref}
            className="mt-2 h-11 inline-flex items-center justify-center rounded-[var(--ds-button-radius)] font-medium text-sm transition-transform hover:-translate-y-px"
            style={{
              background: featured ? "var(--ds-accent)" : "transparent",
              color: featured ? "var(--ds-accent-ink)" : "var(--ds-ink)",
              border: featured ? "1px solid var(--ds-accent)" : "1px solid var(--ds-line)",
            }}
          >
            {ctaContent}
          </a>
        ) : (
          <button
            type="button"
            onClick={onCta}
            className="mt-2 h-11 inline-flex items-center justify-center rounded-[var(--ds-button-radius)] font-medium text-sm transition-transform hover:-translate-y-px"
            style={{
              background: featured ? "var(--ds-accent)" : "transparent",
              color: featured ? "var(--ds-accent-ink)" : "var(--ds-ink)",
              border: featured ? "1px solid var(--ds-accent)" : "1px solid var(--ds-line)",
            }}
          >
            {ctaContent}
          </button>
        )}
      </div>
    );
  },
);
PriceCard.displayName = "PriceCard";
