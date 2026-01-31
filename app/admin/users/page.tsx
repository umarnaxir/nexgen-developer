import { Metadata } from "next";
import UsersManagement from "./components/UsersManagement";

export const metadata: Metadata = {
  title: "Users Management - NexGen Admin",
  robots: { index: false, follow: false },
};

export default function UsersPage() {
  return <UsersManagement />;
}
