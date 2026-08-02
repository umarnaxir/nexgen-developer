"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
 X,
 Phone,
 Mail,
 ArrowRight,
 User,
 ShieldCheck,
 MessageCircle,
 Linkedin,
 Instagram,
 Facebook,
} from "lucide-react";
import XIcon from "@/components/icons/XIcon";

interface GetInTouchModalProps {
 isOpen: boolean;
 onClose: () => void;
}

const PHONE_DISPLAY = "+91 600-616-1726";
const PHONE_TEL = "+916006161726";
const EMAIL = "workwithnexgen@gmail.com";

const socials = [
 { icon: MessageCircle, href: "https://wa.me/916006161726?text=Hi%20NexGen%20Developers%2C%20I%20want%20to%20discuss%20a%20project.", label: "WhatsApp" },
 { icon: XIcon, href: "https://x.com/nexgendv", label: "X" },
 { icon: Linkedin, href: "https://www.linkedin.com/company/105880683/", label: "LinkedIn" },
 { icon: Instagram, href: "https://www.instagram.com/nexgendevelopers_?igsh=MTJiczF6aDNxbjB2eg==", label: "Instagram" },
 { icon: Facebook, href: "https://www.facebook.com/people/NexGen-Developers/61572910985245/?rdid=4A376FPlbAhNjqn5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1924Qev3Su%2F", label: "Facebook" },
];

