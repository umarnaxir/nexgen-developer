"use client";

import { FileText, Shield, Users } from "lucide-react";
import TermsSection from "./TermsSection";
import TermsSectionWriteForUs from "./TermsSectionWriteForUs";

export default function TermsSections() {
  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-12">
      <TermsSection icon={FileText} title="1. Acceptance of Terms" delay={0}>
        <p className="mb-3 sm:mb-4">
          By accessing and using the NexGen Developers website, services, or platform, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, services, and any related applications (collectively, the &quot;Service&quot;). Your use of the Service constitutes your acceptance of these Terms.
        </p>
      </TermsSection>

      <TermsSection icon={Shield} title="2. Use License" delay={0.1} altBg>
        <p className="mb-3 sm:mb-4">
          Permission is granted to temporarily download one copy of the materials on NexGen Developers&apos; website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
          <li>Attempt to decompile or reverse engineer any software contained on NexGen Developers&apos; website</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
        </ul>
        <p>
          This license shall automatically terminate if you violate any of these restrictions and may be terminated by NexGen Developers at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
        </p>
      </TermsSection>

      <TermsSection icon={Users} title="3. Services" delay={0.2}>
        <p className="mb-3 sm:mb-4">NexGen Developers provides comprehensive digital solutions including:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-sm sm:text-base text-black mb-2">Development Services</h3>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
              <li>• Web Development</li>
              <li>• Mobile App Development</li>
              <li>• AI/ML Solutions</li>
              <li>• Chatbot Development</li>
            </ul>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-sm sm:text-base text-black mb-2">Marketing & Design</h3>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
              <li>• SEO Services</li>
              <li>• Graphic Design</li>
              <li>• Digital Marketing</li>
              <li>• Branding Solutions</li>
            </ul>
          </div>
        </div>
        <p>
          All services are provided subject to separate service agreements. The scope, timeline, and pricing for each project will be detailed in a written agreement before work commences. We reserve the right to refuse service to anyone for any reason at any time.
        </p>
      </TermsSection>

      <TermsSectionWriteForUs />

      <TermsSection icon={Shield} title="5. Intellectual Property" delay={0.4} altBg>
        <p className="mb-3 sm:mb-4">
          The materials on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, are the property of NexGen Developers or its content suppliers and are protected by international copyright and trademark laws.
        </p>
        <p className="mb-3 sm:mb-4">
          <strong className="text-black">For Guest Contributors:</strong> By submitting content to our &quot;Write for Us&quot; program, you grant NexGen Developers a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, adapt, publish, translate, and distribute your content in any media. You retain ownership of your original content but grant us the right to publish and promote it on our platform.
        </p>
        <p>
          Unauthorized use of any materials on this website may violate copyright, trademark, and other laws. If you violate any of these restrictions, your permission to use the materials automatically terminates and you must immediately destroy any downloaded materials in your possession.
        </p>
      </TermsSection>

      <TermsSection icon={Users} title="6. User Accounts and Registration" delay={0.5}>
        <p className="mb-3 sm:mb-4">
          To access certain features of our Service, including the &quot;Write for Us&quot; program, you may be required to register for an account. When you register, you agree to:
        </p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <li>Provide accurate, current, and complete information during registration</li>
          <li>Maintain and promptly update your account information</li>
          <li>Maintain the security of your password and identification</li>
          <li>Accept all responsibility for activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
          <li>Not share your account credentials with third parties</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate your account at any time if you violate these Terms or engage in any fraudulent, abusive, or illegal activity.
        </p>
      </TermsSection>
    </div>
  );
}
