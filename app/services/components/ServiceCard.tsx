"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import ServiceIcon from "./ServiceIcon";
import type { ServiceListingItem } from "../config";

interface ServiceCardProps {
  service: ServiceListingItem;
  index: number;
}

function ServiceCardContentDesktop({ service, index }: ServiceCardProps) {
  const highlights = service.features.slice(0, 4);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white p-5">
      <div className="flex items-start justify-between gap-2">
        {service.icon ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-teal-500/20 bg-teal-500/10 text-teal-600">
            <ServiceIcon name={service.icon} className="h-4 w-4 text-teal-600" />
          </span>
        ) : (
          <span />
        )}
        <span className="text-[10px] font-medium tabular-nums tracking-[0.2em] text-black/30">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-3 text-[1.05rem] font-semibold leading-tight tracking-[-0.02em] text-black">
        {service.title}
      </h3>
      <p className="mt-2 line-clamp-5 text-[13px] leading-relaxed text-black/60">
        {service.shortDescription}
      </p>

      <ul className="mt-4 flex flex-col gap-1.5">
        {highlights.map((feature) => (
          <li key={feature}>
            <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-teal-500/15 bg-teal-500/[0.08] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-teal-700">
              <Sparkles className="h-2.5 w-2.5 shrink-0" />
              <span className="truncate">{feature}</span>
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={service.href}
        className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-teal-600 transition-all hover:gap-2.5 hover:text-teal-700"
      >
        Explore service
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <article className="premium-card-dark flex h-[min(58vh,460px)] w-[82vw] min-w-[260px] max-w-[560px] shrink-0 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white shadow-[0_32px_80px_-40px_rgba(0,0,0,0.65)] sm:w-[60vw] lg:h-[min(64vh,660px)] lg:w-[calc(58vw-2rem)] lg:max-w-[920px] lg:flex-row">
      <div className="relative min-h-0 flex-[1.45] overflow-hidden bg-neutral-900 lg:h-full lg:w-[75%] lg:flex-none">
        <Image
          src={service.image}
          alt={`${service.title} - NexGen Developers`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 82vw, 42vw"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:hidden" />
        <span className="absolute left-4 top-4 text-[11px] font-medium uppercase tracking-[0.25em] text-white/70 lg:hidden">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex shrink-0 flex-col bg-white px-4 py-3 lg:hidden">
        <h3 className="text-base font-semibold leading-tight tracking-[-0.02em] text-black">
          {service.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-black/60">
          {service.shortDescription}
        </p>
        <Link
          href={service.href}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-all hover:gap-2 hover:text-teal-700"
        >
          Explore service
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="hidden w-[25%] shrink-0 lg:block">
        <ServiceCardContentDesktop service={service} index={index} />
      </div>
    </article>
  );
}
