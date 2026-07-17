"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";

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

    const handleMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 30;
      grid.style.transform = `translate(${x}px, ${y}px)`;
    };

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-dark section-padding relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-16 lg:min-h-screen lg:pb-24 lg:pt-36"
    >
      <div
        ref={gridRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:48px_48px]" />
        <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[420px] w-[420px] rounded-full bg-white/[0.02] blur-[100px]" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[1px] w-[60vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="max-w-5xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-white/50"
          >
            <span className="h-px w-8 bg-white/30" />
            NexGen Developers
          </motion.span>

          <h1
            ref={headlineRef}
            className="text-[clamp(2.25rem,10vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-white"
          >
            <span className="hero-line block">We build</span>
            <span className="hero-line block text-white/90">premium digital</span>
            <span className="hero-line block italic text-white/70">products.</span>
          </h1>

          <p
            ref={sublineRef}
            className="mt-8 max-w-2xl text-base leading-relaxed text-white/50 sm:max-w-3xl sm:text-lg lg:max-w-4xl"
          >
            We help startups and local brands with AI/ML, chatbots, web &amp; app development,
            and digital marketing, crafting digital experiences that stand out and deliver results.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-row flex-wrap items-center gap-3 sm:mt-12 sm:gap-4">
            <MagneticButton onClick={openContactModal} className="!px-5 !py-3.5 text-xs sm:!px-8 sm:!py-4 sm:text-sm">
              Start a Project
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </MagneticButton>
            <Link
              href="/projects"
              className="group inline-flex shrink-0 items-center gap-1.5 px-1 text-xs font-medium text-white/60 transition-colors hover:text-white sm:gap-2 sm:px-2 sm:text-sm"
            >
              View our work
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
