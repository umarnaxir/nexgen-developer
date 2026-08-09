"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AdminButton } from "./AdminButton";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onClose: () => void;
};

export function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Delete",
  loading,
  variant = "danger",
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            aria-label="Close"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="relative w-full max-w-md rounded-md border border-neutral-200 bg-white p-5 shadow-xl sm:p-6"
          >
            <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <AdminButton type="button" variant="secondary" onClick={onClose}>
                Cancel
              </AdminButton>
              <AdminButton
                type="button"
                variant={variant === "primary" ? "primary" : "danger"}
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? "Working…" : confirmLabel}
              </AdminButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
