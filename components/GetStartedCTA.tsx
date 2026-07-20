"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";

export type GetStartedCTAProps = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  secondaryLink?: {
    href: string;
    label: string;
  } | null;
};

const DEFAULTS = {
  eyebrow: "Let's build together",
  heading: "Ready to start your project?",
  description:
    "Get in touch with us today for a free consultation and custom quote. Let's discuss how we can help bring your digital vision to life.",
  secondaryLink: {
    href: "/contact-us",
    label: "Or visit contact page",
  },
} as const;

export default function GetStartedCTA({
  heading = DEFAULTS.heading,
  description = DEFAULTS.description,
  secondaryLink = DEFAULTS.secondaryLink,
}: GetStartedCTAProps) {
  const { open: openContactModal } = useContactModal();

  return (
    <section className="section-light border-t border-black/[0.06] section-y">
      <div className="section-container">
        <div
          data-aos="fade-up"
          className="relative overflow-hidden rounded-xl border border-teal-500/20 bg-teal-500/[0.08] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-teal-500/10 blur-3xl" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-black sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-black/60 sm:text-base">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <MagneticButton
                onClick={openContactModal}
                className="!bg-black !px-7 !py-3.5 !text-white hover:!bg-neutral-900 sm:!px-9 sm:!py-4"
              >
                Contact Us Now
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              {secondaryLink ? (
                <Link
                  href={secondaryLink.href}
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 transition-all hover:gap-2.5 hover:text-teal-800"
                >
                  {secondaryLink.label}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const defaultGetStartedCTA = DEFAULTS;
