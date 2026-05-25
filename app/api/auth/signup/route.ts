import { NextRequest, NextResponse } from 'next/server';
import { execute, queryOne, initDb } from '@/lib/db';
import { hashPassword, createToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await initDb();
    const { email, password, name, role, shelter_name } = await req.json();

    if (!email || !password || !name) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    if (password.length < 6) return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });

    const existing = await queryOne('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) return NextResponse.json({ error: 'Email already registered' }, { status: 409 });

    const hash = await hashPassword(password);
    const isShelt = role === 'shelter';
    const status = isShelt ? 'pending' : 'active';

    const result = await execute(
      `INSERT INTO users (email, password_hash, name, role, status, shelter_name) VALUES (?, ?, ?, ?, ?, ?)`,
      [email, hash, name, isShelt ? 'shelter' : 'user', status, shelter_name || null]
    );
    const id = Number(result.lastInsertRowid);

    if (!isShelt) {
      // Auto-login regular users
      const token = await createToken({ id, email, name, role: 'user', status: 'active' });
      const res = NextResponse.json({ success: true, redirect: '/' });
      res.cookies.set('session', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 * 7, path: '/' });
      return res;
    }

    return NextResponse.json({ success: true, pending: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
