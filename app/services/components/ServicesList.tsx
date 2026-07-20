"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsapPlugins, ScrollTrigger } from "@/lib/gsap/register";
import { servicesForListing } from "../data";
import type { ServiceCategory } from "../config";
import ServiceCard from "./ServiceCard";

const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  development: "Development",
  "digital-marketing": "Digital Marketing",
  support: "Support",
};

const CATEGORIES: ServiceCategory[] = ["development", "digital-marketing", "support"];

export default function ServicesList() {
  const [activeTab, setActiveTab] = useState<ServiceCategory>("development");

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const filteredServices = servicesForListing.filter((s) => s.category === activeTab);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current || !pinRef.current || !trackRef.current || !viewportRef.current) {
      return;
    }

    gsap.set(trackRef.current, { x: 0 });
    if (progressRef.current) {
      progressRef.current.style.transform = "scaleX(0.015)";
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

    let nestedRaf = 0;
    const refreshRaf = requestAnimationFrame(() => {
      nestedRaf = requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      cancelAnimationFrame(refreshRaf);
      cancelAnimationFrame(nestedRaf);
      ctx.revert();
    };
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="services-list"
      className="section-dark relative text-white"
      aria-label="Services listing"
    >
      <div
        ref={pinRef}
        className="relative flex h-auto min-h-[100svh] flex-col justify-center px-4 py-8 sm:px-6 sm:py-10 lg:h-[92vh] lg:px-14 lg:py-10"
      >
        <div className="mx-auto mb-5 flex w-full max-w-7xl shrink-0 flex-col gap-4 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-white/40">
              What we offer
            </span>
            <h2
              id="services-list-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
            >
              Our services
            </h2>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <div
              className="flex max-w-full flex-nowrap gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="tablist"
              aria-label="Service categories"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === category}
                  aria-controls={`tabpanel-${category}`}
                  id={`tab-${category}`}
                  onClick={() => setActiveTab(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                    activeTab === category
                      ? "bg-white text-black"
                      : "border border-white/15 bg-white/5 text-white/55 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {CATEGORY_LABELS[category]}
                </button>
              ))}
            </div>

            <div className="hidden items-center gap-4 sm:flex">
              <span className="text-sm tabular-nums text-white/45">
                {String(filteredServices.length).padStart(2, "0")} services
              </span>
              <div className="h-px w-28 overflow-hidden bg-white/10 sm:w-40">
                <div
                  ref={progressRef}
                  className="h-full origin-left bg-white"
                  style={{ transform: "scaleX(0.015)" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="services-viewport overflow-hidden"
          role="tabpanel"
          id={`tabpanel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          <div ref={trackRef} className="flex w-max gap-5 will-change-transform sm:gap-6 lg:gap-7">
            {filteredServices.map((service, index) => (
              <ServiceCard key={service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
