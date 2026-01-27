"use client";

import React from "react";
import Image from "next/image";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

const FooterColumn: React.FC<{ title: string; links: FooterLink[] }> = ({ title, links }) => (
  <div className="flex flex-col space-y-3">
    <h3 className="text-sm font-extrabold uppercase tracking-widest text-gray-900 mb-3">
      {title}
    </h3>
    {links.map((link) => (
      <a
        key={link.label}
        href={link.href}
        className="group relative inline-block text-base font-medium text-gray-700 py-1"
      >
        <span className="block">{link.label}</span>
        <span className="absolute left-1/2 bottom-0 -translate-x-1/2 w-0 h-0.5 bg-black group-hover:w-2/3 transition-all duration-200" />
      </a>
    ))}
  </div>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const siteLinks: FooterLink[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Team', href: '/team' }
  ];

  const moreLinks: FooterLink[] = [
    { label: 'Blogs', href: '/blogs' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' }
  ];

  const workLinks: FooterLink[] = [
    { label: 'Work with us', href: '/work-with-us' },
    { label: 'Write for us', href: '/write-for-us' }
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-12 pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 items-start">

          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <FooterColumn title="Site" links={siteLinks} />
            <FooterColumn title="More" links={moreLinks} />
            <FooterColumn title="Work" links={workLinks} />
          </div>

          <div className="md:col-span-1 flex flex-col items-center md:items-end gap-6">
            <div className="w-full md:w-[360px]">
              <a href="/" className="block w-full">
                <Image src="/images/ND.png" alt="ND logo" width={520} height={170} className="w-full h-auto object-contain" />
              </a>
            </div>

            <div className="w-full md:w-[360px] text-right md:text-right space-y-1">
              <h4 className="text-sm font-extrabold uppercase text-gray-900 mb-2">Contact</h4>
              <div className="text-base font-medium text-gray-900">Phone: <a href="tel:6006161726" className="underline-offset-2">6006161726</a></div>
              <div className="text-base font-medium text-gray-900">Email: <a href="mailto:nexgendeveliopers11@gmial.com" className="underline-offset-2">nexgendeveliopers11@gmial.com</a></div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-6 pb-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-gray-500">© Copyright {currentYear} NexGen Develiopers</div>

          <div className="flex space-x-6">
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-gray-900 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-gray-900 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-gray-900 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-gray-900 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
