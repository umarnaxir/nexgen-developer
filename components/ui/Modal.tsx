"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: "sm" | "md" | "default" | "large" | "xl" | "auth";
}

export default function Modal({ isOpen, onClose, children, title, size = "default" }: ModalProps) {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    default: "max-w-4xl",
    large: "max-w-5xl",
    xl: "max-w-5xl w-[95vw] sm:w-[90vw] md:w-[80vw]",
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
  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Backdrop - Fixed and Blurred, with horizontal padding on mobile */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-lg z-[9999] flex items-center justify-center px-5 py-4 sm:p-6"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          margin: 0
        }}
      >
        {/* Modal Content - Centered, touch-friendly on mobile */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`glass !bg-[#0a0c0d]/95 light:!bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} ${size === "auth" ? "min-h-[400px] sm:min-h-[600px] flex" : "flex flex-col"} max-h-[85vh] sm:max-h-[90vh] overflow-hidden relative mx-auto touch-manipulation`}
          style={{ margin: 'auto' }}
        >
          {size === "auth" ? (
            <>
              {/* Left Side - Logo */}
              <div className="hidden lg:flex w-1/2 bg-white/[0.03] light:bg-gray-100 items-center justify-center p-8 border-r border-white/[0.08] light:border-gray-200">
                <div className="text-center w-full max-w-xs">
                  <Image
                    src="/logo/logo.png"
                    alt="NexGen Developers Logo"
                    width={520}
                    height={170}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-full lg:w-1/2 flex flex-col min-h-0">
                {/* Header with Close Button - responsive px for mobile */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/[0.08] light:border-gray-200 flex-shrink-0">
                  {title && (
                    <h2 className="text-xl sm:text-2xl font-bold text-white light:text-gray-900">{title}</h2>
                  )}
                  <button
                    onClick={onClose}
                    className="ml-auto p-2.5 -mr-1 min-w-[44px] min-h-[44px] hover:bg-white/10 light:hover:bg-gray-100 rounded-full transition-colors hover:scale-110 hover:rotate-90 active:scale-95 flex items-center justify-center touch-manipulation"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6 text-silver-light light:text-gray-700" />
                  </button>
                </div>

                {/* Content - scrollable on mobile with overscroll containment */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 py-5 sm:p-6 min-h-0 text-silver light:text-gray-600">
                  {children}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Header with Close Button - responsive px for mobile */}
              <div className="sticky top-0 bg-[#0a0c0d]/95 light:bg-white border-b border-white/[0.08] light:border-gray-200 backdrop-blur-xl px-5 sm:px-6 py-4 flex items-center justify-between z-10 w-full flex-shrink-0">
                {title && (
                  <h2 className="text-xl sm:text-2xl font-bold text-white light:text-gray-900">{title}</h2>
                )}
                <button
                  onClick={onClose}
                  className="ml-auto p-2.5 -mr-1 min-w-[44px] min-h-[44px] hover:bg-white/10 light:hover:bg-gray-100 rounded-full transition-colors hover:scale-110 hover:rotate-90 active:scale-95 flex items-center justify-center touch-manipulation"
                  aria-label="Close"
                >
                  <X className="w-6 h-6 text-silver-light light:text-gray-700" />
                </button>
              </div>

              {/* Content - scrollable on mobile with overscroll containment */}
              <div className="px-5 py-5 sm:p-8 w-full overflow-y-auto overflow-x-hidden overscroll-contain min-h-0 text-silver light:text-gray-600">
                {children}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}
