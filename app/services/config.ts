/**
 * Services configuration: slugs, content, SEO, and navigation.
 * Used for dynamic routes, sitemap, navbar, and internal linking.
 */

export interface ServiceSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface ServiceContent {
  heading: string;
  description: string;
  /** Hero image path (e.g. /images/blogs/website.jpg) */
  image?: string;
  /** Tech stack / tools used */
  technologies?: string;
  /** Why choose us for this service */
  whyChoose?: string[];
  /** FAQ for accordion (minimum 5 per service) */
  faqs?: { question: string; answer: string }[];
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  ctaHeading: string;
  ctaDescription: string;
  /** Use cases / industries served */
  useCases?: string[];
  /** Expected results / outcomes */
  expectedResults?: string[];
}

export interface ServiceDefinition {
  slug: string;
  label: string;
  seo: ServiceSEO;
  content: ServiceContent;
  /** Related service slugs for internal linking */
  relatedSlugs?: string[];
  /** Lucide icon name for display */
  icon?: string;
}

export interface SubServiceDefinition extends ServiceDefinition {
  parentSlug: "digital-marketing";
}

/** Top-level service slugs (no parent); digital-marketing in 3rd column for dropdown */
const TOP_LEVEL_SLUG_LIST = [
  "website-development",
  "app-development",
  "digital-marketing",
  "ai-ml",
  "chatbot-development",
  "maintenance-support",
  "deployment-devops",
] as const;

/** Digital marketing sub-service slugs */
const DIGITAL_MARKETING_SUB_SLUG_LIST = [
  "seo",
  "social-media-marketing",
  "graphic-designing",
  "google-ads",
  "meta-ads",
] as const;

export const TOP_LEVEL_SLUGS = TOP_LEVEL_SLUG_LIST;
export const DIGITAL_MARKETING_SUB_SLUGS = DIGITAL_MARKETING_SUB_SLUG_LIST;

const WEBSITE_DEVELOPMENT: ServiceDefinition = {
  slug: "website-development",
  label: "Website Development",
  icon: "Globe",
  seo: {
    title: "Website Development Services ",
    description:
      "Professional website development: responsive sites, web apps, and enterprise solutions. React, Next.js, Node.js. Get a custom quote.",
    keywords: [
      "website development",
      "web development services",
      "responsive website",
      "Next.js development",
      "React development",
      "custom website",
    ],
  },
  content: {
    heading: "Website Development",
    description:
      "We build complete, end-to-end web solutions from frontend to backend. Our website development services include modern responsive websites, web applications, and complex enterprise solutions. We handle everything from user interface design to server-side logic, database management, and API integration.",
    image: "/images/services/website.png",
    technologies: "React, Next.js, Node.js, Python, Django, Flask, Express.js, MongoDB, PostgreSQL, MySQL",
    whyChoose: [
      "Experienced full-stack team with modern frameworks",
      "Agile process with regular demos and feedback",
      "Scalable, secure, and performance-optimized code",
      "Post-launch support and maintenance options",
    ],
    faqs: [
      { question: "How long does a typical website project take?", answer: "Timeline depends on scope: a simple site can take 4–6 weeks; complex web apps may take 3–6 months. We provide a detailed timeline after discovery." },
      { question: "Do you offer ongoing maintenance?", answer: "Yes. We offer maintenance and support plans for updates, security patches, and feature enhancements." },
      { question: "What tech stack do you use?", answer: "We use React/Next.js for frontend, Node.js/Python for backend, and PostgreSQL/MongoDB for databases. We choose based on your needs." },
      { question: "Can you redesign an existing website?", answer: "Yes. We can modernize legacy sites, migrate to new stacks, or do a complete redesign while preserving your content and SEO value." },
      { question: "Do you handle e-commerce and payments?", answer: "Yes. We integrate Stripe, PayPal, and other payment gateways, plus popular e-commerce platforms for online stores." },
    ],
    useCases: ["Startups", "SaaS Companies", "E-commerce", "Portfolios", "Business Websites", "Enterprise Portals", "Marketplaces"],
    expectedResults: ["Modern, responsive website or web app", "Improved load times and SEO", "Scalable architecture for growth", "Secure, maintainable codebase", "Better user engagement", "Faster time to market", "Reduced technical debt", "Future-proof technology stack"],
    benefits: [
      "Frontend Development (React, Next.js, Vue.js)",
      "Backend Development (Node.js, Python, PHP)",
      "Database Design & Management (SQL, MongoDB)",
      "RESTful & GraphQL APIs",
      "Responsive & Mobile-First Design",
      "Performance Optimization",
      "Security Implementation",
      "Third-party Integrations",
    ],
    process: [
      { step: 1, title: "Discovery & Planning", description: "We define goals, scope, and technical requirements with you." },
      { step: 2, title: "Design & Prototype", description: "UI/UX design and interactive prototypes for approval." },
      { step: 3, title: "Development", description: "Agile development with regular demos and feedback loops." },
      { step: 4, title: "Testing & Launch", description: "QA, performance checks, and smooth deployment." },
    ],
    ctaHeading: "Ready to Build Your Website?",
    ctaDescription:
      "Get a custom quote and timeline. Tell us your goals and we'll propose the right stack and plan.",
  },
  relatedSlugs: ["app-development", "deployment-devops", "maintenance-support"],
};

