"use client";

import { Shield, Database, Eye, Lock, Share2, Cookie, UserCheck, FileText } from "lucide-react";
import PrivacySection from "./PrivacySection";

export default function PrivacySections() {
 return (
 <>
 <PrivacySection icon={Shield} title="1. Introduction" delay={0}>
 <p className="mb-3 sm:mb-4">
 NexGen (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is a service-based team of freelance developers and designers. We help startups and local brands with AI/ML, chatbots, web &amp; app development, and digital marketing, crafting digital experiences that stand out and deliver results. We are committed to protecting your privacy and ensuring the security of your personal information.
 </p>
 <p className="mb-3 sm:mb-4">
 This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, read our blog, or contact us to request a quote or support.
 </p>
 <p>By using our Service, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Service.</p>
 </PrivacySection>

 <PrivacySection icon={Database} title="2. Information We Collect" delay={0.1} altBg>
 <p className="mb-4 sm:mb-6">We may collect information about you in a variety of ways. The information we may collect includes:</p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
 <div className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 sm:p-5 lg:p-6">
 <h3 className="font-bold text-sm sm:text-base text-black mb-2 sm:mb-3 flex items-center gap-2">
 <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gold-dark" />
 Personal Information
 </h3>
 <ul className="text-xs sm:text-sm text-black/60 space-y-1.5 sm:space-y-2 marker:text-gold-dark">
 <li>• Name and contact information (email, phone number)</li>
 <li>• Business name and website URL</li>
 <li>• Billing address and payment information</li>
 <li>• Project requirements and preferences</li>
 </ul>
 </div>
 <div className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 sm:p-5 lg:p-6">
 <h3 className="font-bold text-sm sm:text-base text-black mb-2 sm:mb-3 flex items-center gap-2">
 <Eye className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gold-dark" />
 Usage & Technical Data
 </h3>
 <ul className="text-xs sm:text-sm text-black/60 space-y-1.5 sm:space-y-2 marker:text-gold-dark">
 <li>• IP address and device information</li>
 <li>• Browser type and version</li>
 <li>• Pages visited and time spent</li>
 <li>• Referring website addresses</li>
 <li>• Clickstream data and navigation patterns</li>
 </ul>
 </div>
 </div>
 <div className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6">
 <h3 className="font-bold text-sm sm:text-base text-black mb-2 sm:mb-3 flex items-center gap-2">
 <FileText className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gold-dark" />
 Communication &amp; Inquiry Data
 </h3>
 <p className="mb-2 sm:mb-3">When you contact us or request a quote through our contact form or by email, we may collect: your name and contact details; details about your project or inquiry; any files or information you choose to share; and our communication history with you.</p>
 </div>
 <div className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 sm:p-5 lg:p-6">
 <h3 className="font-bold text-sm sm:text-base text-black mb-2 sm:mb-3 flex items-center gap-2">
 <Cookie className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gold-dark" />
 Cookies and Tracking Technologies
 </h3>
 <p className="mb-2 sm:mb-3">We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Types of cookies we use: Essential cookies, Analytics cookies, Functionality cookies, and Marketing cookies.</p>
 </div>
 </PrivacySection>

 <PrivacySection icon={Eye} title="3. How We Use Your Information" delay={0.2}>
 <p className="mb-4 sm:mb-6">We use the information we collect for various purposes including service delivery, responding to inquiries and quote requests, communication, and analytics &amp; improvement. We process your personal information based on: your consent, performance of a contract, compliance with legal obligations, protection of vital interests, legitimate business interests, and public interest.</p>
 </PrivacySection>

 <PrivacySection icon={Share2} title="4. Information Sharing and Disclosure" delay={0.3} altBg>
 <p className="mb-3 sm:mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who help us operate our business, in business transfers, and when required by law.</p>
 </PrivacySection>

 <PrivacySection icon={Lock} title="5. Data Security" delay={0.4}>
 <p className="mb-4 sm:mb-6">We implement appropriate technical and organizational security measures including encryption, access controls, and secure storage. While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure.</p>
 </PrivacySection>
 </>
 );
}
