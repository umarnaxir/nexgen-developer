"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import MotionImage from "@/components/motion/MotionImage";
import ServiceIcon from "./ServiceIcon";
import type { ServiceListingItem } from "../config";

interface ServiceCardProps {
  service: ServiceListingItem;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const highlights = service.features.slice(0, 4);

  return (
    <article className="h-full w-[min(85vw,22.5rem)] shrink-0 snap-start lg:w-full lg:min-w-0">
      <Link
        href={service.href}
        className="group relative flex h-full min-h-[20.5rem] flex-col overflow-hidden rounded-2xl bg-neutral-900 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_56px_-24px_rgba(0,0,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:min-h-[22rem] lg:min-h-[24rem]"
      >
        <MotionImage
          src={service.image}
          alt={`${service.title} services by NexGen Developers`}
          fill
          sizes="(max-width: 1023px) 85vw, 50vw"
          priority={index < 2}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

        <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            {service.icon ? (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/12 text-white backdrop-blur-sm">
                <ServiceIcon name={service.icon} className="h-4 w-4 text-white" />
              </span>
            ) : (
              <span />
            )}
            <span className="text-[10px] font-medium tabular-nums tracking-[0.2em] text-white/45">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div>
            <h3 className="text-[1.25rem] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[1.4rem]">
              {service.title}
            </h3>
            <p className="mt-2 line-clamp-3 max-w-lg text-[13px] leading-relaxed text-white/70 sm:text-sm">
              {service.shortDescription}
            </p>

            {highlights.length > 0 ? (
              <ul className="mt-4 hidden flex-wrap gap-1.5 sm:flex">
                {highlights.map((feature) => (
                  <li key={feature}>
                    <span className="inline-flex max-w-full items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-white/85 backdrop-blur-sm">
                      <Sparkles className="h-2.5 w-2.5 shrink-0" />
                      <span className="truncate">{feature}</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}

            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-[gap] duration-300 group-hover:gap-2.5">
              Explore service
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
