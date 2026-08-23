"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Youtube,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import GalaxyBackground from "@/components/GalaxyBackground";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import XIcon from "@/components/icons/XIcon";
import {
  getDevelopmentServicesForFooter,
  getDigitalMarketingServicesForFooter,
} from "@/app/services/config";
import type { ContactInfo, FooterSettings } from "@/lib/content/types";

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blogs", href: "/blogs" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact-us" },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
];

function formatPhoneDisplay(phone: string, fallback?: string) {
  if (fallback) return fallback;
  if (phone.startsWith("+91") && phone.length >= 13) {
    const rest = phone.slice(3);
    return `+91 ${rest.slice(0, 3)}-${rest.slice(3, 6)}-${rest.slice(6)}`;
  }
  return phone;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 text-[13px] font-semibold tracking-[-0.01em] text-white">
      [ {children} ]
    </h3>
  );
}

function FooterLinkList({
  links,
  ariaLabel,
}: {
  links: { label: string; href: string }[];
  ariaLabel: string;
}) {
  return (
    <nav className="flex flex-col gap-1" aria-label={ariaLabel}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group flex w-fit items-center gap-1 py-0.5 text-[13px] text-white/55 transition-colors hover:text-white"
        >
          <span>{link.label}</span>
          <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-60" />
        </Link>
      ))}
    </nav>
  );
}

type FooterProps = {
  contact: ContactInfo;
  footer: FooterSettings;
};

