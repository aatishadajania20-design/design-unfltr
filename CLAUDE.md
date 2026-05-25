# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Development server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (no extra args needed)

# Database utilities — require MONGODB_URI in .env.local
node scripts/seedProjects.js   # Seed MongoDB from static data (idempotent, safe to re-run)
node scripts/verifyDB.js       # Verify DB connection and record counts
```

## Architecture

**Stack**: Next.js 16.2.6 App Router · React 19 · Tailwind CSS 4 · MongoDB/Mongoose 9 · iron-session 8 · Framer Motion 12

**Path alias**: `@/*` → `./src/*`

### Page rendering model

Almost every page (`page.js`, `about`, `services`, `contact`, `clients`) starts with `"use client"` — they are pure client components and **cannot export `metadata`**. The only server-rendered page is `src/app/projects/[slug]/page.js` (async server component, no directive).

To add metadata to client-only route segments, create a co-located `layout.js` that is a server component:
```js
// src/app/about/layout.js  ← no "use client"
export const metadata = { title: "About" };
export default function Layout({ children }) { return children; }
```
The admin panel already uses this pattern (`src/app/admin/layout.js`).

To inject JSON-LD structured data in a server component, use:
```jsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
```

### Data flow and fallback strategy

Every DB-dependent feature follows a try/catch + static fallback pattern so the site works without a DB connection:
- **Primary**: MongoDB via `src/lib/db.js` (singleton `global._mg` cache, `mongoose` is in `serverExternalPackages`)
- **Fallback**: `src/data/projects.js` (25 static works) and inline client arrays in `src/app/clients/page.js`

### Auth

`src/lib/auth.js` — iron-session with hardcoded credentials object. Session cookie name: `unfltr_admin`, 8-hour TTL. `SESSION_SECRET` env var overrides the dev fallback password.

### Key utilities

- `serializeDoc(doc)` — Must be called before passing Mongoose `.lean()` docs as props to client components (converts ObjectId/Date to JSON-safe types)
- `videoToThumbnail(url)` — Converts a Cloudinary video URL to a static JPG thumbnail
- `toSlug(s)` / `ensureUniqueSlug(base, excludeId)` in `src/lib/slug.js` — Slug generation with MongoDB uniqueness enforcement

### SEO / metadata

Global metadata lives in `src/app/layout.js` (server component) — title template, description, OG, Twitter, canonical, icons. `src/app/sitemap.js` and `src/app/robots.js` generate their respective files dynamically. The admin layout sets `robots: { index: false, follow: false }`.

### Styling conventions

Each page has its own `<style>` block with scoped CSS classes — there is no CSS modules or styled-components system. Tailwind utilities handle layout primitives only. Two fonts are in use: Space Grotesk via `next/font/google` (in root layout) and Neue Haas Grotesk Display Pro via CDN `@import` inside each page's inline style block.

### Admin panel

`src/app/admin/page.js` — Single "use client" component with works + clients CRUD and drag-to-reorder (`@dnd-kit`). The `api` object at the top of the file is the full internal API client.

### API routes

All route handlers under `src/app/api/`:
- `/api/works` — CRUD for portfolio works
- `/api/clients` — CRUD for clients
- `/api/auth/login`, `/logout`, `/session` — Session management
- `/api/admin/seed` — Triggers DB seed from static data
- `/api/admin/reorder` — Persists new `order` values after DnD reorder

### Environment variables

```
MONGODB_URI      # MongoDB connection string (required for DB features)
SESSION_SECRET   # iron-session encryption password (optional, has dev fallback)
```
