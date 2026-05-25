import SlugClient from "@/components/SlugClient";
import projects from "@/data/projects";
import Link from "next/link";
import { serializeDoc } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  let project = null;
  try {
    const { connectDB } = await import("@/lib/db");
    const { default: Work } = await import("@/lib/models/Work");
    await connectDB();
    const doc = await Work.findOne({ slug }).lean();
    if (doc) project = serializeDoc(doc);
  } catch {
    // fall through to static
  }
  if (!project) project = projects.find((p) => p.slug === slug) ?? null;

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const ogImage = project.image
    ? [{ url: project.image, alt: project.title }]
    : [{ url: "https://unfltrstudio.in/og-image.png", alt: "UNFLTR Studio" }];

  const rawDesc =
    project.desc ||
    `${project.title} — a ${project.category} project by UNFLTR Studio.`;
  const desc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + "..." : rawDesc;

  return {
    title: project.title,
    description: desc,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `https://unfltrstudio.in/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} — UNFLTR Studio`,
      description: desc,
      url: `https://unfltrstudio.in/projects/${slug}`,
      type: "article",
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — UNFLTR Studio`,
      description: desc,
      images: project.image
        ? [project.image]
        : ["https://unfltrstudio.in/og-image.png"],
    },
  };
}

async function getFromDB(slug) {
  try {
    const { connectDB } = await import('@/lib/db');
    const { default: Work } = await import('@/lib/models/Work');
    await connectDB();
    const work = await Work.findOne({ slug }).lean();
    if (!work) return null;
    const all = await Work.find().sort({ order: 1, createdAt: 1 }).lean();
    // serializeDoc converts ObjectId → string and Date → ISO string,
    // which is required before passing to a Client Component as props.
    return { project: serializeDoc(work), all: all.map(serializeDoc) };
  } catch {
    return null;
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  const db = await getFromDB(slug);
  const project     = db?.project ?? projects.find(p => p.slug === slug);
  const allProjects = db?.all?.length ? db.all : projects;

  if (!project) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-orange-500 uppercase tracking-widest text-sm mb-4">404</p>
          <h1 className="text-6xl font-black mb-8">Not Found</h1>
          <Link href="/"><span className="text-orange-500 underline underline-offset-4">← Back Home</span></Link>
        </div>
      </div>
    );
  }

  const idx  = allProjects.findIndex(p => p.slug === slug);
  const next = allProjects[(idx + 1) % allProjects.length];
  const prev = allProjects[(idx - 1 + allProjects.length) % allProjects.length];

  // Derive a stable ISO date: prefer project.year, then createdAt year, then fallback
  const yearStr =
    String(project.year || '').match(/\d{4}/)?.[0] ||
    String(project.createdAt || '').match(/\d{4}/)?.[0];
  const isoDate = yearStr ? `${yearStr}-01-01` : '2024-01-01';

  const desc = project.desc || `${project.title} — a ${project.category} project by UNFLTR Studio.`;

  // (A) Article — eligible for Google rich results on every project page
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://unfltrstudio.in/projects/${slug}#article`,
    headline: project.title,
    description: desc,
    ...(project.image ? { image: [project.image] } : {}),
    articleSection: project.category,
    url: `https://unfltrstudio.in/projects/${slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://unfltrstudio.in/projects/${slug}` },
    author: { "@type": "Organization", name: "UNFLTR Studio", url: "https://unfltrstudio.in" },
    publisher: {
      "@type": "Organization",
      name: "UNFLTR Studio",
      url: "https://unfltrstudio.in",
      logo: { "@type": "ImageObject", url: "https://unfltrstudio.in/logo.png", width: 512, height: 512 },
    },
    datePublished: isoDate,
    dateModified: isoDate,
  };

  // (C) BreadcrumbList — always rendered, enables breadcrumb rich results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://unfltrstudio.in" },
      { "@type": "ListItem", position: 2, name: "Work", item: "https://unfltrstudio.in/#work-section" },
      { "@type": "ListItem", position: 3, name: project.title, item: `https://unfltrstudio.in/projects/${slug}` },
    ],
  };

  return (
    <>
      {/* (A) Article schema — rich-result eligible */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* (B) VideoObject schema — only when project has a video */}
      {project.video && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "@id": `https://unfltrstudio.in/projects/${slug}#video`,
              name: project.title,
              description: desc,
              thumbnailUrl: project.image || "https://unfltrstudio.in/og-image.png",
              contentUrl: project.video,
              uploadDate: isoDate,
              publisher: { "@type": "Organization", name: "UNFLTR Studio", url: "https://unfltrstudio.in" },
            }),
          }}
        />
      )}
      {/* (C) BreadcrumbList schema — rich-result eligible */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SlugClient project={project} nextProject={next} prevProject={prev} />
    </>
  );
}
