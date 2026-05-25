import { NextRequest, NextResponse } from 'next/server';
import { query, initDb } from '@/lib/db';
import { verifyPassword, createToken } from '@/lib/auth';
import type { SessionUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const { email, password } = await req.json();
    const users = await query<SessionUser & { password_hash: string }>(
      'SELECT * FROM users WHERE email = ?', [email]
    );
    const user = users[0];
    if (!user) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    const token = await createToken({
      id: user.id, email: user.email, name: user.name,
      role: user.role, status: user.status, shelter_name: user.shelter_name ?? undefined,
    });

    const res = NextResponse.json({ success: true, user: { id: user.id, name: user.name, role: user.role, status: user.status } });
    res.cookies.set('session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7, path: '/' });
    return res;
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
