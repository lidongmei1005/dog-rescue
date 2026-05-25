import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ShelterLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();
  if (!user || (user.role !== 'shelter' && user.role !== 'admin')) redirect('/login');
  if (user.status === 'pending') redirect('/pending-approval');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-amber-700 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-lg">🏠 {user.shelter_name || 'Shelter Dashboard'}</span>
          <Link href="/shelter/dashboard" className="hover:text-amber-200 text-sm">Dashboard</Link>
          <Link href="/shelter/dogs" className="hover:text-amber-200 text-sm">My Dogs</Link>
          <Link href="/shelter/dogs/new" className="hover:text-amber-200 text-sm">+ Add Dog</Link>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-amber-200">{user.name}</span>
          <Link href="/" className="hover:text-amber-200">← Public Site</Link>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="bg-amber-800 hover:bg-amber-900 px-3 py-1 rounded-full text-xs">Logout</button>
          </form>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
