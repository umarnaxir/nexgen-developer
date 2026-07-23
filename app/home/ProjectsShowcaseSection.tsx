"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { projects } from "@/app/projects/data";

const HOME_PROJECT_IDS = [11, 12, 13, 14, 15];

function formatTitle(title: string) {
  return title.split(" - ")[0] ?? title;
}

function progressToIndex(progress: number, total: number) {
  if (total <= 1) return 0;
  return Math.min(Math.round(Math.min(Math.max(progress, 0), 1) * (total - 1)), total - 1);
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProjectsShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const featured = useMemo(
    () =>
      HOME_PROJECT_IDS.map((id) => projects.find((p) => p.id === id)).filter(
        (p): p is (typeof projects)[number] => Boolean(p)
      ),
    []
  );

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
  const techPreview = active.technologies.slice(0, 5);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-dark relative bg-black text-white"
      aria-label="Featured projects"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] flex-col px-4 pb-6 pt-[calc(var(--mobile-nav-height)+1rem)] sm:px-6 sm:pb-8 sm:pt-[calc(var(--mobile-nav-height)+1.25rem)] lg:px-14 lg:pb-10 lg:pt-12"
      >
        {/* Header */}
        <div className="mx-auto flex w-full max-w-7xl shrink-0 items-end justify-between gap-4 lg:pr-12">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
              Selected Work
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
              Projects that ship.
            </h2>
          </div>

          <span className="font-mono text-sm tabular-nums text-white/50">
            <span className="text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
            <span className="mx-1 text-white/25">/</span>
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Stage */}
        <div className="relative mx-auto mt-4 flex min-h-0 w-full max-w-7xl flex-1 flex-col gap-3 sm:mt-5 sm:gap-4 lg:mt-8 lg:flex-row lg:gap-10 lg:pr-14">
          {/* Image stage — stacked cards so scroll never flashes empty */}
          <div className="relative h-[52vh] min-h-[300px] w-full flex-none overflow-hidden rounded-2xl bg-neutral-900 sm:h-[54vh] sm:min-h-[340px] lg:h-auto lg:min-h-0 lg:flex-[1.63]">
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

          {/* Right panel: scoreboard (desktop only) + content */}
          <div className="flex min-h-0 shrink-0 flex-col lg:w-[min(36%,400px)] lg:shrink-0">
            {/* Scoreboard — desktop only */}
            <ul className="mb-5 hidden shrink-0 flex-col gap-1.5 border-b border-white/10 pb-5 lg:flex">
              {featured.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => goToIndex(index)}
                      className={`group flex w-full items-center justify-between gap-3 py-1 text-left transition-all duration-300 ${
                        isActive ? "opacity-100" : "opacity-40 hover:opacity-70"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <span
                          className={`font-mono text-[10px] tabular-nums tracking-wider transition-colors ${
                            isActive ? "text-white/60" : "text-white/30"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`truncate text-sm tracking-wide transition-all duration-300 sm:text-[15px] ${
                            isActive
                              ? "font-semibold text-white"
                              : "font-medium text-white/70 group-hover:text-white"
                          }`}
                        >
                          {formatTitle(project.title)}
                        </span>
                      </span>
                      <span
                        className={`h-px transition-all duration-400 ${
                          isActive ? "w-8 bg-white" : "w-0 bg-white/0 group-hover:w-4 group-hover:bg-white/30"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Content — pinned to bottom on desktop */}
            <div className="flex flex-col justify-end pt-1 lg:mt-auto lg:pt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${active.id}`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex flex-col"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
                    {active.category}
                  </p>
                  <h3 className="mt-1.5 text-[1.45rem] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:mt-2 sm:text-3xl lg:text-[2.05rem]">
                    {title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55 sm:mt-3.5 sm:line-clamp-4 sm:text-[15px]">
                    {active.description}
                  </p>

                  <ul className="mt-2.5 flex flex-nowrap gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-4 sm:flex-wrap [&::-webkit-scrollbar]:hidden">
                    {techPreview.map((tech) => (
                      <li
                        key={tech}
                        className="shrink-0 rounded-full bg-white/[0.08] px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-white/55 sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.12em]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-row items-center gap-2 sm:mt-6 sm:gap-3">
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-black transition-transform hover:scale-[1.03] active:scale-[0.98] sm:flex-none sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                    >
                      View live
                      <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <Link
                      href="/projects"
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-white/25 px-3 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-white/45 hover:text-white sm:flex-none sm:gap-1.5 sm:border-0 sm:px-0 sm:py-0 sm:text-sm sm:underline sm:decoration-white/30 sm:decoration-2 sm:underline-offset-[6px]"
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

        {/* Vertical scroll indicator — desktop only */}
        <div
          className="pointer-events-none absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center lg:flex"
          aria-label="Project scroll"
        >
          <div className="flex flex-col items-center">
            {/* Tail */}
            <span className="h-8 w-px bg-gradient-to-b from-transparent to-white/40 sm:h-10" aria-hidden />

            <div className="pointer-events-auto my-3 flex flex-col items-center gap-2.5">
              {featured.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => goToIndex(index)}
                    aria-label={`Go to project ${index + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group flex h-3 w-3 items-center justify-center"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive
                          ? "h-2 w-2 bg-white"
                          : "h-1.5 w-1.5 bg-white/30 group-hover:bg-white/55"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Shaft + head pointing down */}
            <span className="h-8 w-px bg-gradient-to-b from-white/40 to-white/70 sm:h-10" aria-hidden />
            <svg
              viewBox="0 0 12 10"
              className="mt-0.5 h-2.5 w-3 text-white/80"
              fill="none"
              aria-hidden
            >
              <path
                d="M1 1.5 L6 8.5 L11 1.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
