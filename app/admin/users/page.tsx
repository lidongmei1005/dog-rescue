export const dynamic = 'force-dynamic';
import { query, execute, initDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface User {
  id: number; name: string; email: string; role: string;
  status: string; shelter_name: string; created_at: string;
}

async function updateUserStatus(formData: FormData) {
  "use server";
  await execute("UPDATE users SET status = ? WHERE id = ?",
    [String(formData.get("status")), String(formData.get("id"))]);
  revalidatePath("/admin/users");
}

async function deleteUser(formData: FormData) {
  "use server";
  await execute("DELETE FROM users WHERE id = ? AND role != 'admin'", [String(formData.get("id"))]);
  revalidatePath("/admin/users");
}

export default async function AdminUsersPage() {
  await initDb();
  const users = await query<User>("SELECT * FROM users ORDER BY CASE status WHEN 'pending' THEN 1 ELSE 2 END, created_at DESC");
  const pending = users.filter(u => u.status === 'pending');
  const others = users.filter(u => u.status !== 'pending');

  return (
    <div>
      <h1 className="text-2xl font-bold text-amber-900 mb-6">Manage Users ({users.length})</h1>

      {/* Pending approvals */}
      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
            <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-0.5 rounded-full">{pending.length}</span>
            Pending Shelter Approvals
          </h2>
          <div className="grid gap-3">
            {pending.map(u => (
              <div key={u.id} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-amber-900">{u.name} <span className="text-amber-600 font-normal">· {u.email}</span></div>
                  <div className="text-sm text-amber-700">🏠 Shelter: <strong>{u.shelter_name}</strong></div>
                  <div className="text-xs text-gray-400">{new Date(u.created_at).toLocaleDateString()}</div>
                </div>
                <div className="flex gap-2">
                  <form action={updateUserStatus}>
                    <input type="hidden" name="id" value={u.id} />
                    <input type="hidden" name="status" value="active" />
                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">✓ Approve</button>
                  </form>
                  <form action={updateUserStatus}>
                    <input type="hidden" name="id" value={u.id} />
                    <input type="hidden" name="status" value="suspended" />
                    <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">✗ Reject</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All users */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-amber-50 text-amber-800">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Role</th>
              <th className="text-left px-4 py-3">Shelter</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {others.map(u => (
              <tr key={u.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : u.role === 'shelter' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{u.shelter_name || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${u.status === 'active' ? 'bg-green-100 text-green-700' : u.status === 'suspended' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-700'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {u.role !== 'admin' && (
                    <div className="flex gap-2 justify-center">
                      {u.status === 'active' ? (
                        <form action={updateUserStatus} className="inline">
                          <input type="hidden" name="id" value={u.id} />
                          <input type="hidden" name="status" value="suspended" />
                          <button type="submit" className="text-red-500 hover:underline text-xs">Suspend</button>
                        </form>
                      ) : (
                        <form action={updateUserStatus} className="inline">
                          <input type="hidden" name="id" value={u.id} />
                          <input type="hidden" name="status" value="active" />
                          <button type="submit" className="text-green-600 hover:underline text-xs">Activate</button>
                        </form>
                      )}
                      <form action={deleteUser} className="inline">
                        <input type="hidden" name="id" value={u.id} />
                        <button type="submit" className="text-red-500 hover:underline text-xs">Delete</button>
                      </form>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
