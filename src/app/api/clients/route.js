import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Client from '@/lib/models/Client';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    // Sort by `order` (canonical field) with gridPosition as legacy tiebreaker
    const clients = await Client.find()
      .sort({ order: 1, gridPosition: 1, createdAt: 1 })
      .lean();
    return NextResponse.json(clients);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req) {
  if (!await requireAuth())
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();
    // Clamp order/gridPosition server-side before schema validation
    if (typeof body.order === 'number')        body.order        = Math.max(0, body.order);
    if (typeof body.gridPosition === 'number') body.gridPosition = Math.max(0, body.gridPosition);
    // Keep both fields in sync
    if (body.order === undefined && body.gridPosition !== undefined) body.order = body.gridPosition;
    if (body.gridPosition === undefined && body.order !== undefined) body.gridPosition = body.order;
    const client = await Client.create(body);
    return NextResponse.json(client, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
