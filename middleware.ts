import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'pawpawhome-secret-change-in-production'
);

const SHELTER_ROUTES = ['/shelter'];
const ADMIN_ROUTES = ['/admin/users', '/admin/dogs', '/admin/applications', '/admin/resources'];
const USER_ROUTES = ['/account'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('session')?.value;

  let user = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      user = payload as { role: string; status: string };
    } catch {}
  }

  // Protect shelter routes
  if (SHELTER_ROUTES.some(r => pathname.startsWith(r))) {
    if (!user) return NextResponse.redirect(new URL('/login?redirect=' + pathname, req.url));
    if (user.role !== 'shelter' && user.role !== 'admin') return NextResponse.redirect(new URL('/', req.url));
    if (user.status === 'pending') return NextResponse.redirect(new URL('/pending-approval', req.url));
  }

  // Protect admin routes
  if (ADMIN_ROUTES.some(r => pathname.startsWith(r))) {
    if (!user || user.role !== 'admin') return NextResponse.redirect(new URL('/login', req.url));
  }

  // Protect user account routes
  if (USER_ROUTES.some(r => pathname.startsWith(r))) {
    if (!user) return NextResponse.redirect(new URL('/login?redirect=' + pathname, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/shelter/:path*', '/admin/users/:path*', '/admin/dogs/:path*', '/admin/applications/:path*', '/admin/resources/:path*', '/account/:path*'],
};
