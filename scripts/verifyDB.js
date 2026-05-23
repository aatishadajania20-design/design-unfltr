/**
 * DB integrity verification script.
 * Run: node scripts/verifyDB.js
 *
 * Checks:
 *  - Connection reachability
 *  - Document counts
 *  - Works: missing required fields, duplicate slugs
 *  - Clients: missing required fields, invalid gridPosition (< 0)
 */

const fs   = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const m = line.match(/^([^#][^=]*)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  });
}

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI not set in .env.local');
  process.exit(1);
}

const WorkSchema = new mongoose.Schema({
  title: String, slug: String, category: String,
  desc: String,  image: String, video: String,
  client: String, services: [String], order: Number,
}, { timestamps: true });

const ClientSchema = new mongoose.Schema({
  name: String, subtitle: String, logo: String,
  gridPosition: Number, featured: Boolean,
}, { timestamps: true });

async function verify() {
  console.log('🔗  Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });
  console.log('✅  Connected.\n');

  const Work   = mongoose.models.Work   || mongoose.model('Work',   WorkSchema);
  const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);

  let errors = 0;

  // ── Works ────────────────────────────────────────────────────────────────────
  const works = await Work.find().lean();
  console.log(`📁  Works: ${works.length} documents`);

  const slugSeen = new Set();
  for (const w of works) {
    if (!w.title)    { console.log(`   ⚠  Work ${w._id}: missing title`);    errors++; }
    if (!w.slug)     { console.log(`   ⚠  Work ${w._id}: missing slug`);     errors++; }
    if (!w.category) { console.log(`   ⚠  Work ${w._id}: missing category`); errors++; }
    if (w.slug) {
      if (slugSeen.has(w.slug)) { console.log(`   ⚠  Duplicate slug: "${w.slug}"`); errors++; }
      slugSeen.add(w.slug);
    }
    if (!w.image && !w.video) {
      console.log(`   ℹ  Work "${w.title}": no image or video (will render empty)`);
    }
  }

  // ── Clients ──────────────────────────────────────────────────────────────────
  const clients = await Client.find().lean();
  console.log(`\n👥  Clients: ${clients.length} documents`);

  for (const c of clients) {
    if (!c.name) { console.log(`   ⚠  Client ${c._id}: missing name`); errors++; }
    if (!c.logo) { console.log(`   ℹ  Client "${c.name}": no logo`); }
    if (c.gridPosition < 0) { console.log(`   ⚠  Client "${c.name}": gridPosition (${c.gridPosition}) is negative`); errors++; }
  }

  // ── Summary ──────────────────────────────────────────────────────────────────
  console.log('\n────────────────────────────────');
  if (errors === 0) {
    console.log('✅  All checks passed — database is clean.\n');
  } else {
    console.log(`❌  ${errors} issue(s) found — review output above.\n`);
  }

  await mongoose.disconnect();
  process.exit(errors > 0 ? 1 : 0);
}

verify().catch(err => {
  console.error('❌  Verify failed:', err.message);
  process.exit(1);
});
