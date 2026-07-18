"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface ServiceProcessSectionProps {
  steps: ProcessStep[];
}

export default function ServiceProcessSection({ steps }: ServiceProcessSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const activeStep = steps[activeIndex] ?? steps[0];
  const progress = steps.length <= 1 ? 100 : (activeIndex / (steps.length - 1)) * 100;

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.from(trackRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 85%",
        },
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [steps.length]);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.55,
        ease: "power2.out",
      });
    }
  }, [progress]);

  return (
    <section ref={sectionRef} className="section-dark py-14 sm:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-14">
        <div ref={headerRef} className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
              Process
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              How we work
            </h2>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="text-sm tabular-nums text-white/45">
              Step {String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>
            <div className="h-px w-32 overflow-hidden bg-white/10 lg:w-48">
              <div ref={progressRef} className="h-full bg-teal-400" style={{ width: "0%" }} />
            </div>
          </div>
        </div>

        {/* Step tabs */}
        <div ref={trackRef} className="relative mb-8 hidden lg:block">
          <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-white/10" aria-hidden />
          <div className="relative grid gap-3" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
            {steps.map((item, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`group relative flex flex-col items-center gap-3 rounded-xl px-3 py-4 text-center transition-all duration-300 ${
                    isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                  }`}
                >
                  <span
                    className={`relative z-10 flex h-11 w-11 items-center justify-center rounded-full border text-sm font-semibold tabular-nums transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-teal-400/50 bg-teal-500 text-white shadow-[0_0_24px_-4px_rgba(45,212,191,0.55)]"
                        : "border-white/15 bg-black text-white/55 group-hover:border-white/30 group-hover:text-white"
                    }`}
                  >
                    {String(item.step).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[13px] font-semibold leading-snug transition-colors ${
                      isActive ? "text-white" : "text-white/45 group-hover:text-white/75"
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile step selector */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {steps.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-all ${
                  isActive
                    ? "bg-white text-black"
                    : "border border-white/15 bg-white/5 text-white/55"
                }`}
              >
                {String(item.step).padStart(2, "0")} · {item.title}
              </button>
            );
          })}
        </div>

        {/* Active step detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] p-6 sm:p-8 lg:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-12">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-teal-400/80">
                  Step {String(activeStep.step).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                  {activeStep.title}
                </h3>
              </div>
              <p className="text-[15px] leading-relaxed text-white/55 sm:text-base">
                {activeStep.description}
              </p>
            </div>

            <div className="relative mt-8 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
              <button
                type="button"
                onClick={() => setActiveIndex((i) => Math.max(i - 1, 0))}
                disabled={activeIndex === 0}
                className="text-sm font-medium text-white/40 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                Previous
              </button>

              {activeIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveIndex((i) => Math.min(i + 1, steps.length - 1))}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-teal-400/40 hover:bg-teal-500/10"
                >
                  Next step
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <span className="text-sm font-medium text-teal-400/80">Final step</span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
