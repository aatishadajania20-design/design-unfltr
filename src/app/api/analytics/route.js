import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

function buildBase() {
  const url = process.env.UMAMI_API_URL;
  // UMAMI_API_URL=https://cloud.umami.is  →  https://cloud.umami.is/api
  // Falls back to the proven Umami Cloud v1 endpoint if var is absent
  return url ? `${url}/api` : 'https://api.umami.is/v1';
}

function defaultRange() {
  const endAt = Date.now();
  const startAt = endAt - 30 * 24 * 60 * 60 * 1000;
  return { startAt, endAt };
}

export async function GET(req) {
  if (!await requireAuth())
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Prefer UMAMI_API_SECRET; fall back to legacy UMAMI_API_TOKEN
  const token = process.env.UMAMI_API_SECRET || process.env.UMAMI_API_TOKEN;
  if (!token)
    return NextResponse.json({ error: 'UMAMI_API_TOKEN not configured' }, { status: 503 });

  const websiteId = process.env.UMAMI_WEBSITE_ID || '817bbb5a-f692-4356-8cb7-3805a3b4f4a9';
  const base = buildBase();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'stats';
  const def = defaultRange();
  const startAt = searchParams.get('startAt') || def.startAt;
  const endAt   = searchParams.get('endAt')   || def.endAt;
  const unit    = searchParams.get('unit')    || 'day';

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };

  try {
    let url;

    if (type === 'active') {
      url = `${base}/websites/${websiteId}/active`;
    } else if (type === 'stats') {
      url = `${base}/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`;
    } else if (type === 'pageviews') {
      url = `${base}/websites/${websiteId}/pageviews?startAt=${startAt}&endAt=${endAt}&unit=${unit}&timezone=UTC`;
    } else {
      // Supported metric types: url, referrer, country, device, browser, os, language
      url = `${base}/websites/${websiteId}/metrics?startAt=${startAt}&endAt=${endAt}&type=${type}&limit=15`;
    }

    const res = await fetch(url, { headers, cache: 'no-store' });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `Umami API ${res.status}: ${text}` }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
