"use client";

import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import ServiceSectionHeader from "./ServiceSectionHeader";
import type { ServicePillar } from "../lib/service-detail-copy";

interface ServiceOverviewSectionProps {
  intro: string[];
  pillars: ServicePillar[];
  whyChoose?: string[];
  image?: string;
  heading: string;
}

export default function ServiceOverviewSection({
  intro,
  pillars,
  whyChoose = [],
  heading,
}: ServiceOverviewSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
      gsap.from(bodyRef.current, {
        scrollTrigger: { trigger: bodyRef.current, start: "top 85%" },
        y: 24,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        immediateRender: false,
      });
      gsap.from(gridRef.current?.children ?? [], {
        scrollTrigger: { trigger: gridRef.current, start: "top 88%" },
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [pillars.length]);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="section-light scroll-mt-24 border-t border-black/[0.06] py-6 sm:py-8 lg:py-9 sm:scroll-mt-28"
    >
      <div className="section-container">
        <div ref={headerRef}>
          <ServiceSectionHeader
            title="What this engagement actually is"
            description="Not a feature list — the way we frame the work, the constraints we design for, and why teams hire us for this specifically."
          />
        </div>

        <div
          ref={bodyRef}
          className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12"
        >
          <div className="space-y-5">
            {intro.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-[15px] leading-[1.75] text-black/65 sm:text-[16px] sm:leading-[1.8]"
              >
                {paragraph}
              </p>
            ))}
            {whyChoose.length > 0 ? (
              <ul className="mt-2 grid gap-2.5 sm:grid-cols-2">
                {whyChoose.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-xl border border-black/[0.06] bg-black/[0.02] px-3.5 py-3 text-[13px] leading-snug text-black/70 sm:text-[14px]"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-dark/15 text-gold-dark">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl border border-black/[0.08] bg-background p-5 sm:min-h-[320px] sm:p-6 lg:min-h-full">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:22px_22px] opacity-60"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl"
            />
            <p className="relative text-[11px] font-medium uppercase tracking-[0.22em] text-gold/80">
              Engagement model
            </p>
            <div className="relative mt-8">
              <p className="text-2xl font-semibold tracking-[-0.03em] text-primary sm:text-[1.65rem]">
                {heading}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-text-gray sm:text-[15px]">
                Built as a product: architecture, UX, launch, and the operating rhythm after go-live — not a one-off
                deliverable that goes stale the week after you ship.
              </p>
            </div>
            <p className="relative mt-8 border-t border-gold/25 pt-4 text-[12px] leading-relaxed text-text-gray">
              Discovery, build, launch, and a handover your team can actually run.
            </p>
          </div>
        </div>

        <div ref={gridRef} className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {pillars.map((pillar, index) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_20px_48px_-36px_rgba(0,0,0,0.2)] sm:p-6"
            >
              <span className="text-[11px] font-semibold tabular-nums tracking-[0.22em] text-gold-dark/80">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em] text-black">
                {pillar.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-black/55">{pillar.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
