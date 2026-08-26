import AboutHero from "./components/AboutHero";
import AboutStory from "./components/AboutStory";
import AboutCapabilities from "./components/AboutCapabilities";
import AboutPillars from "./components/AboutPillars";
import AboutValues from "./components/AboutValues";
import AboutApproach from "./components/AboutApproach";
import AboutFAQ from "./components/AboutFAQ";
import TechStackSection from "@/app/home/TechStackSection";
import GetStartedCTA from "@/components/GetStartedCTA";
import { getAboutSEO } from "@/lib/seo/page-seo";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { aboutFaqs } from "@/lib/seo/faqs";

export const metadata = getAboutSEO();

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <PageJsonLd
        path="/about"
        title="About Our Software Development Team"
        description="Meet NexGen Developers, a software development studio in Baramulla for startups. Engineers, designers, and marketers in one team. Start a project now."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
        faqs={aboutFaqs}
      />
      <AboutHero />
      <AboutStory />
      <TechStackSection />
      <AboutCapabilities />
      <AboutPillars />
      <AboutValues />
      <AboutApproach />
      <AboutFAQ />
      <GetStartedCTA />
    </main>
  );
}
