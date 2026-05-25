export const dynamic = 'force-dynamic'

import { query, execute, initDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import AppStatusSelect from "./AppStatusSelect";

interface Application {
  id: number; dog_name: string; applicant_name: string; email: string; phone: string;
  reason: string; home_type: string; other_pets: string; status: string; created_at: string;
}

async function updateAppStatus(formData: FormData) {
  "use server";
  await execute("UPDATE adoption_applications SET status = ? WHERE id = ?", [String(formData.get("status")), String(formData.get("id"))]);
  revalidatePath("/admin/applications");
}

export default async function AdminApplicationsPage() {
  await initDb();
  const apps = await query<Application>("SELECT * FROM adoption_applications ORDER BY created_at DESC");

  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-900 mb-6">Adoption Applications ({apps.length})</h1>
      <div className="grid gap-4">
        {apps.map((app) => (
          <div key={app.id} className="bg-white rounded-2xl shadow p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-lg text-amber-900">{app.applicant_name}</h3>
                <p className="text-amber-600 text-sm">Applying for: <strong>{app.dog_name}</strong></p>
                <p className="text-gray-400 text-xs">{new Date(app.created_at).toLocaleDateString()}</p>
              </div>
              <AppStatusSelect id={app.id} status={app.status} action={updateAppStatus} />
            </div>
            <div className="grid md:grid-cols-3 gap-3 text-sm">
              <div><span className="text-gray-400">Email:</span> {app.email}</div>
              {app.phone && <div><span className="text-gray-400">Phone:</span> {app.phone}</div>}
              {app.home_type && <div><span className="text-gray-400">Home:</span> {app.home_type}</div>}
              {app.other_pets && <div><span className="text-gray-400">Other pets:</span> {app.other_pets}</div>}
            </div>
            {app.reason && (
              <div className="mt-3 text-sm bg-amber-50 rounded-lg p-3">
                <span className="font-semibold text-amber-800">Why they want to adopt:</span>
                <p className="text-gray-600 mt-1">{app.reason}</p>
              </div>
            )}
          </div>
        ))}
        {apps.length === 0 && <p className="text-center py-16 text-gray-400">No applications yet.</p>}
      </div>
    </div>
  );
}

