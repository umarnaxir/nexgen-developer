"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import type { ServiceStat } from "../lib/service-detail-copy";

interface ServiceDetailHeroProps {
  heading: string;
  lead: string;
  stats: ServiceStat[];
  technologies?: string;
}

export default function ServiceDetailHero({
  heading,
  lead,
  stats = [],
  technologies,
}: ServiceDetailHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const restRef = useRef<HTMLDivElement>(null);
  const { open: openContactModal } = useContactModal();

  const techItems = (technologies ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(headlineRef.current?.querySelectorAll(".hero-line") ?? [], {
        y: 56,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
      }).from(
        restRef.current,
        { y: 24, opacity: 0, duration: 0.7 },
        "-=0.45"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = heading.trim().split(/\s+/);
  const splitAt = words.length > 3 ? Math.ceil(words.length / 2) : words.length;

  return (
    <header
      ref={sectionRef}
      className="section-light relative flex min-h-[min(92vh,880px)] flex-col justify-end overflow-hidden pb-10 pt-[calc(var(--site-nav-height)+1.25rem)] sm:pb-12 sm:pt-[calc(var(--site-nav-height)+2.5rem)] lg:min-h-[min(88vh,820px)] lg:pb-14 lg:pt-[calc(var(--site-nav-height)+3rem)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_12%,rgba(230,201,166,0.16),transparent_38%),radial-gradient(circle_at_8%_90%,rgba(209,172,129,0.1),transparent_42%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(230,201,166,0.12)_1px,transparent_1px)] bg-[length:48px_48px] opacity-40"
      />

      <div className="relative z-10 px-4 sm:px-6 lg:px-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col">
        <Link
          href="/services"
          className="mb-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-text-gray transition-colors hover:text-gold-dark sm:mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to services
        </Link>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12">
          <div>
            <h1
              ref={headlineRef}
              className="text-[clamp(2.15rem,7.5vw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.045em] text-primary"
            >
              <span className="hero-line block">{words.slice(0, splitAt).join(" ")}</span>
              {splitAt < words.length ? (
                <span className="hero-line mt-1 block text-gold-dark">
                  {words.slice(splitAt).join(" ")}
                </span>
              ) : null}
            </h1>
          </div>

          <div ref={restRef} className="flex flex-col gap-6 lg:pb-1">
            <p className="max-w-xl text-[15px] leading-relaxed text-text-gray sm:text-base lg:text-[17px]">
              {lead}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <MagneticButton onClick={openContactModal} variant="gold">
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <a
                href="#process"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 px-6 py-3.5 text-sm font-semibold text-primary/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-primary"
              >
                See how we work
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>
            {techItems.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {techItems.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-gold/25 bg-gold/[0.08] px-3 py-1 text-[11px] font-medium tracking-[-0.01em] text-text-gray"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {stats.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold/30 bg-gold/10 sm:mt-12 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-background px-4 py-4 sm:px-5 sm:py-5"
              >
                <p className="text-xl font-semibold tracking-[-0.04em] text-primary sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-text-gray sm:text-[13px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        ) : null}
        </div>
      </div>
    </header>
  );
}
