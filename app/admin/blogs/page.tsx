import { Metadata } from "next";
import BlogsManagement from "./components/BlogsManagement";

export const metadata: Metadata = {
  title: "Blogs Management - NexGen Admin",
  robots: { index: false, follow: false },
};

export default function BlogsPage() {
  return <BlogsManagement />;
}
