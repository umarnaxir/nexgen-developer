"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ServiceDefinition } from "../config";
import { getServiceHref } from "../config";
import { ServiceReveal } from "./ServiceMotion";

interface RelatedServicesSectionProps {
  services: ServiceDefinition[];
}

const ease = [0.22, 1, 0.36, 1] as const;

function RelatedServiceCard({
  service,
  index,
}: {
  service: ServiceDefinition;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const goldCard = index % 2 === 1;
  const blurb =
    service.content.lead?.trim() ||
    service.content.description.split(/(?<=[.!?])\s+/)[0] ||
    service.seo.description;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease }}
      className="min-h-[20rem] h-auto w-full shrink-0 snap-start sm:min-h-[22rem] sm:w-[calc((100%-1rem)/2)] lg:min-h-[24rem] lg:w-[calc((100%-3rem)/4)]"
    >
      <Link
        href={getServiceHref(service)}
        className={`group relative flex h-full w-full flex-col overflow-hidden rounded-[1.35rem] border p-5 sm:p-6 ${
          goldCard
            ? "border-gold/40 bg-gold text-primary"
            : "border-gold/30 bg-[linear-gradient(155deg,#1c1710_0%,#111111_42%,#0a0a0a_100%)] text-white"
        }`}
      >
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${
            goldCard
              ? "bg-[radial-gradient(circle_at_100%_0%,rgba(14,13,13,0.1),transparent_48%)]"
              : "bg-[radial-gradient(circle_at_100%_0%,rgba(230,201,166,0.22),transparent_48%)]"
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 opacity-40 ${
            goldCard
              ? "bg-[radial-gradient(circle_at_50%_50%,rgba(14,13,13,0.12)_1px,transparent_1px)] bg-[length:22px_22px]"
              : "bg-[radial-gradient(circle_at_50%_50%,rgba(230,201,166,0.14)_1px,transparent_1px)] bg-[length:22px_22px]"
          }`}
        />

        <div className="relative flex items-start justify-between gap-3">
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-[12px] font-semibold tabular-nums tracking-[0.14em] transition-transform duration-300 group-hover:scale-105 ${
              goldCard
                ? "bg-primary text-gold"
                : "border border-gold/35 bg-gold text-primary"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-105 ${
              goldCard
                ? "border-primary/15 bg-primary/10 text-primary"
                : "border-gold/30 bg-white/5 text-gold"
            }`}
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

        <div className="relative mt-auto flex flex-col">
          <h3
            className={`text-xl font-semibold leading-tight tracking-[-0.02em] sm:text-[1.35rem] ${
              goldCard ? "text-primary" : "text-white"
            }`}
          >
            {service.label}
          </h3>
          <p
            className={`mt-2.5 line-clamp-3 text-[13px] leading-relaxed sm:text-sm ${
              goldCard ? "text-primary/65" : "text-gold-light/80"
            }`}
          >
            {blurb}
          </p>
          <span
            className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5 ${
              goldCard ? "text-primary" : "text-gold"
            }`}
          >
            Explore
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function RelatedServicesSection({ services }: RelatedServicesSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeControl, setActiveControl] = useState<"prev" | "next" | null>(null);
  const items = services.slice(0, 6);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    setActiveControl(dir === -1 ? "prev" : "next");
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  const controlClass = (key: "prev" | "next") =>
    cn(
      "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200",
      activeControl === key
        ? "scale-95 border-black bg-black text-white"
        : "border-black/15 bg-white text-black hover:border-black/35 hover:bg-black/[0.04] active:scale-95 active:border-black active:bg-black active:text-white"
    );

  return (
    <section
      className="relative border-t border-black/[0.06] section-y"
      aria-label="Related services"
    >
      <div className="section-container">
        <ServiceReveal className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-gold-dark">
              Next
            </span>
            <h2 className="mt-2 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
              Related services
            </h2>
          </div>
          <Link
            href="/services"
            className="tap-target group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-black/60 transition-all duration-300 hover:gap-2.5 hover:text-black"
          >
            All services
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </ServiceReveal>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((service, index) => (
            <RelatedServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        {items.length > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2.5 sm:mt-7">
            <button
              type="button"
              aria-label="Previous services"
              aria-pressed={activeControl === "prev"}
              onClick={() => scrollByDir(-1)}
              className={controlClass("prev")}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next services"
              aria-pressed={activeControl === "next"}
              onClick={() => scrollByDir(1)}
              className={controlClass("next")}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
