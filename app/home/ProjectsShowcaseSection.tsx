"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { projects } from "@/app/projects/data";

/** Featured set for the homepage showcase. */
const HOME_PROJECT_IDS = [11, 12, 13, 14, 15];

function formatTitle(title: string) {
  return title.split(" - ")[0] ?? title;
}

function slideOpacity(rawIndex: number, index: number) {
  const distance = Math.abs(rawIndex - index);
  if (distance <= 0.22) return 1;
  if (distance >= 0.92) return 0;
  return 1 - (distance - 0.22) / 0.7;
}

function mapScrollToRawIndex(progress: number, total: number) {
  if (total <= 1) return 0;

  const segments = total - 1;
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const position = clampedProgress * segments;
  const baseIndex = Math.min(Math.floor(position), segments - 1);
  const local = position - baseIndex;
  const transitionPortion = 0.22;

  if (clampedProgress >= 1) return segments;

  if (local <= transitionPortion) {
    return baseIndex + (local / transitionPortion) * 0.28;
  }

  if (local >= 1 - transitionPortion) {
    const blend = (local - (1 - transitionPortion)) / transitionPortion;
    return Math.min(baseIndex + 0.72 + blend * 0.28, segments);
  }

  return baseIndex + 0.72;
}

export default function ProjectsShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current || total <= 1) return;

    const getScrollDistance = () => (total - 1) * window.innerHeight * 1.38;
    const getPinStart = () =>
      window.matchMedia("(max-width: 1023px)").matches ? "top top+=4rem" : "top top";

    const ctx = gsap.context(() => {
      slidesRef.current.forEach((slide, index) => {
        if (!slide) return;
        gsap.set(slide, {
          opacity: index === 0 ? 1 : 0,
          scale: index === 0 ? 1 : 0.97,
          y: 0,
          zIndex: index === 0 ? 2 : 1,
        });
      });

      // No snap / no auto — only moves while you scroll (1:1 scrub).
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: getPinStart,
        end: () => `+=${getScrollDistance()}`,
        pin: pinRef.current,
        scrub: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        fastScrollEnd: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const rawIndex = mapScrollToRawIndex(progress, total);
          const index = Math.min(Math.round(rawIndex), total - 1);

          if (index !== activeIndexRef.current) {
            activeIndexRef.current = index;
            setActiveIndex(index);
          }

          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${Math.max(progress, 0.015)})`;
          }

          slidesRef.current.forEach((slide, i) => {
            if (!slide) return;

            const opacity = slideOpacity(rawIndex, i);
            const scale = 0.965 + opacity * 0.035;

            gsap.set(slide, {
              opacity,
              scale,
              y: (1 - opacity) * 20,
              zIndex: opacity > 0.5 ? 2 : 1,
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [total]);

  if (total === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-light relative text-black"
      aria-label="Featured projects"
    >
      <div
        ref={pinRef}
        className="section-container relative flex h-[100svh] flex-col pb-4 pt-[calc(var(--mobile-nav-height)+0.75rem)] sm:pb-5 lg:h-[96vh] lg:py-5"
      >
        <div className="flex h-full w-full flex-col">
          <div className="z-10 mb-4 flex shrink-0 items-end justify-between gap-4 border-b border-black/[0.06] bg-white/95 py-3 backdrop-blur-md lg:mb-4 lg:border-0 lg:bg-transparent lg:py-0">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
                Selected Work
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-sm tabular-nums text-black/45">
                {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <div className="hidden h-px w-28 overflow-hidden rounded-full bg-black/10 sm:block sm:w-36">
                <div
                  ref={progressRef}
                  className="h-full origin-left rounded-full bg-gradient-to-r from-teal-600 to-black"
                  style={{ transform: "scaleX(0.015)" }}
                />
              </div>
            </div>
          </div>

          <div className="relative min-h-0 flex-1">
            {featured.map((project, index) => {
              const title = formatTitle(project.title);

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    slidesRef.current[index] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                  aria-hidden={activeIndex !== index}
                >
                  <article className="premium-card-light group relative h-full overflow-hidden rounded-2xl border border-black/10 bg-neutral-950 shadow-[0_36px_90px_-40px_rgba(0,0,0,0.28),inset_0_0_0_1px_rgba(255,255,255,0.06)] sm:rounded-[1.5rem]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit] ring-1 ring-inset ring-white/10"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-[5px] z-[3] rounded-[calc(1rem-2px)] border border-white/[0.08] sm:inset-2 sm:rounded-[1.15rem]"
                    />

                    {/* Clear image — clickable */}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-[1] block"
                      aria-label={`Open ${title} live project`}
                    >
                      <Image
                        src={project.image}
                        alt={title}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                        sizes="100vw"
                        priority={index === 0}
                      />
                    </a>

                    {/* Soft bottom fade only — keeps image clear */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[42%] bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                    />

                    {/* Top meta */}
                    <div className="pointer-events-none absolute left-4 right-4 top-4 z-[4] flex items-start justify-between gap-3 sm:left-6 sm:right-6 sm:top-6">
                      <span className="rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow-sm backdrop-blur-md">
                        {project.category}
                      </span>
                      <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-[11px] font-semibold tabular-nums tracking-wide text-white shadow-sm backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content bar */}
                    <div className="absolute inset-x-0 bottom-0 z-[4] p-3 transition-transform duration-500 group-hover:-translate-y-0.5 sm:p-4 lg:p-5">
                      <div className="rounded-xl border border-white/20 bg-black/50 p-4 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors duration-300 group-hover:border-white/30 group-hover:bg-black/60 sm:rounded-2xl sm:p-5 lg:p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl lg:text-2xl lg:leading-tight">
                              {title}
                            </h3>
                            <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/75 sm:line-clamp-3 lg:mt-2 lg:max-w-2xl lg:text-[15px] lg:leading-relaxed">
                              {project.description}
                            </p>
                          </div>

                          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white px-4 py-2.5 text-xs font-semibold text-black transition-all hover:scale-[1.03] hover:bg-teal-50 active:scale-[0.98] sm:text-sm"
                            >
                              View live
                              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </a>
                            <Link
                              href="/projects"
                              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-medium text-white transition-all hover:scale-[1.03] hover:border-white/40 hover:bg-white/15 active:scale-[0.98] sm:text-sm"
                            >
                              All work
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
