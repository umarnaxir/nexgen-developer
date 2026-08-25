import TermsHero from "./components/TermsHero";
import TermsSections from "./components/TermsSections";
import TermsSectionsPart2 from "./components/TermsSectionsPart2";
import GetStartedCTA from "@/components/GetStartedCTA";
import PageFAQ from "@/components/seo/PageFAQ";
import { getTermsSEO } from "@/lib/seo/page-seo";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { termsFaqs } from "@/lib/seo/faqs";

export const metadata = getTermsSEO();

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <PageJsonLd
        path="/terms"
        title="Terms of Service and Usage Rules"
        description="Review NexGen Developers terms of service for the website and client software work. Clear rules before you hire our development studio. Read the full terms now."
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
