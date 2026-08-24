import { notFound } from "next/navigation";
import { getServiceSEO } from "@/lib/seo/page-seo";
import {
  getRelatedServicesUpToSixServer,
  getTopLevelServiceServer,
} from "@/lib/content/services-server";
import ServicePageContent from "./components/ServicePageContent";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getTopLevelServiceServer(slug);
  if (!service) return {};
  const path = `/services/${slug}`;
  return getServiceSEO(path, service.seo);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getTopLevelServiceServer(slug);
  if (!service) notFound();
  const related = getRelatedServicesUpToSixServer(
    service.relatedSlugs,
    service.slug
  );
  return <ServicePageContent service={service} relatedServices={related} />;
}
