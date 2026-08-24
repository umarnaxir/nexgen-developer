import {
  Award,
  Bot,
  BrainCircuit,
  Code2,
  Layers,
  Lightbulb,
  Megaphone,
  Rocket,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

/** All narrative / descriptive copy, rendered once in AboutStory. */
export const aboutStory = {
  eyebrow: "The studio",
  headline: "We build digital products that feel intentional.",
  lead: "NexGen Developers is a collective of engineers, designers, and marketers helping startups and local brands ship work that stands out, and actually ships. We are one studio for build, launch, and growth, not a chain of handoffs.",
  paragraphs: [
    "We partner on AI and ML, chatbots, web and app development, and digital marketing. Less noise, more craft: clear process, honest timelines, and products people enjoy using. If a tool does not earn its place in the product, it does not make the stack.",
    "Based in Baramulla, Jammu and Kashmir, we work with clients in India and globally. Collaboration is remote-friendly. You stay close to every milestone, from first brief to launch and the weeks after go-live.",
    "Whether you need a full product build or a focused growth push, we tailor the stack and the plan to your goals, budget, and pace. Website and app packages have starting prices. SEO, AI models, and mixed work are quoted after we understand the requirement.",
    "We write the brief with you, show working slices early, and stay through launch. Demos land while change is still cheap. The aim is a product that looks premium and holds up under real traffic, real users, and real deadlines.",
    "The same people who plan also ship. Product, engineering, and growth sit in one room, so nothing gets lost between a slide and a commit. You talk to the studio, not five vendors with five calendars.",
    "After launch we measure what shipped and compound what already converts. Analytics, iteration, and a plan for the next win, not a one-and-done handoff. That is how local brands and startups stay with us.",
  ],
  quote: "Build with intention. Launch with confidence. Grow with clarity.",
  meta: [
    { label: "Based in", value: "Baramulla, India" },
    { label: "Focus", value: "Build, launch, grow" },
    { label: "Model", value: "Collective studio" },
    { label: "Clients", value: "Startups and local brands" },
  ],
  highlights: [
    {
      title: "Product craft",
      text: "Interfaces and systems designed for clarity, not clutter. Every screen earns its place, and the stack stays maintainable after launch.",
    },
    {
      title: "Honest delivery",
      text: "Visible progress, real timelines, and updates you can plan around. No black-box sprints, no surprise scope at the eleventh hour.",
    },
    {
      title: "Growth mindset",
      text: "We do not stop at launch. Measure, learn, and compound what already works for your brand, from SEO to product iteration.",
    },
  ],
};

export const aboutCapabilities = [
  {
    id: "web",
    title: "Web and app development",
    summary: "Sites and products built to scale.",
    detail:
      "From marketing sites to full applications: clean architecture, fast performance, and interfaces people actually enjoy. We handle frontend, backend, CMS, and launch.",
    points: ["Custom UI and UX", "CMS and admin", "Speed and SEO basics"],
    icon: Code2,
  },
  {
    id: "ai",
    title: "AI and machine learning",
    summary: "Automation without the hype.",
    detail:
      "Practical models and pipelines that fit your workflow. We save time, surface decisions, and keep results measurable. Pricing is quoted to the requirement, not a fixed menu.",
    points: ["Workflow automation", "Custom model fit", "Measurable outcomes"],
    icon: BrainCircuit,
  },
  {
    id: "chatbots",
    title: "Chatbot development",
    summary: "Conversations that convert.",
    detail:
      "Assistants for sales, support, and ops, trained on your context and deployed where users already are: site, WhatsApp, or product.",
    points: ["Sales and support bots", "Your knowledge base", "Channel deployment"],
    icon: Bot,
  },
  {
    id: "marketing",
    title: "Digital marketing",
    summary: "Presence that compounds.",
    detail:
      "SEO, campaigns, and content systems designed to grow traffic and trust. We measure, iterate, and keep the brief honest. Scopes like SEO and ads are quoted after we see the requirement.",
    points: ["SEO and content", "Campaigns and ads", "Analytics and iteration"],
    icon: Megaphone,
  },
];

export const aboutPillars = [
  {
    number: "01",
    title: "Expert team",
    description:
      "Seasoned talent across product, engineering, and growth. The same people who plan also ship, so nothing gets lost between a slide and a commit.",
    icon: Users,
  },
  {
    number: "02",
    title: "Full-stack delivery",
    description:
      "Strategy to launch: frontend, backend, infrastructure, and ongoing care under one roof. You talk to one studio, not five vendors.",
    icon: Layers,
  },
  {
    number: "03",
    title: "Clear pricing",
    description:
      "Website and app packages start from listed prices. SEO, AI models, and mixed work are quoted from the brief. No surprises after kickoff.",
    icon: Wallet,
  },
  {
    number: "04",
    title: "Fast cycles",
    description:
      "Tight loops and visible progress. You always know what is done, what is next, and why. Demos land while change is still cheap.",
    icon: Rocket,
  },
];

export const aboutValues = [
  {
    title: "Innovation",
    description: "We adopt what works and skip the theater. New tech only when it earns its place.",
    detail: "Practical bets over hype. Tools earn a seat by making the product faster, clearer, or more reliable.",
    points: ["Right tool, not shiny tool", "Proven patterns first", "Experiment with intent"],
    icon: Lightbulb,
  },
  {
    title: "Excellence",
    description: "Quality that holds up under real traffic, real users, and real deadlines.",
    detail: "Craft shows in the details users feel and the systems that stay calm when load spikes.",
    points: ["Performance as default", "Accessible by design", "Ship with pride"],
    icon: Award,
  },
  {
    title: "Collaboration",
    description: "You are in the room for every important call. No black-box handoffs.",
    detail: "Shared context, visible progress, and decisions you can follow without chasing updates.",
    points: ["Transparent updates", "Shared decisions", "One team mindset"],
    icon: Users,
  },
  {
    title: "Growth",
    description: "We build systems that scale with the business, not just the launch week.",
    detail: "Architecture and UX that leave room for the next feature, market, and milestone.",
    points: ["Scalable foundations", "Measure what matters", "Iterate after launch"],
    icon: TrendingUp,
  },
  {
    title: "Clarity",
    description: "Plain language, honest timelines, and decisions you can see coming.",
    detail: "No fog between brief and build. You always know where things stand and why.",
    points: ["Clear scope", "Honest estimates", "Visible milestones"],
    icon: Layers,
  },
];

export const aboutApproach = [
  {
    step: "01",
    title: "Discover",
    text: "Goals, constraints, and success metrics, aligned before a line of code.",
    detail: "Workshops, audits, and a shared definition of done so the build starts with clarity.",
    outcomes: ["Scope and roadmap", "Success metrics", "Technical audit"],
  },
  {
    step: "02",
    title: "Design",
    text: "Structure, flows, and interfaces shaped for clarity and conversion.",
    detail: "Wireframes to polished UI, reviewed with you before engineering picks up speed.",
    outcomes: ["UX flows", "UI system", "Prototype review"],
  },
  {
    step: "03",
    title: "Build",
    text: "Agile sprints, regular demos, and transparent updates along the way.",
    detail: "Ship in slices you can see and click. Feedback lands while it is still cheap to change.",
    outcomes: ["Working slices", "Weekly demos", "QA and polish"],
  },
  {
    step: "04",
    title: "Launch",
    text: "Go live with support, checks, and a calm handoff into production.",
    detail: "Deploy, monitor, and stay close through the first days after release.",
    outcomes: ["Production launch", "QA sign-off", "Go-live support"],
  },
  {
    step: "05",
    title: "Grow",
    text: "Measure what shipped, then compound the work that already converts.",
    detail: "Analytics, iteration, and a plan for the next win, not a one-and-done handoff.",
    outcomes: ["Analytics setup", "Iteration loop", "Growth plan"],
  },
];

/** Quiet metrics shown inside Approach, not a separate section. */
export const aboutApproachMetrics = [
  { value: "50+", label: "Projects delivered" },
  { value: "30+", label: "Happy clients" },
  { value: "98%", label: "Satisfaction" },
  { value: "12+", label: "Countries" },
];

export const aboutFaqs = [
  {
    question: "Who is NexGen Developers?",
    answer:
      "We are a collective of engineers, designers, and marketers helping startups and local brands ship AI, chatbots, web and apps, and growth campaigns, with clear process and craft-focused delivery.",
  },
  {
    question: "Where are you based, and do you work remotely?",
    answer:
      "We are based in Baramulla, Jammu and Kashmir, India, and work with clients globally. Collaboration is remote-friendly with regular updates across time zones.",
  },
  {
    question: "What kinds of projects do you take on?",
    answer:
      "From landing pages and product builds to AI tools, chatbots, and digital marketing. If it helps you build, launch, or grow, we can scope it and ship it.",
  },
  {
    question: "How is pricing decided?",
    answer:
      "Website and app packages have starting prices on the pricing page. SEO, AI models, chatbots, design, and mixed work are not a fixed rate card. We quote after a short call once the requirement is clear.",
  },
  {
    question: "How do engagements usually start?",
    answer:
      "You share goals and constraints, we align on scope and success metrics, then move through discover, design, build, and launch with visible milestones along the way.",
  },
  {
    question: "How can I get in touch?",
    answer:
      "Use the contact page or schedule a meeting from the site. We will reply with next steps, timeline options, and a clear proposal before any work begins.",
  },
];

export const pricingOptions = [
  {
    title: "Project-Based",
    description: "Fixed price for complete projects",
    features: ["Clear scope and timeline", "One-time payment", "Perfect for specific needs"],
  },
  {
    title: "Hourly Rate",
    description: "Pay for actual time worked",
    features: ["Flexible scope", "Transparent billing", "Ideal for ongoing work"],
  },
  {
    title: "Monthly Retainer",
    description: "Dedicated support and maintenance",
    features: ["Priority support", "Regular updates", "Long-term partnership"],
  },
];

export const stats = [
  { value: "2+", label: "Years of Excellence" },
  { value: "50+", label: "Projects Completed" },
  { value: "9", label: "Team Members" },
];
