"use client";

import SiteNavigation from "@/components/navigation/SiteNavigation";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import ContactModalProvider from "@/components/modals/ContactModalProvider";

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
    </ContactModalProvider>
  );
}
