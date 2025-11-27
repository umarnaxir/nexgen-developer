"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
    <nav className="hidden lg:flex items-center ml-8 xl:ml-12 space-x-2 xl:space-x-6">
      <NavLinks links={links} />
    </nav>
  );
}

