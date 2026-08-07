import { notFound } from "next/navigation";
import { getServiceSEO } from "@/lib/seo/page-seo";
import {
  getDigitalMarketingServiceServer,
  getRelatedServicesUpToSixServer,
} from "@/lib/content/services-server";
import DigitalMarketingServiceContent from "./components/DigitalMarketingServiceContent";

interface DigitalMarketingServicePageProps {
  params: Promise<{ subSlug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: DigitalMarketingServicePageProps) {
  const { subSlug } = await params;
  const service = getDigitalMarketingServiceServer(subSlug);
  if (!service) return {};
  const path = `/services/digital-marketing/${subSlug}`;
  return getServiceSEO(path, service.seo, service.content.image);
}

export default async function DigitalMarketingServicePage({
  params,
}: DigitalMarketingServicePageProps) {
  const { subSlug } = await params;
  const service = getDigitalMarketingServiceServer(subSlug);
  if (!service) notFound();
  const related = getRelatedServicesUpToSixServer(
    service.relatedSlugs,
    service.slug
  );
  return (
    <DigitalMarketingServiceContent
      service={service}
      relatedServices={related}
    />
  );
}
