"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import Hamburger from "@/components/Navbar/Hamburger";
import { useContactModal } from "@/components/modals/ContactModalProvider";
import { sidebarLinks } from "./nav-config";

export default function MobileNavbar() {
  const pathname = usePathname();
  const { open: openContactModal } = useContactModal();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
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
        className={`fixed inset-0 z-[9995] bg-black transition-opacity duration-300 lg:hidden ${
          isOpen ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
          aria-hidden
        />

        <aside
          className={`absolute left-0 top-0 flex h-full w-[min(320px,88vw)] flex-col overflow-hidden border-r border-white/[0.08] bg-black text-white shadow-[20px_0_80px_-20px_rgba(0,0,0,0.9)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto] px-4 sm:px-5">
            <div className="flex shrink-0 items-start justify-between border-b border-white/[0.08] py-5">
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
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/60"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav aria-label="Primary" className="flex min-h-0 flex-col justify-center overflow-hidden py-4">
              <ul className="space-y-0.5">
                {sidebarLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-lg py-2.5 transition-colors sm:py-3 ${
                          isActive ? "text-white" : "text-white/40 hover:text-white"
                        }`}
                      >
                        <span className="w-6 shrink-0 text-[10px] font-medium tabular-nums tracking-widest text-white/25">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate text-[1.35rem] font-semibold leading-none tracking-[-0.03em] sm:text-[1.5rem]">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="shrink-0 border-t border-white/[0.08] py-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/35">
                Get in touch
              </p>
              <a
                href="mailto:info@nexgendevelopers.in"
                className="mt-2.5 block text-sm font-medium text-white/60"
              >
                info@nexgendevelopers.in
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openContactModal();
                }}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-white px-5 py-3.5 text-sm font-semibold text-black"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