export default function GetInTouchModal({ isOpen, onClose }: GetInTouchModalProps) {
 const [name, setName] = useState("");
 const [phone, setPhone] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false);

 // Close on Escape + lock body scroll while open
 useEffect(() => {
 if (!isOpen) return;
 const onKeyDown = (e: KeyboardEvent) => {
 if (e.key === "Escape") onClose();
 };
 document.addEventListener("keydown", onKeyDown);
 document.body.style.overflow = "hidden";
 return () => {
 document.removeEventListener("keydown", onKeyDown);
 document.body.style.overflow = "";
 };
 }, [isOpen, onClose]);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!name.trim() || !phone.trim()) return;
 setIsSubmitting(true);

 const controller = new AbortController();
 const timeoutId = setTimeout(() => controller.abort(), 35000);

 try {
 const response = await fetch("/api/callback", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({ name, phone }),
 signal: controller.signal,
 });

 clearTimeout(timeoutId);

 const contentType = response.headers.get("content-type");
 let data: { error?: string; details?: string; message?: string } = {};
 if (contentType?.includes("application/json")) {
 data = await response.json();
 }

 if (!response.ok) {
 const msg = data.details ? `${data.error} (${data.details})` : data.error || "Something went wrong";
 throw new Error(msg);
 }

 toast.success("Request received!", {
 description: "We'll reach out within one business day.",
 duration: 4000,
 });
 setName("");
 setPhone("");
 onClose();
 } catch (error) {
 const message =
 error instanceof Error
 ? error.name === "AbortError"
 ? "Request took too long. Please try again."
 : error.message
 : "Please try again later.";
 toast.error("Couldn't send your request", { description: message, duration: 5000 });
 } finally {
 clearTimeout(timeoutId);
 setIsSubmitting(false);
 }
 };

 if (!isOpen) return null;

 return (
 <div
 className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
 onClick={onClose}
 role="dialog"
 aria-modal="true"
 aria-label="Get in touch"
 >
 <div
 className="relative grid w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl border border-white/10 light:border-gray-200 shadow-2xl md:grid-cols-[0.85fr_1fr] max-h-[92vh] overflow-y-auto"
 onClick={(e) => e.stopPropagation()}
 >
 {/* ===== Left: silver "reach us" panel, desktop only ===== */}
 <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#ededed] via-[#c7c7c7] to-[#9a9a9a] p-6 text-gray-900 md:flex">
 {/* metallic sheen */}
 <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/50 blur-2xl" />
 <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/70" />

 <div className="relative">
 <span className="inline-flex items-center gap-2 rounded-full bg-gray-900/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-300">
 <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
 Reach Us
 </span>
 <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight">
 Let&apos;s build
 <br />
 something great.
 </h3>
 <p className="mt-2 text-xs leading-relaxed text-gray-700">
 Prefer to reach out directly? We usually reply within one business day.
 </p>
 </div>

 {/* contact cards */}
 <div className="relative mt-4 space-y-2.5">
 <a
 href={`tel:${PHONE_TEL}`}
 className="group flex items-center gap-3 rounded-xl border border-black/10 bg-white/40 px-3 py-2.5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white/70"
 >
 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-teal-300 transition-transform duration-300 group-hover:scale-110">
 <Phone className="h-4 w-4" />
 </span>
 <span className="min-w-0">
 <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Phone</span>
 <span className="block truncate text-sm font-bold text-gray-900">{PHONE_DISPLAY}</span>
 </span>
 </a>
 <a
 href={`mailto:${EMAIL}`}
 className="group flex items-center gap-3 rounded-xl border border-black/10 bg-white/40 px-3 py-2.5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-white/70"
 >
 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-teal-300 transition-transform duration-300 group-hover:scale-110">
 <Mail className="h-4 w-4" />
 </span>
 <span className="min-w-0">
 <span className="block text-[10px] font-semibold uppercase tracking-wider text-gray-600">Email</span>
 <span className="block truncate text-sm font-bold text-gray-900">{EMAIL}</span>
 </span>
 </a>
 </div>

 {/* socials */}
 <div className="relative mt-4">
 <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-600">Follow Us</span>
 <div className="mt-2 flex items-center gap-2">
 {socials.map(({ icon: Icon, href, label }) => (
 <a
 key={label}
 href={href}
 target="_blank"
 rel="noopener noreferrer"
 aria-label={label}
 className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white/50 text-gray-700 transition-all duration-300 hover:scale-110 hover:bg-gray-900 hover:text-teal-300"
 >
 <Icon className="h-3.5 w-3.5" />
 </a>
 ))}
 </div>
 </div>
 </div>

 {/* ===== Right: form panel, black (only side on mobile) ===== */}
 <div className="relative bg-[#070809] light:bg-white p-6 sm:p-7">
 {/* Close button */}
 <button
 type="button"
 onClick={onClose}
 aria-label="Close"
 className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 light:border-gray-200 bg-white/[0.04] light:bg-gray-100 text-silver-light light:text-gray-700 transition-all hover:rotate-90 hover:border-teal-400/40 hover:text-white light:hover:text-gray-900"
 >
 <X className="h-4 w-4" />
 </button>

 <div className="mb-1 flex items-center gap-2">
 <span className="h-0.5 w-7 bg-teal-400" />
 <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-300">Get Started</span>
 </div>
 <h2 className="text-2xl font-extrabold text-white light:text-gray-900 sm:text-3xl">
 Let&apos;s <span className="text-gradient-teal">connect!</span>
 </h2>
 <p className="mt-1.5 text-sm leading-relaxed text-silver light:text-gray-600">
 Drop your details and we&apos;ll call you back shortly.
 </p>

 <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
 <div className="group/field">
 <label htmlFor="git-name" className="mb-1.5 block text-xs font-bold text-silver-light light:text-gray-700">
 Your Name <span className="text-teal-400">*</span>
 </label>
 <div className="relative">
 <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-dark light:text-gray-500 transition-colors group-focus-within/field:text-teal-300" />
 <input
 id="git-name"
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="Ex. John Doe"
 required
 className="w-full rounded-xl border border-white/10 light:border-gray-300 bg-white/[0.04] light:bg-white py-3 pl-10 pr-4 text-sm text-white light:text-gray-900 outline-none transition-all placeholder:text-silver-dark light:placeholder:text-gray-400 focus:border-teal-400/60 focus:bg-white/[0.06] light:focus:bg-white focus:ring-2 focus:ring-teal-400/20"
 />
 </div>
 </div>

 <div className="group/field">
 <label htmlFor="git-phone" className="mb-1.5 block text-xs font-bold text-silver-light light:text-gray-700">
 Contact Number <span className="text-teal-400">*</span>
 </label>
 <div className="relative">
 <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-dark light:text-gray-500 transition-colors group-focus-within/field:text-teal-300" />
 <input
 id="git-phone"
 type="tel"
 value={phone}
 onChange={(e) => setPhone(e.target.value)}
 placeholder="+91 600-616-1726"
 required
 className="w-full rounded-xl border border-white/10 light:border-gray-300 bg-white/[0.04] light:bg-white py-3 pl-10 pr-4 text-sm text-white light:text-gray-900 outline-none transition-all placeholder:text-silver-dark light:placeholder:text-gray-400 focus:border-teal-400/60 focus:bg-white/[0.06] light:focus:bg-white focus:ring-2 focus:ring-teal-400/20"
 />
 </div>
 </div>

 <button
 type="submit"
 disabled={isSubmitting}
 className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/25 transition-all duration-300 hover:from-teal-400 hover:to-teal-500 hover:shadow-teal-500/40 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
 >
 {/* shine sweep */}
 <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
 <span className="relative">{isSubmitting ? "Sending..." : "Request a Callback"}</span>
 {!isSubmitting && (
 <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
 )}
 </button>
 </form>

 <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-silver-dark light:text-gray-500">
 <ShieldCheck className="h-3.5 w-3.5" />
 We respect your privacy. Your information is safe with us.
 </p>
 </div>
 </div>
 </div>
 );
}
