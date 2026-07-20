"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";

const HERO_IMAGE = "/images/hero-image.png";

export default function ContactUsHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headlineRef.current?.querySelectorAll(".hero-line") ?? [], {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      }).from(sublineRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-dark relative flex min-h-[56svh] flex-col justify-end overflow-hidden pb-12 pt-[calc(var(--mobile-nav-height)+2rem)] sm:min-h-[52vh] sm:pb-14 sm:pt-24 lg:min-h-[58vh] lg:pb-16 lg:pt-32"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      </div>

      <div className="section-container relative z-10">
        <div className="w-full max-w-none">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-white/70"
          >
            <span className="h-px w-8 bg-white/40" />
            Contact
          </motion.span>

          <h1
            ref={headlineRef}
            className="w-full text-[clamp(1.85rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
          >
            <span className="hero-line block">Let&apos;s start</span>
            <span className="hero-line block text-white/90">a conversation.</span>
          </h1>

          <p
            ref={sublineRef}
            className="mt-5 max-w-3xl text-base leading-relaxed text-white/75 sm:mt-6 sm:text-lg"
          >
            Tell us about your project. We&apos;ll get back within one business day.
          </p>
        </div>
      </div>
    </section>
  );
}
