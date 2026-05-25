import { redirect, notFound } from "next/navigation";
import { query, execute, initDb } from "@/lib/db";
import { DogFormFields } from "../../new/page";

const str = (fd: FormData, key: string) => fd.get(key) as string | null;

async function updateDog(formData: FormData) {
  "use server";
  await execute(
    `UPDATE dogs SET name=?,breed=?,age=?,gender=?,size=?,status=?,bio=?,image_url=?,good_with_kids=?,good_with_dogs=?,good_with_cats=? WHERE id=?`,
    [
      str(formData,"name"), str(formData,"breed"), str(formData,"age"),
      str(formData,"gender"), str(formData,"size"), str(formData,"status"),
      str(formData,"bio"), str(formData,"image_url"),
      formData.get("good_with_kids") ? 1 : 0,
      formData.get("good_with_dogs") ? 1 : 0,
      formData.get("good_with_cats") ? 1 : 0,
      str(formData,"id"),
    ]
  );
  redirect("/admin/dogs");
}

export default async function EditDogPage({ params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  const dogs = await query<Record<string, unknown>>("SELECT * FROM dogs WHERE id = ?", [id]);
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
