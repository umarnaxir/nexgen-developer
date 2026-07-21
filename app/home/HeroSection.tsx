"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import HeroGalaxy from "./HeroGalaxy";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { open: openContactModal } = useContactModal();

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(gridRef.current, { opacity: 0, duration: 1.2 })
        .from(
          headlineRef.current?.querySelectorAll(".hero-line") ?? [],
          { y: 80, opacity: 0, duration: 1, stagger: 0.12 },
          "-=0.8"
        )
        .from(sublineRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(ctaRef.current, { y: 24, opacity: 0, duration: 0.7 }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handleMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      grid.style.transform = `translate3d(${nx * 30}px, ${ny * 30}px, 0)`;
    };

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-dark relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 pt-[calc(var(--mobile-nav-height)+1.5rem)] sm:justify-center sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-28"
    >
      {/* Galaxy starfield */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroGalaxy />
      </div>

      <div
        ref={gridRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] transition-transform duration-700 ease-out will-change-transform"
      >
        {/* soft grid + glows */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:48px_48px]" />
        <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-white/[0.02] blur-[100px]" />

        <motion.div
          className="absolute left-1/2 top-1/2 hidden h-[1px] w-[60vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent sm:block"
          animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* One light moving circle — small top-right on mobile, larger right on desktop */}
        <motion.div
          className="absolute right-3 top-[calc(var(--mobile-nav-height)+0.75rem)] h-[120px] w-[120px] rounded-full border border-white/[0.08] sm:right-[4%] sm:top-1/2 sm:h-[280px] sm:w-[280px] sm:-translate-y-1/2 lg:right-[8%] lg:h-[340px] lg:w-[340px]"
          animate={{ y: [0, -10, 0], rotate: 360 }}
          transition={{
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          }}
        >
          <span className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50" />
        </motion.div>
      </div>

      <div className="section-container relative z-10 flex flex-1 flex-col justify-end sm:block sm:flex-none sm:justify-center">
        <div className="flex max-w-5xl flex-col pb-2 sm:pb-0">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.32em] text-white/50 sm:mb-8 sm:gap-3 sm:text-[11px] sm:tracking-[0.35em]"
          >
            <span className="h-px w-6 bg-white/30 sm:w-8" />
            NexGen Developers
          </motion.span>

          <h1
            ref={headlineRef}
            className="text-[clamp(2.55rem,11.2vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white sm:text-[clamp(2.85rem,10vw,6.5rem)] sm:leading-[0.95] sm:tracking-[-0.04em]"
          >
            <span className="hero-line block whitespace-nowrap">We build</span>
            <span className="hero-line block whitespace-nowrap text-white/90">premium digital</span>
            <span className="hero-line block whitespace-nowrap italic text-white/70">products.</span>
          </h1>

          <p
            ref={sublineRef}
            className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-white/50 sm:mt-8 sm:max-w-3xl sm:text-lg lg:max-w-4xl"
          >
            We help startups and local brands with AI/ML, chatbots, web &amp; app development,
            and digital marketing, crafting digital experiences that stand out and deliver results.
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex w-full flex-col gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <div className="w-full sm:w-auto [&_button]:block [&_button]:w-full">
              <MagneticButton
                onClick={openContactModal}
                className="!w-full !justify-center !px-6 !py-4 text-sm sm:!w-auto sm:!px-8 sm:!py-4"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
            <Link
              href="/projects"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white sm:h-auto sm:w-auto sm:justify-start sm:px-2"
            >
              View our work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
