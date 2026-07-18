"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { deriveOverview } from "../lib/derive-overview";

interface ServiceOverviewSectionProps {
  description: string;
}

/**
 * Compact service overview: short lead + three punchy pillars.
 * Distinct from sticky long-card layout.
 */
export default function ServiceOverviewSection({ description }: ServiceOverviewSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { lead, points } = useMemo(() => deriveOverview(description), [description]);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
      });

      gsap.from(gridRef.current?.children ?? [], {
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        y: 32,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [points.length]);

  return (
    <section
      ref={sectionRef}
      className="section-light border-t border-black/[0.06] section-y"
    >
      <div className="section-container">
        <div ref={headerRef} className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
            <span className="h-px w-8 bg-teal-500/50" />
            Overview
            <span className="h-px w-8 bg-teal-500/50" />
          </span>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
            What we deliver
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-black/50 sm:text-base">
            {lead}
          </p>
        </div>

        <div
          ref={gridRef}
          className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4 lg:mt-14 lg:gap-5"
        >
          {points.map((point, index) => (
            <motion.article
              key={point.title}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-950 p-5 text-left shadow-[0_24px_56px_-36px_rgba(0,0,0,0.35)] sm:p-6"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-teal-400/15 blur-2xl transition-opacity group-hover:opacity-100"
              />

              <div className="relative flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold tabular-nums tracking-[0.22em] text-teal-300/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-white/10 transition-colors group-hover:bg-teal-400/30" />
              </div>

              <h3 className="relative mt-5 text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
                {point.title}
              </h3>
              <p className="relative mt-2 text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
                {point.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
