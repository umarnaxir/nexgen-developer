import { FileText, Shield, Users, BookOpen } from "lucide-react";
import TermsSection from "./TermsSection";

export default function TermsSections() {
  return (
    <>
      <TermsSection icon={BookOpen} title="1. Definitions" delay={0}>
        <p className="mb-3 sm:mb-4">
          In these Terms, the following definitions apply:
        </p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 marker:text-gold-dark">
          <li><strong className="text-black">&quot;Service&quot;</strong> means our website, our blog, and all related features and pages.</li>
          <li><strong className="text-black">&quot;NexGen&quot;</strong> means our service-based team of freelance developers and designers, helping startups and local brands with AI/ML, chatbots, web &amp; app development, and digital marketing.</li>
          <li><strong className="text-black">&quot;Services&quot;</strong> means the development, design, marketing, and support services we provide to clients under separate service agreements.</li>
          <li><strong className="text-black">&quot;Blog&quot;</strong> means the articles and guides we publish on our blog section, typically focused on technology, business development, and related topics.</li>
        </ul>
        <p>
          References to &quot;we,&quot; &quot;our,&quot; or &quot;us&quot; mean NexGen. &quot;You&quot; and &quot;your&quot; refer to the user of the Service.
        </p>
      </TermsSection>

      <TermsSection icon={FileText} title="2. Acceptance of Terms" delay={0.05}>
        <p className="mb-3 sm:mb-4">
          By accessing and using the NexGen website, our blog, or our services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, services, and any related applications (collectively, the &quot;Service&quot;). Your use of the Service constitutes your acceptance of these Terms.
        </p>
      </TermsSection>

      <TermsSection icon={Shield} title="3. Use License" delay={0.1} altBg>
        <p className="mb-3 sm:mb-4">
          Permission is granted to temporarily download one copy of the materials on NexGen&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul className="list-disc pl-5 sm:pl-6 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 marker:text-gold-dark">
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
          <li>Attempt to decompile or reverse engineer any software contained on NexGen&apos;s website</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
        </ul>
        <p>
          This license shall automatically terminate if you violate any of these restrictions and may be terminated by NexGen at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
        </p>
      </TermsSection>

      <TermsSection icon={Users} title="4. Services" delay={0.2}>
        <p className="mb-3 sm:mb-4">NexGen is a service-based team of freelance developers and designers. We help startups and local brands with comprehensive digital solutions including:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-3 sm:p-4">
            <h3 className="font-bold text-sm sm:text-base text-black mb-2">Development Services</h3>
            <ul className="text-xs sm:text-sm text-black/60 space-y-1">
              <li>• Web Development</li>
              <li>• Mobile App Development</li>
              <li>• AI/ML Solutions</li>
              <li>• Chatbot Development</li>
            </ul>
          </div>
          <div className="rounded-xl border border-black/[0.06] bg-black/[0.02] p-3 sm:p-4">
            <h3 className="font-bold text-sm sm:text-base text-black mb-2">Marketing & Design</h3>
            <ul className="text-xs sm:text-sm text-black/60 space-y-1">
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

      <TermsSection icon={Shield} title="5. Intellectual Property" delay={0.4} altBg>
        <p className="mb-3 sm:mb-4">
          The materials on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, are the property of NexGen or its content suppliers and are protected by international copyright and trademark laws.
        </p>
        <p className="mb-3 sm:mb-4">
          <strong className="text-black">For Client Work:</strong> Ownership of deliverables we create for clients (such as websites, applications, designs, and other custom work) is governed by the separate service agreement for that project. Unless otherwise agreed in writing, ownership of final deliverables transfers to the client upon full payment, while NexGen retains the right to showcase the work in our portfolio.
        </p>
        <p>
          Unauthorized use of any materials on this website may violate copyright, trademark, and other laws. If you violate any of these restrictions, your permission to use the materials automatically terminates and you must immediately destroy any downloaded materials in your possession.
        </p>
      </TermsSection>
    </>
  );
}
