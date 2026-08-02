import { type GuardResult } from './utils';

// ─── Prompt Injection Patterns ──────────────────────────────
const INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?previous\s+(instructions|prompts|rules)/i,
  /ignore\s+above/i,
  /disregard\s+(all\s+)?(previous|prior|above)/i,
  /forget\s+(all\s+)?(your|the|previous)\s*(rules|instructions|prompts)/i,
  /act\s+(as|like)\s+(chatgpt|gpt|a\s+general|an?\s+ai\s+assistant)/i,
  /pretend\s+(you\s+are|to\s+be|you're)/i,
  /reveal\s+(your|the)\s*(system|initial|original)\s*(prompt|instructions|message)/i,
  /show\s+(me\s+)?(your|the)\s*(system|hidden)\s*(prompt|instructions)/i,
  /what\s+(are|is|were)\s+your\s+(instructions|system\s*prompt|rules)/i,
  /you\s+are\s+now\s+(a|an|the)/i,
  /new\s+instructions?\s*:/i,
  /override\s+(your|the|all)\s*(rules|instructions|guidelines)/i,
  /jailbreak/i,
  /\bDAN\b/,
  /do\s+anything\s+now/i,
  /bypass\s+(your|the|all)\s*(rules|restrictions|filters|safety)/i,
  /from\s+now\s+on,?\s+(you|ignore|forget)/i,
];

// ─── Code / Homework Request Patterns ───────────────────────
const CODE_PATTERNS: RegExp[] = [
  /write\s+(me\s+)?(a\s+)?(python|javascript|typescript|java|c\+\+|ruby|go|rust|php|swift|kotlin|sql|html|css|code|script|function|program|class|algorithm)/i,
  /generate\s+(a\s+)?(code|script|function|program|query|snippet)/i,
  /create\s+(a\s+)?(function|class|program|script|query|api)\s/i,
  /solve\s+(this|my|the)\s*(coding|programming|algorithm|math|homework|assignment)/i,
  /debug\s+(this|my|the)\s*(code|script|program|function)/i,
  /fix\s+(this|my|the)\s*(code|script|program|bug|error)/i,
  /explain\s+(how\s+to\s+)?(code|program|implement)/i,
  /sql\s+query/i,
  /regex\s+(for|to|that)/i,
  /help\s+(me\s+)?(with\s+)?(my\s+)?(homework|assignment|exam|test)/i,
  /convert\s+this\s+(code|to)/i,
  /refactor\s+(this|my)/i,
];

// ─── General Knowledge / Off-Topic Patterns ─────────────────
const OFFTOPIC_PATTERNS: RegExp[] = [
  /who\s+(is|was|are)\s+(the\s+)?(president|prime\s*minister|king|queen|ceo\s+of)/i,
  /what\s+(is|are)\s+(the\s+)?(capital|population|currency)\s+of/i,
  /tell\s+me\s+(a\s+)?(joke|story|poem|riddle)/i,
  /translate\s+(this|the|from)/i,
  /what\s+is\s+(the\s+meaning|\w+)\s+in\s+(hindi|urdu|french|spanish|german)/i,
  /explain\s+(quantum|relativity|evolution|photosynthesis|gravity|blockchain|crypto)/i,
  /how\s+(do|does)\s+(the\s+)?(sun|moon|earth|universe|black\s*hole)/i,
  /recipe\s+for/i,
  /what\s+should\s+I\s+(eat|wear|watch|read|buy|cook)/i,
  /play\s+(a\s+)?(game|quiz|trivia)/i,
  /write\s+(me\s+)?(a\s+)?(poem|essay|letter|email|story|song|speech|article)/i,
  /who\s+won\s+(the|last)/i,
  /weather\s+(in|for|today|tomorrow)/i,
  /(political|politics|religion|religious)\s/i,
  /relationship\s+advice/i,
  /medical\s+advice/i,
  /legal\s+advice/i,
];

