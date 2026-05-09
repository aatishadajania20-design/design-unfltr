import projects from "@/data/projects";

export default async function ProjectPage({ params }) {

  const { slug } = await params;

  const project = projects.find(
    (p) => p.slug === slug
  );

  if (!project) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center text-4xl">
        Project Not Found
      </div>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">

      {/* HERO IMAGE */}

      <section className="w-full h-screen overflow-hidden">

        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />

      </section>

      {/* CONTENT */}

      <section className="px-6 md:px-12 py-20">

        <p className="text-orange-500 uppercase tracking-[0.3em] text-sm">

          {project.category}

        </p>

        <h1 className="text-6xl md:text-8xl font-bold mt-6">

          {project.title}

        </h1>

        <p className="text-gray-400 text-xl leading-relaxed max-w-3xl mt-10">

          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          This section will later contain your real case study,
          strategy explanation, branding process, and deliverables.

        </p>

      </section>

    </main>
  );
}