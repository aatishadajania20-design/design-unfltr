import projects from "@/data/projects";

export default async function sitemap() {
  const base = "https://unfltrstudio.in";

  // Try to pull live slugs from DB; fall back to the static list
  let workEntries = [];
  try {
    const { connectDB } = await import("@/lib/db");
    const { default: Work } = await import("@/lib/models/Work");
    await connectDB();
    const works = await Work.find({}, "slug updatedAt").lean();
    workEntries = works.map((w) => ({
      url: `${base}/projects/${w.slug}`,
      lastModified: w.updatedAt ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    workEntries = projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  }

  return [
    { url: base,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/projects`,    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/clients`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
    ...workEntries,
  ];
}