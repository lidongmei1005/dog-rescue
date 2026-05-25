import getDb from "@/lib/db";
import { revalidatePath } from "next/cache";

interface Resource {
  id: number; title: string; description: string; category: string; url: string; created_at: string;
}

async function createResource(formData: FormData) {
  "use server";
  const db = getDb();
  db.prepare("INSERT INTO resources (title, description, category, url) VALUES (?, ?, ?, ?)")
    .run(formData.get("title"), formData.get("description"), formData.get("category"), formData.get("url") || null);
  revalidatePath("/admin/resources");
  revalidatePath("/resources");
}

async function deleteResource(formData: FormData) {
  "use server";
  const db = getDb();
  db.prepare("DELETE FROM resources WHERE id = ?").run(formData.get("id"));
  revalidatePath("/admin/resources");
  revalidatePath("/resources");
}

export default function AdminResourcesPage() {
  const db = getDb();
  const resources = db.prepare("SELECT * FROM resources ORDER BY created_at DESC").all() as Resource[];

  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-900 mb-6">Manage Resources</h1>

      {/* Add form */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="font-bold text-amber-900 mb-4">Add New Resource</h2>
        <form action={createResource} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">Title *</label>
            <input name="title" required className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-amber-900 mb-1">Category *</label>
            <input name="category" required placeholder="e.g. Getting Started, Health & Care" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-amber-900 mb-1">Description</label>
            <textarea name="description" rows={2} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-amber-900 mb-1">URL (optional)</label>
            <input name="url" type="url" placeholder="https://..." className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-bold">
              Add Resource
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-amber-50 text-amber-800">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">URL</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium">{r.title}</td>
                <td className="px-4 py-3 text-gray-500">{r.category}</td>
                <td className="px-4 py-3 text-blue-500 truncate max-w-xs">
                  {r.url ? <a href={r.url} target="_blank" rel="noreferrer" className="hover:underline">Link</a> : "—"}
                </td>
                <td className="px-4 py-3">
                  <form action={deleteResource} className="inline">
                    <input type="hidden" name="id" value={r.id} />
                    <button type="submit" className="text-red-500 hover:underline text-sm">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {resources.length === 0 && <p className="text-center py-8 text-gray-400">No resources yet.</p>}
      </div>
    </div>
  );
}
