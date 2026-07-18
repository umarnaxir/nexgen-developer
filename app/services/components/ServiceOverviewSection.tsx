"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";

interface ServiceOverviewSectionProps {
  description: string;
}

function splitDescriptionBlocks(text: string): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  const blocks: string[] = [];

  for (let i = 0; i < sentences.length; i += 2) {
    blocks.push(sentences.slice(i, i + 2).join(" ").trim());
  }

  return blocks.filter(Boolean);
}

export default function ServiceOverviewSection({ description }: ServiceOverviewSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<HTMLDivElement>(null);

  const blocks = useMemo(() => splitDescriptionBlocks(description), [description]);

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
      });

      gsap.from(blocksRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: blocksRef.current,
          start: "top 85%",
        },
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.6,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [blocks.length]);

  return (
    <section ref={sectionRef} className="section-light py-14 sm:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          <div ref={leftRef} className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex gap-4">
              <div className="relative hidden w-px shrink-0 bg-black/[0.08] sm:block">
                <div
                  ref={progressRef}
                  className="absolute inset-x-0 top-0 h-full origin-top bg-teal-600"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>

              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
                  Overview
                </span>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl lg:text-4xl">
                  What we deliver
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-black/45">
                  Scroll to explore how we approach this service end to end.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
                  {String(blocks.length).padStart(2, "0")} sections
                </span>
              </div>
            </div>
          </div>

          <div ref={blocksRef} className="space-y-4">
            {blocks.map((block, index) => (
              <motion.div
                key={`${index}-${block.slice(0, 24)}`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="group rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_16px_48px_-36px_rgba(0,0,0,0.12)] transition-colors hover:border-teal-500/25 sm:p-6"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-[10px] font-semibold tabular-nums tracking-[0.2em] text-black/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-black/[0.06] transition-colors group-hover:bg-teal-500/20" />
                </div>
                <p className="text-[15px] leading-[1.85] text-black/60 transition-colors group-hover:text-black/75 sm:text-base">
                  {block}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
