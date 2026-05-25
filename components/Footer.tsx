"use client";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { t } from "@/lib/translations";

export default function Footer() {
  const { tx } = useLanguage();

  return (
    <footer className="bg-amber-900 text-amber-100 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-xl font-bold mb-3">
            <span>🐾</span>
            <span>Paws & Hearts Rescue</span>
          </div>
          <p className="text-amber-200 text-sm">{tx(t.footer_tagline)}</p>
        </div>
        <div>
          <h3 className="font-bold mb-3 text-amber-300">{tx(t.footer_links)}</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/dogs" className="hover:text-white transition-colors">{tx(t.nav_adopt)}</Link></li>
            <li><Link href="/donate" className="hover:text-white transition-colors">{tx(t.nav_donate)}</Link></li>
            <li><Link href="/resources" className="hover:text-white transition-colors">{tx(t.nav_resources)}</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">{tx(t.nav_about)}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3 text-amber-300">{tx(t.footer_contact)}</h3>
          <p className="text-sm space-y-1">
            <span className="block">📍 123 Rescue Lane, Pawville, CA 90210</span>
            <span className="block">📞 (555) 123-PAWS</span>
            <span className="block">✉️ hello@pawsandhearts.org</span>
          </p>
          <Link href="/admin" className="mt-4 inline-block text-xs text-amber-400 hover:text-amber-200">
            {tx(t.footer_staff)}
          </Link>
        </div>
      </div>
      <div className="text-center text-amber-400 text-xs mt-8">
        © {new Date().getFullYear()} Paws & Hearts Rescue. {tx(t.footer_copy)}
      </div>
    </footer>
  );
}