const APP_DEVELOPMENT: ServiceDefinition = {
  slug: "app-development",
  label: "App Development",
  icon: "Smartphone",
  seo: {
    title: "Mobile App Development Services ",
    description:
      "Native and cross-platform mobile app development for iOS and Android. React Native, Flutter. From concept to App Store and Play Store deployment.",
    keywords: [
      "mobile app development",
      "iOS app development",
      "Android app development",
      "React Native",
      "Flutter",
      "cross-platform app",
    ],
  },
  content: {
    heading: "App Development",
    description:
      "We develop powerful native and cross-platform mobile applications for iOS and Android. From concept to deployment, we create user-friendly apps that deliver exceptional performance and seamless user experiences across all devices.",
    image: "/images/services/app.png",
    technologies: "React Native, Flutter, Swift, Kotlin, Java, Firebase, AWS",
    whyChoose: [
      "Native and cross-platform expertise",
      "App Store and Play Store submission support",
      "Focus on UX and performance",
      "Ongoing updates and maintenance",
    ],
    faqs: [
      { question: "Native vs cross-platform—which is better?", answer: "Native gives best performance per platform; cross-platform (React Native, Flutter) is faster and cheaper for one codebase. We recommend based on your goals and budget." },
      { question: "Do you handle app store submission?", answer: "Yes. We build, test, and guide you through App Store and Play Store submission and updates." },
      { question: "How much does mobile app development cost?", answer: "Costs vary by scope. We provide transparent quotes after scoping. Simple apps start from a few thousand; complex apps are more. We offer phased approaches to manage budget." },
      { question: "Can you build for both iOS and Android?", answer: "Yes. With React Native or Flutter, we build one codebase that deploys to both platforms, saving time and cost compared to separate native apps." },
      { question: "Do you provide app maintenance after launch?", answer: "Yes. We offer maintenance plans for updates, OS compatibility, bug fixes, and feature additions to keep your app running smoothly." },
    ],
    useCases: ["Consumer Apps", "B2B Tools", "On-Demand Services", "Health & Fitness", "Finance & Banking", "Education", "Social & Dating"],
    expectedResults: ["App live on App Store and Play Store", "Smooth UX across devices", "Secure backend and APIs", "Scalable architecture for user growth", "Higher user retention", "Positive app store ratings", "Reduced development costs", "Single codebase for both platforms"],
    benefits: [
      "Native iOS & Android Development",
      "Cross-Platform (React Native, Flutter)",
      "App Store & Play Store Deployment",
      "Push Notifications",
      "In-App Purchases & Payments",
      "Offline Functionality",
      "Real-time Synchronization",
      "App Maintenance & Updates",
    ],
    process: [
      { step: 1, title: "Strategy & Scope", description: "Define target platforms, features, and success metrics." },
      { step: 2, title: "Design & UX", description: "Wireframes and high-fidelity designs for your app." },
      { step: 3, title: "Development", description: "Sprint-based development with continuous integration." },
      { step: 4, title: "Release & Support", description: "Store submission and ongoing updates and support." },
    ],
    ctaHeading: "Let's Build Your App",
    ctaDescription:
      "Share your app idea and we'll outline a roadmap, tech stack, and transparent pricing.",
  },
  relatedSlugs: ["website-development", "maintenance-support", "deployment-devops"],
};

const AI_ML: ServiceDefinition = {
  slug: "ai-ml",
  label: "AI & ML Solutions",
  icon: "Cpu",
  seo: {
    title: "AI & Machine Learning Solutions ",
    description:
      "Custom AI and ML solutions: predictive analytics, NLP, computer vision, and automation. Python, TensorFlow, PyTorch. Transform your operations.",
    keywords: [
      "AI solutions",
      "machine learning",
      "ML development",
      "NLP",
      "computer vision",
      "predictive analytics",
      "TensorFlow",
      "PyTorch",
    ],
  },
  content: {
    heading: "AI & ML Solutions",
    description:
      "We integrate Artificial Intelligence and Machine Learning to automate processes, enhance decision-making, and create intelligent applications. From predictive analytics to computer vision, we build AI solutions that transform your business operations.",
    image: "/images/services/ai.png",
    technologies: "Python, TensorFlow, PyTorch, Scikit-learn, OpenCV, NLTK, OpenAI API",
    whyChoose: [
      "Practical AI/ML for business outcomes",
      "From data pipelines to deployed models",
      "NLP, computer vision, and predictive analytics",
      "Integration with your existing systems",
    ],
    faqs: [
      { question: "Do I need a lot of data for ML?", answer: "It depends. Some solutions work with smaller datasets or pre-trained models; others need more data. We assess your case and recommend the best approach." },
      { question: "Can you integrate with our existing software?", answer: "Yes. We build APIs and integrations so your AI/ML models work with your current tools and workflows." },
      { question: "What types of AI/ML solutions do you build?", answer: "Predictive analytics, NLP (chatbots, text classification), computer vision, recommendation systems, and automation. We tailor solutions to your use case." },
      { question: "How long does an AI/ML project take?", answer: "From a few weeks for simple models to several months for complex deployments. We provide timelines after assessing your data and requirements." },
      { question: "Do you use OpenAI or other third-party APIs?", answer: "Yes. We use OpenAI, custom models, and open-source frameworks. We recommend based on cost, performance, and data privacy needs." },
    ],
    useCases: ["Predictive Analytics", "Automation", "Customer Support", "Content Moderation", "Image/Video Analysis", "Recommendation Engines", "Healthcare & Finance"],
    expectedResults: ["AI-powered automation or insights", "Improved decision-making", "Reduced manual effort", "Scalable, maintainable models", "Higher accuracy and efficiency", "Competitive advantage", "Data-driven strategies", "Continuous improvement with feedback loops"],
    benefits: [
      "Machine Learning Models",
      "Deep Learning & Neural Networks",
      "Natural Language Processing (NLP)",
      "Computer Vision",
      "Predictive Analytics",
      "Data Mining & Analysis",
      "Chatbot & Virtual Assistants",
      "Recommendation Systems",
    ],
    process: [
      { step: 1, title: "Problem & Data", description: "Define use case and assess data availability and quality." },
      { step: 2, title: "Model Design", description: "Choose approach (ML/DL/NLP/CV) and architecture." },
      { step: 3, title: "Build & Train", description: "Train, validate, and iterate on models." },
      { step: 4, title: "Deploy & Monitor", description: "Production deployment and ongoing monitoring." },
    ],
    ctaHeading: "Explore AI for Your Business",
    ctaDescription:
      "Describe your use case and we'll propose a feasible AI/ML solution and timeline.",
  },
  relatedSlugs: ["chatbot-development", "website-development", "deployment-devops"],
};

