import TeamHero from "./components/TeamHero";
import TeamGrid from "./components/TeamGrid";
import PrivacyNote from "./components/PrivacyNote";
import GetStartedCTA from "@/components/GetStartedCTA";
import PageFAQ from "@/components/seo/PageFAQ";
import { getTeamSEO, teamSeoCopy } from "@/lib/seo/page-seo";
import { getTeamMembers } from "@/lib/content/store";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { teamFaqs } from "@/lib/seo/faqs";

export function generateMetadata() {
  return getTeamSEO();
}
export const revalidate = 3600;

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <main className="min-h-screen">
      <PageJsonLd
        path="/team"
        title={teamSeoCopy.title}
        description={teamSeoCopy.description}
        exactTitle
        exactDescription
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Team", url: "/team" },
        ]}
        faqs={teamFaqs}
      />
      <TeamHero />
      <TeamGrid teamMembers={teamMembers} />
      <PrivacyNote />
      <PageFAQ
        faqs={teamFaqs}
        title="Questions about the team"
        description="Who builds your product, how the studio works, and how to start."
      />
      <GetStartedCTA />
    </main>
  );
}
