"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import GalaxyBackground from "@/components/GalaxyBackground";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import {
  footerAddress,
  footerContactEmail,
  footerContactPhone,
} from "@/app/home/data";

const WHATSAPP_HREF =
  "https://wa.me/916006161726?text=Hi%20NexGen%20Developers%2C%20I%20want%20to%20discuss%20a%20project.";

const pageLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Team", href: "/team" },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
];

function formatPhoneDisplay(phone: string) {
  if (phone.startsWith("+91") && phone.length >= 13) {
    const rest = phone.slice(3);
    return `+91 ${rest.slice(0, 3)}-${rest.slice(3, 6)}-${rest.slice(6)}`;
  }
  return phone;
}

function PartitionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-5 text-[13px] font-semibold tracking-[-0.01em] text-white">
      [ {children} ]
    </h3>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { open: openContactModal } = useContactModal();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !consent) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
    setConsent(false);
    window.setTimeout(() => setStatus("idle"), 4000);
  };

  const actionIcons = [
    {
      icon: Mail,
      href: `mailto:${footerContactEmail}`,
      label: "Email us",
      external: false,
    },
    {
      icon: MessageCircle,
      href: WHATSAPP_HREF,
      label: "WhatsApp",
      external: true,
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/nexgendevelopers_?igsh=MTJiczF6aDNxbjB2eg==",
      label: "Instagram",
      external: true,
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/105880683/",
      label: "LinkedIn",
      external: true,
    },
  ];

  return (
    <footer className="relative overflow-hidden rounded-t-[1.75rem] border border-b-0 border-white/10 bg-black text-white sm:rounded-t-[2rem]">
      {/* Galaxy starfield — same as hero */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <GalaxyBackground />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-gradient-to-b from-white/[0.04] to-transparent"
      />

      <div className="relative z-10 mx-auto grid max-w-[1400px] lg:grid-cols-[1.15fr_1.2fr_1.05fr]">
        {/* Brand + Get Started */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 px-5 py-9 sm:px-8 sm:py-11 lg:border-b-0 lg:border-r lg:px-10 lg:py-12 xl:px-12">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="inline-flex items-center gap-0.5 font-mono text-lg font-semibold text-teal-400/90">
                <span aria-hidden>[</span>
                <span className="relative mx-0.5 flex h-8 w-8 items-center justify-center sm:h-9 sm:w-9">
                  <Image
                    src="/logo/logo.png"
                    alt=""
                    width={36}
                    height={36}
                    className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                  />
                </span>
                <span aria-hidden>]</span>
              </span>
              <span className="text-[17px] font-semibold tracking-[-0.03em] text-white sm:text-xl">
                NexGen Developers
              </span>
            </Link>
          </div>

          <div className="max-w-sm">
            <h2 className="text-xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-2xl">
              Have an idea?{" "}
              <span className="text-teal-300">Let&apos;s connect.</span>
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-white/45">
              Schedule a meeting and make the best decision for your business.
            </p>
            <div className="mt-5">
              <MagneticButton
                onClick={openContactModal}
                className="!rounded-md !px-5 !py-2.5 lowercase"
              >
                get started
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Pages + Contact */}
        <div className="border-b border-white/10 px-5 py-9 sm:px-8 sm:py-11 lg:border-b-0 lg:border-r lg:px-10 lg:py-12 xl:px-12">
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
            <div>
              <PartitionHeading>Pages</PartitionHeading>
              <nav className="flex flex-col gap-1" aria-label="Footer pages">
                {pageLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="w-fit py-0.5 text-[14px] text-white/55 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <PartitionHeading>Contact</PartitionHeading>
              <div className="flex flex-col gap-2.5">
                <a
                  href={`mailto:${footerContactEmail}`}
                  className="w-fit text-[14px] text-white/55 transition-colors hover:text-white"
                >
                  {footerContactEmail}
                </a>
                <a
                  href={`tel:${footerContactPhone}`}
                  className="w-fit text-[14px] text-white/55 transition-colors hover:text-white"
                >
                  {formatPhoneDisplay(footerContactPhone)}
                </a>
                <p className="max-w-[14rem] text-[14px] leading-relaxed text-white/55">
                  {footerAddress.line}
                </p>
                <Link
                  href="/contact-us"
                  className="w-fit text-[14px] text-white/55 transition-colors hover:text-white"
                >
                  Contact page
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribe */}
        <div className="flex flex-col px-5 py-9 sm:px-8 sm:py-11 lg:px-10 lg:py-12 xl:px-12">
          <PartitionHeading>Subscribe</PartitionHeading>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-5">
            <label className="block">
              <span className="sr-only">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="Email"
                required
                className="w-full border-0 border-b border-white/25 bg-transparent py-2 text-[14px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-teal-400"
              />
            </label>

            <label className="flex cursor-pointer items-start gap-2.5">
              <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (status !== "idle") setStatus("idle");
                  }}
                  className="peer absolute inset-0 cursor-pointer opacity-0"
                />
                <span className="flex h-4 w-4 items-center justify-center rounded-[2px] border border-white/30 bg-transparent transition-colors peer-checked:border-teal-400 peer-checked:bg-teal-500">
                  {consent && <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />}
                </span>
              </span>
              <span className="text-[11px] leading-relaxed text-white/40">
                I consent to the processing of my email by NexGen Developers to
                receive informational materials, under the{" "}
                <Link
                  href="/privacy"
                  className="underline decoration-white/30 underline-offset-2 transition-colors hover:text-white hover:decoration-teal-400"
                >
                  Personal Data Processing Policy
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex w-fit items-center justify-center rounded-md border border-teal-400/30 bg-teal-400/10 px-5 py-2.5 text-[13px] font-semibold text-teal-200 transition-colors hover:border-teal-300 hover:bg-teal-400/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Subscribe
            </button>

            {status === "success" && (
              <p className="text-[12px] font-medium text-teal-300" role="status">
                Thanks — you&apos;re on the list.
              </p>
            )}
            {status === "error" && (
              <p className="text-[12px] font-medium text-red-400" role="alert">
                Enter your email and accept the privacy note.
              </p>
            )}
          </form>

          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-10">
            {actionIcons.map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.label}
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  aria-label={action.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-3.5 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 xl:px-12">
          <p>© {currentYear} NexGen Developers</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-center">
            {bottomLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="sm:text-right">Crafted in Kashmir</p>
        </div>
      </div>
    </footer>
  );
}
