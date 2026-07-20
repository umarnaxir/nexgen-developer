"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import { deriveOverview } from "../lib/derive-overview";

interface ServiceOverviewSectionProps {
  description: string;
}

function OverviewCard({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-neutral-950 p-5 text-left shadow-[0_24px_56px_-36px_rgba(0,0,0,0.35)] sm:p-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-teal-400/15 blur-2xl transition-opacity group-hover:opacity-100"
      />

      <div className="relative flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold tabular-nums tracking-[0.22em] text-teal-300/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px flex-1 bg-white/10 transition-colors group-hover:bg-teal-400/30" />
      </div>

      <h3 className="relative mt-5 text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
        {title}
      </h3>
      <p className="relative mt-2 text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
        {text}
      </p>
    </motion.article>
  );
}

/**
 * Compact service overview: short lead + three punchy pillars.
 * Mobile: carousel. Desktop: 3-column grid (unchanged).
 */
export default function ServiceOverviewSection({ description }: ServiceOverviewSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { lead, points } = useMemo(() => deriveOverview(description), [description]);

  const goTo = useCallback(
    (index: number) => {
      if (points.length === 0) return;
      setActiveSlide((index + points.length) % points.length);
    },
    [points.length]
  );

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        immediateRender: false,
      });

      gsap.from(gridRef.current?.children ?? [], {
        scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        y: 32,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        immediateRender: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [points.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.children[activeSlide] as HTMLElement | undefined;
    slide?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeSlide]);

  return (
    <section
      ref={sectionRef}
      className="section-light border-t border-black/[0.06] section-y"
    >
      <div className="section-container">
        <div ref={headerRef} className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-black">
            What we deliver
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-black/50 sm:text-base">
            {lead}
          </p>
        </div>

        {/* Mobile carousel */}
        <div className="mt-10 sm:hidden">
          <div
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            onScroll={(event) => {
              const el = event.currentTarget;
              const slideWidth = el.clientWidth * 0.88 + 12;
              const next = Math.round(el.scrollLeft / slideWidth);
              if (next !== activeSlide && next >= 0 && next < points.length) {
                setActiveSlide(next);
              }
            }}
          >
            {points.map((point, index) => (
              <div
                key={point.title}
                className="w-[88%] shrink-0 snap-center"
              >
                <OverviewCard title={point.title} text={point.text} index={index} />
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 px-0.5">
            <div className="flex items-center gap-1.5">
              {points.map((point, index) => (
                <button
                  key={point.title}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => goTo(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeSlide === index ? "w-6 bg-teal-600" : "w-1.5 bg-black/15"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                aria-label="Previous overview card"
                onClick={() => goTo(activeSlide - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/50"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next overview card"
                onClick={() => goTo(activeSlide + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/50"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop / tablet grid — unchanged */}
        <div
          ref={gridRef}
          className="mt-10 hidden gap-3 sm:mt-12 sm:grid sm:grid-cols-3 sm:gap-4 lg:mt-14 lg:gap-5"
        >
          {points.map((point, index) => (
            <OverviewCard
              key={point.title}
              title={point.title}
              text={point.text}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
