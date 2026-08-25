import HeroSection from "./home/HeroSection";
import ProjectsShowcaseSection from "./home/ProjectsShowcaseSection";
import ServicesSection from "./home/ServicesSection";
import AboutValues from "./about/components/AboutValues";
import AboutApproach from "./about/components/AboutApproach";
import HomeCtaSection from "./home/HomeCtaSection";
import FAQSection from "./home/FAQSection";
import { getHomeSEO } from "@/lib/seo/page-seo";
import { getFeaturedProjects, getContactInfo } from "@/lib/content/store";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { homeFaqs } from "@/lib/seo/faqs";

export const metadata = getHomeSEO();
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
        title="Software Development Agency India"
        description="Hire NexGen Developers for software development services in India. Custom products, AI, and growth support for startups. Request your free quote today."
        breadcrumbs={[{ name: "Home", url: "/" }]}
        faqs={homeFaqs}
      />
      <HeroSection />
      <div className="bg-white">
        <ProjectsShowcaseSection projects={featuredProjects} />
        <ServicesSection />
        <AboutApproach />
        <AboutValues />
        <FAQSection />
        <HomeCtaSection contact={contact} />
      </div>
    </>
  );
}
