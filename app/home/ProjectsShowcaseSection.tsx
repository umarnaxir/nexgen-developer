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

function progressToRawIndex(progress: number, total: number) {
  if (total <= 1) return 0;
  return Math.min(Math.max(progress, 0), 1) * (total - 1);
}

/** Horizontal clip-path wipe + parallax — replaces the old opacity/scale crossfade. */
function slideVisual(rawIndex: number, index: number) {
  const delta = rawIndex - index;
  const distance = Math.abs(delta);

  if (distance >= 1) {
    const past = delta > 0;
    return {
      opacity: 0,
      xPercent: past ? -10 : 10,
      yPercent: past ? -4 : 4,
      clipPath: past ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
      filter: "blur(10px)",
      zIndex: 1,
    };
  }

  const t = 1 - distance;
  const smooth = t * t * (3 - 2 * t);
  const past = delta >= 0;
  const left = past ? (1 - smooth) * 100 : 0;
  const right = past ? 0 : (1 - smooth) * 100;

  return {
    opacity: 1,
    xPercent: (1 - smooth) * (past ? -8 : 8),
    yPercent: (1 - smooth) * (past ? -3 : 3),
    clipPath: `inset(0 ${right}% 0 ${left}%)`,
    filter: `blur(${(1 - smooth) * 8}px)`,
    zIndex: smooth > 0.5 ? 3 : smooth > 0.05 ? 2 : 1,
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
      className="pointer-events-auto relative h-[9.5rem] w-[14rem] xl:h-[12rem] xl:w-[18rem]"
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
                  className="absolute inset-0 flex items-center justify-center font-mono text-[7rem] font-bold leading-none tracking-tighter xl:text-[9rem]"
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
  const mobilePinRef = useRef<HTMLDivElement>(null);
  const desktopPinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mobileSlidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const desktopSlidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileProgressRef = useRef<HTMLDivElement>(null);
  const desktopProgressRef = useRef<HTMLDivElement>(null);
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
    const stage = stageRef.current;
    if (!stage) return;

    const onMove = (event: MouseEvent) => {
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
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
    if (prefersReducedMotion || !sectionRef.current || total <= 1) return;

    const applySlides = (slides: (HTMLDivElement | null)[], rawIndex: number) => {
      slides.forEach((slide, i) => {
        if (!slide) return;
        const { opacity, xPercent, yPercent, clipPath, filter, zIndex } = slideVisual(rawIndex, i);
        gsap.set(slide, {
          opacity,
          xPercent,
          yPercent,
          clipPath,
          filter,
          zIndex,
        });
      });
    };

    const syncIndex = (progress: number, progressEl: HTMLDivElement | null) => {
      const rawIndex = progressToRawIndex(progress, total);
      const index = Math.min(Math.round(rawIndex), total - 1);

      if (index !== activeIndexRef.current) {
        activeIndexRef.current = index;
        setActiveIndex(index);
      }

      if (progressEl) {
        progressEl.style.transform = `scaleX(${Math.max(progress, 0.02)})`;
      }

      return rawIndex;
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(max-width: 1023px)": () => {
          mobileSlidesRef.current.forEach((slide, index) => {
            if (!slide) return;
            gsap.set(slide, {
              opacity: index === 0 ? 1 : 0,
              xPercent: 0,
              yPercent: 0,
              clipPath: index === 0 ? "inset(0 0% 0 0%)" : "inset(0 0 0 100%)",
              filter: "blur(0px)",
              zIndex: index === 0 ? 3 : 1,
            });
          });

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top+=4rem",
            end: () => `+=${(total - 1) * window.innerHeight * 1.38}`,
            pin: mobilePinRef.current,
            scrub: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const rawIndex = syncIndex(self.progress, mobileProgressRef.current);
              applySlides(mobileSlidesRef.current, rawIndex);
            },
          });
        },
        "(min-width: 1024px)": () => {
          desktopSlidesRef.current.forEach((slide, index) => {
            if (!slide) return;
            gsap.set(slide, {
              opacity: index === 0 ? 1 : 0,
              xPercent: 0,
              yPercent: 0,
              clipPath: index === 0 ? "inset(0 0% 0 0%)" : "inset(0 0 0 100%)",
              filter: "blur(0px)",
              zIndex: index === 0 ? 3 : 1,
            });
          });

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${(total - 1) * window.innerHeight * 1.15}`,
            pin: desktopPinRef.current,
            scrub: 0.35,
            pinSpacing: true,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const rawIndex = syncIndex(self.progress, desktopProgressRef.current);
              applySlides(desktopSlidesRef.current, rawIndex);
            },
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
    <section ref={sectionRef} id="projects" aria-label="Featured projects">
      {/* ── Mobile / tablet: original card layout ── */}
      <div className="section-light relative text-black lg:hidden">
        <div
          ref={mobilePinRef}
          className="section-container relative flex h-[100svh] flex-col pb-4 pt-[calc(var(--mobile-nav-height)+0.75rem)] sm:pb-5"
        >
          <div className="flex h-full w-full flex-col">
            <div className="z-10 mb-3 flex shrink-0 items-end justify-between gap-4 border-b border-black/[0.06] bg-white/95 py-3 backdrop-blur-md sm:mb-4">
              <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
                Selected Work
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm tabular-nums text-black/45">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <div className="hidden h-px w-28 overflow-hidden rounded-full bg-black/10 sm:block sm:w-36">
                  <div
                    ref={mobileProgressRef}
                    className="h-full origin-left rounded-full bg-gradient-to-r from-teal-600 to-black"
                    style={{ transform: "scaleX(0.02)" }}
                  />
                </div>
              </div>
            </div>

            <div className="relative min-h-0 flex-1">
              {featured.map((project, index) => {
                const projectTitle = formatTitle(project.title);

                return (
                  <div
                    key={`m-${project.id}`}
                    ref={(el) => {
                      mobileSlidesRef.current[index] = el;
                    }}
                    className="absolute inset-0 will-change-transform"
                    aria-hidden={activeIndex !== index}
                  >
                    <article className="premium-card-light group relative h-full overflow-hidden rounded-2xl border border-black/10 bg-neutral-950 shadow-[0_36px_90px_-40px_rgba(0,0,0,0.28)] sm:rounded-[1.5rem]">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-[1] block"
                        aria-label={`Open ${projectTitle} live project`}
                      >
                        <Image
                          src={project.image}
                          alt={projectTitle}
                          fill
                          className="object-cover object-center"
                          sizes="100vw"
                          priority={index === 0}
                        />
                      </a>

                      {/* Black shadow layer over image */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/80 to-black/35"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 z-[2] bg-black/40"
                      />

                      {/* Top meta */}
                      <div className="pointer-events-none absolute left-4 right-4 top-4 z-[4] flex items-start justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80">
                          {project.category}
                        </span>
                        <span className="font-mono text-[11px] font-semibold tabular-nums tracking-wide text-white/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Plain text + buttons flex — no glass card */}
                      <div className="absolute inset-x-0 bottom-0 z-[4] flex flex-col gap-4 p-4 sm:gap-5 sm:p-5">
                        <div className="flex min-w-0 flex-col gap-1.5">
                          <h3 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                            {projectTitle}
                          </h3>
                          <p className="line-clamp-2 text-sm leading-relaxed text-white/75">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex w-full items-center gap-2.5">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black active:scale-[0.98]"
                          >
                            View live
                            <ArrowUpRight className="h-4 w-4 shrink-0" />
                          </a>
                          <Link
                            href="/projects"
                            className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full border border-white/40 px-4 py-2.5 text-sm font-medium text-white active:scale-[0.98]"
                          >
                            All work
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop: cinematic layout ── */}
      <div className="relative hidden bg-black text-white lg:block">
        <div ref={desktopPinRef} className="relative h-[100svh] w-full overflow-hidden">
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
                  key={`d-${project.id}`}
                  ref={(el) => {
                    desktopSlidesRef.current[index] = el;
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

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[4] bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.28)_28%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.88)_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[4] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.55)_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[4] bg-black/25"
          />

          <div className="absolute inset-x-0 top-0 z-30 h-[2px] bg-white/10">
            <div
              ref={desktopProgressRef}
              className="h-full origin-left bg-gradient-to-r from-teal-400 via-white to-teal-300"
              style={{ transform: "scaleX(0.02)" }}
            />
          </div>

          <div className="absolute inset-0 z-20 flex flex-col px-10 pb-8 pt-8 xl:px-14">
            <div className="flex shrink-0 items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <motion.span
                  className="relative flex h-2 w-2"
                  animate={{ scale: [1, 1.35, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                >
                  <span className="absolute inset-0 rounded-full bg-teal-400" />
                </motion.span>
                <span className="text-[11px] font-medium uppercase tracking-[0.4em] text-white/70">
                  Selected Work
                </span>
              </div>

              <div className="flex items-baseline gap-1 font-mono text-base tabular-nums text-white/60">
                <span className="text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
                <span className="text-white/30">/</span>
                <span>{String(total).padStart(2, "0")}</span>
              </div>
            </div>

            <div className="pointer-events-none relative mt-5 flex min-h-0 flex-1 items-start pt-4">
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

            <div className="relative z-10 mt-auto flex w-full flex-col gap-5">
              <div className="flex items-end justify-between gap-10">
                <div className="flex min-w-0 flex-1 flex-col gap-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.45, ease }}
                      className="flex max-w-4xl flex-col gap-3"
                    >
                      <h2 className="mix-blend-difference text-[clamp(1.75rem,5.5vw,3.5rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-white">
                        {titleParts.map((word, i) => (
                          <span key={`${word}-${i}`} className="mr-[0.22em] inline-block last:mr-0">
                            {word}
                          </span>
                        ))}
                      </h2>
                      <p className="max-w-4xl text-[15px] leading-relaxed text-white/65">
                        {active.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={active.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:scale-[1.04] hover:bg-teal-50 active:scale-[0.98]"
                    >
                      Launch site
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-white/50 hover:bg-white/10"
                    >
                      All work
                    </Link>
                  </div>
                </div>

                <div className="shrink-0 self-end">
                  <Index3D value={activeIndex} />
                </div>
              </div>

              <div className="relative overflow-hidden border-y border-white/10 py-2.5">
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
      </div>
    </section>
  );
}
