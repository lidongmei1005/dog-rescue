import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-amber-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-bold text-lg">🐾 Admin Panel</span>
          <Link href="/admin/dogs" className="hover:text-amber-200 text-sm">Dogs</Link>
          <Link href="/admin/applications" className="hover:text-amber-200 text-sm">Applications</Link>
          <Link href="/admin/resources" className="hover:text-amber-200 text-sm">Resources</Link>
        </div>
        <Link href="/" className="text-sm text-amber-300 hover:text-white">← Public Site</Link>
      </nav>
      <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
