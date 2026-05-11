"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import projects from "@/data/projects";

export default function PortfolioGrid() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = [];
    cardRefs.current.forEach((el) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            obs.unobserve(el);
          }
        },
        { threshold: 0.12 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

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
          animation: scroll-title 28s linear infinite;
          white-space: nowrap;
        }
        .marquee-title.reverse {
          animation-direction: reverse;
          animation-duration: 36s;
        }
        .card-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 1.2rem;
          background: #111;
        }
        .card-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 0.5s ease;
        }
        .card-wrap:hover img {
          transform: scale(1.04);
          filter: brightness(0.22) saturate(0.3);
        }
        .marquee-overlay {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.4rem;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .card-wrap:hover .marquee-overlay { opacity: 1; }
        .marquee-row { overflow: hidden; width: 100%; }
        .marquee-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.08);
          flex-shrink: 0;
        }
        .hover-badge {
          position: absolute;
          bottom: 18px;
          right: 18px;
          z-index: 4;
          padding: 5px 12px;
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 999px;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: white;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
        }
        .card-wrap:hover .hover-badge { opacity: 1; transform: translateY(0); }
        .hover-index {
          position: absolute;
          top: 18px;
          left: 20px;
          z-index: 4;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.4);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s;
        }
        .card-wrap:hover .hover-index { opacity: 1; transform: translateY(0); }
        .card-title-text {
          font-size: 1.2rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          transition: color 0.2s ease;
        }
        @media (min-width: 768px) {
          .card-title-text { font-size: 1.4rem; }
        }
        .card-link:hover .card-title-text { color: #f97316; }
        .card-category {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #f97316;
        }

        /* Slide-in for mobile */
        .card-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 px-4 md:px-6 mt-16 md:mt-24 pb-20 md:pb-24">
        {projects.map((project, index) => {
          const repeated = Array(6).fill(`${project.title} — `).join("");
          const cardHeight = "min(68vw, 680px)";

          return (
            <Link
              href={`/projects/${project.slug}`}
              key={project.slug}
              className="card-link block cursor-pointer"
            >
              <div
                className="card-animate"
                ref={(el) => (cardRefs.current[index] = el)}
                style={{ transitionDelay: `${(index % 2) * 80}ms` }}
              >
                <div className="card-wrap" style={{ height: cardHeight }}>
                  <img src={project.image} alt={project.title} />

                  <span className="hover-index">{String(index + 1).padStart(2, "0")}</span>

                  <div className="marquee-overlay">
                    <div className="marquee-row">
                      <div className="marquee-title">
                        {[0, 1].map((i) => (
                          <span key={i} style={{
                            fontSize: "clamp(2.8rem, 7vw, 6rem)",
                            fontWeight: 900,
                            lineHeight: 1.05,
                            color: "#fff",
                            textTransform: "uppercase",
                            letterSpacing: "-0.03em",
                            whiteSpace: "nowrap",
                            paddingRight: "2.5rem",
                          }}>
                            {repeated}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="marquee-divider" />

                    <div className="marquee-row">
                      <div className="marquee-title reverse">
                        {[0, 1].map((i) => (
                          <span key={i} style={{
                            fontSize: "clamp(2.8rem, 7vw, 6rem)",
                            fontWeight: 900,
                            lineHeight: 1.05,
                            color: "transparent",
                            WebkitTextStroke: "1.5px rgba(255,255,255,0.45)",
                            textTransform: "uppercase",
                            letterSpacing: "-0.03em",
                            whiteSpace: "nowrap",
                            paddingRight: "2.5rem",
                          }}>
                            {repeated}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="hover-badge">{project.category}</span>
                </div>

                <div className="flex justify-between items-center mt-3 px-1">
                  <h2 className="card-title-text text-white">{project.title}</h2>
                  <p className="card-category">{project.category}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}