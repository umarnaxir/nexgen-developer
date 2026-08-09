"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import GalaxyBackground from "@/components/GalaxyBackground";

export default function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headlineRef.current, { y: 64, opacity: 0, duration: 1 }).from(
        sublineRef.current,
        { y: 24, opacity: 0, duration: 0.75 },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={sectionRef}
      className="section-dark relative flex h-[50vh] min-h-[50vh] flex-col justify-end overflow-hidden pb-10 pt-[calc(var(--mobile-nav-height)+1.5rem)] sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <GalaxyBackground />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:48px_48px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 top-1/4 z-[1] h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 bottom-0 z-[1] h-[420px] w-[420px] rounded-full bg-white/[0.02] blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-transparent to-transparent"
      />

      <div className="section-container relative z-10">
        <div className="w-full max-w-none">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-white/70"
          >
            <span className="h-px w-8 bg-white/40" />
            Services
          </motion.span>

          <h1
            id="services-heading"
            ref={headlineRef}
            className="w-full text-[clamp(1.25rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:whitespace-nowrap"
          >
            Everything you need to launch and scale.
          </h1>

          <p
            ref={sublineRef}
            className="mt-5 max-w-3xl text-base leading-relaxed text-white/75 sm:mt-6 sm:max-w-4xl sm:text-lg"
          >
            Development, marketing, and support, built with clarity, speed, and long-term
            performance in mind.
          </p>
        </div>
      </div>
    </header>
  );
}
