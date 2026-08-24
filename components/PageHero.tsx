"use client";

import { useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { gsap, registerGsapPlugins } from "@/lib/gsap/register";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";

export type PageHeroPill = {
  label: string;
  icon?: LucideIcon;
};

export type PageHeroCta = {
  label: string;
  href?: string;
  openContact?: boolean;
};

export type PageHeroProps = {
  eyebrow: string;
  title: string | [string, string];
  highlight?: string;
  description: string;
  meta?: string;
  pills?: PageHeroPill[];
  primaryCta?: PageHeroCta;
  secondaryCta?: PageHeroCta;
};

function TitleLines({
  title,
  highlight,
}: {
  title: string | [string, string];
  highlight?: string;
}) {
  const lines = Array.isArray(title) ? title : [title];

  return (
    <>
      {lines.map((line, index) => {
        const isLast = index === lines.length - 1;
        if (highlight && isLast && line.includes(highlight)) {
          const at = line.lastIndexOf(highlight);
          return (
            <span key={line} className="block">
              {line.slice(0, at)}
              <span className="text-gold-dark transition-colors duration-300 hover:text-gold">
                {highlight}
              </span>
              {line.slice(at + highlight.length)}
            </span>
          );
        }
        return (
          <span key={line} className="block">
            {line}
          </span>
        );
      })}
    </>
  );
}

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  meta,
  pills = [],
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const { open: openContactModal } = useContactModal();

  useEffect(() => {
    registerGsapPlugins();

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!copyRef.current) return;
      gsap.from(copyRef.current.children, {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderCta = (cta: PageHeroCta, variant: "primary" | "outline-light") => (
    <MagneticButton
      href={cta.href}
      onClick={cta.openContact ? openContactModal : undefined}
      variant={variant}
      className={
        variant === "outline-light"
          ? "!bg-white !px-5 !py-2.5 !text-[13px]"
          : "!px-5 !py-2.5 !text-[13px]"
      }
    >
      {cta.label}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </MagneticButton>
  );

  return (
    <header
      ref={sectionRef}
      className="hero-glow relative z-0 flex h-[70vh] min-h-[70vh] flex-col overflow-hidden pt-[var(--site-nav-height)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--gold-light) 1px, transparent 1px), linear-gradient(to bottom, var(--gold-light) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative z-10 flex h-full flex-1 items-center px-4 py-6 sm:px-6 sm:py-8 lg:px-14">
        <div
          ref={copyRef}
          className="mx-auto flex w-full max-w-7xl flex-col items-start text-left md:items-center md:text-center"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark">
            {eyebrow}
          </span>

          <h1 className="mt-4 w-full max-w-5xl text-[clamp(2.4rem,6.5vw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-primary">
            <TitleLines title={title} highlight={highlight} />
          </h1>

          {meta ? (
            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-dark">
              {meta}
            </p>
          ) : null}

          <p className="mt-5 w-full max-w-3xl text-[15px] leading-relaxed text-text-gray sm:text-lg">
            {description}
          </p>

          {pills.length > 0 ? (
            <ul className="mt-5 flex flex-wrap justify-start gap-2 md:justify-center">
              {pills.map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="group inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-primary shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold-light hover:shadow-[0_14px_28px_-16px_rgba(230,201,166,0.7)]"
                >
                  {Icon ? (
                    <Icon
                      className="h-3.5 w-3.5 text-gold-dark transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={2}
                    />
                  ) : null}
                  {label}
                </li>
              ))}
            </ul>
          ) : null}

          {primaryCta || secondaryCta ? (
            <div className="mt-6 flex flex-wrap items-center justify-start gap-2.5 md:justify-center">
              {primaryCta ? renderCta(primaryCta, "primary") : null}
              {secondaryCta ? renderCta(secondaryCta, "outline-light") : null}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
