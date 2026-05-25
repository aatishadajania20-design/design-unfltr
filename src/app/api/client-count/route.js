import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Client from '@/lib/models/Client';

export const revalidate = 3600;

export async function GET() {
  try {
    await connectDB();
    const count = await Client.countDocuments();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: 'DB unavailable' }, { status: 503 });
  }
}
