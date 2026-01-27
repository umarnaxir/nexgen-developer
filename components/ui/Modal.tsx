"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "default" | "large" | "auth";
}

export default function Modal({ isOpen, onClose, children, title, size = "default" }: ModalProps) {
  const sizeClasses = {
    default: "max-w-4xl",
    large: "max-w-5xl",
    auth: "max-w-6xl"
  };
  
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Fixed and Blurred */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-lg z-[9999] flex items-center justify-center p-4"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              margin: 0,
              padding: 0
            }}
          >
            {/* Modal Content - Centered */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-white rounded-lg shadow-2xl w-full ${sizeClasses[size]} ${size === "auth" ? "min-h-[600px] flex" : "flex flex-col"} max-h-[90vh] overflow-hidden relative mx-auto`}
              style={{ margin: 'auto' }}
            >
              {size === "auth" ? (
                <>
                  {/* Left Side - Logo */}
                  <div className="hidden lg:flex w-1/2 bg-gray-50 items-center justify-center p-8 border-r border-gray-200">
                    <div className="text-center w-full max-w-xs">
                      <Image
                        src="/images/ND.png"
                        alt="NexGen Developers Logo"
                        width={520}
                        height={170}
                        className="w-full h-auto object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Right Side - Form */}
                  <div className="w-full lg:w-1/2 flex flex-col min-h-[600px]">
                    {/* Header with Close Button */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                      {title && (
                        <h2 className="text-2xl font-bold text-black">{title}</h2>
                      )}
                      <motion.button
                        onClick={onClose}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close"
                      >
                        <X className="w-6 h-6 text-black" />
                      </motion.button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                      {children}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Header with Close Button */}
                  <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10 w-full">
                    {title && (
                      <h2 className="text-2xl font-bold text-black">{title}</h2>
                    )}
                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-6 h-6 text-black" />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="p-8 w-full overflow-y-auto">
                    {children}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
