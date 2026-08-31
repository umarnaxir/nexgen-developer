import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";
import AOSInit from "@/components/AOSInit";
import { Toaster } from "sonner";
import { getHomeSEO } from "@/lib/seo/page-seo";
import { OrganizationSchema } from "@/lib/seo/structured-data";
import LayoutWrapper from "@/components/LayoutWrapper";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { getContactInfo, getFooterSettings } from "@/lib/content/store";
import { getSession } from "@/lib/admin/auth";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["500", "600", "700"],
});

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

export function generateMetadata() {
  return {
    ...getHomeSEO(),
    icons: {
      icon: [
        { url: "/logo/logo.png", type: "image/png" },
        { url: "/logo/logo.png", sizes: "32x32", type: "image/png" },
      ],
      shortcut: "/logo/logo.png",
      apple: "/logo/logo.png",
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fefefe" },
    { media: "(prefers-color-scheme: dark)", color: "#040303" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contact, footer, session] = await Promise.all([
    getContactInfo(),
    getFooterSettings(),
    getSession(),
  ]);

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${playfair.variable} ${spaceGrotesk.className} antialiased`}
        suppressHydrationWarning
      >
        <GoogleTagManagerNoscript />
        <ThemeProvider>
          <OrganizationSchema contact={contact} footer={footer} />
          <ScrollToTop />
          <AOSInit />
          <Toaster position="top-right" richColors />
          <LayoutWrapper
            contact={contact}
            footer={footer}
            isAdminLoggedIn={Boolean(session)}
          >
            {children}
          </LayoutWrapper>
        </ThemeProvider>
        <GoogleTagManager />
      </body>
    </html>
  );
}