export const dynamic = 'force-dynamic'

import { query, initDb } from "@/lib/db";

interface Resource {
  id: number; title: string; description: string; category: string; url: string;
}

const categoryIcons: Record<string, string> = {
  "Getting Started": "🏠",
  "Training & Behavior": "🎓",
  "Health & Care": "🏥",
};

export default async function ResourcesPage() {
  await initDb();
  const resources = await query<Resource>("SELECT * FROM resources ORDER BY category, created_at DESC");

  const byCategory: Record<string, Resource[]> = {};
  for (const r of resources) {
    if (!byCategory[r.category]) byCategory[r.category] = [];
    byCategory[r.category].push(r);
  }

  return (
    <div>
      <section className="bg-amber-700 text-white py-16 px-4 text-center">
        <div className="text-5xl mb-4">📚</div>
        <h1 className="text-4xl font-bold mb-3">Resources</h1>
        <p className="text-amber-100 max-w-xl mx-auto">Everything you need to be an amazing dog parent — guides, articles, and tips from our team.</p>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {Object.entries(byCategory).map(([category, items]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-amber-900 mb-6 flex items-center gap-2">
              <span>{categoryIcons[category] || "📄"}</span><span>{category}</span>
            </h2>
            <div className="grid gap-4">
              {items.map((r) => (
                <div key={r.id} className="bg-white rounded-2xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                  <div className="text-3xl flex-shrink-0">{categoryIcons[r.category] || "📄"}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-amber-900 text-lg mb-1">{r.title}</h3>
                    {r.description && <p className="text-gray-600 text-sm mb-3">{r.description}</p>}
                    {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 text-sm font-semibold">Read More →</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {resources.length === 0 && <div className="text-center py-16 text-amber-600"><div className="text-5xl mb-4">📭</div><p>No resources posted yet.</p></div>}
      </div>
    </div>
  );
}
