"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, CalendarClock, ShieldCheck } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";

const trustItems = [
  { icon: BadgeCheck, label: "Fixed starting prices" },
  { icon: CalendarClock, label: "Scope call before kickoff" },
  { icon: ShieldCheck, label: "50% advance · 50% at launch" },
];

export default function PricingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headlineRef.current?.querySelectorAll(".hero-line") ?? [], {
        y: 72,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      }).from(sublineRef.current, { y: 28, opacity: 0, duration: 0.75 }, "-=0.45");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={sectionRef}
      className="hero-glow relative flex h-[60vh] min-h-[60vh] flex-col justify-end overflow-hidden pb-12 pt-[calc(var(--site-nav-height)+2rem)] sm:pb-16 sm:pt-[calc(var(--site-nav-height)+2.5rem)] lg:pb-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(230,201,166,0.16)_1px,transparent_1px)] bg-[length:48px_48px] opacity-50"
      />

      <div className="relative z-10 px-4 sm:px-6 lg:px-14">
        <div className="mx-auto w-full max-w-7xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark"
          >
            <span className="h-px w-8 bg-gold" />
            Pricing
          </motion.span>

          <h1
            ref={headlineRef}
            className="max-w-4xl text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-primary"
          >
            <span className="hero-line block">Clear packages.</span>
            <span className="hero-line block text-gold-dark">Honest timelines.</span>
          </h1>

          <p
            ref={sublineRef}
            className="mt-5 max-w-2xl text-base leading-relaxed text-text-gray sm:mt-6 sm:text-lg"
          >
            Starting prices for websites, apps, and other services. We confirm
            scope and timeline before work begins — no surprises.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10">
            {trustItems.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                className="premium-card inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm text-primary"
              >
                <Icon className="h-4 w-4 shrink-0 text-gold-dark" strokeWidth={2} />
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
