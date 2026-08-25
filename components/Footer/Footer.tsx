import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, MessageCircle, Youtube } from "lucide-react";
import XIcon from "@/components/icons/XIcon";
import { getAllServicePagesForFooter } from "@/app/services/config";
import type { ContactInfo, FooterSettings } from "@/lib/content/types";

type FooterLink = {
  label: string;
  href: string;
};

const aboutLinks: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
];

const otherPageLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blogs", href: "/blogs" },
];

const legalLinks: FooterLink[] = [
  { label: "Contact Us", href: "/contact-us" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of use", href: "/terms" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-white">{title}</h3>
      <nav aria-label={title}>
        <ul className="flex flex-col gap-2.5">
          {links.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              <Link
                href={link.href}
                className="break-words text-[13px] leading-snug text-gold-light/70 transition-colors duration-200 hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

type FooterProps = {
  contact: ContactInfo;
  footer: FooterSettings;
};

export default function Footer({ contact, footer }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const services = getAllServicePagesForFooter();
  const social = footer.social || {};

  const copyright = (footer.copyrightText || `© {year} ${footer.companyName}`)
    .replace("{year}", String(currentYear))
    .replace("%YEAR%", String(currentYear));

  const contactLinks: FooterLink[] = [
    { label: "Contact", href: "/contact-us" },
    ...(contact.email
      ? [{ label: contact.email, href: `mailto:${contact.email}` }]
      : []),
    ...(contact.phone
      ? [
          {
            label: contact.phoneDisplay || contact.phone,
            href: `tel:${contact.phone}`,
          },
        ]
      : []),
  ];

  const socialLinks = [
    {
      icon: MessageCircle,
      href: contact.whatsapp || "",
      label: "WhatsApp",
    },
    {
      icon: Facebook,
      href: social.facebook || "",
      label: "Facebook",
    },
    {
      icon: XIcon,
      href: social.twitter || "",
      label: "X",
    },
    {
      icon: Instagram,
      href: social.instagram || "",
      label: "Instagram",
    },
    {
      icon: Linkedin,
      href: social.linkedin || "",
      label: "LinkedIn",
    },
    {
      icon: Youtube,
      href: social.youtube || "",
      label: "YouTube",
    },
    {
      icon: Github,
      href: social.github || "",
      label: "GitHub",
    },
  ].filter((item) => item.href);

  return (
    <footer className="relative overflow-hidden border-t border-gold/25 bg-[#111111] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(230,201,166,0.12),transparent_40%)]"
      />
      <div className="section-container relative py-12 sm:py-14 lg:py-16">
        {(footer.companyInfo || footer.craftedText) && (
          <div className="mb-10 max-w-xl" data-aos="fade-up">
            {footer.companyInfo ? (
              <p className="text-base text-gold-light/80 sm:text-lg">
                {footer.companyInfo}
              </p>
            ) : null}
            {footer.craftedText ? (
              <p className="mt-2 text-sm text-gold-light/50">{footer.craftedText}</p>
            ) : null}
          </div>
        )}
        <div
          className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12"
          data-aos="fade-up"
        >
          <FooterColumn title="About Us" links={aboutLinks} />

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Services</h3>
            <nav aria-label="Services">
              <ul className="flex flex-col gap-2.5">
                {services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] leading-snug text-gold-light/70 transition-colors duration-200 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <FooterColumn title="Other Pages" links={otherPageLinks} />

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Contact Us</h3>
            <nav aria-label="Contact Us">
              <ul className="flex flex-col gap-2.5">
                {contactLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="break-words text-[13px] leading-snug text-gold-light/70 transition-colors duration-200 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="mt-2.5 max-w-[16rem] text-[13px] leading-snug text-gold-light/70">
              {contact.address || "Baramulla, Jammu and Kashmir, India"}
            </p>
          </div>
        </div>

        {socialLinks.length > 0 && (
          <div
            className="mt-12 flex flex-wrap justify-center gap-3 sm:mt-14 sm:gap-3.5"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e6c9a6] text-black transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-[#d1ac81] sm:h-14 sm:w-14"
                >
                  <Icon className="h-5 w-5 text-black sm:h-6 sm:w-6" strokeWidth={2} />
                </a>
              );
            })}
          </div>
        )}
      </div>

      <div className="relative border-t border-gold/15">
        <div className="section-container flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-5 text-[12px] text-gold-light/45">
          <p>{copyright}</p>
          {legalLinks.map((link) => (
            <span key={link.href} className="inline-flex items-center gap-3">
              <span className="text-gold/30" aria-hidden>
                |
              </span>
              <Link href={link.href} className="transition-colors hover:text-gold">
                {link.label}
              </Link>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