const CHATBOT_DEVELOPMENT: ServiceDefinition = {
  slug: "chatbot-development",
  label: "Chatbot Development",
  icon: "MessageCircle",
  seo: {
    title: "Chatbot Development Services ",
    description:
      "AI-powered chatbots for customer support and automation. NLP, multi-platform, CRM integration. 24/7 intelligent support.",
    keywords: [
      "chatbot development",
      "AI chatbot",
      "customer support chatbot",
      "NLP chatbot",
      "OpenAI",
      "Dialogflow",
      "chatbot integration",
    ],
  },
  content: {
    heading: "Chatbot Development",
    description:
      "Enhance customer engagement with AI-powered chatbots that provide instant and intelligent support across platforms. Our chatbots can handle customer queries, automate responses, and integrate seamlessly with your existing systems.",
    image: "/images/services/chatbot.png",
    technologies: "OpenAI, Dialogflow, Rasa, Python, Node.js, Webhooks, APIs",
    whyChoose: [
      "AI-powered, context-aware conversations",
      "Website, WhatsApp, and more channels",
      "CRM and backend integration",
      "Ongoing tuning and support",
    ],
    faqs: [
      { question: "Which platforms can the chatbot work on?", answer: "Website widgets, WhatsApp, Slack, Facebook Messenger, and custom APIs. We integrate with the channels your customers use." },
      { question: "How do you train the chatbot?", answer: "We use your FAQs, past conversations, and domain knowledge. For advanced needs we use NLP and optional LLM integration." },
      { question: "Can chatbots handle multiple languages?", answer: "Yes. We build multi-language chatbots that detect and respond in the user's preferred language." },
      { question: "Do you integrate chatbots with CRMs?", answer: "Yes. We integrate with Salesforce, HubSpot, Zendesk, and custom systems so leads and conversations sync automatically." },
      { question: "What's the cost of a custom chatbot?", answer: "It varies by complexity. Simple FAQ bots cost less; AI-powered conversational bots with integrations cost more. We provide quotes after scoping." },
    ],
    useCases: ["Customer Support", "Lead Qualification", "E-commerce", "Booking & Scheduling", "HR & Internal Tools", "Healthcare Triage", "Education"],
    expectedResults: ["24/7 automated responses", "Reduced support workload", "Faster response times", "Higher customer satisfaction", "Lower operational costs", "Consistent customer experience", "Qualified lead capture", "Actionable analytics and insights"],
    benefits: [
      "24/7 Automated Support",
      "Natural Language Processing",
      "Multi-platform Integration",
      "Custom Training & Learning",
      "Voice & Text Support",
      "Analytics & Insights",
      "CRM Integration",
      "Multi-language Support",
    ],
    process: [
      { step: 1, title: "Use Cases & Flows", description: "Map intents, dialogues, and integration points." },
      { step: 2, title: "Design & Training", description: "Conversation design and training data preparation." },
      { step: 3, title: "Build & Integrate", description: "Develop and connect to your channels and CRM." },
      { step: 4, title: "Launch & Optimize", description: "Go live and improve with analytics and feedback." },
    ],
    ctaHeading: "Get a Smarter Chatbot",
    ctaDescription:
      "Tell us where you need support (website, WhatsApp, etc.) and we'll design and build your chatbot.",
  },
  relatedSlugs: ["ai-ml", "website-development", "maintenance-support"],
};

const MAINTENANCE_SUPPORT: ServiceDefinition = {
  slug: "maintenance-support",
  label: "Maintenance & Support",
  icon: "Wrench",
  seo: {
    title: "Maintenance & Support Services ",
    description:
      "Ongoing maintenance, updates, and 24/7 support for websites and apps. Bug fixes, security, performance. Keep your digital products reliable.",
    keywords: [
      "website maintenance",
      "app maintenance",
      "technical support",
      "bug fixes",
      "security updates",
      "performance optimization",
      "24/7 support",
    ],
  },
  content: {
    heading: "Maintenance & Support",
    description:
      "Keep your applications running smoothly with our comprehensive maintenance and support services. We provide ongoing updates, bug fixes, security patches, performance optimization, and 24/7 technical support to ensure your digital solutions remain reliable and up-to-date.",
    image: "/images/services/maintenance-and-support .png",
    technologies: "All Technologies, Monitoring Tools, Backup Solutions",
    whyChoose: [
      "Dedicated support and fast response times",
      "Proactive monitoring and security patches",
      "Transparent reporting and SLAs",
      "Flexible retainer and on-demand options",
    ],
    faqs: [
      { question: "What's included in a maintenance plan?", answer: "Updates, bug fixes, security patches, monitoring, and optional 24/7 support. We tailor the plan to your stack and SLA needs." },
      { question: "Can you take over an existing project?", answer: "Yes. We onboard quickly, document the codebase, and set up monitoring and support workflows." },
      { question: "What is your typical response time?", answer: "We offer tiered SLAs. Standard plans include 24–48 hour response; priority plans offer same-day or 24/7 support." },
      { question: "Do you provide monthly reports?", answer: "Yes. We send status reports, uptime summaries, and recommendations so you stay informed." },
      { question: "Can I scale up support during busy periods?", answer: "Yes. We offer flexible retainer add-ons and on-demand hours for spikes or special projects." },
    ],
    useCases: ["SaaS Products", "E-commerce Sites", "Corporate Websites", "Web & Mobile Apps", "Legacy Systems"],
    expectedResults: ["Stable, secure applications", "Minimal downtime", "Proactive updates", "Transparent reporting", "Extended product lifespan", "Reduced risk of outages", "Optimized performance", "Peace of mind for your business"],
    benefits: [
      "Regular Updates & Patches",
      "Bug Fixes & Troubleshooting",
      "Security Updates & Monitoring",
      "Performance Optimization",
      "Database Maintenance",
      "Backup & Recovery",
      "24/7 Technical Support",
      "Feature Enhancements",
    ],
    process: [
      { step: 1, title: "Assessment", description: "Review your stack, SLAs, and support needs." },
      { step: 2, title: "Retainer & Plan", description: "Define scope, response times, and pricing." },
      { step: 3, title: "Ongoing Work", description: "Updates, monitoring, and incident response." },
      { step: 4, title: "Reporting", description: "Regular reports and improvement recommendations." },
    ],
    ctaHeading: "Secure Your Digital Products",
    ctaDescription:
      "Get a maintenance plan tailored to your apps and uptime requirements.",
  },
  relatedSlugs: ["website-development", "app-development", "deployment-devops"],
};

