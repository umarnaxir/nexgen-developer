"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { projects } from "@/app/projects/data";

const HOME_PROJECT_IDS = [11, 12, 13, 14, 15];
const DEPTH_LAYERS = 10;

function formatTitle(title: string) {
  return title.split(" - ")[0] ?? title;
}

/** Linear scroll → index. No plateau, so each project settles fully in one scroll beat. */
function progressToRawIndex(progress: number, total: number) {
  if (total <= 1) return 0;
  return Math.min(Math.max(progress, 0), 1) * (total - 1);
}

function slideVisual(rawIndex: number, index: number) {
  const distance = Math.abs(rawIndex - index);

  if (distance >= 1) {
    return { opacity: 0, scale: 1.04, zIndex: 1 };
  }

  // Smoothstep: snaps toward fully clear / fully gone (no washed mid-state linger)
  const t = 1 - distance;
  const opacity = t * t * (3 - 2 * t);
  const scale = 1.04 - opacity * 0.04;

  return {
    opacity,
    scale,
    zIndex: opacity > 0.5 ? 3 : opacity > 0.05 ? 2 : 1,
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

function Index3D({ value }: { value: number }) {
  const label = String(value + 1).padStart(2, "0");
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-28, 28]), { stiffness: 160, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), { stiffness: 160, damping: 18 });

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="pointer-events-auto relative h-[7.5rem] w-[11rem] sm:h-[9.5rem] sm:w-[14rem] lg:h-[12rem] lg:w-[18rem]"
      style={{ perspective: 900 }}
      aria-hidden
    >
      <motion.div
        className="relative h-full w-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={label}
            initial={{ opacity: 0, rotateX: -40, z: -40 }}
            animate={{ opacity: 1, rotateX: 0, z: 0 }}
            exit={{ opacity: 0, rotateX: 35, z: 40 }}
            transition={{ duration: 0.45, ease }}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            {Array.from({ length: DEPTH_LAYERS }, (_, i) => {
              const isFront = i === 0;
              const depth = -i * 3.5;
              return (
                <span
                  key={i}
                  className="absolute inset-0 flex items-center justify-center font-mono text-[5.5rem] font-bold leading-none tracking-tighter sm:text-[7rem] lg:text-[9rem]"
                  style={{
                    transform: `translateZ(${depth}px)`,
                    color: isFront
                      ? "rgba(255,255,255,0.42)"
                      : `rgba(45, 212, 191, ${0.22 - i * 0.018})`,
                    textShadow: isFront
                      ? "0 1px 0 rgba(13,148,136,0.35), 0 6px 18px rgba(0,0,0,0.25)"
                      : undefined,
                    WebkitTextStroke: isFront
                      ? "1px rgba(255,255,255,0.2)"
                      : "1px rgba(45,212,191,0.12)",
                  }}
                >
                  {label}
                </span>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function ProjectsShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
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

  // Subtle stage parallax
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onMove = (event: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      stage.style.setProperty("--parallax-x", `${x}px`);
      stage.style.setProperty("--parallax-y", `${y}px`);
    };

    const onLeave = () => {
      stage.style.setProperty("--parallax-x", "0px");
      stage.style.setProperty("--parallax-y", "0px");
    };

    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current || total <= 1) return;

    const getScrollDistance = () => (total - 1) * window.innerHeight * 1.15;
    const getPinStart = () =>
      window.matchMedia("(max-width: 1023px)").matches ? "top top+=4rem" : "top top";

    const ctx = gsap.context(() => {
      slidesRef.current.forEach((slide, index) => {
        if (!slide) return;
        gsap.set(slide, {
          opacity: index === 0 ? 1 : 0,
          scale: 1,
          zIndex: index === 0 ? 3 : 1,
        });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: getPinStart,
        end: () => `+=${getScrollDistance()}`,
        pin: pinRef.current,
        scrub: 0.35,
        pinSpacing: true,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const rawIndex = progressToRawIndex(progress, total);
          const index = Math.min(Math.round(rawIndex), total - 1);

          if (index !== activeIndexRef.current) {
            activeIndexRef.current = index;
            setActiveIndex(index);
          }

          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${Math.max(progress, 0.02)})`;
          }

          slidesRef.current.forEach((slide, i) => {
            if (!slide) return;
            const { opacity, scale, zIndex } = slideVisual(rawIndex, i);
            gsap.set(slide, { opacity, scale, zIndex });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [total]);

  if (total === 0 || !active) return null;

  const title = formatTitle(active.title);
  const titleParts = title.split(" ");

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-black text-white"
      aria-label="Featured projects"
    >
      <div ref={pinRef} className="relative h-[100svh] w-full overflow-hidden">
        {/* Full-bleed slides */}
        <div
          ref={stageRef}
          className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: "translate3d(var(--parallax-x, 0px), var(--parallax-y, 0px), 0) scale(1.04)",
          }}
        >
          {featured.map((project, index) => {
            const projectTitle = formatTitle(project.title);
            return (
              <div
                key={project.id}
                ref={(el) => {
                  slidesRef.current[index] = el;
                }}
                className="absolute inset-0 will-change-transform"
                aria-hidden={activeIndex !== index}
              >
                <Image
                  src={project.image}
                  alt={projectTitle}
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            );
          })}
        </div>

        {/* Cinematic grade — stronger bottom fade on mobile for readable content */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,transparent_22%,transparent_42%,rgba(0,0,0,0.88)_100%)] sm:bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,transparent_26%,transparent_58%,rgba(0,0,0,0.78)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.4)_100%)]"
        />

        {/* Top progress */}
        <div className="absolute inset-x-0 top-0 z-30 h-[2px] bg-white/10">
          <div
            ref={progressRef}
            className="h-full origin-left bg-gradient-to-r from-teal-400 via-white to-teal-300"
            style={{ transform: "scaleX(0.02)" }}
          />
        </div>

        {/* UI chrome */}
        <div className="absolute inset-0 z-20 flex flex-col px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[calc(var(--mobile-nav-height)+0.5rem)] sm:px-6 sm:pb-5 lg:px-10 lg:pb-8 lg:pt-8 xl:px-14">
          {/* Top bar */}
          <div className="flex shrink-0 items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.span
                className="relative flex h-2 w-2"
                animate={{ scale: [1, 1.35, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              >
                <span className="absolute inset-0 rounded-full bg-teal-400" />
              </motion.span>
              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 sm:text-[11px] sm:tracking-[0.4em]">
                Selected Work
              </span>
            </div>

            <div className="flex items-baseline gap-1 font-mono text-xs tabular-nums text-white/60 sm:text-sm lg:text-base">
              <span className="text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="text-white/30">/</span>
              <span>{String(total).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Desktop middle rail — hidden on mobile so content can sit at bottom */}
          <div className="pointer-events-none relative mt-4 hidden min-h-0 flex-1 items-start pt-2 lg:mt-5 lg:flex lg:pt-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={`cat-${active.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease }}
                className="origin-bottom-left -rotate-180 text-[12px] font-semibold uppercase tracking-[0.32em] text-white/85 [writing-mode:vertical-rl]"
              >
                {active.category}
              </motion.p>
            </AnimatePresence>

            <ul className="pointer-events-auto ml-auto flex flex-col items-end justify-center gap-3">
              {featured.map((project, index) => {
                const isActive = index === activeIndex;
                return (
                  <li key={project.id}>
                    <span
                      className={`block text-right text-sm tracking-wide transition-all duration-500 ${
                        isActive
                          ? "translate-x-0 scale-100 font-semibold text-white"
                          : "translate-x-1 scale-95 text-white/25"
                      }`}
                    >
                      <span className="mr-2 font-mono text-[10px] text-teal-400/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {formatTitle(project.title)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Spacer on mobile/tablet — pushes content to bottom */}
          <div className="min-h-0 flex-1 lg:hidden" aria-hidden />

          {/* Bottom content — pinned to bottom on all breakpoints */}
          <div className="relative z-10 mt-auto flex w-full flex-col gap-3 sm:gap-4 lg:gap-5">
            <div className="flex items-end justify-between gap-3 sm:gap-6 lg:gap-10">
              <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4 lg:gap-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease }}
                    className="flex w-full max-w-3xl flex-col gap-2 sm:gap-2.5 lg:max-w-4xl lg:gap-3"
                  >
                    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-teal-300 sm:text-[11px] lg:hidden">
                      {active.category}
                    </p>
                    <h2 className="mix-blend-difference text-[clamp(1.5rem,7vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-white">
                      {titleParts.map((word, i) => (
                        <span key={`${word}-${i}`} className="mr-[0.22em] inline-block last:mr-0">
                          {word}
                        </span>
                      ))}
                    </h2>
                    <p className="line-clamp-2 max-w-2xl text-[13px] leading-relaxed text-white/70 sm:line-clamp-none sm:max-w-3xl sm:text-sm sm:text-white/65 lg:max-w-4xl lg:text-[15px]">
                      {active.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* CTAs — full-width & clear on mobile */}
                <div className="flex w-full items-center gap-2.5 sm:w-auto sm:flex-wrap sm:gap-3">
                  <a
                    href={active.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-white px-4 py-3 text-sm font-semibold text-black transition-all active:scale-[0.98] sm:flex-none sm:justify-start sm:px-5 sm:py-2.5 sm:hover:scale-[1.04] sm:hover:bg-teal-50"
                  >
                    Launch site
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <Link
                    href="/projects"
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-black/45 px-4 py-3 text-sm font-medium text-white backdrop-blur-md transition-all active:scale-[0.98] sm:flex-none sm:justify-start sm:border-white/25 sm:bg-black/30 sm:px-5 sm:py-2.5 sm:hover:border-white/50 sm:hover:bg-white/10"
                  >
                    All work
                  </Link>
                </div>
              </div>

              {/* 3D index — bottom right; compact on mobile */}
              <div className="hidden shrink-0 self-end sm:block">
                <Index3D value={activeIndex} />
              </div>
            </div>

            {/* Tech strip — desktop/tablet; keep mobile uncluttered */}
            <div className="relative hidden overflow-hidden border-y border-white/10 py-2.5 sm:block">
              <motion.div
                className="flex w-max gap-8 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex gap-8">
                    {active.technologies.map((tech) => (
                      <span
                        key={`${copy}-${tech}`}
                        className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/40"
                      >
                        {tech}
                        <span className="ml-8 text-teal-400/50">◆</span>
                      </span>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
