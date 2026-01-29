"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = [
    { value: "", label: "Select a Service" },
    { value: "web-development", label: "Web Development" },
    { value: "app-development", label: "App Development" },
    { value: "ai-ml", label: "AI & ML Solutions" },
    { value: "chatbot", label: "Chatbot Development" },
    { value: "seo-marketing", label: "SEO & Digital Marketing" },
    { value: "graphic-design", label: "Graphic Design" },
    { value: "other", label: "Other Services" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s so server has time to connect to SMTP

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get("content-type");
      let data: { error?: string; details?: string; message?: string };

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || `Server error: ${response.status}`);
      }

      if (!response.ok) {
        const msg = data.details ? `${data.error} (${data.details})` : (data.error || "Failed to send message");
        throw new Error(msg);
      }

      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
        duration: 4000,
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: ""
      });

      onClose();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.name === "AbortError"
            ? "Request took too long. Please try again."
            : error.message
          : "Please try again later.";
      toast.error("Failed to send message", {
        description: message,
        duration: 5000,
      });
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Us" size="default">
      <form onSubmit={handleSubmit} className="space-y-4 p-2">
        {/* Row 1: Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              id="modal-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
              required
            />
          </div>

          <div>
            <input
              type="email"
              id="modal-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
              required
            />
          </div>
        </div>

        {/* Row 2: Phone and Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="tel"
              id="modal-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
              required
            />
          </div>

          <div>
            <Select
              options={serviceOptions}
              value={formData.service}
              onChange={(value) => setFormData({ ...formData, service: value })}
              placeholder="Select a Service"
              required
            />
          </div>
        </div>

        {/* Message Textarea */}
        <div>
          <textarea
            id="modal-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project"
            rows={4}
            className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg outline-none transition-all resize-none placeholder:text-black text-black"
            required
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
          className="w-full px-8 py-4 text-base bg-black text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </Modal>
  );
}
