"use client";

import React from "react";
import { LogOut, X } from "lucide-react";
import Modal from "@/components/ui/Modal";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export default function LogoutModal({ isOpen, onClose, onConfirm, userName }: LogoutModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="sm">
      <div className="text-center py-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogOut className="w-8 h-8 text-red-600" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Confirm Logout
        </h3>
        
        <p className="text-gray-600 mb-6">
          {userName ? (
            <>Are you sure you want to logout, <span className="font-semibold">{userName}</span>?</>
          ) : (
            "Are you sure you want to logout?"
          )}
        </p>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </Modal>
  );
}
