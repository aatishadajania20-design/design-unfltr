import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    title:    { type: String, required: true, trim: true },
    slug:     { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true },
    desc:     { type: String, default: '' },
    image:    { type: String, default: '' },
    video:    { type: String, default: '' },
    client:   { type: String, default: '' },
    services: { type: [String], default: [] },
    order:    { type: Number, required: true, default: 0, min: 0 },
  },
  { timestamps: true }
);

// slug uniqueness enforced by unique:true above; keep only the compound query index
schema.index({ order: 1, createdAt: 1 });

export default mongoose.models.Work || mongoose.model('Work', schema);
