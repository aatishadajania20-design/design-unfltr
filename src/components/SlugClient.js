"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function SlugClient({ project, nextProject, prevProject }) {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observers = [];
    revealRefs.current.forEach((el) => {
      if (!el) return;
      el.classList.remove("visible");
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add("visible");
          } else {
            el.classList.remove("visible");
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const r = (i) => (el) => (revealRefs.current[i] = el);

  return (
    <main className="bg-black text-white min-h-screen">

      {/* GRAIN */}
      <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          mixBlendMode: "overlay",
        }}
      />

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 backdrop-blur-md bg-black/50 border-b border-zinc-900">
        <Link href="/">
          <div className="slug-brand flex items-center gap-2 cursor-pointer select-none">
            <svg className="slug-logo-svg" width="24" height="24" viewBox="0 0 88.82 89.67" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path className="slug-logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
                <path className="slug-logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
              </g>
            </svg>
            <span className="text-orange-500 text-lg font-semibold tracking-tight">UNFLTR Studio®</span>
          </div>
        </Link>

   <div className="flex items-center gap-3">
  <a
    href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ=="
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-orange-500 transition-colors duration-200"
    aria-label="Instagram"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="6"
        ry="6"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
      />
      <circle
        cx="17.8"
        cy="6.2"
        r="1.1"
        fill="currentColor"
      />
    </svg>
  </a>

  <Link href="/contact">
    <button className="contact-btn">
      <span className="contact-btn-text">
        <span className="contact-arrow">→</span>
        Contact
      </span>
    </button>
  </Link>
</div>
      </nav>

      {/* HERO IMAGE */}
      <div className="slug-hero">
        <img
          src={project.image}
          alt={project.title}
          className="slug-hero-img"
        />
        <div className="slug-hero-overlay" />
        <div className="slug-hero-meta">
          <div className="slug-tag">
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#f97316", display: "inline-block" }} />
            {project.category}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-none mt-2">
            {project.title}
          </h1>
        </div>
      </div>

      {/* BACK + DETAILS */}
      <section className="px-5 md:px-12 py-12 md:py-20">
        <div ref={r(0)} className="reveal mb-10">
          <Link href="/" className="back-btn">
            <span className="back-arrow">←</span>
            All Works
          </Link>
        </div>

        <div ref={r(1)} className="reveal grid grid-cols-2 md:grid-cols-4 border-t border-zinc-900 mb-12 md:mb-20" style={{ transitionDelay: "80ms" }}>
          {[
            { label: "Category", value: project.category },
            { label: "Studio", value: "UNFLTR" },
            { label: "Year", value: "2024" },
            { label: "Type", value: "Creative Work" },
          ].map((item) => (
            <div key={item.label} className="detail-row pr-6">
              <span className="detail-label">{item.label}</span>
              <span className="detail-value">{item.value}</span>
            </div>
          ))}
        </div>

        <p ref={r(2)} className="reveal text-gray-400 text-base md:text-xl leading-relaxed max-w-3xl" style={{ transitionDelay: "160ms" }}>
          A bold creative execution rooted in cultural relevance and strategic clarity.
          This project represents UNFLTR&apos;s approach to building brand systems that feel
          alive — visually distinct, emotionally resonant, and built to last.
        </p>
      </section>

      {/* PREV / NEXT */}
      <section ref={r(3)} className="reveal grid grid-cols-1 md:grid-cols-2" style={{ transitionDelay: "80ms" }}>
        {[
          { label: "← Previous", proj: prevProject },
          { label: "Next →", proj: nextProject },
        ].map(({ label, proj }) => (
          <Link href={`/projects/${proj.slug}`} key={proj.slug}>
            <div className="next-project-wrap" style={{ height: "clamp(220px, 36vw, 440px)" }}>
              <img src={proj.image} alt={proj.title} className="next-project-img" />
              <div className="next-project-overlay" />
              <div className="next-arrow-circle">→</div>
              <div className="next-project-label">
                <p className="text-xs uppercase tracking-[0.18em] text-white/35 mb-1">{label}</p>
                <h3 className="text-xl md:text-3xl font-bold">{proj.title}</h3>
                <p className="text-xs uppercase tracking-widest text-orange-500 mt-1">{proj.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* FOOTER */}
      <Link href="/contact">
        <section className="chat-marquee-section">
          <div style={{ overflow: "hidden" }}>
            <div className="chat-marquee-track">
              {Array(16).fill(null).map((_, i) => (
                <span key={i} className="chat-marquee-word">
                  Let&apos;s Have A Chat <span className="chat-marquee-dot">—</span>&nbsp;
                </span>
              ))}
            </div>
          </div>
          <div className="chat-cta-hint">
            <span className="hidden sm:inline">Get In Touch</span>
            <span>→</span>
          </div>
        </section>
      </Link>

    </main>
  );
}