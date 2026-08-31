import HeroSection from "./home/HeroSection";
import ProjectsShowcaseSection from "./home/ProjectsShowcaseSection";
import ServicesSection from "./home/ServicesSection";
import AboutValues from "./about/components/AboutValues";
import AboutApproach from "./about/components/AboutApproach";
import HomeCtaSection from "./home/HomeCtaSection";
import FAQSection from "./home/FAQSection";
import { getHomeSEO, homeSeoCopy } from "@/lib/seo/page-seo";
import { getFeaturedProjects, getContactInfo } from "@/lib/content/store";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { homeFaqs } from "@/lib/seo/faqs";

export function generateMetadata() {
  return getHomeSEO();
}
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredProjects, contact] = await Promise.all([
    getFeaturedProjects(),
    getContactInfo(),
  ]);

  return (
    <>
      <PageJsonLd
        path="/"
        title={homeSeoCopy.title}
        description={homeSeoCopy.description}
        exactTitle
        exactDescription
        breadcrumbs={[{ name: "Home", url: "/" }]}
        faqs={homeFaqs}
      />
      <main>
        <HeroSection />
        <div className="bg-white">
          <ProjectsShowcaseSection projects={featuredProjects} />
          <ServicesSection />
          <AboutApproach />
          <AboutValues />
          <FAQSection />
          <HomeCtaSection contact={contact} />
        </div>
      </main>
    </>
  );
}
