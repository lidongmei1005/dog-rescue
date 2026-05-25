export const dynamic = 'force-dynamic';
import { getSession } from "@/lib/auth";
import { query, execute, initDb } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import { DogFormFields } from "@/app/admin/dogs/new/page";

async function updateDog(formData: FormData) {
  "use server";
  const { getSession } = await import("@/lib/auth");
  const user = await getSession();
  if (!user) return;
  const str = (k: string) => formData.get(k) as string | null;
  await execute(
    `UPDATE dogs SET name=?,breed=?,age=?,gender=?,size=?,status=?,bio=?,image_url=?,good_with_kids=?,good_with_dogs=?,good_with_cats=? WHERE id=? AND shelter_id=?`,
    [str("name"), str("breed"), str("age"), str("gender"), str("size"), str("status"),
     str("bio"), str("image_url"),
     formData.get("good_with_kids") ? 1 : 0,
     formData.get("good_with_dogs") ? 1 : 0,
     formData.get("good_with_cats") ? 1 : 0,
     str("id"), String(user.id)]
  );
  redirect("/shelter/dogs");
}

export default async function EditShelterDogPage({ params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  const user = await getSession();
  const dogs = await query<Record<string, unknown>>("SELECT * FROM dogs WHERE id = ? AND shelter_id = ?", [id, user!.id]);
  const dog = dogs[0];
  if (!dog) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-amber-900 mb-6">Edit {dog.name as string}</h1>
      <form action={updateDog} className="bg-white rounded-2xl shadow p-8 grid gap-5">
        <input type="hidden" name="id" value={dog.id as number} />
        <DogFormFields dog={dog} />
        <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-bold">Save Changes</button>
      </form>
    </div>
  );
}
