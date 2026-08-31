import ServicesHero from "./components/ServicesHero";
import ServicesIntro from "./components/ServicesIntro";
import ServicesList from "./components/ServicesList";
import StatsBar from "@/components/StatsBar";
import PageFAQ from "@/components/seo/PageFAQ";
import GetStartedCTA from "@/components/GetStartedCTA";
import { getServicesSEO, servicesSeoCopy } from "@/lib/seo/page-seo";
import { getServicesForListingServer } from "@/lib/content/services-server";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { servicesIndexFaqs } from "@/lib/seo/faqs";

export function generateMetadata() {
  return getServicesSEO();
}
export const dynamic = "force-dynamic";

export default function ServicesPage() {
  const services = getServicesForListingServer();

  return (
    <main className="min-h-screen" role="main">
      <PageJsonLd
        path="/services"
        title={servicesSeoCopy.title}
        description={servicesSeoCopy.description}
        exactTitle
        exactDescription
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ]}
        faqs={servicesIndexFaqs}
      />
      <ServicesHero title={servicesSeoCopy.title} />
      <ServicesIntro />
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
