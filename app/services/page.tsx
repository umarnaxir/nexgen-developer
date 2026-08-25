import ServicesHero from "./components/ServicesHero";
import ServicesList from "./components/ServicesList";
import StatsBar from "@/components/StatsBar";
import PageFAQ from "@/components/seo/PageFAQ";
import GetStartedCTA from "@/components/GetStartedCTA";
import { getServicesSEO } from "@/lib/seo/page-seo";
import { getServicesForListingServer } from "@/lib/content/services-server";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { servicesIndexFaqs } from "@/lib/seo/faqs";

export const metadata = getServicesSEO();
export const dynamic = "force-dynamic";

export default function ServicesPage() {
  const services = getServicesForListingServer();

  return (
    <main className="min-h-screen" role="main">
      <PageJsonLd
        path="/services"
        title="Software Development Services in India"
        description="Professional software development services in India: custom products, AI, chatbots, SEO, and marketing. Compare offerings and request your quote today."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
        faqs={servicesIndexFaqs}
      />
      <ServicesHero />
      <ServicesList services={services} />
      <StatsBar />
      <PageFAQ
        faqs={servicesIndexFaqs}
        title="Questions about our services"
        description="How we scope software products, AI, SEO, and marketing — and how to choose where to start."
      />
      <GetStartedCTA />
    </main>
  );
}
