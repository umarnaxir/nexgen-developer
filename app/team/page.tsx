import TeamHero from "./components/TeamHero";
import TeamGrid from "./components/TeamGrid";
import PrivacyNote from "./components/PrivacyNote";
import GetStartedCTA from "@/components/GetStartedCTA";
import { getTeamSEO } from "@/lib/seo/page-seo";
import { getTeamMembers } from "@/lib/content/store";

export const metadata = getTeamSEO();
export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <main className="min-h-screen">
      <TeamHero />
      <TeamGrid teamMembers={teamMembers} />
      <PrivacyNote />
      <GetStartedCTA />
    </main>
  );
}
