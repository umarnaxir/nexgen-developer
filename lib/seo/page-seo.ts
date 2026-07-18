import { Metadata } from "next";
import { generateMetadata, SEOProps } from "./utils";
import { seoConfig } from "./config";

/**
 * Home Page SEO
 * Aligned with hero: Team of Freelancers, build/launch/grow, AI/ML, chatbots, web & app, digital marketing.
 */
export function getHomeSEO(): Metadata {
 return generateMetadata({
 title: "NexGen Developers. Build, Launch & Grow Your Business",
 description: "A creative platform to build, launch, and grow your business. We help startups and local brands with AI/ML, chatbots, web & app development, and more",
 keywords: [
 "freelance developers",
 "web development services",
 "AI ML solutions",
 "chatbot development",
 "digital marketing",
 "startup development",
 "build launch grow",
 ],
 canonical: "/",
 openGraph: {
 type: "website",
 title: "NexGen Developers. Build, Launch & Grow Your Business",
 description: "A creative platform to build, launch, and grow your business. We help startups and local brands with AI/ML, chatbots, web & app development, and digital marketing.",
 url: "/",
 },
 });
}

/**
 * About Page SEO
 */
export function getAboutSEO(): Metadata {
 return generateMetadata({
 title: "About Us - NexGen Developers",
 description: "Learn about NexGen Developers, a team of skilled freelancers specializing in AI/ML, web development, app development, chatbots, SEO, and other services.",
 keywords: [
 "about nexgen developers",
 "freelance team",
 "web developers",
 "AI developers",
 "app developers",
 ],
 canonical: "/about",
 openGraph: {
 type: "website",
 title: "About Us - NexGen Developers",
 description: "Learn about NexGen Developers, a team of skilled freelancers specializing in AI/ML, web development, app development, chatbots, SEO, and digital marketing services.",
 url: "/about",
 },
 });
}

/**
 * Services Page SEO
 */
export function getServicesSEO(): Metadata {
 return generateMetadata({
 title: "Our Services - NexGen Developers",
 description: "Comprehensive services including web development, mobile app development, AI/ML solutions, chatbot development, SEO & digital marketing, and more.",
 keywords: [
 "web development services",
 "mobile app development",
 "AI ML services",
 "chatbot development",
 "SEO services",
 "digital marketing",
 "graphic design services",
 ],
 canonical: "/services",
 openGraph: {
 type: "website",
 title: "Our Services - NexGen Developers",
 description: "Comprehensive services including web development, mobile app development, AI/ML solutions, chatbot development, SEO & digital marketing, graphic design, and more.",
 url: "/services",
 },
 });
}

/**
 * Team Page SEO
 */
export function getTeamSEO(): Metadata {
 return generateMetadata({
 title: "Our Team - NexGen Developers",
 description: "Meet the talented team of freelancers at NexGen Developers. Skilled professionals in web development, AI/ML, app development, and digital marketing.",
 keywords: [
 "nexgen developers team",
 "freelance developers",
 "web developers",
 "AI developers",
 "app developers",
 ],
 canonical: "/team",
 openGraph: {
 type: "website",
 title: "Our Team - NexGen Developers",
 description: "Meet the talented team of freelancers at NexGen Developers. Skilled professionals in web development, AI/ML, app development, and digital marketing.",
 url: "/team",
 },
 });
}

/**
 * Projects Page SEO
 */
export function getProjectsSEO(): Metadata {
 return generateMetadata({
 title: "Our Projects - NexGen Developers",
 description: "Explore our portfolio of successful projects including web applications, mobile apps, AI/ML solutions, chatbots, and digital marketing campaigns.",
 keywords: [
 "nexgen developers portfolio",
 "web development projects",
 "app development projects",
 "AI ML projects",
 "chatbot projects",
 ],
 canonical: "/projects",
 openGraph: {
 type: "website",
 title: "Our Projects - NexGen Developers",
 description: "Explore our portfolio of successful projects including web applications, mobile apps, AI/ML solutions, chatbots, and digital marketing campaigns.",
 url: "/projects",
 },
 });
}

/**
 * Blogs Page SEO
 */
export function getBlogsSEO(): Metadata {
 return generateMetadata({
 title: "Blog - NexGen Developers",
 description: "Read our latest articles on web development, AI/ML, chatbots, SEO, app development, and digital marketing trends and best practices.",
 keywords: [
 "web development blog",
 "AI ML blog",
 "SEO blog",
 "app development blog",
 "digital marketing blog",
 ],
 canonical: "/blogs",
 openGraph: {
 type: "website",
 title: "Blog - NexGen Developers",
 description: "Read our latest articles on web development, AI/ML, chatbots, SEO, app development, and digital marketing trends and best practices.",
 url: "/blogs",
 },
 });
}

/**
 * Blog Post SEO (Dynamic)
 */
