"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import SiteHeader from "@/components/SiteHeader";

export default function SlugClient({ project, nextProject, prevProject }) {
  const revealRefs = useRef([]);

  useEffect(() => {
    const observers = [];
    revealRefs.current.forEach((el) => {
      if (!el) return;
      el.classList.remove("visible");
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) el.classList.add("visible");
          else el.classList.remove("visible");
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
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"128px 128px", mixBlendMode:"overlay" }}
      />

      <SiteHeader />

      {/* HERO IMAGE */}
      <div className="slug-hero">
        <img src={project.image} alt={project.title} className="slug-hero-img" />
        <div className="slug-hero-overlay" />
        <div className="slug-hero-meta">
          <div className="slug-tag">
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#f97316", display:"inline-block" }} />
            {project.category}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-none mt-2">{project.title}</h1>
        </div>
      </div>

      {/* BACK + DETAILS */}
      <section className="px-5 md:px-12 py-12 md:py-20">
        <div ref={r(0)} className="reveal mb-10">
          <Link href="/" className="back-btn"><span className="back-arrow">←</span>All Works</Link>
        </div>
        <div ref={r(1)} className="reveal grid grid-cols-2 md:grid-cols-4 border-t border-zinc-900 mb-12 md:mb-20" style={{ transitionDelay:"80ms" }}>
          {[
            { label:"Category", value:project.category },
            { label:"Studio",   value:"UNFLTR" },
            { label:"Year",     value:"2024" },
            { label:"Type",     value:"Creative Work" },
          ].map((item) => (
            <div key={item.label} className="detail-row pr-6">
              <span className="detail-label">{item.label}</span>
              <span className="detail-value">{item.value}</span>
            </div>
          ))}
        </div>
        <p ref={r(2)} className="reveal text-gray-400 text-base md:text-xl leading-relaxed max-w-3xl" style={{ transitionDelay:"160ms" }}>
          A bold creative execution rooted in cultural relevance and strategic clarity.
          This project represents UNFLTR&apos;s approach to building brand systems that feel
          alive — visually distinct, emotionally resonant, and built to last.
        </p>
      </section>

      {/* PREV / NEXT */}
      <section ref={r(3)} className="reveal grid grid-cols-1 md:grid-cols-2" style={{ transitionDelay:"80ms" }}>
        {[
          { label:"← Previous", proj:prevProject },
          { label:"Next →",     proj:nextProject },
        ].map(({ label, proj }) => (
          <Link href={`/projects/${proj.slug}`} key={proj.slug}>
            <div className="next-project-wrap" style={{ height:"clamp(220px,36vw,440px)" }}>
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
  );
}