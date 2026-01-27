"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";
import Select from "@/components/ui/Select";

export default function ContactSection() {
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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // If not JSON, read as text to see what we got
        const text = await response.text();
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Success toast
      toast.success("Message sent successfully!", {
        description: "We'll get back to you soon.",
        duration: 4000,
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: ""
      });
    } catch (error) {
      // Error toast
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Please try again later.",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4 px-4">
            <Image 
              src="/images/contact-icon.png" 
              alt="Contact icon" 
              width={48} 
              height={48}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
            />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black">
              Contact Us
            </h2>
          </div>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 text-center">
            Ready to bring your ideas to life? We're here to help you succeed.
          </p>
        </motion.div>

        <div>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-black mb-6 sm:mb-8 text-center">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
                    required
                  />
                </motion.div>
              </div>

              {/* Row 2: Phone and Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Select
                    options={serviceOptions}
                    value={formData.service}
                    onChange={(value) => setFormData({ ...formData, service: value })}
                    placeholder="Select a Service"
                    required
                  />
                </motion.div>
              </div>

              {/* Message Textarea */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project"
                  rows={4}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg outline-none transition-all resize-none placeholder:text-black text-black"
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="pt-2"
              >
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.03, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                  className="w-full px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg bg-black text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black/20 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
