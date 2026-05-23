import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Client from '@/lib/models/Client';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(_, { params }) {
  const { id } = await params;
  try {
    await connectDB();
    const client = await Client.findById(id).lean();
    if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(client);
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(req, { params }) {
  if (!await requireAuth())
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  try {
    await connectDB();
    const body = await req.json();
    // Clamp grid position server-side before schema validation
    if (typeof body.gridPosition === 'number') {
      body.gridPosition = Math.max(0, body.gridPosition);
    }
    const client = await Client.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(client);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}

export async function DELETE(_, { params }) {
  if (!await requireAuth())
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  try {
    await connectDB();
    await Client.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
