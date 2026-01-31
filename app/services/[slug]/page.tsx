import { notFound } from "next/navigation";
import { getServiceSEO } from "@/lib/seo/page-seo";
import {
  TOP_LEVEL_SLUGS,
  getTopLevelService,
} from "@/app/services/config";
import ServicePageContent from "./components/ServicePageContent";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TOP_LEVEL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getTopLevelService(slug);
  if (!service) return {};
  const path = `/services/${slug}`;
  return getServiceSEO(path, service.seo, service.content.image);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getTopLevelService(slug);
  if (!service) notFound();
  return <ServicePageContent slug={slug} />;
}
