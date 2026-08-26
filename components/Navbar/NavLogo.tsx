"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavLogo({
  light = false,
  scrolled = false,
}: {
  light?: boolean;
  scrolled?: boolean;
}) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 py-1 sm:py-1.5 hover:scale-105 active:scale-95 transition-transform duration-300">
      <span className="relative block h-10 w-[3.47rem] sm:h-11 sm:w-[3.82rem]">
        <Image
          src="/logo/logo-01.png"
          alt="NexGen Developers"
          width={580}
          height={418}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
            scrolled ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          priority
        />
        <Image
          src="/logo/logo-02.png"
          alt=""
          width={580}
          height={418}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!scrolled}
          priority
        />
      </span>
    </Link>
  );
}

