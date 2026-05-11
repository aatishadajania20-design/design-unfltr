import Link from "next/link";
import PortfolioGrid from "@/components/PortfolioGrid";

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        * {
          font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', Arial, sans-serif;
        }

        .logo-svg {
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: center;
        }
        .logo-path {
          fill: #ffffff;
          transition: fill 0.35s ease;
        }
        .brand-wrap:hover .logo-svg {
          transform: rotate(180deg) scale(1.15);
        }
        .brand-wrap:hover .logo-path {
          fill: #f97316;
        }

        .brand-letter {
          display: inline-block;
          transition: color 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .brand-wrap:hover .brand-letter { color: #ffffff; }
        .brand-wrap:hover .brand-letter:nth-child(1) { transform: translateY(-3px); transition-delay: 0ms; }
        .brand-wrap:hover .brand-letter:nth-child(2) { transform: translateY(-3px); transition-delay: 40ms; }
        .brand-wrap:hover .brand-letter:nth-child(3) { transform: translateY(-3px); transition-delay: 80ms; }
        .brand-wrap:hover .brand-letter:nth-child(4) { transform: translateY(-3px); transition-delay: 120ms; }
        .brand-wrap:hover .brand-letter:nth-child(5) { transform: translateY(-3px); transition-delay: 160ms; }
        .brand-wrap:hover .brand-letter:nth-child(6) { transform: translateY(-3px); transition-delay: 200ms; }
        .brand-suffix {
          transition: color 0.2s ease 0.24s;
          color: #f97316;
        }
        .brand-wrap:hover .brand-suffix { color: #ffffff; }

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
          transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 0;
        }
        .contact-btn:hover::before { transform: translateX(0); }
        .contact-btn:hover { color: #000; }
        .contact-btn-text {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          line-height: 1;
        }
        .contact-arrow {
          display: inline-flex;
          align-items: center;
          color: #f97316;
          transition: color 0.3s ease, transform 0.2s ease;
          font-size: 0.9rem;
          line-height: 1;
        }
        .contact-btn:hover .contact-arrow {
          color: #000;
          transform: translateX(2px);
        }

        .nav-item {
          position: relative;
          cursor: pointer;
          padding: 6px 14px;
          overflow: hidden;
        }
        .nav-label {
          display: block;
          color: #9ca3af;
          letter-spacing: 0.04em;
          transition: color 0.2s ease, letter-spacing 0.35s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .nav-item:hover .nav-label {
          color: #ffffff;
          letter-spacing: 0.14em;
        }
        .nav-slash {
          position: absolute;
          bottom: 2px;
          left: 14px;
          right: 14px;
          height: 2px;
          background: #f97316;
          transform: translateX(-110%) skewX(-20deg);
          transition: transform 0.25s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .nav-item:hover .nav-slash { transform: translateX(0%) skewX(-20deg); }
        .nav-dot {
          position: absolute;
          top: 4px;
          right: 6px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #f97316;
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.15s ease 0.12s, transform 0.15s ease 0.12s;
        }
        .nav-item:hover .nav-dot { opacity: 1; transform: scale(1); }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

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
          will-change: transform;
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
          color: #ffffff;
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
        .chat-cta-arrow { font-size: 1rem; transition: transform 0.3s ease; }
        .chat-marquee-section:hover .chat-cta-arrow { transform: translateX(4px); }

        /* MOBILE MENU BUTTON */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 4px;
        }
        .mobile-menu-btn span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #fff;
          transition: all 0.3s ease;
        }
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex; }
        }

        /* SLIDE IN ANIMATION for portfolio on mobile */
        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <main className="bg-black text-white min-h-screen">

        {/* GRAIN OVERLAY */}
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

          {/* LOGO + BRAND */}
          <div className="brand-wrap flex items-center gap-2 cursor-pointer select-none">
            <svg
              className="logo-svg"
              width="26"
              height="26"
              viewBox="0 0 88.82 89.67"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path className="logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
                <path className="logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
              </g>
            </svg>
            <h1 className="text-orange-500 text-lg md:text-xl font-semibold tracking-tight leading-none">
              {"UNFLTR".split("").map((char, i) => (
                <span key={i} className="brand-letter">{char}</span>
              ))}
              <span className="brand-suffix"> Studio®</span>
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1 text-sm">
            {["Branding", "Strategy", "Marketing", "Motion"].map((item) => (
              <div key={item} className="nav-item">
                <span className="nav-label">{item}</span>
                <span className="nav-slash" aria-hidden="true" />
                <span className="nav-dot" aria-hidden="true" />
              </div>
            ))}
          </div>

{/* ACTIONS */}
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

        {/* HERO — full viewport, video background */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: "100svh" }}>

          <video
            src="https://res.cloudinary.com/dta1dl0pj/video/upload/q_auto/f_auto/v1778434734/1.5_lrsfll.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          />

          {/* Overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.72) 100%)",
            zIndex: 1,
          }} />

          {/* TEXT */}
          <div
            style={{ position: "relative", zIndex: 3 }}
            className="px-5 md:px-8 pt-24 pb-16 md:pb-24 flex flex-col justify-end min-h-[100svh]"
          >
            <p className="text-orange-500 uppercase tracking-[0.25em] md:tracking-[0.3em] text-xs md:text-sm mb-5">
              Creative Strategy Studio
            </p>

            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] max-w-5xl">
              Culture-First Branding For Brands That Refuse To Look Average.
            </h2>

            <p className="text-gray-300 mt-6 md:mt-8 max-w-2xl text-base md:text-xl leading-relaxed">
              UNFLTR Is A Multidisciplinary Creative Studio Blending Branding, Marketing, Motion, And Strategy Into Culturally Relevant Brand Systems.
            </p>

            <div className="flex items-center gap-5 mt-8 md:mt-12">
              <div className="flex items-center gap-2">
                <span style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#f97316",
                  display: "inline-block",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }} />
                <span className="text-xs uppercase tracking-[0.16em] text-white/50">Showreel 2025</span>
              </div>
              <div style={{ height: 1, width: 36, background: "rgba(255,255,255,0.18)" }} />
              <span className="text-xs uppercase tracking-[0.16em] text-white/28">Est. 2024</span>
            </div>
          </div>

        </section>

        {/* PORTFOLIO */}
        <PortfolioGrid />

        {/* FOOTER MARQUEE */}
        <ChatMarquee />

      </main>
    </>
  );
}

function ChatMarquee() {
  const repeated = Array(16).fill(null);
  return (
    <Link href="/contact">
      <section className="chat-marquee-section">
        <div style={{ overflow: "hidden" }}>
          <div className="chat-marquee-track">
            {repeated.map((_, i) => (
              <span key={i} className="chat-marquee-word">
                Let&apos;s Have A Chat <span className="chat-marquee-dot">—</span>&nbsp;
              </span>
            ))}
          </div>
        </div>
        <div className="chat-cta-hint">
          <span className="hidden sm:inline">Get In Touch</span>
          <span className="chat-cta-arrow">→</span>
        </div>
      </section>
    </Link>
  );
}