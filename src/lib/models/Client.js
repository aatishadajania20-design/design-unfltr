import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name:         { type: String, required: true, unique: true, trim: true },
    logo:         { type: String, default: '' },
    subtitle:     { type: String, default: '' },
    // `order` is the canonical sort key (0-based index from the original static array)
    order:        { type: Number, required: true, default: 0, min: 0 },
    // `gridPosition` kept for backward compat — mirrors `order` for existing records
    gridPosition: { type: Number, default: 0, min: 0 },
    featured:     { type: Boolean, default: false },
  },
  { timestamps: true }
);

// name uniqueness enforced by unique:true above; keep only the compound query index
schema.index({ order: 1, createdAt: 1 });

export default mongoose.models.Client || mongoose.model('Client', schema);
