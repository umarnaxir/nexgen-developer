"use client";

import { UserCheck, Database, Globe, Shield, FileText, Mail } from "lucide-react";
import PrivacySection from "./PrivacySection";

export default function PrivacySectionsPart2() {
  return (
    <>
      <PrivacySection icon={UserCheck} title="6. Your Privacy Rights" delay={0.5} altBg>
        <p className="mb-4 sm:mb-6">Depending on your location, you may have certain rights regarding your personal information: access & portability, correction & deletion, consent & objection, restriction & complaint. To exercise any of these rights, please contact us using the contact information provided at the end of this policy.</p>
      </PrivacySection>

      <PrivacySection icon={Database} title="7. Data Retention" delay={0.6}>
        <p className="mb-3 sm:mb-4">We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. Retention periods: Account Information (while active + 3 years after closure), Published Content (indefinitely), Transaction Records (7 years), Marketing Data (until unsubscribe), Analytics Data (aggregated indefinitely).</p>
      </PrivacySection>

      <PrivacySection icon={Globe} title="8. International Data Transfers" delay={0.7} altBg>
        <p className="mb-3 sm:mb-4">Your information may be transferred to and maintained on computers located outside of your jurisdiction where data protection laws may differ. If you are located outside India and choose to provide information to us, we transfer the data to India for processing. By submitting your personal information, you consent to this transfer, storage, and processing.</p>
      </PrivacySection>

      <PrivacySection icon={Shield} title="9. Children's Privacy" delay={0.8}>
        <p>Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.</p>
      </PrivacySection>

      <PrivacySection icon={FileText} title="10. Changes to This Privacy Policy" delay={0.9} altBg>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.</p>
      </PrivacySection>

      <PrivacySection icon={Mail} title="11. Contact Us" delay={1.0} dark>
        <p className="mb-4 sm:mb-6">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
        <div className="bg-gray-900 p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-700">
          <p className="mb-2 sm:mb-3"><strong className="text-white">NexGen Developers</strong></p>
          <p className="mb-2"><strong className="text-white">Email:</strong> nexgendevelopers11@gmail.com</p>
          <p className="mb-2"><strong className="text-white">Phone:</strong> +91 600-616-1726</p>
          <p><strong className="text-white">Location:</strong> Srinagar, Jammu and Kashmir, India</p>
        </div>
        <p className="text-xs sm:text-sm text-gray-200 mt-4 sm:mt-6">For privacy-related requests, please include &quot;Privacy Request&quot; in the subject line of your email for faster processing.</p>
      </PrivacySection>
    </>
  );
}

