import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables');
}

// Standard Next.js hot-reload safe connection cache
let cached = global._mg ?? (global._mg = { conn: null, promise: null });

const CONNECT_OPTIONS = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,        // force IPv4 — avoids dual-stack DNS issues on local networks
  retryWrites: true,
};

// Retry once on DNS-related failures (EREFUSED, ENOTFOUND, etc.)
// Production (Vercel/Cloudflare DNS) virtually never triggers this path.
async function connectWithRetry(uri, options, retries = 1) {
  try {
    return await mongoose.connect(uri, options);
  } catch (err) {
    const dnsCodes = ['EREFUSED', 'ENOTFOUND', 'ESERVFAIL', 'ETIMEDOUT'];
    if (retries > 0 && dnsCodes.includes(err?.code)) {
      await new Promise(r => setTimeout(r, 1000));
      return connectWithRetry(uri, options, retries - 1);
    }
    throw err;
  }
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise)
    cached.promise = connectWithRetry(MONGODB_URI, CONNECT_OPTIONS);
  cached.conn = await cached.promise;
  return cached.conn;
}
