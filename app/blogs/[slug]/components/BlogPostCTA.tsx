"use client";

import { useContactModal } from "@/components/modals/ContactModalProvider";

export default function BlogPostCTA() {
  const { open: openContactModal } = useContactModal();

  return (
    <div className="glass-card mt-12 rounded-2xl p-8 text-center">
      <h2 className="text-2xl font-bold text-white light:text-gray-900 mb-4">Ready to Start Your Project?</h2>
      <p className="text-silver light:text-gray-600 mb-6">
        Let's discuss how we can help bring your ideas to life.
      </p>
      <button
        onClick={openContactModal}
        className="inline-block px-8 py-4 bg-gradient-to-r from-gold-dark to-gold-dark text-white font-bold rounded-lg hover:from-gold hover:to-gold-dark transition-all duration-300 uppercase tracking-wide hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40"
      >
        Get in Touch
      </button>
    </div>
  );
}
