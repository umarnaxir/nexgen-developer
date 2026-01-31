import { notFound } from "next/navigation";
import { getServiceSEO } from "@/lib/seo/page-seo";
import {
  DIGITAL_MARKETING_SUB_SLUGS,
  getDigitalMarketingService,
} from "@/app/services/config";
import DigitalMarketingServiceContent from "./components/DigitalMarketingServiceContent";

interface DigitalMarketingServicePageProps {
  params: Promise<{ subSlug: string }>;
}

export async function generateStaticParams() {
  return DIGITAL_MARKETING_SUB_SLUGS.map((subSlug) => ({ subSlug }));
}

export async function generateMetadata({ params }: DigitalMarketingServicePageProps) {
  const { subSlug } = await params;
  const service = getDigitalMarketingService(subSlug);
  if (!service) return {};
  const path = `/services/digital-marketing/${subSlug}`;
  return getServiceSEO(path, service.seo, service.content.image);
}

export default async function DigitalMarketingServicePage({
  params,
}: DigitalMarketingServicePageProps) {
  const { subSlug } = await params;
  const service = getDigitalMarketingService(subSlug);
  if (!service) notFound();
  return <DigitalMarketingServiceContent subSlug={subSlug} />;
}
