"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import { cn } from "@/lib/utils";

export type GetStartedCTAProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  secondaryLink?: {
    href: string;
    label: string;
  } | null;
  className?: string;
};

const DEFAULTS = {
  eyebrow: "Have a project in mind?",
  heading: "Ready to start your project?",
  description:
    "Get in touch with us today for a free consultation and custom quote. Let's discuss how we can help bring your digital vision to life.",
  secondaryLink: {
    href: "/contact-us",
    label: "Talk to us",
  },
} as const;

export default function GetStartedCTA({
  eyebrow = DEFAULTS.eyebrow,
  heading = DEFAULTS.heading,
  description = DEFAULTS.description,
  secondaryLink = DEFAULTS.secondaryLink,
  className,
}: GetStartedCTAProps) {
  const { open: openContactModal } = useContactModal();

  return (
    <section className={cn("section-light relative px-4 pb-10 pt-4 sm:px-6 sm:pb-14 lg:px-14 lg:pb-16", className)}>
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-white/8 bg-[#111111] text-white shadow-[0_28px_80px_-36px_rgba(0,0,0,0.55)] sm:rounded-[1.75rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(230,201,166,0.14),transparent_46%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(230,201,166,0.08) 1px, transparent 1px),
              linear-gradient(45deg, rgba(230,201,166,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px, 42px 42px",
          }}
        />

        <div
          className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-12 text-center sm:px-10 sm:py-16 lg:py-20"
          data-aos="fade-up"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold sm:px-4 sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {eyebrow}
          </span>

          <h2 className="mt-5 text-[1.85rem] font-black leading-[1.1] tracking-[-0.04em] text-white sm:mt-6 sm:text-[clamp(2.1rem,4vw,3.25rem)]">
            {heading}
          </h2>

          <span className="mt-5 h-px w-14 bg-gold sm:mt-6 sm:w-16" aria-hidden />

          <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-white/65 sm:mt-6 sm:text-base">
            {description}
          </p>

          <div className="mt-7 flex w-full flex-col items-center gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:gap-6">
            <MagneticButton
              onClick={openContactModal}
              variant="outline"
              className="!w-full !px-7 !py-3.5 !text-[12px] !font-semibold !uppercase !tracking-[0.16em] sm:!w-auto sm:!py-3"
            >
              Start a Project
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            {secondaryLink ? (
              <Link
                href={secondaryLink.href}
                className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-gold"
              >
                {secondaryLink.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export const defaultGetStartedCTA = DEFAULTS;
