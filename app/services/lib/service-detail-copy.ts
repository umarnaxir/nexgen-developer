export type ServiceStat = { value: string; label: string };
export type ServicePillar = { title: string; text: string };
export type ServiceOffering = { title: string; description: string };
export type ServiceUseCase = { title: string; description: string };
export type ServiceProcessStep = {
  title: string;
  description: string;
  meta?: string;
};
export type ServiceFaq = { question: string; answer: string };

export type ServiceDetailCopy = {
  lead: string;
  intro: string[];
  pillars: ServicePillar[];
  stats: ServiceStat[];
  offerings: ServiceOffering[];
  useCases: ServiceUseCase[];
  process: ServiceProcessStep[];
  extraFaqs: ServiceFaq[];
};

export const SERVICE_DETAIL_COPY: Record<string, ServiceDetailCopy> = {
  "website-development": {
    lead: "Conversion-ready websites and web apps — designed, engineered, and launched as a system, not a brochure.",
    intro: [
      "A website should do more than exist online. It should load quickly, explain your offer clearly, capture demand, and stay maintainable as you add pages, products, and integrations. We plan and build websites as full systems: information architecture, interface, backend, CMS, analytics, and the operational pieces that keep marketing and sales moving — the same bar we describe in our guide to [professional websites for businesses in Kashmir](/blogs/professional-website-for-business-kashmir).",
      "Most engagements start with how people actually arrive, browse, and convert. We map that journey, then implement it in a modern stack — typically [Next.js](https://nextjs.org) and [React](https://react.dev) on the front, Node.js or Python on the API, and a database chosen for how you will query and grow the data. [SEO](/services/search-engine-optimization), accessibility, and Core Web Vitals are designed in, not patched after launch.",
      "You leave with a documented codebase, a launch checklist (redirects, tracking, search console, environments), and a site your team can update without treating us as a bottleneck. Budget ranges are in [website development cost in Kashmir](/blogs/website-development-cost-kashmir); implementation detail is in [web development best practices](/blogs/best-practices-for-web-development). When you do want us on retainer, the same team that shipped it can keep iterating through [maintenance and support](/services/maintenance-support).",
    ],
    pillars: [
      {
        title: "Product-grade engineering",
        text: "Component architecture, typed APIs, and a CMS or admin path so content and growth work do not require a developer for every change.",
      },
      {
        title: "Performance as a feature",
        text: "Image strategy, caching, and render paths tuned for Core Web Vitals — because speed is ranking, bounce rate, and paid-traffic efficiency.",
      },
      {
        title: "Launch that actually sticks",
        text: "Redirects, analytics, SEO metadata, staging, and a handover your team can run — not a zip file and a hope.",
      },
    ],
    stats: [
      { value: "4–12", label: "Typical weeks to launch" },
      { value: "90+", label: "Lighthouse performance target" },
      { value: "100%", label: "Responsive, accessible builds" },
      { value: "SEO", label: "Structure included from day one" },
    ],
    offerings: [
      {
        title: "Marketing and corporate sites",
        description:
          "Positioning-led websites with clear IA, service pages, case studies, and lead capture. Built so content teams can publish without breaking layout or SEO.",
      },
      {
        title: "Web applications and portals",
        description:
          "Authenticated dashboards, customer portals, and internal tools with roles, audit-friendly data models, and APIs that other systems can trust. When the product is not a marketing site, see [custom software development in Kashmir](/blogs/custom-software-development-company-kashmir).",
      },
      {
        title: "E-commerce and checkout",
        description:
          "Catalogs, carts, and payments (Stripe, PayPal, and regional gateways) with inventory, tax, and fulfilment hooks designed around how you actually sell. Regional context is in [starting an e-commerce business in Jammu & Kashmir](/blogs/ecommerce-business-jammu-kashmir).",
      },
      {
        title: "CMS and content operations",
        description:
          "Headless or integrated CMS so marketing can ship pages, blogs, and landing variants while design and performance stay under control.",
      },
      {
        title: "APIs and third-party integrations",
        description:
          "REST or GraphQL APIs, plus CRM, billing, booking, maps, and automation connections with error handling and monitoring — not fragile one-off scripts.",
      },
      {
        title: "Redesigns and platform migrations",
        description:
          "Move off a dated stack or page builder without losing rankings or content. We plan cutover, redirects, and a rollback path before we touch production DNS.",
      },
    ],
    useCases: [
      {
        title: "Startups and MVPs",
        description: "A credible, fast site that can take waitlists, demos, and payments while the product is still moving.",
      },
      {
        title: "SaaS marketing and app shells",
        description: "Public site plus authenticated product UI, docs, and billing surfaces that share one design system.",
      },
      {
        title: "E-commerce and marketplaces",
        description: "Merchandising, search, and checkout that hold up at campaign traffic — not just in a staging demo.",
      },
      {
        title: "Professional services",
        description: "Practice and agency sites that rank for services, route leads, and make expertise easy to scan.",
      },
      {
        title: "Enterprise portals",
        description: "Role-based access, integrations with existing identity and data, and a UI operations teams will actually use.",
      },
      {
        title: "Content and media",
        description: "High-volume publishing with performance, structured data, and editorial workflows that do not fight the CMS.",
      },
    ],
    process: [
      {
        title: "Discovery and success criteria",
        meta: "Week 1",
        description:
          "We align on audience, offers, must-have journeys, integrations, and what “done” means. You get a written scope, sitemap, and technical approach — including what we will explicitly not build in v1 so the launch date stays real.",
      },
      {
        title: "UX, content, and prototype",
        meta: "Weeks 2–3",
        description:
          "Wireframes and high-fidelity UI for the critical paths, plus content structure (headings, modules, CMS fields). You review in the browser, not in a slide deck, so decisions are about the actual product.",
      },
      {
        title: "Build in vertical slices",
        meta: "Weeks 3–8",
        description:
          "We ship working slices — layout, CMS, auth, payments — in short cycles with staging URLs. You see progress weekly. Stack choices stay boring on purpose: proven frameworks, clear folder structure, typed contracts.",
      },
      {
        title: "Quality, SEO, and hardening",
        meta: "Pre-launch",
        description:
          "QA across devices, accessibility checks, performance budgets, metadata and structured data, forms, and error states. We fix what users and crawlers will actually hit, not only the happy path.",
      },
      {
        title: "Launch and handover",
        meta: "Go-live",
        description:
          "DNS, SSL, redirects, analytics, Search Console, backups, and environment docs. We walk your team through publishing and the runbook so you are not dependent on a single person to change a headline.",
      },
      {
        title: "Iterate after real traffic",
        meta: "Optional",
        description:
          "Post-launch we tune conversion, speed, and SEO with real data. Many clients keep a monthly slice of engineering for landing pages, experiments, and the inevitable “can we also…” list.",
      },
    ],
    extraFaqs: [
      {
        question: "Will the site be editable by our marketing team?",
        answer:
          "Yes, when that is in scope. We typically add a CMS or structured content model so teams can update pages, blogs, and landing content without a deploy for every copy change. We train you on the workflow and set guardrails so layout and SEO fields stay intact. If you prefer a fully code-managed site, we can do that too — we will recommend based on how often you publish.",
      },
      {
        question: "How do you handle SEO during a redesign?",
        answer:
          "We inventory current URLs, rankings, and content before we change anything. The new IA includes a redirect map, preserved or improved metadata, and technical SEO (indexation, canonicals, structured data, Core Web Vitals). We launch with Search Console and analytics already verifying. The goal is to keep the equity you have and give new pages a clean structure to rank from.",
      },
      {
        question: "Can you work with our in-house designers or developers?",
        answer:
          "Yes. We often implement existing Figma systems, or pair with your engineers on APIs and DevOps. We agree on ownership, branching, and review so the project does not stall on “who touches what.” Documentation is written for the next person on your team, not only for us.",
      },
    ],
  },
  "app-development": {
    lead: "iOS and Android products with native feel, store-ready delivery, and a backend that can grow with your users.",
    intro: [
      "Mobile apps fail when they are treated as a thin skin over a [website](/services/website-development), or when two native teams drift out of sync. We design and build apps as products: navigation, empty states, permissions, offline behaviour, notifications, and the API contracts that keep the client honest. If the open question is still website vs app vs custom software, start with [that comparison](/blogs/website-vs-mobile-app-vs-custom-software).",
      "Cross-platform ([React Native](https://reactnative.dev) or [Flutter](https://flutter.dev)) is the default when you want one codebase, one release train, and consistent features on both stores. We go native (Swift/Kotlin) when the experience or hardware access genuinely needs it. Either way, we plan store listings, privacy, and review guidelines from the start — not the week you hoped to ship.",
      "After launch we stay on OS upgrades, crash reports, and the feature roadmap. An app is not done at 1.0; it is done when it is stable in the stores and you have a way to ship 1.1 without a fire drill. If you are still choosing platforms, start with [Android vs iOS](/blogs/android-vs-ios-app-development) and our notes on [app development cost in India](/blogs/mobile-app-development-cost-india).",
    ],
    pillars: [
      {
        title: "One product, two stores",
        text: "Shared business logic and UI systems with platform-native details where users notice — gestures, navigation, and store rules.",
      },
      {
        title: "Backend included",
        text: "Auth, data, push, and payments as real services with environments and monitoring, not a spreadsheet behind a screen.",
      },
      {
        title: "Store-ready from the start",
        text: "Icons, screenshots, privacy labels, and review checklists are part of the plan, so submission is a process, not a surprise.",
      },
    ],
    stats: [
      { value: "iOS+", label: "Android from one plan" },
      { value: "1", label: "Codebase when cross-platform fits" },
      { value: "4–16", label: "Weeks for a typical MVP" },
      { value: "Stores", label: "Submission support included" },
    ],
    offerings: [
      {
        title: "Consumer and marketplace apps",
        description:
          "Onboarding, feeds, search, wallets, and ratings with performance that still feels native on mid-range devices — not only on the latest flagship.",
      },
      {
        title: "B2B and field tools",
        description:
          "Offline-first flows, role-based access, and device hardware (camera, location, files) for teams that do not live on Wi-Fi.",
      },
      {
        title: "React Native and Flutter builds",
        description:
          "Shared UI and logic for iOS and Android, with native modules only where the platform requires them. Faster dual-store shipping without looking like a webview.",
      },
      {
        title: "Native Swift and Kotlin",
        description:
          "When you need the deepest platform integration or a highly specific UX, we build separately per OS with a shared API so the product still feels like one company.",
      },
      {
        title: "Push, payments, and live data",
        description:
          "Notifications, in-app purchases, subscriptions, and realtime sync designed around consent, receipts, and failure states — not demo-only happy paths.",
      },
      {
        title: "Store launch and iteration",
        description:
          "Listing assets, review responses, phased rollouts, and a cadence for OS compatibility so you are not stuck on an old runtime six months later.",
      },
    ],
    useCases: [
      { title: "Consumer products", description: "Retention-sensitive apps where onboarding, performance, and store ratings decide whether you get a second session." },
      { title: "On-demand and logistics", description: "Live status, maps, and reliable background behaviour for drivers, customers, and ops." },
      { title: "Health and wellness", description: "Sensitive data, permissions, and store policy handled as product requirements, not afterthoughts." },
      { title: "Fintech and wallets", description: "Auth, session security, and payment flows that can survive review and real-world edge cases." },
      { title: "Education", description: "Progress, media, and offline lessons that still sync when the student is back online." },
      { title: "Internal / enterprise", description: "MDM-friendly distribution, SSO, and tools that replace the spreadsheet-plus-WhatsApp stack." },
    ],
    process: [
      {
        title: "Product and platform strategy",
        meta: "Week 1",
        description:
          "We lock platforms, MVP journeys, analytics events, and “what we will not build yet.” Native vs cross-platform is a decision with cost, hiring, and UX consequences — we put that on paper before design polish.",
      },
      {
        title: "UX across device classes",
        meta: "Weeks 2–4",
        description:
          "Flows for small phones, notched devices, and tablets if needed. Empty states, permissions, and error copy are designed, because that is where reviews are born.",
      },
      {
        title: "App and API development",
        meta: "Sprints",
        description:
          "CI builds, staging backends, and feature flags. You test on TestFlight / internal tracks continuously. We keep the client thin and the API documented so a second client (web, admin) can follow.",
      },
      {
        title: "Hardening and store prep",
        meta: "Pre-submit",
        description:
          "Crash-free sessions, permission strings, privacy nutrition labels, screenshots, and guideline checks. We treat review as a release gate, not a lottery ticket.",
      },
      {
        title: "Launch and monitoring",
        meta: "Go-live",
        description:
          "Phased rollout where the stores allow it, crash and ANR watch, and a hot-fix path. Your team knows how to ship a build without us if needed.",
      },
      {
        title: "OS and feature cadence",
        meta: "Ongoing",
        description:
          "New OS versions, dependency upgrades, and the next slice of the roadmap. Apps rot in silence; a light retainer prevents that.",
      },
    ],
    extraFaqs: [
      {
        question: "Do you build the backend as well, or only the mobile client?",
        answer:
          "We can do either. Most products need auth, data, files, and push — we design those APIs with the app, not after. If you already have a backend, we consume it and will be explicit about gaps (pagination, error codes, webhooks) before we estimate the client.",
      },
      {
        question: "How do you handle app updates after the stores change policies?",
        answer:
          "Policy and OS changes are part of maintenance. We watch deprecations, bump SDKs on a planned cadence, and keep a buffer in retainers for compulsory store updates. Emergency-only relationships tend to cost more and ship later; a small ongoing plan is cheaper than a panic rebuild.",
      },
      {
        question: "Can you take over an existing React Native or Flutter app?",
        answer:
          "Yes. We audit the repo, native shells, CI, and store accounts, then propose a stabilize-then-feature plan. If the project is unmaintainable we will say so early, with options (incremental rehab vs rewrite) and the trade-offs of each.",
      },
    ],
  },
  "ai-ml": {
    lead: "Applied AI and machine learning that ships to production — with data, evaluation, and integration, not a slide deck of possibilities.",
    intro: [
      "Useful AI is a product decision: a job to be done, a data path, a quality bar, and a place in your existing software. We start there. Then we choose models, APIs, or custom training — often in [PyTorch](https://pytorch.org) or via documented LLM APIs such as [OpenAI](https://platform.openai.com/docs) — based on accuracy, latency, cost, and where your data is allowed to live.",
      "That can mean a retrieval-augmented assistant on your documents, a vision pipeline on factory or medical images, a forecast on operational data, or a recommendation layer in your [mobile app](/services/app-development). We build the boring pieces that make it real: pipelines, eval sets, fallbacks, human review, and monitoring when the model drifts.",
      "We will tell you when a rules engine or a well-prompted API beats a custom model. The goal is a measurable lift in time, cost, or quality — not an AI feature for the announcement. For a practical primer, read [getting started with AI/ML in your business](/blogs/getting-started-with-ai-ml-in-your-business) and our overview of [AI automation for businesses in India](/blogs/ai-automation-services-businesses-india).",
    ],
    pillars: [
      {
        title: "Outcome before algorithm",
        text: "We define the decision or task, the baseline, and the metric. Architecture follows that, whether it is an API, a fine-tune, or classical ML.",
      },
      {
        title: "Production, not notebooks",
        text: "Versioned data, eval harnesses, APIs or jobs, and a way to roll back. A model that cannot be operated is a demo.",
      },
      {
        title: "Fit your systems",
        text: "We attach to the CRMs, warehouses, and apps you already run, with auth and logging your security team can live with.",
      },
    ],
    stats: [
      { value: "PoC", label: "Often in weeks, not quarters" },
      { value: "APIs", label: "Or custom models — by fit" },
      { value: "Eval", label: "Quality gates before scale" },
      { value: "Ops", label: "Monitoring after deploy" },
    ],
    offerings: [
      {
        title: "Assistants on your knowledge",
        description:
          "RAG and tool-using agents grounded in your docs, tickets, or catalog — with citations, refusals, and handoff when the answer is not in the data.",
      },
      {
        title: "Document and language workflows",
        description:
          "Classification, extraction, summarization, and routing for email, PDFs, and chat. Built to be reviewed, not blindly trusted on day one.",
      },
      {
        title: "Computer vision",
        description:
          "Detection, OCR, and quality checks on images or video, with latency and privacy constraints treated as first-class requirements.",
      },
      {
        title: "Forecasting and scoring",
        description:
          "Demand, risk, churn, or lead scores with feature pipelines and a refresh cadence so the number on the dashboard is still true next quarter.",
      },
      {
        title: "Recommendations and ranking",
        description:
          "Personalized ranking for catalogs, content, or next-best-action, including cold-start behaviour so new items and users are not invisible.",
      },
      {
        title: "MLOps and model APIs",
        description:
          "Packaging, CI, canary deploys, and cost controls (especially for LLM calls) so usage cannot silently become a finance incident.",
      },
    ],
    useCases: [
      { title: "Operations automation", description: "Remove repetitive classification and data entry with a human in the loop where the cost of error is high." },
      { title: "Customer support", description: "Draft replies, route tickets, and surface the right article — measured on resolution, not vanity chat volume." },
      { title: "Product intelligence", description: "Search, recommendations, and in-app copilots that use your domain data, not generic internet text." },
      { title: "Risk and compliance", description: "Scoring and review queues with audit trails. We will not pretend a model is a policy." },
      { title: "Healthcare and science", description: "Pipelines that respect data residency and clinical review. Accuracy and documentation over hype." },
      { title: "Manufacturing and vision", description: "Line-side or batch inspection with hardware and lighting constraints in the design, not as a surprise." },
    ],
    process: [
      {
        title: "Problem, data, and constraints",
        meta: "Week 1–2",
        description:
          "We write the use case, success metric, data inventory, and constraints (PII, latency, budget). If the data cannot support the claim, we say so before anyone trains anything.",
      },
      {
        title: "Approach and prototype",
        meta: "Weeks 2–5",
        description:
          "Baseline vs candidate: API, classical ML, or custom neural net. A prototype on real samples beats a perfect architecture diagram. You see failure modes early.",
      },
      {
        title: "Evaluate like you mean it",
        meta: "Gate",
        description:
          "Held-out sets, error analysis, and a go/no-go. We include the cases that break demos — ambiguity, empty inputs, adversarial users.",
      },
      {
        title: "Integrate and ship",
        meta: "Production",
        description:
          "API or batch job, auth, timeouts, fallbacks, and product UX (when to show confidence, when to ask a human). Logging is designed for debugging, not only for a slide.",
      },
      {
        title: "Monitor and improve",
        meta: "Ongoing",
        description:
          "Drift, cost, latency, and user feedback loops. Models decay; the operating rhythm is part of the engagement if you want the metric to keep moving.",
      },
    ],
    extraFaqs: [
      {
        question: "Will our data be sent to third-party model providers?",
        answer:
          "Only with your agreement and a written design. We can use vendor APIs with data-retention controls, private endpoints, or fully self-hosted models. The choice is driven by sensitivity, latency, and cost. We document what leaves your boundary and what does not.",
      },
      {
        question: "How do you keep generative AI from hallucinating?",
        answer:
          "Grounding (RAG), tool use with verified APIs, constrained outputs, and refusal behaviour when retrieval is weak. We also add evals and, where needed, human review. There is no switch that makes language models perfectly truthful; there is engineering that makes them useful and auditable.",
      },
      {
        question: "Do we need a data science team after you deploy?",
        answer:
          "Not necessarily. We can hand over a documented service your engineers operate, or stay on for retraining and eval. We will be honest if the system needs a specialist cadence versus a quarterly review.",
      },
    ],
  },
  "chatbot-development": {
    lead: "Conversational systems that resolve real work — on your site, WhatsApp, and tools — with handoff and analytics, not a widget that shrugs.",
    intro: [
      "A chatbot is a support and sales channel. It needs intents (or grounded generation), guardrails, a path to a human, and a place in CRM. We design the conversation the way we design product UX: jobs to be done, failure states, and tone that matches your brand without pretending to be a person. The same discipline is covered in [the future of chatbots in customer service](/blogs/future-of-chatbots-in-customer-service).",
      "We implement on the channels your customers already use — site widget, [WhatsApp Business Platform](https://business.whatsapp.com/products/business-platform), Messenger, Slack — with one conversation layer and adapters per surface. Knowledge comes from your FAQs, docs, and systems of record, refreshed on a schedule you control. Heavier model work lives with our [AI and ML team](/services/ai-ml).",
      "After go-live we tune from transcripts. The first version will miss things; that is expected. What matters is a loop: review misses, add coverage, tighten prompts or flows, and keep the bot from freelancing on topics it should not touch. For language understanding we follow current [NLP](https://www.ibm.com/topics/natural-language-processing) practice rather than a single vendor slogan.",
    ],
    pillars: [
      {
        title: "Channel-native, logic once",
        text: "Website, WhatsApp, and more from one dialogue design — adapted to each platform’s limits, not copy-pasted badly.",
      },
      {
        title: "Grounded answers",
        text: "Retrieval and tools over your content and APIs, with citations or “I don’t know” instead of invented policy.",
      },
      {
        title: "Humans stay in the loop",
        text: "Handoff, transcripts, and CRM tickets so the bot extends the team rather than hiding from it.",
      },
    ],
    stats: [
      { value: "24/7", label: "Coverage on live channels" },
      { value: "Multi", label: "Channel from one brain" },
      { value: "CRM", label: "Leads and tickets synced" },
      { value: "Tune", label: "Iterate from real chats" },
    ],
    offerings: [
      {
        title: "Support and FAQ bots",
        description:
          "Deflect repetitive tickets with accurate, on-brand answers and a clean escalate path when the user is stuck or unhappy. Many teams pair this with a [website](/services/website-development) widget so help is on the same domain as the product.",
      },
      {
        title: "Lead qualification",
        description:
          "Structured questions, budget/fit scoring, and calendar or CRM handoff so sales wakes up to conversations that are worth a call.",
      },
      {
        title: "WhatsApp and messaging",
        description:
          "Business API flows for order status, reminders, and service — with template rules and opt-in treated as product, not legal leftover.",
      },
      {
        title: "Internal assistants",
        description:
          "HR, IT, and ops bots on Slack or Teams that look up policy and tickets without exposing data to the whole company by accident.",
      },
      {
        title: "Voice and multilingual",
        description:
          "Speech where it helps, and language detection or explicit locale choice for markets that will not use a single-language bot.",
      },
      {
        title: "Analytics and training",
        description:
          "Dashboards for containment, CSAT proxies, and missed intents. We turn that into a monthly coverage plan, not a folder of ignored CSVs.",
      },
    ],
    useCases: [
      { title: "Customer support", description: "After-hours coverage and first-line deflection with transcripts your agents can continue." },
      { title: "E-commerce", description: "Order tracking, returns policy, and product Q&A connected to catalog and fulfilment status." },
      { title: "Bookings", description: "Qualify and schedule, then confirm in the calendar system you already use." },
      { title: "Healthcare intake", description: "Structured triage and FAQs with strict boundaries and human review — never a diagnosis toy." },
      { title: "Education", description: "Admissions and student services answers grounded in official content, updated each term." },
      { title: "HR and IT", description: "Policy and access requests that create tickets instead of disappearing in chat history." },
    ],
    process: [
      {
        title: "Jobs, channels, and risks",
        meta: "Week 1",
        description:
          "We list the conversations worth automating, where they happen, and what the bot must never do. Scope is a list of jobs, not “AI chatbot” as a vibe.",
      },
      {
        title: "Conversation and knowledge design",
        meta: "Weeks 2–3",
        description:
          "Flows, tone, retrieval sources, and fallback. We write the “I don’t know” and the escalate copy with you — that is brand and liability, not filler.",
      },
      {
        title: "Build and integrate",
        meta: "Weeks 3–6",
        description:
          "NLU or LLM layer, connectors, CRM, and widget/API. Staging on a test number or hidden snippet so you can break it before customers do.",
      },
      {
        title: "Pilot and guardrails",
        meta: "Soft launch",
        description:
          "A limited audience, review of transcripts, and prompt/flow patches. We tune refusal and handoff before you put it on the homepage.",
      },
      {
        title: "Launch and weekly tuning",
        meta: "Live",
        description:
          "Go live with analytics. The first month is a product sprint: coverage gaps, angry users, and new FAQs. That loop is the difference between a toy and a channel.",
      },
    ],
    extraFaqs: [
      {
        question: "Rule-based, NLP, or LLM — what do you recommend?",
        answer:
          "Often a hybrid. Predictable tasks (order status, hours, reset password) belong in reliable flows. Open questions on your knowledge base fit retrieval + LLM with guardrails. We recommend based on risk, volume, and how fast your content changes — not on what is fashionable this quarter.",
      },
      {
        question: "How do you prevent the bot from saying something off-brand or wrong?",
        answer:
          "Grounding, allow/deny topics, tool-only answers for account data, and human handoff. We also review transcripts on a cadence. No vendor switch removes this work; it is operations. We set that expectation in the proposal.",
      },
      {
        question: "Can it speak multiple languages from day one?",
        answer:
          "Yes if you have (or fund) content and QA in those languages. Auto-translate is a fallback, not a strategy, for regulated or high-stakes answers. We will propose a language rollout so you do not launch five mediocre locales instead of two good ones.",
      },
    ],
  },
  "maintenance-support": {
    lead: "Quiet reliability: patching, monitoring, backups, and a human who already knows your stack when something breaks.",
    intro: [
      "Software does not stay shipped. Dependencies age, browsers change, plugins get [CVEs](https://www.cve.org), and the person who “knew the server” leaves. Maintenance is the practice of keeping production boring — updates, observability, backups you have actually restored, and a response path with names and clocks on it.",
      "We onboard existing products as well as the ones we built. That starts with an inventory: environments, secrets, third parties, and the incidents you already fear. Then we put monitoring, patch windows, and a backlog for the small fixes that never make it into a project SOW — including the [website](/services/website-development) or [app](/services/app-development) already in production.",
      "You get reporting you can show a founder or a board: uptime, changes shipped, risks accepted, and what we recommend next. The point is not tickets for theatre. It is fewer surprises and a longer life for the product you already paid to build. Release risk is handled next door in [DevOps and cloud deployment](/services/deployment-devops).",
    ],
    pillars: [
      {
        title: "Proactive before heroic",
        text: "Patching, dependency upgrades, and health checks on a calendar — so 3 a.m. is the exception, not the culture.",
      },
      {
        title: "Clear SLAs",
        text: "Response and severity definitions in writing. Critical means down or money-path broken, not “the button is the wrong teal.”",
      },
      {
        title: "Takeover without drama",
        text: "We document as we learn the system. You are not trapped with tribal knowledge in one contractor’s head — including ours.",
      },
    ],
    stats: [
      { value: "SLA", label: "Response you can plan around" },
      { value: "24/7", label: "Options for critical paths" },
      { value: "Backup", label: "Verified restore, not only dumps" },
      { value: "Report", label: "Changes and risks, regularly" },
    ],
    offerings: [
      {
        title: "Application maintenance",
        description:
          "Framework and dependency updates, bug fixes, and small enhancements inside an agreed monthly capacity so the product does not freeze in amber.",
      },
      {
        title: "Security and patching",
        description:
          "CVE watch, dependency bots, secret rotation habits, and hardening tickets prioritized by exploitability — not by whoever shouted last. We map work against the [OWASP Top 10](https://owasp.org/www-project-top-ten/) where it applies.",
      },
      {
        title: "Performance and database care",
        description:
          "Slow queries, cache, and storage growth. We treat performance as maintenance when it is regression, and as a project when it is a redesign.",
      },
      {
        title: "Backups and restore drills",
        description:
          "Backups that have been restored in a drill, with retention you can explain to finance and legal. Untested backups are a story you tell yourself.",
      },
      {
        title: "Monitoring and incident response",
        description:
          "Uptime, error, and business-path alerts with a runbook. When it pages, we already know the architecture.",
      },
      {
        title: "Flexible capacity",
        description:
          "Scale hours for launches and peak seasons, then scale down. Retainers should follow your calendar, not a rigid unused bucket.",
      },
    ],
    useCases: [
      { title: "SaaS products", description: "Keep the app current, observable, and shippable while your team focuses on the roadmap." },
      { title: "E-commerce", description: "Checkout, catalog, and peak-traffic readiness with a team that has seen campaign days before." },
      { title: "Marketing sites", description: "Plugin and CMS hygiene, form reliability, and speed so paid traffic is not wasted on a 6-second homepage." },
      { title: "Mobile backends", description: "API uptime and store-driven updates coordinated with the client release train." },
      { title: "Legacy systems", description: "Stabilize first, then chip away at risk — without a reckless rewrite as the opening move." },
    ],
    process: [
      {
        title: "Assessment and access",
        meta: "Onboarding",
        description:
          "Repos, hosting, secrets, vendors, and a first risk list. We do not “start fixing” until we can see production safely and you know what we can reach.",
      },
      {
        title: "Plan, SLA, and cadence",
        meta: "Week 1–2",
        description:
          "Hours, severity, patch windows, and reporting. You sign a plan that matches how scary downtime actually is for the business.",
      },
      {
        title: "Baseline hardening",
        meta: "First month",
        description:
          "Monitoring, backups, obvious CVEs, and the landmines we found in onboarding. This is where many clients feel the value immediately.",
      },
      {
        title: "Steady-state operations",
        meta: "Monthly",
        description:
          "Updates, tickets, and a visible backlog. We protect a slice of time for unplanned incidents so planned work does not vanish the first time something breaks.",
      },
      {
        title: "Review and re-scope",
        meta: "Quarterly",
        description:
          "What improved, what is still risky, and whether the retainer still fits. Products change; the support shape should too.",
      },
    ],
    extraFaqs: [
      {
        question: "What if we only need you for emergencies?",
        answer:
          "We can do on-demand work, but we will price and sequence it honestly: unfamiliar systems take longer in a crisis. A light retainer with documentation already done is almost always cheaper than a cold start at midnight. We will propose both options.",
      },
      {
        question: "Do you support products you did not build?",
        answer:
          "Yes. Most of our maintenance book is inherited. Onboarding includes an architecture read, dependency audit, and a “known quirks” doc. If the stack is outside what we can stand behind, we will say no rather than learn production on your incident clock.",
      },
      {
        question: "How do you communicate during an incident?",
        answer:
          "A single thread (email or Slack, as agreed), severity, next update time, and a post-incident note with cause and prevention. We do not disappear into the logs for three hours without a signal. Your stakeholders get a status they can forward.",
      },
    ],
  },
  "deployment-devops": {
    lead: "Environments, pipelines, and cloud that make releases dull — in the best way — with security and handover included.",
    intro: [
      "DevOps is how software becomes a service your team can ship twice a week without a ceremony. We design environments, CI/CD, containers where they help, and the cloud accounts underneath — with least privilege, secrets management, and observability from the first production deploy. See [building scalable applications](/blogs/building-scalable-applications-complete-guide) for the product-side of that same problem.",
      "We work with [AWS](https://aws.amazon.com), Azure, GCP, and app platforms like Vercel when they are the right size for the problem. [Docker](https://docs.docker.com) and Kubernetes are tools, not a personality. You get infrastructure as code, a pipeline that runs tests and can roll back, and documentation a new engineer can follow on day three.",
      "Migrations are planned with a cutover window and a reverse path. The success metric is not “we used the trendy orchestrator.” It is that your next release is boring and your bill is explainable — whether we are shipping a [website](/services/website-development) or a [mobile app](/services/app-development).",
    ],
    pillars: [
      {
        title: "Right-sized infrastructure",
        text: "Cloud and platform choices matched to traffic, compliance, and team skill — not a résumé-driven architecture.",
      },
      {
        title: "Pipelines you will use",
        text: "CI that runs the tests you have, deploys with approval where you want it, and fails loudly when it should not ship.",
      },
      {
        title: "Operable by your people",
        text: "Runbooks, diagrams, and a handover. We are happy to stay; we refuse to be the only ones who can deploy.",
      },
    ],
    stats: [
      { value: "IaC", label: "Environments you can recreate" },
      { value: "CI/CD", label: "Test, build, deploy, rollback" },
      { value: "Multi", label: "Cloud and platform fluent" },
      { value: "Docs", label: "Handover is in the scope" },
    ],
    offerings: [
      {
        title: "Cloud architecture and landing zones",
        description:
          "Accounts, networks, and identity laid out so the next service is not a snowflake. Cost and blast radius are part of the design.",
      },
      {
        title: "CI/CD pipelines",
        description:
          "GitHub Actions, GitLab CI, or cloud-native pipelines: test, preview, production, and gated promote. Secrets never live in the repo.",
      },
      {
        title: "Containers and orchestration",
        description:
          "Docker as a default packaging story; Kubernetes when you have the traffic and the team to operate it. We will push back if you do not.",
      },
      {
        title: "Preview and staging environments",
        description:
          "Ephemeral or standing previews so QA and stakeholders click the real thing before production. Data handling for staging is explicit.",
      },
      {
        title: "Observability and incident basics",
        description:
          "Logs, metrics, traces at a useful level, and alerts that mean something. Dashboards that match how you actually debug.",
      },
      {
        title: "Migration and disaster recovery",
        description:
          "Lift from a VPS or another cloud with DNS, data, and rollback. Backup and restore objectives written down, then tested.",
      },
    ],
    useCases: [
      { title: "Product teams", description: "Ship web apps and APIs multiple times a week without a hero deploy on Friday night." },
      { title: "Regulated workloads", description: "Tighter identity, audit, and data residency — scoped to what auditors will actually ask." },
      { title: "Agencies and multi-tenant", description: "Repeatable stacks for many client apps without a unique snowflake per repo." },
      { title: "Mobile backends", description: "API environments that match store release trains and can roll back independently of the client." },
      { title: "Data and ML services", description: "GPU or batch jobs, artifact registries, and isolation from the public product if needed." },
    ],
    process: [
      {
        title: "Architecture and constraints",
        meta: "Week 1",
        description:
          "Traffic, compliance, budget, and who will operate this. We choose a target shape and a path from today that does not require a freeze for two months.",
      },
      {
        title: "Foundation and access",
        meta: "Days, not months",
        description:
          "Accounts, IaC skeleton, environments, and SSO. Getting this wrong is expensive; we go slow enough to be correct.",
      },
      {
        title: "Pipeline and deploy path",
        meta: "Core build",
        description:
          "Build, test, migrate, deploy, smoke. You watch a commit become a URL. Rollbacks are rehearsed, not theoretical.",
      },
      {
        title: "Harden and observe",
        meta: "Before you depend on it",
        description:
          "TLS, WAF or equivalent where it pays off, backups, and alerts. We cut noise so on-call is survivable.",
      },
      {
        title: "Handover and optional ops",
        meta: "Done when you can ship",
        description:
          "Docs, pairing, and a decision: you run it, or we stay on a DevOps retainer. Either is fine; ambiguity is not.",
      },
    ],
    extraFaqs: [
      {
        question: "Do we have to use Kubernetes?",
        answer:
          "No. Many products are happier on managed containers, a PaaS, or even a well-run pair of services plus a database. We recommend Kubernetes when you have multiple services, scaling patterns, and people to operate the cluster. We will explain the cost of the alternative you skip.",
      },
      {
        question: "Can you work inside our existing AWS / Azure / GCP org?",
        answer:
          "Yes. We prefer least-privilege roles, tagged resources, and changes through IaC so your other teams can see what landed. We do not create shadow accounts unless you ask for isolation on purpose.",
      },
      {
        question: "How do you handle secrets and production access?",
        answer:
          "Secrets in a manager (or platform equivalent), short-lived credentials where possible, and no shared SSH keys in a wiki. Human access is named and reviewable. We document the break-glass path so you are not locked out of your own product.",
      },
    ],
  },
  "digital-marketing": {
    lead: "Full-funnel digital marketing — SEO, paid, social, and creative — planned around pipeline, not vanity charts.",
    intro: [
      "Traffic is easy to buy and hard to make valuable. We build marketing systems: the [search](/services/search-engine-optimization) and content that compound, the ads that convert, the [social](/services/social-media-marketing) that keeps you present, and the measurement that tells you which of those deserves more budget next month.",
      "You do not have to buy every channel on day one. We often start with the constraint that is hurting you most — a site that cannot rank, ads with no tracking, or a brand that looks different in every creative — then expand when the numbers justify it. For a regional view of visibility work, see [how to rank a business in Jammu & Kashmir](/blogs/how-to-rank-business-jammu-kashmir).",
      "Reporting is in the language of your business: leads, cost per opportunity, revenue, assisted conversions. We will still show impressions when they matter for brand. We will not hide behind them when you asked for pipeline. Tracking usually sits in [Google Analytics](https://marketingplatform.google.com/about/analytics/) and the ad platforms you already own.",
    ],
    pillars: [
      {
        title: "Channel mix with a thesis",
        text: "SEO, paid, and social each have a job in the funnel. We write that down so budget is a decision, not a habit.",
      },
      {
        title: "Creative and landing pages",
        text: "Ads and posts that match the page they hit. Most “marketing problems” are message-mismatch problems.",
      },
      {
        title: "Measurement you can audit",
        text: "Analytics, pixels, and CRM where it counts. If we cannot see the conversion, we will not scale the spend.",
      },
    ],
    stats: [
      { value: "Full", label: "Funnel, not one tactic" },
      { value: "KPI", label: "Agreed before campaigns" },
      { value: "Mix", label: "SEO + paid + social as needed" },
      { value: "Monthly", label: "Decisions, not just decks" },
    ],
    offerings: [
      {
        title: "Strategy and positioning",
        description:
          "Offers, audiences, and the story you can actually defend. Channel plans without this become a pile of disconnected campaigns.",
      },
      {
        title: "SEO and content",
        description:
          "Technical health, pages that match intent, and a publishing rhythm. Compounding traffic instead of renting all of it.",
      },
      {
        title: "Paid search and social",
        description:
          "Google and Meta (and others when they fit) with structure, creative tests, and budgets that follow results.",
      },
      {
        title: "Social and community",
        description:
          "A cadence and a voice, plus paid amplification when organic reach is not the job. Platforms chosen by audience, not FOMO.",
      },
      {
        title: "Design for campaigns",
        description:
          "Assets that fit each placement and still look like one brand. Fast enough to keep tests moving.",
      },
      {
        title: "Analytics and CRO",
        description:
          "Tracking that survives a website change, plus landing and form experiments so you improve conversion, not only CPC.",
      },
    ],
    useCases: [
      { title: "B2B pipeline", description: "Search + [LinkedIn](https://business.linkedin.com/marketing-solutions) content + landing proof for longer sales cycles." },
      { title: "E-commerce", description: "Shopping, retargeting, and SEO category pages measured on contribution margin, not just ROAS screenshots." },
      { title: "Local services", description: "Maps, local SEO, and ads that do not waste budget 400km outside the service area." },
      { title: "SaaS", description: "Product-led content, comparison pages, and paid that respects trial-to-paid reality." },
      { title: "Launch moments", description: "A burst plan with tracking, creative, and a page that can take the hit." },
      { title: "Turnarounds", description: "Audit, pause waste, fix tracking, then rebuild. Ego-free about killing zombie campaigns." },
    ],
    process: [
      {
        title: "Audit and goals",
        meta: "Week 1–2",
        description:
          "Analytics, ads, SEO, and creative. We name the leaks. Goals become KPIs with a time horizon so “brand” and “leads” are not mixed in one dashboard cell.",
      },
      {
        title: "Plan and instrumentation",
        meta: "Before spend",
        description:
          "Channel mix, budget bands, and tracking that actually fires. We will delay launch a week to fix conversion events rather than optimise on fiction.",
      },
      {
        title: "Build and launch",
        meta: "Weeks 2–5",
        description:
          "Pages, campaigns, calendars, and creative. Soft launch where it helps. You see the work in the accounts you own.",
      },
      {
        title: "Optimise on a cadence",
        meta: "Monthly",
        description:
          "Kill, iterate, scale. Creative refresh is scheduled because ads fatigue. SEO is a backlog, not a one-off audit PDF.",
      },
      {
        title: "Report and reallocate",
        meta: "Always",
        description:
          "What we did, what it did, what we will do next. Budget moves toward what is working. That is the job.",
      },
    ],
    extraFaqs: [
      {
        question: "Can we start with only SEO or only ads?",
        answer:
          "Yes. Many clients do. We will still look at the landing experience and tracking, because a single channel still has to convert. Expanding later is easier when the foundation is not a mess.",
      },
      {
        question: "Who owns the ad accounts and analytics?",
        answer:
          "You do. We work as a partner with access. If a relationship ends, you keep history, pixels, and audiences. We do not hold accounts hostage.",
      },
      {
        question: "How soon should we expect results?",
        answer:
          "Paid can produce learning in days and stable CPA in weeks if tracking is clean. SEO is usually a 3–6 month curve, sometimes longer in competitive spaces. We set expectations per channel in the plan so you are not judging organic by a weekly ads brain.",
      },
    ],
  },
  "search-engine-optimization": {
    lead: "Search that compounds: technical health, pages that match intent, and authority you will not have to disavow later.",
    intro: [
      "SEO is still how a lot of high-intent demand shows up — but it only works if the site can be crawled, the pages answer the query, and other sites have a reason to reference you. We run those three together: technical, content, and off-site, with a backlog you can see. The playbook matches [SEO strategies that actually work](/blogs/seo-strategies-that-actually-work).",
      "We start with an audit that is a punch list, not a 90-page souvenir. Quick wins (indexation, titles, internal links, speed) ship first — often on the [website](/services/website-development) we also maintain. Content and digital PR run on a horizon that matches how stubborn your SERPs are. We follow [Google Search Central](https://developers.google.com/search) guidance rather than folklore.",
      "Reporting is rankings where they matter, qualified organic traffic, and conversions from organic — not a screenshot of a single keyword in position three. If you need local, we treat Maps and the profile as a product, not a side quest. Kashmir and J&K businesses can start with our [local SEO](/blogs/local-seo-services-kashmir) notes. Markup uses [Schema.org](https://schema.org) where it earns rich results.",
    ],
    pillars: [
      { title: "Technical that unblocks", text: "Crawl, index, speed, and structure. Content cannot rank if the engine cannot use the page." },
      { title: "Intent-led pages", text: "We write and improve pages for the job the searcher has, including the ones you should not target." },
      { title: "Authority without stunts", text: "Digital PR and partnerships. No PBNs, no surprise invoices for 200 “guest posts.”" },
    ],
    stats: [
      { value: "3–6", label: "Months to meaningful movement" },
      { value: "Tech", label: "+ content + authority" },
      { value: "Local", label: "When geography is the query" },
      { value: "White-hat", label: "Links you can defend" },
    ],
    offerings: [
      {
        title: "Technical SEO",
        description:
          "Crawl diagnostics, indexation, canonicals, structured data, Core Web Vitals, and IA. We work with your developers instead of throwing the report over a wall.",
      },
      {
        title: "Keyword and gap research",
        description:
          "Demand, difficulty, and the pages you are missing. Mapped to a backlog with owners, not a 2,000-row sheet nobody opens.",
      },
      {
        title: "On-page and content",
        description:
          "Briefs, landing pages, and articles that satisfy intent and are allowed to be interesting. Updates to decaying winners included.",
      },
      {
        title: "Internal linking and UX",
        description:
          "Hubs, breadcrumbs, and in-content links that help users and distribute equity. SEO that also makes the site easier to use.",
      },
      {
        title: "Digital PR and links",
        description:
          "Pitcheable stories, sources, and genuine mentions. Slow on purpose. Safe on purpose.",
      },
      {
        title: "Local SEO",
        description:
          "Profile, categories, photos, reviews ops, and location pages that are not doorway spam.",
      },
    ],
    useCases: [
      { title: "Service businesses", description: "City + service demand captured on pages that can convert a call, not only a session." },
      { title: "SaaS", description: "Problem, comparison, and integration pages that feed trials over a long cycle." },
      { title: "E-commerce", description: "Category and facet strategy that does not explode into duplicate thin URLs." },
      { title: "Publishers", description: "Information architecture and refresh cadence for a large URL set." },
      { title: "Multi-location", description: "Templates that stay unique enough to rank without becoming a doorway farm." },
      { title: "International", description: "Hreflang and market IA when you are actually serving those markets." },
    ],
    process: [
      {
        title: "Audit and opportunity",
        meta: "Weeks 1–2",
        description:
          "Technical crawl, content inventory, competitors, and a 30/60/90 that is actually sequenced. You see what we will not do, too.",
      },
      {
        title: "Fix the engine",
        meta: "Weeks 2–6",
        description:
          "Indexation, speed, templates, and metadata at scale. Developers get tickets they can implement, not poems about “E-E-A-T.”",
      },
      {
        title: "Publish and improve",
        meta: "Ongoing",
        description:
          "New pages and rewrites against the gap list. We measure engagement and conversions, not only rank tracking screenshots.",
      },
      {
        title: "Earn mentions",
        meta: "Parallel",
        description:
          "Outreach that sounds like a human with a story. We report links and the ones that did not land, without theatre.",
      },
      {
        title: "Report and re-prioritize",
        meta: "Monthly",
        description:
          "What moved, what we learned about SERP features, what the next sprint is. SEO plans that never change are already wrong.",
      },
    ],
    extraFaqs: [
      {
        question: "Can you guarantee position one?",
        answer:
          "No, and you should walk away from anyone who does. We can commit to a program, a cadence, and leading indicators. Rankings are an outcome of competition, your site, and the engine. We will forecast ranges, not miracles.",
      },
      {
        question: "Do you need to change our website?",
        answer:
          "Usually some of it. Titles and internal links are table stakes. Template and speed issues need engineering. We scope that with your developers (or ours) so SEO is not a PDF that never ships.",
      },
      {
        question: "How do you work with our writers?",
        answer:
          "We can write, or we can brief and edit. Briefs include intent, outline, questions to answer, and internal links. Your voice stays yours; we supply the search constraints.",
      },
    ],
  },
  "social-media-marketing": {
    lead: "Social that sounds like your brand — planned, designed, and optionally paid — on the platforms your buyers actually open.",
    intro: [
      "Social is not “posting.” It is a mix of content systems, community behaviour, and sometimes ads. We pick platforms from audience and offer, then build a calendar your team can live with. Inconsistent brilliance loses to consistent, on-brand, slightly boring excellence. Creative systems usually come from [graphic design](/services/graphic-designing).",
      "Creative is native to each network: how people scroll there, what they sound like, what gets muted. We write captions and design (or motion) that belong on the feed, then report on the actions you care about — site visits, leads, saves, not only follower count. Platform rules live in [Meta Business](https://www.facebook.com/business) for Facebook and Instagram.",
      "If paid social is in the mix, it shares the same message architecture as organic so you are not running two companies in public — that paid layer is [Meta Ads](/services/meta-ads). Community replies are part of the work; a feed with no comments strategy is a broadcast nobody asked for. E-commerce brands often pair this with [social for online stores](/blogs/ecommerce-business-jammu-kashmir).",
    ],
    pillars: [
      { title: "Platforms with a job", text: "[Instagram](https://business.instagram.com) is not LinkedIn. We brief each channel as its own product surface." },
      { title: "A calendar you can keep", text: "Volume matched to capacity and quality. Burnout is not a strategy." },
      { title: "Organic + paid as one story", text: "When we run ads, they extend the same pillars — they do not invent a second brand." },
    ],
    stats: [
      { value: "3–7", label: "Posts/week, by channel plan" },
      { value: "Native", label: "Creative per platform" },
      { value: "Paid", label: "Optional, not mandatory" },
      { value: "Reply", label: "Community is in the scope" },
    ],
    offerings: [
      {
        title: "Strategy and pillars",
        description:
          "Audience, proof, and content themes. A reason to follow you that is not “we also posted a quote on a gradient.”",
      },
      {
        title: "Content production",
        description:
          "Copy, static, carousel, and short video direction. Shot lists and editing when the format needs it. Brand-safe always.",
      },
      {
        title: "Community management",
        description:
          "Replies, DMs triage, and a tone guide for the ugly days. Escalation rules when something is actually a support ticket.",
      },
      {
        title: "Paid social",
        description:
          "Meta, LinkedIn, and others as needed — prospecting and retargeting with creative tests, not one ad for six months.",
      },
      {
        title: "Influencer and partners",
        description:
          "Outreach and briefs for people your audience already trusts. We prefer fit over follower vanity.",
      },
      {
        title: "Reporting that chooses a next action",
        description:
          "What to double, what to kill, what to test. Social reports that only celebrate reach are a magazine, not an agency.",
      },
    ],
    useCases: [
      { title: "B2B on LinkedIn", description: "POV content, founder/voice, and demand capture without turning the page into a brochure dump." },
      { title: "D2C on Instagram / TikTok", description: "Product, UGC-style, and ads that match how the organic already looks." },
      { title: "Local businesses", description: "Proof, people, and offers that make someone walk in or book — geo-honest." },
      { title: "Launches and events", description: "Tease, launch, recap. A sequence, not a single post the morning of." },
      { title: "Employer brand", description: "Hiring content that does not embarrass the culture you actually have." },
      { title: "Reputation", description: "Response playbooks and a content diet that is not only defensive." },
    ],
    process: [
      {
        title: "Audience and audit",
        meta: "Week 1",
        description:
          "Where they are, what you already posted, what competitors do that is actually working. We drop channels that are ego, not strategy.",
      },
      {
        title: "Voice, pillars, calendar",
        meta: "Week 2",
        description:
          "A month you can see. Approval workflow that does not take eleven people. Formats per platform.",
      },
      {
        title: "Produce and publish",
        meta: "Ongoing",
        description:
          "Batching where it helps, reactive where the news cycle demands it. You are never surprised by a post unless we agreed to be fast.",
      },
      {
        title: "Engage and advertise",
        meta: "Parallel",
        description:
          "Comments and DMs. Paid tests when the job is demand, not just presence.",
      },
      {
        title: "Review and refresh",
        meta: "Monthly",
        description:
          "Creative fatigue is real. We retire, remix, and brief the next batch from data plus taste — both required.",
      },
    ],
    extraFaqs: [
      {
        question: "Will you make us post every day on every network?",
        answer:
          "No. Frequency is a function of platform and resources. A strong LinkedIn three times a week beats a ghost-town seven-network plan. We will recommend a cadence we can execute well.",
      },
      {
        question: "Do we need to be on TikTok?",
        answer:
          "Only if your buyer is there and you can show up in a way that is not painful. We will say no when it is a distraction. If we say yes, we will brief the format properly — it is not a cropped Instagram post.",
      },
      {
        question: "Can you work from our existing brand kit?",
        answer:
          "Yes. We prefer it. If the kit cannot survive Stories or Reels, we will extend it rather than invent a second look. Source files stay yours.",
      },
    ],
  },
  "graphic-designing": {
    lead: "Brand and campaign design with systems — logos, social, product UI, and motion — so you stop reinventing the look every Thursday.",
    intro: [
      "Design is how people decide whether you look like a real company in half a second. We build the identity and the working files behind it: logo, type, colour, components, and the templates your team will actually use in [Canva](https://www.canva.com) or [Figma](https://www.figma.com) next week.",
      "Campaign work (ads, landing visuals, decks, packaging) sits on that system so paid and organic do not look like different vendors. We work in Figma and Adobe, deliver web and print specs, and include revision rounds in the quote so “one more tweak” is a defined process. Trends we watch are in [graphic design trends for 2025](/blogs/graphic-design-trends).",
      "If you need UI for a product, we design with implementation in mind — spacing, states, and a handoff developers will not have to interpret like archaeology. Motion and short video are available when the channel needs movement, not decoration. Marketing pages usually ship with [website development](/services/website-development); social templates with [social media marketing](/services/social-media-marketing).",
    ],
    pillars: [
      { title: "Systems, not one-offs", text: "A kit that scales to ads, decks, and product. Consistency is a cost-saver." },
      { title: "Files you can use", text: "SVG, print-ready, social sizes, and sources. No mysterious “final_v7_USE_THIS.”" },
      { title: "Built with the channel", text: "Safe zones, duration, and platform ugliness accounted for before you approve the pretty square." },
    ],
    stats: [
      { value: "2–3", label: "Revision rounds in scope" },
      { value: "Brand", label: "Plus campaigns and UI" },
      { value: "Motion", label: "When the format needs it" },
      { value: "Handoff", label: "Specs developers can trust" },
    ],
    offerings: [
      {
        title: "Logo and identity",
        description:
          "Mark, lockups, colour, type, and a short guide. Distinct enough to remember, simple enough to embroider and favicon.",
      },
      {
        title: "Campaign and social kits",
        description:
          "Templates for the placements you actually buy and post. Fast variants for tests without destroying the brand.",
      },
      {
        title: "Web and product UI",
        description:
          "Marketing pages and app interfaces with states, not only the hero mock. Components named for the people who will build them.",
      },
      {
        title: "Print and packaging",
        description:
          "Brochures, stationery, labels — with bleeds, dielines, and a printer conversation so colour is not a surprise.",
      },
      {
        title: "Pitch and sales decks",
        description:
          "Narrative plus layout. Investors and procurement both have to read this; we design for that, not for Dribbble.",
      },
      {
        title: "Motion and editing",
        description:
          "Short ads, explainers, and social cuts. Storyboarded so you are not paying for a re-edit of an unplanned film.",
      },
    ],
    useCases: [
      { title: "Startups", description: "A first identity that will not need a stealth rebrand six months after the seed round." },
      { title: "Rebrands", description: "Migrate equity: what you keep, what you burn, and a rollout plan for leftover templates." },
      { title: "Performance creative", description: "Volume of on-brand variants for ads without a three-week queue per test." },
      { title: "Product teams", description: "UI kits that match the marketing site so the signup does not feel like a different company." },
      { title: "Events", description: "A visual system for stage, badges, social, and follow-up — one look." },
      { title: "Packaging", description: "Shelf or unboxing that carries the same brand as the website." },
    ],
    process: [
      {
        title: "Brief and references",
        meta: "Days 1–5",
        description:
          "Audience, competitors, constraints, and what “done” looks like. Mood that is specific (“these three, not those”) beats “make it pop.”",
      },
      {
        title: "Directions",
        meta: "Week 1–2",
        description:
          "Multiple routes for identity or a campaign key visual. We explain the thinking so you are choosing a strategy, not a favourite colour.",
      },
      {
        title: "Refine",
        meta: "In the round count",
        description:
          "Tighten the winner. We are opinionated about spacing and type because that is the job. You still get the agreed revisions.",
      },
      {
        title: "Apply and deliver",
        meta: "Handoff",
        description:
          "Applications, files, and a guide. A working session if your team will extend the system without us.",
      },
      {
        title: "Support as you roll out",
        meta: "Optional",
        description:
          "Extra applications, a social kit, or UI continuation. Identity is a product; it ships in versions.",
      },
    ],
    extraFaqs: [
      {
        question: "Who owns the source files?",
        answer:
          "You do, on paid delivery. Figma, AI, PSD as agreed, plus exports. We do not hold files hostage. If a subscription font or stock asset has its own licence, we document that so you do not get surprised later.",
      },
      {
        question: "Can you match an existing brand instead of reinventing it?",
        answer:
          "Yes. A large amount of our work is extending kits, cleaning inconsistency, and designing campaigns inside rules. Rebrands are a choice, not a default upsell.",
      },
      {
        question: "How fast can you turn a social set?",
        answer:
          "Simple sets often in a few days once the system exists. Net-new identity is slower because choosing a direction is the work. We put dates on the proposal so campaign teams can plan media around design, not the other way around.",
      },
    ],
  },
  "google-ads": {
    lead: "Google Ads as an acquisition system: structure, tracking, creative, and landing pages — managed for efficient growth, not dashboard theatre.",
    intro: [
      "Search is intent you can buy. Display and YouTube are attention you can rent. Performance Max is a machine you can feed. None of it works if conversion tracking is a myth, if the account is a pile of duplicate keywords, or if the landing page argues with the ad. We work inside [Google Ads](https://ads.google.com/home/) the way the product is actually structured.",
      "We build (or rebuild) accounts around your economics: target CPA/ROAS, margins, and sales cycle. Query mapping, negatives, assets, and experiments are the weekly work. Shopping and PMax get product feed hygiene, not “set and pray.” Conversion actions follow [Google’s conversion tracking](https://support.google.com/google-ads/answer/1722022) setup, not a guess.",
      "You own the account. We explain changes in language a founder can follow. When something is learning, we say it is learning — we do not dress a 40-click sample as a strategy insight. Organic demand is still a [SEO](/services/search-engine-optimization) problem; the page behind the ad is often a [website](/services/website-development) we also ship. For budget ranges, see [SEO pricing in Kashmir](/blogs/seo-pricing-cost-kashmir) when search and paid sit in the same plan.",
    ],
    pillars: [
      { title: "Tracking first", text: "If we cannot measure the conversion, we will not scale. Tag, consent, and CRM as needed." },
      { title: "Structure that matches intent", text: "Campaigns and ad groups that make query reports useful. Fewer, cleaner, better." },
      { title: "Ads + pages as one unit", text: "Copy and landing must agree. We will push for page changes when the account is not the bottleneck." },
    ],
    stats: [
      { value: "Search", label: "Plus Demand Gen / YouTube / PMax" },
      { value: "Feed", label: "Shopping when you sell SKUs" },
      { value: "Tests", label: "Copy, match, landing" },
      { value: "You", label: "Own the account" },
    ],
    offerings: [
      {
        title: "Account build and rebuilds",
        description:
          "Campaign architecture, conversion actions, audiences, and brand protection. We would rather migrate cleanly than “optimise” a haunted house.",
      },
      {
        title: "Search and demand gen",
        description:
          "High-intent search plus YouTube/Demand Gen when the job is demand creation. Separate goals, shared measurement.",
      },
      {
        title: "Shopping and Performance Max",
        description:
          "Feed quality, titles, and asset groups. Guardrails so PMax does not eat brand search and call it genius.",
      },
      {
        title: "Landing page alignment",
        description:
          "Message match, speed, and form friction. Many CPA problems are page problems wearing a CPC costume.",
      },
      {
        title: "Bidding and budget strategy",
        description:
          "Manual when we are learning, automated when the signal is real. Budget follows evidence, including “pause this.”",
      },
      {
        title: "Reporting and experiments",
        description:
          "A cadence of tests with enough data to matter. Reports that show efficiency and volume, not 40 vanity columns.",
      },
    ],
    useCases: [
      { title: "Lead generation", description: "Calls, forms, and qualified pipeline — offline conversion import when the CRM is the truth." },
      { title: "E-commerce", description: "Feed, margins, and brand vs non-brand split so ROAS is not a blended lie." },
      { title: "Local services", description: "Geo, call tracking, and hours that match when someone can actually answer." },
      { title: "SaaS trials", description: "Sign-up quality over cheap clicks. We will talk about payback, not only CPL." },
      { title: "YouTube", description: "When you have a story and a way to measure view-through without kidding yourself." },
      { title: "Account takeovers", description: "Stop the bleed, then rebuild. First week is often negatives and tracking." },
    ],
    process: [
      {
        title: "Goals, economics, access",
        meta: "Week 1",
        description:
          "CPA/ROAS, sales cycle, and what a good lead is. MCC access. We look at history without assuming it was “optimized.”",
      },
      {
        title: "Measurement and structure",
        meta: "Before scaling",
        description:
          "Tags, enhanced conversions if appropriate, campaign map, and negatives. Launching more spend on a broken pixel is not courage.",
      },
      {
        title: "Launch and learn",
        meta: "Weeks 2–4",
        description:
          "Enough budget to get signal. We watch queries, geo, devices, and the pages. Changes are sequenced, not 30 knobs at once.",
      },
      {
        title: "Optimise and expand",
        meta: "Monthly",
        description:
          "Winners get budget. Losers get a hypothesis or a funeral. New queries, new ads, new audiences — on a list, not a whim.",
      },
      {
        title: "Scale with guardrails",
        meta: "When the math works",
        description:
          "More markets, more SKUs, more formats. Efficiency will move; we tell you before we spend like it will not.",
      },
    ],
    extraFaqs: [
      {
        question: "What monthly media budget do we need?",
        answer:
          "Enough to exit learning with statistically useful conversions. That varies by CPC and close rate. We will give a floor. Spending below it is not “being lean”; it is sampling noise. We can still build the account and wait.",
      },
      {
        question: "Do you write the ads and recommend landing changes?",
        answer:
          "Yes. RSA assets, extensions, and a backlog of page fixes. If we cannot touch the page, we will still say when the page is the constraint. You should expect us to care about the whole click, not only the bid.",
      },
      {
        question: "Will you work in our existing account?",
        answer:
          "Yes. History, conversion data, and trust with the algorithm are assets. We document what we change. If the account is structurally doomed, we will recommend a controlled rebuild rather than infinite micro-edits.",
      },
    ],
  },
  "meta-ads": {
    lead: "Facebook and Instagram acquisition with creative testing, clean events, and audiences that are not a graveyard of interests from 2019.",
    intro: [
      "Meta is a creative and signal business. The algorithm needs events it can trust and ads people stop on. We set up (or repair) the [Meta Pixel](https://www.facebook.com/business/tools/meta-pixel), Conversions API, and events, then run a testing system: hooks, formats, offers — while the targeting gets simpler, not more baroque. Creative volume usually comes from [graphic design](/services/graphic-designing).",
      "We map prospecting, retargeting, and retention to how your funnel actually works. Lead forms versus landing pages is a trade-off we will make explicit (volume vs quality). Catalog and Advantage+ shopping are used when the feed and margin can support them. Campaign types follow [Meta Ads](https://www.facebook.com/business/ads) documentation, not a 2019 interest stack.",
      "Reporting is cost per result you agreed to, plus creative commentary: what we killed, what we scaled, what we are filming or designing next. You should never wonder whether anyone is looking at the ads besides the algorithm. Organic posting stays with [social media marketing](/services/social-media-marketing); search capture with [Google Ads](/services/google-ads).",
    ],
    pillars: [
      { title: "Events before spend", text: "Pixel + CAPI, de-duped, matching the conversion that pays the bills." },
      { title: "Creative as the targeting", text: "Hooks and formats do more than a 40-interest stack. We test on a calendar." },
      { title: "Funnel honesty", text: "Prospecting is not retargeting. We will not starve one to make the other look efficient." },
    ],
    stats: [
      { value: "CAPI", label: "Plus pixel, done properly" },
      { value: "Test", label: "Hooks, angles, formats" },
      { value: "Retarget", label: "Without exhausting the list" },
      { value: "Catalog", label: "When product ads fit" },
    ],
    offerings: [
      {
        title: "Business Manager and pixel hygiene",
        description:
          "Assets, events, domains, and access that will survive a staff change. This is unglamorous and worth more than another lookalike.",
      },
      {
        title: "Prospecting systems",
        description:
          "Advantage+ and/or structured testing with enough creative to let the platform work. Broad is not lazy when the signal is clean.",
      },
      {
        title: "Retargeting and lifecycle",
        description:
          "Site, video, and CRM audiences with frequency caps and fresh creative so you are not haunting the same 2,000 people.",
      },
      {
        title: "Creative production loop",
        description:
          "Statics, UGC-style, carousels, Reels. Briefs your designers (or ours) can shoot. Kill criteria agreed in advance.",
      },
      {
        title: "Lead forms and landing paths",
        description:
          "Instant forms when speed matters, sites when qualification matters. CRM sync so “leads” are not a CSV graveyard.",
      },
      {
        title: "Catalog and D2C",
        description:
          "Product sets, creative overlays, and exclusions that respect margin. Feed issues get treated as ads issues, because they are.",
      },
    ],
    useCases: [
      { title: "D2C and e-commerce", description: "Creative + catalog + retention. Contribution margin in the conversation from week one." },
      { title: "Lead gen", description: "Forms or landing pages with quality checks so sales is not drowning in junk." },
      { title: "App campaigns", description: "When app events are real. We will not scale on install vanity." },
      { title: "Local", description: "Radius, stores, and offers that match inventory and staffing." },
      { title: "Events and cohorts", description: "Launches with a finite window and a retargeting after-party that ends on purpose." },
      { title: "Takeovers", description: "Audit creative fatigue and broken events first. Then rebuild the testing engine." },
    ],
    process: [
      {
        title: "Access, events, economics",
        meta: "Week 1",
        description:
          "BM, pixels, CAPI, what a conversion is worth. We fix measurement before we “optimize” a campaign that cannot see.",
      },
      {
        title: "Architecture and creative brief",
        meta: "Week 1–2",
        description:
          "Campaign jobs, audiences at a sensible granularity, and a test matrix. You know what ships this week vs next.",
      },
      {
        title: "Launch and read",
        meta: "Weeks 2–4",
        description:
          "Enough spend to learn. We look at hook rate, hold, and cost per result — and whether the lead was real.",
      },
      {
        title: "Iterate creative",
        meta: "The actual job",
        description:
          "Winners get variants. Losers get archived with a note. New angles are a production problem we plan, not a panic.",
      },
      {
        title: "Scale and protect",
        meta: "When it works",
        description:
          "Budget up with duplication/ASC as appropriate, frequency watch, and a retargeting lid. Scaling is a process, not a toggle.",
      },
    ],
    extraFaqs: [
      {
        question: "Why did our costs jump after iOS / privacy changes?",
        answer:
          "Signal loss made sloppy event setups and over-segmented accounts worse. We respond with CAPI, fewer junk events, better creative, and modelled reporting you understand. Anyone promising 2018 CPAs as a guarantee is selling nostalgia.",
      },
      {
        question: "Do you create the ads or only “manage”?",
        answer:
          "We do both, or we partner with your designers against our briefs. Accounts die when management is bid tweaks and the creative is three stills from 2022. Production is in the plan.",
      },
      {
        question: "Can you run Advantage+ and still be in control?",
        answer:
          "Yes, with the right exclusions, event choice, and creative volume. Control is in the inputs and the kill rules, not in 15 ad sets of overlapping interests. We will show you where the platform is deciding and where we still are.",
      },
    ],
  },
};