const DEPLOYMENT_DEVOPS: ServiceDefinition = {
  slug: "deployment-devops",
  label: "Deployment & DevOps",
  icon: "Server",
  seo: {
    title: "Deployment & DevOps Services ",
    description:
      "Cloud deployment, CI/CD, Docker, and infrastructure. AWS, Azure, GCP, Vercel. Reliable, scalable hosting and automation.",
    keywords: [
      "DevOps services",
      "cloud deployment",
      "CI/CD",
      "Docker",
      "AWS",
      "Azure",
      "infrastructure",
      "deployment",
    ],
  },
  content: {
    heading: "Deployment & DevOps",
    description:
      "We ensure your applications are deployed securely and efficiently. Our DevOps services include cloud deployment, CI/CD pipeline setup, server configuration, and infrastructure management to keep your applications running smoothly.",
    image: "/images/services/deployment-and-devOps .png",
    technologies: "AWS, Azure, Google Cloud, Docker, Kubernetes, Jenkins, GitHub Actions, Nginx",
    whyChoose: [
      "Cloud-agnostic and cost-conscious setup",
      "CI/CD for faster, safer releases",
      "Security and monitoring built in",
      "Clear documentation and handover",
    ],
    faqs: [
      { question: "Which cloud providers do you use?", answer: "We work with AWS, Azure, GCP, and Vercel. We choose based on your app, budget, and compliance needs." },
      { question: "Do you provide documentation?", answer: "Yes. We deliver runbooks, architecture docs, and run-throughs so your team can operate and extend the setup." },
      { question: "How long does deployment typically take?", answer: "Simple setups take 1–2 days; complex infrastructures may take 1–2 weeks. We provide timelines during planning." },
      { question: "Do you set up CI/CD pipelines?", answer: "Yes. We configure GitHub Actions, Jenkins, or provider-native CI/CD for automated builds and deployments." },
      { question: "Can you migrate from another host?", answer: "Yes. We handle migrations from shared hosting, legacy servers, or other clouds with minimal downtime." },
    ],
    useCases: ["Web Apps", "APIs & Microservices", "Mobile Backends", "E-commerce", "Enterprise Applications"],
    expectedResults: ["Reliable, scalable infrastructure", "Automated deployments", "Reduced manual ops", "Production-ready setup", "Faster release cycles", "Cost-effective cloud usage", "Disaster recovery in place", "Clear operational documentation"],
    benefits: [
      "Cloud Deployment (AWS, Azure, GCP, Vercel)",
      "CI/CD Pipeline Setup",
      "Docker Containerization",
      "Server Configuration & Management",
      "Domain & SSL Setup",
      "Load Balancing & Scaling",
      "Monitoring & Logging",
      "Backup & Disaster Recovery",
    ],
    process: [
      { step: 1, title: "Architecture", description: "Design cloud/infra and deployment strategy." },
      { step: 2, title: "Pipeline & Config", description: "Set up CI/CD, containers, and environments." },
      { step: 3, title: "Deploy & Secure", description: "Deploy with SSL, monitoring, and best practices." },
      { step: 4, title: "Handover & Docs", description: "Documentation and handover to your team." },
    ],
    ctaHeading: "Deploy With Confidence",
    ctaDescription:
      "Share your stack and we'll propose a deployment and DevOps plan.",
  },
  relatedSlugs: ["website-development", "app-development", "maintenance-support"],
};

const DIGITAL_MARKETING: ServiceDefinition = {
  slug: "digital-marketing",
  label: "Digital Marketing",
  icon: "TrendingUp",
  seo: {
    title: "Digital Marketing Services ",
    description:
      "Full-service digital marketing: SEO, social media, Google Ads, Meta Ads, and graphic design. Grow traffic and conversions.",
    keywords: [
      "digital marketing",
      "SEO",
      "social media marketing",
      "Google Ads",
      "Meta Ads",
      "graphic design",
      "marketing strategy",
    ],
  },
  content: {
    heading: "Digital Marketing",
    description:
      "Boost your online presence with expert SEO, paid ads, and comprehensive digital marketing strategies. We help you rank higher in search results, drive organic and paid traffic, and convert visitors into customers. Our services include SEO, social media marketing, Google Ads, Meta Ads, and graphic design.",
    image: "/images/services/digital-marketing.png",
    technologies: "Google Analytics, Google Search Console, SEMrush, Ahrefs, Facebook Ads, Meta Business Suite",
    whyChoose: [
      "Full-funnel: SEO, paid, social, and creative",
      "Data-driven strategy and reporting",
      "Transparent pricing and clear KPIs",
      "Dedicated account management",
    ],
    faqs: [
      { question: "What's included in digital marketing?", answer: "We offer SEO, social media, Google Ads, Meta Ads, and graphic design. We tailor the mix to your goals and budget." },
      { question: "How do you measure success?", answer: "We track traffic, leads, conversions, and ROI. You get regular reports and dashboards." },
      { question: "What's a typical monthly retainer?", answer: "Retainers vary by scope. We propose packages based on your goals—from single-channel (e.g., SEO only) to full-funnel campaigns." },
      { question: "Do you work with small businesses?", answer: "Yes. We work with startups, SMBs, and enterprises. We scale our services to fit your budget and objectives." },
      { question: "Can you take over existing campaigns?", answer: "Yes. We audit and optimize existing SEO, PPC, or social campaigns, or start fresh—your choice." },
    ],
    useCases: ["E-commerce", "B2B Lead Gen", "Local Businesses", "SaaS", "Professional Services", "Startups"],
    expectedResults: ["Increased traffic and visibility", "More leads and conversions", "Better brand awareness", "Data-driven optimization", "Measurable ROI", "Multi-channel presence", "Stronger market positioning", "Long-term sustainable growth"],
    benefits: [
      "On-Page & Off-Page SEO",
      "Social Media Marketing",
      "Google Ads & PPC Campaigns",
      "Meta (Facebook & Instagram) Ads",
      "Graphic Design & Branding",
      "Content Strategy",
      "Analytics & Performance Tracking",
      "Conversion Rate Optimization",
    ],
    process: [
      { step: 1, title: "Audit & Goals", description: "Review current presence and define KPIs." },
      { step: 2, title: "Strategy", description: "Channel mix, budget, and creative approach." },
      { step: 3, title: "Execution", description: "Campaigns, content, and ongoing optimization." },
      { step: 4, title: "Report & Scale", description: "Regular reporting and scaling what works." },
    ],
    ctaHeading: "Grow Your Online Presence",
    ctaDescription:
      "Tell us your goals (traffic, leads, sales) and we'll recommend the right mix of SEO, ads, and design.",
  },
  relatedSlugs: ["website-development"],
};

