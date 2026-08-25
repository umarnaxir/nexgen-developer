"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavLogo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 py-1 sm:py-1.5 hover:scale-105 active:scale-95 transition-transform duration-300">
      <Image
        src="/logo/nav-logo.png"
        alt="NexGen Developers"
        width={588}
        height={425}
        className="block h-10 w-auto object-contain sm:h-11"
        priority
      />
    </Link>
  );
}

