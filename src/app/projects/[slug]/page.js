import SlugClient from "@/components/SlugClient";
import projects from "@/data/projects";
import Link from "next/link";

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

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

  return (
    <SlugClient
      project={project}
      nextProject={nextProject}
      prevProject={prevProject}
    />
  );
}