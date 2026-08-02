// ─── Company Knowledge Base ─────────────────────────────────
// Central source of truth for the AI chatbot's knowledge.
// The chatbot retrieves answers from this data — no hardcoded
// responses inside components.

export const companyData = {
  name: "NexGen Developers",
  tagline: "Build · Launch · Grow",
  about:
    "NexGen Developers is a collective of engineers, designers, and marketers helping startups and local brands ship work that stands out. We partner on AI/ML, chatbots, web & app development, and digital marketing — less noise, more craft: clear process, honest timelines, and products people enjoy using.",
  founded: "2023",
  location: "Baramulla, Jammu & Kashmir, India",
  model: "Collective studio",
  teamSize: "15+ members",
  clients: "Startups & local brands",
  workModel: "Remote-friendly, global clients",

  mission:
    "To empower businesses with intelligent, scalable, and beautifully crafted digital products that drive real growth.",
  vision:
    "To become the go-to technology partner for startups and brands looking to build, launch, and grow with clarity and confidence.",

  values: [
    {
      title: "Innovation",
      description: "We adopt what works and skip the theater — new tech only when it earns its place.",
    },
    {
      title: "Excellence",
      description: "Quality that holds up under real traffic, real users, and real deadlines.",
    },
    {
      title: "Collaboration",
      description: "You're in the room for every important call. No black-box handoffs.",
    },
    {
      title: "Growth",
      description: "We build systems that scale with the business, not just the launch week.",
    },
    {
      title: "Clarity",
      description: "Plain language, honest timelines, and decisions you can see coming.",
    },
  ],

  services: [
    {
      title: "Website Development",
      description:
        "Fast, responsive websites engineered for growth, conversion, and long-term performance.",
      highlights: ["SEO Ready", "Mobile First", "Fast Loading", "Secure Build"],
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    },
    {
      title: "App Development",
      description:
        "Mobile and web apps built to scale with your business, users, and product roadmap.",
      highlights: ["Cross Platform", "Scalable", "Offline Support", "Push Alerts"],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    },
    {
      title: "AI & ML Solutions",
      description:
        "Intelligent systems that automate workflows, analyze data, and accelerate decisions.",
      highlights: ["Automation", "Smart Insights", "Data Driven", "Custom Models"],
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "LangChain"],
    },
    {
      title: "Chatbot Development",
      description:
        "Conversational AI that supports customers around the clock with natural, helpful responses.",
      highlights: ["24/7 Support", "Multi-channel", "NLP Powered", "Easy Integration"],
      technologies: ["OpenAI", "Dialogflow", "Rasa", "LangChain", "WebSocket"],
    },
    {
      title: "Digital Marketing",
      description:
        "Strategies that amplify visibility, generate qualified leads, and grow your brand online.",
      highlights: ["Lead Growth", "Brand Reach", "Analytics Ready", "Paid Campaigns"],
      technologies: ["Google Ads", "Meta Ads", "SEO Tools", "Analytics", "Social Media"],
    },
    {
      title: "Deployment & DevOps",
      description:
        "Reliable infrastructure, CI/CD pipelines, and cloud deployments that keep products shipping.",
      highlights: ["Zero Downtime", "Cloud Native", "Auto Scaling", "CI/CD Ready"],
      technologies: ["Docker", "Kubernetes", "AWS", "Vercel", "GitHub Actions"],
    },
    {
      title: "UI/UX Design",
      description:
        "Interfaces designed for clarity, conversion, and delightful user experiences.",
      highlights: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      technologies: ["Figma", "Adobe XD", "Framer", "Tailwind CSS"],
    },
    {
      title: "Maintenance & Support",
      description:
        "Ongoing care, updates, and performance monitoring to keep your products running smoothly.",
      highlights: ["24/7 Monitoring", "Bug Fixes", "Performance Optimization", "Security Patches"],
      technologies: ["Monitoring Tools", "CI/CD", "Cloud Infrastructure"],
    },
  ],

  technologies: {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    backend: ["Node.js", "Express.js", "NestJS", "Python", "FastAPI", "Django"],
    mobile: ["React Native", "Flutter", "Swift", "Kotlin"],
    ai_ml: ["Python", "TensorFlow", "PyTorch", "OpenAI API", "LangChain", "Hugging Face", "OpenCV", "Manim"],
    cloud: ["AWS", "Google Cloud", "Azure", "Vercel", "DigitalOcean"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    devops: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "CI/CD Pipelines"],
  },

  portfolio: [
    {
      title: "Exceptional IAS Academy",
      description: "A coaching platform built to convert visitors into enrolled students.",
      category: "Education",
      technologies: ["Next.js", "TypeScript", "NestJS", "MongoDB"],
      link: "https://exceptionaliasacademy.vercel.app/",
    },
    {
      title: "ShoesHub Poonch",
      description: "A refined e-commerce experience for a modern footwear brand.",
      category: "E-Commerce",
      technologies: ["Next.js", "TypeScript", "NestJS", "PostgreSQL"],
      link: "https://shoeshubpoonch.vercel.app/",
    },
    {
      title: "FitSpace Gym",
      description: "An energetic digital presence that drives memberships.",
      category: "Fitness",
      technologies: ["Next.js", "TypeScript", "Java", "MongoDB"],
      link: "https://fitspacegym.vercel.app/",
    },
    {
      title: "Citadel Library",
      description: "A calm, structured website for a premium study space.",
      category: "Library",
      technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      link: "https://citadellibrary.vercel.app/",
    },
    {
      title: "PlaceHub",
      description: "Buy, rent, and sell verified properties with confidence.",
      category: "Real Estate",
      technologies: ["Next.js", "TypeScript", "NestJS", "MongoDB"],
      link: "https://findyourperfectplace.vercel.app/",
    },
    {
      title: "Dr. Jibran Bashir",
      description: "A professional medical website with online appointment booking.",
      category: "Medical",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      link: "https://drjibranbashir.com",
    },
    {
      title: "Hotel Sea View",
      description: "A modern hotel website with rooms, gallery, and booking.",
      category: "Hospitality",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      link: "https://thehotelseaview.in",
    },
    {
      title: "Kindness Towards Humanity Foundation",
      description: "A nonprofit website highlighting mission, team, and donation support.",
      category: "Nonprofit",
      technologies: ["Next.js", "React", "TypeScript", "Payment Gateway"],
      link: "https://kindnesstowardshumanity.in",
    },
    {
      title: "Code2Concept",
      description: "AI-powered platform that converts code and algorithms into animated educational videos.",
      category: "AI & Education",
      technologies: ["Python", "Manim", "FastAPI", "React", "OpenAI API"],
    },
    {
      title: "EyeAmHere",
      description: "AI-powered smart attendance system using Computer Vision and face recognition.",
      category: "AI & Education",
      technologies: ["Python", "OpenCV", "Computer Vision", "FastAPI", "React"],
    },
    {
      title: "Saibbyweb Office Management Dashboard",
      description: "Web-based system for managing employees, attendance, and documents.",
      category: "Management System",
      technologies: ["Next.js", "React", "TypeScript", "Authentication", "Dashboard"],
      link: "https://sw-office.vercel.app",
    },
  ],

  pricing: {
    website: [
      {
        plan: "Essential",
        price: "$180",
        bestFor: "Small businesses, local brands, first serious online presence",
        features: [
          "Up to 4 pages",
          "Mobile-responsive, modern layout",
          "Contact form with email notification",
          "Basic on-page SEO",
          "Speed-optimized build",
          "Delivery: 5-6 working days",
        ],
      },
      {
        plan: "Growth",
        price: "$360",
        bestFor: "Growing businesses, service providers, startups",
        popular: true,
        features: [
          "Up to 8 pages",
          "Semi-custom UI tailored to brand",
          "Advanced lead capture forms",
          "Google Analytics setup",
          "Structured SEO",
          "Performance optimization",
          "Delivery: 9-12 working days",
        ],
      },
      {
        plan: "Premium",
        price: "$600",
        bestFor: "Serious brands, funded startups, long-term businesses",
        features: [
          "Fully custom UI/UX (no templates)",
          "CMS / Admin panel",
          "Blog / content publishing system",
          "Payment gateway integration",
          "Core Web Vitals optimization",
          "Priority support",
          "Delivery: 14-18 working days",
        ],
      },
      {
        plan: "Enterprise",
        price: "Custom",
        bestFor: "Large-scale businesses, complex integrations",
        features: [
          "Multi-platform integration (CRM, ERP)",
          "Custom dashboard & analytics",
          "Advanced security & compliance",
          "Dedicated project manager",
          "White-glove support & maintenance",
          "Custom SLA & response times",
        ],
      },
    ],
    app: [
      {
        plan: "Starter",
        price: "$300",
        bestFor: "MVPs, small businesses, simple apps",
        features: [
          "Up to 5 screens",
          "Cross-platform (React Native / Flutter)",
          "Basic UI/UX, responsive layout",
          "Push notifications",
          "App store listing support",
          "Delivery: 6-8 working days",
        ],
      },
      {
        plan: "Growth",
        price: "$600",
        bestFor: "Startups, product companies",
        popular: true,
        features: [
          "Up to 12 screens",
          "Auth (login, signup, social login)",
          "Backend API integration",
          "Payment gateway",
          "Analytics & crash reporting",
          "Custom UI/UX design",
          "Delivery: 10-14 working days",
        ],
      },
      {
        plan: "Premium",
        price: "$1,080",
        bestFor: "Funded startups, marketplaces",
        features: [
          "Unlimited screens (within scope)",
          "Custom backend / admin panel",
          "Real-time features (chat, live updates)",
          "Advanced security & role-based access",
          "CI/CD & deployment support",
          "Delivery: 18-24 working days",
        ],
      },
      {
        plan: "Enterprise",
        price: "Custom",
        bestFor: "Multi-app ecosystems, complex integrations",
        features: [
          "Multi-platform (iOS, Android, Web, PWA)",
          "CRM / ERP integration",
          "White-label or multi-tenant support",
          "Dedicated project manager",
          "SLA & priority support",
        ],
      },
    ],
    other: [
      {
        plan: "Essential",
        price: "From $120",
        bestFor: "Single project: SEO audit, logo, chatbot, or small AI feature",
        features: [
          "One primary service",
          "Clear scope & deliverables",
          "Basic revisions",
          "Delivery: 5-7 working days",
        ],
      },
      {
        plan: "Growth",
        price: "From $300",
        bestFor: "Multiple services or ongoing work",
        popular: true,
        features: [
          "2-3 services or ongoing retainer",
          "Strategy & reporting",
          "Multiple revisions",
          "Delivery: 10-14 working days",
        ],
      },
      {
        plan: "Premium",
        price: "Custom",
        bestFor: "Large campaigns, custom AI/ML",
        features: [
          "Custom scope",
          "Dedicated resource or team",
          "Unlimited revisions (within scope)",
          "Priority support",
        ],
      },
    ],
  },

  contact: {
    email: process.env.COMPANY_EMAIL || "workwithnexgen@gmail.com",
    phone: process.env.COMPANY_PHONE || "+916006161726",
    website: process.env.COMPANY_WEBSITE || "https://nexgendevelopers.in",
    address: "Baramulla, Jammu & Kashmir, India",
    social: {
      linkedin: "https://linkedin.com/company/nexgendevelopers",
      instagram: "https://instagram.com/nexgendevelopers",
      twitter: "https://twitter.com/nexgendevs",
    },
  },

  developmentProcess: [
    {
      step: "01",
      title: "Discover",
      description:
        "Goals, constraints, and success metrics — aligned before a line of code. Workshops, audits, and a shared definition of done.",
      outcomes: ["Scope & roadmap", "Success metrics", "Technical audit"],
    },
    {
      step: "02",
      title: "Design",
      description:
        "Structure, flows, and interfaces shaped for clarity and conversion. Wireframes to polished UI, reviewed with you before engineering starts.",
      outcomes: ["UX flows", "UI system", "Prototype review"],
    },
    {
      step: "03",
      title: "Build",
      description:
        "Agile sprints, regular demos, and transparent updates. Ship in slices you can see and click. Feedback lands while it's still cheap to change.",
      outcomes: ["Working slices", "Weekly demos", "QA & polish"],
    },
    {
      step: "04",
      title: "Launch & Grow",
      description:
        "Ship, measure, iterate, then keep compounding what works. Go-live support, analytics, and a plan for the next win.",
      outcomes: ["Production launch", "Analytics setup", "Growth plan"],
    },
  ],

  stats: [
    { value: "50+", label: "Projects Delivered" },
    { value: "30+", label: "Happy Clients" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "12+", label: "Countries Served" },
    { value: "15+", label: "Team Members" },
    { value: "2+", label: "Years of Excellence" },
  ],

  hiring: {
    culture:
      "We're a remote-friendly collective that values craft, clarity, and collaboration. We believe in building with intention and growing together.",
    perks: [
      "Remote-friendly work",
      "Flexible hours",
      "Learning & growth opportunities",
      "Work on real products with real impact",
      "Collaborative, no-ego culture",
    ],
    howToApply:
      "Send your resume and portfolio to our email or reach out via the contact page on our website. We'll get back to you within 48 hours.",
  },

  consultation: {
    process:
      "Book a free consultation through our website or email. We'll discuss your goals, explore solutions, and provide a clear proposal with timeline and pricing — no obligations.",
    benefits: [
      "Free initial consultation",
      "No-obligation proposal",
      "Clear timeline & pricing",
      "Expert advice on technology choices",
      "Custom solution recommendations",
    ],
  },

  faqs: [
    {
      question: "Who is NexGen Developers?",
      answer:
        "We're a collective of engineers, designers, and marketers helping startups and local brands ship AI, chatbots, web & apps, and growth campaigns — with clear process and craft-focused delivery.",
    },
    {
      question: "Where are you based, and do you work remotely?",
      answer:
        "We're based in Baramulla, Jammu & Kashmir, India, and work with clients globally. Collaboration is remote-friendly with regular updates across time zones.",
    },
    {
      question: "What services do you offer?",
      answer:
        "We offer website development, app development, AI & ML solutions, chatbot development, digital marketing, deployment & DevOps, UI/UX design, and ongoing maintenance & support.",
    },
    {
      question: "How much does a website cost?",
      answer:
        "Our website development starts at $180 for the Essential plan (up to 4 pages). Growth plan is $360, Premium is $600, and Enterprise is custom-priced. Each plan includes different levels of features and customization.",
    },
    {
      question: "How long does a project take?",
      answer:
        "Timelines vary by scope: Essential websites take 5-6 days, Growth 9-12 days, Premium 14-18 days. App projects range from 6-24 days depending on complexity. We provide clear timelines upfront.",
    },
    {
      question: "Do you build mobile apps?",
      answer:
        "Yes! We build cross-platform apps using React Native and Flutter, as well as native iOS (Swift) and Android (Kotlin) apps. Our app plans start at $300.",
    },
    {
      question: "Can you build AI solutions?",
      answer:
        "Absolutely! We specialize in AI & ML solutions including chatbots, computer vision, NLP, automation, and custom AI models. We use Python, TensorFlow, PyTorch, OpenAI API, and LangChain.",
    },
    {
      question: "How do engagements usually start?",
      answer:
        "You share goals and constraints, we align on scope and success metrics, then move through discover, design, build, and launch with visible milestones along the way.",
    },
    {
      question: "Do you offer maintenance and support?",
      answer:
        "Yes, we offer ongoing maintenance, support, performance monitoring, security patches, and updates. We can set up a monthly retainer for continuous care.",
    },
    {
      question: "How can I get in touch?",
      answer:
        "Email us at workwithnexgen@gmail.com, call +916006161726, or visit our website at nexgendevelopers.in. You can also book a free consultation directly from our contact page.",
    },
    {
      question: "What is your tech stack?",
      answer:
        "Frontend: React, Next.js, TypeScript, Tailwind CSS. Backend: Node.js, NestJS, Python, FastAPI. Mobile: React Native, Flutter. AI: TensorFlow, PyTorch, OpenAI. Cloud: AWS, GCP, Vercel. DevOps: Docker, Kubernetes, GitHub Actions.",
    },
    {
      question: "Do you offer free consultations?",
      answer:
        "Yes! We offer a free initial consultation where we discuss your goals, explore solutions, and provide a clear proposal with timeline and pricing — no obligations.",
    },
  ],
};

