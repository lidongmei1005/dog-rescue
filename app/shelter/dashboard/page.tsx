import { getSession } from "@/lib/auth";
import { query, initDb } from "@/lib/db";
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface Dog { id: number; name: string; status: string; breed: string; }
interface Application { id: number; dog_name: string; applicant_name: string; status: string; created_at: string; }

export default async function ShelterDashboard() {
  await initDb();
  const user = await getSession();
  const dogs = await query<Dog>("SELECT * FROM dogs WHERE shelter_id = ? ORDER BY created_at DESC", [user!.id]);
  const apps = await query<Application>(
    "SELECT a.* FROM adoption_applications a JOIN dogs d ON a.dog_id = d.id WHERE d.shelter_id = ? ORDER BY a.created_at DESC LIMIT 10",
    [user!.id]
  );

  const available = dogs.filter(d => d.status === 'Available').length;
  const pending = apps.filter(a => a.status === 'Pending').length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-900 mb-6">Welcome back, {user!.name}! 🐾</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Dogs', value: dogs.length, icon: '🐶', href: '/shelter/dogs' },
          { label: 'Available', value: available, icon: '✅', href: '/shelter/dogs' },
          { label: 'New Applications', value: pending, icon: '📝', href: '/shelter/applications' },
        ].map(s => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="text-2xl font-bold text-amber-900">{s.value}</div>
            <div className="text-sm text-amber-600">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Dogs */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-amber-900">My Dogs</h2>
            <Link href="/shelter/dogs/new" className="text-xs bg-amber-600 text-white px-3 py-1 rounded-full">+ Add</Link>
          </div>
          {dogs.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No dogs yet. <Link href="/shelter/dogs/new" className="text-amber-600 hover:underline">Add your first dog!</Link></p>
          ) : (
            <div className="space-y-2">
              {dogs.slice(0, 5).map(d => (
                <div key={d.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{d.name} <span className="text-gray-400">· {d.breed}</span></span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${d.status === 'Available' ? 'bg-green-100 text-green-700' : d.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>{d.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-amber-900">Recent Applications</h2>
            <Link href="/shelter/applications" className="text-xs text-amber-600 hover:underline">View all</Link>
          </div>
          {apps.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">No applications yet.</p>
          ) : (
            <div className="space-y-2">
              {apps.slice(0, 5).map(a => (
                <div key={a.id} className="flex items-center justify-between text-sm">
                  <span><span className="font-medium">{a.applicant_name}</span> <span className="text-gray-400">→ {a.dog_name}</span></span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${a.status === 'Approved' ? 'bg-green-100 text-green-700' : a.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>{a.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
