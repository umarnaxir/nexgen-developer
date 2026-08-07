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
        <p className="mb-3 sm:mb-4">We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. Retention periods: Client &amp; Inquiry Information (for the duration of our engagement + 3 years), Transaction Records (7 years), Marketing Data (until unsubscribe), Analytics Data (aggregated indefinitely).</p>
      </PrivacySection>

      <PrivacySection icon={Globe} title="8. International Data Transfers" delay={0.7} altBg>
        <p className="mb-3 sm:mb-4">Your information may be transferred to and maintained on computers located outside of your jurisdiction where data protection laws may differ. If you are located outside India and choose to provide information to us, we transfer the data to India for processing. By submitting your personal information, you consent to this transfer, storage, and processing.</p>
      </PrivacySection>

      <PrivacySection icon={Shield} title="9. Children's Privacy" delay={0.8}>
        <p>Our Service is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.</p>
      </PrivacySection>

      <PrivacySection icon={FileText} title="10. Payment Information & Billing" delay={0.9} altBg>
        <p className="mb-3 sm:mb-4">
          When you engage us for paid services, we may collect billing and payment-related information
          needed to issue invoices and confirm payments (for example, name, business details, billing
          address, and payment confirmation references).
        </p>
        <p className="mb-3 sm:mb-4">
          <strong className="text-black">Installment structure:</strong> Unless otherwise agreed in writing,
          project fees are typically collected in two parts —{" "}
          <strong className="text-black">50% advance</strong> when the proposal is accepted, and{" "}
          <strong className="text-black">50% at deployment</strong> or final delivery. Payment records for
          these installments are retained as transaction records for accounting and legal purposes.
        </p>
        <p className="mb-3 sm:mb-4">
          We do not store full payment card numbers on our website. Where payments are made through a bank
          or third-party payment channel, that provider processes the payment under its own terms and
          privacy practices.
        </p>
        <p>
          Commercial terms — including the non-refundable nature of the advance after proposal acceptance,
          and consequences of late or missed payment near a project deadline — are described in our{" "}
          <a href="/terms" className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800">
            Terms of Service (Payment Policy)
          </a>
          .
        </p>
      </PrivacySection>

      <PrivacySection icon={FileText} title="11. Changes to This Privacy Policy" delay={0.95}>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.</p>
      </PrivacySection>

      <PrivacySection icon={Mail} title="12. Contact Us" delay={1.0} dark>
        <p className="mb-4 sm:mb-6">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
        <div className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-4 sm:p-5 lg:p-6">
          <p className="mb-2 sm:mb-3"><strong className="text-black">NexGen</strong></p>
          <p className="mb-2"><strong className="text-black">Email:</strong> workwithnexgen@gmail.com</p>
          <p className="mb-2"><strong className="text-black">Phone:</strong> +91 600-616-1726</p>
          <p><strong className="text-black">Location:</strong> Baramulla, Jammu and Kashmir, India</p>
        </div>
        <p className="text-xs sm:text-sm text-black/45 mt-4 sm:mt-6">For privacy-related requests, please include &quot;Privacy Request&quot; in the subject line of your email for faster processing.</p>
      </PrivacySection>
    </>
  );
}

