import ContactUsHero from "./components/ContactUsHero";
import ContactSection from "@/app/home/ContactSection";
import PageFAQ from "@/components/seo/PageFAQ";
import { getContactUsSEO } from "@/lib/seo/page-seo";
import { getContactInfo, getFooterSettings } from "@/lib/content/store";
import { PageJsonLd } from "@/components/seo/PageJsonLd";
import { contactFaqs } from "@/lib/seo/faqs";

export const metadata = getContactUsSEO();
export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const [contact, footer] = await Promise.all([
    getContactInfo(),
    getFooterSettings(),
  ]);

  return (
    <>
      <PageJsonLd
        path="/contact-us"
        title="Contact Our Software Development Team"
        description="Contact NexGen Developers in Baramulla for software development services. Email, WhatsApp, or send a brief. We reply within one business day. Start now."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact-us" },
        ]}
        faqs={contactFaqs}
      />
      <ContactUsHero />
      <ContactSection variant="page" contact={contact} footer={footer} />
      <PageFAQ
        faqs={contactFaqs}
        title="Contact questions"
        description="How to reach the studio, what to send, and how quickly we reply."
      />
    </>
  );
}