export default function Footer({ contact, footer }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { open: openContactModal } = useContactModal();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const developmentServices = getDevelopmentServicesForFooter();
  const marketingServices = getDigitalMarketingServicesForFooter();

  const copyright = (footer.copyrightText || `© {year} ${footer.companyName}`)
    .replace("{year}", String(currentYear))
    .replace("%YEAR%", String(currentYear));

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

  const social = footer.social || {};
  const socialLinks = [
    {
      icon: Mail,
      href: `mailto:${contact.email}`,
      label: "Email us",
      external: false,
      show: Boolean(contact.email),
    },
    {
      icon: MessageCircle,
      href: contact.whatsapp,
      label: "WhatsApp",
      external: true,
      show: Boolean(contact.whatsapp),
    },
    {
      icon: Instagram,
      href: social.instagram || "",
      label: "Instagram",
      external: true,
      show: Boolean(social.instagram),
    },
    {
      icon: Linkedin,
      href: social.linkedin || "",
      label: "LinkedIn",
      external: true,
      show: Boolean(social.linkedin),
    },
    {
      icon: XIcon,
      href: social.twitter || "",
      label: "X",
      external: true,
      show: Boolean(social.twitter),
    },
    {
      icon: Facebook,
      href: social.facebook || "",
      label: "Facebook",
      external: true,
      show: Boolean(social.facebook),
    },
    {
      icon: Github,
      href: social.github || "",
      label: "GitHub",
      external: true,
      show: Boolean(social.github),
    },
    {
      icon: Youtube,
      href: social.youtube || "",
      label: "YouTube",
      external: true,
      show: Boolean(social.youtube),
    },
  ].filter((item) => item.show);

  return (
    <footer className="relative overflow-hidden rounded-t-[1.75rem] border border-b-0 border-white/10 bg-black text-white sm:rounded-t-[2rem]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <GalaxyBackground />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 bg-gradient-to-b from-white/[0.04] to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10 xl:px-12">
        {/* Row 1: Description | Pages & Services */}
        <div className="grid gap-10 border-b border-white/10 py-10 lg:grid-cols-[minmax(280px,34%)_1fr] lg:gap-14 lg:py-12">
          {/* Left — Description */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="inline-flex items-center gap-0.5 font-mono text-lg font-semibold text-teal-400/90">
                <span aria-hidden>[</span>
                <span className="relative mx-0.5 flex h-8 w-8 items-center justify-center">
                  <Image
                    src="/logo/logo.png"
                    alt=""
                    width={36}
                    height={36}
                    className="h-7 w-7 object-contain"
                  />
                </span>
                <span aria-hidden>]</span>
              </span>
              <span className="text-lg font-semibold tracking-[-0.03em] text-white">
                {footer.companyName || contact.companyName}
              </span>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-white/50">
              We design and build websites, mobile apps, AI chatbots, and
              digital marketing campaigns for startups and growing brands — with
              clear scope, honest timelines, and premium execution.
            </p>

            <div>
              <h2 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-white">
                {footer.companyInfo || (
                  <>
                    Have an idea?{" "}
                    <span className="text-teal-300">Let&apos;s build it.</span>
                  </>
                )}
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton
                onClick={openContactModal}
                className="!rounded-md !px-5 !py-2.5 lowercase"
              >
                get started
              </MagneticButton>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-4 py-2.5 text-[13px] font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
              >
                View pricing
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-2 space-y-2.5 border-t border-white/10 pt-6">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-[13px] text-white/55 transition-colors hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-teal-400/80" />
                {contact.email}
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 text-[13px] text-white/55 transition-colors hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0 text-teal-400/80" />
                {formatPhoneDisplay(contact.phone, contact.phoneDisplay)}
              </a>
              <p className="flex items-start gap-2 text-[13px] leading-relaxed text-white/55">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-400/80" />
                {contact.address}
                {contact.addressRegion ? ` · ${contact.addressRegion}` : ""}
              </p>
            </div>
          </div>

          {/* Right — Pages & Services */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-6">
            <div>
              <SectionHeading>Pages</SectionHeading>
              <FooterLinkList links={pageLinks} ariaLabel="Footer pages" />
            </div>

            <div>
              <SectionHeading>Development</SectionHeading>
              <FooterLinkList
                links={developmentServices}
                ariaLabel="Development services"
              />
            </div>

            <div>
              <SectionHeading>Marketing</SectionHeading>
              <FooterLinkList
                links={marketingServices}
                ariaLabel="Marketing services"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Subscribe | Social */}
        <div className="grid gap-8 border-b border-white/10 py-10 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16 lg:py-12">
          <div>
            <SectionHeading>Subscribe</SectionHeading>
            <p className="mb-5 max-w-lg text-sm leading-relaxed text-white/45">
              Get product tips, launch insights, and occasional updates. No spam
              — unsubscribe anytime.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex max-w-xl flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end"
            >
              <label className="block min-w-[220px] flex-1">
                <span className="sr-only">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder="Enter your email"
                  required
                  className="w-full border-0 border-b border-white/25 bg-transparent py-2.5 text-[14px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-teal-400"
                />
              </label>

              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center rounded-md border border-teal-400/30 bg-teal-400/10 px-6 py-2.5 text-[13px] font-semibold text-teal-200 transition-colors hover:border-teal-300 hover:bg-teal-400/20 hover:text-white"
              >
                Subscribe
              </button>

              <label className="flex w-full cursor-pointer items-start gap-2.5 sm:basis-full">
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
                    {consent && (
                      <Check className="h-2.5 w-2.5 text-black" strokeWidth={3} />
                    )}
                  </span>
                </span>
                <span className="text-[11px] leading-relaxed text-white/40">
                  I consent to receive updates under the{" "}
                  <Link
                    href="/privacy"
                    className="underline decoration-white/30 underline-offset-2 transition-colors hover:text-white hover:decoration-teal-400"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {status === "success" && (
                <p
                  className="w-full text-[12px] font-medium text-teal-300"
                  role="status"
                >
                  Thanks — you&apos;re on the list.
                </p>
              )}
              {status === "error" && (
                <p className="w-full text-[12px] font-medium text-red-400" role="alert">
                  Enter your email and accept the privacy note.
                </p>
              )}
            </form>
          </div>

          <div className="lg:min-w-[220px]">
            <SectionHeading>Follow us</SectionHeading>
            <p className="mb-5 text-sm text-white/45">
              Connect with us on social media.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    aria-label={action.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/[0.06] text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-95"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-5 py-4 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 xl:px-12">
          <p>{copyright}</p>
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
          <p className="sm:text-right">{footer.craftedText || "Crafted in Kashmir"}</p>
        </div>
      </div>
    </footer>
  );
}
