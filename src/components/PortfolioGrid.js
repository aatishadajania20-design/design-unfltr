"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { videoToThumbnail } from "@/lib/utils";

const INITIAL_COUNT = 9;

export default function PortfolioGrid() {
  const cardRefs = useRef([]);
  const observersRef = useRef([]);
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/works", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setProjects(data); })
      .catch(() => {});
  }, []);

  const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);

  useEffect(() => {
    cardRefs.current.forEach((el) => {
      if (!el || el.dataset.pgAnimated) return;

      el.style.opacity = "0";
      el.style.transform = "translateY(48px)";

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            el.dataset.pgAnimated = "1";
          } else if (!el.dataset.pgAnimated) {
            el.style.opacity = "0";
            el.style.transform = "translateY(48px)";
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(el);
      observersRef.current.push(obs);
    });
  }, [visibleProjects]);

  useEffect(() => () => observersRef.current.forEach((o) => o.disconnect()), []);

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
          border-radius: 1rem;
          background: #111;
        }

        /* ── MEDIA (img + video treated identically) ── */
        .card-wrap img,
        .card-wrap video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
        }
        .card-wrap:hover img,
        .card-wrap:hover video {
          transform: scale(1.04);
          filter: brightness(0.2) saturate(0.3);
        }

        /* small "● VIDEO" pill shown on video cards */
        .video-pill {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border: 1px solid rgba(249,115,22,0.45);
          border-radius: 999px;
          font-size: 0.52rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          backdrop-filter: blur(6px);
          background: rgba(0,0,0,0.35);
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .card-wrap:hover .video-pill { opacity: 0; }

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
          bottom: 16px;
          right: 16px;
          z-index: 4;
          padding: 5px 12px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          font-size: 0.58rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: white;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
        }
        .card-wrap:hover .hover-badge { opacity: 1; transform: translateY(0); }
        .hover-index {
          position: absolute;
          top: 16px;
          left: 18px;
          z-index: 4;
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.35);
          opacity: 0;
          transform: translateY(-4px);
          transition: opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s;
        }
        .card-wrap:hover .hover-index { opacity: 1; transform: translateY(0); }
        .card-title-text {
          font-size: 1.1rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          transition: color 0.2s ease;
        }
        @media (min-width: 768px) { .card-title-text { font-size: 1.35rem; } }
        .card-link:hover .card-title-text { color: #f97316; }
        .card-category {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #f97316;
        }
        .card-animate {
          opacity: 0;
          transform: translateY(48px);
          transition:
            opacity 0.85s cubic-bezier(0.25,0.46,0.45,0.94),
            transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        @media (min-width: 768px) {
          .portfolio-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px 16px;
            align-items: start;
          }
          .card-link {
            transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
          }
          .card-link:hover {
            transform: scale(1.015);
            z-index: 2;
          }
        }
        @media (max-width: 767px) {
          .portfolio-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        /* VIEW MORE BUTTON */
        .view-more-btn {
          position: relative;
          overflow: hidden;
          background: #0a0a0a;
          border: 1px solid #1e1e1e;
          border-radius: 1rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          transition: border-color 0.3s ease, background 0.3s ease;
          height: clamp(260px, 52vw, 700px);
          width: 100%;
        }
        .view-more-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #f97316;
          transform: translateY(101%);
          transition: transform 0.45s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 0;
        }
        .view-more-btn:hover::before { transform: translateY(0); }
        .view-more-btn:hover { border-color: #f97316; }
        .view-more-btn:hover .vmb-label { color: #000; }
        .view-more-btn:hover .vmb-count { color: rgba(0,0,0,0.5); }
        .view-more-btn:hover .vmb-icon { color: #000; border-color: rgba(0,0,0,0.3); }
        .view-more-btn:hover .vmb-corner { border-color: #000; }

        .vmb-label {
          position: relative;
          z-index: 1;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #fff;
          transition: color 0.3s ease;
          line-height: 1;
        }
        .vmb-count {
          position: relative;
          z-index: 1;
          font-size: 0.92rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #444;
          transition: color 0.3s ease;
        }
        .vmb-icon {
          position: relative;
          z-index: 1;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          border: 1.5px solid #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          color: #f97316;
          transition: color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        }
        .view-more-btn:hover .vmb-icon { transform: translateY(-4px); }

        .vmb-corner {
          position: absolute;
          width: 18px; height: 18px;
          border-color: #1e1e1e;
          transition: border-color 0.3s ease;
        }
        .vmb-corner.tl { top:14px; left:14px; border-top:1.5px solid; border-left:1.5px solid; }
        .vmb-corner.tr { top:14px; right:14px; border-top:1.5px solid; border-right:1.5px solid; }
        .vmb-corner.bl { bottom:14px; left:14px; border-bottom:1.5px solid; border-left:1.5px solid; }
        .vmb-corner.br { bottom:14px; right:14px; border-bottom:1.5px solid; border-right:1.5px solid; }

        @media (min-width: 768px) {
          .view-more-cell { grid-column: span 1; }
        }
      `}</style>

      <section className="portfolio-grid px-4 md:px-6 mt-14 md:mt-20 pb-20 md:pb-28">

        {visibleProjects.map((project, index) => {
          const repeated = Array(6).fill(`${project.title} — `).join("");
          const thumbnail = project.image || videoToThumbnail(project.video);

          return (
            <Link
              href={`/projects/${project.slug}`}
              key={project._id ? String(project._id) : `pg-${project.slug}-${index}`}
              className="card-link block cursor-pointer"
              style={{ position: "relative" }}
            >
              <div
                className="card-animate"
                ref={(el) => { cardRefs.current[index] = el; }}
                style={{ transitionDelay: `${(index % 2) * 90}ms` }}
              >
                <div className="card-wrap" style={{ height: "clamp(260px, 52vw, 700px)" }}>

                  {/* ── MEDIA: video if project.video exists, else thumbnail image ── */}
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      style={{ position: "absolute", inset: 0 }}
                    />
                  ) : thumbnail ? (
                    <img src={thumbnail} alt={project.title} />
                  ) : null}

                  {/* pill badge on video cards */}
                  {project.video && (
                    <div className="video-pill">
                      <span style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: "#f97316", display: "inline-block",
                        animation: "pulse-dot 2s ease-in-out infinite",
                      }} />
                      Video
                    </div>
                  )}

                  <span className="hover-index">{String(index + 1).padStart(2, "0")}</span>

                  <div className="marquee-overlay">
                    <div className="marquee-row">
                      <div className="marquee-title">
                        {[0, 1].map((i) => (
                          <span key={i} style={{
                            fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
                            fontWeight: 900, lineHeight: 1.05, color: "#fff",
                            textTransform: "uppercase", letterSpacing: "-0.03em",
                            whiteSpace: "nowrap", paddingRight: "2.5rem",
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
                            fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
                            fontWeight: 900, lineHeight: 1.05,
                            color: "transparent",
                            WebkitTextStroke: "1.5px rgba(255,255,255,0.4)",
                            textTransform: "uppercase", letterSpacing: "-0.03em",
                            whiteSpace: "nowrap", paddingRight: "2.5rem",
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

        {/* VIEW MORE */}
        {!showAll && projects.length > INITIAL_COUNT && (
          <div className="view-more-cell">
            <button
              className="view-more-btn"
              onClick={() => setShowAll(true)}
              aria-label="View more projects"
            >
              <span className="vmb-corner tl" />
              <span className="vmb-corner tr" />
              <span className="vmb-corner bl" />
              <span className="vmb-corner br" />
              <div className="vmb-icon">↓</div>
              <span className="vmb-label">View More</span>
              <span className="vmb-count">+{projects.length - INITIAL_COUNT} Projects</span>
            </button>
          </div>
        )}

      </section>

      <style>{`
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.4; transform:scale(0.7); }
        }
      `}</style>
    </>
  );
}
