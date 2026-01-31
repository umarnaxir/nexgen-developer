"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { canAccessAdmin } from "@/types/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup?: () => void;
}

export default function LoginModal({ isOpen, onClose, onSwitchToSignup }: LoginModalProps) {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await login({
        username: formData.username,
        password: formData.password,
      });

      if (result.success) {
        toast.success("Login successful!");
        onClose();
        // Reset form
        setFormData({ username: "", password: "" });
        // Redirect to admin if user has admin access
        // We need to get the user from auth state to check role
        const authData = localStorage.getItem("nexgen_auth");
        if (authData) {
          const { user } = JSON.parse(authData);
          if (user && canAccessAdmin(user.role)) {
            router.push("/admin");
          }
        }
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSwitchToSignup = () => {
    onClose();
    if (onSwitchToSignup) {
      onSwitchToSignup();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login" size="auth">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            id="login-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-5 text-lg bg-black text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={handleSwitchToSignup}
            className="text-black hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </form>
    </Modal>
  );
}
