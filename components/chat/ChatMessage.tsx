"use client";

import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
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
      className={`flex items-start gap-2 px-3 py-1 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
      initial={{ opacity: 0, y: 10, x: isUser ? 12 : -12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      layout
    >
      <motion.div
        className={`flex-shrink-0 w-5.5 h-5.5 rounded-md overflow-hidden flex items-center justify-center mt-0.5 ${
          isUser
            ? "bg-gradient-to-br from-blue-500/25 to-indigo-500/25 border border-blue-400/25"
            : "bg-black border border-cyan-400/20 shadow-[0_0_8px_rgba(34,211,238,0.12)]"
        }`}
        style={{ width: 22, height: 22 }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.04 }}
      >
        {isUser ? (
          <User className="w-3 h-3 text-blue-300" />
        ) : (
          <Image
            src="/images/ai-icon.png"
            alt="AI"
            width={22}
            height={22}
            className="object-cover"
          />
        )}
      </motion.div>

      <motion.div
        className={`relative max-w-[82%] px-2.5 py-2 text-[11.5px] leading-relaxed ${
          isUser
            ? "rounded-xl rounded-tr-sm bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-md shadow-cyan-500/10"
            : "rounded-xl rounded-tl-sm bg-white/[0.045] border border-white/[0.08] text-white/85"
        }`}
      >
        {!isUser && (
          <span className="pointer-events-none absolute inset-x-2.5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />
        )}

        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <div className="chat-markdown prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-1.5 last:mb-0 text-[11.5px] leading-relaxed text-white/85">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="mb-1.5 last:mb-0 ml-3 space-y-0.5 list-disc text-white/80">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-1.5 last:mb-0 ml-3 space-y-0.5 list-decimal text-white/80">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-[11.5px] leading-relaxed">{children}</li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
                  >
                    {children}
                  </a>
                ),
                h3: ({ children }) => (
                  <h3 className="text-[12px] font-semibold text-white mt-2 mb-1">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-[11.5px] font-semibold text-white mt-1.5 mb-0.5">
                    {children}
                  </h4>
                ),
                code: ({ children }) => (
                  <code className="text-[10px] px-1 py-0.5 rounded bg-white/10 text-cyan-300 font-mono">
                    {children}
                  </code>
                ),
                hr: () => <hr className="my-1.5 border-white/10" />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default memo(ChatMessageComponent);