// ─── Serialized Context for System Prompt ───────────────────

/**
 * Serialize company data into a structured string for the
 * OpenAI system prompt. Keeps the context comprehensive but
 * concise enough to fit within token limits.
 */
export function getCompanyContext(): string {
  const d = companyData;

  return `
## Company Overview
- Name: ${d.name}
- Tagline: ${d.tagline}
- About: ${d.about}
- Founded: ${d.founded}
- Location: ${d.location}
- Team Size: ${d.teamSize}
- Work Model: ${d.workModel}
- Mission: ${d.mission}
- Vision: ${d.vision}

## Core Values
${d.values.map(v => `- **${v.title}**: ${v.description}`).join('\n')}

## Services
${d.services.map(s => `### ${s.title}\n${s.description}\n- Highlights: ${s.highlights.join(', ')}\n- Technologies: ${s.technologies.join(', ')}`).join('\n\n')}

## Technology Stack
- Frontend: ${d.technologies.frontend.join(', ')}
- Backend: ${d.technologies.backend.join(', ')}
- Mobile: ${d.technologies.mobile.join(', ')}
- AI/ML: ${d.technologies.ai_ml.join(', ')}
- Cloud: ${d.technologies.cloud.join(', ')}
- Databases: ${d.technologies.databases.join(', ')}
- DevOps: ${d.technologies.devops.join(', ')}

## Portfolio (Selected Projects)
${d.portfolio.map(p => `- **${p.title}** (${p.category}): ${p.description} | Tech: ${p.technologies.join(', ')}${p.link ? ` | ${p.link}` : ''}`).join('\n')}

## Pricing

### Website Development
${d.pricing.website.map(p => `- **${p.plan}**: ${p.price} — ${p.bestFor}. Features: ${p.features.join('; ')}`).join('\n')}

### App Development
${d.pricing.app.map(p => `- **${p.plan}**: ${p.price} — ${p.bestFor}. Features: ${p.features.join('; ')}`).join('\n')}

### Other Services (AI, Chatbot, SEO, Design)
${d.pricing.other.map(p => `- **${p.plan}**: ${p.price} — ${p.bestFor}. Features: ${p.features.join('; ')}`).join('\n')}

## Contact Information
- Email: ${d.contact.email}
- Phone: ${d.contact.phone}
- Website: ${d.contact.website}
- Address: ${d.contact.address}

## Development Process
${d.developmentProcess.map(s => `${s.step}. **${s.title}**: ${s.description}`).join('\n')}

## Key Stats
${d.stats.map(s => `- ${s.value} ${s.label}`).join('\n')}

## Hiring & Careers
- Culture: ${d.hiring.culture}
- Perks: ${d.hiring.perks.join(', ')}
- How to Apply: ${d.hiring.howToApply}

## Consultation
- ${d.consultation.process}
- Benefits: ${d.consultation.benefits.join(', ')}

## FAQs
${d.faqs.map(f => `**Q: ${f.question}**\nA: ${f.answer}`).join('\n\n')}
`.trim();
}
