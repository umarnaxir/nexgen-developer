"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup submitted:", formData);
    // Handle signup here
    onClose();
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

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-5 text-lg bg-black text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl"
        >
          Sign Up
        </motion.button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onClose}
            className="text-black hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </form>
    </Modal>
  );
}
