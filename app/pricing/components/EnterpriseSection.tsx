"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import { getPricingForService, type PricingServiceType } from "../data";

interface PricingServiceIntroProps {
  service: PricingServiceType;
}

export default function PricingServiceIntro({ service }: PricingServiceIntroProps) {
  const { intro, note } = getPricingForService(service);

  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
      <p className="text-base leading-relaxed text-neutral-600 sm:text-lg">
        {intro}
      </p>
      {note ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mx-auto mt-5 inline-flex max-w-2xl items-start gap-3 rounded-2xl border border-teal-200/70 bg-gradient-to-r from-teal-50/90 to-white px-5 py-4 text-left shadow-[0_12px_40px_-24px_rgba(13,148,136,0.35)]"
        >
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white">
            <Sparkles className="h-4 w-4" strokeWidth={2} />
          </span>
          <p className="text-sm leading-relaxed text-teal-950/85 sm:text-[15px]">
            {note}
          </p>
        </motion.div>
      ) : null}
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
      className="relative mt-14 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.55)] sm:mt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.15),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.04),transparent_40%)]"
      />

      <div className="relative flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-300/90">
            Need something bigger?
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-[1.65rem]">
            Custom & enterprise
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-[15px]">
            {enterpriseNote}
          </p>
        </div>

        <motion.button
          type="button"
          onClick={openContactModal}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-neutral-900 transition hover:bg-teal-50"
        >
          Contact sales
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
