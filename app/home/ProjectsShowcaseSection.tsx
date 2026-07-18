"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { projects } from "@/app/projects/data";

function formatTitle(title: string) {
  return title.split(" – ")[0] ?? title;
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
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projects.length;

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current) return;

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

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: getPinStart,
        end: () => `+=${getScrollDistance()}`,
        pin: pinRef.current,
        scrub: 1.65,
        anticipatePin: 1,
        snap: {
          snapTo: (value) => {
            const step = 1 / (total - 1);
            return Math.round(value / step) * step;
          },
          duration: { min: 0.45, max: 0.95 },
          delay: 0.12,
          ease: "power3.inOut",
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const rawIndex = mapScrollToRawIndex(progress, total);
          const index = Math.min(Math.round(rawIndex), total - 1);
          setActiveIndex(index);

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

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-light relative text-black"
      aria-label="Featured projects"
    >
      <div
        ref={pinRef}
        className="relative flex h-[100svh] flex-col px-4 pb-4 pt-[calc(var(--mobile-nav-height)+0.75rem)] sm:px-6 sm:pb-5 lg:h-[96vh] lg:px-14 lg:py-5"
      >
        <div className="container mx-auto flex h-full max-w-7xl flex-col">
          <div className="sticky top-[var(--mobile-nav-height)] z-10 -mx-4 mb-4 flex shrink-0 items-end justify-between gap-4 border-b border-black/[0.06] bg-white/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:mb-4 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
              Selected Work
            </span>
            <div className="flex items-center gap-4">
              <span className="text-sm tabular-nums text-black/45">
                {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <div className="h-px w-28 overflow-hidden bg-black/10 sm:w-40">
                <div
                  ref={progressRef}
                  className="h-full origin-left bg-black transition-transform duration-150"
                  style={{ transform: "scaleX(0.015)" }}
                />
              </div>
            </div>
          </div>

          <div className="relative min-h-0 flex-1">
            {projects.map((project, index) => {
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
                  <div className="premium-card-light relative h-full overflow-hidden rounded-xl border border-black/[0.06] shadow-[0_32px_80px_-36px_rgba(0,0,0,0.16)]">
                    <Image
                      src={project.image}
                      alt={title}
                      fill
                      className="object-cover object-center"
                      sizes="100vw"
                      priority={index === 0}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />

                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 px-5 py-5 sm:px-8 sm:py-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8 lg:px-10 lg:py-8">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl lg:text-2xl lg:leading-tight">
                          {title}
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/75 sm:line-clamp-3 lg:mt-2 lg:max-w-2xl lg:text-[15px] lg:leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 justify-end">
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-white transition-all hover:gap-3 hover:text-white/90 sm:text-sm lg:text-base"
                        >
                          View project
                          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
