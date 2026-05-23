import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

const CREDENTIALS = { Yohaan: 'Yohaan191', Aatish: 'Aatish684' };

export const SESSION_OPTIONS = {
  password: process.env.SESSION_SECRET ?? 'fallback-dev-secret-32-chars-min!!',
  cookieName: 'unfltr_admin',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 8,
  },
};

export function validateCredentials(username, password) {
  return CREDENTIALS[username] === password ? username : null;
}

export async function getSession() {
  return getIronSession(await cookies(), SESSION_OPTIONS);
}

export async function requireAuth() {
  const session = await getSession();
  return session.user ?? null;
}
