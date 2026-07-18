import ServicesHero from "./components/ServicesHero";
import ServicesList from "./components/ServicesList";
import StatsBar from "@/components/StatsBar";
import FAQSection from "@/app/home/FAQSection";
import GetStartedCTA from "@/components/GetStartedCTA";
import { getServicesSEO } from "@/lib/seo/page-seo";

export const metadata = getServicesSEO();

export default function ServicesPage() {
  return (
    <main className="min-h-screen" role="main">
      <ServicesHero />
      <ServicesList />
      <StatsBar />
      <FAQSection />
      <GetStartedCTA />
    </main>
  );
}
