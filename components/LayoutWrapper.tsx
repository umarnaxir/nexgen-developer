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
  const isBlogPost = Boolean(pathname?.startsWith("/blogs/") && pathname.length > "/blogs/".length);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ContactModalProvider>
      <SiteNavigation isAdminLoggedIn={isAdminLoggedIn} />
      <div
        id="layout-root"
        className={`page-bg relative min-h-screen min-w-0 bg-background text-foreground ${
          isBlogPost ? "" : "overflow-x-clip"
        }`}
      >
        <div className="page-with-navbar relative z-10 min-w-0">
          <div className={`min-w-0 flex-1 ${isBlogPost ? "" : "overflow-x-clip"}`}>{children}</div>
          <Footer contact={contact} footer={footer} />
          {SHOW_WHATSAPP_BUTTON && <WhatsAppButton />}
        </div>
      </div>
      <ChatWidget />
    </ContactModalProvider>
  );
}
