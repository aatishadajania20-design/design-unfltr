import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const WEBSITE_ID = '817bbb5a-f692-4356-8cb7-3805a3b4f4a9';
const UMAMI_API = 'https://api.umami.is/v1';

function defaultRange() {
  const endAt = Date.now();
  const startAt = endAt - 30 * 24 * 60 * 60 * 1000;
  return { startAt, endAt };
}

export async function GET(req) {
  if (!await requireAuth())
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const token = process.env.UMAMI_API_TOKEN;
  if (!token)
    return NextResponse.json({ error: 'UMAMI_API_TOKEN not configured' }, { status: 503 });

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
      url = `${UMAMI_API}/websites/${WEBSITE_ID}/active`;
    } else if (type === 'stats') {
      url = `${UMAMI_API}/websites/${WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}`;
    } else if (type === 'pageviews') {
      url = `${UMAMI_API}/websites/${WEBSITE_ID}/pageviews?startAt=${startAt}&endAt=${endAt}&unit=${unit}&timezone=UTC`;
    } else {
      // Supported: url, referrer, country, device, browser, os, language
      url = `${UMAMI_API}/websites/${WEBSITE_ID}/metrics?startAt=${startAt}&endAt=${endAt}&type=${type}&limit=15`;
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
