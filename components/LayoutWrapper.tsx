"use client";

import dynamic from "next/dynamic";
import SiteNavigation from "@/components/navigation/SiteNavigation";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import ContactModalProvider from "@/components/modals/ContactModalProvider";

// Lazy load chatbot — client-only, no SSR
const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), {
  ssr: false,
});

interface LayoutWrapperProps {
  children: React.ReactNode;
}

const SHOW_WHATSAPP_BUTTON = false;

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <ContactModalProvider>
      <SiteNavigation />
      <div id="layout-root" className="relative min-h-screen bg-black text-white">
        <div className="page-with-rail relative z-10">
          <main className="flex-1">{children}</main>
          <Footer />
          {SHOW_WHATSAPP_BUTTON && <WhatsAppButton />}
        </div>
      </div>
      <ChatWidget />
    </ContactModalProvider>
  );
}
