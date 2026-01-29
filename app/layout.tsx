import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AOSInit from "@/components/AOSInit";
import { Toaster } from "sonner";
import { getHomeSEO } from "@/lib/seo/page-seo";
import { OrganizationSchema, WebsiteSchema } from "@/lib/seo/structured-data";

const spaceGrotesk = localFont({
  src: [
    {
      path: "./assets/fonts/static/SpaceGrotesk-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/static/SpaceGrotesk-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/static/SpaceGrotesk-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./assets/fonts/static/SpaceGrotesk-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./assets/fonts/static/SpaceGrotesk-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Root layout uses default home SEO
export const metadata = getHomeSEO();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased`}
      >
        <OrganizationSchema />
        <WebsiteSchema />
        <AOSInit />
        <Toaster position="top-right" richColors />
        <div className={`min-h-screen bg-white text-gray-800 ${spaceGrotesk.className}`}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
