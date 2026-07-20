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
        stagger: 0.08,
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
    <section ref={sectionRef} className="section-dark section-y">
      <div className="section-container">
        <div ref={headerRef} className="mb-6 flex flex-col gap-4 lg:mb-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
              Process
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              How we work
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm tabular-nums text-white/45">
              Step {String(activeIndex + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>
            <div className="h-px w-24 overflow-hidden bg-white/10 sm:w-32 lg:w-48">
              <div ref={progressRef} className="h-full bg-teal-400" style={{ width: "0%" }} />
            </div>
          </div>
        </div>

        {/* 2×2 step grid — click one to update the card below */}
        <div ref={trackRef} className="mb-6 grid grid-cols-2 gap-2.5 sm:mb-8 sm:gap-3">
          {steps.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={`relative flex min-h-[3.25rem] items-center justify-center rounded-full border px-3 py-2.5 text-center transition-all duration-300 sm:min-h-[3.5rem] sm:px-5 sm:py-3 ${
                  isActive
                    ? "border-white bg-white text-black shadow-[0_12px_32px_-18px_rgba(255,255,255,0.45)]"
                    : "border-white/15 bg-black text-white/55 hover:border-white/30 hover:text-white/85"
                }`}
              >
                <span className="text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] sm:text-[11px]">
                  <span className="tabular-nums">{String(item.step).padStart(2, "0")}</span>
                  <span className="mx-1.5 opacity-50">·</span>
                  {item.title}
                </span>
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-6 -bottom-px h-px bg-white/40 sm:inset-x-10"
                  />
                ) : null}
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

            <div className="relative">
              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-teal-400/80">
                Step {String(activeStep.step).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                {activeStep.title}
              </h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/55 sm:text-base">
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
