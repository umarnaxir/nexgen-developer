"use client";

import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
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
  variant?: "light" | "dark";
  size?: "default" | "compact";
};

function TitleLines({
  title,
  highlight,
  highlightClassName = "text-gold-dark transition-colors duration-300 hover:text-gold",
}: {
  title: string | [string, string];
  highlight?: string;
  highlightClassName?: string;
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
              <span className={highlightClassName}>{highlight}</span>
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
  variant = "light",
  size = "default",
}: PageHeroProps) {
  const { open: openContactModal } = useContactModal();
  const isDark = variant === "dark";
  const isCompact = size === "compact";
  /*
   * Minimum height only: a locked `h-[70vh]` cut the eyebrow/title/CTAs off on
   * short viewports (phones with browser chrome, 1366x625 laptops). The upper
   * bound keeps the hero from stretching on very tall 2K/4K displays.
   */
  const heightClass = isCompact
    ? "min-h-[min(50svh,34rem)]"
    : "min-h-[min(70svh,48rem)]";

  const renderCta = (cta: PageHeroCta, tone: "primary" | "outline-light" | "gold") => (
    <MagneticButton
      href={cta.href}
      onClick={cta.openContact ? openContactModal : undefined}
      variant={tone}
      className={
        tone === "outline-light"
          ? "!w-full !min-w-0 !bg-white !px-2 !py-2.5 !text-[13px] sm:!w-auto sm:!px-5"
          : "!w-full !min-w-0 !px-2 !py-2.5 !text-[13px] sm:!w-auto sm:!px-5"
      }
    >
      {cta.label}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </MagneticButton>
  );

  return (
    <header
      className={
        isDark
          ? `relative z-0 flex ${heightClass} flex-col overflow-hidden bg-[#0e0d0d] pt-[var(--site-nav-height)] text-white`
          : `hero-glow relative z-0 flex ${heightClass} flex-col overflow-hidden pt-[var(--site-nav-height)]`
      }
    >
      {isDark ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/4 h-[420px] w-[420px] rounded-full bg-gold/10 blur-[140px]"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--gold-light) 1px, transparent 1px), linear-gradient(to bottom, var(--gold-light) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
      )}

      <div className="page-gutter relative z-10 flex flex-1 items-center py-[clamp(1.5rem,4vh,2.5rem)]">
        <div className="hero-copy-in content-cap flex flex-col items-start text-left md:items-center md:text-center">
          <span
            className={`text-[11px] font-medium uppercase tracking-[0.35em] ${
              isDark ? "text-gold" : "text-gold-dark"
            }`}
          >
            {eyebrow}
          </span>

          <h1
            className={`mt-4 w-full max-w-5xl text-balance font-semibold leading-[0.96] tracking-[-0.04em] ${
              isCompact
                ? "text-[clamp(1.85rem,5.4vw,3.35rem)]"
                : "text-[clamp(2rem,9vw,3.6rem)] sm:text-fluid-display"
            } ${isDark ? "text-white" : "text-primary"}`}
          >
            <TitleLines
              title={title}
              highlight={highlight}
              highlightClassName={
                isDark
                  ? "text-gold transition-colors duration-300 hover:text-gold-light"
                  : "text-gold-dark transition-colors duration-300 hover:text-gold"
              }
            />
          </h1>

          {meta ? (
            <p
              className={`mt-4 text-[11px] font-medium uppercase tracking-[0.2em] ${
                isDark ? "text-gold/70" : "text-gold-dark"
              }`}
            >
              {meta}
            </p>
          ) : null}

          <p
            className={`mt-5 w-full max-w-3xl text-fluid-lead ${
              isDark ? "text-white/65" : "text-text-gray"
            }`}
          >
            {description}
          </p>

          {pills.length > 0 ? (
            <ul className="mt-5 grid w-full grid-cols-2 justify-center gap-2 sm:flex sm:w-auto sm:flex-wrap md:justify-center">
              {pills.map(({ label, icon: Icon }, index) => (
                <li
                  key={label}
                  className={`group inline-flex w-full items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-center text-[12px] font-medium shadow-[0_8px_24px_-16px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 sm:w-auto sm:justify-start sm:text-left ${
                    pills.length % 2 === 1 && index === pills.length - 1 ? "col-span-2" : ""
                  } ${
                    isDark
                      ? "border-gold/35 bg-white/5 text-white hover:border-gold hover:bg-gold/15"
                      : "border-gold/40 bg-white/70 text-primary hover:border-gold hover:bg-gold-light hover:shadow-[0_14px_28px_-16px_rgba(230,201,166,0.7)]"
                  }`}
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
            <div className="mt-6 grid w-full grid-cols-2 items-center gap-2.5 sm:flex sm:w-auto sm:flex-wrap md:justify-center">
              {primaryCta ? renderCta(primaryCta, isDark ? "gold" : "primary") : null}
              {secondaryCta ? renderCta(secondaryCta, "outline-light") : null}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
