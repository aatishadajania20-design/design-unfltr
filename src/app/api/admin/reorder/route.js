import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Work from '@/lib/models/Work';
import Client from '@/lib/models/Client';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev) {
    const user = await requireAuth();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, items } = await req.json();

    if (!type || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'type and items[] are required' }, { status: 400 });
    }
    if (type !== 'projects' && type !== 'clients') {
      return NextResponse.json({ error: 'type must be "projects" or "clients"' }, { status: 400 });
    }

    await connectDB();
    const Model = type === 'projects' ? Work : Client;

    const ops = items.map(({ _id, order }) => ({
      updateOne: {
        filter: { _id },
        update: { $set: { order, ...(type === 'clients' ? { gridPosition: order } : {}) } },
      },
    }));

    await Model.bulkWrite(ops, { ordered: false });

    return NextResponse.json({ ok: true, updated: items.length, type });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
