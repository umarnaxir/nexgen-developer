"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { projects } from "@/app/projects/data";
import ProjectTechStackPanel from "./ProjectTechStackPanel";

function formatTitle(title: string) {
  return title.split(" – ")[0] ?? title;
}

function formatCategory(category: string) {
  return category.replace(/ Website| Platform| System| Store/g, "");
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
        className="relative flex h-[100svh] flex-col px-4 pb-4 pt-[calc(var(--mobile-nav-height)+0.75rem)] sm:px-6 sm:pb-5 lg:h-[90vh] lg:px-14 lg:py-6"
      >
        <div className="container mx-auto flex h-full max-w-7xl flex-col">
          <div className="sticky top-[var(--mobile-nav-height)] z-10 -mx-4 mb-4 flex shrink-0 items-end justify-between gap-4 border-b border-black/[0.06] bg-white/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:mb-6 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0">
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
              const category = formatCategory(project.category);
              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    slidesRef.current[index] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                  aria-hidden={activeIndex !== index}
                >
                  <div className="premium-card-light group flex h-full flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-[0_32px_80px_-36px_rgba(0,0,0,0.16)] lg:flex-row">
                    <div className="relative order-1 min-h-[58%] flex-[1.15] overflow-hidden bg-neutral-100 sm:min-h-[52%] lg:order-2 lg:min-h-0 lg:w-[65%] lg:flex-none">
                      <Image
                        src={project.image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 65vw"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent lg:bg-gradient-to-l lg:from-black/25 lg:via-transparent lg:to-transparent" />
                    </div>

                    <div className="order-2 flex h-full min-h-0 w-full flex-col bg-black lg:order-1 lg:w-[35%]">
                      <div className="flex min-h-0 flex-1 flex-col overflow-hidden p-5 sm:p-8 lg:p-10 lg:pb-6">
                        <div className="shrink-0">
                          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/45 sm:text-[11px] sm:tracking-[0.25em]">
                            {category}
                          </span>
                          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-white sm:mt-4 sm:text-3xl lg:text-[2.15rem] lg:leading-[1.08] xl:text-[2.5rem]">
                            {title}
                          </h3>
                        </div>

                        <p className="mt-3 line-clamp-2 shrink-0 text-sm leading-snug text-white/60 sm:mt-4 sm:line-clamp-3 sm:text-base sm:leading-relaxed lg:line-clamp-4 lg:text-[15px]">
                          {project.description}
                        </p>

                        <div className="mt-auto hidden min-h-0 shrink-0 pt-4 lg:block">
                          <ProjectTechStackPanel
                            technologies={project.technologies}
                            link={project.link}
                            isActive={activeIndex === index}
                            variant="dark"
                          />
                        </div>
                      </div>

                      <div className="shrink-0 border-t border-white/10 px-5 py-4 sm:px-8 lg:px-10 lg:py-5">
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold text-white/75 transition-all hover:gap-3 hover:text-white sm:text-sm lg:text-base"
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
