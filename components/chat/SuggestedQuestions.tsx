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

export default function SuggestedQuestions({
  onSelect,
  visible,
}: SuggestedQuestionsProps) {
  if (!visible) return null;

  return (
    <div className="px-3.5 pt-2 pb-1">
      <motion.p
        className="text-[9px] text-white/30 font-medium uppercase tracking-[0.12em] mb-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Suggested
      </motion.p>

      <div className="flex flex-col gap-0.5">
        {QUESTIONS.map((q, i) => (
          <motion.button
            key={q}
            onClick={() => onSelect(q)}
            className="w-full text-left py-1 text-[11px] font-medium
              text-white/55 hover:text-gold-light
              transition-colors cursor-pointer truncate"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25 + i * 0.05,
              duration: 0.25,
              ease: [0.23, 1, 0.32, 1],
            }}
            whileTap={{ scale: 0.98 }}
          >
            {q}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
