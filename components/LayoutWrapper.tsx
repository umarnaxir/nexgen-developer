"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import BackToTop from "@/components/BackToTop/BackToTop";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Check if current path is an admin route
  const isAdminRoute = pathname?.startsWith("/admin");

  // Don't show Navbar, Footer, and BackToTop on admin routes
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div id="layout-root" className="page-bg relative min-h-screen text-gray-800">
      <div className="relative z-10">
        <Navbar />
        <main className="flex-1 pt-16 lg:pt-0">{children}</main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}
