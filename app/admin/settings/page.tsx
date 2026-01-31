import { Metadata } from "next";
import SettingsManagement from "./components/SettingsManagement";

export const metadata: Metadata = {
  title: "Settings - NexGen Admin",
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return <SettingsManagement />;
}
