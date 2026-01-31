"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { NavServiceItem } from "@/app/services/config";

interface ServicesDropdownProps {
  label: string;
  href: string;
  items: NavServiceItem[];
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function ServicesDropdown({
  label,
  href,
  items,
  isMobile = false,
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
              ? "text-gray-900 bg-gray-50 shadow-sm"
              : "text-gray-900 hover:bg-gray-50 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          }`}
        >
          {label}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <div className="mt-1 pl-4 space-y-1 border-l-2 border-gray-200">
            <Link
              href={href}
              onClick={onLinkClick}
              className={`block py-2.5 px-3 text-sm font-bold rounded-lg transition-colors ${
                pathname === href ? "text-gray-900 bg-gray-50 shadow-sm" : "text-gray-800 hover:bg-gray-50"
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
                    className="flex items-center justify-between w-full py-2.5 px-3 text-sm font-bold text-gray-800 rounded-lg hover:bg-gray-50"
                  >
                    {item.label}
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${nestedOpen === item.href ? "rotate-90" : ""}`}
                    />
                  </button>
                  {nestedOpen === item.href && (
                    <div className="pl-4 mt-1 space-y-1 border-l border-gray-200">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={onLinkClick}
                          className={`block py-2 px-3 text-sm font-medium rounded-lg transition-colors ${
                            pathname === child.href
                              ? "text-gray-900 bg-gray-100"
                              : "text-gray-700 hover:bg-gray-50"
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
                      ? "text-gray-900 bg-gray-50 shadow-sm"
                      : "text-gray-800 hover:bg-gray-50"
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
        className={`relative flex items-center gap-0.5 text-sm font-extrabold tracking-wide py-4 px-2 text-gray-900 transition-all duration-300 rounded-md hover:bg-gray-50/80 hover:text-gray-700 ${
          isServicesActive ? "text-gray-900" : ""
        }`}
        aria-current={isServicesActive ? "page" : undefined}
      >
        {label}
        <ChevronDown className="w-4 h-4 opacity-70" />
      </Link>
      <span
        className={`absolute bottom-2 left-1/2 h-[2px] bg-black rounded-full -translate-x-1/2 transition-all duration-300 ease-in-out ${
          isServicesActive ? "w-[60%]" : "w-0 group-hover:w-[60%]"
        }`}
      />
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
          <div className="w-[720px] min-h-[320px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden flex">
            {/* Left: headset/image panel */}
            <div className="w-[200px] shrink-0 bg-gray-50 flex items-center justify-center p-6">
              <Image
                src="/images/services/digital-marketing-dropdown-icon.png"
                alt="Digital Marketing"
                width={120}
                height={120}
                className="object-contain"
              />
            </div>
            {/* Right: 3 columns — col1: website/app/ai-ml | col2: chatbot/deploy/maintain | col3: digital-marketing */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="grid grid-cols-3 gap-6 p-4">
                {/* Column 1: Website Development, App Development, AI & ML */}
                <div className="flex flex-col gap-1">
                  {items
                    .filter(
                      (i) =>
                        i.href.includes("website-development") ||
                        i.href.includes("app-development") ||
                        i.href.includes("ai-ml")
                    )
                    .sort((a, b) => {
                      const order = ["website-development", "app-development", "ai-ml"];
                      return order.indexOf(a.href.split("/").pop() ?? "") - order.indexOf(b.href.split("/").pop() ?? "");
                    })
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                          pathname === item.href
                            ? "text-gray-900 bg-gray-100"
                            : "text-gray-800 hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.99]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
                {/* Column 2: Chatbot, Deployment, Maintenance */}
                <div className="flex flex-col gap-1">
                  {items
                    .filter(
                      (i) =>
                        i.href.includes("chatbot-development") ||
                        i.href.includes("deployment-devops") ||
                        i.href.includes("maintenance-support")
                    )
                    .sort((a, b) => {
                      const order = ["chatbot-development", "deployment-devops", "maintenance-support"];
                      return order.indexOf(a.href.split("/").pop() ?? "") - order.indexOf(b.href.split("/").pop() ?? "");
                    })
                    .map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                          pathname === item.href
                            ? "text-gray-900 bg-gray-100"
                            : "text-gray-800 hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.99]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                </div>
                {/* Column 3: Digital Marketing + sub-items */}
                <div
                  className="flex flex-col gap-1"
                  onMouseEnter={() => {
                    const dm = items.find((i) => i.href === "/services/digital-marketing");
                    if (dm) setNestedOpen(dm.href);
                  }}
                  onMouseLeave={() => setNestedOpen(null)}
                >
                  {items
                    .filter((i) => i.href === "/services/digital-marketing")
                    .map((item) =>
                      item.children ? (
                        <div key={item.href}>
                          <Link
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-3.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                              pathname === item.href
                                ? "text-gray-900 bg-gray-100"
                                : nestedOpen === item.href
                                  ? "text-gray-900 bg-gray-50"
                                  : "text-gray-800 hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.99]"
                            }`}
                          >
                            {item.label}
                            <ChevronDown
                              className={`w-4 h-4 text-gray-500 shrink-0 ml-2 transition-transform ${
                                nestedOpen === item.href ? "rotate-180" : ""
                              }`}
                            />
                          </Link>
                          {nestedOpen === item.href && item.children?.length && (
                            <div className="mt-2 flex flex-col gap-1">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                    pathname === child.href
                                      ? "text-gray-900 bg-gray-100"
                                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : null
                    )}
                </div>
              </div>
              <div className="mt-auto border-t border-gray-100 px-4 py-3 bg-gray-50/50">
                <Link
                  href={href}
                  className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors inline-flex items-center gap-1.5 group/link"
                >
                  View all services
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
