"use client";
import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function ShelterSignupPage() {
  const [form, setForm] = useState({ name: "", shelter_name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLanguage();
  const zh = lang === 'zh';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) { setError(zh ? '密码不匹配' : 'Passwords do not match'); return; }
    setLoading(true); setError("");
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: "shelter", shelter_name: form.shelter_name }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error); return; }
    setSubmitted(true);
  }

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        <div className="text-6xl mb-4">⏳</div>
        <h2 className="text-2xl font-bold text-amber-900 mb-3">{zh ? '申请已提交！' : 'Application Submitted!'}</h2>
        <p className="text-amber-700 mb-6">{zh ? '您的收容所账户申请正在等待管理员审批。审批通过后我们将通过邮件通知您。' : 'Your shelter account is pending admin approval. We\'ll notify you by email once approved.'}</p>
        <Link href="/" className="bg-amber-600 text-white px-6 py-2 rounded-full font-bold hover:bg-amber-700">{zh ? '返回首页' : 'Back to Home'}</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏠</div>
          <h1 className="text-2xl font-bold text-amber-900">{zh ? '注册收容所账户' : 'Register Your Shelter'}</h1>
          <p className="text-amber-600 text-sm mt-1">{zh ? '申请后需等待管理员审批' : 'Requires admin approval after signup'}</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {[
            { key: 'name', label: zh ? '您的姓名' : 'Your Name', type: 'text' },
            { key: 'shelter_name', label: zh ? '收容所名称' : 'Shelter Name', type: 'text' },
            { key: 'email', label: zh ? '电子邮箱' : 'Email', type: 'email' },
            { key: 'password', label: zh ? '密码' : 'Password', type: 'password' },
            { key: 'confirm', label: zh ? '确认密码' : 'Confirm Password', type: 'password' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-sm font-semibold text-amber-900 mb-1">{f.label}</label>
              <input type={f.type} required value={form[f.key as keyof typeof form]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
          ))}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" disabled={loading}
            className="bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-full font-bold transition-colors disabled:opacity-50">
            {loading ? (zh ? '提交中...' : 'Submitting...') : (zh ? '提交申请' : 'Submit Application')}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-amber-700">
          {zh ? '已有账户？' : 'Already have an account?'}{' '}
          <Link href="/login" className="text-amber-600 font-semibold hover:underline">{zh ? '登录' : 'Sign In'}</Link>
        </p>
      </div>
    </div>
  );
}
