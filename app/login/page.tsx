"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { lang } = useLanguage();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error); return; }
    const { role, status } = data.user;
    if (status === "pending") { router.push("/pending-approval"); return; }
    if (role === "admin") router.push("/admin/dogs");
    else if (role === "shelter") router.push("/shelter/dashboard");
    else router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐾</div>
          <h1 className="text-2xl font-bold text-amber-900">{lang === 'zh' ? '登录' : 'Welcome Back'}</h1>
          <p className="text-amber-600 text-sm mt-1">{lang === 'zh' ? '登录您的账户' : 'Sign in to your account'}</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">{lang === 'zh' ? '电子邮箱' : 'Email'}</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">{lang === 'zh' ? '密码' : 'Password'}</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading}
            className="bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-bold transition-colors disabled:opacity-50">
            {loading ? (lang === 'zh' ? '登录中...' : 'Signing in...') : (lang === 'zh' ? '登录' : 'Sign In')}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-amber-700 space-y-2">
          <p>{lang === 'zh' ? '还没有账户？' : "Don't have an account?"}{' '}
            <Link href="/signup" className="text-amber-600 font-semibold hover:underline">
              {lang === 'zh' ? '注册' : 'Sign Up'}
            </Link>
          </p>
          <p>{lang === 'zh' ? '是收容所？' : 'Own a shelter?'}{' '}
            <Link href="/signup/shelter" className="text-amber-600 font-semibold hover:underline">
              {lang === 'zh' ? '注册收容所账户' : 'Register your shelter'}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
