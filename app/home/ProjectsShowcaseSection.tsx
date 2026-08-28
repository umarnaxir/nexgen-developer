"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import type { Project } from "@/lib/content/types";

function formatTitle(title: string) {
  return title.split(" - ")[0] ?? title;
}

function progressToIndex(progress: number, total: number) {
  if (total <= 1) return 0;
  return Math.min(Math.round(Math.min(Math.max(progress, 0), 1) * (total - 1)), total - 1);
}

const ease = [0.22, 1, 0.36, 1] as const;

type ProjectsShowcaseSectionProps = {
  projects: Project[];
};

export default function ProjectsShowcaseSection({
  projects,
}: ProjectsShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const featured = useMemo(() => projects, [projects]);

  const total = featured.length;
  const active = featured[activeIndex];

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current || total <= 1) return;

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${(total - 1) * window.innerHeight * 0.95}`,
        pin: pinRef.current,
        scrub: 0.45,
        pinSpacing: true,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const index = progressToIndex(self.progress, total);
          if (index !== activeIndexRef.current) {
            activeIndexRef.current = index;
            setActiveIndex(index);
          }
        },
      });
      scrollTriggerRef.current = st;
    }, sectionRef);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, [total]);

  const goToIndex = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st || total <= 1) return;
    const clamped = Math.min(Math.max(index, 0), total - 1);
    const progress = total === 1 ? 0 : clamped / (total - 1);
    st.scroll(st.start + (st.end - st.start) * progress);
  };

  if (total === 0 || !active) return null;

  const title = formatTitle(active.title);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-white"
      aria-label="Featured projects"
    >
      <div
        ref={pinRef}
        className="page-gutter relative flex min-h-[min(100svh,54rem)] flex-col pb-4 pt-[calc(var(--site-nav-height)+0.75rem)] sm:pb-5 sm:pt-[calc(var(--site-nav-height)+1rem)] lg:pb-6 lg:pt-[calc(var(--site-nav-height)+1.15rem)]"
      >
        {/* Header */}
        <div className="content-cap flex shrink-0 items-end justify-between gap-4">
          <div className="min-w-0">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark">
              Selected Work
            </span>
            <h2 className="mt-2 text-fluid-h2 font-semibold text-primary">
              Projects that <span className="text-gold-dark">ship.</span>
            </h2>
          </div>

          <span className="font-mono text-sm tabular-nums text-text-gray">
            <span className="text-gold-dark">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="mx-1 text-gold/40">/</span>
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Stage */}
        <div className="content-cap relative mt-3 flex min-h-0 flex-1 flex-col gap-3 sm:mt-4 sm:gap-4 lg:mt-5 lg:flex-row lg:gap-8">
          {/*
            Image stage — stacked cards so scroll never flashes empty. It takes
            whatever height is left over rather than a fixed slice of the
            viewport, so the copy below it is never cut off on short screens.
          */}
          <div className="relative min-h-[9rem] w-full flex-1 overflow-hidden rounded-2xl bg-gold-light lg:h-auto lg:min-h-0 lg:flex-[1.63]">
            {featured.map((project, index) => {
              const isActive = index === activeIndex;
              const offset = index - activeIndex;

              return (
                <motion.div
                  key={project.id}
                  className="absolute inset-0"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? "0%" : offset < 0 ? "-8%" : "8%",
                    scale: isActive ? 1 : 1.02,
                    zIndex: isActive ? 2 : 1,
                  }}
                  transition={{ duration: 0.5, ease }}
                  style={{ pointerEvents: isActive ? "auto" : "none" }}
                  aria-hidden={!isActive}
                >
                  <Image
                    src={project.image}
                    alt={formatTitle(project.title)}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    priority={index <= 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                </motion.div>
              );
            })}

            <span className="absolute left-4 top-4 z-10 rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm sm:left-5 sm:top-5">
              {active.category}
            </span>
          </div>

          {/* Right panel: original on mobile, dark board on desktop */}
          <div className="relative flex min-h-0 shrink-0 flex-col lg:w-[min(36%,400px)] lg:shrink-0 lg:overflow-hidden lg:rounded-[1.35rem] lg:border lg:border-gold/20 lg:bg-[#111111] lg:p-6 lg:text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_18%_0%,rgba(230,201,166,0.18),transparent_42%),radial-gradient(circle_at_90%_100%,rgba(209,172,129,0.12),transparent_38%)] lg:block"
            />

            {/*
              Scoreboard — desktop only. Allowed to shrink and scroll internally
              so a short laptop viewport eats into the list rather than pushing
              the project copy out of the clipped panel.
            */}
            <ul className="relative mb-5 hidden flex-col gap-1.5 border-b border-white/10 pb-5 lg:flex lg:min-h-0 lg:overflow-y-auto">
              {featured.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => goToIndex(index)}
                      className={`group flex w-full items-center justify-between gap-3 py-1 text-left transition-all duration-300 ${
                        isActive ? "opacity-100" : "opacity-40 hover:opacity-75"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`font-mono text-[10px] tabular-nums tracking-wider transition-colors ${
                            isActive ? "text-gold" : "text-gold/45"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`truncate text-sm tracking-wide transition-all duration-300 sm:text-[15px] ${
                            isActive
                              ? "font-semibold text-white"
                              : "font-medium text-white/55 group-hover:text-gold"
                          }`}
                        >
                          {formatTitle(project.title)}
                        </span>
                      </span>
                      <span
                        className={`h-px transition-all duration-400 ${
                          isActive ? "w-8 bg-gold" : "w-0 bg-gold/0 group-hover:w-4 group-hover:bg-gold/50"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Content — light + compact on mobile, pinned in the dark board on desktop */}
            <div className="relative flex shrink-0 flex-col justify-end pt-1 lg:mt-auto lg:pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${active.id}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex flex-col"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-dark lg:text-gold">
                    {active.category}
                  </p>
                  <h3 className="mt-1.5 text-[clamp(1.45rem,1.175rem+1.364vw,2.05rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-primary sm:mt-2 lg:text-white">
                    {title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-text-gray sm:mt-3.5 sm:text-[15px] lg:line-clamp-4 lg:text-white/65">
                    {active.description}
                  </p>

                  <div className="mt-3 flex flex-row items-center gap-2 sm:mt-6 sm:gap-3">
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary group inline-flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold pointer-coarse:min-h-11 sm:flex-none sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                    >
                      View live
                      <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-3.5 sm:w-3.5" />
                    </a>
                    <Link
                      href="/projects"
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-gold/50 px-3 py-2 text-xs font-semibold text-gold-dark transition-colors hover:border-gold hover:text-primary pointer-coarse:min-h-11 sm:flex-none sm:gap-1.5 sm:border-0 sm:px-0 sm:py-0 sm:text-sm sm:underline sm:decoration-gold sm:decoration-2 sm:underline-offset-[6px] lg:text-gold lg:hover:text-white"
                    >
                      All work
                      <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
