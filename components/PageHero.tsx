"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";

export type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  meta?: string;
  /** `glow` is the default light gold hero. `image` keeps the photo backdrop (Team). */
  variant?: "glow" | "image" | "galaxy";
};

const HERO_IMAGE = "/images/hero-image.png";

export default function PageHero({
  eyebrow,
  title,
  description,
  meta,
  variant = "glow",
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const isImage = variant === "image";

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
      className={`relative flex h-[50vh] min-h-[50vh] flex-col justify-end overflow-hidden pb-10 pt-[calc(var(--site-nav-height)+1.5rem)] sm:pb-12 sm:pt-[calc(var(--site-nav-height)+2.5rem)] lg:pb-14 lg:pt-[calc(var(--site-nav-height)+3rem)] ${
        isImage ? "section-light" : "hero-glow"
      }`}
    >
      {isImage ? (
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>
      ) : (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(230,201,166,0.16)_1px,transparent_1px)] bg-[length:48px_48px] opacity-50"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-1/4 top-1/4 z-[1] h-[500px] w-[500px] rounded-full bg-gold/20 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-1/4 bottom-0 z-[1] h-[420px] w-[420px] rounded-full bg-gold-dark/15 blur-[100px]"
          />
        </>
      )}

      <div className="relative z-10 px-4 sm:px-6 lg:px-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`mb-6 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] ${
              isImage ? "text-gold-dark" : "text-gold-dark"
            }`}
          >
            <span className={`h-px w-8 ${isImage ? "bg-gold/50" : "bg-gold"}`} />
            {eyebrow}
          </motion.span>

          <h1
            ref={headlineRef}
            className={`w-full text-[clamp(1.85rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] ${
              isImage ? "text-primary" : "text-primary"
            }`}
          >
            {title}
          </h1>

          <div ref={sublineRef} className="mt-5 w-full max-w-5xl space-y-2 sm:mt-6">
            {meta ? (
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-dark">
                {meta}
              </p>
            ) : null}
            {description ? (
              <p
                className={`text-base leading-relaxed sm:text-lg ${
                  isImage ? "text-text-gray" : "text-text-gray"
                }`}
              >
                {description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
