"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Megaphone, Palette, Search, Sparkles } from "lucide-react";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import { getPricingForService, type PricingServiceType } from "../data";

const customScopes = [
  { icon: Search, label: "SEO" },
  { icon: Bot, label: "AI models" },
  { icon: Sparkles, label: "Chatbots" },
  { icon: Palette, label: "Design" },
  { icon: Megaphone, label: "Marketing" },
];

interface PricingServiceIntroProps {
  service: PricingServiceType;
}

export default function PricingServiceIntro({ service }: PricingServiceIntroProps) {
  const { intro } = getPricingForService(service);

  return (
    <div className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
      <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
        {intro}
      </p>
    </div>
  );
}

interface EnterpriseSectionProps {
  service: PricingServiceType;
}

export function EnterpriseSection({ service }: EnterpriseSectionProps) {
  const { open: openContactModal } = useContactModal();
  const { enterpriseNote } = getPricingForService(service);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="relative mt-16 overflow-hidden rounded-[1.75rem] border border-gold/45 bg-[linear-gradient(155deg,#1c1710_0%,#0e0d0d_46%,#050505_100%)] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] sm:mt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(230,201,166,0.28),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-gold-dark/20 blur-3xl"
      />

      <div className="relative flex flex-col gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-14">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
            Need something bigger?
          </p>
          <h2 className="mt-3 text-[clamp(1.85rem,1.4rem+2.2vw,2.25rem)] font-semibold tracking-tight text-white">
            Custom work, priced to your brief.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-gold-light/85 sm:text-base">
            SEO, AI models, chatbots, design, and marketing are not fixed packages.
            Those prices are not finalized here. We quote after we understand the
            requirement, stack, and timeline.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-[15px]">
            {enterpriseNote}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {customScopes.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white/5 px-3.5 py-1.5 text-[12px] font-medium text-gold-light transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-primary"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <motion.button
          type="button"
          onClick={openContactModal}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex min-h-[3.75rem] w-full items-center justify-center gap-2.5 rounded-2xl bg-gold px-6 py-4 text-center text-base font-semibold leading-snug text-primary shadow-[0_18px_40px_-16px_rgba(230,201,166,0.7)] transition-colors hover:bg-gold-dark sm:w-auto sm:min-w-[17rem] sm:shrink-0 sm:px-8 sm:py-5"
        >
          Tell us your requirements
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
