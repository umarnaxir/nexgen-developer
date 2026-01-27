"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Shield, Users, AlertCircle, CheckCircle, PenTool, Link2, TrendingUp, UserCheck } from "lucide-react";

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600">Last updated: January 27, 2026</p>
            <p className="text-base text-gray-500 mt-2 max-w-3xl mx-auto">
              Please read these terms carefully before using our services. By accessing or using NexGen Developers, you agree to be bound by these terms.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Section 1: Acceptance of Terms */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    By accessing and using the NexGen Developers website, services, or platform, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    These Terms of Service ("Terms") govern your access to and use of our website, services, and any related applications (collectively, the "Service"). Your use of the Service constitutes your acceptance of these Terms.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 2: Use License */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">2. Use License</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Permission is granted to temporarily download one copy of the materials on NexGen Developers' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                    <li>Attempt to decompile or reverse engineer any software contained on NexGen Developers' website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    This license shall automatically terminate if you violate any of these restrictions and may be terminated by NexGen Developers at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 3: Services */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">3. Services</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    NexGen Developers provides comprehensive digital solutions including:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-2">Development Services</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Web Development</li>
                        <li>• Mobile App Development</li>
                        <li>• AI/ML Solutions</li>
                        <li>• Chatbot Development</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h3 className="font-bold text-black mb-2">Marketing & Design</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• SEO Services</li>
                        <li>• Graphic Design</li>
                        <li>• Digital Marketing</li>
                        <li>• Branding Solutions</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    All services are provided subject to separate service agreements. The scope, timeline, and pricing for each project will be detailed in a written agreement before work commences. We reserve the right to refuse service to anyone for any reason at any time.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 4: Write for Us Program */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-black p-8 rounded-xl text-white"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-white p-3 rounded-lg">
                  <PenTool className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">4. Write for Us Program</h2>
                  <p className="text-gray-200 leading-relaxed mb-6">
                    NexGen Developers offers a "Write for Us" program that allows content creators, bloggers, and businesses to submit guest posts and articles to our platform. This program provides opportunities for backlinks, business promotion, and content distribution.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-900 p-5 rounded-lg border border-gray-700">
                      <Link2 className="w-8 h-8 text-white mb-3" />
                      <h3 className="font-bold text-white mb-2">Get Backlinks</h3>
                      <p className="text-sm text-gray-300">
                        Earn valuable backlinks to your website or business when your content is published on our platform.
                      </p>
                    </div>
                    <div className="bg-gray-900 p-5 rounded-lg border border-gray-700">
                      <TrendingUp className="w-8 h-8 text-white mb-3" />
                      <h3 className="font-bold text-white mb-2">Promote Your Business</h3>
                      <p className="text-sm text-gray-300">
                        Showcase your expertise and promote your business to our engaged audience of developers and entrepreneurs.
                      </p>
                    </div>
                    <div className="bg-gray-900 p-5 rounded-lg border border-gray-700">
                      <UserCheck className="w-8 h-8 text-white mb-3" />
                      <h3 className="font-bold text-white mb-2">Work With Us</h3>
                      <p className="text-sm text-gray-300">
                        Build relationships and collaborate with our team while sharing your knowledge and insights.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
                    <h3 className="font-bold text-white mb-4 text-xl">How It Works</h3>
                    <ol className="space-y-3 text-gray-200">
                      <li className="flex items-start gap-3">
                        <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                        <span><strong className="text-white">Sign Up & Login:</strong> Create an account and log in to our platform to access the content submission system.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                        <span><strong className="text-white">Submit Your Content:</strong> After logging in, you can submit your blog posts, articles, or content pieces through our submission portal.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                        <span><strong className="text-white">Our Review Process:</strong> Our editorial team will review your submission for quality, relevance, and adherence to our content guidelines.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                        <span><strong className="text-white">Approval & Publication:</strong> Once approved, your content will be published on our platform with proper attribution and backlinks to your website or business.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                        <span><strong className="text-white">Promote & Share:</strong> You can share your published content on your own channels and leverage the backlinks for SEO benefits.</span>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-200 font-semibold mb-1">Important Guidelines:</p>
                        <ul className="text-sm text-yellow-100 space-y-1 list-disc pl-5">
                          <li>All content must be original and not previously published elsewhere</li>
                          <li>Content should be relevant to technology, development, business, or related topics</li>
                          <li>We reserve the right to edit, modify, or reject any submission</li>
                          <li>Approval is at our sole discretion and not guaranteed</li>
                          <li>Self-promotional content must be balanced with valuable, educational information</li>
                          <li>All submissions are subject to our editorial review and approval process</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 5: Intellectual Property */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">5. Intellectual Property</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The materials on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, are the property of NexGen Developers or its content suppliers and are protected by international copyright and trademark laws.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong className="text-black">For Guest Contributors:</strong> By submitting content to our "Write for Us" program, you grant NexGen Developers a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, adapt, publish, translate, and distribute your content in any media. You retain ownership of your original content but grant us the right to publish and promote it on our platform.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Unauthorized use of any materials on this website may violate copyright, trademark, and other laws. If you violate any of these restrictions, your permission to use the materials automatically terminates and you must immediately destroy any downloaded materials in your possession.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 6: User Accounts */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">6. User Accounts and Registration</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To access certain features of our Service, including the "Write for Us" program, you may be required to register for an account. When you register, you agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your password and identification</li>
                    <li>Accept all responsibility for activities that occur under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                    <li>Not share your account credentials with third parties</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to suspend or terminate your account at any time if you violate these Terms or engage in any fraudulent, abusive, or illegal activity.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 7: Content Guidelines */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">7. Content Guidelines and Prohibited Uses</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You agree not to use the Service to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>Post, upload, or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or invasive of another's privacy</li>
                    <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
                    <li>Upload or transmit any content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights</li>
                    <li>Upload or transmit any unsolicited or unauthorized advertising, promotional materials, spam, or junk mail</li>
                    <li>Upload or transmit any material containing software viruses or other harmful computer code</li>
                    <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
                    <li>Violate any applicable local, state, national, or international law</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right to remove any content that violates these guidelines without prior notice.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 8: Limitation of Liability */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">8. Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    In no event shall NexGen Developers, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                    <li>Your use or inability to use the Service</li>
                    <li>Any conduct or content of third parties on the Service</li>
                    <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
                    <li>Any interruption or cessation of transmission to or from the Service</li>
                    <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Our total liability to you for all claims arising from or related to the use of the Service shall not exceed the amount you paid to us, if any, for accessing the Service during the twelve (12) months prior to the claim.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 9: Indemnification */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">9. Indemnification</h2>
                  <p className="text-gray-700 leading-relaxed">
                    You agree to defend, indemnify, and hold harmless NexGen Developers and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of: (a) your use and access of the Service; (b) your violation of any term of these Terms; (c) your violation of any third party right, including without limitation any copyright, property, or privacy right; or (d) any claim that your content caused damage to a third party.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 10: Termination */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-gray-50 p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">10. Termination</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    If you wish to terminate your account, you may simply discontinue using the Service. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 11: Changes to Terms */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="bg-white p-8 rounded-xl border-2 border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-black p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-black mb-4">11. Changes to Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Section 12: Contact Information */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="bg-black p-8 rounded-xl text-white"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-white p-3 rounded-lg">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-4">12. Contact Information</h2>
                  <p className="text-gray-200 leading-relaxed mb-6">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
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
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
