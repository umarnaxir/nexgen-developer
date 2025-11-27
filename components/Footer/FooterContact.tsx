"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FooterContact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full md:w-[360px] text-center md:text-right space-y-1.5"
    >
      <h4 className="text-sm font-extrabold uppercase text-gray-900 mb-3">
        Contact
      </h4>
      <div className="text-sm font-medium text-gray-700">
        Phone:{" "}
        <a
          href="tel:6006161726"
          className="text-gray-900 hover:underline underline-offset-2 transition-colors duration-200"
        >
          6006161726
        </a>
      </div>
      <div className="text-sm font-medium text-gray-700">
        Email:{" "}
        <a
          href="mailto:nexgendeveliopers11@gmial.com"
          className="text-gray-900 hover:underline underline-offset-2 transition-colors duration-200"
        >
          nexgendeveliopers11@gmial.com
        </a>
      </div>
    </motion.div>
  );
}

