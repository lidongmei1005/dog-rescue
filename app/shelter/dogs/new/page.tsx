export const dynamic = 'force-dynamic';
import { getSession } from "@/lib/auth";
import { execute, initDb } from "@/lib/db";
import { redirect } from "next/navigation";
import { DogFormFields } from "@/app/admin/dogs/new/page";

async function createDog(formData: FormData) {
  "use server";
  await initDb();
  const { getSession } = await import("@/lib/auth");
  const user = await getSession();
  if (!user || (user.role !== 'shelter' && user.role !== 'admin')) return;
  const str = (k: string) => formData.get(k) as string | null;
  await execute(
    `INSERT INTO dogs (name,breed,age,gender,size,status,bio,image_url,good_with_kids,good_with_dogs,good_with_cats,shelter_id,shelter_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [str("name"), str("breed"), str("age"), str("gender"), str("size"), str("status"),
     str("bio"), str("image_url"),
     formData.get("good_with_kids") ? 1 : 0,
     formData.get("good_with_dogs") ? 1 : 0,
     formData.get("good_with_cats") ? 1 : 0,
     user.id, user.shelter_name || user.name]
  );
  redirect("/shelter/dogs");
}

export default async function NewShelterDogPage() {
  const user = await getSession();
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-amber-900 mb-2">Add New Dog</h1>
      <p className="text-amber-600 text-sm mb-6">This dog will be listed under <strong>{user?.shelter_name || user?.name}</strong></p>
      <form action={createDog} className="bg-white rounded-2xl shadow p-8 grid gap-5">
        <DogFormFields />
        <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-bold">Add Dog</button>
      </form>
    </div>
  );
}
