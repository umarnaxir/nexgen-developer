import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AOSInit from "@/components/AOSInit";
import { Toaster } from "sonner";

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

export const metadata = {
  metadataBase: new URL("https://nexgendevelopers.vercel.app"),
  title: {
    default: "NexGen Developers - The Team of Freelancers",
    template: "%s | NexGen Developers",
  },
  description:
    "We are freelancers helping startups and local businesses with AI/ML, chatbots, web & app development, Digital Marketing and more.",
  keywords: [
    "NexGen Developers",
    "freelancers",
    "AI/ML",
    "chatbots",
    "SEO",
    "web development",
    "app development",
    "graphic design",
    "digital marketing",
  ],
  authors: [{ name: "NexGen Developers", url: "https://nexgendevelopers.vercel.app" }],
  creator: "NexGen Developers",
  publisher: "NexGen Developers",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://nexgendevelopers.vercel.app",
  },

  openGraph: {
    type: "website",
    url: "https://nexgendevelopers.vercel.app",
    title: "NexGen Developers - The Team of Freelancers",
    description:
      "We are freelancers helping startups and local businesses with AI/ML, chatbots, SEO, web & app development, and more.",
    siteName: "NexGen Developers",
    images: [
      {
        url: "https://nexgendevelopers.vercel.app/og-image.jpg", // ✅ create an OG image
        width: 1200,
        height: 630,
        alt: "NexGen Developers - Team of Freelancers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@nexgendevelopers", // ✅ replace with your handle if you have
    creator: "@nexgendevelopers",
    title: "NexGen Developers - The Team of Freelancers",
    description:
      "Freelancers helping startups & local businesses with AI/ML, chatbots, SEO, web & app development, and design.",
    images: ["https://nexgendevelopers.vercel.app/og-image.jpg"],
  },

  icons: {
    icon: [
      { url: "/logo/2.png", type: "image/png" },
      { url: "/logo/2.png", sizes: "any" }
    ],
    shortcut: "/logo/2.png",
    apple: "/logo/2.png",
  },

  verification: {
    google: "your-google-verification-code", // ✅ add from Google Search Console
    bing: "your-bing-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased`}
      >
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
