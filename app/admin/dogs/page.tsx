export const dynamic = 'force-dynamic'

import { query, execute, initDb } from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import StatusSelect from "./StatusSelect";

interface Dog { id: number; name: string; breed: string; age: string; status: string; }

async function deleteDog(formData: FormData) {
  "use server";
  await execute("DELETE FROM dogs WHERE id = ?", [String(formData.get("id"))]);
  revalidatePath("/admin/dogs"); revalidatePath("/dogs");
}

async function updateStatus(formData: FormData) {
  "use server";
  await execute("UPDATE dogs SET status = ? WHERE id = ?", [String(formData.get("status")), String(formData.get("id"))]);
  revalidatePath("/admin/dogs"); revalidatePath("/dogs");
}

export default async function AdminDogsPage() {
  await initDb();
  const dogs = await query<Dog>("SELECT * FROM dogs ORDER BY created_at DESC");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-amber-900">Manage Dogs</h1>
        <Link href="/admin/dogs/new" className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full font-semibold">+ Add Dog</Link>
      </div>
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-amber-50 text-amber-800">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Breed</th>
              <th className="text-left px-4 py-3">Age</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dogs.map((dog) => (
              <tr key={dog.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{dog.name}</td>
                <td className="px-4 py-3 text-gray-500">{dog.breed}</td>
                <td className="px-4 py-3 text-gray-500">{dog.age}</td>
                <td className="px-4 py-3"><StatusSelect id={dog.id} status={dog.status} action={updateStatus} /></td>
                <td className="px-4 py-3 flex gap-3">
                  <Link href={`/admin/dogs/${dog.id}/edit`} className="text-amber-600 hover:underline">Edit</Link>
                  <form action={deleteDog} className="inline">
                    <input type="hidden" name="id" value={dog.id} />
                    <button type="submit" className="text-red-500 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {dogs.length === 0 && <p className="text-center py-8 text-gray-400">No dogs yet.</p>}
      </div>
    </div>
  );
}

