"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ContactModal from "@/components/modals/ContactModal";
import ClientReviewsSection from "@/app/home/ClientReviewsSection";
import FAQSection from "@/app/home/FAQSection";

export default function AboutPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const values = [
    {
      title: "Innovation",
      description: "We stay ahead of the curve by adopting the latest technologies and best practices."
    },
    {
      title: "Excellence",
      description: "We deliver high-quality solutions that exceed expectations and drive results."
    },
    {
      title: "Collaboration",
      description: "We work closely with our clients to understand their needs and deliver tailored solutions."
    },
    {
      title: "Growth",
      description: "We help businesses grow by building scalable and sustainable digital solutions."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black mb-4">
              About NexGen Developers
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              Where Innovation Meets Excellence
            </p>
          </motion.div>

          {/* Main About Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold text-black mb-4">Who We Are</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  We are NexGen Developers, a collective of 5-10 engineering professionals from leading tech companies united to deliver premium freelance services. Our team combines diverse expertise with a passion for technological innovation, enabling us to tackle complex challenges with precision and creativity.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Based in Srinagar, Jammu and Kashmir, India, we work with clients globally, bringing world-class development expertise to startups and local businesses. With over 2 years of experience, we've successfully delivered numerous projects across various industries.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-black mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Our mission is to help startups and local businesses build high-quality digital solutions that drive growth and success in the digital landscape. We believe that every business, regardless of size, deserves access to professional-grade technology solutions.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We are freelancers helping startups and local businesses with AI/ML, chatbots, web & app development, SEO, and graphic design to create stunning digital experiences that make a lasting impact.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-black mb-4">What We Do</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  We specialize in full stack web development, mobile app development, AI/ML solutions, chatbot development, deployment & DevOps, maintenance & support, SEO & digital marketing, and graphic design. Our comprehensive approach ensures that we can handle every aspect of your digital presence.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  From initial concept and design to development, deployment, and ongoing maintenance, we provide end-to-end solutions that help your business thrive in the digital world.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-black mb-4">Our Approach</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  We follow an agile development methodology, ensuring transparent communication, regular updates, and iterative improvements. Our collaborative approach means you're involved in every step of the process, from planning to deployment.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We prioritize quality, performance, and user experience in everything we build. Every project is tailored to your specific needs, ensuring that the final product aligns perfectly with your business goals.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-black text-center mb-12">Why Choose NexGen Developers</h2>
            <div className="flex flex-wrap lg:flex-nowrap gap-6 justify-center">
              {/* Card 01 - Featured Card with Black Background */}
              <div className="bg-black p-8 rounded-xl w-full sm:w-[280px] lg:w-[300px] h-[400px] flex-shrink-0 flex flex-col justify-end">
                <div className="text-white font-bold text-lg mb-3">01.</div>
                <h3 className="text-white text-xl font-bold mb-4">Expert Team</h3>
                <p className="text-white text-base leading-relaxed">
                  5-10 experienced professionals from leading tech companies with diverse expertise.
                </p>
              </div>
              
              {/* Card 02 */}
              <div className="group bg-white p-8 rounded-xl border border-gray-300 w-full sm:w-[280px] lg:w-[300px] h-[400px] flex-shrink-0 flex flex-col justify-end transition-all duration-300 hover:bg-black  cursor-pointer">
                <div className="text-black font-bold text-lg mb-3 group-hover:text-white transition-colors duration-300">02.</div>
                <h3 className="text-black text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">Full Stack Solutions</h3>
                <p className="text-gray-700 text-base leading-relaxed max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden group-hover:text-white">
                  Complete end-to-end development from frontend to backend, deployment, and maintenance.
                </p>
              </div>
              
              {/* Card 03 */}
              <div className="group bg-white p-8 rounded-xl border border-gray-300 w-full sm:w-[280px] lg:w-[300px] h-[400px] flex-shrink-0 flex flex-col justify-end transition-all duration-300 hover:bg-black  cursor-pointer">
                <div className="text-black font-bold text-lg mb-3 group-hover:text-white transition-colors duration-300">03.</div>
                <h3 className="text-black text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">Affordable Pricing</h3>
                <p className="text-gray-700 text-base leading-relaxed max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden group-hover:text-white">
                  Competitive rates with flexible pricing models tailored to your budget and needs.
                </p>
              </div>
              
              {/* Card 04 */}
              <div className="group bg-white p-8 rounded-xl border border-gray-300 w-full sm:w-[280px] lg:w-[300px] h-[400px] flex-shrink-0 flex flex-col justify-end transition-all duration-300 hover:bg-black  cursor-pointer">
                <div className="text-black font-bold text-lg mb-3 group-hover:text-white transition-colors duration-300">04.</div>
                <h3 className="text-black text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">Fast Delivery</h3>
                <p className="text-gray-700 text-base leading-relaxed max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden group-hover:text-white">
                  Efficient project management ensuring timely delivery without compromising quality.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-black text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  className="bg-white p-8 rounded-xl border border-gray-300 h-[280px] flex flex-col justify-end hover:bg-black transition-all duration-300 cursor-pointer group"
                >
                  <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-white transition-colors duration-300">{value.title}</h3>
                  <p className="text-gray-700 group-hover:text-white leading-relaxed transition-colors duration-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-black text-center mb-12">Pricing & Packages</h2>
            <div>
              <div className="bg-gray-50 p-8 rounded-xl border-2 border-black">
                <h3 className="text-2xl font-bold text-black mb-6 text-center">Flexible Pricing Options</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
                    <h4 className="text-xl font-bold text-black mb-3">Project-Based</h4>
                    <p className="text-gray-700 text-sm mb-4">Fixed price for complete projects</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Clear scope & timeline</li>
                      <li>• One-time payment</li>
                      <li>• Perfect for specific needs</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
                    <h4 className="text-xl font-bold text-black mb-3">Hourly Rate</h4>
                    <p className="text-gray-700 text-sm mb-4">Pay for actual time worked</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Flexible scope</li>
                      <li>• Transparent billing</li>
                      <li>• Ideal for ongoing work</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-lg border-2 border-gray-300">
                    <h4 className="text-xl font-bold text-black mb-3">Monthly Retainer</h4>
                    <p className="text-gray-700 text-sm mb-4">Dedicated support & maintenance</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Priority support</li>
                      <li>• Regular updates</li>
                      <li>• Long-term partnership</li>
                    </ul>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-4">
                    <strong className="text-black">Custom Quotes Available:</strong> Every project is unique, and we provide personalized pricing based on your specific requirements, timeline, and complexity.
                  </p>
                  <p className="text-base text-gray-600">
                    Contact us for a detailed quote tailored to your project needs. We offer competitive rates and flexible payment options to suit businesses of all sizes.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center bg-gray-50 p-8 rounded-xl border-2 border-black">
                <p className="text-4xl font-bold text-black mb-2">2+</p>
                <p className="text-lg text-gray-700">Years of Excellence</p>
              </div>
              <div className="text-center bg-gray-50 p-8 rounded-xl border-2 border-black">
                <p className="text-4xl font-bold text-black mb-2">50+</p>
                <p className="text-lg text-gray-700">Projects Completed</p>
              </div>
              <div className="text-center bg-gray-50 p-8 rounded-xl border-2 border-black">
                <p className="text-4xl font-bold text-black mb-2">9</p>
                <p className="text-lg text-gray-700">Team Members</p>
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-black mb-4">Ready to Start Your Project?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Get in touch with us today for a free consultation and custom quote. Let's discuss how we can help bring your digital vision to life.
            </p>
            <motion.button
              onClick={() => setIsContactModalOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl"
            >
              Contact Us Now
            </motion.button>
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
          </motion.div>
        </div>
      </section>

      {/* Client Reviews Section */}
      <ClientReviewsSection />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
}
