"use client";

import React from "react";
import { Code2, Bot, Smartphone, Megaphone, ChevronRight } from "lucide-react";

interface ServiceCard {
 icon: React.ElementType;
 title: string;
 desc: string;
}

const serviceCards: ServiceCard[] = [
 { icon: Code2, title: "Web Development", desc: "Fast, responsive & scalable websites" },
 { icon: Bot, title: "AI/ML & Chatbots", desc: "Smart automation for your business" },
 { icon: Smartphone, title: "Mobile App Development", desc: "Powerful apps for iOS & Android" },
 { icon: Megaphone, title: "Digital Marketing", desc: "Strategies that drive real growth" },
];

function ServiceCardBox({
 icon: Icon,
 title,
 desc,
 showArrow = false,
}: ServiceCard & { showArrow?: boolean }) {
 return (
 <div className="glass-card group flex w-full items-center justify-between gap-3 rounded-2xl p-4">
 <div className="min-w-0">
 <div className="flex items-start gap-3">
 <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-400/20 light:border-teal-200 bg-teal-400/10 light:bg-teal-50 text-teal-300 light:text-teal-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-400/20 light:group-hover:bg-teal-100">
 <Icon className="h-5 w-5" />
 </span>
 <h4 className="text-sm font-bold leading-tight text-white light:text-gray-900">{title}</h4>
 </div>
 <p className="mt-2 text-xs leading-snug text-silver-dark light:text-gray-500">{desc}</p>
 </div>
 {showArrow && (
 <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 light:border-gray-200 bg-white/5 light:bg-gray-100 text-silver light:text-gray-600 transition-colors duration-300 group-hover:border-teal-400/40 group-hover:text-teal-300">
 <ChevronRight className="h-4 w-4" />
 </span>
 )}
 </div>
 );
}

/** Floating service-icon badge that sits on the mobile orbit. */
function IconBadge({
 icon: Icon,
 className = "",
}: {
 icon: React.ElementType;
 className?: string;
}) {
 return (
 <span
 className={`absolute flex h-11 w-11 items-center justify-center rounded-2xl border border-teal-400/25 light:border-teal-200 bg-teal-400/10 light:bg-teal-50 text-teal-300 light:text-teal-700 shadow-[0_0_20px_rgba(20,184,166,0.25)] backdrop-blur ${className}`}
 >
 <Icon className="h-5 w-5" />
 </span>
 );
}

/** The "Let's grow together" growth card. */
function GrowthCard() {
 return (
 <div className="glass-card w-full rounded-2xl p-4">
 <div className="flex items-center justify-between gap-4">
 <div>
 <p className="text-sm font-bold leading-tight text-white light:text-gray-900">
 Turning Ideas Into Impactful
 <br className="hidden sm:block" /> Digital Solutions
 </p>
 <p className="mt-1.5 text-xs font-semibold text-teal-300 light:text-teal-700">Let&apos;s grow together</p>
 </div>
 <svg viewBox="0 0 120 50" className="h-12 w-28 shrink-0 text-teal-400" fill="none">
 <path
 d="M2 44 C20 40 28 34 40 30 C54 25 60 32 74 22 C88 12 100 16 116 4"
 stroke="currentColor"
 strokeWidth="2.5"
 strokeLinecap="round"
 />
 <circle cx="116" cy="4" r="4" fill="currentColor" />
 </svg>
 </div>
 </div>
 );
}

