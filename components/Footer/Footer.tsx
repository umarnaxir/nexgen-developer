"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import FooterSocials from "./FooterSocials";
import {
  footerAddress,
  footerContactEmail,
  footerContactPhone,
  footerExtraLinks,
} from "@/app/home/data";

function formatPhoneDisplay(phone: string) {
  if (phone.startsWith("+91") && phone.length > 3) {
    return `+91-${phone.slice(3)}`;
  }
  return phone;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { open: openContactModal } = useContactModal();

  return (
    <footer className="section-dark relative flex flex-col border-t border-white/[0.06] bg-black text-white">
      <div className="section-container py-8 sm:py-10 lg:py-12">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <Link
            href="/"
            className="hidden transition-opacity hover:opacity-90 lg:inline-block"
          >
            <Image
              src="/logo/logo.png"
              alt="NexGen Developers"
              width={520}
              height={195}
              className="h-40 w-auto object-contain xl:h-44"
            />
          </Link>

          <div className="lg:ml-auto lg:max-w-xl lg:text-right">
            <h2 className="text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl lg:text-[2.35rem]">
              Have an idea?{" "}
              <span className="text-teal-300">Let&apos;s connect.</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/45 sm:text-base">
              Schedule a meeting and make the best decision for your business.
            </p>

            <div className="mt-6 lg:flex lg:justify-end">
              <MagneticButton
                onClick={openContactModal}
                className="!rounded-md !px-6 !py-3 lowercase"
              >
                schedule meeting
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 border-t border-white/[0.08] pt-10 sm:grid-cols-3 sm:gap-10 lg:mt-12 lg:pt-12">
          <div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/70" />
              <div>
                <p className="text-sm font-medium text-white">{footerAddress.region}</p>
                <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/45">
                  {footerAddress.line}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs lowercase text-white/40">email us at</p>
            <a
              href={`mailto:${footerContactEmail}`}
              className="mt-1.5 inline-block text-sm font-medium text-white transition-colors hover:text-[#4ade80] sm:text-base"
            >
              {footerContactEmail}
            </a>
          </div>

          <div>
            <p className="text-xs lowercase text-white/40">call us on</p>
            <a
              href={`tel:${footerContactPhone}`}
              className="mt-1.5 inline-block text-sm font-medium text-white transition-colors hover:text-[#4ade80] sm:text-base"
            >
              {formatPhoneDisplay(footerContactPhone)}
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/[0.08] pt-6 lg:pt-8">
          <div className="flex flex-col gap-4 py-3 sm:py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3 lg:flex-nowrap lg:justify-between lg:gap-10">
              <p className="hidden shrink-0 text-xs text-white/40 lg:block">
                © NexGen Developers {currentYear}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 lg:gap-x-6">
                {footerExtraLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-xs lowercase text-white/40 transition-colors hover:text-white"
                  >
                    {item.label.toLowerCase()}
                  </Link>
                ))}

                <Link
                  href="/terms"
                  className="text-xs lowercase text-white/40 transition-colors hover:text-white"
                >
                  terms and conditions
                </Link>

                <Link
                  href="/privacy"
                  className="text-xs lowercase text-white/40 transition-colors hover:text-white"
                >
                  privacy policy
                </Link>
              </div>

              <div className="shrink-0 sm:ml-auto lg:ml-0">
                <FooterSocials />
              </div>
            </div>

            <p className="text-xs text-white/40 lg:hidden">
              © NexGen Developers {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
