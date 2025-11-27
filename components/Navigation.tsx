"use client";

import Link from "next/link";

export default function Navigation() {
  const links = ["/", "/about", "/services", "/blogs", "/contact"];

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">NexGen<span className="text-blue-600">Devs</span></Link>
        <nav className="hidden md:flex space-x-6">
          {links.map((p) => (
            <Link key={p} href={p} className="text-gray-600 hover:text-blue-600 capitalize">
              {p === "/" ? "home" : p.replace("/", "")}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
