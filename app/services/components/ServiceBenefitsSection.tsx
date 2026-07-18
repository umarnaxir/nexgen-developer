"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Check, Sparkles, Target, Zap } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { deriveKeyPoints, getSpotlightTitle } from "../lib/derive-key-points";

interface ServiceBenefitsSectionProps {
  benefits: string[];
  expectedResults: string[];
}

type TabId = "benefits" | "results";

function BenefitListItem({
  label,
  index,
  isActive,
  onSelect,
  variant,
}: {
  label: string;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  variant: TabId;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-24, 24], [4, -4]), { stiffness: 260, damping: 22 });
  const rotateY = useSpring(useTransform(x, [-24, 24], [-4, 4]), { stiffness: 260, damping: 22 });

  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = variant === "benefits" ? Check : Sparkles;

  return (
    <motion.button
      ref={ref}
      type="button"
      layout
      onClick={onSelect}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.98 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`group relative flex w-full items-start gap-3 overflow-hidden rounded-xl border px-4 py-3.5 text-left transition-colors duration-300 sm:px-5 sm:py-4 ${
        isActive
          ? "border-teal-500/30 bg-teal-500/[0.07] shadow-[0_20px_48px_-32px_rgba(0,0,0,0.18)]"
          : "border-black/[0.06] bg-white hover:border-black/12 hover:bg-black/[0.02]"
      }`}
    >
      <span
        className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
          isActive
            ? "border-teal-500/30 bg-teal-600 text-white"
            : "border-teal-500/15 bg-teal-500/10 text-teal-600 group-hover:scale-105"
        }`}
      >
        {isActive ? (
          <span className="text-[10px] font-semibold tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        ) : (
          <Icon className="h-3.5 w-3.5" />
        )}
      </span>
      <span
        className={`min-w-0 flex-1 text-[13px] leading-snug sm:text-[14px] ${
          isActive ? "font-semibold text-black" : "font-medium text-black/65 group-hover:text-black"
        }`}
      >
        {label}
      </span>
      <ArrowRight
        className={`mt-1 h-3.5 w-3.5 shrink-0 transition-all duration-300 ${
          isActive
            ? "translate-x-0 text-teal-600 opacity-100"
            : "translate-x-[-4px] text-black/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
        }`}
      />
    </motion.button>
  );
}

export default function ServiceBenefitsSection({
  benefits,
  expectedResults,
}: ServiceBenefitsSectionProps) {
  const hasResults = expectedResults.length > 0;
  const [activeTab, setActiveTab] = useState<TabId>("benefits");
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  const items = activeTab === "benefits" ? benefits : expectedResults;
  const activeItem = items[activeIndex] ?? items[0] ?? "";
  const spotlightTitle = getSpotlightTitle(activeItem);
  const keyPoints = deriveKeyPoints(activeItem, activeTab);
  const progress = items.length <= 1 ? 100 : (activeIndex / (items.length - 1)) * 100;

  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.from(spotlightRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        x: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.12,
        ease: "power3.out",
      });

      gsap.from(listRef.current?.children ?? [], {
        scrollTrigger: { trigger: listRef.current, start: "top 88%" },
        x: -20,
        opacity: 0,
        duration: 0.65,
        stagger: 0.06,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, { width: `${progress}%`, duration: 0.5, ease: "power2.out" });
    }
  }, [progress, activeTab]);

  useEffect(() => {
    if (!countRef.current) return;
    const counter = { val: 0 };
    gsap.to(counter, {
      val: items.length,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        if (countRef.current) countRef.current.textContent = String(Math.round(counter.val));
      },
    });
  }, [activeTab, items.length]);

  return (
    <section
      ref={sectionRef}
      className="section-light relative overflow-hidden border-t border-black/[0.06] py-14 sm:py-16 lg:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-14">
        <div ref={headerRef} className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
              Value
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl">
              Benefits & outcomes
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-1.5">
              <span ref={countRef} className="text-3xl font-semibold tabular-nums tracking-[-0.03em] text-black">
                0
              </span>
              <span className="text-sm text-black/40">
                {activeTab === "benefits" ? "benefits" : "outcomes"}
              </span>
            </div>
            <div className="h-px w-24 overflow-hidden bg-black/[0.08] sm:w-32">
              <div ref={progressRef} className="h-full bg-teal-600" style={{ width: "0%" }} />
            </div>
          </div>
        </div>

        {hasResults ? (
          <div className="mb-8 inline-flex rounded-full border border-black/[0.08] bg-white p-1 shadow-[0_12px_40px_-28px_rgba(0,0,0,0.15)]">
            {(
              [
                { id: "benefits" as const, label: "Key benefits", icon: Zap },
                { id: "results" as const, label: "Expected results", icon: Target },
              ] as const
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-300 sm:px-5 ${
                  activeTab === id ? "bg-black text-white" : "text-black/45 hover:text-black"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </div>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
          {/* List */}
          <div ref={listRef} className="flex flex-col gap-2.5">
            {items.map((item, index) => (
              <BenefitListItem
                key={`${activeTab}-${item}`}
                label={item}
                index={index}
                isActive={activeIndex === index}
                onSelect={() => setActiveIndex(index)}
                variant={activeTab}
              />
            ))}
          </div>

          {/* Spotlight panel */}
          <div
            ref={spotlightRef}
            className="relative min-h-[320px] overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_28px_72px_-40px_rgba(0,0,0,0.16)] lg:min-h-[400px]"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-500/[0.08] blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${activeIndex}`}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col p-6 sm:p-8 lg:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal-700">
                    {activeTab === "benefits" ? (
                      <>
                        <Zap className="h-3 w-3" /> Benefit
                      </>
                    ) : (
                      <>
                        <Target className="h-3 w-3" /> Outcome
                      </>
                    )}
                  </span>
                  <span className="text-[11px] font-medium tabular-nums tracking-[0.25em] text-black/30">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 h-px origin-left bg-gradient-to-r from-teal-500/60 via-teal-400/30 to-transparent"
                />

                <p className="mt-6 text-xl font-semibold leading-snug tracking-[-0.02em] text-black sm:text-2xl lg:text-[1.65rem]">
                  {spotlightTitle}
                </p>

                <div className="mt-6 flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
                    Key points
                  </span>
                  <ul className="mt-3 space-y-2.5">
                    {keyPoints.map((point, pointIndex) => (
                      <motion.li
                        key={point}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.12 + pointIndex * 0.07,
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex items-start gap-3 text-[14px] leading-relaxed text-black/60"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/[0.06] pt-6">
                  <button
                    type="button"
                    onClick={() => setActiveIndex((i) => Math.max(i - 1, 0))}
                    disabled={activeIndex === 0}
                    className="text-sm font-medium text-black/40 transition-colors hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Previous
                  </button>
                  {activeIndex < items.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setActiveIndex((i) => Math.min(i + 1, items.length - 1))}
                      className="group inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-5 py-2.5 text-sm font-semibold text-black transition-all hover:border-teal-500/30 hover:bg-teal-500/[0.06]"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ) : (
                    <span className="text-sm font-medium text-teal-700/80">All covered</span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
