import { Metadata } from "next";
import PagesManagement from "./components/PagesManagement";

export const metadata: Metadata = {
  title: "Pages Management - NexGen Admin",
  robots: { index: false, follow: false },
};

export default function PagesPage() {
  return <PagesManagement />;
}
