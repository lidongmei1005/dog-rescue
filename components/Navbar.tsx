"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/dogs", label: "Adopt a Dog" },
    { href: "/resources", label: "Resources" },
    { href: "/donate", label: "Donate" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <nav className="bg-amber-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:text-amber-200 transition-colors">
          <span className="text-2xl">🐾</span>
          <span>Paws & Hearts Rescue</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-amber-200 transition-colors font-medium">
              {l.label}
            </Link>
          ))}
          <Link href="/dogs" className="bg-amber-400 text-amber-950 px-4 py-2 rounded-full font-bold hover:bg-amber-300 transition-colors">
            Adopt Now 🐶
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white mb-1.5"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-amber-900 px-4 pb-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block py-2 hover:text-amber-200 transition-colors" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/dogs" className="inline-block mt-2 bg-amber-400 text-amber-950 px-4 py-2 rounded-full font-bold" onClick={() => setOpen(false)}>
            Adopt Now 🐶
          </Link>
        </div>
      )}
    </nav>
  );
}
