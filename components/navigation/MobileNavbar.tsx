"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import Hamburger from "@/components/Navbar/Hamburger";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import { sidebarLinks } from "./nav-config";
import { getServicesNavItems } from "@/app/services/config";

export default function MobileNavbar() {
  const pathname = usePathname();
  const { open: openContactModal } = useContactModal();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(pathname.startsWith("/services"));

  const serviceItems = getServicesNavItems().flatMap((service) => [
    { label: service.label, href: service.href },
    ...(service.children || []),
  ]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsServicesOpen(pathname.startsWith("/services"));
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[9990] border-b border-white/[0.08] bg-black/90 backdrop-blur-md lg:hidden">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center" aria-label="NexGen Developers home">
            <Image
              src="/logo/logo.png"
              alt="NexGen Developers"
              width={48}
              height={48}
              className="h-9 w-9 object-contain sm:h-10 sm:w-10"
              priority
            />
          </Link>
          <Hamburger isOpen={isOpen} onClick={() => setIsOpen((open) => !open)} light />
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[9995] h-[100dvh] w-full bg-black transition-[opacity,visibility] duration-300 lg:hidden ${
          isOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex h-full w-full flex-col px-5 sm:px-6">
          <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] py-5">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="inline-block transition-opacity hover:opacity-90"
            >
              <Image
                src="/logo/logo.png"
                alt="NexGen Developers"
                width={56}
                height={56}
                className="h-10 w-10 object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <nav aria-label="Primary" className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto py-6">
            <ul className="space-y-1">
              {sidebarLinks.map((link, index) => {
                const isActive = pathname === link.href;

                if (link.href === "/services") {
                  return (
                    <li key={link.href}>
                      <div
                        className={`flex min-w-0 items-center gap-3.5 transition-colors ${
                          isActive || pathname.startsWith("/services/")
                            ? "text-white"
                            : "text-white/40"
                        }`}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex min-w-0 flex-1 items-center gap-3.5 py-3"
                        >
                          <span className="w-7 shrink-0 text-[11px] font-medium tabular-nums tracking-widest text-white/25">
                            02
                          </span>
                          <span className="text-[1.65rem] font-semibold leading-none tracking-[-0.03em] sm:text-[1.85rem]">
                            {link.label}
                          </span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setIsServicesOpen((open) => !open)}
                          aria-label={`${isServicesOpen ? "Collapse" : "Expand"} services menu`}
                          aria-expanded={isServicesOpen}
                          className="flex h-10 w-10 shrink-0 items-center justify-center text-white/50 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}
                            aria-hidden
                          />
                        </button>
                      </div>
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                          isServicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden border-l border-white/10 ml-10 pl-4">
                          <ul className="space-y-0.5 py-1.5">
                            {serviceItems.map((service) => (
                              <li key={service.href}>
                                <Link
                                  href={service.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`block rounded-md px-2 py-2 text-sm font-medium transition-colors sm:text-[0.95rem] ${
                                    pathname === service.href
                                      ? "bg-white/[0.08] text-white"
                                      : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                                  }`}
                                >
                                  {service.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3.5 py-3 transition-colors ${
                        isActive ? "text-white" : "text-white/40 hover:text-white"
                      }`}
                    >
                      <span className="w-7 shrink-0 text-[11px] font-medium tabular-nums tracking-widest text-white/25">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[1.65rem] font-semibold leading-none tracking-[-0.03em] sm:text-[1.85rem]">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-white/[0.08] pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
              Get in touch
            </p>
            <a
              href="mailto:info@nexgendevelopers.in"
              className="mt-2.5 block text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              info@nexgendevelopers.in
            </a>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openContactModal();
              }}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-white px-5 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 active:scale-[0.99]"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
