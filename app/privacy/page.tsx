"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Database, Eye, Lock, Share2, Cookie, UserCheck, Mail, Globe, AlertCircle, CheckCircle, FileText, TrendingUp } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">Last updated: January 27, 2026</p>
            <p className="text-base text-gray-500 mt-2 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, protect, and share your personal information when you use our services.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Section 1: Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">1. Introduction</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    NexGen Developers ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or participate in our "Write for Us" program.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By using our Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Service.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 2: Information We Collect */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">2. Information We Collect</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We may collect information about you in a variety of ways. The information we may collect includes:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-3 flex items-center gap-2">
                        <UserCheck className="w-5 h-5" />
                        Personal Information
                      </h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Name and contact information (email, phone number)</li>
                        <li>• Business name and website URL</li>
                        <li>• Billing address and payment information</li>
                        <li>• Profile information and preferences</li>
                        <li>• Account credentials (username, password)</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-3 flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Usage & Technical Data
                      </h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• IP address and device information</li>
                        <li>• Browser type and version</li>
                        <li>• Pages visited and time spent</li>
                        <li>• Referring website addresses</li>
                        <li>• Clickstream data and navigation patterns</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                    <h3 className="font-bold text-black mb-3 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Content Submission Data (Write for Us Program)
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      When you participate in our "Write for Us" program, we collect:
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Submitted blog posts, articles, and content</li>
                      <li>• Author bio and professional information</li>
                      <li>• Website URLs for backlinks</li>
                      <li>• Social media profiles (if provided)</li>
                      <li>• Communication history regarding submissions</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-black mb-3 flex items-center gap-2">
                      <Cookie className="w-5 h-5" />
                      Cookies and Tracking Technologies
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
                    </p>
                    <p className="text-sm text-gray-700">
                      Types of cookies we use: Essential cookies, Analytics cookies, Functionality cookies, and Marketing cookies.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 3: How We Use Your Information */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">3. How We Use Your Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We use the information we collect for various purposes:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <CheckCircle className="w-6 h-6 text-black mb-3" />
                      <h3 className="font-bold text-black mb-2">Service Delivery</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Provide and maintain our services</li>
                        <li>• Process transactions and payments</li>
                        <li>• Manage user accounts</li>
                        <li>• Respond to inquiries and support requests</li>
                      </ul>
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <Mail className="w-6 h-6 text-black mb-3" />
                      <h3 className="font-bold text-black mb-2">Communication</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Send service-related notifications</li>
                        <li>• Marketing communications (with consent)</li>
                        <li>• Newsletter and updates</li>
                        <li>• Important policy changes</li>
                      </ul>
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <TrendingUp className="w-6 h-6 text-black mb-3" />
                      <h3 className="font-bold text-black mb-2">Analytics & Improvement</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Analyze usage patterns and trends</li>
                        <li>• Improve website functionality</li>
                        <li>• Enhance user experience</li>
                        <li>• Develop new features</li>
                      </ul>
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <FileText className="w-6 h-6 text-black mb-3" />
                      <h3 className="font-bold text-black mb-2">Content Management</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Review and publish guest content</li>
                        <li>• Manage "Write for Us" submissions</li>
                        <li>• Process backlink requests</li>
                        <li>• Maintain content quality</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-800 font-semibold mb-1">Legal Basis for Processing</p>
                        <p className="text-sm text-yellow-700">
                          We process your personal information based on: (1) your consent, (2) performance of a contract, (3) compliance with legal obligations, (4) protection of vital interests, (5) legitimate business interests, and (6) public interest.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 4: Information Sharing and Disclosure */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">4. Information Sharing and Disclosure</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                  </p>
                  
                  <div className="space-y-4 mb-4">
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-2">Service Providers</h3>
                      <p className="text-sm text-gray-700">
                        We may share information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service. These providers are contractually obligated to protect your information.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-2">Business Transfers</h3>
                      <p className="text-sm text-gray-700">
                        If we are involved in a merger, acquisition, or asset sale, your information may be transferred. We will provide notice before your information is transferred and becomes subject to a different privacy policy.
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-2">Legal Requirements</h3>
                      <p className="text-sm text-gray-700">
                        We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or government agency).
                      </p>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-2">Published Content (Write for Us)</h3>
                      <p className="text-sm text-gray-700">
                        When you submit content through our "Write for Us" program and it is approved and published, your name, bio, and website links will be publicly displayed on our website as part of the published content. This is necessary for attribution and backlink purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 5: Data Security */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">5. Data Security</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <Lock className="w-6 h-6 text-black mb-3" />
                      <h3 className="font-bold text-black mb-2">Encryption</h3>
                      <p className="text-sm text-gray-700">
                        We use SSL/TLS encryption to protect data in transit and encryption at rest for sensitive information.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <Shield className="w-6 h-6 text-black mb-3" />
                      <h3 className="font-bold text-black mb-2">Access Controls</h3>
                      <p className="text-sm text-gray-700">
                        Limited access to personal information on a need-to-know basis with strong authentication requirements.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-gray-200">
                      <Database className="w-6 h-6 text-black mb-3" />
                      <h3 className="font-bold text-black mb-2">Secure Storage</h3>
                      <p className="text-sm text-gray-700">
                        Data stored on secure servers with regular backups and monitoring for security threats.
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-800 font-semibold mb-1">Important Security Note</p>
                        <p className="text-sm text-yellow-700">
                          While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security, but we are committed to maintaining the highest standards of data protection.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 6: Your Privacy Rights */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">6. Your Privacy Rights</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-3">Access & Portability</h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Request access to your personal data</li>
                        <li>• Receive a copy of your data in a portable format</li>
                        <li>• Know what information we hold about you</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-3">Correction & Deletion</h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Request correction of inaccurate data</li>
                        <li>• Request deletion of your personal information</li>
                        <li>• Update your account information</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-3">Consent & Objection</h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Withdraw consent for data processing</li>
                        <li>• Object to certain types of processing</li>
                        <li>• Opt-out of marketing communications</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-3">Restriction & Complaint</h3>
                      <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Request restriction of processing</li>
                        <li>• File a complaint with data protection authorities</li>
                        <li>• Request data processing information</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    To exercise any of these rights, please contact us using the contact information provided at the end of this policy. We will respond to your request within a reasonable timeframe and in accordance with applicable laws.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 7: Data Retention */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">7. Data Retention</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                  </p>
                  <div className="bg-white p-5 rounded-lg border border-gray-200 mb-4">
                    <h3 className="font-bold text-black mb-3">Retention Periods:</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• <strong>Account Information:</strong> Retained while your account is active and for 3 years after account closure</li>
                      <li>• <strong>Published Content:</strong> Retained indefinitely as part of our published content archive</li>
                      <li>• <strong>Transaction Records:</strong> Retained for 7 years for accounting and legal compliance</li>
                      <li>• <strong>Marketing Data:</strong> Retained until you unsubscribe or request deletion</li>
                      <li>• <strong>Analytics Data:</strong> Retained in aggregated, anonymized form indefinitely</li>
                    </ul>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    When we no longer need your personal information, we will securely delete or anonymize it, except where we are required to retain it for legal, regulatory, or legitimate business purposes.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 8: International Data Transfers */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">8. International Data Transfers</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ from those in your jurisdiction.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    If you are located outside India and choose to provide information to us, please note that we transfer the data, including personal information, to India and process it there. By submitting your personal information, you consent to this transfer, storage, and processing.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 9: Children's Privacy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">9. Children's Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately. If we become aware that we have collected personal information from children under 18 without verification of parental consent, we will take steps to remove that information from our servers.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 10: Changes to Privacy Policy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-white p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">10. Changes to This Privacy Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page. We will also notify you via email and/or a prominent notice on our Service if the changes are material.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 11: Contact Us */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-black p-8 rounded-xl text-white"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-white p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">11. Contact Us</h2>
                  <p className="text-gray-200 leading-relaxed mb-6">
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                    <p className="text-gray-200 mb-3">
                      <strong className="text-white">NexGen Developers</strong>
                    </p>
                    <p className="text-gray-200 mb-2">
                      <strong className="text-white">Email:</strong> nexgendevelopers11@gmail.com
                    </p>
                    <p className="text-gray-200 mb-2">
                      <strong className="text-white">Phone:</strong> +91 600-616-1726
                    </p>
                    <p className="text-gray-200">
                      <strong className="text-white">Location:</strong> Srinagar, Jammu and Kashmir, India
                    </p>
                  </div>
                  <p className="text-gray-200 mt-6 text-sm">
                    For privacy-related requests, please include "Privacy Request" in the subject line of your email for faster processing.
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