/** A small glowing dot that revolves around the sphere. */
function OrbitDot({
 spin,
 margin,
 size,
}: {
 spin: string;
 margin: string;
 size: string;
}) {
 return (
 <span className={`absolute inset-0 ${margin} ${spin}`}>
 <span
 className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-300 shadow-[0_0_14px_rgba(45,212,191,0.95)] ${size}`}
 />
 </span>
 );
}

/** Glowing glass sphere with the brand "N", wrapped in animated orbit rings. */
function Sphere({ className = "" }: { className?: string }) {
 return (
 <div className={`relative flex items-center justify-center ${className}`}>
 {/* gentle floating wrapper (keeps positioning transforms on the parent) */}
 <div className="relative flex h-full w-full items-center justify-center animate-hero-float">
 {/* rotating conic glow halo */}
 <span
 className="absolute inset-0 -m-12 rounded-full opacity-60 blur-2xl animate-spin-slow"
 style={{
 background:
 "conic-gradient(from 0deg, transparent 0deg, rgba(45,212,191,0.5) 60deg, transparent 140deg, transparent 220deg, rgba(45,212,191,0.4) 300deg, transparent 360deg)",
 }}
 />

 {/* orbit rings */}
 <span className="absolute inset-0 -m-6 rounded-full border border-teal-400/25 animate-spin-slow" />
 <span className="absolute inset-0 -m-14 rounded-full border border-dashed border-teal-400/20 animate-spin-slow-rev" />
 <span className="absolute inset-0 -m-24 rounded-full border border-teal-400/10 animate-spin-slow" />

 {/* revolving particles */}
 <OrbitDot spin="animate-orbit" margin="-m-6" size="h-2.5 w-2.5" />
 <OrbitDot spin="animate-orbit-rev" margin="-m-14" size="h-2 w-2" />
 <OrbitDot spin="animate-orbit-slow" margin="-m-24" size="h-1.5 w-1.5" />

 {/* sphere, stays a black orb with dark-teal sheen in BOTH themes
 (light:bg-black sits under the opacity gradient so the light page
 no longer bleeds through and washes it to silver) */}
 <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/10 light:border-teal-700/40 bg-gradient-to-br from-teal-500/30 via-teal-700/15 to-black light:bg-black backdrop-blur animate-sphere-pulse">
 <span className="select-none bg-gradient-to-br from-teal-200 to-teal-500 bg-clip-text font-black leading-none text-transparent">
 N
 </span>
 {/* glossy highlight */}
 <span className="absolute left-[18%] top-[14%] h-[22%] w-[34%] rounded-full bg-white/30 blur-md" />
 </div>
 </div>
 </div>
 );
}

/** Mobile, the animated "N" sphere with orbiting service icons. */
export function HeroSphereMobile() {
 return (
 <div data-aos="fade-down">
 <h2 className="mb-6 text-center text-xl font-extrabold tracking-tight">
 <span className="bg-gradient-to-r from-teal-200 via-teal-400 to-teal-600 light:from-teal-600 light:via-teal-700 light:to-teal-800 bg-clip-text text-transparent">
 NexGen Developers
 </span>
 </h2>
 <div className="relative mx-auto h-64 w-64">
 {/* soft glow behind sphere */}
 <span className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/20 blur-3xl" />
 <Sphere className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 text-[80px]" />
 {/* floating icon badges */}
 <IconBadge icon={serviceCards[0].icon} className="left-1 top-8" />
 <IconBadge icon={serviceCards[1].icon} className="right-1 top-8" />
 <IconBadge icon={serviceCards[2].icon} className="bottom-8 left-1" />
 <IconBadge icon={serviceCards[3].icon} className="bottom-8 right-1" />
 </div>
 </div>
 );
}

/** Mobile, service cards + growth card. */
export function HeroCardsMobile() {
 return (
 <div data-aos="fade-up">
 <div className="grid grid-cols-2 gap-3">
 {serviceCards.map((card) => (
 <ServiceCardBox key={card.title} {...card} showArrow />
 ))}
 </div>
 <div className="mt-3">
 <GrowthCard />
 </div>
 </div>
 );
}

/** Desktop, brand heading + absolute orbit layout. */
export default function HeroOrbit() {
 return (
 <div data-aos="fade-left" data-aos-delay="150">
 {/* Brand heading */}
 <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
 <span className="bg-gradient-to-r from-teal-200 via-teal-400 to-teal-600 light:from-teal-600 light:via-teal-700 light:to-teal-800 bg-clip-text text-transparent">
 NexGen Developers
 </span>
 </h2>

 {/* ===== Desktop: absolute orbit layout ===== */}
 <div className="relative mx-auto h-[500px] w-full max-w-[600px]">
 {/* dashed connectors */}
 <svg
 className="absolute inset-0 h-full w-full text-teal-400/40"
 viewBox="0 0 620 560"
 fill="none"
 preserveAspectRatio="none"
 aria-hidden
 >
 <g stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6">
 <path d="M310 280 C230 200 200 170 175 150" />
 <path d="M310 280 C400 200 430 175 455 155" />
 <path d="M310 280 C220 320 180 350 150 360" />
 <path d="M310 280 C410 320 450 350 480 365" />
 <path d="M310 280 C320 380 320 420 320 470" />
 </g>
 <g fill="#2dd4bf">
 <circle cx="240" cy="208" r="4" />
 <circle cx="392" cy="206" r="4" />
 <circle cx="222" cy="322" r="4" />
 <circle cx="408" cy="322" r="4" />
 </g>
 </svg>

 {/* center sphere */}
 <Sphere className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 text-[128px]" />

 {/* cards */}
 <div className="absolute left-[2%] top-[8%] w-52">
 <ServiceCardBox {...serviceCards[0]} />
 </div>
 <div className="absolute right-[0%] top-[14%] w-52">
 <ServiceCardBox {...serviceCards[1]} />
 </div>
 <div className="absolute left-[-1%] top-[50%] w-52">
 <ServiceCardBox {...serviceCards[2]} />
 </div>
 <div className="absolute right-[-1%] top-[54%] w-52">
 <ServiceCardBox {...serviceCards[3]} />
 </div>
 <div className="absolute bottom-[1%] left-1/2 w-[60%] -translate-x-1/2">
 <GrowthCard />
 </div>
 </div>
 </div>
 );
}
