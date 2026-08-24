"use client";

import {
  Boxes,
  Gauge,
  Layers,
  Puzzle,
  Shield,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import ServiceSectionHeader from "./ServiceSectionHeader";
import type { ServiceOffering } from "../lib/service-detail-copy";

const ICONS: LucideIcon[] = [Layers, Puzzle, Shield, Zap, Gauge, Boxes, Sparkles];

interface ServiceOfferingsSectionProps {
  offerings: ServiceOffering[];
}

export default function ServiceOfferingsSection({ offerings }: ServiceOfferingsSectionProps) {
  if (offerings.length === 0) return null;

  return (
    <section
      id="capabilities"
      className="section-light scroll-mt-24 border-t border-gold/25 py-6 sm:py-8 lg:py-9 sm:scroll-mt-28"
    >
      <div className="section-container">
        <ServiceSectionHeader
          tone="light"
          title="What we actually deliver"
          description="The work inside the engagement — not a slogan. Each item is scoped, built, and handed over so your team can run it."
        />

        <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {offerings.map((item, index) => {
            const Icon = ICONS[index % ICONS.length]!;
            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-background p-5 transition-colors hover:border-gold/25 hover:bg-gold/10 sm:p-6"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100"
                />
                <div className="relative flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                    <Icon className="h-4.5 w-4.5 h-4 w-4" />
                  </span>
                  <span className="text-[11px] font-medium tabular-nums tracking-[0.2em] text-gold-dark/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="relative mt-5 text-lg font-semibold tracking-[-0.02em] text-primary">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-[14px] leading-relaxed text-text-gray">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
