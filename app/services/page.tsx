import ServicesHero from "./components/ServicesHero";
import ServicesList from "./components/ServicesList";
import ClientReviewsSection from "@/app/home/ClientReviewsSection";
import FAQSection from "@/app/home/FAQSection";
import ProjectsStats from "@/app/projects/components/ProjectsStats";
import ContactCTA from "../about/components/ContactCTA";
export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <ServicesHero />
          <ServicesList />
        </div>
      </section>
      <ClientReviewsSection />
      <FAQSection />
      <ProjectsStats />
      <ContactCTA />
    </div>
  );
}
