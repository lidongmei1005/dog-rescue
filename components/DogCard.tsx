"use client";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { t } from "@/lib/translations";

interface Dog {
  id: number; name: string; breed: string; age: string; gender: string;
  size: string; status: string; bio: string; image_url: string;
}

const statusColors: Record<string, string> = {
  Available: "bg-green-100 text-green-800",
  Pending: "bg-yellow-100 text-yellow-800",
  Adopted: "bg-gray-100 text-gray-600",
};

export default function DogCard({ dog }: { dog: Dog }) {
  const { tx, lang } = useLanguage();

  const statusLabel: Record<string, { en: string; zh: string }> = {
    Available: t.status_available,
    Pending: t.status_pending,
    Adopted: t.status_adopted,
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
      <div className="relative overflow-hidden h-56">
        <img
          src={dog.image_url || `https://picsum.photos/seed/${dog.id}/600/400`}
          alt={dog.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${statusColors[dog.status] || "bg-gray-100"}`}>
          {tx(statusLabel[dog.status] || { en: dog.status, zh: dog.status })}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-amber-900">{dog.name}</h3>
        <p className="text-amber-700 text-sm mb-1">{dog.breed}</p>
        <div className="flex gap-3 text-xs text-amber-600 mb-3">
          <span>🎂 {dog.age}</span>
          <span>⚧ {lang === 'zh' ? (dog.gender === 'Male' ? '雄性' : '雌性') : dog.gender}</span>
          <span>📏 {dog.size}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{dog.bio}</p>
        {dog.status === "Available" ? (
          <Link
            href={`/dogs/${dog.id}`}
            className="block text-center bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full font-semibold transition-colors"
          >
            {tx(t.card_meet)} {dog.name} 🐾
          </Link>
        ) : (
          <Link
            href={`/dogs/${dog.id}`}
            className="block text-center bg-gray-200 text-gray-500 px-4 py-2 rounded-full font-semibold"
          >
            {dog.status === "Pending" ? tx(t.card_pending) : tx(t.card_adopted)}
          </Link>
        )}
      </div>
    </div>
  );
}
