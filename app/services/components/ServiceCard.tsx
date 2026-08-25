"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import MotionImage from "@/components/motion/MotionImage";
import ServiceIcon from "./ServiceIcon";
import type { ServiceListingItem } from "../config";

interface ServiceCardProps {
  service: ServiceListingItem;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const highlights = service.features.slice(0, 4);
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className="group relative h-[min(52vh,390px)] w-[90vw] min-w-[280px] max-w-[640px] shrink-0 overflow-hidden rounded-2xl bg-neutral-900 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.55)] will-change-transform hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.65)] sm:h-[min(56vh,480px)] sm:w-[70vw] sm:max-w-[720px] lg:h-[min(64vh,660px)] lg:w-[calc(54vw-1.5rem)] lg:max-w-[880px]"
    >
      <MotionImage
        src={service.image}
        alt={`${service.title} - NexGen Developers`}
        fill
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 54vw"
        priority={index < 2}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10 transition-opacity duration-500 group-hover:opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between gap-3">
          {service.icon ? (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm transition-transform duration-500 ease-out group-hover:scale-110 sm:h-9 sm:w-9">
              <ServiceIcon name={service.icon} className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
            </span>
          ) : (
            <span />
          )}
          <span className="text-[10px] font-medium tabular-nums tracking-[0.2em] text-white/45">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-tight tracking-[-0.02em] text-white transition-transform duration-500 ease-out group-hover:translate-y-[-2px] sm:mt-4 sm:text-2xl lg:text-[1.75rem]">
          {service.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 max-w-lg text-[12px] leading-relaxed text-white/65 sm:mt-2 sm:line-clamp-3 sm:text-sm">
          {service.shortDescription}
        </p>

        <ul className="mt-3 hidden flex-wrap gap-1.5 sm:mt-4 sm:flex">
          {highlights.map((feature) => (
            <li key={feature}>
              <span className="inline-flex max-w-full items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-white/85 backdrop-blur-sm">
                <Sparkles className="h-2.5 w-2.5 shrink-0" />
                <span className="truncate">{feature}</span>
              </span>
            </li>
          ))}
        </ul>

        <Link
          href={service.href}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all duration-300 hover:gap-2.5 sm:mt-5"
        >
          Explore service
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}
