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
    <Link href="/" className="relative z-20 flex shrink-0 items-center gap-3 py-1 transition-transform duration-300 hover:scale-105 active:scale-95 sm:py-1.5">
      <span className="relative block h-9 w-[3.12rem] overflow-hidden">
        <Image
          src="/logo/logo-01.png"
          alt="NexGen Developers"
          width={580}
          height={418}
          sizes="50px"
          className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${
            scrolled ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          priority
        />
        <Image
          src="/logo/logo-02.png"
          alt=""
          width={580}
          height={418}
          sizes="50px"
          className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!scrolled}
          priority
        />
      </span>
    </Link>
  );
}

