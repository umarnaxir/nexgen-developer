import ServicesHero from "./components/ServicesHero";
import ServicesList from "./components/ServicesList";
import StatsBar from "@/components/StatsBar";
import FAQSection from "@/app/home/FAQSection";
import GetStartedCTA from "@/components/GetStartedCTA";
import { getServicesSEO } from "@/lib/seo/page-seo";
import { getServicesForListingServer } from "@/lib/content/services-server";

export const metadata = getServicesSEO();
export const dynamic = "force-dynamic";

export default function ServicesPage() {
  const services = getServicesForListingServer();

  return (
    <main className="min-h-screen" role="main">
      <ServicesHero />
      <ServicesList services={services} />
      <StatsBar />
      <FAQSection />
      <GetStartedCTA />
    </main>
  );
}
