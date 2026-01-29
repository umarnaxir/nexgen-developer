"use client";

import Image from "next/image";

interface BlogPostContentProps {
  blog: {
    title: string;
    sections: Array<{
      type: 'text' | 'image' | 'heading';
      content?: string;
      heading?: string;
      headingLevel?: 1 | 2 | 3;
      image?: string;
    }>;
  };
}

export default function BlogPostContent({ blog }: BlogPostContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {blog.sections.map((section, index) => {
        if (section.type === 'heading') {
          const HeadingTag = `h${section.headingLevel || 2}` as keyof React.JSX.IntrinsicElements;
          return (
            <HeadingTag
              key={index}
              className={`font-bold text-black mb-6 mt-12 ${
                section.headingLevel === 1 ? 'text-4xl' :
                section.headingLevel === 2 ? 'text-3xl' :
                'text-2xl'
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 50}
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
              data-aos="zoom-in"
              data-aos-delay={index * 50}
            >
              <Image
                src={section.image || "/images/dummy-img.jpeg"}
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
              data-aos-delay={index * 50}
            >
              {section.content}
            </p>
          );
        }
        
        return null;
      })}
    </div>
  );
}
