"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import MotionImage from "@/components/motion/MotionImage";
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
  const image = service.content.image ?? "/images/services/website.png";
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease }}
      className="h-[240px] w-[85%] shrink-0 snap-start sm:h-[260px] sm:w-[calc((100%-1rem)/2)] lg:h-[280px] lg:w-[calc((100%-2rem)/3)]"
    >
      <Link
        href={getServiceHref(service)}
        className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-2xl"
      >
        <MotionImage
          src={image}
          alt={service.label}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

        <span className="absolute left-4 top-4 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative p-4 sm:p-5">
          <h3 className="text-base font-semibold leading-tight tracking-[-0.02em] text-white sm:text-lg">
            {service.label}
          </h3>
          <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 transition-all duration-300 group-hover:gap-2.5 group-hover:text-gold">
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
  const items = services.slice(0, 6);

  const scrollByDir = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.95, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section
      className="section-light relative overflow-hidden border-t border-black/[0.06] section-y"
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
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-black/60 transition-all duration-300 hover:gap-2.5 hover:text-black"
          >
            All services
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </ServiceReveal>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((service, index) => (
            <RelatedServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 sm:mt-6">
          <button
            type="button"
            aria-label="Previous services"
            onClick={() => scrollByDir(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-all duration-300 hover:border-black/25 hover:scale-105"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next services"
            onClick={() => scrollByDir(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:scale-105 hover:bg-black/80"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
