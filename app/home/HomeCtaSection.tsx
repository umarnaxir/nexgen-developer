"use client";

import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import type { ContactInfo } from "@/lib/content/types";

type HomeCtaSectionProps = {
  contact: ContactInfo;
};

export default function HomeCtaSection({ contact }: HomeCtaSectionProps) {
  const { open: openContactModal } = useContactModal();
  const phoneLabel = contact.phoneDisplay || contact.phone;
  const address = contact.address || "Baramulla, Jammu and Kashmir, India";

  return (
    <section className="relative bg-white px-4 pb-8 pt-2 sm:px-6 sm:pb-10 lg:px-14 lg:pb-12">
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
          className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-10 text-center sm:px-10 sm:py-12 lg:py-14"
          data-aos="fade-up"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold sm:px-4 sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Have a project in mind?
          </span>

          <h2 className="mt-5 text-[2.55rem] font-black uppercase leading-[1.14] tracking-[-0.045em] text-white sm:mt-6 sm:text-[clamp(2.6rem,7.2vw,4.6rem)] sm:leading-[1.12]">
            Let&apos;s build
            <br />
            something <span className="text-gold">great.</span>
          </h2>

          <span className="mt-5 h-px w-14 bg-gold sm:mt-6 sm:w-16" aria-hidden />

          <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-white/65 sm:mt-6 sm:text-base">
            Have an idea, a product, or a problem worth solving? Let&apos;s turn it into something
            people remember.
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
            <Link
              href="/contact-us"
              className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-gold"
            >
              Talk to us
            </Link>
          </div>

          <div className="mt-10 flex w-full flex-col items-center gap-3 text-[14px] text-white/80 sm:mt-14 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-2 sm:text-[15px]">
            {phoneLabel ? (
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 normal-case tracking-normal transition-colors hover:text-gold"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                {phoneLabel}
              </a>
            ) : null}
            {contact.email ? (
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 break-all normal-case tracking-normal transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                {contact.email}
              </a>
            ) : null}
            <span className="inline-flex max-w-[18rem] items-center justify-center gap-2 text-center normal-case tracking-normal sm:max-w-none">
              <MapPin className="h-4 w-4 shrink-0 text-gold" />
              {address}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
