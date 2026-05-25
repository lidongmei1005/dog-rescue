"use client";
import { useState } from "react";

export default function AboutPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSubmitted(true);
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-amber-800 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">About Paws & Hearts Rescue</h1>
        <p className="text-amber-100 max-w-xl mx-auto">We're a volunteer-run nonprofit dedicated to giving every dog a second chance at a happy life.</p>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2014, Paws & Hearts Rescue has saved over 500 dogs from shelters and difficult situations. We believe every dog deserves a loving, permanent home — not just survival.
            </p>
            <p className="text-gray-600 mb-4">
              We focus on comprehensive rehabilitation: medical care, behavioral training, and socialization before placement. We match dogs carefully with families to ensure lasting bonds.
            </p>
            <p className="text-gray-600">
              We are 100% volunteer-run and funded by donations and adoption fees. Every dollar goes directly to the dogs.
            </p>
          </div>
          <div className="bg-amber-100 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🐾</div>
            <div className="grid grid-cols-2 gap-4">
              {[["500+", "Dogs Rescued"], ["450+", "Adoptions"], ["50+", "Volunteers"], ["10+", "Years Active"]].map(([n, l]) => (
                <div key={l} className="bg-white rounded-xl p-3">
                  <div className="text-2xl font-bold text-amber-800">{n}</div>
                  <div className="text-xs text-amber-600">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-amber-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-10">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah Chen", role: "Founder & Director", emoji: "👩" },
              { name: "Marcus Rivera", role: "Lead Trainer", emoji: "👨" },
              { name: "Priya Patel", role: "Veterinary Coordinator", emoji: "👩" },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-5xl mb-3">{member.emoji}</div>
                <h3 className="font-bold text-amber-900">{member.name}</h3>
                <p className="text-amber-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-3">Get in Touch</h2>
          <p className="text-center text-amber-700 mb-8">Questions about adoption, fostering, or anything else? We'd love to hear from you.</p>

          <div className="grid md:grid-cols-3 gap-4 mb-10 text-center">
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-2xl mb-2">📍</div>
              <div className="text-sm text-amber-800">123 Rescue Lane<br/>Pawville, CA 90210</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-2xl mb-2">📞</div>
              <div className="text-sm text-amber-800">(555) 123-PAWS</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <div className="text-2xl mb-2">✉️</div>
              <div className="text-sm text-amber-800">hello@pawsandhearts.org</div>
            </div>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-3">📬</div>
              <h3 className="text-xl font-bold text-green-800">Message Sent!</h3>
              <p className="text-green-700 mt-2">We'll get back to you within 1-2 business days.</p>
            </div>
          ) : (
            <form onSubmit={handleContact} className="bg-white rounded-2xl shadow-md p-8 grid gap-5">
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
                <label className="block text-sm font-semibold text-amber-900 mb-1">Subject</label>
                <input name="subject" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1">Message *</label>
                <textarea name="message" required rows={4} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
