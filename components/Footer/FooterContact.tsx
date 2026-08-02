"use client";

import React from "react";

export default function FooterContact() {
  return (
    <div className="w-full md:w-[360px] text-center md:text-right space-y-1.5">
      <h4 className="text-sm font-extrabold uppercase text-white light:text-gray-900 mb-3">
        Contact
      </h4>
      <div className="text-sm font-medium text-silver light:text-gray-600 space-y-1">
        <div>
          <a
            href="tel:+91600-616-1726"
            className="text-silver light:text-gray-600 hover:text-white light:hover:text-teal-700 underline-offset-2 transition-colors duration-200 block font-medium"
          >
            +91 6006161726
          </a>
        </div>
        <div>
          <a
            href="tel:+917889629640"
            className="text-silver light:text-gray-600 hover:text-white light:hover:text-teal-700 underline-offset-2 transition-colors duration-200 block font-medium"
          >
            +91 788-962-9640
          </a>
        </div>
      </div>
      <div className="text-sm font-medium text-silver light:text-gray-600">
        <a
          href="mailto:workwithnexgen@gmail.com"
          className="text-silver light:text-gray-600 hover:text-white light:hover:text-teal-700 underline-offset-2 transition-colors duration-200 font-medium"
        >
          workwithnexgen@gmail.com
        </a>
      </div>
    </div>
  );
}
