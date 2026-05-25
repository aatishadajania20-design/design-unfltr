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

  const desc =
    project.desc ||
    `${project.title} — a ${project.category} project by UNFLTR Studio.`;

  return {
    title: project.title,
    description: desc,
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

  return <SlugClient project={project} nextProject={next} prevProject={prev} />;
}
