"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { NavServiceItem } from "@/app/services/config";

interface ServicesDropdownProps {
  label: string;
  href: string;
  items: NavServiceItem[];
  isMobile?: boolean;
  isHome?: boolean;
  onLinkClick?: () => void;
}

export default function ServicesDropdown({
  label,
  href,
  items,
  isMobile = false,
  isHome = false,
  onLinkClick,
}: ServicesDropdownProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState<string | null>(null);
  const isServicesActive =
    pathname === href || pathname.startsWith("/services/");

  if (isMobile) {
    return (
      <div className="relative group" data-aos="zoom-in" data-aos-duration="600">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex items-center justify-between w-full py-3 px-4 text-sm font-extrabold tracking-wide rounded-xl transition-all duration-300 ${
            isServicesActive
              ? "text-white light:text-gray-900 bg-white/[0.06] light:bg-gray-100"
              : "text-silver-light light:text-gray-700 hover:bg-white/[0.04] light:hover:bg-gray-100 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"
          }`}
        >
          {label}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <div className="mt-1 pl-4 space-y-1 border-l-2 border-white/10 light:border-gray-200">
            <Link
              href={href}
              onClick={onLinkClick}
              className={`block py-2.5 px-3 text-sm font-bold rounded-lg transition-colors ${
                pathname === href ? "text-white light:text-gray-900 bg-white/[0.06] light:bg-gray-100" : "text-silver light:text-gray-600 hover:bg-white/[0.04] light:hover:bg-gray-100 hover:text-white light:hover:text-gray-900"
              }`}
            >
              All Services
            </Link>
            {[...items]
              .sort((a, b) => {
                const order = [
                  "website-development",
                  "app-development",
                  "ai-ml",
                  "chatbot-development",
                  "maintenance-support",
                  "deployment-devops",
                  "digital-marketing",
                ];
                const aSlug = a.href.split("/").pop() ?? "";
                const bSlug = b.href.split("/").pop() ?? "";
                return order.indexOf(aSlug) - order.indexOf(bSlug);
              })
              .map((item) =>
              item.children ? (
                <div key={item.href}>
                  <button
                    type="button"
                    onClick={() =>
                      setNestedOpen(nestedOpen === item.href ? null : item.href)
                    }
                    className="flex items-center justify-between w-full py-2.5 px-3 text-sm font-bold text-silver light:text-gray-600 rounded-lg hover:bg-white/[0.04] light:hover:bg-gray-100 hover:text-white light:hover:text-gray-900"
                  >
                    {item.label}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${nestedOpen === item.href ? "rotate-90" : ""}`}
                    />
                  </button>
                  {nestedOpen === item.href && (
                    <div className="pl-4 mt-1 space-y-1 border-l border-white/10 light:border-gray-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onLinkClick}
                          className={`block py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                            pathname === child.href
                              ? "text-white light:text-gray-900 bg-white/10 light:bg-gray-100"
                              : "text-silver light:text-gray-600 hover:bg-white/[0.04] light:hover:bg-gray-100 hover:text-white light:hover:text-gray-900"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onLinkClick}
                  className={`block py-2.5 px-3 text-sm font-bold rounded-lg transition-colors ${
                    pathname === item.href
                      ? "text-white light:text-gray-900 bg-white/[0.06] light:bg-gray-100"
                      : "text-silver light:text-gray-600 hover:bg-white/[0.04] light:hover:bg-gray-100 hover:text-white light:hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop: hover dropdown — wide, 2-column grid, interactive
  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setNestedOpen(null);
      }}
    >
      <Link
        href={href}
        className={`relative flex items-center gap-0.5 rounded-md px-2 py-4 text-sm font-semibold tracking-wide transition-all duration-300 ${
          isServicesActive
            ? isHome
              ? "text-white"
              : "text-black"
            : isHome
              ? "text-white/60 hover:text-white"
              : "text-gray-700 hover:text-black"
        }`}
        aria-current={isServicesActive ? "page" : undefined}
      >
        {label}
        <ChevronDown className="w-4 h-4 opacity-70" />
      </Link>
      <span
        className={`absolute bottom-2 left-1/2 h-[2px] -translate-x-1/2 rounded-full transition-all duration-300 ease-in-out ${
          isHome ? "bg-white" : "bg-black"
        } ${isServicesActive ? "w-[60%]" : "w-0 group-hover:w-[60%]"}`}
      />
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
          <div className="w-[760px] rounded-xl border border-white/10 light:border-gray-200 bg-black light:bg-white light:shadow-sm shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
            {/* Flat grid — every service, 3 per row */}
            <div className="grid grid-cols-3 gap-1 p-4">
              {(() => {
                const order = [
                  "website-development",
                  "app-development",
                  "ai-ml",
                  "chatbot-development",
                  "deployment-devops",
                  "maintenance-support",
                  "digital-marketing",
                  "seo",
                  "social-media-marketing",
                  "graphic-designing",
                  "google-ads",
                  "meta-ads",
                ];
                const flat: { label: string; href: string }[] = [];
                items.forEach((item) => {
                  flat.push({ label: item.label, href: item.href });
                  item.children?.forEach((child) => flat.push(child));
                });
                flat.sort(
                  (a, b) =>
                    order.indexOf(a.href.split("/").pop() ?? "") -
                    order.indexOf(b.href.split("/").pop() ?? "")
                );
                return flat.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className={`block px-4 py-3.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                      pathname === service.href
                        ? "text-white light:text-gray-900 bg-white/10 light:bg-gray-100"
                        : "text-silver-light light:text-gray-700 hover:bg-white/[0.06] light:hover:bg-gray-100 hover:text-white light:hover:text-gray-900 hover:scale-[1.02] active:scale-[0.99]"
                    }`}
                  >
                    {service.label}
                  </Link>
                ));
              })()}
            </div>
            <div className="border-t border-white/[0.06] light:border-gray-200 px-4 py-3 bg-white/[0.02] light:bg-gray-50">
              <Link
                href={href}
                className="text-sm font-semibold text-silver-light light:text-gray-700 hover:text-white light:hover:text-gray-900 transition-colors inline-flex items-center gap-1.5 group/link"
              >
                View all services
                <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
