"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import ContactModal from "@/components/modals/ContactModal";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  // All blog posts for related posts (images match service/topic by title)
  const allBlogs = [
    {
      title: "Getting Started with AI/ML in Your Business",
      slug: "getting-started-with-ai-ml-in-your-business",
      excerpt: "Learn how artificial intelligence and machine learning can transform your business operations and drive growth.",
      date: "January 15, 2025",
      category: "AI/ML",
      image: "/images/ai.jpg"
    },
    {
      title: "Best Practices for Web Development in 2025",
      slug: "best-practices-for-web-development-in-2025",
      excerpt: "Discover the latest trends and best practices in web development to create modern, responsive websites.",
      date: "January 10, 2025",
      category: "Web Development",
      image: "/images/website.jpg"
    },
    {
      title: "SEO Strategies That Actually Work",
      slug: "seo-strategies-that-actually-work",
      excerpt: "Explore proven SEO strategies that can help improve your website's visibility and drive organic traffic.",
      date: "January 5, 2025",
      category: "SEO",
      image: "/images/seo.jpg"
    },
    {
      title: "Building Scalable Applications: A Complete Guide",
      slug: "building-scalable-applications-complete-guide",
      excerpt: "Learn how to build applications that can grow with your business and handle increasing traffic.",
      date: "December 28, 2024",
      category: "App Development",
      image: "/images/app.jpg"
    },
    {
      title: "The Future of Chatbots in Customer Service",
      slug: "future-of-chatbots-in-customer-service",
      excerpt: "Discover how AI-powered chatbots are revolutionizing customer service and improving user experiences.",
      date: "December 20, 2024",
      category: "Chatbots",
      image: "/images/chatbot.jpg"
    },
    {
      title: "Graphic Design Trends for 2025",
      slug: "graphic-design-trends-for-2025",
      excerpt: "Stay ahead of the curve with the latest graphic design trends that will shape the visual landscape in 2025.",
      date: "December 15, 2024",
      category: "Design",
      image: "/images/graphic.jpg"
    }
  ];

  // Blog posts data with structured content sections
  const blogPosts: Record<string, {
    title: string;
    slug: string;
    excerpt: string;
    date: string;
    category: string;
    author: string;
    readTime: string;
    images: string[];
    sections: Array<{
      type: 'text' | 'image' | 'heading';
      content?: string;
      heading?: string;
      headingLevel?: 1 | 2 | 3;
      image?: string;
    }>;
  }> = {
    "getting-started-with-ai-ml-in-your-business": {
      title: "Getting Started with AI/ML in Your Business",
      slug: "getting-started-with-ai-ml-in-your-business",
      excerpt: "Learn how artificial intelligence and machine learning can transform your business operations and drive growth.",
      date: "January 15, 2025",
      category: "AI/ML",
      author: "NexGen Developers Team",
      readTime: "10 min read",
      images: ["/images/ai.jpg", "/images/dummy-img.jpeg", "/images/dummy-img.jpeg"],
      sections: [
        { type: 'text', content: "Artificial Intelligence and Machine Learning are no longer futuristic concepts—they're powerful tools that can transform your business today. In this comprehensive guide, we'll explore how AI/ML can drive growth, improve efficiency, and create competitive advantages for your organization. The integration of AI and ML technologies has become essential for businesses looking to stay competitive in an increasingly digital world." },
        { type: 'heading', heading: "Understanding AI and ML: The Foundation", headingLevel: 2 },
        { type: 'text', content: "AI (Artificial Intelligence) refers to computer systems that can perform tasks typically requiring human intelligence, such as visual perception, speech recognition, decision-making, and language translation. ML (Machine Learning) is a subset of AI that enables systems to learn and improve from experience without being explicitly programmed. These technologies work together to create intelligent systems that can adapt, learn, and make decisions based on data patterns." },
        { type: 'text', content: "The difference between traditional programming and machine learning is fundamental. In traditional programming, developers write explicit instructions for every scenario. Machine learning, however, allows systems to identify patterns in data and make predictions or decisions based on those patterns. This capability makes ML particularly powerful for tasks involving large datasets, complex patterns, or scenarios where explicit rules are difficult to define." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "The Business Case for AI/ML Implementation", headingLevel: 2 },
        { type: 'text', content: "Implementing AI/ML solutions can help you automate repetitive tasks and processes, freeing up your team to focus on strategic, high-value work. This automation extends beyond simple rule-based tasks to complex decision-making processes. For example, AI can analyze customer service interactions to identify common issues, predict maintenance needs for equipment, or optimize supply chain logistics." },
        { type: 'heading', heading: "Key Benefits of AI/ML", headingLevel: 3 },
        { type: 'text', content: "Data-driven decision making becomes faster and more accurate with AI/ML. These systems can process vast amounts of data in seconds, identifying trends and patterns that would take humans weeks or months to discover. This speed advantage allows businesses to respond quickly to market changes, customer needs, and operational challenges." },
        { type: 'text', content: "Customer experiences improve dramatically through personalization enabled by AI. Machine learning algorithms analyze customer behavior, preferences, and purchase history to deliver personalized recommendations, content, and services. This level of personalization increases customer satisfaction, engagement, and ultimately, revenue." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Identifying Opportunities in Your Business", headingLevel: 2 },
        { type: 'text', content: "The first step in implementing AI/ML is identifying areas in your business where these technologies can have the most impact. Start with processes that involve repetitive tasks, data analysis, or customer interactions. Look for areas where decision-making is based on patterns or historical data, as these are prime candidates for ML implementation." },
        { type: 'heading', heading: "Customer Service Applications", headingLevel: 3 },
        { type: 'text', content: "Customer service is often an excellent starting point. AI-powered chatbots can handle common inquiries, freeing human agents for complex issues. These chatbots can learn from each interaction, improving their responses over time. They're available 24/7, reducing wait times and improving customer satisfaction." },
        { type: 'heading', heading: "Sales and Marketing Benefits", headingLevel: 3 },
        { type: 'text', content: "Sales and marketing departments benefit significantly from AI. Predictive analytics can identify high-value prospects, recommend optimal pricing strategies, and personalize marketing messages. AI can also optimize ad spend, targeting the right audiences at the right times with the right messages." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Implementation Strategies and Best Practices", headingLevel: 2 },
        { type: 'text', content: "Successful AI/ML implementation requires careful planning and execution. Start with a pilot project that addresses a specific, measurable business problem. This approach allows you to demonstrate value, learn from the process, and build organizational support before scaling." },
        { type: 'text', content: "Data quality is crucial for ML success. Ensure you have clean, well-organized data before beginning. This may require data cleaning, integration from multiple sources, and establishing data governance practices. Poor data quality leads to poor model performance, so invest time in data preparation." },
        { type: 'heading', heading: "Conclusion: Building for the Future", headingLevel: 2 },
        { type: 'text', content: "The future belongs to businesses that effectively leverage AI and ML. Start your journey today, and position your organization for success in an increasingly intelligent business landscape." }
      ]
    },
    "best-practices-for-web-development-in-2025": {
      title: "Best Practices for Web Development in 2025",
      slug: "best-practices-for-web-development-in-2025",
      excerpt: "Discover the latest trends and best practices in web development to create modern, responsive websites.",
      date: "January 10, 2025",
      category: "Web Development",
      author: "NexGen Developers Team",
      readTime: "10 min read",
      images: ["/images/website.jpg", "/images/dummy-img.jpeg", "/images/dummy-img.jpeg"],
      sections: [
        { type: 'text', content: "Web development continues to evolve rapidly, with new frameworks, tools, and best practices emerging each year. In 2025, staying ahead means embracing modern technologies and methodologies that prioritize performance, accessibility, and user experience. This comprehensive guide explores the essential practices that define successful web development in the current landscape." },
        { type: 'heading', heading: "Modern Frameworks and Architecture", headingLevel: 2 },
        { type: 'text', content: "Frameworks like Next.js, React, and Vue.js continue to dominate the landscape. These tools offer server-side rendering, static site generation, and excellent developer experiences that result in faster, more efficient applications. Next.js, in particular, has become the go-to choice for production applications, combining the flexibility of React with powerful optimization features." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Performance Optimization: A Critical Priority", headingLevel: 2 },
        { type: 'text', content: "Performance is more critical than ever. Users expect instant page loads, and search engines reward fast sites. Code splitting and lazy loading reduce initial bundle sizes, loading only the JavaScript needed for the current view. Dynamic imports in modern frameworks make this straightforward to implement." },
        { type: 'heading', heading: "Image Optimization Strategies", headingLevel: 3 },
        { type: 'text', content: "Image optimization is essential. Modern formats like WebP and AVIF offer significant size reductions compared to traditional JPEG and PNG. Responsive images with srcset ensure users download appropriately sized images for their devices. Lazy loading images below the fold further improves initial load times." },
        { type: 'text', content: "Minimal JavaScript bundles are crucial. Every kilobyte matters on mobile networks. Tree shaking removes unused code, while bundlers like Vite and Turbopack optimize builds. Consider whether every library is necessary, and prefer smaller alternatives when possible." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Accessibility: Building for Everyone", headingLevel: 2 },
        { type: 'text', content: "Building accessible websites isn't optional—it's essential. Ensure your sites are usable by everyone, regardless of their abilities or the devices they use. This includes proper semantic HTML, keyboard navigation support, screen reader compatibility, and sufficient color contrast." },
        { type: 'heading', heading: "Security Best Practices", headingLevel: 2 },
        { type: 'text', content: "Security must be considered from the start, not added as an afterthought. HTTPS is mandatory, encrypting all data in transit. Content Security Policy (CSP) headers prevent XSS attacks by controlling resource loading. Input validation and sanitization prevent injection attacks." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Conclusion: Building for the Future", headingLevel: 2 },
        { type: 'text', content: "Successful web development in 2025 requires balancing performance, accessibility, security, and developer experience. By following these best practices, you create websites that serve users well while maintaining codebases that are sustainable and enjoyable to work with." }
      ]
    },
    "seo-strategies-that-actually-work": {
      title: "SEO Strategies That Actually Work",
      slug: "seo-strategies-that-actually-work",
      excerpt: "Explore proven SEO strategies that can help improve your website's visibility and drive organic traffic.",
      date: "January 5, 2025",
      category: "SEO",
      author: "NexGen Developers Team",
      readTime: "10 min read",
      images: ["/images/seo.jpg", "/images/dummy-img.jpeg", "/images/dummy-img.jpeg"],
      sections: [
        { type: 'text', content: "Search Engine Optimization (SEO) remains one of the most effective ways to drive organic traffic to your website. However, with constantly evolving algorithms, it's crucial to focus on strategies that deliver long-term results. This comprehensive guide explores proven SEO strategies that actually work in 2025, helping you build sustainable organic visibility." },
        { type: 'heading', heading: "Technical SEO: The Foundation", headingLevel: 2 },
        { type: 'text', content: "Technical SEO forms the foundation for all other optimization efforts. Start with the basics: ensure your site is fast, mobile-friendly, and properly structured. Page speed directly impacts rankings and user experience. Use tools like Google PageSpeed Insights to identify optimization opportunities. Compress images, minify CSS and JavaScript, leverage browser caching, and consider using a Content Delivery Network (CDN) to reduce load times." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Content Quality: The King of SEO", headingLevel: 2 },
        { type: 'text', content: "Google's algorithms prioritize high-quality, relevant content. Focus on creating valuable content that answers your audience's questions and solves their problems. This means understanding your target audience deeply, identifying their pain points, and creating content that addresses those needs comprehensively." },
        { type: 'heading', heading: "Keyword Research and Optimization", headingLevel: 2 },
        { type: 'text', content: "Effective keyword research identifies terms your audience actually uses when searching. Use tools like Google Keyword Planner, Ahrefs, or SEMrush to discover search volumes, competition levels, and related keywords. Focus on long-tail keywords that are more specific and less competitive, often converting better than broad terms." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Link Building: Quality Over Quantity", headingLevel: 2 },
        { type: 'text', content: "Quality backlinks from authoritative sites remain important ranking factors. Focus on earning links through great content and genuine relationships rather than manipulative tactics. High-quality links come from relevant, authoritative sources and provide value to users clicking through." },
        { type: 'heading', heading: "User Experience Signals", headingLevel: 2 },
        { type: 'text', content: "Search engines increasingly use user experience signals as ranking factors. Metrics like bounce rate, time on site, and pages per session indicate content quality and relevance. Optimize for these metrics by creating engaging, valuable content that keeps users on your site." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Conclusion: Long-Term SEO Success", headingLevel: 2 },
        { type: 'text', content: "SEO is a long-term strategy requiring patience and consistent effort. Rankings don't improve overnight, but following these proven strategies builds sustainable organic visibility over time. Focus on providing value to users, and search engines will reward your efforts." }
      ]
    },
    "building-scalable-applications-complete-guide": {
      title: "Building Scalable Applications: A Complete Guide",
      slug: "building-scalable-applications-complete-guide",
      excerpt: "Learn how to build applications that can grow with your business and handle increasing traffic.",
      date: "December 28, 2024",
      category: "App Development",
      author: "NexGen Developers Team",
      readTime: "10 min read",
      images: ["/images/app.jpg", "/images/dummy-img.jpeg", "/images/dummy-img.jpeg"],
      sections: [
        { type: 'text', content: "Scalability is crucial for any application that aims to grow. Building scalable applications requires careful planning, the right architecture, and best practices from day one. This comprehensive guide explores the principles, patterns, and practices that enable applications to handle growth gracefully, from startup to enterprise scale." },
        { type: 'heading', heading: "Understanding Scalability", headingLevel: 2 },
        { type: 'text', content: "Scalability refers to an application's ability to handle increased load without performance degradation. This includes handling more users, processing more data, and managing increased complexity. Scalability comes in two forms: vertical scaling (adding more power to existing servers) and horizontal scaling (adding more servers). Modern applications typically focus on horizontal scaling for better cost efficiency and reliability." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Architecture Patterns for Scale", headingLevel: 2 },
        { type: 'text', content: "Microservices architecture breaks applications into small, independent services that can scale independently. Each service handles a specific business function, communicating through well-defined APIs. This approach allows teams to develop and deploy services independently, scale components based on demand, and use different technologies for different services." },
        { type: 'heading', heading: "Database Design for Scale", headingLevel: 2 },
        { type: 'text', content: "Database choice significantly impacts scalability. Relational databases like PostgreSQL offer ACID compliance and complex queries but can be harder to scale horizontally. NoSQL databases like MongoDB or Cassandra scale horizontally more easily but sacrifice some consistency guarantees. Choose based on your data patterns and consistency requirements." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Performance Optimization", headingLevel: 2 },
        { type: 'text', content: "Code optimization improves efficiency at the application level. Profile your application to identify bottlenecks. Optimize algorithms, reduce unnecessary computations, and minimize database queries. Use connection pooling to efficiently manage database connections." },
        { type: 'heading', heading: "Monitoring and Observability", headingLevel: 2 },
        { type: 'text', content: "Comprehensive monitoring helps identify bottlenecks and performance issues before they impact users. Monitor application metrics like response times, error rates, and throughput. Track infrastructure metrics including CPU, memory, disk, and network usage. Set up alerts for anomalies or threshold breaches." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Conclusion: Building for Growth", headingLevel: 2 },
        { type: 'text', content: "Scalable applications require thoughtful architecture, appropriate technology choices, and continuous optimization. Start with scalable patterns from the beginning, even if you don't need enterprise scale initially. Monitor performance continuously, optimize bottlenecks, and plan capacity based on growth projections." }
      ]
    },
    "future-of-chatbots-in-customer-service": {
      title: "The Future of Chatbots in Customer Service",
      slug: "future-of-chatbots-in-customer-service",
      excerpt: "Discover how AI-powered chatbots are revolutionizing customer service and improving user experiences.",
      date: "December 20, 2024",
      category: "Chatbots",
      author: "NexGen Developers Team",
      readTime: "10 min read",
      images: ["/images/chatbot.jpg", "/images/dummy-img.jpeg", "/images/dummy-img.jpeg"],
      sections: [
        { type: 'text', content: "AI-powered chatbots are transforming customer service, providing instant support and improving customer satisfaction. As technology advances, chatbots are becoming more intelligent and capable, handling increasingly complex interactions while maintaining the personal touch customers expect. This comprehensive exploration examines how chatbots are revolutionizing customer service and what the future holds for this transformative technology." },
        { type: 'heading', heading: "The Evolution of Customer Service Technology", headingLevel: 2 },
        { type: 'text', content: "Customer service has evolved from phone calls and emails to include live chat, social media, and now, intelligent chatbots. Early chatbots followed simple rule-based patterns, providing limited functionality and often frustrating user experiences. Modern AI-powered chatbots leverage natural language processing, machine learning, and contextual understanding to provide human-like interactions." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Modern Chatbot Capabilities", headingLevel: 2 },
        { type: 'text', content: "Today's chatbots can handle complex queries, understand context, and provide personalized responses. Natural Language Processing (NLP) enables chatbots to understand human language, including slang, typos, and variations in phrasing. This makes interactions feel more natural and reduces customer frustration." },
        { type: 'heading', heading: "Benefits for Businesses", headingLevel: 2 },
        { type: 'text', content: "Chatbots offer 24/7 availability, ensuring customers can get help whenever they need it, regardless of time zones or business hours. This constant availability improves customer satisfaction and captures opportunities that would otherwise be lost outside business hours." },
        { type: 'text', content: "Response times are instant, eliminating wait times that frustrate customers in traditional support channels. While human agents might take minutes to respond, chatbots provide immediate answers. This speed is particularly valuable for simple queries that don't require human expertise." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Implementation Best Practices", headingLevel: 2 },
        { type: 'text', content: "Successful chatbot implementation requires clear goals and well-defined use cases. Identify which customer service tasks are best suited for automation. Simple, repetitive tasks like password resets, order status checks, or FAQ answers are ideal starting points. Complex issues requiring judgment or empathy may be better handled by humans, at least initially." },
        { type: 'heading', heading: "The Future of Chatbot Technology", headingLevel: 2 },
        { type: 'text', content: "Advancements in AI continue to expand chatbot capabilities. Large language models enable more natural conversations and better understanding of context and nuance. These models can generate human-like responses while maintaining accuracy and relevance." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Conclusion: Embracing the Chatbot Revolution", headingLevel: 2 },
        { type: 'text', content: "Chatbots represent a fundamental shift in customer service, offering efficiency, availability, and consistency that traditional channels can't match. As technology advances, chatbots will become even more capable, handling increasingly complex interactions while maintaining the personal touch customers value." }
      ]
    },
    "graphic-design-trends-for-2025": {
      title: "Graphic Design Trends for 2025",
      slug: "graphic-design-trends-for-2025",
      excerpt: "Stay ahead of the curve with the latest graphic design trends that will shape the visual landscape in 2025.",
      date: "December 15, 2024",
      category: "Design",
      author: "NexGen Developers Team",
      readTime: "10 min read",
      images: ["/images/graphic.jpg", "/images/dummy-img.jpeg", "/images/dummy-img.jpeg"],
      sections: [
        { type: 'text', content: "Graphic design trends evolve with technology, culture, and user preferences. In 2025, we're seeing a focus on authenticity, sustainability, and digital-first experiences. This comprehensive guide explores the trends shaping visual design, helping designers and businesses create compelling, contemporary visuals that resonate with modern audiences." },
        { type: 'heading', heading: "Authenticity and Human-Centered Design", headingLevel: 2 },
        { type: 'text', content: "Authenticity has become a dominant theme in 2025 design trends. After years of polished, perfect visuals, audiences crave genuine, relatable content. This shift toward authenticity manifests in several ways: hand-drawn illustrations, imperfect typography, candid photography, and designs that feel human-made rather than algorithmically generated." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Bold Typography and Custom Fonts", headingLevel: 2 },
        { type: 'text', content: "Typography takes center stage in 2025, with bold, expressive fonts making strong statements. Large, impactful headlines grab attention and communicate personality. Designers are using typography as a primary design element, not just a means of conveying text." },
        { type: 'heading', heading: "Immersive 3D and Spatial Design", headingLevel: 2 },
        { type: 'text', content: "Three-dimensional design elements create depth and engagement in digital spaces. Advances in web technologies make 3D graphics more accessible, enabling designers to create immersive experiences without requiring specialized viewing devices." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Vibrant Color Palettes", headingLevel: 2 },
        { type: 'text', content: "2025 sees a move toward vibrant, saturated colors that create energy and excitement. While minimalist designs remain popular, they're often accented with bold, bright colors that create visual impact. These vibrant palettes reflect optimism and forward-thinking attitudes." },
        { type: 'heading', heading: "Digital-First Design Approaches", headingLevel: 2 },
        { type: 'text', content: "As digital experiences continue to dominate, designs are optimized for screens of all sizes, with particular attention to mobile experiences. Mobile-first design has evolved beyond responsive layouts to consider mobile-specific interactions, gestures, and constraints." },
        { type: 'image', image: "/images/dummy-img.jpeg" },
        { type: 'heading', heading: "Conclusion: Designing for Tomorrow", headingLevel: 2 },
        { type: 'text', content: "The graphic design trends of 2025 reflect broader cultural shifts toward authenticity, sustainability, and digital-first thinking. Successful designers balance these trends with timeless design principles, creating work that feels contemporary while maintaining lasting appeal." }
      ]
    }
  };

  const blog = blogPosts[slug];
  const relatedBlogs = allBlogs.filter(b => b.slug !== slug).slice(0, 3);

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-4">Blog Post Not Found</h1>
          <p className="text-gray-700 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blogs" className="text-black font-bold hover:text-gray-700">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <article className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/blogs"
              className="inline-flex items-center text-black hover:text-gray-700 font-bold group"
            >
              <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blogs
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
            data-aos="fade-up"
          >
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded uppercase">
                {blog.category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <span>{blog.date}</span>
              <span>•</span>
              <span>{blog.author}</span>
              <span>•</span>
              <span>{blog.readTime}</span>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-64 sm:h-96 mb-12 rounded-xl overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <Image
              src={blog.images[0]}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Content Sections */}
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

          {/* Related Blogs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
            data-aos="fade-up"
          >
            <h2 className="text-3xl font-bold text-black mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {relatedBlogs.map((relatedBlog, index) => (
                <motion.div
                  key={relatedBlog.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gray-50 p-0 rounded-xl border-2 border-transparent transition-all duration-300 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <Link href={`/blogs/${relatedBlog.slug}`}>
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded uppercase">
                          {relatedBlog.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-black mb-3">{relatedBlog.title}</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed text-sm">{relatedBlog.excerpt}</p>
                      <p className="text-sm text-gray-600 mb-4">{relatedBlog.date}</p>
                      <span className="inline-flex items-center text-black hover:text-gray-700 font-bold group">
                        Read More
                        <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 p-8 bg-gray-50 rounded-xl border-2 border-black text-center"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-bold text-black mb-4">Ready to Start Your Project?</h2>
            <p className="text-gray-700 mb-6">
              Let's discuss how we can help bring your ideas to life.
            </p>
            <motion.button
              onClick={() => setIsContactModalOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 uppercase tracking-wide"
            >
              Get in Touch
            </motion.button>
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
          </motion.div>
        </div>
      </article>
    </div>
  );
}
