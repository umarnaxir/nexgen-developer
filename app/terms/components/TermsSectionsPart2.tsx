"use client";

import { Shield, Users, FileText, AlertCircle, CheckCircle } from "lucide-react";
import TermsSection from "./TermsSection";

export default function TermsSectionsPart2() {
  return (
    <>
      <TermsSection icon={CheckCircle} title="6. Acceptable Use" delay={0.6} altBg>
        <p className="mb-3 sm:mb-4">When you access or use our website and services, you must follow these rules. You agree not to:</p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 marker:text-teal-600">
          <li>Use the Service for any unlawful purpose or in violation of any applicable local, state, national, or international law</li>
          <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
          <li>Infringe any patent, trademark, trade secret, copyright, or other proprietary rights</li>
          <li>Transmit any unsolicited or unauthorized advertising, promotional materials, spam, or junk mail</li>
          <li>Transmit any material containing software viruses or other harmful computer code</li>
          <li>Interfere with or disrupt the Service or the servers or networks connected to it</li>
          <li>Attempt to gain unauthorized access to any part of the Service or any systems or networks connected to it</li>
        </ul>
        <p>We reserve the right to restrict or block access to anyone who violates these rules, without prior notice, and to take further action, including reporting to the relevant authorities where applicable.</p>
      </TermsSection>

      <TermsSection icon={AlertCircle} title="7. Limitation of Liability" delay={0.7}>
        <p className="mb-3 sm:mb-4">
          In no event shall NexGen, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 marker:text-teal-600">
          <li>Your use or inability to use the Service</li>
          <li>Any conduct or content of third parties on the Service</li>
          <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
          <li>Any interruption or cessation of transmission to or from the Service</li>
          <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service</li>
        </ul>
        <p>
          Our total liability to you for all claims arising from or related to the use of the Service shall not exceed the amount you paid to us, if any, for accessing the Service during the twelve (12) months prior to the claim.
        </p>
      </TermsSection>

      <TermsSection icon={Shield} title="8. Indemnification" delay={0.8} altBg>
        <p>
          You agree to defend, indemnify, and hold harmless NexGen and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney&apos;s fees), resulting from or arising out of: (a) your use and access of the Service; (b) your violation of any term of these Terms; or (c) your violation of any third party right, including without limitation any copyright, property, or privacy right.
        </p>
      </TermsSection>

      <TermsSection icon={AlertCircle} title="9. Termination" delay={0.9}>
        <p className="mb-3 sm:mb-4">
          We may restrict or terminate your access to the Service immediately, without prior notice or liability, at our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
        </p>
        <p>
          You may stop using the Service at any time. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
        </p>
      </TermsSection>

      <TermsSection icon={FileText} title="10. Changes to Terms" delay={1.0} altBg>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
        </p>
      </TermsSection>

      <TermsSection icon={Users} title="11. Contact Information" delay={1.1} dark>
        <p className="mb-4 sm:mb-6">If you have any questions about these Terms of Service, please contact us:</p>
        <div className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 sm:p-5 lg:p-6">
          <p className="mb-2"><strong className="text-black">Email:</strong> info@nexgendevelopers.in</p>
          <p className="mb-2"><strong className="text-black">Phone:</strong> +91 600-616-1726</p>
          <p><strong className="text-black">Location:</strong> Baramulla, Jammu and Kashmir, India</p>
        </div>
      </TermsSection>
    </>
  );
}
