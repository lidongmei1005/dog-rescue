export const dynamic = 'force-dynamic';
import { getSession } from "@/lib/auth";
import { query, execute, initDb } from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";

interface Dog { id: number; name: string; breed: string; age: string; status: string; }

async function updateStatus(formData: FormData) {
  "use server";
  await execute("UPDATE dogs SET status = ? WHERE id = ? AND shelter_id = ?",
    [String(formData.get("status")), String(formData.get("id")), String(formData.get("shelter_id"))]);
  revalidatePath("/shelter/dogs");
}

async function deleteDog(formData: FormData) {
  "use server";
  await execute("DELETE FROM dogs WHERE id = ? AND shelter_id = ?",
    [String(formData.get("id")), String(formData.get("shelter_id"))]);
  revalidatePath("/shelter/dogs");
}

export default async function ShelterDogsPage() {
  await initDb();
  const user = await getSession();
  const dogs = await query<Dog>("SELECT * FROM dogs WHERE shelter_id = ? ORDER BY created_at DESC", [user!.id]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-amber-900">My Dogs ({dogs.length})</h1>
        <Link href="/shelter/dogs/new" className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full font-semibold">+ Add Dog</Link>
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
            {dogs.map(dog => (
              <tr key={dog.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{dog.name}</td>
                <td className="px-4 py-3 text-gray-500">{dog.breed}</td>
                <td className="px-4 py-3 text-gray-500">{dog.age}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${dog.status === 'Available' ? 'bg-green-100 text-green-700' : dog.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                    {dog.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-3">
                  <Link href={`/shelter/dogs/${dog.id}/edit`} className="text-amber-600 hover:underline">Edit</Link>
                  <form action={deleteDog} className="inline">
                    <input type="hidden" name="id" value={dog.id} />
                    <input type="hidden" name="shelter_id" value={user!.id} />
                    <button type="submit" className="text-red-500 hover:underline">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {dogs.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="mb-3">No dogs yet!</p>
            <Link href="/shelter/dogs/new" className="text-amber-600 hover:underline font-semibold">Add your first dog →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
