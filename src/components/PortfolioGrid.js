"use client";

import Link from "next/link";
import projects from "@/data/projects";

export default function PortfolioGrid() {
  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes scroll-title {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-title {
          display: flex;
          width: max-content;
          animation: scroll-title 3s linear infinite;
          white-space: nowrap;
        }
        .card-image {
          position: relative;
          overflow: hidden;
        }
        /* Film grain on the image via pseudo-element */
        .card-image::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          opacity: 0.06;
          pointer-events: none;
          mix-blend-mode: overlay;
          z-index: 2;
        }
        /* Marquee overlay — hidden by default */
        .marquee-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: rgba(0,0,0,0.55);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .card-image:hover .marquee-overlay {
          opacity: 1;
        }
        /* Dim image on hover */
        .card-image:hover img {
          filter: brightness(0.35);
          transform: scale(1.06);
        }
        .card-image img {
          transition: filter 0.4s ease, transform 0.7s ease;
        }
        /* Warning-red accent on card title hover */
        .card-link:hover .card-title {
          color: #ef4444;
        }
      `}</style>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 mt-24 pb-20">
        {projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.slug}
            className="card-link group block cursor-pointer"
          >
            {/* IMAGE CARD */}
            <div className="card-image rounded-3xl bg-zinc-900 h-[700px]">

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-3xl"
              />

              {/* INFINITE TEXT OVERLAY */}
              <div className="marquee-overlay rounded-3xl">
                <div className="marquee-title">
                  {/* Doubled for seamless loop */}
                  {[0, 1].map((i) => (
                    <span
                      key={i}
                      className="pr-12"
                      style={{
                        fontSize: "clamp(4rem, 9vw, 7rem)",
                        fontWeight: 900,
                        lineHeight: 1,
                        color: "#fff",
                        textTransform: "uppercase",
                        letterSpacing: "-0.02em",
                        mixBlendMode: "difference",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {project.title} —&nbsp;
                      {project.title} —&nbsp;
                      {project.title} —&nbsp;
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* CARD META */}
            <div className="flex justify-between mt-4 px-1 items-center">
              <h2 className="card-title text-2xl font-medium transition duration-200">
                {project.title}
              </h2>
              <p className="text-orange-500 text-sm uppercase tracking-wider">
                {project.category}
              </p>
            </div>

          </Link>
        ))}
      </section>
    </>
  );
}