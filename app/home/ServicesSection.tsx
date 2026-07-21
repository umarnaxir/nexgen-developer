"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { homeServices, type HomeService } from "./data";

function ServiceCard({ service, index }: { service: HomeService; index: number }) {
  const ServiceIcon = service.icon;

  return (
    <article className="group relative h-[min(52vh,390px)] w-[90vw] min-w-[280px] max-w-[640px] shrink-0 overflow-hidden rounded-2xl bg-neutral-900 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.4)] transition-[transform,box-shadow] duration-500 ease-out will-change-transform hover:-translate-y-1 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.5)] sm:h-[min(56vh,480px)] sm:w-[70vw] sm:max-w-[720px] lg:h-[min(64vh,660px)] lg:w-[calc(54vw-1.5rem)] lg:max-w-[880px]">
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 54vw"
        priority={index < 2}
      />

      {/* Readability gradient — softens on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Content pinned to bottom */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-110 sm:h-9 sm:w-9">
            <ServiceIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="text-[10px] font-medium tabular-nums tracking-[0.2em] text-white/45">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-tight tracking-[-0.02em] text-white transition-transform duration-500 ease-out group-hover:translate-y-[-2px] sm:mt-4 sm:text-2xl lg:text-[1.75rem]">
          {service.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 max-w-lg text-[12px] leading-relaxed text-white/65 sm:mt-2 sm:line-clamp-3 sm:text-sm">
          {service.description}
        </p>

        <ul className="mt-3 hidden flex-wrap gap-1.5 sm:mt-4 sm:flex">
          {service.highlights.map((highlight) => (
            <li key={highlight}>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-white/85 backdrop-blur-sm">
                <Sparkles className="h-2.5 w-2.5" />
                {highlight}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={service.href}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-300 hover:gap-2.5 sm:mt-5"
        >
          Explore service
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current || !trackRef.current || !viewportRef.current) {
      return;
    }

    const getScrollAmount = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return 0;
      return Math.max(track.scrollWidth - viewport.offsetWidth, 0);
    };

    const updateProgress = (progress: number) => {
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.max(progress, 0.015)})`;
      }
    };

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.max(getScrollAmount(), window.innerHeight * 0.5)}`,
          pin: pinRef.current,
          scrub: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => updateProgress(self.progress),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-light relative text-black"
      aria-label="Services"
    >
      <div
        ref={pinRef}
        className="relative flex min-h-[100svh] flex-col justify-center px-4 pb-8 pt-[calc(var(--mobile-nav-height)+1.5rem)] sm:px-6 sm:pb-10 sm:pt-[calc(var(--mobile-nav-height)+1.75rem)] lg:h-[100svh] lg:px-14 lg:pb-10 lg:pt-14"
      >
        <div className="mx-auto mb-5 flex w-full max-w-7xl shrink-0 items-end justify-between gap-6 sm:mb-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
              Services
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-black sm:text-4xl lg:text-5xl">
              Everything you need to launch and scale.
            </h2>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="text-sm tabular-nums text-black/45">
              {String(homeServices.length).padStart(2, "0")} services
            </span>
            <div className="h-px w-28 overflow-hidden bg-black/10 sm:w-40">
              <div
                ref={progressRef}
                className="h-full origin-left bg-black"
                style={{ transform: "scaleX(0.015)" }}
              />
            </div>
          </div>
        </div>

        <div ref={viewportRef} className="services-viewport overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-2.5 will-change-transform sm:gap-3 lg:gap-4">
            {homeServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-5 flex w-full max-w-7xl shrink-0 justify-end sm:mt-6">
          <Link
            href="/services"
            className="text-sm font-semibold text-teal-600 underline decoration-teal-500/80 decoration-2 underline-offset-[6px] transition-colors hover:text-teal-700 hover:decoration-teal-600 sm:text-[15px]"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}
