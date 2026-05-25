"use client";
import { useState } from "react";

export default function DonatePage() {
  const [volSubmitted, setVolSubmitted] = useState(false);

  async function handleVolunteer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    await fetch("/api/volunteer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setVolSubmitted(true);
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-amber-700 text-white py-16 px-4 text-center">
        <div className="text-5xl mb-4">❤️</div>
        <h1 className="text-4xl font-bold mb-3">Support Our Mission</h1>
        <p className="text-amber-100 max-w-xl mx-auto">Every donation helps us rescue more dogs, provide medical care, and find forever homes.</p>
      </section>

      {/* Donation tiers */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-10">Make a Donation</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { amount: "$25", title: "Kibble Supporter", desc: "Provides food for one dog for a week", emoji: "🦴" },
            { amount: "$50", title: "Paw Pal", desc: "Covers vaccinations for a rescue dog", emoji: "💉", popular: true },
            { amount: "$100", title: "Rescue Hero", desc: "Sponsors a dog's medical care for a month", emoji: "🏥" },
          ].map((tier) => (
            <div key={tier.amount} className={`rounded-2xl p-6 text-center shadow-md ${tier.popular ? "bg-amber-700 text-white ring-4 ring-amber-400" : "bg-white"}`}>
              {tier.popular && <div className="text-xs font-bold mb-2 bg-amber-400 text-amber-950 rounded-full px-3 py-1 inline-block">Most Popular</div>}
              <div className="text-4xl mb-3">{tier.emoji}</div>
              <div className={`text-3xl font-bold mb-1 ${tier.popular ? "text-white" : "text-amber-900"}`}>{tier.amount}</div>
              <div className={`font-semibold mb-2 ${tier.popular ? "text-amber-100" : "text-amber-800"}`}>{tier.title}</div>
              <p className={`text-sm mb-5 ${tier.popular ? "text-amber-200" : "text-gray-500"}`}>{tier.desc}</p>
              <button className={`w-full py-2 rounded-full font-bold transition-colors ${tier.popular ? "bg-white text-amber-800 hover:bg-amber-100" : "bg-amber-600 text-white hover:bg-amber-700"}`}>
                Donate {tier.amount}
              </button>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 rounded-2xl p-6 text-center">
          <p className="text-amber-700 mb-4">Want to choose your own amount? Reach out to us directly.</p>
          <a href="mailto:hello@pawsandhearts.org" className="text-amber-600 font-semibold hover:underline">hello@pawsandhearts.org</a>
        </div>
      </section>

      {/* Volunteer */}
      <section id="volunteer" className="bg-amber-50 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-3">Volunteer With Us</h2>
          <p className="text-center text-amber-700 mb-8">Can't donate? Your time is just as valuable. Help walk dogs, assist at events, or foster!</p>

          {volSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-green-800">Thank you for signing up!</h3>
              <p className="text-green-700 mt-2">We'll reach out with next steps soon.</p>
            </div>
          ) : (
            <form onSubmit={handleVolunteer} className="bg-white rounded-2xl shadow-md p-8 grid gap-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-1">Name *</label>
                  <input name="name" required className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-1">Email *</label>
                  <input name="email" type="email" required className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1">Phone</label>
                <input name="phone" type="tel" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1">How would you like to help?</label>
                <textarea name="interests" rows={2} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="e.g., dog walking, fostering, events, social media..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1">Availability</label>
                <input name="availability" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="e.g., weekends, weekday mornings..." />
              </div>
              <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors">
                Sign Up to Volunteer 🐾
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
