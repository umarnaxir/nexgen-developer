"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import SiteNavigation from "@/components/navigation/SiteNavigation";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import ContactModalProvider from "@/components/modals/ContactModalProvider";
import type { ContactInfo, FooterSettings } from "@/lib/content/types";

const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), {
  ssr: false,
});

interface LayoutWrapperProps {
  children: React.ReactNode;
  contact: ContactInfo;
  footer: FooterSettings;
  isAdminLoggedIn?: boolean;
}

const SHOW_WHATSAPP_BUTTON = false;

export default function LayoutWrapper({
  children,
  contact,
  footer,
  isAdminLoggedIn = false,
}: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ContactModalProvider>
      <SiteNavigation isAdminLoggedIn={isAdminLoggedIn} />
      <div id="layout-root" className="relative min-h-screen bg-black text-white">
        <div className="page-with-rail relative z-10">
          <main className="flex-1">{children}</main>
          <Footer contact={contact} footer={footer} />
          {SHOW_WHATSAPP_BUTTON && <WhatsAppButton />}
        </div>
      </div>
      <ChatWidget />
    </ContactModalProvider>
  );
}
