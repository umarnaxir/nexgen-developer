"use client";

import React, { useState } from "react";
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
    <section id="contact" className="py-12 sm:py-16 md:py-20" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div 
          className="mb-10 sm:mb-12 md:mb-16"
          data-aos="zoom-in"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4 px-4">
            <Image 
              src="/images/common/contact-icon.png" 
              alt="Contact icon" 
              width={48} 
              height={48}
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))' }}
            />
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black"
              style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.6)' }}
            >
              Contact Us
            </h2>
          </div>
          <p 
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 text-center"
            style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5)' }}
          >
            Ready to bring your ideas to life? We're here to help you succeed.
          </p>
        </div>

        <div data-aos="zoom-in">
          {/* Contact Form */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-black mb-6 sm:mb-8 text-center">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Phone and Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg outline-none transition-all placeholder:text-black text-black bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
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
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project"
                  rows={4}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg outline-none transition-all resize-none placeholder:text-black text-black bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20"
                  required
                />
              </div>

              {/* Submit Button */}
              <div
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg bg-black text-white font-bold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-teal-400/30 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
