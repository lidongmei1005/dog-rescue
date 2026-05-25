"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pw === "rescue123") {
      document.cookie = "admin_auth=rescue123; path=/";
      window.location.href = "/admin/dogs";
    } else {
      setError(true);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        <div className="text-5xl mb-4">🔐</div>
        <h1 className="text-2xl font-bold text-amber-900 mb-2">Staff Login</h1>
        <p className="text-amber-600 text-sm mb-8">Paws & Hearts Rescue Admin Panel</p>
        <form onSubmit={handleLogin} className="grid gap-4">
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false); }}
            className="w-full border border-amber-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 text-center text-lg"
          />
          {error && <p className="text-red-500 text-sm">Incorrect password</p>}
          <button type="submit" className="bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-full font-bold transition-colors">
            Log In
          </button>
        </form>
        <Link href="/" className="mt-6 inline-block text-sm text-amber-500 hover:underline">← Back to Site</Link>
      </div>
    </div>
  );
}
