import ContactUsHero from "./components/ContactUsHero";
import ContactSection from "@/app/home/ContactSection";
import { getContactUsSEO } from "@/lib/seo/page-seo";

export const metadata = getContactUsSEO();

export default function ContactUsPage() {
  return (
    <>
      <ContactUsHero />
      <ContactSection variant="page" />
    </>
  );
}
