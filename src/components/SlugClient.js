"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";

export default function SlugClient({ project, nextProject, prevProject }) {
  const revealRefs = useRef([]);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // Scroll reveals
    const observers = [];
    revealRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";
      el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
      const obs = new IntersectionObserver(([entry]) => {
        el.style.opacity = entry.isIntersecting ? "1" : "0";
        el.style.transform = entry.isIntersecting ? "translateY(0)" : "translateY(32px)";
      }, { threshold: 0.08 });
      obs.observe(el);
      observers.push(obs);
    });

    // Force video play on mount
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const r = (i, delay = 0) => (el) => {
    if (el) {
      el.style.transitionDelay = `${delay}ms`;
      revealRefs.current[i] = el;
    }
  };

  const isVideo = !!project.video;

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        *, *::before, *::after {
          font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif;
          box-sizing: border-box;
        }

        /* ── HERO ── */
        .slug-hero {
          position: relative; width: 100%;
          background: #000; overflow: hidden;
          height: 92svh; height: 92vh;
        }
        .slug-hero::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; background: #f97316; z-index: 4;
        }
        /* Both img and video fill the box */
        .slug-hero-media {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          display: block;
          transition: transform 14s ease;
        }
        .slug-hero:hover .slug-hero-media { transform: scale(1.025); }
        .slug-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 100%);
          pointer-events: none; z-index: 2;
        }
        .slug-hero-meta {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: clamp(20px,4vw,52px); z-index: 3;
        }
        .slug-tag {
          display: inline-flex; align-items: center; gap: 7px;
          border: 1px solid rgba(249,115,22,0.5); color: #f97316;
          padding: 5px 14px; border-radius: 999px;
          font-size: 0.58rem; letter-spacing: 0.2em; text-transform: uppercase;
          margin-bottom: 12px; backdrop-filter: blur(8px);
        }
        .slug-tag-dot {
          width: 5px; height: 5px; border-radius: 50%; background: #f97316;
          animation: pulse-dot 2s ease-in-out infinite; flex-shrink: 0;
        }
        .slug-hero-title {
          font-size: clamp(2rem, 7vw, 7rem); font-weight: 900;
          letter-spacing: -0.04em; line-height: 0.9;
          text-transform: uppercase; color: #fff;
          max-width: 900px;
        }

        /* Video play indicator */
        .slug-play-badge {
          position: absolute; top: clamp(16px,3vw,28px); left: clamp(16px,3vw,28px);
          display: flex; align-items: center; gap: 8px;
          padding: 7px 16px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(8px);
          font-size: 0.56rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.6); z-index: 3;
        }

        /* ── BREADCRUMB NAV ── */
        .slug-breadcrumb {
          position: relative; z-index: 2;
          display: flex; align-items: center; gap: 12px;
          padding: 14px clamp(20px,5vw,52px);
          border-bottom: 1px solid #0f0f0f;
          background: #000;
        }
        .slug-bread-link {
          font-size: 0.52rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: #444; text-decoration: none; transition: color 0.22s ease;
          display: flex; align-items: center; gap: 6px;
        }
        .slug-bread-link:hover { color: #f97316; }
        .slug-bread-sep { font-size: 0.44rem; color: #222; }
        .slug-bread-current { font-size: 0.52rem; letter-spacing: 0.2em; text-transform: uppercase; color: #f97316; }

        /* ── CONTENT GRID ── */
        .slug-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          position: relative; z-index: 2;
        }
        @media(min-width: 900px) {
          .slug-content { grid-template-columns: 1fr 340px; }
        }

        /* Left: description */
        .slug-main {
          padding: clamp(32px,5vw,64px) clamp(20px,5vw,52px);
          border-right: 1px solid #0f0f0f;
        }

        .slug-eyebrow {
          font-size: 0.54rem; letter-spacing: 0.3em; text-transform: uppercase;
          color: #f97316; display: flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
        }
        .slug-eyebrow-line { display: inline-block; width: 22px; height: 1px; background: #f97316; }

        .slug-desc {
          font-size: clamp(1rem, 2vw, 1.25rem); line-height: 1.72;
          color: #ccc; max-width: 640px;
          letter-spacing: 0.01em;
        }
        .slug-desc em { color: #f97316; font-style: normal; }

        /* Decorative quote mark */
        .slug-quote-mark {
          font-size: clamp(4rem, 8vw, 8rem); font-weight: 900; color: rgba(249,115,22,0.08);
          line-height: 1; margin-bottom: -24px; letter-spacing: -0.04em;
          display: block; user-select: none;
        }

        /* Right: metadata panel */
        .slug-sidebar {
          padding: clamp(28px,4vw,48px) clamp(20px,4vw,36px);
          border-top: 1px solid #0f0f0f;
          display: flex; flex-direction: column; gap: 0;
        }
        @media(min-width: 900px) { .slug-sidebar { border-top: none; } }

        .slug-meta-row {
          display: flex; flex-direction: column; gap: 5px;
          padding: 18px 0; border-bottom: 1px solid #0d0d0d;
          position: relative; overflow: hidden;
          transition: background 0.22s ease; cursor: default;
        }
        .slug-meta-row:last-child { border-bottom: none; }
        .slug-meta-row:hover { background: rgba(249,115,22,0.03); }
        .slug-meta-row::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: #f97316; transform: scaleX(0); transform-origin: left;
          transition: transform 0.32s cubic-bezier(0.16,1,0.3,1);
        }
        .slug-meta-row:hover::before { transform: scaleX(1); }
        .slug-meta-label {
          font-size: 0.48rem; letter-spacing: 0.24em; text-transform: uppercase; color: #444;
        }
        .slug-meta-value {
          font-size: 0.88rem; font-weight: 600; color: #e0e0e0; letter-spacing: 0.01em;
        }

        /* CTA in sidebar */
        .slug-sidebar-cta {
          margin-top: 28px;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 24px;
          border: 1.5px solid #f97316; color: #f97316;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; text-decoration: none;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
          position: relative; overflow: hidden;
          transition: color 0.28s ease;
        }
        .slug-sidebar-cta::before {
          content: ''; position: absolute; inset: 0;
          background: #f97316; transform: translateX(-106%);
          transition: transform 0.32s cubic-bezier(0.76,0,0.24,1); z-index: 0;
        }
        .slug-sidebar-cta:hover::before { transform: translateX(0); }
        .slug-sidebar-cta:hover { color: #000; }
        .slug-sidebar-cta span { position: relative; z-index: 1; }
        .slug-cta-arrow { display: inline-block; position: relative; z-index: 1; transition: transform 0.22s ease; }
        .slug-sidebar-cta:hover .slug-cta-arrow { transform: translateX(4px); }

        /* ── NEXT / PREV ── */
        .slug-nav-section {
          display: grid; grid-template-columns: 1fr 1fr;
          border-top: 1px solid #141414; position: relative; z-index: 2;
        }
        @media(max-width: 600px) { .slug-nav-section { grid-template-columns: 1fr; } }

        .slug-nav-card {
          position: relative; overflow: hidden; cursor: pointer;
          display: block; text-decoration: none;
          height: clamp(200px, 30vw, 420px);
          border-right: 1px solid #0f0f0f;
        }
        .slug-nav-card:last-child { border-right: none; }
        .slug-nav-img {
          width: 100%; height: 100%; object-fit: cover;
          display: block;
          transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94),
                      filter 0.5s ease;
        }
        .slug-nav-card:hover .slug-nav-img {
          transform: scale(1.07);
          filter: brightness(0.3) saturate(0.5);
        }
        .slug-nav-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 55%);
          z-index: 1;
        }
        .slug-nav-label {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: clamp(16px,3vw,28px); z-index: 2;
        }
        .slug-nav-dir {
          font-size: 0.48rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.3); margin-bottom: 6px; display: block;
        }
        .slug-nav-name {
          font-size: clamp(1rem, 2.5vw, 2rem); font-weight: 900;
          letter-spacing: -0.02em; text-transform: uppercase; color: #fff;
          transition: color 0.25s ease;
        }
        .slug-nav-card:hover .slug-nav-name { color: #f97316; }
        .slug-nav-cat {
          font-size: 0.5rem; letter-spacing: 0.18em; text-transform: uppercase;
          color: #f97316; margin-top: 4px; display: block;
        }
        /* Arrow that scales in on hover */
        .slug-nav-arrow {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 52px; height: 52px; border-radius: 50%;
          border: 1.5px solid #f97316;
          display: flex; align-items: center; justify-content: center;
          color: #f97316; font-size: 1.1rem; z-index: 3;
          transition: transform 0.38s cubic-bezier(0.34,1.56,0.64,1);
        }
        .slug-nav-card:hover .slug-nav-arrow {
          transform: translate(-50%, -50%) scale(1);
        }

        /* ── FOOTER MARQUEE — identical to all other pages ── */
        @keyframes marquee-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .chat-marquee-section {
          position: relative; overflow: hidden; cursor: pointer;
          background: #000; border-top: 1px solid #1a1a1a;
          padding: 10px 0; transition: background 0.4s ease;
        }
        .chat-marquee-section:hover { background: #f97316; }
        .chat-marquee-track { display: flex; width: max-content; animation: marquee-scroll 22s linear infinite; }
        .chat-marquee-section:hover .chat-marquee-track { animation: marquee-scroll 10s linear infinite; }
        .chat-marquee-word {
          font-size: clamp(1.2rem,3vw,2.6rem); font-weight: 900;
          text-transform: uppercase; letter-spacing: -0.02em;
          white-space: nowrap; padding-right: 1.2rem; color: #fff; transition: color 0.4s ease; line-height: 1;
        }
        .chat-marquee-section:hover .chat-marquee-word { color: #000; }
        .chat-marquee-dot { color: #f97316; transition: color 0.4s ease; }
        .chat-marquee-section:hover .chat-marquee-dot { color: #000; }
        .chat-cta-hint {
          position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
          display: flex; align-items: center; gap: 5px; font-size: 0.52rem;
          letter-spacing: 0.15em; text-transform: uppercase; color: #f97316;
          transition: color 0.4s ease, transform 0.3s ease; z-index: 2; pointer-events: none;
        }
        .chat-marquee-section:hover .chat-cta-hint { color: #000; transform: translateY(-50%) translateX(4px); }

        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
      `}</style>

      <main className="bg-black text-white min-h-screen">

        {/* GRAIN */}
        <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.025]"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"128px 128px", mixBlendMode:"overlay" }}
        />

        <SiteHeader />

        {/* ── HERO ── */}
        <div className="slug-hero">
          {isVideo ? (
            <video
              ref={videoRef}
              src={project.video}
              poster={project.image}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="slug-hero-media"
              onLoadedMetadata={() => { videoRef.current?.play().catch(() => {}); }}
              onCanPlay={() => { setVideoReady(true); videoRef.current?.play().catch(() => {}); }}
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="slug-hero-media"
            />
          )}
          <div className="slug-hero-overlay" />

          {isVideo && (
            <div className="slug-play-badge">
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#f97316", display:"inline-block", animation:"pulse-dot 1.5s ease-in-out infinite" }} />
              Playing — {project.category}
            </div>
          )}

          <div className="slug-hero-meta">
            <div className="slug-tag">
              <span className="slug-tag-dot" />
              {project.category}
            </div>
            <h1 className="slug-hero-title">{project.title}</h1>
          </div>
        </div>

        {/* ── BREADCRUMB ── */}
        <div className="slug-breadcrumb" ref={r(0, 0)}>
          <Link href="/" className="slug-bread-link">
            <span>←</span> Home
          </Link>
          <span className="slug-bread-sep">/</span>
          <Link href="/#work-section" className="slug-bread-link">Work</Link>
          <span className="slug-bread-sep">/</span>
          <span className="slug-bread-current">{project.title}</span>
        </div>

        {/* ── CONTENT GRID ── */}
        <div className="slug-content">

          {/* LEFT — Description */}
          <div className="slug-main" ref={r(1, 60)}>
            <p className="slug-eyebrow">
              <span className="slug-eyebrow-line" />
              Project Overview
            </p>
            <span className="slug-quote-mark" aria-hidden="true">"</span>
            <p className="slug-desc">{project.desc}</p>
          </div>

          {/* RIGHT — Metadata sidebar */}
          <div className="slug-sidebar" ref={r(2, 120)}>
            {[
              { label: "Category",   value: project.category },
              { label: "Studio",     value: "UNFLTR Studio" },
              { label: "Year",       value: "2024 / 2025" },
              { label: "Discipline", value: isVideo ? "Film & Motion" : "Visual Design" },
              { label: "Market",     value: "India & Global" },
            ].map((item) => (
              <div key={item.label} className="slug-meta-row">
                <span className="slug-meta-label">{item.label}</span>
                <span className="slug-meta-value">{item.value}</span>
              </div>
            ))}

            <Link href="/contact" className="slug-sidebar-cta">
              <span>Start A Project</span>
              <span className="slug-cta-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* ── PREV / NEXT ── */}
        <div className="slug-nav-section" ref={r(3, 80)}>
          {[
            { dir: "← Previous", proj: prevProject },
            { dir: "Next →",      proj: nextProject },
          ].map(({ dir, proj }) => (
            <Link href={`/projects/${proj.slug}`} key={proj.slug} className="slug-nav-card">
              <img src={proj.image} alt={proj.title} className="slug-nav-img" />
              <div className="slug-nav-overlay" />
              <div className="slug-nav-arrow">→</div>
              <div className="slug-nav-label">
                <span className="slug-nav-dir">{dir}</span>
                <div className="slug-nav-name">{proj.title}</div>
                <span className="slug-nav-cat">{proj.category}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── FOOTER MARQUEE — same as all other pages ── */}
        <Link href="/contact">
          <section className="chat-marquee-section">
            <div style={{ overflow:"hidden" }}>
              <div className="chat-marquee-track">
                {Array(16).fill(null).map((_,i) => (
                  <span key={i} className="chat-marquee-word">
                    Let&apos;s Have A Chat <span className="chat-marquee-dot">—</span>&nbsp;
                  </span>
                ))}
              </div>
            </div>
            <div className="chat-cta-hint"><span className="hidden sm:inline">Get In Touch</span><span>→</span></div>
          </section>
        </Link>

      </main>
    </>
  );
}