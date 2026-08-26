"use client";

import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";

type ContactCTAProps = {
  variant?: "section" | "embedded";
};

export default function ContactCTA({ variant = "section" }: ContactCTAProps) {
  const { open: openContactModal } = useContactModal();
  const isEmbedded = variant === "embedded";

  return (
    <section
      className={
        isEmbedded
          ? "relative overflow-hidden rounded-xl border border-gold/40 bg-background-soft px-5 py-8 text-primary sm:px-8 sm:py-10"
          : "section-light relative overflow-hidden section-y"
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(230,201,166,0.35) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gold-dark/10 blur-3xl" />

      <div className={isEmbedded ? "relative" : "section-container relative"}>
        <div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          data-aos="fade-up"
        >
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-4xl lg:text-5xl">
            Ready to start your <span className="text-gold-dark">project?</span>
          </h2>

          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-text-gray sm:text-base">
            Get in touch for a free consultation and custom quote. We&apos;ll help you scope, plan,
            and launch with clarity.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <MagneticButton onClick={openContactModal} className="!px-7 !py-3.5 sm:!px-9 sm:!py-4">
              Contact us now
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>

            <a
              href="/contact-us"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-all hover:gap-2.5 hover:text-gold"
            >
              Or visit contact page
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
