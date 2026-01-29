"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FooterLogo() {
  return (
    <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
      <Link href="/" className="block w-full hover:scale-[1.03] transition-transform duration-300">
        <Image
          src="/logo/2.png"
          alt="ND logo"
          width={520}
          height={170}
          className="w-full h-auto object-contain"
        />
      </Link>
    </div>
  );
}
