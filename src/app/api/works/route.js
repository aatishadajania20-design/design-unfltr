import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Work from '@/lib/models/Work';
import { requireAuth } from '@/lib/auth';
import { videoToThumbnail } from '@/lib/utils';
import { toSlug, ensureUniqueSlug } from '@/lib/slug';
import STATIC_PROJECTS from '@/data/projects';

// Never cache — always return fresh data
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const works = await Work.find().sort({ order: 1, createdAt: 1 }).lean();
    // DB is source of truth; fall back to static when collection is empty
    if (works.length > 0) return NextResponse.json(works);
    return NextResponse.json(
      STATIC_PROJECTS.map((p, i) => ({ ...p, _id: p.slug, order: p.order ?? i }))
    );
  } catch {
    // DB unreachable — serve static so the site never shows blank
    return NextResponse.json(
      STATIC_PROJECTS.map((p, i) => ({ ...p, _id: p.slug, order: p.order ?? i }))
    );
  }
}

export async function POST(req) {
  if (!await requireAuth())
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    await connectDB();
    const body = await req.json();

    // Validate and ensure unique slug
    const baseSlug = toSlug(body.slug || body.title || '');
    if (!baseSlug) return NextResponse.json({ error: 'Title or slug is required' }, { status: 400 });
    body.slug = await ensureUniqueSlug(baseSlug);

    // Backend auto-image: if video exists and image is blank, generate thumbnail
    if (body.video && !body.image) {
      body.image = videoToThumbnail(body.video);
    }
    const work = await Work.create(body);
    return NextResponse.json(work, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
