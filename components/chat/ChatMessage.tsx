"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { type Message } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

function ChatMessageComponent({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`flex items-start gap-2.5 px-4 py-1.5 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
      initial={{ opacity: 0, y: 10, x: isUser ? 12 : -12 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      layout
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center mt-0.5 ${
          isUser
            ? "bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20"
            : "bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-500/20"
        }`}
      >
        {isUser ? (
          <User className="w-3 h-3 text-blue-400" />
        ) : (
          <Bot className="w-3 h-3 text-teal-400" />
        )}
      </div>

      {/* Message Bubble */}
      <div
        className={`max-w-[80%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
          isUser
            ? "rounded-2xl rounded-tr-sm bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/10"
            : "rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/[0.06] text-white/85"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <div className="chat-markdown prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Style markdown elements for chat context
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0 text-[13px] leading-relaxed text-white/85">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="mb-2 last:mb-0 ml-3 space-y-0.5 list-disc text-white/80">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-2 last:mb-0 ml-3 space-y-0.5 list-decimal text-white/80">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[13px] leading-relaxed">{children}</li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors"
                  >
                    {children}
                  </a>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-semibold text-white mt-3 mb-1.5">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-[13px] font-semibold text-white mt-2 mb-1">
                    {children}
                  </h4>
                ),
                code: ({ children }) => (
                  <code className="text-[11px] px-1.5 py-0.5 rounded bg-white/10 text-teal-300 font-mono">
                    {children}
                  </code>
                ),
                hr: () => <hr className="my-2 border-white/10" />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default memo(ChatMessageComponent);