const SEO_SERVICE: SubServiceDefinition = {
  slug: "seo",
  parentSlug: "digital-marketing",
  label: "SEO",
  icon: "Search",
  seo: {
    title: "SEO Services - Search Engine Optimization ",
    description:
      "Professional SEO: on-page, off-page, keyword research, and technical SEO. Rank higher and grow organic traffic.",
    keywords: [
      "SEO services",
      "search engine optimization",
      "keyword research",
      "on-page SEO",
      "off-page SEO",
      "technical SEO",
      "organic traffic",
    ],
  },
  content: {
    heading: "SEO Services",
    description:
      "We help you rank higher in search results and grow organic traffic with proven SEO strategies. Our services include on-page and off-page optimization, keyword research, technical SEO, content strategy, and link building.",
    image: "/images/services/seo.png",
    technologies: "Google Analytics, Google Search Console, SEMrush, Ahrefs",
    whyChoose: [
      "Proven on-page and technical SEO",
      "Keyword research and content strategy",
      "Transparent reporting and rankings",
      "White-hat link building",
    ],
    faqs: [
      { question: "How long until I see SEO results?", answer: "Typically 3–6 months for meaningful gains. We focus on sustainable, long-term growth." },
      { question: "Do you do local SEO?", answer: "Yes. We optimize for local search, Google Business Profile, and location-based keywords." },
      { question: "What's included in an SEO audit?", answer: "Technical crawl, on-page analysis, keyword research, competitor review, and a prioritized action plan with timelines." },
      { question: "Do you write content for SEO?", answer: "Yes. We create optimized landing pages, blog posts, and content that targets keywords and drives organic traffic." },
      { question: "How do you handle link building?", answer: "We use white-hat strategies: guest posts, partnerships, and quality backlinks. We never buy links or use black-hat tactics." },
    ],
    useCases: ["E-commerce", "Local Business", "SaaS", "Professional Services", "Content Sites", "B2B Lead Gen"],
    expectedResults: ["Higher search rankings", "Increased organic traffic", "Improved domain authority", "Sustainable growth", "More qualified leads", "Lower cost per acquisition", "Long-term visibility", "Competitive search presence"],
    benefits: [
      "On-Page & Off-Page SEO",
      "Keyword Research & Optimization",
      "Technical SEO & Site Audits",
      "Content Strategy & Optimization",
      "Link Building & Backlinks",
      "Local SEO",
      "Analytics & Search Console",
      "Ongoing Monitoring & Reporting",
    ],
    process: [
      { step: 1, title: "Audit & Research", description: "Site audit and keyword opportunity analysis." },
      { step: 2, title: "On-Page & Technical", description: "Fix issues and optimize content and structure." },
      { step: 3, title: "Content & Links", description: "Content plan and link-building campaigns." },
      { step: 4, title: "Monitor & Scale", description: "Track rankings and traffic; scale what works." },
    ],
    ctaHeading: "Rank Higher, Grow Traffic",
    ctaDescription:
      "Share your site and target keywords and we'll propose an SEO plan and timeline.",
  },
  relatedSlugs: ["google-ads", "social-media-marketing", "website-development"],
};

const SOCIAL_MEDIA_MARKETING: SubServiceDefinition = {
  slug: "social-media-marketing",
  parentSlug: "digital-marketing",
  label: "Social Media Marketing",
  icon: "Share2",
  seo: {
    title: "Social Media Marketing Services ",
    description:
      "Social media strategy, content, and ads for Facebook, Instagram, LinkedIn, and more. Build community and grow engagement.",
    keywords: [
      "social media marketing",
      "Facebook marketing",
      "Instagram marketing",
      "LinkedIn marketing",
      "social media strategy",
      "content creation",
      "community management",
    ],
  },
  content: {
    heading: "Social Media Marketing",
    description:
      "We build and execute social media strategies that grow your audience and engagement. From content creation and community management to paid social campaigns, we help you connect with customers on the platforms they use most.",
    image: "/images/services/social-media-marketing.png",
    technologies: "Meta Business Suite, LinkedIn, Hootsuite, Buffer, Canva",
    whyChoose: [
      "Organic and paid social in one place",
      "Content calendars and community management",
      "Platform-specific best practices",
      "Regular reporting and optimization",
    ],
    faqs: [
      { question: "Which platforms do you manage?", answer: "Facebook, Instagram, LinkedIn, Twitter/X, and others. We focus on the platforms that matter for your audience." },
      { question: "Do you create content?", answer: "Yes. We create posts, graphics, and copy aligned with your brand and goals." },
      { question: "How often do you post?", answer: "We tailor posting frequency to each platform and your goals. Typically 3–7 posts per week depending on the channel." },
      { question: "Do you run paid social ads?", answer: "Yes. We manage Meta Ads, LinkedIn Ads, and other paid social to complement organic content and drive conversions." },
      { question: "What metrics do you report?", answer: "Engagement rate, reach, follower growth, click-through rate, and conversion metrics. We customize reports to your KPIs." },
    ],
    useCases: ["B2B", "B2C", "E-commerce", "Local Business", "Events", "Influencer Campaigns"],
    expectedResults: ["Growing audience engagement", "Higher brand awareness", "More qualified leads", "Consistent content calendar", "Stronger community presence", "Increased share of voice", "Authentic brand storytelling", "Measurable social ROI"],
    benefits: [
      "Strategy & Content Calendar",
      "Content Creation & Design",
      "Community Management",
      "Paid Social (Meta, LinkedIn, etc.)",
      "Influencer & Partnership Outreach",
      "Analytics & Reporting",
      "Brand Voice & Guidelines",
      "Crisis & Reputation Management",
    ],
    process: [
      { step: 1, title: "Goals & Audience", description: "Define objectives and target audience per platform." },
      { step: 2, title: "Strategy & Content", description: "Content pillars, calendar, and creative direction." },
      { step: 3, title: "Publish & Engage", description: "Scheduling, community management, and ads." },
      { step: 4, title: "Report & Optimize", description: "Metrics review and continuous improvement." },
    ],
    ctaHeading: "Grow Your Social Presence",
    ctaDescription:
      "Tell us your platforms and goals and we'll outline a social media plan.",
  },
  relatedSlugs: ["meta-ads", "graphic-designing", "seo"],
};

