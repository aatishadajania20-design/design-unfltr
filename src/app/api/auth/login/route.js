import { NextResponse } from 'next/server';
import { validateCredentials, getSession } from '@/lib/auth';

export async function POST(req) {
  const { username, password } = await req.json();
  const user = validateCredentials(username, password);
  if (!user)
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  const session = await getSession();
  session.user = user;
  await session.save();
  return NextResponse.json({ ok: true, user });
}
