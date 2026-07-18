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
 lead: "NexGen Developers is a collective of engineers, designers, and marketers helping startups and local brands ship work that stands out, and actually ships.",
 paragraphs: [
 "We partner on AI/ML, chatbots, web & app development, and digital marketing. Less noise, more craft: clear process, honest timelines, and products people enjoy using.",
 "Based in Baramulla, Jammu and Kashmir, we work with clients globally. You stay close to every milestone, from first brief to launch and beyond.",
 "Whether you need a full product build or a focused growth push, we tailor the stack and the plan to your goals, budget, and pace.",
 ],
 quote: "Build with intention. Launch with confidence. Grow with clarity.",
 meta: [
 { label: "Based in", value: "Baramulla, India" },
 { label: "Focus", value: "Build · Launch · Grow" },
 { label: "Model", value: "Collective studio" },
 { label: "Clients", value: "Startups & local brands" },
 ],
 highlights: [
 {
 title: "Product craft",
 text: "Interfaces and systems designed for clarity, not clutter. Every screen earns its place.",
 },
 {
 title: "Honest delivery",
 text: "Visible progress, real timelines, and updates you can plan around. No black-box sprints.",
 },
 {
 title: "Growth mindset",
 text: "We don’t stop at launch. Measure, learn, and compound what already works for your brand.",
 },
 ],
};

export const aboutCapabilities = [
 {
 id: "web",
 title: "Web & App Development",
 summary: "Sites and products built to scale.",
 detail:
 "Landing pages to full applications, clean architecture, fast performance, and interfaces people actually enjoy.",
 accent: "from-teal-500/20 to-transparent",
 icon: Code2,
 },
 {
 id: "ai",
 title: "AI & Machine Learning",
 summary: "Automation without the hype.",
 detail:
 "Practical models and pipelines that fit your workflow, save time, surface decisions, stay measurable.",
 accent: "from-white/10 to-transparent",
 icon: BrainCircuit,
 },
 {
 id: "chatbots",
 title: "Chatbot Development",
 summary: "Conversations that convert.",
 detail:
 "Assistants for sales, support, and ops, trained on your context, deployed where users already are.",
 accent: "from-teal-400/15 to-transparent",
 icon: Bot,
 },
 {
 id: "marketing",
 title: "Digital Marketing",
 summary: "Presence that compounds.",
 detail:
 "SEO, campaigns, and content systems designed to grow traffic and trust, measured and iterated.",
 accent: "from-white/10 to-transparent",
 icon: Megaphone,
 },
];

export const aboutPillars = [
 {
 number: "01",
 title: "Expert team",
 description:
 "Seasoned talent across product, engineering, and growth, the same people who plan also ship.",
 icon: Users,
 },
 {
 number: "02",
 title: "Full-stack delivery",
 description:
 "Strategy to launch: frontend, backend, infrastructure, and ongoing care under one roof.",
 icon: Layers,
 },
 {
 number: "03",
 title: "Clear pricing",
 description:
 "Project, hourly, or retainer, flexible models that respect scope and budget without surprises.",
 icon: Wallet,
 },
 {
 number: "04",
 title: "Fast cycles",
 description:
 "Tight loops and visible progress. You always know what’s done, what’s next, and why.",
 icon: Rocket,
 },
];

export const aboutValues = [
 {
 title: "Innovation",
 description: "We adopt what works and skip the theater, new tech only when it earns its place.",
 icon: Lightbulb,
 },
 {
 title: "Excellence",
 description: "Quality that holds up under real traffic, real users, and real deadlines.",
 icon: Award,
 },
 {
 title: "Collaboration",
 description: "You’re in the room for every important call. No black-box handoffs.",
 icon: Users,
 },
 {
 title: "Growth",
 description: "We build systems that scale with the business, not just the launch week.",
 icon: TrendingUp,
 },
];

export const aboutApproach = [
 {
 step: "01",
 title: "Discover",
 text: "Goals, constraints, and success metrics, aligned before a line of code.",
 detail: "Workshops, audits, and a shared definition of done so the build starts with clarity.",
 },
 {
 step: "02",
 title: "Design",
 text: "Structure, flows, and interfaces shaped for clarity and conversion.",
 detail: "Wireframes to polished UI, reviewed with you before engineering picks up speed.",
 },
 {
 step: "03",
 title: "Build",
 text: "Agile sprints, regular demos, and transparent updates along the way.",
 detail: "Ship in slices you can see and click. Feedback lands while it’s still cheap to change.",
 },
 {
 step: "04",
 title: "Launch & grow",
 text: "Ship, measure, iterate, then keep compounding what works.",
 detail: "Go-live support, analytics, and a plan for the next win, not a one-and-done handoff.",
 },
];

/** Quiet metrics shown inside Approach, not a separate section. */
export const aboutApproachMetrics = [
 { value: "50+", label: "Projects delivered" },
 { value: "30+", label: "Happy clients" },
 { value: "98%", label: "Satisfaction" },
 { value: "12+", label: "Countries" },
];

export const pricingOptions = [
 {
 title: "Project-Based",
 description: "Fixed price for complete projects",
 features: ["Clear scope & timeline", "One-time payment", "Perfect for specific needs"],
 },
 {
 title: "Hourly Rate",
 description: "Pay for actual time worked",
 features: ["Flexible scope", "Transparent billing", "Ideal for ongoing work"],
 },
 {
 title: "Monthly Retainer",
 description: "Dedicated support & maintenance",
 features: ["Priority support", "Regular updates", "Long-term partnership"],
 },
];

export const stats = [
 { value: "2+", label: "Years of Excellence" },
 { value: "50+", label: "Projects Completed" },
 { value: "9", label: "Team Members" },
];
