"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  LayoutGrid,
  MapPin,
  Lock,
  Linkedin,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import Select from "@/components/ui/Select";
import XIcon from "@/components/icons/XIcon";
import type { ContactInfo, FooterSettings } from "@/lib/content/types";

/** Stylized paper-plane illustration for the home contact card. */
function ContactArt() {
  return (
    <svg viewBox="0 0 440 320" className="h-auto w-full" fill="none" aria-hidden>
      <defs>
        <radialGradient id="cs-sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5eead4" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#99f6e4" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ccfbf1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cs-plane" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <circle cx="318" cy="120" r="96" fill="url(#cs-sun)" />
      <path d="M0 300 Q 110 250 220 286 T 440 272 L440 320 L0 320Z" fill="#0f172a" opacity="0.06" />
      <path d="M0 306 Q 140 272 270 302 T 440 296 L440 320 L0 320Z" fill="#0f172a" opacity="0.045" />
      <g fill="#ffffff">
        <ellipse cx="150" cy="116" rx="36" ry="16" opacity="0.95" />
        <ellipse cx="182" cy="125" rx="26" ry="12" opacity="0.9" />
        <ellipse cx="356" cy="196" rx="30" ry="13" opacity="0.8" />
      </g>
      <path
        d="M68 252 C 150 236 120 166 202 172 C 252 176 252 120 300 110"
        stroke="#2dd4bf"
        strokeWidth="2.5"
        strokeDasharray="1 9"
        strokeLinecap="round"
      />
      <circle cx="206" cy="150" r="18" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="1 9" opacity="0.75" />
      <g transform="translate(298 64) rotate(-18)" className="animate-float">
        <polygon points="0,40 80,2 36,46" fill="url(#cs-plane)" />
        <polygon points="36,46 80,2 54,40" fill="#14b8a6" />
        <polygon points="36,46 54,40 42,62" fill="#0f172a" />
      </g>
      <g transform="translate(252 252)">
        <path d="M0 0 C -10 -30 6 -52 22 -58 C 18 -34 10 -12 0 0Z" fill="#0f172a" />
        <path d="M6 4 C 18 -22 44 -30 60 -28 C 44 -14 24 -2 6 4Z" fill="#14b8a6" />
        <path d="M-4 4 C -22 -10 -30 -34 -26 -52 C -12 -34 -4 -16 -4 4Z" fill="#5eead4" />
      </g>
    </svg>
  );
}

type ContactSectionProps = {
  variant?: "home" | "page";
  contact: ContactInfo;
  footer: FooterSettings;
};

