"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
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

  const serviceOptions = [
    { value: "", label: "Select a Service" },
    { value: "web-development", label: "Web Development" },
    { value: "app-development", label: "App Development" },
    { value: "ai-ml", label: "AI & ML Solutions" },
    { value: "chatbot", label: "Chatbot Development" },
    { value: "seo-marketing", label: "SEO & Digital Marketing" },
    { value: "graphic-design", label: "Graphic Design" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    onClose();
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
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-4 text-base bg-black text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl"
        >
          Send Message
        </motion.button>
      </form>
    </Modal>
  );
}
