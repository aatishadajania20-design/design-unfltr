"use client";

import Link from "next/link";
import projects from "@/data/projects";

export default function PortfolioGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mt-24 pb-20">

      {projects.map((project) => (

        <Link
          href={`/projects/${project.slug}`}
          key={project.slug}
          className="group block cursor-pointer"
        >

          <div className="overflow-hidden rounded-3xl bg-zinc-900">

            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[700px] object-cover group-hover:scale-110 group-hover:brightness-75 transition duration-700 ease-out"
            />

          </div>

          <div className="flex justify-between mt-4 px-1 items-center">

            <h2 className="text-2xl font-medium group-hover:text-orange-500 transition">

              {project.title}

            </h2>

            <p className="text-orange-500 text-sm uppercase tracking-wider">

              {project.category}

            </p>

          </div>

        </Link>

      ))}

    </section>
  );
}