const GRAPHIC_DESIGNING: SubServiceDefinition = {
  slug: "graphic-designing",
  parentSlug: "digital-marketing",
  label: "Graphic Designing",
  icon: "Palette",
  seo: {
    title: "Graphic Design Services ",
    description:
      "Logo design, brand identity, social graphics, and marketing materials. Professional design that strengthens your brand.",
    keywords: [
      "graphic design",
      "logo design",
      "brand identity",
      "social media graphics",
      "marketing design",
      "Adobe",
      "Figma",
    ],
  },
  content: {
    heading: "Graphic Designing",
    description:
      "From logos to social media posts, we craft visually compelling designs that strengthen your brand identity. Our design services help you create a consistent and professional visual presence across all platforms.",
    image: "/images/services/graphic-design.png",
    technologies: "Adobe Photoshop, Illustrator, Figma, Canva, After Effects, Premiere Pro",
    whyChoose: [
      "Brand-consistent visuals across channels",
      "Logos, social, print, and video",
      "Fast turnaround and revisions",
      "Works with your marketing team",
    ],
    faqs: [
      { question: "What file formats do you deliver?", answer: "We deliver all standard formats (PNG, JPG, SVG, PDF, etc.) and source files as needed." },
      { question: "Do you do video?", answer: "Yes. We offer video editing and motion graphics for social and marketing." },
      { question: "How many revision rounds are included?", answer: "We typically include 2–3 rounds of revisions. Additional rounds can be added. We clarify scope before starting." },
      { question: "Do you create brand guidelines?", answer: "Yes. For logo and brand projects we deliver style guides with colors, fonts, and usage rules." },
      { question: "What's the typical turnaround time?", answer: "Simple graphics: 2–3 days. Logos and full branding: 1–2 weeks. We provide timelines for each project." },
    ],
    useCases: ["Startups", "E-commerce", "Agencies", "Events", "Social Media", "Print & Packaging"],
    expectedResults: ["Professional, on-brand visuals", "Consistent identity across channels", "Assets for web and print", "Flexible file formats", "Memorable brand recognition", "Standout visual presence", "Ready-to-use marketing materials", "Cohesive design system"],
    benefits: [
      "Logo & Brand Identity Design",
      "Social Media Graphics",
      "Web & App UI/UX Design",
      "Print Design (Brochures, Flyers)",
      "Banner & Advertisement Design",
      "Product Packaging Design",
      "Infographics & Presentations",
      "Video Editing & Animation",
    ],
    process: [
      { step: 1, title: "Brief & Mood", description: "Capture brand values and visual direction." },
      { step: 2, title: "Concepts", description: "Present multiple concepts and iterate." },
      { step: 3, title: "Refinement", description: "Finalize designs and deliver brand guidelines." },
      { step: 4, title: "Assets & Handoff", description: "All formats and usage guidelines." },
    ],
    ctaHeading: "Elevate Your Brand Visually",
    ctaDescription:
      "Share your brand and we'll propose a design package (logo, social, etc.).",
  },
  relatedSlugs: ["social-media-marketing", "meta-ads", "seo"],
};

const GOOGLE_ADS: SubServiceDefinition = {
  slug: "google-ads",
  parentSlug: "digital-marketing",
  label: "Google Ads",
  icon: "MousePointerClick",
  seo: {
    title: "Google Ads Management - PPC Services ",
    description:
      "Google Ads setup and management: Search, Display, YouTube. Maximize ROI with expert PPC campaigns.",
    keywords: [
      "Google Ads",
      "PPC management",
      "Google Search Ads",
      "Google Display Ads",
      "YouTube ads",
      "pay per click",
      "PPC campaigns",
    ],
  },
  content: {
    heading: "Google Ads",
    description:
      "We create and manage Google Ads campaigns that drive qualified traffic and conversions. From Search and Display to YouTube, we optimize for your goals and maximize return on ad spend.",
    image: "/images/services/google-ads.png",
    technologies: "Google Ads, Google Analytics, Google Tag Manager",
    whyChoose: [
      "Search, Display, and YouTube expertise",
      "Conversion-focused setup and tracking",
      "Ongoing optimization and A/B tests",
      "Clear reporting and ROI focus",
    ],
    faqs: [
      { question: "What's a typical monthly budget?", answer: "We work with any budget. We recommend a minimum that allows testing; we'll propose based on your goals." },
      { question: "Do you set up conversion tracking?", answer: "Yes. We implement and verify conversion tracking so you see real ROI." },
      { question: "Which ad types do you run?", answer: "Search, Display, YouTube, Shopping, and Performance Max. We choose based on your goals and audience." },
      { question: "How often do you optimize campaigns?", answer: "We optimize continuously—keyword bids, ad copy, landing pages. You get weekly or monthly reports and strategy calls." },
      { question: "Do you need access to my Google Ads account?", answer: "Yes. We work as an agency partner with read/write access. We'll guide you through secure setup." },
    ],
    useCases: ["E-commerce", "Lead Gen", "Local Services", "SaaS", "Brand Awareness", "YouTube Ads"],
    expectedResults: ["Qualified traffic and leads", "Improved ROAS", "Clear attribution", "Scalable campaigns", "Faster conversion cycles", "Optimized ad spend", "Precise targeting results", "Continuous campaign improvement"],
    benefits: [
      "Search & Display Campaigns",
      "YouTube & Video Ads",
      "Shopping & Performance Max",
      "Keyword Research & Bidding",
      "Landing Page Optimization",
      "Conversion Tracking & Goals",
      "A/B Testing",
      "Monthly Reporting & Optimization",
    ],
    process: [
      { step: 1, title: "Goals & Audience", description: "Define KPIs and target audience." },
      { step: 2, title: "Setup & Structure", description: "Account structure, keywords, and creatives." },
      { step: 3, title: "Launch & Optimize", description: "Campaign launch and ongoing optimization." },
      { step: 4, title: "Scale & Report", description: "Scale winners and regular reporting." },
    ],
    ctaHeading: "Get More From Google Ads",
    ctaDescription:
      "Share your budget and goals and we'll propose a Google Ads strategy.",
  },
  relatedSlugs: ["meta-ads", "seo", "digital-marketing"],
};

