import Link from "next/link";
import projects from "@/data/projects";

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
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        * { font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif; }

        /* LOGO */
        .slug-logo-path { fill: #fff; transition: fill 0.35s ease; }
        .slug-logo-svg { transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1); transform-origin: center; }
        .slug-brand:hover .slug-logo-svg { transform: rotate(180deg) scale(1.15); }
        .slug-brand:hover .slug-logo-path { fill: #f97316; }

        /* CONTACT BTN */
        .contact-btn {
          position: relative;
          overflow: hidden;
          border: 1.5px solid #f97316;
          color: #f97316;
          padding: 0;
          width: 110px;
          height: 36px;
          border-radius: 0;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          transition: color 0.28s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .contact-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #f97316;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transform: translateX(-105%);
          transition: transform 0.3s cubic-bezier(0.76,0,0.24,1);
          z-index: 0;
        }
        .contact-btn:hover::before { transform: translateX(0); }
        .contact-btn:hover { color: #000; }
        .contact-btn-text {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 6px; line-height: 1;
        }
        .contact-arrow { color: #f97316; transition: color 0.28s ease, transform 0.2s ease; }
        .contact-btn:hover .contact-arrow { color: #000; transform: translateX(3px); }

        /* HERO */
        .slug-hero {
          position: relative;
          width: 100%;
          background: #000;
          overflow: hidden;
        }
        .slug-hero-img {
          width: 100%;
          display: block;
          object-fit: contain;
          max-height: 92svh;
          transition: transform 14s ease;
        }
        .slug-hero:hover .slug-hero-img { transform: scale(1.025); }

        /* Diagonal brutalist border bottom */
        .slug-hero::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: #f97316;
        }

        .slug-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom,
            rgba(0,0,0,0.25) 0%,
            rgba(0,0,0,0) 25%,
            rgba(0,0,0,0) 55%,
            rgba(0,0,0,0.88) 100%);
          pointer-events: none;
        }
        .slug-hero-meta {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 18px;
          z-index: 2;
        }
        @media (min-width: 768px) { .slug-hero-meta { padding: 44px 52px; } }

        .slug-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(249,115,22,0.55);
          color: #f97316;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        /* DETAIL GRID */
        .detail-row {
          display: flex;
          flex-direction: column;
          gap: 5px;
          padding: 18px 0;
          border-bottom: 1px solid #181818;
        }
        .detail-label {
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #444;
        }
        .detail-value { font-size: 0.95rem; font-weight: 500; color: #fff; }

        /* BACK BTN */
        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #555;
          transition: color 0.2s ease;
          cursor: pointer;
        }
        .back-btn:hover { color: #f97316; }
        .back-arrow { transition: transform 0.2s ease; }
        .back-btn:hover .back-arrow { transform: translateX(-3px); }

        /* NEXT/PREV */
        .next-project-wrap {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          display: block;
          border-top: 1px solid #141414;
        }
        .next-project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s ease;
        }
        .next-project-wrap:hover .next-project-img {
          transform: scale(1.05);
          filter: brightness(0.25);
        }
        .next-project-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 55%);
          z-index: 1;
        }
        .next-project-label {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 20px 18px;
          z-index: 2;
        }
        @media (min-width: 768px) { .next-project-label { padding: 32px 36px; } }
        .next-arrow-circle {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 56px; height: 56px;
          border-radius: 50%;
          border: 1.5px solid #f97316;
          display: flex; align-items: center; justify-content: center;
          color: #f97316;
          font-size: 1.3rem;
          z-index: 3;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .next-project-wrap:hover .next-arrow-circle {
          transform: translate(-50%,-50%) scale(1);
        }

        /* MARQUEE */
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .chat-marquee-section {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #000;
          border-top: 1px solid #1a1a1a;
          padding: 24px 0;
          transition: background 0.4s ease;
        }
        .chat-marquee-section:hover { background: #f97316; }
        .chat-marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 22s linear infinite;
        }
        .chat-marquee-section:hover .chat-marquee-track {
          animation: marquee-scroll 10s linear infinite;
        }
        .chat-marquee-word {
          font-size: clamp(2.2rem, 5vw, 5rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          white-space: nowrap;
          padding-right: 2.5rem;
          color: #fff;
          transition: color 0.4s ease;
          line-height: 1;
        }
        .chat-marquee-section:hover .chat-marquee-word { color: #000; }
        .chat-marquee-dot { color: #f97316; transition: color 0.4s ease; }
        .chat-marquee-section:hover .chat-marquee-dot { color: #000; }
        .chat-cta-hint {
          position: absolute;
          right: 20px; top: 50%;
          transform: translateY(-50%);
          display: flex; align-items: center; gap: 6px;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #f97316;
          transition: color 0.4s ease, transform 0.3s ease;
          z-index: 2;
          pointer-events: none;
        }
        .chat-marquee-section:hover .chat-cta-hint {
          color: #000;
          transform: translateY(-50%) translateX(4px);
        }

        /* SCROLL REVEAL for slug content */
        .reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94),
                      transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>

      <SlugClient
        project={project}
        nextProject={nextProject}
        prevProject={prevProject}
      />
    </>
  );
}

/* ─── CLIENT SHELL for scroll reveal ─────────────────────── */
import SlugClient from "@/components/SlugClient";