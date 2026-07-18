"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { homeServices, type HomeService } from "./data";

function ServiceCardContentDesktop({ service, index }: { service: HomeService; index: number }) {
  const ServiceIcon = service.icon;

  return (
    <div className="flex h-full min-h-0 flex-col bg-white p-5">
      <div className="flex items-start justify-between gap-2">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10 text-teal-600">
          <ServiceIcon className="h-4 w-4" />
        </span>
        <span className="text-[10px] font-medium tabular-nums tracking-[0.2em] text-black/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-3 text-[1.05rem] font-semibold leading-tight tracking-[-0.02em] text-black">
        {service.title}
      </h3>
      <p className="mt-2 line-clamp-5 text-[13px] leading-relaxed text-black/60">
        {service.description}
      </p>

      <ul className="mt-4 flex flex-col gap-1.5">
        {service.highlights.map((highlight) => (
          <li key={highlight}>
            <span className="inline-flex items-center gap-1 rounded-full border border-teal-500/15 bg-teal-500/[0.08] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-teal-700">
              <Sparkles className="h-2.5 w-2.5" />
              {highlight}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={service.href}
        className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-teal-600 transition-all hover:gap-2.5 hover:text-teal-700"
      >
        Explore service
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function ServiceCard({ service, index }: { service: HomeService; index: number }) {
  return (
    <article className="premium-card-dark flex h-[min(58vh,460px)] w-[82vw] min-w-[260px] max-w-[560px] shrink-0 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65)] sm:w-[60vw] lg:h-[min(64vh,660px)] lg:w-[calc(58vw-2rem)] lg:max-w-[920px] lg:flex-row">
      <div className="relative min-h-0 flex-[1.45] overflow-hidden bg-neutral-900 lg:h-full lg:w-[75%] lg:flex-none">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 82vw, 42vw"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:hidden" />
        <span className="absolute left-4 top-4 text-[11px] font-medium uppercase tracking-[0.25em] text-white/70 lg:hidden">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex shrink-0 flex-col bg-white px-4 py-3 lg:hidden">
        <h3 className="text-base font-semibold leading-tight tracking-[-0.02em] text-black">
          {service.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-black/60">
          {service.description}
        </p>
        <Link
          href={service.href}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-all hover:gap-2 hover:text-teal-700"
        >
          Explore service
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="hidden w-[25%] shrink-0 lg:block">
        <ServiceCardContentDesktop service={service} index={index} />
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
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          gsap.to(trackRef.current, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${Math.max(getScrollAmount(), window.innerHeight * 0.5)}`,
              pin: pinRef.current,
              scrub: 1.1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => updateProgress(self.progress),
            },
          });
        },
        "(max-width: 1023px)": () => {
          gsap.to(trackRef.current, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${Math.max(getScrollAmount(), window.innerHeight * 0.5)}`,
              pin: pinRef.current,
              scrub: 1.1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => updateProgress(self.progress),
            },
          });
        },
      });
    }, sectionRef);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-dark relative overflow-hidden text-white"
      aria-label="Services"
    >
      <div
        ref={pinRef}
        className="relative flex h-auto min-h-[100svh] flex-col justify-center px-4 py-8 sm:px-6 sm:py-10 lg:h-[92vh] lg:px-14 lg:py-10"
      >
        <div className="container mx-auto mb-8 flex max-w-7xl shrink-0 items-end justify-between gap-6 sm:mb-10">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
              Services
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Everything you need to launch and scale.
            </h2>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="text-sm tabular-nums text-white/45">
              {String(homeServices.length).padStart(2, "0")} services
            </span>
            <div className="h-px w-28 overflow-hidden bg-white/10 sm:w-40">
              <div
                ref={progressRef}
                className="h-full origin-left bg-white transition-transform duration-150"
                style={{ transform: "scaleX(0.015)" }}
              />
            </div>
          </div>
        </div>

        <div ref={viewportRef} className="services-viewport overflow-hidden">
          <div ref={trackRef} className="flex w-max gap-5 will-change-transform sm:gap-6 lg:gap-7">
            {homeServices.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
