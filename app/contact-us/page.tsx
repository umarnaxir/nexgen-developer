import ContactUsHero from "./components/ContactUsHero";
import ContactSection from "@/app/home/ContactSection";
import PageFAQ from "@/components/seo/PageFAQ";
import { getContactUsSEO, contactSeoCopy } from "@/lib/seo/page-seo";
import { getContactInfo, getFooterSettings } from "@/lib/content/store";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { contactFaqs } from "@/lib/seo/faqs";

export function generateMetadata() {
  return getContactUsSEO();
}
export const revalidate = 3600;

export default async function ContactUsPage() {
  const [contact, footer] = await Promise.all([
    getContactInfo(),
    getFooterSettings(),
  ]);

  return (
    <>
      <PageJsonLd
        path="/contact-us"
        title={contactSeoCopy.title}
        description={contactSeoCopy.description}
        exactTitle
        exactDescription
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact-us" },
        ]}
        faqs={contactFaqs}
      />
      <main>
        <ContactUsHero />
        <ContactSection variant="page" contact={contact} footer={footer} />
        <PageFAQ
          faqs={contactFaqs}
          title="Contact questions"
          description="How to reach the studio, what to send, and how quickly we reply."
        />
      </main>
    </>
  );
}