// ─── Allowed Topic Keywords ─────────────────────────────────
const ALLOWED_KEYWORDS: string[] = [
  // Company
  'nexgen', 'nex gen', 'nex-gen', 'company', 'about', 'who are you', 'your company',
  'your team', 'your organization', 'founded', 'mission', 'vision', 'values',
  // Services
  'service', 'services', 'offering', 'what do you', 'what can you', 'do you offer',
  'do you provide', 'do you build', 'do you make', 'do you develop', 'do you create',
  'web development', 'website', 'web app', 'webapp', 'mobile app', 'ios', 'android',
  'app development', 'ai', 'artificial intelligence', 'machine learning', 'ml',
  'deep learning', 'nlp', 'natural language', 'chatbot', 'automation',
  'cloud', 'aws', 'azure', 'gcp', 'devops', 'ui', 'ux', 'ui/ux', 'design',
  'digital transformation', 'digital marketing', 'seo', 'ecommerce', 'e-commerce',
  'erp', 'crm', 'saas', 'api', 'integration', 'maintenance', 'support',
  'software development', 'custom software', 'full stack', 'fullstack',
  'frontend', 'backend', 'database',
  // Technology
  'technology', 'technologies', 'tech stack', 'tools', 'stack',
  'react', 'next.js', 'nextjs', 'node', 'python', 'django', 'flask',
  'typescript', 'flutter', 'react native', 'tailwind', 'mongodb', 'postgresql',
  'docker', 'kubernetes', 'terraform',
  // Projects & Portfolio
  'project', 'projects', 'portfolio', 'work', 'case study', 'case studies',
  'showcase', 'examples', 'built', 'developed', 'delivered',
  // Pricing
  'price', 'pricing', 'cost', 'how much', 'rate', 'rates', 'quote', 'estimate',
  'budget', 'affordable', 'expensive', 'fee', 'fees', 'package', 'packages',
  'plan', 'plans', 'tier', 'tiers',
  // Contact & Consultation
  'contact', 'email', 'phone', 'call', 'reach', 'get in touch', 'talk',
  'consultation', 'consult', 'meeting', 'book', 'schedule', 'demo',
  'appointment', 'discuss', 'proposal',
  // Hiring
  'hire', 'hiring', 'career', 'careers', 'job', 'jobs', 'join', 'work with',
  'apply', 'application', 'resume', 'position', 'opening', 'openings',
  'internship', 'intern', 'remote', 'vacancy', 'vacancies',
  // Process
  'process', 'methodology', 'approach', 'agile', 'scrum', 'how do you work',
  'workflow', 'timeline', 'delivery', 'development process',
  // FAQ
  'faq', 'frequently asked', 'question', 'how long', 'how does',
  // Team
  'team', 'founder', 'developers', 'engineers', 'designers', 'members',
  // Greetings & General
  'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening',
  'thanks', 'thank you', 'bye', 'goodbye', 'help', 'assist',
  'what can you do', 'how can you help',
];

// ─── Classifier ─────────────────────────────────────────────

/**
 * Classify user input through a 4-layer guardrail.
 * Returns { allowed, reason?, category? }
 * 
 * Layer 1: Reject prompt injections
 * Layer 2: Reject code/homework requests
 * Layer 3: Allow if topic matches company categories
 * Layer 4: Reject everything else
 */
export function classifyMessage(message: string): GuardResult {
  const normalized = message.toLowerCase().trim();

  // Layer 1: Prompt injection detection
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(message)) {
      return {
        allowed: false,
        reason: "I appreciate your curiosity, but I'm designed to help exclusively with questions about NexGen Developers and our services. Is there anything about our company I can help you with?",
        category: 'injection',
      };
    }
  }

  // Layer 2: Code / homework request detection
  for (const pattern of CODE_PATTERNS) {
    if (pattern.test(message)) {
      return {
        allowed: false,
        reason: "I'm not able to help with coding, programming, or homework requests. I'm here specifically to answer questions about NexGen Developers — our services, projects, pricing, and more. How can I assist you with that?",
        category: 'code_request',
      };
    }
  }

  // Layer 3: Check if message matches allowed topics
  const matchesAllowed = ALLOWED_KEYWORDS.some(keyword => 
    normalized.includes(keyword.toLowerCase())
  );

  if (matchesAllowed) {
    return {
      allowed: true,
      category: 'company_related',
    };
  }

  // Layer 3.5: Check off-topic patterns
  for (const pattern of OFFTOPIC_PATTERNS) {
    if (pattern.test(message)) {
      return {
        allowed: false,
        reason: "I'm here to help with questions about NexGen Developers and our services. I can't assist with unrelated topics. Feel free to ask about our services, projects, pricing, or anything else about NexGen Developers!",
        category: 'off_topic',
      };
    }
  }

  // Layer 4: Short greetings and ambiguous short messages - allow them
  // (the AI will handle context within the system prompt)
  if (normalized.length < 50) {
    return {
      allowed: true,
      category: 'general_inquiry',
    };
  }

  // Layer 4: Default - reject longer unrecognized messages
  return {
    allowed: false,
    reason: "I'm here to help with questions about NexGen Developers and our services. I can't assist with unrelated requests. Feel free to ask about our services, projects, pricing, consultation, or hiring!",
    category: 'unrecognized',
  };
}
