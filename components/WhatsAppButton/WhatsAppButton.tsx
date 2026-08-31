"use client";

import { MessageCircle } from "lucide-react";
import WhatsAppLink from "@/components/WhatsAppLink";

export default function WhatsAppButton() {
  return (
    <WhatsAppLink
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping" aria-hidden />
      <MessageCircle className="relative h-7 w-7" fill="currentColor" stroke="none" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white opacity-0 translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
    </WhatsAppLink>
  );
}
