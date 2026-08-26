"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import type { ServiceStat } from "../lib/service-detail-copy";

interface ServiceDetailHeroProps {
  heading: string;
  lead: string;
  stats: ServiceStat[];
  technologies?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServiceDetailHero({
  heading,
  lead,
  stats = [],
  technologies,
}: ServiceDetailHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { open: openContactModal } = useContactModal();
  const reduceMotion = useReducedMotion();

  const techLine = (technologies ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 6)
    .join("  ·  ");

  useEffect(() => {
    registerGsapPlugins();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (copyRef.current) {
        gsap.from(copyRef.current.children, {
          y: 36,
          opacity: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        });
      }
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          y: 18,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.35,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const words = heading.trim().split(/\s+/);
  const last = words.pop() ?? heading;
  const rest = words.join(" ");

  return (
    <header
      ref={sectionRef}
      className="relative flex min-h-[min(92vh,900px)] flex-col overflow-hidden bg-[#0e0d0d] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[140px]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-2 top-1/2 hidden origin-center -translate-y-1/2 -rotate-90 text-[10px] font-medium uppercase tracking-[0.55em] text-gold/40 lg:left-5 lg:block"
      >
        Service
      </span>

      <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-0 pt-[calc(var(--site-nav-height)+1.5rem)] sm:px-6 lg:px-14">
        <div ref={copyRef} className="mx-auto flex w-full max-w-7xl flex-col pb-10 sm:pb-12 lg:pb-14">
          <Link
            href="/services"
            className="group inline-flex w-fit items-center gap-2 text-[11px] font-medium uppercase tracking-[0.26em] text-gold/80 transition-all duration-300 hover:gap-3 hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
            All services
          </Link>

          <h1 className="mt-8 max-w-[18ch] text-[clamp(2.8rem,9vw,6.75rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-white sm:mt-10">
            {rest ? (
              <>
                {rest}{" "}
                <span className="text-gold transition-colors duration-300 hover:text-gold-light">
                  {last}
                </span>
              </>
            ) : (
              <span className="text-gold transition-colors duration-300 hover:text-gold-light">
                {last}
              </span>
            )}
          </h1>

          <div className="mt-8 flex max-w-2xl flex-col gap-7 sm:mt-10 lg:mt-12">
            <p className="text-[16px] leading-relaxed text-white/65 sm:text-[18px] sm:leading-[1.7]">
              {lead}
            </p>
            {techLine ? (
              <p className="text-[12px] font-medium tracking-[0.04em] text-gold/70 sm:text-[13px]">
                {techLine}
              </p>
            ) : null}
            <div className="flex flex-nowrap items-center gap-2 sm:gap-3">
              <MagneticButton
                onClick={openContactModal}
                variant="gold"
                className="!px-4 !py-2 !text-[12px] sm:!px-7 sm:!py-3.5 sm:!text-[13px]"
              >
                Start a project
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </MagneticButton>
              <a
                href="#overview"
                className="group inline-flex shrink-0 items-center justify-center gap-1.5 px-1.5 py-2 text-[12px] font-medium text-white/70 transition-colors hover:text-gold sm:gap-2 sm:px-2 sm:text-sm"
              >
                Read the brief
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {stats.length > 0 ? (
        <div className="relative z-10 border-t border-white/10 px-4 sm:px-6 lg:px-14">
          <div ref={statsRef} className="mx-auto grid w-full max-w-7xl grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.28, ease }}
                className={`group cursor-default px-4 py-5 sm:px-6 sm:py-6 lg:px-8 ${
                  index % 2 === 1 ? "border-l border-white/10" : ""
                } ${index >= 2 ? "border-t border-white/10 lg:border-t-0" : ""} lg:border-l lg:border-white/10 lg:first:border-l-0`}
              >
                <p className="text-xl font-semibold tracking-[-0.04em] text-gold transition-transform duration-300 sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-[12px] leading-snug text-white/50 transition-colors duration-300 group-hover:text-white/75 sm:text-[13px]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
