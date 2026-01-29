import TeamHero from "./components/TeamHero";
import TeamGrid from "./components/TeamGrid";
import PrivacyNote from "./components/PrivacyNote";
import { getTeamSEO } from "@/lib/seo/page-seo";

export const metadata = getTeamSEO();

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-black">
      <TeamHero />
      <TeamGrid />
      <PrivacyNote />
    </div>
  );
}