export default function ContactSection({
  variant = "home",
  contact,
  footer,
}: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    website: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const isPage = variant === "page";

  const social = footer.social || {};
  const socialLinks = [
    {
      icon: MessageCircle,
      href: contact.whatsapp,
      label: "WhatsApp",
      show: Boolean(contact.whatsapp),
    },
    {
      icon: XIcon,
      href: social.twitter || "",
      label: "X",
      show: Boolean(social.twitter),
    },
    {
      icon: Linkedin,
      href: social.linkedin || "",
      label: "LinkedIn",
      show: Boolean(social.linkedin),
    },
    {
      icon: Instagram,
      href: social.instagram || "",
      label: "Instagram",
      show: Boolean(social.instagram),
    },
    {
      icon: Facebook,
      href: social.facebook || "",
      label: "Facebook",
      show: Boolean(social.facebook),
    },
  ].filter((item) => item.show);

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: contact.phoneDisplay || contact.phone,
      href: `tel:${contact.phone}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: contact.addressRegion,
      detail: contact.address,
      href: contact.mapsLink || undefined,
    },
  ];

  const serviceOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "app-development", label: "App Development" },
    { value: "ai-ml", label: "AI & ML Solutions" },
    { value: "chatbot", label: "Chatbot Development" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "other", label: "Other Services" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      toast.error("Please enter a valid name");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const digitsOnly = formData.phone.replace(/\D/g, "");

    if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    if (!formData.service) {
      toast.error("Please select a service");
      return false;
    }

    if (formData.message.trim().length < 10) {
      toast.error("Message must be at least 10 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify(formData),
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
        duration: 4000,
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
        website: "",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.name === "AbortError"
            ? "Request timed out. Please try again."
            : error.message
          : "Something went wrong.";

      toast.error("Failed to send message", {
        description: message,
      });
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  const fieldWrap = isPage
    ? "rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 transition-all focus-within:border-black/20 focus-within:shadow-[0_0_0_4px_rgba(0,0,0,0.04)]"
    : "group flex items-center gap-3 rounded-2xl border border-gray-300/70 bg-white/60 px-4 py-3 transition-all duration-300 hover:border-gray-400/80 focus-within:border-teal-500 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(20,184,166,0.12)]";

  const labelCls = isPage
    ? "block text-[11px] font-medium uppercase tracking-[0.18em] text-black/45"
    : "block text-[13px] font-bold text-gray-800";

  const inputCls = isPage
    ? "w-full border-0 bg-transparent p-0 text-sm text-black outline-none placeholder:text-black/35"
    : "w-full border-0 bg-transparent p-0 text-sm text-gray-900 outline-none placeholder:text-gray-400";

  const renderFieldIcon = (Icon: React.ElementType) =>
    isPage ? null : <Icon className="h-5 w-5 shrink-0 text-teal-600" />;

  const renderLabel = (
    htmlFor: string,
    text: string,
    asLabel = true
  ) => {
    if (isPage) return null;
    if (asLabel) {
      return (
        <label htmlFor={htmlFor} className={labelCls}>
          {text}
        </label>
      );
    }
    return <span className={labelCls}>{text}</span>;
  };

  const formContent = (
    <form onSubmit={handleSubmit} className={isPage ? "space-y-4" : "space-y-3.5"}>
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        autoComplete="off"
        tabIndex={-1}
        className="hidden"
      />

      <div className={`grid gap-4 ${isPage ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        <div className={`${fieldWrap} ${isPage ? "" : "flex items-center gap-3"}`}>
          {renderFieldIcon(User)}
          <div className="min-w-0 flex-1">
            {renderLabel("cf-name", "Your Name")}
            <input
              id="cf-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              aria-label="Your name"
              required
              className={inputCls}
            />
          </div>
        </div>

        <div className={`${fieldWrap} ${isPage ? "" : "flex items-center gap-3"}`}>
          {renderFieldIcon(Mail)}
          <div className="min-w-0 flex-1">
            {renderLabel("cf-email", "Your Email")}
            <input
              id="cf-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              aria-label="Your email"
              required
              className={inputCls}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className={`${fieldWrap} ${isPage ? "" : "flex items-center gap-3"}`}>
          {renderFieldIcon(Phone)}
          <div className="min-w-0 flex-1">
            {renderLabel("cf-phone", "Phone Number")}
            <input
              id="cf-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone number"
              aria-label="Phone number"
              required
              className={inputCls}
            />
          </div>
        </div>

        <div className={`${fieldWrap} ${isPage ? "" : "flex items-center gap-3"}`}>
          {renderFieldIcon(LayoutGrid)}
          <div className="min-w-0 flex-1">
            {renderLabel("cf-service", "Select a Service", false)}
            <Select
              options={serviceOptions}
              value={formData.service}
              onChange={(value) => setFormData((prev) => ({ ...prev, service: value }))}
              placeholder="Choose a service"
              required
              className={
                isPage
                  ? "h-auto border-0 bg-transparent p-0 text-sm text-black shadow-none data-[placeholder]:text-black/35 focus:ring-0 [&>svg]:text-black/40"
                  : "h-auto border-0 bg-transparent p-0 text-sm text-gray-900 shadow-none data-[placeholder]:text-gray-400 focus:ring-0 [&>svg]:text-gray-500"
              }
            />
          </div>
        </div>
      </div>

      <div className={`${fieldWrap} ${isPage ? "" : "flex items-start gap-3"}`}>
        {isPage ? null : <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />}
        <div className="min-w-0 flex-1">
          {renderLabel("cf-message", "Tell us about your project")}
          <textarea
            id="cf-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            aria-label="Your message"
            rows={isPage ? 5 : 3}
            required
            className={`${inputCls} resize-none`}
          />
        </div>
      </div>

      <div
        className={
          isPage
            ? "flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between"
            : "flex flex-col-reverse items-stretch gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between"
        }
      >
        <p className={`flex items-center gap-2 text-xs ${isPage ? "text-black/40" : "text-gray-500"}`}>
          <Lock className="h-3.5 w-3.5" />
          Your information is safe with us.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className={
            isPage
              ? "inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-black/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              : "group relative ml-auto flex shrink-0 items-center gap-3 overflow-hidden rounded-2xl bg-gray-900 py-2 pl-2 pr-7 shadow-[0_18px_45px_-15px_rgba(20,184,166,0.55)] transition-all duration-300 hover:bg-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          }
        >
          {!isPage && (
            <>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-teal-400/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-white transition-transform duration-300 group-hover:scale-105">
                <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </>
          )}
          {isPage && <Send className="h-4 w-4" />}
          <span className={isPage ? "" : "relative text-sm font-bold text-white"}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </span>
        </button>
      </div>
    </form>
  );

  if (isPage) {
    return (
      <section id="contact" className="section-light pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24 lg:pt-14">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
                Message
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl">
                Send us a note
              </h2>
              {formContent}
            </div>

            <aside className="lg:pt-10">
              <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-black/40">
                Details
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-black sm:text-3xl">
                Reach us
              </h2>

              <div className="mt-8 space-y-6">
                {contactInfo.map(({ icon: Icon, label, value, href, detail }) => {
                  const content = (
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-black/[0.03] text-black/70">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/40">
                          {label}
                        </p>
                        <p className="mt-1 text-sm font-medium text-black">{value}</p>
                        {detail && (
                          <p className="mt-0.5 text-sm leading-relaxed text-black/55">{detail}</p>
                        )}
                      </div>
                    </div>
                  );

                  return href ? (
                    <a key={label} href={href} className="block transition-opacity hover:opacity-70">
                      {content}
                    </a>
                  ) : (
                    <div key={label}>{content}</div>
                  );
                })}
              </div>

              <div className="mt-10 border-t border-black/[0.06] pt-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/40">
                  Social
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-black/[0.08] text-black/60 transition-all hover:border-black/20 hover:bg-black hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-6 sm:py-10">
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#f6f7f9] via-[#eceef1] to-[#dfe2e7] p-6 shadow-2xl sm:p-8 lg:p-10">
          <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80" />

          <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr] lg:items-center lg:gap-12">
            <div>
              <div className="mb-6 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-teal-600">
                  Let&apos;s Connect
                </span>
                <span className="mx-auto mt-2 block h-0.5 w-10 rounded-full bg-teal-500" />
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Contact <span className="text-teal-600">Us</span>
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-gray-600 sm:text-base">
                  Ready to bring your ideas to life? We&apos;re here to help.
                </p>
              </div>
              {formContent}
            </div>

            <div className="flex flex-col justify-center lg:border-l lg:border-black/10 lg:pl-12">
              <div className="relative mx-auto mb-6 hidden w-full max-w-[300px] sm:block lg:mx-0">
                <ContactArt />
              </div>

              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                  Get in <span className="text-teal-600">Touch</span>
                </h3>
                <span className="mt-2 block h-1 w-12 rounded-full bg-gradient-to-r from-teal-500 to-teal-700" />

                <div className="mt-5 space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, href }) => {
                    const inner = (
                      <>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-900 text-teal-400 transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900">{label}</p>
                          <p className="truncate text-sm text-gray-600">{value}</p>
                        </div>
                      </>
                    );
                    return href ? (
                      <a key={label} href={href} className="group flex items-center gap-4">
                        {inner}
                      </a>
                    ) : (
                      <div key={label} className="group flex items-center gap-4">
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-bold text-gray-900">Follow Us</h4>
                <div className="mt-3 flex items-center gap-3">
                  {socialLinks.slice(1).map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-500/40 text-teal-600 transition-all duration-300 hover:scale-110 hover:border-teal-500 hover:bg-teal-500 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
