import TeamHero from "./components/TeamHero";
import TeamGrid from "./components/TeamGrid";
import PrivacyNote from "./components/PrivacyNote";
import GetStartedCTA from "@/components/GetStartedCTA";
import { getTeamSEO } from "@/lib/seo/page-seo";

export const metadata = getTeamSEO();

export default function TeamPage() {
  return (
    <main className="min-h-screen">
      <TeamHero />
      <TeamGrid />
      <PrivacyNote />
      <GetStartedCTA />
    </main>
  );
}
