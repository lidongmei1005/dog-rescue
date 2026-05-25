export const dynamic = 'force-dynamic'

import Link from "next/link";
import { query, initDb } from "@/lib/db";
import DogCard from "@/components/DogCard";

interface Dog {
  id: number; name: string; breed: string; age: string; gender: string;
  size: string; status: string; bio: string; image_url: string;
}

export default async function Home() {
  await initDb();
  const featuredDogs = await query<Dog>("SELECT * FROM dogs WHERE status = 'Available' LIMIT 3");

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-amber-800 text-white py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&fit=crop')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className="relative max-w-3xl mx-auto">
          <div className="text-6xl mb-4">ðŸ¾</div>
          <h1 className="text-5xl font-bold mb-4 leading-tight">Every Dog Deserves a<br/>Loving Home</h1>
          <p className="text-xl text-amber-100 mb-8 max-w-xl mx-auto">
            We rescue, rehabilitate, and rehome dogs in need. Your perfect companion is waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dogs" className="bg-amber-400 text-amber-950 px-8 py-4 rounded-full text-lg font-bold hover:bg-amber-300 transition-colors shadow-lg">
              Meet Our Dogs ðŸ¶
            </Link>
            <Link href="/donate" className="bg-white/20 backdrop-blur text-white border-2 border-white/50 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/30 transition-colors">
              Support Us â¤ï¸
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-100 py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div><div className="text-4xl font-bold text-amber-800">500+</div><div className="text-amber-700 text-sm mt-1">Dogs Rescued</div></div>
          <div><div className="text-4xl font-bold text-amber-800">450+</div><div className="text-amber-700 text-sm mt-1">Happy Adoptions</div></div>
          <div><div className="text-4xl font-bold text-amber-800">10+</div><div className="text-amber-700 text-sm mt-1">Years of Love</div></div>
        </div>
      </section>

      {/* Featured Dogs */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-amber-900 mb-2">Dogs Looking for Homes</h2>
          <p className="text-center text-amber-700 mb-10">These sweet souls are waiting to meet you</p>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredDogs.map((dog) => <DogCard key={dog.id} dog={dog} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/dogs" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              See All Available Dogs â†’
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-amber-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900 mb-10">How Adoption Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", icon: "ðŸ”", title: "Browse Dogs", desc: "Explore our gallery of dogs looking for their forever homes" },
              { step: "2", icon: "ðŸ“", title: "Apply", desc: "Submit an adoption application â€” it takes just a few minutes" },
              { step: "3", icon: "ðŸ ", title: "Welcome Home!", desc: "We'll review your application and set up a meet-and-greet" },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-3">{s.icon}</div>
                <div className="text-xs font-bold text-amber-500 uppercase tracking-wide mb-1">Step {s.step}</div>
                <h3 className="font-bold text-lg text-amber-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-700 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Can't Adopt? You Can Still Help!</h2>
        <p className="text-amber-100 mb-8 max-w-xl mx-auto">Donate, volunteer, or foster â€” every little bit helps us save more lives.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/donate" className="bg-white text-amber-800 px-8 py-3 rounded-full font-bold hover:bg-amber-100 transition-colors">Make a Donation</Link>
          <Link href="/donate#volunteer" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors">Volunteer</Link>
        </div>
      </section>
    </div>
  );
}

