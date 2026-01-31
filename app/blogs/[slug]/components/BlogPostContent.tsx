"use client";

import Image from "next/image";
import Link from "next/link";

interface BlogPostContentProps {
  blog: {
    title: string;
    images?: string[];
    sections: Array<{
      type: 'text' | 'image' | 'heading';
      content?: string;
      heading?: string;
      headingLevel?: 1 | 2 | 3;
      image?: string;
    }>;
    internalLink: { href: string; text: string };
    externalLink: { href: string; text: string };
  };
}

export default function BlogPostContent({ blog }: BlogPostContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {blog.sections.map((section, index) => {
        const aosDelay = Math.min(index * 50, 400);

        if (section.type === 'heading') {
          const HeadingTag = `h${section.headingLevel || 2}` as keyof React.JSX.IntrinsicElements;
          return (
            <HeadingTag
              key={index}
              data-aos="fade-up"
              data-aos-delay={aosDelay}
              className={`font-bold text-black mb-6 mt-12 ${
                section.headingLevel === 1 ? 'text-4xl' :
                section.headingLevel === 2 ? 'text-3xl' :
                'text-2xl'
              }`}
            >
              {section.heading}
            </HeadingTag>
          );
        }

        if (section.type === 'image') {
          return (
            <div
              key={index}
              className="relative w-full h-64 sm:h-96 my-12 rounded-xl overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={aosDelay}
            >
              <Image
                src={section.image || blog.images?.[0] || "/images/blogs/ai-blog.jpg"}
                alt={`${blog.title} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          );
        }

        if (section.type === 'text') {
          return (
            <p
              key={index}
              className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg"
              data-aos="fade-up"
              data-aos-delay={aosDelay}
            >
              {section.content}
            </p>
          );
        }

        return null;
      })}

      {/* Internal + External links for SEO and UX */}
      <div
        className="mt-12 p-6 rounded-xl bg-gray-50 border border-gray-200"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h3 className="text-xl font-bold text-black mb-4">Further reading</h3>
        <ul className="space-y-3">
          <li>
            <Link
              href={blog.internalLink.href}
              className="text-black font-semibold hover:underline underline-offset-2"
            >
              {blog.internalLink.text} →
            </Link>
            <span className="text-gray-500 text-sm ml-1">(our services)</span>
          </li>
          <li>
            <a
              href={blog.externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-semibold hover:underline underline-offset-2"
            >
              {blog.externalLink.text} ↗
            </a>
            <span className="text-gray-500 text-sm ml-1">(external)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
