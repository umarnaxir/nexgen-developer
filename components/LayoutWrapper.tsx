"use client";

import { useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import SiteNavigation from "@/components/navigation/SiteNavigation";
import ContactModalProvider from "@/components/modals/ContactModalProvider";

const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), {
  ssr: false,
});

function DeferredChatWidget() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    const w = window;
    const idleId =
      typeof w.requestIdleCallback === "function"
        ? w.requestIdleCallback(enable, { timeout: 4000 })
        : w.setTimeout(enable, 2500);

    w.addEventListener("pointerdown", enable, { once: true, passive: true });
    w.addEventListener("keydown", enable, { once: true });

    return () => {
      if (typeof w.requestIdleCallback === "function") {
        w.cancelIdleCallback(idleId as number);
      } else {
        w.clearTimeout(idleId as number);
      }
      w.removeEventListener("pointerdown", enable);
      w.removeEventListener("keydown", enable);
    };
  }, []);

  if (!ready) return null;
  return <ChatWidget />;
}

interface LayoutWrapperProps {
  children: ReactNode;
  footer: ReactNode;
}

export default function LayoutWrapper({ children, footer }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isBlogPost = Boolean(pathname?.startsWith("/blogs/") && pathname.length > "/blogs/".length);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ContactModalProvider>
      <SiteNavigation />
      <div
        id="layout-root"
        className={`page-bg relative min-h-screen min-w-0 bg-background text-foreground ${
          isBlogPost ? "" : "overflow-x-clip"
        }`}
      >
        <div className="page-with-navbar relative z-10 min-w-0">
          <div className={`min-w-0 flex-1 ${isBlogPost ? "" : "overflow-x-clip"}`}>{children}</div>
          {footer}
        </div>
      </div>
      <DeferredChatWidget />
    </ContactModalProvider>
  );
}
