"use client";

import { Shield, Users, FileText, AlertCircle, CheckCircle } from "lucide-react";
import TermsSection from "./TermsSection";

export default function TermsSectionsPart2() {
  return (
    <>
      <TermsSection icon={CheckCircle} title="7. Content Guidelines and Prohibited Uses" delay={0.6} altBg>
        <p className="mb-3 sm:mb-4">You agree not to use the Service to:</p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <li>Post, upload, or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or invasive of another&apos;s privacy</li>
          <li>Impersonate any person or entity or falsely state or misrepresent your affiliation with a person or entity</li>
          <li>Upload or transmit any content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights</li>
          <li>Upload or transmit any unsolicited or unauthorized advertising, promotional materials, spam, or junk mail</li>
          <li>Upload or transmit any material containing software viruses or other harmful computer code</li>
          <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
          <li>Violate any applicable local, state, national, or international law</li>
        </ul>
        <p>We reserve the right to remove any content that violates these guidelines without prior notice.</p>
      </TermsSection>

      <TermsSection icon={AlertCircle} title="8. Limitation of Liability" delay={0.7}>
        <p className="mb-3 sm:mb-4">
          In no event shall NexGen Developers, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
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

      <TermsSection icon={Shield} title="9. Indemnification" delay={0.8} altBg>
        <p>
          You agree to defend, indemnify, and hold harmless NexGen Developers and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney&apos;s fees), resulting from or arising out of: (a) your use and access of the Service; (b) your violation of any term of these Terms; (c) your violation of any third party right, including without limitation any copyright, property, or privacy right; or (d) any claim that your content caused damage to a third party.
        </p>
      </TermsSection>

      <TermsSection icon={AlertCircle} title="10. Termination" delay={0.9}>
        <p className="mb-3 sm:mb-4">
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
        </p>
        <p>
          If you wish to terminate your account, you may simply discontinue using the Service. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
        </p>
      </TermsSection>

      <TermsSection icon={FileText} title="11. Changes to Terms" delay={1.0} altBg>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
        </p>
      </TermsSection>

      <TermsSection icon={Users} title="12. Contact Information" delay={1.1} dark>
        <p className="mb-4 sm:mb-6">If you have any questions about these Terms of Service, please contact us:</p>
        <div className="bg-gray-900 p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-700">
          <p className="mb-2"><strong className="text-white">Email:</strong> nexgendevelopers11@gmail.com</p>
          <p className="mb-2"><strong className="text-white">Phone:</strong> +91 600-616-1726</p>
          <p><strong className="text-white">Location:</strong> Srinagar, Jammu and Kashmir, India</p>
        </div>
      </TermsSection>
    </>
  );
}
