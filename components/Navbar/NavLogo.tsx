"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 shrink-0 py-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Image 
          src="/images/ND.png" 
          alt="NexGenDevs" 
          width={48} 
          height={48} 
          className="block" 
          priority
        />
      </motion.div>
    </Link>
  );
}