const META_ADS: SubServiceDefinition = {
  slug: "meta-ads",
  parentSlug: "digital-marketing",
  label: "Meta Ads",
  icon: "Facebook",
  seo: {
    title: "Meta Ads Management - Facebook & Instagram Ads ",
    description:
      "Facebook and Instagram ad management. Reach your audience with targeted Meta (Facebook & Instagram) campaigns.",
    keywords: [
      "Meta Ads",
      "Facebook Ads",
      "Instagram Ads",
      "Facebook marketing",
      "Instagram marketing",
      "social media ads",
      "Meta Business Suite",
    ],
  },
  content: {
    heading: "Meta Ads",
    description:
      "We run Facebook and Instagram ad campaigns that reach your target audience and drive leads and sales. From awareness to conversion objectives, we manage creative, targeting, and budgets to maximize results.",
    image: "/images/services/meta-ads.png",
    technologies: "Meta Business Suite, Facebook Pixel, Instagram Ads",
    whyChoose: [
      "Facebook and Instagram campaign management",
      "Audience building and lookalikes",
      "Creative testing and optimization",
      "Pixel setup and conversion tracking",
    ],
    faqs: [
      { question: "Do you need our Facebook/Instagram access?", answer: "We work with Business Manager access. We'll guide you through secure access setup." },
      { question: "What objectives do you run?", answer: "Awareness, traffic, leads, and sales. We choose based on your funnel and goals." },
      { question: "Do you create ad creative?", answer: "Yes. We design static images, carousels, and video ads, or we can use your existing creative." },
      { question: "How do you target audiences?", answer: "We use interests, lookalikes, custom audiences (email, website visitors), and retargeting to reach the right people." },
      { question: "What's the minimum ad spend?", answer: "We work with various budgets. We recommend a minimum for meaningful testing; we'll advise based on your goals." },
    ],
    useCases: ["E-commerce", "Lead Gen", "App Install", "Events", "Local Business", "D2C Brands"],
    expectedResults: ["Targeted reach on Meta platforms", "Leads and sales from ads", "Improved ROAS", "Scalable campaigns", "Engaged audience growth", "Retargeting success", "Creative performance insights", "Audience building for future campaigns"],
    benefits: [
      "Facebook & Instagram Ads",
      "Audience Targeting & Lookalikes",
      "Creative Strategy & A/B Tests",
      "Lead Forms & Conversion Setup",
      "Pixel & Event Tracking",
      "Retargeting Campaigns",
      "Stories & Reels Ads",
      "Reporting & Optimization",
    ],
    process: [
      { step: 1, title: "Objectives & Audience", description: "Define goals and target demographics." },
      { step: 2, title: "Creative & Setup", description: "Ad creatives and campaign structure." },
      { step: 3, title: "Launch & Optimize", description: "Launch campaigns and optimize for results." },
      { step: 4, title: "Scale & Report", description: "Scale successful campaigns and report results." },
    ],
    ctaHeading: "Reach Your Audience on Meta",
    ctaDescription:
      "Share your goals and we'll propose a Meta Ads plan (Facebook & Instagram).",
  },
  relatedSlugs: ["google-ads", "social-media-marketing", "graphic-designing"],
};

/** All top-level service definitions (no parent) */
export const TOP_LEVEL_SERVICES: Record<string, ServiceDefinition> = {
  "website-development": WEBSITE_DEVELOPMENT,
  "app-development": APP_DEVELOPMENT,
  "ai-ml": AI_ML,
  "chatbot-development": CHATBOT_DEVELOPMENT,
  "maintenance-support": MAINTENANCE_SUPPORT,
  "deployment-devops": DEPLOYMENT_DEVOPS,
  "digital-marketing": DIGITAL_MARKETING,
};

/** Digital marketing sub-services */
export const DIGITAL_MARKETING_SERVICES: Record<string, SubServiceDefinition> = {
  seo: SEO_SERVICE,
  "social-media-marketing": SOCIAL_MEDIA_MARKETING,
  "graphic-designing": GRAPHIC_DESIGNING,
  "google-ads": GOOGLE_ADS,
  "meta-ads": META_ADS,
};

/** Get top-level service by slug */
export function getTopLevelService(slug: string): ServiceDefinition | undefined {
  return TOP_LEVEL_SERVICES[slug];
}

/** Get digital marketing sub-service by subSlug */
export function getDigitalMarketingService(subSlug: string): SubServiceDefinition | undefined {
  return DIGITAL_MARKETING_SERVICES[subSlug];
}

