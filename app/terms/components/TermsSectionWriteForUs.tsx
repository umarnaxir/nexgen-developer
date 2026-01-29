"use client";

import { PenTool, Link2, TrendingUp, UserCheck, AlertCircle } from "lucide-react";

export default function TermsSectionWriteForUs() {
  return (
    <section
      className="bg-black p-4 sm:p-6 lg:p-8 rounded-xl text-white"
      data-aos="zoom-in"
    >
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-white p-2 sm:p-3 rounded-lg flex-shrink-0">
          <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
        </div>
        <div className="flex-1 w-full">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">4. Write for Us Program</h2>
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4 sm:mb-6">
            NexGen Developers offers a &quot;Write for Us&quot; program that allows content creators, bloggers, and businesses to submit guest posts and articles to our platform. This program provides opportunities for backlinks, business promotion, and content distribution.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-gray-900 p-4 sm:p-5 rounded-lg border border-gray-700">
              <Link2 className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 sm:mb-3" />
              <h3 className="font-bold text-sm sm:text-base text-white mb-2">Get Backlinks</h3>
              <p className="text-xs sm:text-sm text-gray-300">Earn valuable backlinks to your website or business when your content is published on our platform.</p>
            </div>
            <div className="bg-gray-900 p-4 sm:p-5 rounded-lg border border-gray-700">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 sm:mb-3" />
              <h3 className="font-bold text-sm sm:text-base text-white mb-2">Promote Your Business</h3>
              <p className="text-xs sm:text-sm text-gray-300">Showcase your expertise and promote your business to our engaged audience of developers and entrepreneurs.</p>
            </div>
            <div className="bg-gray-900 p-4 sm:p-5 rounded-lg border border-gray-700">
              <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white mb-2 sm:mb-3" />
              <h3 className="font-bold text-sm sm:text-base text-white mb-2">Work With Us</h3>
              <p className="text-xs sm:text-sm text-gray-300">Build relationships and collaborate with our team while sharing your knowledge and insights.</p>
            </div>
          </div>
          <div className="bg-gray-900 p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-700 mb-4 sm:mb-6">
            <h3 className="font-bold text-white mb-3 sm:mb-4 text-lg sm:text-xl">How It Works</h3>
            <ol className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-200">
              <li className="flex items-start gap-2 sm:gap-3"><span className="bg-white text-black rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">1</span><span><strong className="text-white">Sign Up & Login:</strong> Create an account and log in to our platform to access the content submission system.</span></li>
              <li className="flex items-start gap-2 sm:gap-3"><span className="bg-white text-black rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">2</span><span><strong className="text-white">Submit Your Content:</strong> After logging in, you can submit your blog posts, articles, or content pieces through our submission portal.</span></li>
              <li className="flex items-start gap-2 sm:gap-3"><span className="bg-white text-black rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">3</span><span><strong className="text-white">Our Review Process:</strong> Our editorial team will review your submission for quality, relevance, and adherence to our content guidelines.</span></li>
              <li className="flex items-start gap-2 sm:gap-3"><span className="bg-white text-black rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">4</span><span><strong className="text-white">Approval & Publication:</strong> Once approved, your content will be published on our platform with proper attribution and backlinks to your website or business.</span></li>
              <li className="flex items-start gap-2 sm:gap-3"><span className="bg-white text-black rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">5</span><span><strong className="text-white">Promote & Share:</strong> You can share your published content on your own channels and leverage the backlinks for SEO benefits.</span></li>
            </ol>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-500/50 p-3 sm:p-4 rounded-lg">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs sm:text-sm text-yellow-200 font-semibold mb-1">Important Guidelines:</p>
                <ul className="text-xs sm:text-sm text-yellow-100 space-y-1 list-disc pl-4 sm:pl-5">
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
    </section>
  );
}
