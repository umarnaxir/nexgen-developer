"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import ServiceIcon from "./ServiceIcon";
import type { ServiceListingItem } from "../config";

interface ServiceCardProps {
  service: ServiceListingItem;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article
      className="group relative bg-white rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm hover:shadow-2xl hover:border-gray-200 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={index * 60}
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.title} - NexGen Developers`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <Link
              href={service.href}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        {/* Icon badge */}
        {service.icon && (
          <div className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center shadow-md">
            <ServiceIcon name={service.icon} className="w-5 h-5 text-black" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-black mb-3">
          <Link
            href={service.href}
            className="hover:text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
          >
            {service.title}
          </Link>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">
          {service.shortDescription}
        </p>

        {/* Expandable Features */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }}
            className="flex items-center gap-2 text-sm font-semibold text-black hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50 px-2 py-1 -mx-2"
            aria-expanded={isExpanded}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" /> Hide features
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" /> View key features
              </>
            )}
          </button>
          {isExpanded && (
            <ul
              className="space-y-2"
              role="region"
              aria-label="Key features"
            >
              {service.features.slice(0, 5).map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-gray-700 text-sm"
                >
                  <svg
                    className="w-4 h-4 mr-2 text-black flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CTA: Learn More */}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <Link
            href={service.href}
            className="inline-flex items-center gap-2 px-5 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 hover:gap-3 transition-all duration-300 text-sm group/btn"
          >
            Learn More
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
