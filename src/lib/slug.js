import Work from '@/lib/models/Work';

export function toSlug(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function isValidSlug(slug) {
  return typeof slug === 'string' && slug.length > 0 && /^[a-z0-9-]+$/.test(slug);
}

// Returns a slug guaranteed to be unique in the Work collection.
// If base is taken, appends -2, -3, etc.
// excludeId: skip this document when checking (for updates).
export async function ensureUniqueSlug(base, excludeId = null) {
  if (!base || base.trim() === '') throw new Error('Slug cannot be empty');
  if (!isValidSlug(base)) throw new Error(`Invalid slug "${base}" — use only lowercase letters, numbers, and hyphens`);

  const check = async (candidate) => {
    const q = { slug: candidate };
    if (excludeId) q._id = { $ne: excludeId };
    return Work.exists(q);
  };

  if (!(await check(base))) return base;

  let n = 2;
  while (n < 1000) {
    const candidate = `${base}-${n}`;
    if (!(await check(candidate))) return candidate;
    n++;
  }
  throw new Error('Could not generate a unique slug');
}
