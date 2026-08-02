"use client";

import { motion } from "framer-motion";

const QUESTIONS = [
  "What services do you provide?",
  "Can you build an AI solution?",
  "How much does a website cost?",
  "I need a mobile application",
  "Book a consultation",
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  visible: boolean;
}

export default function SuggestedQuestions({ onSelect, visible }: SuggestedQuestionsProps) {
  if (!visible) return null;

  return (
    <div className="px-4 pb-2 pt-1">
      <p className="text-[10px] text-white/30 font-medium uppercase tracking-wider mb-2">
        Suggested
      </p>
      <div className="flex flex-wrap gap-1.5">
        {QUESTIONS.map((q, i) => (
          <motion.button
            key={q}
            onClick={() => onSelect(q)}
            className="px-3 py-1.5 text-[11px] font-medium rounded-full
              bg-white/[0.04] border border-white/[0.08] text-white/60
              hover:bg-teal-500/10 hover:border-teal-500/20 hover:text-teal-300
              transition-colors cursor-pointer whitespace-nowrap"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {q}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