export function getBlogPostSEO({
 title,
 description,
 slug,
 image,
 publishedDate,
 modifiedDate,
 author,
 category,
 keywords: postKeywords,
}: {
 title: string;
 description: string;
 slug: string;
 image?: string;
 publishedDate: string;
 modifiedDate?: string;
 author?: string;
 category?: string;
 keywords?: string[];
}): Metadata {
 const url = `/blogs/${slug}`;
 const ogImage = image 
 ? (image.startsWith("http") ? image : `${seoConfig.siteUrl}${image.startsWith("/") ? image : `/${image}`}`)
 : seoConfig.defaultOgImage;

 const keywords = [
 category || "blog",
 "nexgen developers",
 ...(title.toLowerCase().split(" ") || []),
 ...(postKeywords || []),
 ];

 return generateMetadata({
 title: title,
 description: description,
 keywords,
 canonical: url,
 openGraph: {
 type: "article",
 title: title,
 description: description,
 url: url,
 images: [{
 url: ogImage,
 width: 1200,
 height: 630,
 alt: title,
 }],
 publishedTime: publishedDate,
 ...(modifiedDate && { modifiedTime: modifiedDate }),
 ...(author && { authors: [author] }),
 ...(category && { section: category }),
 },
 twitter: {
 card: "summary_large_image",
 title: title,
 description: description,
 images: [ogImage],
 },
 });
}

/**
 * Pricing Page SEO
 */
export function getPricingSEO(): Metadata {
 return generateMetadata({
 title: "Transparent Pricing Models - NexGen Developers",
 description: "Choose the perfect plan for your business: Essential, Growth, Premium, or Enterprise. from entry-level to custom solutions.",
 keywords: [
 "pricing",
 "web development pricing",
 "website packages",
 "essential plan",
 "growth plan",
 "premium plan",
 "enterprise solution",
 ],
 canonical: "/pricing",
 openGraph: {
 type: "website",
 title: "Transparent Pricing Models - NexGen Developers",
 description: "Choose the perfect plan for your business. From essential presence to scalable digital assets.",
 url: "/pricing",
 },
 });
}

/**
 * Privacy Page SEO
 */
export function getPrivacySEO(): Metadata {
 return generateMetadata({
 title: "Privacy Policy - NexGen",
 description: "Read our privacy policy to understand how NexGen collects, uses, and protects your personal information when you use our services, browse our website, or read our blog.",
 keywords: [
 "privacy policy",
 "data protection",
 "privacy",
 ],
 canonical: "/privacy",
 robots: {
 index: true,
 follow: true,
 },
 openGraph: {
 type: "website",
 title: "Privacy Policy - NexGen",
 description: "Read our privacy policy to understand how NexGen collects, uses, and protects your personal information when you use our services, browse our website, or read our blog.",
 url: "/privacy",
 },
 });
}

/**
 * Terms Page SEO
 */
export function getTermsSEO(): Metadata {
 return generateMetadata({
 title: "Terms of Service - NexGen",
 description: "Read our terms of service for using NexGen, a service-based team of freelance developers and designers helping startups and local brands build, launch, and grow.",
 keywords: [
 "terms of service",
 "terms and conditions",
 "legal",
 ],
 canonical: "/terms",
 robots: {
 index: true,
 follow: true,
 },
 openGraph: {
 type: "website",
 title: "Terms of Service - NexGen",
 description: "Read our terms of service for using NexGen, a service-based team of freelance developers and designers helping startups and local brands build, launch, and grow.",
 url: "/terms",
 },
 });
}

/**
 * Contact Us Page SEO
 */
export function getContactUsSEO(): Metadata {
 return generateMetadata({
 title: "Contact Us - NexGen Developers",
 description: "Get in touch with NexGen Developers. We work remotely with a team of freelancers. Send a message or connect on social media.",
 keywords: [
 "contact nexgen developers",
 "freelance contact",
 "get in touch",
 "remote team",
 ],
 canonical: "/contact-us",
 openGraph: {
 type: "website",
 title: "Contact Us - NexGen Developers",
 description: "Get in touch with NexGen Developers. We work remotely with a team of freelancers.",
 url: "/contact-us",
 },
 });
}

/**
 * Service Page SEO (dynamic: top-level or digital-marketing sub)
 * Includes canonical, OpenGraph, Twitter, and OG image.
 */
export function getServiceSEO(
 canonicalPath: string,
 seo: {
 title: string;
 description: string;
 keywords: string[];
 },
 ogImage?: string
): Metadata {
 const imageUrl = ogImage
 ? ogImage.startsWith("http")
 ? ogImage
 : `${seoConfig.siteUrl}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`
 : seoConfig.defaultOgImage;

 return generateMetadata({
 title: seo.title,
 description: seo.description,
 keywords: seo.keywords,
 canonical: canonicalPath,
 openGraph: {
 type: "website",
 title: seo.title,
 description: seo.description,
 url: canonicalPath,
 images: [
 {
 url: imageUrl,
 width: 1200,
 height: 630,
 alt: seo.title,
 },
 ],
 },
 twitter: {
 card: "summary_large_image",
 title: seo.title,
 description: seo.description,
 images: [imageUrl],
 },
 });
}
