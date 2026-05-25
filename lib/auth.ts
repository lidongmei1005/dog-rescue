import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'pawpawhome-secret-change-in-production'
);

export type UserRole = 'user' | 'shelter' | 'admin';
export type UserStatus = 'active' | 'pending' | 'suspended';

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  shelter_name?: string;
}

// ─── JWT ──────────────────────────────────────────────────────────────────────
export async function createToken(user: SessionUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionUser;
  } catch {
    return null;
  }
}

// ─── Session helpers ──────────────────────────────────────────────────────────
export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setSession(user: SessionUser): Promise<string> {
  return createToken(user);
}

// ─── Password ─────────────────────────────────────────────────────────────────
export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import('bcryptjs');
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
}
