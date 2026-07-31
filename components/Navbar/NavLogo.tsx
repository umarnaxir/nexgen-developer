"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavLogo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 py-1 sm:py-1.5 hover:scale-105 active:scale-95 transition-transform duration-300">
      <Image
        src="/logo/logo.png"
        alt="NexGen Developers"
        width={128}
        height={128}
        className="block h-[4.5rem] w-auto sm:h-16"
        priority
      />
    </Link>
  );
}

