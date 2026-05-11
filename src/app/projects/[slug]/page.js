import Link from "next/link";
import projects from "@/data/projects";

export default async function ProjectPage({ params }) {
  const { slug } = params;
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
          <Link href="/">
            <span className="text-orange-500 underline underline-offset-4">← Back Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        * { font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', Arial, sans-serif; }

        .slug-logo-path { fill: #ffffff; transition: fill 0.35s ease; }
        .slug-logo-svg { transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1); transform-origin: center; }
        .slug-brand:hover .slug-logo-svg { transform: rotate(180deg) scale(1.15); }
        .slug-brand:hover .slug-logo-path { fill: #f97316; }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #9ca3af;
          transition: color 0.2s ease;
          cursor: pointer;
        }
        .back-btn:hover { color: #f97316; }
        .back-arrow {
          transition: transform 0.2s ease;
        }
        .back-btn:hover .back-arrow { transform: translateX(-3px); }

        /* HERO */
        .slug-hero {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #000;
        }
        .slug-hero-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          transition: transform 12s ease;
        }
        .slug-hero:hover .slug-hero-img {
          transform: scale(1.03);
        }
        .slug-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.3) 0%,
            rgba(0,0,0,0) 30%,
            rgba(0,0,0,0) 60%,
            rgba(0,0,0,0.85) 100%
          );
          pointer-events: none;
        }
        .slug-hero-meta {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px 20px;
          z-index: 2;
        }
        @media (min-width: 768px) {
          .slug-hero-meta { padding: 40px 48px; }
        }

        /* CATEGORY TAG */
        .slug-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid rgba(249,115,22,0.5);
          color: #f97316;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        /* DETAIL ROWS */
        .detail-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 20px 0;
          border-bottom: 1px solid #1a1a1a;
        }
        .detail-label {
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #555;
        }
        .detail-value {
          font-size: 1rem;
          font-weight: 500;
          color: #fff;
        }

        /* NEXT PROJECT */
        .next-project-wrap {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          display: block;
        }
        .next-project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94),
                      filter 0.5s ease;
        }
        .next-project-wrap:hover .next-project-img {
          transform: scale(1.04);
          filter: brightness(0.3);
        }
        .next-project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%);
          z-index: 1;
        }
        .next-project-label {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px 20px;
          z-index: 2;
        }
        @media (min-width: 768px) {
          .next-project-label { padding: 36px 40px; }
        }
        .next-arrow-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 1.5px solid #f97316;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f97316;
          font-size: 1.4rem;
          z-index: 3;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .next-project-wrap:hover .next-arrow-circle {
          transform: translate(-50%, -50%) scale(1);
        }

        /* CONTACT BTN */
        .contact-btn {
          position: relative;
          overflow: hidden;
          border: 1px solid #f97316;
          color: #f97316;
          padding: 0 20px;
          height: 36px;
          border-radius: 4px;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          transition: color 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }
        .contact-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #f97316;
          transform: translateX(-101%);
          transition: transform 0.3s cubic-bezier(0.76,0,0.24,1);
          z-index: 0;
        }
        .contact-btn:hover::before { transform: translateX(0); }
        .contact-btn:hover { color: #000; }
        .contact-btn-text {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          line-height: 1;
        }
        .contact-arrow {
          color: #f97316;
          transition: color 0.3s ease, transform 0.2s ease;
        }
        .contact-btn:hover .contact-arrow { color: #000; transform: translateX(2px); }

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
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
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
      `}</style>

      <main className="bg-black text-white min-h-screen">

        {/* GRAIN */}
        <div
          className="fixed inset-0 z-[999] pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            mixBlendMode: "overlay",
          }}
        />

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-5 backdrop-blur-md bg-black/50 border-b border-zinc-900">
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

        {/* HERO IMAGE — contain so nothing gets cut */}
        <div className="slug-hero" style={{ minHeight: "60svh", maxHeight: "90svh" }}>
          <img
            src={project.image}
            alt={project.title}
            className="slug-hero-img"
            style={{ minHeight: "60svh", maxHeight: "90svh" }}
          />
          <div className="slug-hero-overlay" />
          <div className="slug-hero-meta">
            <div className="slug-tag">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", display: "inline-block" }} />
              {project.category}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-none mt-1">
              {project.title}
            </h1>
          </div>
        </div>

        {/* CONTENT */}
        <section className="px-5 md:px-12 py-14 md:py-20 max-w-5xl">

          <Link href="/" className="back-btn mb-10 block">
            <span className="back-arrow">←</span>
            All Works
          </Link>

          {/* DETAIL GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-zinc-900 mb-14 md:mb-20">
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

          <p className="text-gray-400 text-base md:text-xl leading-relaxed max-w-3xl">
            A bold creative execution rooted in cultural relevance and strategic clarity.
            This project represents UNFLTR&apos;s approach to building brand systems that feel
            alive — visually distinct, emotionally resonant, and built to last.
          </p>

        </section>

        {/* PREV / NEXT NAV */}
        <section className="grid grid-cols-1 md:grid-cols-2 border-t border-zinc-900">
          {[
            { label: "← Previous", proj: prevProject },
            { label: "Next →", proj: nextProject },
          ].map(({ label, proj }) => (
            <Link href={`/projects/${proj.slug}`} key={proj.slug}>
              <div className="next-project-wrap" style={{ height: "clamp(200px, 35vw, 420px)" }}>
                <img src={proj.image} alt={proj.title} className="next-project-img" />
                <div className="next-project-overlay" />
                <div className="next-arrow-circle">→</div>
                <div className="next-project-label">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/40 mb-1">{label}</p>
                  <h3 className="text-xl md:text-3xl font-bold">{proj.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-orange-500 mt-1">{proj.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* FOOTER MARQUEE */}
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
    </>
  );
}