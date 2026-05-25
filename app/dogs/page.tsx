export const dynamic = 'force-dynamic'

import { query, initDb } from "@/lib/db";
import DogCard from "@/components/DogCard";

interface Dog {
  id: number; name: string; breed: string; age: string; gender: string;
  size: string; status: string; bio: string; image_url: string;
}

export default async function DogsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await initDb();
  const { status } = await searchParams;
  const dogs = status
    ? await query<Dog>("SELECT * FROM dogs WHERE status = ? ORDER BY created_at DESC", [status])
    : await query<Dog>("SELECT * FROM dogs ORDER BY CASE status WHEN 'Available' THEN 1 WHEN 'Pending' THEN 2 ELSE 3 END, created_at DESC");

  const statuses = ["Available", "Pending", "Adopted"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-amber-900 text-center mb-2">Our Dogs</h1>
      <p className="text-center text-amber-700 mb-8">Find your perfect furry companion</p>

      <div className="flex flex-wrap gap-3 justify-center mb-10">
        <a href="/dogs" className={`px-5 py-2 rounded-full font-semibold transition-colors ${!status ? "bg-amber-700 text-white" : "bg-white text-amber-700 border border-amber-300 hover:bg-amber-50"}`}>All Dogs</a>
        {statuses.map((s) => (
          <a key={s} href={`/dogs?status=${s}`} className={`px-5 py-2 rounded-full font-semibold transition-colors ${status === s ? "bg-amber-700 text-white" : "bg-white text-amber-700 border border-amber-300 hover:bg-amber-50"}`}>{s}</a>
        ))}
      </div>

      {dogs.length === 0 ? (
        <div className="text-center py-16 text-amber-600"><div className="text-5xl mb-4">🐾</div><p className="text-lg">No dogs found.</p></div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dogs.map((dog) => <DogCard key={dog.id} dog={dog} />)}
        </div>
      )}
    </div>
  );
}
