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
      <div className="text-sm font-medium text-gray-700 space-y-1">
        <div>
          <a
            href="tel:+91600-616-1726"
            className="text-gray-900 hover:text-black underline-offset-2 transition-colors duration-200 block font-medium"
          >
            +91 6006161726
          </a>
        </div>
        <div>
          <a
            href="tel:+917889629640"
            className="text-gray-900 hover:text-black underline-offset-2 transition-colors duration-200 block font-medium"
          >
            +91 788-962-9640
          </a>
        </div>
      </div>
      <div className="text-sm font-medium text-gray-700">
        <a
          href="mailto:nexgendevelopers11@gmail.com"
          className="text-gray-900 hover:text-black underline-offset-2 transition-colors duration-200 font-medium"
        >
          nexgendevelopers11@gmail.com
        </a>
      </div>
    </motion.div>
  );
}

