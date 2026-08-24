"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import ServiceSectionHeader from "./ServiceSectionHeader";
import type { ServiceProcessStep } from "../lib/service-detail-copy";

interface ServiceProcessSectionProps {
  steps: ServiceProcessStep[];
}

export default function ServiceProcessSection({ steps }: ServiceProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });
      gsap.from(listRef.current?.children ?? [], {
        scrollTrigger: { trigger: listRef.current, start: "top 85%" },
        y: 22,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [steps.length]);

  if (steps.length === 0) return null;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-light scroll-mt-24 py-6 sm:py-8 lg:py-9 sm:scroll-mt-28"
    >
      <div className="section-container">
        <div ref={headerRef} className="mb-8 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <ServiceSectionHeader
            tone="light"
            title="How the work actually runs"
            description="Visible stages, named owners, and a definition of done. You always know what week you are in and what “next” means."
          />
          <p className="text-sm tabular-nums text-text-gray lg:pb-1">
            {String(steps.length).padStart(2, "0")} stages
          </p>
        </div>

        <div ref={listRef} className="flex flex-col gap-3 sm:gap-4">
          {steps.map((step, index) => (
            <article
              key={`${step.title}-${index}`}
              className="relative grid gap-4 rounded-2xl border border-gold/30 bg-background p-5 sm:p-6 md:grid-cols-[auto_minmax(0,1fr)] md:gap-8 md:p-8"
            >
              <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-sm font-semibold tabular-nums text-gold md:h-12 md:w-12">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step.meta ? (
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-text-gray">
                    {step.meta}
                  </span>
                ) : null}
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-primary sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-text-gray sm:text-base">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
