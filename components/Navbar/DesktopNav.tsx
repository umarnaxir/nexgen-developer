"use client";

import React from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";

interface NavLink {
  href: string;
  label: string;
}

interface DesktopNavProps {
  links: NavLink[];
}

export default function DesktopNav({ links }: DesktopNavProps) {
  return (
    <nav className="flex items-center space-x-2 xl:space-x-6">
      <NavLinks links={links} />
    </nav>
  );
}

