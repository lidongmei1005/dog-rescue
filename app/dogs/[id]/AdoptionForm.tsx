"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/translations";

export default function AdoptionForm({ dogId, dogName }: { dogId: number; dogName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { tx } = useLanguage();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    await fetch("/api/adopt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, dog_id: dogId, dog_name: dogName }),
    });
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">{tx(t.form_success_title)}</h3>
        <p className="text-green-700">{tx(t.form_success_msg)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 grid gap-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.form_name)} *</label>
          <input name="applicant_name" required className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.form_email)} *</label>
          <input name="email" type="email" required className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.form_phone)}</label>
          <input name="phone" type="tel" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.form_home_type)}</label>
          <select name="home_type" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400">
            <option>{tx(t.form_home_house_yard)}</option>
            <option>{tx(t.form_home_house)}</option>
            <option>{tx(t.form_home_apt)}</option>
            <option>{tx(t.form_home_condo)}</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.form_why)}</label>
        <textarea name="reason" rows={3} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={tx(t.form_why_placeholder)} />
      </div>
      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.form_experience)}</label>
        <textarea name="experience" rows={2} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={tx(t.form_experience_placeholder)} />
      </div>
      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.form_other_pets)}</label>
        <input name="other_pets" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={tx(t.form_other_pets_placeholder)} />
      </div>
      <button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors disabled:opacity-50">
        {loading ? tx(t.form_submitting) : tx(t.form_submit)}
      </button>
    </form>
  );
}
