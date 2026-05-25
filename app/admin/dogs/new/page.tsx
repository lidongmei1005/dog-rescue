import { redirect } from "next/navigation";
import { execute, initDb } from "@/lib/db";

const str = (fd: FormData, key: string) => fd.get(key) as string | null;

async function createDog(formData: FormData) {
  "use server";
  await execute(
    `INSERT INTO dogs (name,breed,age,gender,size,status,bio,image_url,good_with_kids,good_with_dogs,good_with_cats) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [
      str(formData,"name"), str(formData,"breed"), str(formData,"age"),
      str(formData,"gender"), str(formData,"size"), str(formData,"status"),
      str(formData,"bio"), str(formData,"image_url"),
      formData.get("good_with_kids") ? 1 : 0,
      formData.get("good_with_dogs") ? 1 : 0,
      formData.get("good_with_cats") ? 1 : 0,
    ]
  );
  redirect("/admin/dogs");
}

export default async function NewDogPage() {
  await initDb();
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-amber-900 mb-6">Add New Dog</h1>
      <form action={createDog} className="bg-white rounded-2xl shadow p-8 grid gap-5">
        <DogFormFields />
        <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-bold">Add Dog</button>
      </form>
    </div>
  );
}

export function DogFormFields({ dog }: { dog?: Record<string, unknown> }) {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-5">
        {[["name","Name","text",""], ["breed","Breed","text",""]].map(([n,l,t,p]) => (
          <div key={n}>
            <label className="block text-sm font-semibold text-amber-900 mb-1">{l} *</label>
            <input name={n} required type={t} placeholder={p} defaultValue={dog?.[n] as string} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>
        ))}
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">Age</label>
          <input name="age" defaultValue={dog?.age as string} placeholder="e.g. 3 years" className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">Gender</label>
          <select name="gender" defaultValue={dog?.gender as string} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400">
            <option>Male</option><option>Female</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">Size</label>
          <select name="size" defaultValue={dog?.size as string} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400">
            <option>Small</option><option>Medium</option><option>Large</option><option>Extra Large</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-amber-900 mb-1">Status</label>
          <select name="status" defaultValue={dog?.status as string ?? "Available"} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400">
            <option>Available</option><option>Pending</option><option>Adopted</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1">Photo URL</label>
        <input name="image_url" defaultValue={dog?.image_url as string} placeholder="https://..." className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1">Bio</label>
        <textarea name="bio" rows={4} defaultValue={dog?.bio as string} className="w-full border border-amber-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-amber-900">
          <input type="checkbox" name="good_with_kids" defaultChecked={!!dog?.good_with_kids} /> Good with Kids
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-amber-900">
          <input type="checkbox" name="good_with_dogs" defaultChecked={!!dog?.good_with_dogs} /> Good with Dogs
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-amber-900">
          <input type="checkbox" name="good_with_cats" defaultChecked={!!dog?.good_with_cats} /> Good with Cats
        </label>
      </div>
    </>
  );
}
