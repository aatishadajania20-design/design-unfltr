import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;

let cached = global._mg ?? (global._mg = { conn: null, promise: null });

export async function connectDB() {
  if (!URI) throw new Error('MONGODB_URI environment variable is not set');
  if (cached.conn) return cached.conn;
  if (!cached.promise)
    cached.promise = mongoose.connect(URI, { bufferCommands: false });
  cached.conn = await cached.promise;
  return cached.conn;
}
