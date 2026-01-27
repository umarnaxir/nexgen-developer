"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Modal from "@/components/ui/Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    // Handle login here
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login" size="auth">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="email"
            id="login-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
            required
          />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="login-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-5 py-4 pr-12 text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>
          <a href="#" className="text-sm text-black hover:underline font-medium">
            Forgot password?
          </a>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-5 text-lg bg-black text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl"
        >
          Login
        </motion.button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onClose}
            className="text-black hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </form>
    </Modal>
  );
}