/** Get service definition: top-level slug or digital-marketing/subSlug */
export function getServiceBySlug(slug: string, subSlug?: string): ServiceDefinition | undefined {
  if (subSlug) {
    return getDigitalMarketingService(subSlug);
  }
  return getTopLevelService(slug);
}

/** All service URLs for sitemap and internal linking */
export function getAllServiceUrls(): { url: string; slug: string; subSlug?: string }[] {
  const urls: { url: string; slug: string; subSlug?: string }[] = [];
  TOP_LEVEL_SLUG_LIST.forEach((slug) => {
    urls.push({ url: `/services/${slug}`, slug, subSlug: undefined });
  });
  DIGITAL_MARKETING_SUB_SLUG_LIST.forEach((subSlug) => {
    urls.push({ url: `/services/digital-marketing/${subSlug}`, slug: "digital-marketing", subSlug });
  });
  return urls;
}

/** Nav: top-level items; digital marketing has children */
export interface NavServiceItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export function getServicesNavItems(): NavServiceItem[] {
  const items: NavServiceItem[] = TOP_LEVEL_SLUG_LIST.map((slug) => {
    const def = TOP_LEVEL_SERVICES[slug];
    if (slug === "digital-marketing") {
      const children = DIGITAL_MARKETING_SUB_SLUG_LIST.map((subSlug) => {
        const sub = DIGITAL_MARKETING_SERVICES[subSlug];
        return { label: sub.label, href: `/services/digital-marketing/${subSlug}` };
      });
      return { label: def.label, href: `/services/${slug}`, children };
    }
    return { label: def.label, href: `/services/${slug}` };
  });
  return items;
}

/** Get related service definitions for internal linking */
export function getRelatedServices(relatedSlugs: string[] | undefined): ServiceDefinition[] {
  if (!relatedSlugs?.length) return [];
  return relatedSlugs
    .map((slug) => {
      const top = getTopLevelService(slug);
      if (top) return top;
      const sub = getDigitalMarketingService(slug);
      return sub;
    })
    .filter((s): s is ServiceDefinition => !!s);
}

/** Get up to 6 related services for display; pads with other services if needed */
export function getRelatedServicesUpToSix(
  relatedSlugs: string[] | undefined,
  excludeSlug?: string
): ServiceDefinition[] {
  let result = getRelatedServices(relatedSlugs).filter(
    (s) => s.slug !== excludeSlug
  );
  if (result.length >= 6) return result.slice(0, 6);
  const seen = new Set(result.map((s) => s.slug));
  for (const slug of TOP_LEVEL_SLUG_LIST) {
    if (result.length >= 6) break;
    if (slug === excludeSlug || seen.has(slug)) continue;
    const def = getTopLevelService(slug);
    if (def) {
      result.push(def);
      seen.add(slug);
    }
  }
  for (const subSlug of DIGITAL_MARKETING_SUB_SLUG_LIST) {
    if (result.length >= 6) break;
    if (subSlug === excludeSlug || seen.has(subSlug)) continue;
    const def = getDigitalMarketingService(subSlug);
    if (def) {
      result.push(def);
      seen.add(subSlug);
    }
  }
  return result.slice(0, 6);
}

/** Build href for a service (top-level or digital-marketing sub) */
export function getServiceHref(service: ServiceDefinition): string {
  if ("parentSlug" in service && service.parentSlug === "digital-marketing") {
    return `/services/digital-marketing/${service.slug}`;
  }
  return `/services/${service.slug}`;
}

/** Category for main Services page tabbed listing */
export type ServiceCategory = "development" | "digital-marketing" | "support";

export interface ServiceListingItem {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  tools: string;
  faqs: { question: string; answer: string }[];
  image: string;
  href: string;
  icon?: string;
  category: ServiceCategory;
  useCases?: string[];
  expectedResults?: string[];
}

/** Get services for main listing page, grouped by category */
export function getServicesForListing(): ServiceListingItem[] {
  const categories: Record<string, ServiceCategory> = {
    "website-development": "development",
    "app-development": "development",
    "ai-ml": "development",
    "chatbot-development": "development",
    "digital-marketing": "digital-marketing",
    seo: "digital-marketing",
    "social-media-marketing": "digital-marketing",
    "graphic-designing": "digital-marketing",
    "google-ads": "digital-marketing",
    "meta-ads": "digital-marketing",
    "maintenance-support": "support",
    "deployment-devops": "support",
  };

  const items: ServiceListingItem[] = [];

  // Top-level services
  TOP_LEVEL_SLUG_LIST.forEach((slug) => {
    const def = TOP_LEVEL_SERVICES[slug];
    if (!def) return;
    items.push({
      slug: def.slug,
      title: def.label,
      shortDescription: def.content.description.slice(0, 120) + "...",
      longDescription: def.content.description,
      features: def.content.benefits,
      benefits: def.content.benefits,
      process: def.content.process,
      tools: def.content.technologies ?? "",
      faqs: def.content.faqs ?? [],
      image: def.content.image ?? "/images/services/website.png",
      href: getServiceHref(def),
      icon: def.icon,
      category: categories[slug] ?? "development",
      useCases: def.content.useCases,
      expectedResults: def.content.expectedResults,
    });
  });

  // Digital marketing sub-services (for tabbed view)
  DIGITAL_MARKETING_SUB_SLUG_LIST.forEach((subSlug) => {
    const def = DIGITAL_MARKETING_SERVICES[subSlug];
    if (!def) return;
    items.push({
      slug: def.slug,
      title: def.label,
      shortDescription: def.content.description.slice(0, 120) + "...",
      longDescription: def.content.description,
      features: def.content.benefits,
      benefits: def.content.benefits,
      process: def.content.process,
      tools: def.content.technologies ?? "",
      faqs: def.content.faqs ?? [],
      image: def.content.image ?? "/images/services/website.png",
      href: getServiceHref(def),
      icon: def.icon,
      category: "digital-marketing",
      useCases: def.content.useCases,
      expectedResults: def.content.expectedResults,
    });
  });

  return items;
}
