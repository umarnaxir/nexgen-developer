import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
