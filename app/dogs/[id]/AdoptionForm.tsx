"use client";
import { useState } from "react";

export default function AdoptionForm({ dogId, dogName }: { dogId: number; dogName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
        <h3 className="text-xl font-bold text-green-800 mb-2">Application Submitted!</h3>
        <p className="text-green-700">Thank you for your interest in adopting {dogName}! We'll review your application and be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 grid gap-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">Your Name *</label>
          <input name="applicant_name" required className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">Email *</label>
          <input name="email" type="email" required className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">Phone</label>
          <input name="phone" type="tel" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">Home Type</label>
          <select name="home_type" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400">
            <option>House with yard</option>
            <option>House without yard</option>
            <option>Apartment</option>
            <option>Condo</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1">Why do you want to adopt {dogName}?</label>
        <textarea name="reason" rows={3} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Tell us about yourself and why you'd be a great fit..." />
      </div>
      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1">Pet Experience</label>
        <textarea name="experience" rows={2} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Any previous experience with dogs or other pets?" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1">Other Pets at Home</label>
        <input name="other_pets" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="e.g. 1 cat, 1 dog, none" />
      </div>
      <button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors disabled:opacity-50">
        {loading ? "Submitting..." : "Submit Application 🐾"}
      </button>
    </form>
  );
}
