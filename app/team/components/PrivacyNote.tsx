"use client";

export default function PrivacyNote() {
  return (
    <section 
      className="pt-4 sm:pt-6 pb-8 sm:pb-12"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div 
          className="bg-gray-900/50 border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-sm hover:border-white/20 transition-colors duration-300"
          data-aos="zoom-in"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Additional Team Members
          </h3>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            NexGen Developer also collaborates with several other skilled professionals. Due to privacy and confidentiality reasons, their details are not publicly listed.
          </p>
        </div>
      </div>
    </section>
  );
}
