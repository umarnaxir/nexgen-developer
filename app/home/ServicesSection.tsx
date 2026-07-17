"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { homeServices } from "./data";

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

    const ctx = gsap.context(() => {
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
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${Math.max(self.progress, 0.015)})`;
            }
          },
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
        className="relative flex h-auto min-h-[100svh] flex-col justify-center px-4 py-8 sm:px-6 sm:py-10 lg:h-[92vh] lg:px-14"
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
          <div
            ref={trackRef}
            className="flex w-max gap-5 will-change-transform sm:gap-6 lg:gap-7"
          >
            {homeServices.map((service, index) => (
              <article
                key={service.title}
                className="premium-card-dark group flex h-[min(58vh,460px)] w-[82vw] min-w-[260px] max-w-[560px] shrink-0 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65)] sm:w-[60vw] lg:h-[min(54vh,520px)] lg:w-[calc(47.5vw-2rem)]"
              >
                <div className="relative min-h-[42%] flex-1 overflow-hidden bg-neutral-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 80vw, 45vw"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className="absolute left-5 top-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex shrink-0 flex-col p-6 sm:p-7">
                  <h3 className="text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/45 sm:text-[15px]">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-all hover:gap-3 hover:text-white"
                  >
                    Explore service
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
