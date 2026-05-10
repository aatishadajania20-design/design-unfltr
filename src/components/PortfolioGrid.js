"use client";

import Link from "next/link";
import projects from "@/data/projects";

export default function PortfolioGrid() {
  return (
    <>
      <style>{`
        @keyframes scroll-title {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-title {
          display: flex;
          width: max-content;
          animation: scroll-title 20s linear infinite;
          white-space: nowrap;
        }

        .card-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 1.5rem;
          background: #111;
        }

        .card-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      filter 0.5s ease;
        }

        .card-wrap:hover img {
          transform: scale(1.04);
          filter: brightness(0.25) saturate(0.4);
        }

        /* Overlay: hidden by default */
        .marquee-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.5rem;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.4s ease;
          padding: 0;
        }

        .card-wrap:hover .marquee-overlay {
          opacity: 1;
        }

        /* Each row of scrolling text */
        .marquee-row {
          overflow: hidden;
          width: 100%;
        }

        /* Second row scrolls opposite direction */
        .marquee-title.reverse {
          animation-direction: reverse;
          animation-duration: 30s;
        }

        /* Thin divider lines between rows */
        .marquee-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }

        /* Category badge that appears on hover */
        .hover-badge {
          position: absolute;
          bottom: 24px;
          right: 24px;
          z-index: 4;
          padding: 6px 14px;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 999px;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: white;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
        }

        .card-wrap:hover .hover-badge {
          opacity: 1;
          transform: translateY(0);
        }

        /* Index number top-left */
        .hover-index {
          position: absolute;
          top: 24px;
          left: 28px;
          z-index: 4;
          font-size: 0.7rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.45);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s;
          font-variant-numeric: tabular-nums;
        }

        .card-wrap:hover .hover-index {
          opacity: 1;
          transform: translateY(0);
        }

        /* Bottom card meta */
        .card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding: 0 4px;
        }

        .card-title-text {
          font-size: 1.4rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          transition: color 0.2s ease;
        }

        .card-link:hover .card-title-text {
          color: #f97316;
        }

        .card-category {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #f97316;
        }
      `}</style>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10 px-6 mt-24 pb-24">
        {projects.map((project, index) => {

          // Enough repetitions to fill any screen width seamlessly
          const repeated = Array(6).fill(`${project.title} — `).join("");

          return (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="card-link block cursor-pointer"
            >
              <div className="card-wrap" style={{ height: "680px" }}>

                <img
                  src={project.image}
                  alt={project.title}
                />

                {/* Hover index */}
                <span className="hover-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Scrolling text overlay */}
                <div className="marquee-overlay">

                  {/* Row 1 — forward */}
                  <div className="marquee-row">
                    <div className="marquee-title">
                      <span style={{
                        fontSize: "clamp(3.5rem, 7.5vw, 6rem)",
                        fontWeight: 900,
                        lineHeight: 1.05,
                        color: "#fff",
                        textTransform: "uppercase",
                        letterSpacing: "-0.03em",
                        whiteSpace: "nowrap",
                        paddingRight: "3rem",
                      }}>
                        {repeated}
                      </span>
                      {/* duplicate for seamless loop */}
                      <span style={{
                        fontSize: "clamp(3.5rem, 7.5vw, 6rem)",
                        fontWeight: 900,
                        lineHeight: 1.05,
                        color: "#fff",
                        textTransform: "uppercase",
                        letterSpacing: "-0.03em",
                        whiteSpace: "nowrap",
                        paddingRight: "3rem",
                      }}>
                        {repeated}
                      </span>
                    </div>
                  </div>

                  <div className="marquee-divider" />

                  {/* Row 2 — reverse, slightly different style */}
                  <div className="marquee-row">
                    <div className="marquee-title reverse">
                      <span style={{
                        fontSize: "clamp(3.5rem, 7.5vw, 6rem)",
                        fontWeight: 900,
                        lineHeight: 1.05,
                        color: "transparent",
                        WebkitTextStroke: "1.5px rgba(255,255,255,0.5)",
                        textTransform: "uppercase",
                        letterSpacing: "-0.03em",
                        whiteSpace: "nowrap",
                        paddingRight: "3rem",
                      }}>
                        {repeated}
                      </span>
                      <span style={{
                        fontSize: "clamp(3.5rem, 7.5vw, 6rem)",
                        fontWeight: 900,
                        lineHeight: 1.05,
                        color: "transparent",
                        WebkitTextStroke: "1.5px rgba(255,255,255,0.5)",
                        textTransform: "uppercase",
                        letterSpacing: "-0.03em",
                        whiteSpace: "nowrap",
                        paddingRight: "3rem",
                      }}>
                        {repeated}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Category badge bottom-right */}
                <span className="hover-badge">{project.category}</span>

              </div>

              {/* Card meta */}
              <div className="card-meta">
                <h2 className="card-title-text text-white">
                  {project.title}
                </h2>
                <p className="card-category">{project.category}</p>
              </div>

            </Link>
          );
        })}
      </section>
    </>
  );
}