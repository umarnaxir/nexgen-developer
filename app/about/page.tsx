import AboutHero from "./components/AboutHero";
import AboutStory from "./components/AboutStory";
import AboutCapabilities from "./components/AboutCapabilities";
import AboutPillars from "./components/AboutPillars";
import AboutValues from "./components/AboutValues";
import AboutApproach from "./components/AboutApproach";
import AboutFAQ from "./components/AboutFAQ";
import GetStartedCTA from "@/components/GetStartedCTA";
import { getAboutSEO } from "@/lib/seo/page-seo";

export const metadata = getAboutSEO();

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutStory />
      <AboutCapabilities />
      <AboutPillars />
      <AboutValues />
      <AboutApproach />
      <AboutFAQ />
      <GetStartedCTA />
    </main>
  );
}
