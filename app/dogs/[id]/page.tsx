import getDb from "@/lib/db";
import { notFound } from "next/navigation";
import AdoptionForm from "./AdoptionForm";

interface Dog {
  id: number; name: string; breed: string; age: string; gender: string;
  size: string; status: string; bio: string; image_url: string;
  good_with_kids: number; good_with_dogs: number; good_with_cats: number;
}

export default function DogProfilePage({ params }: { params: { id: string } }) {
  const db = getDb();
  const dog = db.prepare("SELECT * FROM dogs WHERE id = ?").get(params.id) as Dog | undefined;
  if (!dog) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Photo */}
        <div>
          <img
            src={dog.image_url || `https://picsum.photos/seed/${dog.id}/600/400`}
            alt={dog.name}
            className="w-full rounded-2xl shadow-lg object-cover h-96"
          />
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className={`text-center py-3 rounded-xl text-sm font-medium ${dog.good_with_kids ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>
              {dog.good_with_kids ? "✅" : "❌"} Kids
            </div>
            <div className={`text-center py-3 rounded-xl text-sm font-medium ${dog.good_with_dogs ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>
              {dog.good_with_dogs ? "✅" : "❌"} Dogs
            </div>
            <div className={`text-center py-3 rounded-xl text-sm font-medium ${dog.good_with_cats ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>
              {dog.good_with_cats ? "✅" : "❌"} Cats
            </div>
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-4xl font-bold text-amber-900">{dog.name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${dog.status === "Available" ? "bg-green-100 text-green-800" : dog.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600"}`}>
              {dog.status}
            </span>
          </div>
          <p className="text-amber-600 text-lg mb-4">{dog.breed}</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-amber-50 rounded-xl p-3">
              <div className="text-xs text-amber-500 uppercase font-bold">Age</div>
              <div className="font-semibold text-amber-900">{dog.age}</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3">
              <div className="text-xs text-amber-500 uppercase font-bold">Gender</div>
              <div className="font-semibold text-amber-900">{dog.gender}</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-3">
              <div className="text-xs text-amber-500 uppercase font-bold">Size</div>
              <div className="font-semibold text-amber-900">{dog.size}</div>
            </div>
          </div>

          <h2 className="font-bold text-amber-900 mb-2">About {dog.name}</h2>
          <p className="text-gray-600 leading-relaxed">{dog.bio}</p>
        </div>
      </div>

      {/* Adoption Form */}
      {dog.status === "Available" && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">Apply to Adopt {dog.name} 🐾</h2>
          <AdoptionForm dogId={dog.id} dogName={dog.name} />
        </div>
      )}
    </div>
  );
}
