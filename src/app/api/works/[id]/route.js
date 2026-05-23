import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Work from '@/lib/models/Work';
import { requireAuth } from '@/lib/auth';
import { videoToThumbnail } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(_, { params }) {
  const { id } = await params;
  try {
    await connectDB();
    const work = await Work.findById(id).lean();
    if (!work) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(work);
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
    // Backend auto-image: generate thumbnail when video provided and image is blank
    if (body.video && !body.image) {
      body.image = videoToThumbnail(body.video);
    }
    const work = await Work.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
    if (!work) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(work);
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
    await Work.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
