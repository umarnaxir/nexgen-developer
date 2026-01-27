"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ContactModal from "@/components/modals/ContactModal";
import ClientReviewsSection from "@/app/home/ClientReviewsSection";
import FAQSection from "@/app/home/FAQSection";

export default function ServicesPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const services = [
    {
      title: "Full Stack Web Development",
      description: "We build complete, end-to-end web solutions from frontend to backend. Our full stack development services include modern responsive websites, web applications, and complex enterprise solutions. We handle everything from user interface design to server-side logic, database management, and API integration.",
      features: [
        "Frontend Development (React, Next.js, Vue.js)",
        "Backend Development (Node.js, Python, PHP)",
        "Database Design & Management (SQL, MongoDB)",
        "RESTful & GraphQL APIs",
        "Responsive & Mobile-First Design",
        "Performance Optimization",
        "Security Implementation",
        "Third-party Integrations"
      ],
      technologies: "React, Next.js, Node.js, Python, Django, Flask, Express.js, MongoDB, PostgreSQL, MySQL"
    },
    {
      title: "Mobile App Development",
      description: "We develop powerful native and cross-platform mobile applications for iOS and Android. From concept to deployment, we create user-friendly apps that deliver exceptional performance and seamless user experiences across all devices.",
      features: [
        "Native iOS & Android Development",
        "Cross-Platform (React Native, Flutter)",
        "App Store & Play Store Deployment",
        "Push Notifications",
        "In-App Purchases & Payments",
        "Offline Functionality",
        "Real-time Synchronization",
        "App Maintenance & Updates"
      ],
      technologies: "React Native, Flutter, Swift, Kotlin, Java, Firebase, AWS"
    },
    {
      title: "Deployment & DevOps",
      description: "We ensure your applications are deployed securely and efficiently. Our DevOps services include cloud deployment, CI/CD pipeline setup, server configuration, and infrastructure management to keep your applications running smoothly.",
      features: [
        "Cloud Deployment (AWS, Azure, GCP, Vercel)",
        "CI/CD Pipeline Setup",
        "Docker Containerization",
        "Server Configuration & Management",
        "Domain & SSL Setup",
        "Load Balancing & Scaling",
        "Monitoring & Logging",
        "Backup & Disaster Recovery"
      ],
      technologies: "AWS, Azure, Google Cloud, Docker, Kubernetes, Jenkins, GitHub Actions, Nginx"
    },
    {
      title: "Maintenance & Support",
      description: "Keep your applications running smoothly with our comprehensive maintenance and support services. We provide ongoing updates, bug fixes, security patches, performance optimization, and 24/7 technical support to ensure your digital solutions remain reliable and up-to-date.",
      features: [
        "Regular Updates & Patches",
        "Bug Fixes & Troubleshooting",
        "Security Updates & Monitoring",
        "Performance Optimization",
        "Database Maintenance",
        "Backup & Recovery",
        "24/7 Technical Support",
        "Feature Enhancements"
      ],
      technologies: "All Technologies, Monitoring Tools, Backup Solutions"
    },
    {
      title: "AI & ML Solutions",
      description: "We integrate Artificial Intelligence and Machine Learning to automate processes, enhance decision-making, and create intelligent applications. From predictive analytics to computer vision, we build AI solutions that transform your business operations.",
      features: [
        "Machine Learning Models",
        "Deep Learning & Neural Networks",
        "Natural Language Processing (NLP)",
        "Computer Vision",
        "Predictive Analytics",
        "Data Mining & Analysis",
        "Chatbot & Virtual Assistants",
        "Recommendation Systems"
      ],
      technologies: "Python, TensorFlow, PyTorch, Scikit-learn, OpenCV, NLTK, OpenAI API"
    },
    {
      title: "Chatbot Development",
      description: "Enhance customer engagement with AI-powered chatbots that provide instant and intelligent support across platforms. Our chatbots can handle customer queries, automate responses, and integrate seamlessly with your existing systems.",
      features: [
        "24/7 Automated Support",
        "Natural Language Processing",
        "Multi-platform Integration",
        "Custom Training & Learning",
        "Voice & Text Support",
        "Analytics & Insights",
        "CRM Integration",
        "Multi-language Support"
      ],
      technologies: "OpenAI, Dialogflow, Rasa, Python, Node.js, Webhooks, APIs"
    },
    {
      title: "SEO & Digital Marketing",
      description: "Boost your online presence with expert SEO, Google Ads, and comprehensive digital marketing strategies. We help you rank higher in search results, drive organic traffic, and convert visitors into customers.",
      features: [
        "On-Page & Off-Page SEO",
        "Keyword Research & Optimization",
        "Content Marketing Strategy",
        "Link Building & Backlinks",
        "Google Ads & PPC Campaigns",
        "Social Media Marketing",
        "Analytics & Performance Tracking",
        "Conversion Rate Optimization"
      ],
      technologies: "Google Analytics, Google Search Console, SEMrush, Ahrefs, Facebook Ads"
    },
    {
      title: "Graphic Design",
      description: "From logos to social media posts, we craft visually compelling designs that strengthen your brand identity. Our design services help you create a consistent and professional visual presence across all platforms.",
      features: [
        "Logo & Brand Identity Design",
        "Social Media Graphics",
        "Web & App UI/UX Design",
        "Print Design (Brochures, Flyers)",
        "Banner & Advertisement Design",
        "Product Packaging Design",
        "Infographics & Presentations",
        "Video Editing & Animation"
      ],
      technologies: "Adobe Photoshop, Illustrator, Figma, Canva, After Effects, Premiere Pro"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The goal is not just to build a website or an app, but to grow your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-50 p-6 sm:p-8 rounded-xl border-2 border-transparent transition-all duration-300"
              >
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">{service.title}</h2>
                <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">{service.description}</p>
                
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-black mb-3">Key Features:</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm sm:text-base">
                        <svg className="w-5 h-5 mr-2 text-black flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {service.technologies && (
                  <div className="pt-4 border-t border-gray-300">
                    <h3 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">Technologies:</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{service.technologies}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <motion.button
              onClick={() => setIsContactModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 uppercase tracking-wide"
            >
              Get Started Today
            </motion.button>
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
          </motion.div>
        </div>
      </section>

      <ClientReviewsSection />
      <FAQSection />
    </div>
  );
}
