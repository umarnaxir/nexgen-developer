"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import Modal from "@/components/ui/Modal";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please make sure both passwords are the same.",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    // Show toast that waits for approval
    const signupPromise = new Promise((resolve, reject) => {
      // Simulate API call - in real app, this would be your actual signup API
      setTimeout(() => {
        // For demo purposes, we'll auto-approve after 2 seconds
        // In production, this would wait for actual admin approval
        resolve({ success: true, message: "Signup request submitted" });
      }, 2000);
    });

    toast.promise(signupPromise, {
      loading: "Wait for our approval...",
      success: (data: any) => {
        setIsSubmitting(false);
        onClose();
        return "Wait for our approval";
      },
      error: (error) => {
        setIsSubmitting(false);
        return "Wait for our approval";
      },
    });

    try {
      await signupPromise;
    } catch (error) {
      // Error handled in toast
    }
  };

  const handleSwitchToLogin = () => {
    onClose();
    if (onSwitchToLogin) {
      onSwitchToLogin();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign Up" size="auth">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            id="signup-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
            required
          />
        </div>

        <div>
          <input
            type="email"
            id="signup-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
            required
          />
        </div>

        <div>
          <input
            type="password"
            id="signup-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
            required
          />
        </div>

        <div>
          <input
            type="password"
            id="signup-confirm"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
            required
          />
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="terms" className="mr-2" required />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the{" "}
            <a href="/terms" className="text-black hover:underline font-medium">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-black hover:underline font-medium">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-5 text-lg bg-black text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={handleSwitchToLogin}
            className="text-black hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </form>
    </Modal>
  );
}
