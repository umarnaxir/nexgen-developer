/**
 * Services configuration: slugs, content, SEO, and navigation.
 * Used for dynamic routes, sitemap, navbar, and internal linking.
 * Admin-managed overrides live in content/services.json (loaded via services-server).
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
 "ai-ml",
 "chatbot-development",
 "maintenance-support",
 "deployment-devops",
 "digital-marketing",
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
 title: "Website Development Services",
 description:
 "Custom responsive websites, web apps, and enterprise solutions with React, Next.js, Node.js, and Python. SEO-ready builds and ongoing support.",
 keywords: [
 "website development",
 "web development services",
 "custom website development",
 "responsive website design",
 "Next.js development",
 "React development",
 "full-stack development",
 "web application development",
 "enterprise web solutions",
 "e-commerce website development",
 "Node.js development",
 "Python web development",
 "Django development",
 "Flask development",
 "MongoDB development",
 "PostgreSQL development",
 "RESTful API development",
 "GraphQL development",
 "progressive web apps",
 "single page applications",
 "website redesign",
 "legacy website modernization",
 "SEO optimized websites",
 "performance optimization",
 "web development company",
 ],
 },
 content: {
 heading: "Website Development",
 description:
 "We build complete, end-to-end web solutions from frontend to backend. Our website development services include modern responsive websites, web applications, and complex enterprise solutions. We handle everything from user interface design to server-side logic, database management, and API integration. Our team specializes in creating scalable, secure, and high-performance web applications that drive business growth. Whether you need a simple business website, a complex e-commerce platform, or a custom web application, we deliver solutions that exceed expectations. We follow industry best practices, implement modern design principles, and ensure your website is optimized for search engines, mobile devices, and user experience.",
 image: "/images/services/website.png",
 technologies: "React, Next.js, Node.js, Python, Django, Flask, Express.js, MongoDB, PostgreSQL, MySQL",
 whyChoose: [
 "Experienced full-stack team with modern frameworks",
 "Agile process with regular demos and feedback",
 "Scalable, secure, and performance-optimized code",
 "Post-launch support and maintenance options",
 ],
 faqs: [
 { question: "How long does a typical website project take?", answer: "Timeline depends on scope and complexity. A simple brochure or business website typically takes 4–6 weeks from kickoff to launch. Custom web applications, e-commerce sites with multiple integrations, or enterprise portals may take 3–6 months or more. We provide a detailed project timeline and milestones during the discovery phase so you know what to expect at each stage. We also offer phased deliveries so you can go live with core features first and add more over time." },
 { question: "Do you offer ongoing maintenance and support?", answer: "Yes. We offer flexible maintenance and support plans tailored to your stack and needs. These include regular updates, security patches, dependency upgrades, bug fixes, and optional feature enhancements. You can choose from monthly retainers or on-demand support. We also provide monitoring, backups, and performance checks so your site stays fast and secure. Many of our clients start with a launch package and then move to a maintenance plan for peace of mind." },
 { question: "What tech stack do you use for website development?", answer: "We use modern, proven technologies chosen to fit your project. For frontend we typically use React, Next.js, or Vue.js for fast, responsive interfaces. Backend options include Node.js, Python (Django or Flask), or PHP depending on your requirements. We work with PostgreSQL, MySQL, or MongoDB for databases, and we build RESTful or GraphQL APIs when needed. We choose the stack based on your goals, scale, and team - and we document everything so your team or future developers can maintain it." },
 { question: "Can you redesign or modernize an existing website?", answer: "Yes. We regularly take on redesigns and modernizations. We can refresh the design and user experience while keeping your content and branding, migrate your site to a new platform or tech stack, improve performance and SEO, and add new features or integrations. We assess the current codebase and content, plan the migration to avoid downtime, and preserve or improve your search rankings. Whether you need a visual refresh or a full technical overhaul, we’ll outline the steps and timeline upfront." },
 { question: "Do you handle e-commerce and payment integrations?", answer: "Yes. We build and integrate e-commerce solutions including custom stores and platforms like Shopify or WooCommerce. We integrate payment gateways such as Stripe, PayPal, and others so you can accept cards and alternative payments securely. We also handle product catalogs, checkout flows, inventory, and tax rules as needed. For subscription or SaaS billing we can implement recurring payments and invoicing. All implementations follow PCI best practices and work across devices." },
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
 title: "Mobile App Development Services",
 description:
 "iOS and Android apps with React Native and Flutter — from concept to App Store and Play Store, plus ongoing support.",
 keywords: [
 "mobile app development",
 "iOS app development",
 "Android app development",
 "React Native development",
 "Flutter development",
 "cross-platform app development",
 "native app development",
 "mobile application development",
 "app store optimization",
 "play store optimization",
 "Swift development",
 "Kotlin development",
 "Java mobile development",
 "Firebase integration",
 "mobile app design",
 "mobile UX design",
 "push notifications",
 "in-app purchases",
 "mobile app maintenance",
 "app updates and support",
 "mobile app consulting",
 "MVP mobile app development",
 "enterprise mobile apps",
 "mobile app development company",
 ],
 },
 content: {
 heading: "App Development",
 description:
 "We develop powerful native and cross-platform mobile applications for iOS and Android. From concept to deployment, we create user-friendly apps that deliver exceptional performance and seamless user experiences across all devices. Our mobile app development services cover the entire lifecycle from initial ideation and design to App Store and Play Store submission. We build apps that are not only visually appealing but also functionally robust, secure, and scalable. Whether you need a consumer-facing app, a B2B solution, or an enterprise mobile application, our team leverages the latest technologies and frameworks to deliver apps that users love and businesses rely on.",
 image: "/images/services/app.png",
 technologies: "React Native, Flutter, Swift, Kotlin, Java, Firebase, AWS",
 whyChoose: [
 "Native and cross-platform expertise",
 "App Store and Play Store submission support",
 "Focus on UX and performance",
 "Ongoing updates and maintenance",
 ],
 faqs: [
 { question: "Native vs cross-platform - which is better for my app?", answer: "Native (Swift/Kotlin) gives the best performance and platform-specific UX per OS but requires two codebases and higher cost. Cross-platform (React Native, Flutter) lets you ship one codebase to both iOS and Android, reducing time and cost while still delivering a strong experience. We recommend based on your goals, budget, and need for platform-specific features. For most business and productivity apps, cross-platform is a great balance. For graphics-heavy or highly native-feeling apps, we can discuss a native or hybrid approach." },
 { question: "Do you handle App Store and Play Store submission?", answer: "Yes. We build, test, and guide you through the full submission process for both the Apple App Store and Google Play Store. This includes preparing assets (icons, screenshots, descriptions), configuring app metadata and privacy settings, and following each store’s guidelines. We help you respond to review feedback and set up the process for future updates. Many clients hand us the requirements and we take care of the submission steps so you can focus on your business." },
 { question: "How much does mobile app development cost?", answer: "Cost depends on scope, features, and platforms. Simple apps (e.g. MVP with core flows) can start in the lower range; more complex apps with custom backends, integrations, or advanced UX cost more. We provide transparent, fixed or phased quotes after scoping your requirements. We often break work into phases (e.g. MVP first, then enhancements) so you can manage budget and launch sooner. We’ll outline options and recommend an approach that fits your goals and timeline." },
 { question: "Can you build for both iOS and Android with one codebase?", answer: "Yes. Using React Native or Flutter we build a single codebase that runs on both iOS and Android. This reduces development time and cost compared to maintaining two separate native apps, while still delivering a smooth, native-feeling experience. We handle platform-specific tweaks where needed (e.g. navigation, permissions, store requirements). You get one codebase to maintain, one release cycle, and consistent features across both platforms unless you choose to differentiate." },
 { question: "Do you provide app maintenance and updates after launch?", answer: "Yes. We offer maintenance and support plans that include bug fixes, compatibility updates for new OS versions, security patches, and optional feature additions. This keeps your app running smoothly as Apple and Google release updates and as your business evolves. We can also help with store listing updates, analytics, and performance tuning. Many clients start with post-launch support and then add new features in follow-on phases." },
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
 title: "AI & Machine Learning Solutions",
 description:
 "Custom AI/ML for predictive analytics, NLP, computer vision, and automation — designed, trained, and deployed for measurable business results.",
 keywords: [
 "AI solutions",
 "artificial intelligence development",
 "machine learning development",
 "ML solutions",
 "NLP development",
 "natural language processing",
 "computer vision",
 "predictive analytics",
 "TensorFlow development",
 "PyTorch development",
 "deep learning",
 "neural networks",
 "AI integration",
 "machine learning consulting",
 "data science services",
 "AI automation",
 "chatbot AI",
 "recommendation systems",
 "image recognition",
 "speech recognition",
 "AI model training",
 "ML model deployment",
 "scikit-learn",
 "OpenCV",
 "AI consulting",
 "machine learning company",
 ],
 },
 content: {
 heading: "AI & ML Solutions",
 description:
 "We integrate Artificial Intelligence and Machine Learning to automate processes, enhance decision-making, and create intelligent applications. From predictive analytics to computer vision, we build AI solutions that transform your business operations. Our AI/ML services help businesses leverage data to gain competitive advantages, automate repetitive tasks, and make data-driven decisions. We develop custom machine learning models, implement natural language processing systems, create computer vision applications, and build recommendation engines. Our solutions are designed to integrate seamlessly with your existing systems while providing actionable insights and automation capabilities that drive efficiency and growth.",
 image: "/images/services/ai.png",
 technologies: "Python, TensorFlow, PyTorch, Scikit-learn, OpenCV, NLTK, OpenAI API",
 whyChoose: [
 "Practical AI/ML for business outcomes",
 "From data pipelines to deployed models",
 "NLP, computer vision, and predictive analytics",
 "Integration with your existing systems",
 ],
 faqs: [
 { question: "Do I need a lot of data to get started with ML?", answer: "It depends on the use case. Some solutions work well with smaller datasets or pre-trained models (e.g. for classification or sentiment). Others, like custom recommendation engines or highly specific predictors, benefit from more data. We assess your data availability, quality, and goals and recommend the best approach - whether that’s starting with a pre-trained model, collecting more data, or using synthetic or augmented data where appropriate. We can also design a phased plan: start with a simpler model and improve as you gather more data." },
 { question: "Can you integrate AI/ML with our existing software?", answer: "Yes. We design AI/ML solutions to fit into your current systems. We build APIs, microservices, or embedded modules that connect to your existing apps, databases, and workflows. Integration can include real-time inference, batch processing, or event-driven pipelines. We work with your tech stack and security requirements so the AI layer is maintainable and scalable. Whether you use CRM, ERP, or custom tools, we ensure the ML component fits cleanly into your architecture." },
 { question: "What types of AI and ML solutions do you build?", answer: "We build a range of AI/ML solutions: predictive analytics and forecasting, natural language processing (chatbots, text classification, summarization), computer vision (image/video analysis, object detection), recommendation systems, and process automation. We tailor each solution to your use case, data, and constraints. We use both custom models (e.g. scikit-learn, TensorFlow, PyTorch) and third-party APIs (e.g. OpenAI) where they add value. We’ll recommend the right mix of build vs. buy for your goals and budget." },
 { question: "How long does an AI/ML project typically take?", answer: "Timeline varies with complexity. Simple integrations or proof-of-concepts can be done in a few weeks. Custom model training, evaluation, and deployment might take one to three months. Large-scale or regulated deployments can extend further. We provide a clear timeline after reviewing your data, success criteria, and integration needs. We often deliver in phases: a working prototype or MVP first, then iteration and production hardening, so you see value early and can adjust priorities." },
 { question: "Do you use OpenAI or other third-party AI APIs?", answer: "Yes, when they’re the right fit. We use OpenAI and other third-party APIs for tasks like language understanding, generation, or embeddings when they offer the best balance of quality and cost. We also build and train custom models when you need full control, specific domain performance, or strict data privacy. We recommend based on your requirements: speed to market, cost, accuracy, and where your data can live. We can also combine APIs with custom logic for hybrid solutions." },
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
 title: "AI Chatbot Development Services",
 description:
 "AI chatbots for customer support and automation with NLP, multi-channel integration, and continuous optimization after launch.",
 keywords: [
 "chatbot development",
 "AI chatbot",
 "customer support chatbot",
 "NLP chatbot",
 "conversational AI",
 "virtual assistant",
 "OpenAI chatbot",
 "Dialogflow chatbot",
 "Rasa chatbot",
 "WhatsApp chatbot",
 "Facebook Messenger bot",
 "website chatbot",
 "chatbot integration",
 "CRM chatbot integration",
 "intelligent chatbot",
 "automated customer service",
 "chatbot consulting",
 "custom chatbot development",
 "multi-language chatbot",
 "voice chatbot",
 "chatbot training",
 "chatbot optimization",
 "chatbot maintenance",
 "chatbot development company",
 ],
 },
 content: {
 heading: "Chatbot Development",
 description:
 "Enhance customer engagement with AI-powered chatbots that provide instant and intelligent support across platforms. Our chatbots can handle customer queries, automate responses, and integrate seamlessly with your existing systems. We develop intelligent conversational AI solutions that understand context, learn from interactions, and provide personalized experiences. Our chatbots can be deployed on websites, messaging platforms like WhatsApp and Facebook Messenger, and integrated with CRM systems. They help reduce support costs, improve response times, and provide 24/7 customer assistance. With natural language processing capabilities, our chatbots understand user intent and deliver accurate, helpful responses that enhance customer satisfaction.",
 image: "/images/services/chatbot.png",
 technologies: "OpenAI, Dialogflow, Rasa, Python, Node.js, Webhooks, APIs",
 whyChoose: [
 "AI-powered, context-aware conversations",
 "Website, WhatsApp, and more channels",
 "CRM and backend integration",
 "Ongoing tuning and support",
 ],
 faqs: [
 { question: "Which platforms can the chatbot work on?", answer: "Our chatbots can run on multiple channels so you meet customers where they are. We integrate with website widgets (embedded on your site), WhatsApp Business, Slack, Facebook Messenger, and custom APIs for other apps. You can start with one channel (e.g. website) and add more later. We design the conversation logic once and adapt the connectors per channel, so the experience stays consistent. We’ll recommend the best channels based on your audience and support workflow." },
 { question: "How do you train and improve the chatbot?", answer: "We start with your existing content: FAQs, help articles, and sample conversations. For rule-based or intent-based bots we define intents, entities, and flows. For more advanced, open-ended conversation we use NLP and optional LLM integration (e.g. OpenAI) with careful prompting and guardrails. We tune the bot using real conversations and feedback, and we can add human handoff when the bot can’t resolve an issue. Training is iterative - we refine over time so the bot gets better at handling your actual use cases." },
 { question: "Can your chatbots handle multiple languages?", answer: "Yes. We build multi-language chatbots that can detect the user’s language or let them choose, and respond in that language. This is especially useful for global support or regional sites. We work with your translated content or integrate with translation services where needed. Language handling is built into the design from the start so adding or changing languages later is straightforward." },
 { question: "Do you integrate chatbots with CRMs and support tools?", answer: "Yes. We integrate with popular CRMs and support platforms such as Salesforce, HubSpot, Zendesk, and others, as well as custom systems via APIs. Conversations can create or update leads and tickets, sync contact and activity data, and trigger workflows (e.g. assign to an agent). This keeps your team in the loop and ensures no lead or issue falls through the cracks. We’ll map the fields and flows you need during the design phase." },
 { question: "What's the cost of a custom chatbot?", answer: "Cost depends on complexity and scope. Simple FAQ or rule-based bots with a single channel are more affordable. AI-powered conversational bots with multiple channels, CRM integration, and custom training cost more. We provide a clear quote after scoping: we’ll define the flows, channels, and integrations you need and outline optional phases (e.g. start with website only, then add WhatsApp and CRM). That way you can align the solution with your budget and priorities." },
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
 title: "Website & App Maintenance",
 description:
 "24/7 website and app maintenance — updates, security patches, bug fixes, monitoring, and performance support for peace of mind.",
 keywords: [
 "website maintenance",
 "app maintenance",
 "technical support",
 "bug fixes",
 "security updates",
 "performance optimization",
 "24/7 support",
 "website support services",
 "app support services",
 "maintenance plans",
 "website updates",
 "security patches",
 "performance monitoring",
 "uptime monitoring",
 "backup services",
 "database maintenance",
 "code updates",
 "feature enhancements",
 "incident response",
 "SLA support",
 "retainer support",
 "on-demand support",
 "maintenance and support company",
 ],
 },
 content: {
 heading: "Maintenance & Support",
 description:
 "Keep your applications running smoothly with our comprehensive maintenance and support services. We provide ongoing updates, bug fixes, security patches, performance optimization, and 24/7 technical support to ensure your digital solutions remain reliable and up-to-date. Our maintenance services include proactive monitoring, regular security audits, performance optimization, database maintenance, backup management, and feature enhancements. We offer flexible support plans tailored to your needs, from basic maintenance to comprehensive managed services. With our support, you can focus on growing your business while we ensure your digital infrastructure remains secure, performant, and aligned with the latest technologies.",
 image: "/images/services/maintenance-and-support .png",
 technologies: "All Technologies, Monitoring Tools, Backup Solutions",
 whyChoose: [
 "Dedicated support and fast response times",
 "Proactive monitoring and security patches",
 "Transparent reporting and SLAs",
 "Flexible retainer and on-demand options",
 ],
 faqs: [
 { question: "What's included in a maintenance and support plan?", answer: "Our maintenance plans typically include regular updates (dependencies, frameworks, and security patches), bug fixes, and monitoring of your application’s health and performance. We can also include database maintenance, backup checks, and optional 24/7 support depending on your SLA needs. We tailor each plan to your stack (e.g. React, Node, WordPress) and your priorities - whether that’s stability, speed of response, or room for small feature improvements. You’ll get a clear scope and response-time commitment so you know what to expect." },
 { question: "Can you take over maintenance of an existing project?", answer: "Yes. We regularly onboard existing codebases from other teams or vendors. We start by reviewing the architecture, dependencies, and deployment setup, then we document the system and any quirks. We set up monitoring, alerting, and support workflows so we can respond quickly to issues. We’re comfortable working with a wide range of technologies and can suggest improvements (e.g. security, performance, or maintainability) as we go. Handover usually includes a transition period so we’re fully up to speed before you rely on us for ongoing support." },
 { question: "What is your typical response time for issues?", answer: "We offer tiered SLAs to match your needs. Standard plans typically include a 24–48 hour response for non-critical issues. Priority plans can offer same-day response or 24/7 coverage for critical outages. We define “critical” with you (e.g. site down, payment flow broken) and ensure those get immediate attention. Response time is the time until we acknowledge and start working on the issue; resolution time depends on complexity and we keep you updated throughout." },
 { question: "Do you provide regular reports on maintenance and uptime?", answer: "Yes. We send regular status reports that can include uptime and availability summaries, a list of changes and deployments, security and dependency updates, and recommendations for improvements. Reporting frequency (e.g. monthly or quarterly) and format are agreed in your plan. This keeps you informed without needing to chase updates and helps with internal reporting or compliance if required." },
 { question: "Can I scale up support during busy periods or for special projects?", answer: "Yes. We offer flexible add-ons such as extra retainer hours or on-demand support for busy seasons, product launches, or one-off projects. You can scale up when you need more capacity and scale back when things are quiet. We’ll outline how to request and use additional hours so you’re never stuck when demand spikes." },
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
 title: "DevOps & Cloud Deployment",
 description:
 "CI/CD pipelines, Docker, and cloud deployment on AWS, Azure, or GCP — secure, scalable releases with monitoring and handover.",
 keywords: [
 "DevOps services",
 "cloud deployment",
 "CI/CD pipeline",
 "continuous integration",
 "continuous deployment",
 "Docker",
 "Kubernetes",
 "containerization",
 "AWS deployment",
 "Azure deployment",
 "Google Cloud deployment",
 "GCP deployment",
 "Vercel deployment",
 "infrastructure as code",
 "server configuration",
 "cloud infrastructure",
 "scalable hosting",
 "automated deployment",
 "Jenkins",
 "GitHub Actions",
 "GitLab CI",
 "Nginx configuration",
 "load balancing",
 "monitoring and logging",
 "DevOps consulting",
 "DevOps company",
 ],
 },
 content: {
 heading: "Deployment & DevOps",
 description:
 "We ensure your applications are deployed securely and efficiently. Our DevOps services include cloud deployment, CI/CD pipeline setup, server configuration, and infrastructure management to keep your applications running smoothly. We help you build, deploy, and scale your applications with modern DevOps practices. Our services cover infrastructure as code, automated testing and deployment, containerization with Docker, orchestration with Kubernetes, cloud migration, and continuous monitoring. We work with major cloud providers including AWS, Azure, and Google Cloud Platform to create scalable, cost-effective infrastructure solutions. Our DevOps approach reduces deployment time, minimizes errors, and ensures your applications are always available and performing optimally.",
 image: "/images/services/deployment-and-devOps .png",
 technologies: "AWS, Azure, Google Cloud, Docker, Kubernetes, Jenkins, GitHub Actions, Nginx",
 whyChoose: [
 "Cloud-agnostic and cost-conscious setup",
 "CI/CD for faster, safer releases",
 "Security and monitoring built in",
 "Clear documentation and handover",
 ],
 faqs: [
 { question: "Which cloud providers do you use for deployment?", answer: "We work with major cloud providers including AWS, Azure, and Google Cloud (GCP), as well as platforms like Vercel and Netlify for front-end or full-stack apps. We choose based on your application type, scale, budget, and any compliance or data-residency requirements. We can also design multi-cloud or hybrid setups if needed. Our goal is to give you a reliable, scalable, and cost-effective environment without locking you into a single vendor unnecessarily." },
 { question: "Do you provide documentation and handover for the infrastructure?", answer: "Yes. We deliver documentation that typically includes architecture overviews, runbooks for common operations and incidents, and details of how to run deployments and rollbacks. We also do handover sessions with your team so you understand how the system works and how to extend it. This makes it easier for you to operate the system in-house or hand it to another provider later if needed." },
 { question: "How long does deployment and DevOps setup typically take?", answer: "It depends on complexity. A simple static or single-service deployment (e.g. to Vercel or a single server) can be done in 1–2 days. More complex setups - multiple services, databases, CI/CD, and staging environments - often take 1–2 weeks. Large or regulated environments can take longer. We provide a timeline during the planning phase and keep you updated. We can also phase the work (e.g. get production live first, then add full CI/CD and monitoring) so you see value quickly." },
 { question: "Do you set up CI/CD pipelines for automated deployments?", answer: "Yes. We configure continuous integration and deployment (CI/CD) using tools such as GitHub Actions, GitLab CI, Jenkins, or provider-native options (e.g. AWS CodePipeline, Azure DevOps). Pipelines typically run tests, build artifacts, and deploy to staging and production with approval steps where you want them. This reduces manual errors and speeds up releases. We tailor the pipeline to your repo structure, test suite, and release process so it fits your workflow." },
 { question: "Can you migrate our app from another host or cloud?", answer: "Yes. We handle migrations from shared hosting, VPS, legacy servers, or other clouds. We plan the move to minimize downtime - often with a cutover window and rollback plan - and we migrate data, DNS, and configuration as needed. We’ll outline the steps, risks, and timeline before starting so you know what to expect. Post-migration we verify functionality and performance and can stay on for ongoing support." },
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
 title: "Digital Marketing Services",
 description:
 "SEO, social media, Google Ads, and Meta Ads — full-funnel digital marketing to grow traffic, leads, and conversions.",
 keywords: [
 "digital marketing",
 "digital marketing agency",
 "SEO services",
 "search engine optimization",
 "social media marketing",
 "SMM services",
 "Google Ads",
 "Google AdWords",
 "PPC advertising",
 "Meta Ads",
 "Facebook Ads",
 "Instagram Ads",
 "graphic design",
 "marketing strategy",
 "content marketing",
 "email marketing",
 "online marketing",
 "internet marketing",
 "marketing automation",
 "conversion optimization",
 "lead generation",
 "brand awareness",
 "digital marketing consulting",
 "marketing analytics",
 "ROI optimization",
 ],
 },
 content: {
 heading: "Digital Marketing",
 description:
 "Boost your online presence with expert SEO, paid ads, and comprehensive digital marketing strategies. We help you rank higher in search results, drive organic and paid traffic, and convert visitors into customers. Our services include SEO, social media marketing, Google Ads, Meta Ads, and graphic design. We create data-driven marketing campaigns that deliver measurable results. Our team combines technical SEO expertise with creative content strategies to improve your search rankings, increase brand visibility, and generate qualified leads. From keyword research and on-page optimization to social media management and paid advertising campaigns, we provide end-to-end digital marketing solutions that align with your business goals and drive sustainable growth.",
 image: "/images/services/digital-marketing.png",
 technologies: "Google Analytics, Google Search Console, SEMrush, Ahrefs, Facebook Ads, Meta Business Suite",
 whyChoose: [
 "Full-funnel: SEO, paid, social, and creative",
 "Data-driven strategy and reporting",
 "Transparent pricing and clear KPIs",
 "Dedicated account management",
 ],
 faqs: [
 { question: "What's included in your digital marketing services?", answer: "We offer a full range of digital marketing services: SEO (on-page, technical, content), social media management and paid social (Meta, LinkedIn, etc.), Google Ads (Search, Display, YouTube), and graphic design for campaigns and brand assets. We tailor the mix to your goals and budget - you can start with one channel (e.g. SEO or paid ads) and expand, or run integrated campaigns from day one. Each engagement includes strategy, execution, and regular reporting so you see how channels perform and where to invest next." },
 { question: "How do you measure and report on success?", answer: "We define KPIs with you (e.g. traffic, leads, conversions, revenue, or brand metrics) and track them in analytics and ad platforms. You get regular reports - usually monthly - with clear summaries and, where useful, access to dashboards. We focus on metrics that tie to your business goals and explain what’s working and what we’re optimizing. If you use CRM or attribution tools, we can align reporting so you see the full funnel and ROI." },
 { question: "What's a typical monthly retainer for digital marketing?", answer: "Retainers vary by scope and channels. We propose packages based on your goals: from single-channel (e.g. SEO only or one paid channel) to full-funnel campaigns spanning SEO, paid, and social. Smaller retainers suit focused objectives; larger ones support multi-channel strategy and content. We’ll outline options and recommend a level that fits your budget and timeline, and we can adjust as your needs change." },
 { question: "Do you work with small businesses and startups?", answer: "Yes. We work with startups, small and mid-size businesses, and enterprises. We scale our services to your budget and objectives - whether that’s a lean SEO or paid setup or a broader mix of channels. We’re used to moving quickly and iterating, which fits many small teams. We’ll be transparent about what’s realistic for your budget and timeline so you can make informed decisions." },
 { question: "Can you take over and optimize our existing campaigns?", answer: "Yes. We can audit and take over existing SEO, PPC, or social campaigns. We review performance, structure, and creative, then propose a plan to optimize - whether that’s fixing technical or targeting issues, improving creative, or reallocating budget. You can keep your current accounts and access; we work as your partner with the permissions you’re comfortable with. If you prefer to start fresh in a new structure, we can support that too." },
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
 title: "SEO Services",
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
 { question: "How long until I see SEO results?", answer: "Organic SEO usually takes 3–6 months to show meaningful improvements in rankings and traffic, depending on competition and site authority. We focus on sustainable, long-term growth rather than quick hacks that can backfire. We’ll set realistic expectations during strategy and share early wins (e.g. technical fixes, indexation) where possible. Ongoing reporting helps you see progress month over month." },
 { question: "Do you do local SEO?", answer: "Yes. We optimize for local search so you show up when people search for your products or services in their area. This includes optimizing your Google Business Profile, building local citations, managing reviews, and targeting location-based keywords. Local SEO is especially valuable for businesses with a physical presence or service areas. We’ll align local strategy with your overall SEO and business goals." },
 { question: "What's included in an SEO audit?", answer: "Our SEO audits typically include a technical crawl (site structure, speed, mobile, indexation), on-page analysis (titles, meta, content, internal links), keyword research and gap analysis, and a competitor overview. We deliver a prioritized action plan with quick wins and longer-term initiatives, plus timelines and rough effort so you can plan resources. Audits can be one-off or the starting point for an ongoing SEO engagement." },
 { question: "Do you write content for SEO?", answer: "Yes. We create SEO-focused content including optimized landing pages, blog posts, and category or service pages that target relevant keywords and satisfy search intent. Content is written to be useful for users and aligned with your brand, while following on-page best practices. We can also support content strategy, calendars, and updates to existing pages. If you have in-house writers, we can provide briefs and optimization guidance instead." },
 { question: "How do you handle link building?", answer: "We use white-hat link building only: quality guest posts, partnerships, and outreach for genuine, relevant backlinks. We never buy links or use link schemes, which can lead to penalties. Strategy depends on your niche and goals; we’ll outline a plan that fits your brand and risk tolerance. We focus on links that actually help authority and relevance rather than volume alone." },
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
 title: "Social Media Marketing",
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
 { question: "Which social media platforms do you manage?", answer: "We manage Facebook, Instagram, LinkedIn, Twitter/X, and other platforms depending on where your audience is. We focus on the channels that matter most for your goals - e.g. B2B often leans on LinkedIn; B2C may prioritize Instagram or Facebook. We can start with one or two platforms and expand, or run a coordinated presence across several. Strategy and content are tailored per platform so each channel feels native and effective." },
 { question: "Do you create content for our social channels?", answer: "Yes. We create posts, visuals, and copy that align with your brand voice and goals. This can include static graphics, short-form video ideas, captions, and hashtag strategy. We use your brand guidelines and assets where possible and can suggest or coordinate with designers for custom creative. Content is planned in a calendar so you see what’s going out and when, and you can review and approve before publishing." },
 { question: "How often do you post on social media?", answer: "Posting frequency is tailored to each platform and your goals. Typically we aim for 3–7 posts per week per channel, with the exact mix depending on the platform (e.g. LinkedIn might be fewer, Instagram or TikTok more). We balance consistency with quality and avoid over-posting. We’ll propose a cadence during strategy and adjust based on engagement and capacity." },
 { question: "Do you run paid social ads (Meta, LinkedIn, etc.)?", answer: "Yes. We manage paid social campaigns on Meta (Facebook and Instagram), LinkedIn, and other networks to complement organic content and drive leads or sales. We handle targeting, creative, budgets, and optimization, and we align paid with your overall marketing and attribution setup. Reporting includes key metrics and ROI so you see how paid social contributes to your goals." },
 { question: "What metrics do you report for social media?", answer: "We report on metrics that matter for your goals: engagement rate, reach, impressions, follower growth, clicks, and conversion-related metrics where tracking is in place. We customize reports to your KPIs and can include competitive or benchmark context. Reports are usually monthly with a clear summary and recommendations. We’ll agree on the right level of detail and format (e.g. dashboard link vs. PDF) for your team." },
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
 title: "Graphic Design Services",
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
 { question: "What file formats do you deliver for design work?", answer: "We deliver all standard formats you’re likely to need: PNG, JPG, SVG, PDF, and source files (e.g. Figma, AI, PSD) as agreed. We’ll confirm formats and resolutions (e.g. for web vs. print) at the start of the project so you have everything for your website, social, ads, and print. If you need something specific (e.g. animated GIF, Lottie, or print-ready CMYK), we’ll include that in the scope." },
 { question: "Do you do video and motion graphics?", answer: "Yes. We offer video editing and motion graphics for social media, ads, and marketing. This can include short promotional clips, social reels, or animated explainers. Scope and length affect timeline and cost; we’ll outline options when you share your goals. We can work from your raw footage or stock, and we align with your brand so video feels consistent with the rest of your visuals." },
 { question: "How many revision rounds are included?", answer: "We typically include 2–3 rounds of revisions in the quoted price so you can refine designs without extra cost. Additional rounds can be added for a fee if needed. We clarify the number of rounds and what’s in scope (e.g. layout vs. copy changes) before starting so everyone is aligned. Our aim is to get to a result you’re happy with within the agreed scope." },
 { question: "Do you create brand guidelines?", answer: "Yes. For logo and brand identity projects we deliver a style guide that covers logo usage, colors, typography, and tone so your team and partners can keep the brand consistent. The guide can be a PDF or a simple document; we’ll tailor it to your size and needs. This helps when you brief other designers or use templates for social, ads, or internal materials." },
 { question: "What's the typical turnaround time for design projects?", answer: "Turnaround depends on the project. Simple graphics or one-off assets often ship in 2–3 days. Logos and full branding usually take 1–2 weeks to allow for concepts and revisions. Larger projects (e.g. full brand plus multiple applications) are scheduled in phases. We’ll give you a timeline and milestones at the start so you can plan launches and campaigns around delivery." },
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
 title: "Google Ads Management",
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
 { question: "What's a typical monthly budget for Google Ads?", answer: "We work with a range of budgets. We recommend a minimum that allows meaningful testing and learning (often in the low thousands per month for a single campaign type). We’ll propose a budget based on your goals, competition, and expected CPCs so you get the best return. We can start smaller and scale as results justify it, or plan a larger launch if you have clear targets and timeline." },
 { question: "Do you set up and verify conversion tracking?", answer: "Yes. We implement and verify conversion tracking (e.g. Google Ads conversion actions, GA4 events) so you can measure leads, sign-ups, or sales from your campaigns. Correct tracking is essential for optimization and ROI reporting. We’ll outline what we need (e.g. access to your site or tag manager) and confirm that conversions are firing correctly before scaling spend." },
 { question: "Which Google Ads types do you run?", answer: "We run Search, Display, YouTube, Shopping, and Performance Max campaigns depending on your goals and audience. Search is often the core for lead gen or direct response; Display and YouTube help with reach and retargeting; Shopping suits e-commerce. We choose the mix and structure based on your products, funnel, and budget, and we can add or pause campaign types as goals evolve." },
 { question: "How often do you optimize Google Ads campaigns?", answer: "We optimize continuously: adjusting keyword bids, ad copy, and landing pages based on performance data. You’ll get regular reports (weekly or monthly) and strategy calls so you’re up to date on changes and results. For larger accounts we may do more frequent checks; for smaller ones we still ensure nothing is left unoptimized. We’ll agree on the right rhythm for your account size and goals." },
 { question: "Do you need access to my Google Ads account?", answer: "Yes. We work as an agency partner with read/write access so we can manage campaigns, set up conversion tracking, and run optimizations. We’ll guide you through the secure setup (e.g. inviting our account as a manager) and we follow best practices so you stay in control. You can revoke access at any time and you retain full ownership of the account and data." },
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
 title: "Meta Ads Management",
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
 { question: "Do you need our Facebook/Instagram access?", answer: "We work with Meta Business Manager access so we can create and manage campaigns, audiences, and assets on your behalf. We'll guide you through secure access setup (e.g. adding our Business as a partner with the right roles) and, if you prefer, we can work in read-only or limited access first. We follow best practices so your accounts and data stay secure." },
 { question: "What objectives do you run?", answer: "We run awareness, traffic, leads, and sales campaigns depending on your funnel and goals. We'll align campaign objectives with your business outcomes - for example, lead gen with forms or landing pages, or sales with catalog and conversion events. We can also run consideration objectives (e.g. video views, engagement) when that fits your strategy. We'll recommend the right mix and how to measure success." },
 { question: "Do you create ad creative?", answer: "Yes. We design static images, carousels, and video ads that fit Meta's formats and best practices, or we can use and adapt your existing creative. We'll align with your brand guidelines and suggest A/B tests (e.g. different hooks, formats, or offers) to improve performance. If you need custom video or motion work, we can coordinate with our design partners so creative stays fresh and effective." },
 { question: "How do you target audiences?", answer: "We use a mix of targeting: interest-based and demographic targeting, lookalike audiences built from your customers or site visitors, custom audiences (e.g. email lists, website visitors, app users), and retargeting to bring back people who didn't convert. We'll structure campaigns and ad sets so we can learn and optimize, and we'll refine audiences over time based on performance and your goals." },
 { question: "What's the minimum ad spend?", answer: "We work with various budgets. We recommend a minimum that allows meaningful testing (often a few hundred to low thousands per month) so we can get statistically useful results before scaling. We'll be clear about what's realistic at your budget level, how we'll test and optimize, and when it makes sense to increase spend. Our goal is efficient use of every dollar." },
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

/** Get top-level service by slug (built-in fallback). Prefer services-server on the server. */
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
 return {
  label: subSlug === "seo" ? "Search Engine Optimization" : sub.label,
  href: `/services/digital-marketing/${subSlug}`,
 };
 });
 return { label: def.label, href: `/services/${slug}`, children };
 }
 return { label: def.label, href: `/services/${slug}` };
 });
 return items;
}

