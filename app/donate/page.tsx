"use client";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { t } from "@/lib/translations";

export default function DonatePage() {
  const [volSubmitted, setVolSubmitted] = useState(false);
  const { tx } = useLanguage();

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

  const tiers = [
    { amount: "$25", title: { en: "Kibble Supporter", zh: "口粮支持者" }, desc: { en: "Provides food for one dog for a week", zh: "为一只狗提供一周的食物" }, emoji: "🦴" },
    { amount: "$50", title: { en: "Paw Pal", zh: "爱心伙伴" }, desc: { en: "Covers vaccinations for a rescue dog", zh: "为一只救助犬支付疫苗费用" }, emoji: "💉", popular: true },
    { amount: "$100", title: { en: "Rescue Hero", zh: "救援英雄" }, desc: { en: "Sponsors a dog's medical care for a month", zh: "赞助一只狗一个月的医疗护理" }, emoji: "🏥" },
  ];

  return (
    <div>
      <section className="bg-amber-700 text-white py-16 px-4 text-center">
        <div className="text-5xl mb-4">❤️</div>
        <h1 className="text-4xl font-bold mb-3">{tx(t.donate_hero_title)}</h1>
        <p className="text-amber-100 max-w-xl mx-auto">{tx(t.donate_hero_sub)}</p>
      </section>

      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-amber-900 text-center mb-10">{tx(t.donate_title)}</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {tiers.map((tier) => (
            <div key={tier.amount} className={`rounded-2xl p-6 text-center shadow-md ${tier.popular ? "bg-amber-700 text-white ring-4 ring-amber-400" : "bg-white"}`}>
              {tier.popular && <div className="text-xs font-bold mb-2 bg-amber-400 text-amber-950 rounded-full px-3 py-1 inline-block">{tx(t.donate_popular)}</div>}
              <div className="text-4xl mb-3">{tier.emoji}</div>
              <div className={`text-3xl font-bold mb-1 ${tier.popular ? "text-white" : "text-amber-900"}`}>{tier.amount}</div>
              <div className={`font-semibold mb-2 ${tier.popular ? "text-amber-100" : "text-amber-800"}`}>{tx(tier.title)}</div>
              <p className={`text-sm mb-5 ${tier.popular ? "text-amber-200" : "text-gray-500"}`}>{tx(tier.desc)}</p>
              <button className={`w-full py-2 rounded-full font-bold transition-colors ${tier.popular ? "bg-white text-amber-800 hover:bg-amber-100" : "bg-amber-600 text-white hover:bg-amber-700"}`}>
                {tx(t.donate_btn)} {tier.amount}
              </button>
            </div>
          ))}
        </div>
        <div className="bg-amber-50 rounded-2xl p-6 text-center">
          <p className="text-amber-700 mb-4">{tx(t.donate_custom)}</p>
          <a href="mailto:hello@pawsandhearts.org" className="text-amber-600 font-semibold hover:underline">hello@pawsandhearts.org</a>
        </div>
      </section>

      <section id="volunteer" className="bg-amber-50 py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-900 text-center mb-3">{tx(t.volunteer_title)}</h2>
          <p className="text-center text-amber-700 mb-8">{tx(t.volunteer_sub)}</p>

          {volSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-green-800">{tx(t.volunteer_success_title)}</h3>
              <p className="text-green-700 mt-2">{tx(t.volunteer_success_msg)}</p>
            </div>
          ) : (
            <form onSubmit={handleVolunteer} className="bg-white rounded-2xl shadow-md p-8 grid gap-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.volunteer_name)} *</label>
                  <input name="name" required className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.form_email)} *</label>
                  <input name="email" type="email" required className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.form_phone)}</label>
                <input name="phone" type="tel" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.volunteer_interests)}</label>
                <textarea name="interests" rows={2} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={tx(t.volunteer_interests_placeholder)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-amber-900 mb-1">{tx(t.volunteer_availability)}</label>
                <input name="availability" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder={tx(t.volunteer_availability_placeholder)} />
              </div>
              <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors">
                {tx(t.volunteer_btn)}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
