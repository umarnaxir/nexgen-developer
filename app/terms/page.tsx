import TermsHero from "./components/TermsHero";
import TermsSections from "./components/TermsSections";
import TermsSectionsPart2 from "./components/TermsSectionsPart2";
import GetStartedCTA from "@/components/GetStartedCTA";
import PageFAQ from "@/components/seo/PageFAQ";
import { getTermsSEO, termsSeoCopy } from "@/lib/seo/page-seo";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { termsFaqs } from "@/lib/seo/faqs";

export function generateMetadata() {
  return getTermsSEO();
}

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <PageJsonLd
        path="/terms"
        title={termsSeoCopy.title}
        description={termsSeoCopy.description}
        exactTitle
        exactDescription
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
        ]}
        faqs={termsFaqs}
      />
      <TermsHero />
      <section id="terms" className="section-light section-y">
        <div className="section-container space-y-4 sm:space-y-5">
          <TermsSections />
          <TermsSectionsPart2 />
        </div>
      </section>
      <PageFAQ
        faqs={termsFaqs}
        title="Terms questions"
        description="Scope changes, ownership after payment, and how these terms apply."
      />
      <GetStartedCTA />
    </main>
  );
}