/** Flat list of all service pages (label + href) for footer "Other Pages" etc. */
export function getAllServicePagesForFooter(): { label: string; href: string }[] {
 const items: { label: string; href: string }[] = [];
 const navItems = getServicesNavItems();
 navItems.forEach((item) => {
 items.push({ label: item.label, href: item.href });
 item.children?.forEach((child) => {
 items.push({ label: child.label, href: child.href });
 });
 });
 return items;
}

/** Development service pages (all top-level except digital-marketing) for footer */
export function getDevelopmentServicesForFooter(): { label: string; href: string }[] {
 return TOP_LEVEL_SLUG_LIST.filter((slug) => slug !== "digital-marketing").map((slug) => {
 const def = TOP_LEVEL_SERVICES[slug];
 return { label: def.label, href: `/services/${slug}` };
 });
}

/** Digital marketing service pages (main + sub-pages) for footer */
export function getDigitalMarketingServicesForFooter(): { label: string; href: string }[] {
 const main = TOP_LEVEL_SERVICES["digital-marketing"];
 const items: { label: string; href: string }[] = [
 { label: main.label, href: "/services/digital-marketing" },
 ];
 DIGITAL_MARKETING_SUB_SLUG_LIST.forEach((subSlug) => {
 const sub = DIGITAL_MARKETING_SERVICES[subSlug];
 const label = subSlug === "seo" ? "Search Engine Optimization" : sub.label;
 items.push({ label, href: `/services/digital-marketing/${subSlug}` });
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
