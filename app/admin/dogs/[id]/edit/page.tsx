import { redirect, notFound } from "next/navigation";
import getDb from "@/lib/db";
import { DogFormFields } from "../../new/page";

async function updateDog(formData: FormData) {
  "use server";
  const id = formData.get("id");
  const db = getDb();
  db.prepare(`
    UPDATE dogs SET name=?, breed=?, age=?, gender=?, size=?, status=?, bio=?, image_url=?,
    good_with_kids=?, good_with_dogs=?, good_with_cats=? WHERE id=?
  `).run(
    formData.get("name"), formData.get("breed"), formData.get("age"),
    formData.get("gender"), formData.get("size"), formData.get("status"),
    formData.get("bio"), formData.get("image_url"),
    formData.get("good_with_kids") ? 1 : 0,
    formData.get("good_with_dogs") ? 1 : 0,
    formData.get("good_with_cats") ? 1 : 0,
    id,
  );
  redirect("/admin/dogs");
}

export default function EditDogPage({ params }: { params: { id: string } }) {
  const db = getDb();
  const dog = db.prepare("SELECT * FROM dogs WHERE id = ?").get(params.id) as Record<string, string | number> | undefined;
  if (!dog) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-amber-900 mb-6">Edit {dog.name}</h1>
      <form action={updateDog} className="bg-white rounded-2xl shadow p-8 grid gap-5">
        <input type="hidden" name="id" value={dog.id as number} />
        <DogFormFields dog={dog} />
        <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full font-bold">
          Save Changes
        </button>
      </form>
    </div>
  );
}
