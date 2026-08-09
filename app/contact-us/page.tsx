import ContactUsHero from "./components/ContactUsHero";
import ContactSection from "@/app/home/ContactSection";
import { getContactUsSEO } from "@/lib/seo/page-seo";
import { getContactInfo, getFooterSettings } from "@/lib/content/store";

export const metadata = getContactUsSEO();
export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const [contact, footer] = await Promise.all([
    getContactInfo(),
    getFooterSettings(),
  ]);

  return (
    <>
      <ContactUsHero />
      <ContactSection variant="page" contact={contact} footer={footer} />
    </>
  );
}
