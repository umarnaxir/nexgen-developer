import TeamHero from "./components/TeamHero";
import TeamGrid from "./components/TeamGrid";
import PrivacyNote from "./components/PrivacyNote";
import GetStartedCTA from "@/components/GetStartedCTA";
import PageFAQ from "@/components/seo/PageFAQ";
import { getTeamSEO } from "@/lib/seo/page-seo";
import { getTeamMembers } from "@/lib/content/store";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { teamFaqs } from "@/lib/seo/faqs";

export const metadata = getTeamSEO();
export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <main className="min-h-screen">
      <PageJsonLd
        path="/team"
        title="Meet Our Software Development Team"
        description="Meet the NexGen Developers software development team of engineers, designers, and marketers building products for startups. Work with our studio this week."
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
