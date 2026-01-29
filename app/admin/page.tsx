import AdminContent from "./components/AdminContent";
import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo/utils";

// Admin page should not be indexed
export const metadata: Metadata = generateMetadata({
  title: "Admin",
  description: "Admin page",
  canonical: "/admin",
  noindex: true,
  nofollow: true,
  robots: {
    index: false,
    follow: false,
  },
});

export default function AdminPage() {
  return <AdminContent />;
}
