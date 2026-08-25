import PrivacyHero from "./components/PrivacyHero";
import PrivacySections from "./components/PrivacySections";
import PrivacySectionsPart2 from "./components/PrivacySectionsPart2";
import GetStartedCTA from "@/components/GetStartedCTA";
import PageFAQ from "@/components/seo/PageFAQ";
import { getPrivacySEO } from "@/lib/seo/page-seo";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { privacyFaqs } from "@/lib/seo/faqs";

export const metadata = getPrivacySEO();

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <PageJsonLd
        path="/privacy"
        title="Privacy Policy and Data Practices"
        description="Read how NexGen Developers collects, uses, and protects your data. Our privacy policy covers the site, blog, and software project inquiries. Contact us anytime."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ]}
        faqs={privacyFaqs}
      />
      <PrivacyHero />
      <section id="privacy" className="section-light section-y">
        <div className="section-container space-y-4 sm:space-y-5">
          <PrivacySections />
          <PrivacySectionsPart2 />
        </div>
      </section>
      <PageFAQ
        faqs={privacyFaqs}
        title="Privacy questions"
        description="What we collect, how we protect project data, and how to request deletion."
      />
      <GetStartedCTA />
    </main>
  );
}
