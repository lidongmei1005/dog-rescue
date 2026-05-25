"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "./LanguageProvider";
import { t } from "@/lib/translations";

interface NavUser { name: string; role: string; }

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, tx } = useLanguage();
  const [user, setUser] = useState<NavUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.ok ? r.json() : null).then(d => {
      if (d?.user) setUser(d.user);
    }).catch(() => {});
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  }

  const dashboardHref = user?.role === 'admin' ? '/admin' : user?.role === 'shelter' ? '/shelter/dashboard' : null;

  const links = [
    { href: "/dogs", label: tx(t.nav_adopt) },
    { href: "/resources", label: tx(t.nav_resources) },
    { href: "/donate", label: tx(t.nav_donate) },
    { href: "/about", label: tx(t.nav_about) },
  ];

  return (
    <nav className="bg-amber-800 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold hover:text-amber-200 transition-colors">
          <span className="text-2xl">🐾</span>
          <span>Paws & Hearts Rescue</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-amber-200 transition-colors font-medium">
              {l.label}
            </Link>
          ))}
          <Link href="/dogs" className="bg-amber-400 text-amber-950 px-4 py-2 rounded-full font-bold hover:bg-amber-300 transition-colors">
            {tx(t.nav_adopt_now)}
          </Link>

          {/* Auth area */}
          {user ? (
            <div className="flex items-center gap-3">
              {dashboardHref && (
                <Link href={dashboardHref} className="text-sm text-amber-200 hover:text-white font-semibold">
                  {user.role === 'admin' ? '⚙️ Admin' : '🏠 Dashboard'}
                </Link>
              )}
              <span className="text-sm text-amber-300">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={logout} className="text-xs bg-amber-700 hover:bg-amber-600 px-3 py-1.5 rounded-full border border-amber-500">
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-sm bg-amber-700 hover:bg-amber-600 px-3 py-1.5 rounded-full border border-amber-500 font-semibold">
              Sign In
            </Link>
          )}

          {/* Language switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-1 bg-amber-700 hover:bg-amber-600 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors border border-amber-500"
            title={lang === 'en' ? '切换到中文' : 'Switch to English'}
          >
            {lang === 'en' ? '🇨🇳 中文' : '🇺🇸 EN'}
          </button>
        </div>

        {/* Mobile: language + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
            className="bg-amber-700 hover:bg-amber-600 px-2 py-1 rounded-full text-xs font-semibold border border-amber-500"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
          <button className="p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
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
            {tx(t.nav_adopt_now)}
          </Link>
          <div className="mt-3 border-t border-amber-700 pt-3">
            {user ? (
              <div className="flex flex-col gap-2">
                {dashboardHref && (
                  <Link href={dashboardHref} className="text-amber-200 text-sm font-semibold" onClick={() => setOpen(false)}>
                    {user.role === 'admin' ? '⚙️ Admin Panel' : '🏠 My Dashboard'}
                  </Link>
                )}
                <span className="text-amber-300 text-sm">Hi, {user.name}</span>
                <button onClick={logout} className="text-left text-sm text-red-300 hover:text-red-200">Sign Out</button>
              </div>
            ) : (
              <Link href="/login" className="text-amber-200 text-sm font-semibold" onClick={() => setOpen(false)}>Sign In / Register</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
