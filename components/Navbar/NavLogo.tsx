"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 py-2 hover:scale-105 active:scale-95 transition-transform duration-300">
      <Image 
        src="/logo/2.png" 
        alt="NexGenDevs" 
        width={48} 
        height={48} 
        className="block" 
        priority
      />
    </Link>
  );
}

