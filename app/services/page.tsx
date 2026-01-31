import dynamic from "next/dynamic";
import ServicesHero from "./components/ServicesHero";
import ServicesList from "./components/ServicesList";
import { getServicesSEO } from "@/lib/seo/page-seo";

export const metadata = getServicesSEO();

const ClientReviewsSection = dynamic(
  () => import("@/app/home/ClientReviewsSection"),
  { ssr: true, loading: () => <div className="min-h-[200px]" /> }
);
const FAQSection = dynamic(() => import("@/app/home/FAQSection"), {
  ssr: true,
  loading: () => <div className="min-h-[200px]" />,
});
const ProjectsStats = dynamic(
  () => import("@/app/projects/components/ProjectsStats"),
  { ssr: true, loading: () => <div className="min-h-[120px]" /> }
);
const ContactCTA = dynamic(() => import("../about/components/ContactCTA"), {
  ssr: true,
  loading: () => <div className="min-h-[100px]" />,
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen" role="main">
      <section aria-labelledby="services-heading" className="pt-8 sm:pt-10 md:pt-12 lg:pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <ServicesHero />
          <ServicesList />
        </div>
      </section>
      <ClientReviewsSection />
      <FAQSection />
      <ProjectsStats />
      <ContactCTA />
    </main>
  );
}
