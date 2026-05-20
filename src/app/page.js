"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PortfolioGrid from "@/components/PortfolioGrid";

/* ─── NAV LINK with Katana slice ─── */
function NavLink({ href, label, onClick }) {
  const Tag = onClick ? "button" : Link;
  const props = onClick
    ? { onClick, className: "nav-item", type: "button" }
    : { href, className: "nav-item" };
  return (
    <Tag {...props}>
      <span className="nav-top" aria-hidden="true">{label}</span>
      <span className="nav-bottom">{label}</span>
      <span className="nav-katana" aria-hidden="true">
        <span className="nav-katana-blade" />
        <span className="nav-katana-flash" />
      </span>
    </Tag>
  );
}

/* ─── SHARED NAV ─── */
function SiteNav() {
  const scrollToWork = () => {
    document.getElementById("work-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 backdrop-blur-md bg-black/55 border-b border-zinc-900">
      <Link href="/">
        <div className="brand-wrap flex items-center gap-2 cursor-pointer select-none">
          <svg className="logo-svg" width="26" height="26" viewBox="0 0 88.82 89.67" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path className="logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
              <path className="logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
            </g>
          </svg>
          {/* Wordmark — same height as 26px SVG */}
          <h1 className="brand-wordmark">
            {"UNFLTR".split("").map((char, i) => (
              <span key={`u${i}`} className="brand-letter" style={{ "--i": i }}>{char}</span>
            ))}
            <span className="brand-space">&nbsp;</span>
            {"STUDIO".split("").map((char, i) => (
              <span key={`s${i}`} className="brand-letter brand-letter-studio" style={{ "--i": i + 7 }}>{char}</span>
            ))}
          </h1>
        </div>
      </Link>

      <div className="hidden md:flex items-center">
        <NavLink href="/services" label="Services" />
        <NavLink href="#" label="Work" onClick={scrollToWork} />
        <NavLink href="/clients" label="Clients" />
        <NavLink href="/about" label="About" />
      </div>

      <div className="flex items-center gap-3">
        <a href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ==" target="_blank" rel="noopener noreferrer"
          className="text-white hover:text-orange-500 transition-colors duration-200" aria-label="Instagram">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="20" height="20" rx="6" ry="6" stroke="currentColor" strokeWidth="1.8" fill="none" />
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
            <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" />
          </svg>
        </a>
        <Link href="/contact">
          <button className="contact-btn">
            <span className="contact-btn-text"><span className="contact-arrow">→</span>Contact</span>
          </button>
        </Link>
      </div>
    </nav>
  );
}

/* ─── OUR WORK SECTION TITLE ─── */
function OurWorkTitle() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const words = [
    { text: "Our", accent: false },
    { text: "Work.", accent: true },
  ];

  return (
    <div className="work-marker" ref={ref} id="work-section">
      <span className="work-marker-num" aria-hidden="true">02</span>
      <p className="work-marker-eyebrow">
        <span className="work-marker-eyebrow-line" />
        Selected Projects
      </p>
      <h2 className="work-marker-title">
        {words.map((w, wi) => (
          <span key={wi} className="work-marker-word">
            {w.text.split("").map((ch, ci) => (
              <span
                key={ci}
                className={`work-marker-letter${w.accent ? " is-accent" : ""}`}
                style={{ animationDelay: visible ? `${(wi * w.text.length + ci) * 55}ms` : "0ms", animationPlayState: visible ? "running" : "paused" }}
              >{ch}</span>
            ))}
          </span>
        ))}
      </h2>
      <div className="work-marker-meta">
        <p className="work-marker-desc">
          A curated selection of culturally sharp brand identities, campaigns, and motion work — built for brands that refuse to look average.
        </p>
        <span className="work-marker-tag">
          <span className="work-marker-tag-dot" />
          110+ Projects Delivered
        </span>
      </div>
    </div>
  );
}

/* ─── HOME ─── */
export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        * { font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', Arial, sans-serif; }

        /* ── LOGO ── */
        .logo-svg { transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1); transform-origin: center; }
        .logo-path { fill: #ffffff; transition: fill 0.35s ease; }
        .brand-wrap:hover .logo-svg { transform: rotate(180deg) scale(1.15); }
        .brand-wrap:hover .logo-path { fill: #f97316; }

        /* ── WORDMARK — matches 26px SVG height exactly ── */
        .brand-wordmark {
          font-size: 1.05rem; line-height: 1; font-weight: 700;
          letter-spacing: -0.01em; display: inline-flex; align-items: center;
          margin: 0; padding: 0;
        }
        @media(min-width:768px){ .brand-wordmark { font-size: 1.15rem; } }

        /* ── ALL 12 LETTERS SHARE ONE CLASS — wave ripples from U→E ── */
        .brand-letter {
          display: inline-block;
          color: #fff;
          transition: color 0.25s ease, transform 0.38s cubic-bezier(0.34,1.56,0.64,1);
          transition-delay: 0ms;
        }
        /* STUDIO letters start orange (like the logo fill on hover) */
        .brand-letter-studio { color: #f97316; }

        /* On hover the whole wrap: every letter jumps in sequence */
        .brand-wrap:hover .brand-letter {
          color: #fff;
          transform: translateY(-3px);
          transition-delay: calc(var(--i) * 42ms);
        }
        .brand-space { display: inline-block; }

        /* ── KATANA NAV ── smooth, real blade feel ── */
        .nav-item {
          position: relative; cursor: pointer;
          padding: 10px 20px; user-select: none; overflow: visible;
          text-decoration: none; background: none; border: none;
          font-family: inherit;
        }
        .nav-top, .nav-bottom {
          display: block; font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.08em; color: #9ca3af; line-height: 1; white-space: nowrap;
          transition: transform 0.58s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease;
          will-change: transform; text-transform: uppercase;
        }
        .nav-top    { clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%); }
        .nav-bottom { clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%); margin-top: -1em; }
        /* Silky diagonal split — the katana cuts cleanly */
        .nav-item:hover .nav-top    { transform: translate(12px, -12px) skewX(20deg); color: #fff; }
        .nav-item:hover .nav-bottom { transform: translate(-12px, 12px) skewX(20deg); color: #fff; }

        /* Katana container */
        .nav-katana {
          position: absolute;
          top: 50%; left: -18px; right: -18px; height: 2px;
          transform: translateY(-50%) scaleX(0) rotate(-9deg);
          transform-origin: left center;
          /* Smooth ease-out — blade slides in then rests */
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none; z-index: 20;
          display: flex; align-items: center;
        }
        .nav-item:hover .nav-katana { transform: translateY(-50%) scaleX(1) rotate(-9deg); }

        /* The blade — polished steel gradient with orange glow */
        .nav-katana-blade {
          flex: 1; height: 100%;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,0.2) 5%,
            #f97316 18%,
            #ffb347 45%,
            #f97316 72%,
            rgba(255,255,255,0.25) 92%,
            transparent 100%);
          box-shadow: 0 0 5px rgba(249,115,22,0.6), 0 0 14px rgba(249,115,22,0.28);
          border-radius: 1px;
        }
        /* Bright light flash that races along the blade */
        .nav-katana-flash {
          position: absolute; top: 50%; left: 0; right: 0; height: 3px;
          transform: translateY(-50%) translateX(-120%);
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%);
          filter: blur(1.5px); pointer-events: none;
          opacity: 0;
        }
        .nav-item:hover .nav-katana-flash {
          opacity: 1;
          animation: katana-flash 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.04s forwards;
        }
        @keyframes katana-flash {
          0%   { transform: translateY(-50%) translateX(-120%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(-50%) translateX(120%); opacity: 0; }
        }

        /* ── CONTACT BTN ── */
        .contact-btn {
          position: relative; overflow: hidden; border: 1.5px solid #f97316; color: #f97316;
          padding: 0; width: 110px; height: 36px; border-radius: 0; font-size: 0.7rem;
          letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; cursor: pointer;
          background: transparent; transition: color 0.28s ease; display: inline-flex;
          align-items: center; justify-content: center;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
        }
        .contact-btn::before {
          content: ''; position: absolute; inset: 0; background: #f97316;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transform: translateX(-105%); transition: transform 0.3s cubic-bezier(0.76,0,0.24,1); z-index: 0;
        }
        .contact-btn:hover::before { transform: translateX(0); }
        .contact-btn:hover { color: #000; }
        .contact-btn-text { position: relative; z-index: 1; display: flex; align-items: center; gap: 6px; line-height: 1; }
        .contact-arrow { color: #f97316; transition: color 0.28s ease, transform 0.2s ease; font-size: 0.85rem; }
        .contact-btn:hover .contact-arrow { color: #000; transform: translateX(3px); }

        /* ── HERO CTAs ── */
        .hero-clients-cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 12px 24px; width: 100%;
          border: 1px solid rgba(255,255,255,0.22); background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          color: rgba(255,255,255,0.7); font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer;
          transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease;
          white-space: nowrap; font-family: inherit; border-radius: 2px; text-decoration: none;
        }
        @media(min-width:640px){ .hero-clients-cta { width: auto; padding: 10px 22px; justify-content: flex-start; } }
        .hero-clients-cta:hover { border-color: rgba(249,115,22,0.6); background: rgba(249,115,22,0.09); color: #f97316; }
        .hero-cta-dot { width: 5px; height: 5px; border-radius: 50%; background: #f97316; display: inline-block; animation: pulse-dot 2s ease-in-out infinite; flex-shrink: 0; }
        .hero-cta-arrow { display: inline-block; transition: transform 0.25s ease; font-size: 0.8rem; }
        .hero-clients-cta:hover .hero-cta-arrow { transform: translateX(4px); }

        .hero-services-cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 12px 24px; width: 100%;
          border: 1.5px solid #f97316; background: rgba(249,115,22,0.10);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          color: #f97316; font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
          white-space: nowrap; font-family: inherit; border-radius: 2px;
          text-decoration: none; position: relative; overflow: hidden;
        }
        @media(min-width:640px){ .hero-services-cta { width: auto; padding: 10px 22px; justify-content: flex-start; } }
        .hero-services-cta::before {
          content: ''; position: absolute; inset: 0;
          background: #f97316; transform: translateX(-105%);
          transition: transform 0.32s cubic-bezier(0.76,0,0.24,1); z-index: 0;
        }
        .hero-services-cta:hover::before { transform: translateX(0); }
        .hero-services-cta:hover { color: #000; }
        .hero-services-cta span { position: relative; z-index: 1; }
        .svc-arrow { display: inline-block; transition: transform 0.25s ease; font-size: 0.8rem; position: relative; z-index: 1; }
        .hero-services-cta:hover .svc-arrow { transform: translateX(3px); }

        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }

        /* ── OUR WORK TITLE SECTION ── */
        .work-marker {
          position: relative; z-index: 2; background: #000;
          border-top: 1px solid #141414; border-bottom: 1px solid #141414;
          padding: clamp(52px,9vw,100px) clamp(20px,5vw,52px);
          overflow: hidden;
        }
        .work-marker-eyebrow {
          font-size: 0.58rem; letter-spacing: 0.34em; text-transform: uppercase;
          color: #f97316; display: flex; align-items: center; gap: 14px; margin-bottom: 22px;
        }
        .work-marker-eyebrow-line {
          display: inline-block; width: 36px; height: 1px; background: #f97316;
          transform: scaleX(0); transform-origin: left;
          animation: rule-grow 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
        }
        @keyframes rule-grow { to { transform: scaleX(1); } }

        .work-marker-title {
          font-size: clamp(3.2rem, 13vw, 12rem); font-weight: 900;
          line-height: 0.86; letter-spacing: -0.05em; text-transform: uppercase;
          display: flex; flex-wrap: wrap; gap: 0 clamp(16px, 2.5vw, 44px);
        }
        .work-marker-word { display: inline-flex; overflow: hidden; }
        .work-marker-letter {
          display: inline-block;
          transform: translateY(110%); opacity: 0;
          animation: letter-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-play-state: paused;
        }
        @keyframes letter-rise { to { transform: translateY(0); opacity: 1; } }
        .work-marker-letter.is-accent { color: transparent; -webkit-text-stroke: 2px #f97316; }

        .work-marker-meta {
          margin-top: clamp(22px, 3.5vw, 36px);
          display: flex; justify-content: space-between; align-items: flex-end;
          flex-wrap: wrap; gap: 16px;
        }
        .work-marker-desc { font-size: 0.8rem; line-height: 1.72; color: #666; max-width: 440px; }
        .work-marker-tag {
          font-size: 0.55rem; letter-spacing: 0.28em; text-transform: uppercase;
          color: #444; display: flex; align-items: center; gap: 8px;
        }
        .work-marker-tag-dot { width: 5px; height: 5px; border-radius: 50%; background: #f97316; animation: pulse-dot 2s ease-in-out infinite; }
        .work-marker-num {
          position: absolute; top: 20px; right: clamp(20px, 5vw, 52px);
          font-size: clamp(4rem, 9vw, 10rem); font-weight: 900;
          color: transparent; -webkit-text-stroke: 1px rgba(249,115,22,0.12);
          letter-spacing: -0.06em; line-height: 1;
          pointer-events: none; user-select: none;
        }

        /* ── FOOTER MARQUEE ── */
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
          font-size: clamp(1.2rem, 3vw, 2.6rem); font-weight: 900;
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

        /* ── BRUTAL LINK ── */
        .brutal-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.62rem; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: #444; text-decoration: none;
          position: relative; padding-bottom: 2px; transition: color 0.22s ease; white-space: nowrap;
        }
        .brutal-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px; background: #f97316;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.28s cubic-bezier(0.76,0,0.24,1);
        }
        .brutal-link:hover { color: #f97316; }
        .brutal-link:hover::after { transform: scaleX(1); }
        .brutal-link-arrow { transition: transform 0.22s ease; }
        .brutal-link:hover .brutal-link-arrow { transform: translateX(4px); }

        /* ── CLIENTS SECTION ── */
        .cs-section { position:relative; background:#000; border-top:1px solid #141414; overflow:hidden; }
        .cs-watermark { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) rotate(-8deg); font-size:clamp(7rem,18vw,16rem); font-weight:900; letter-spacing:-0.06em; color:rgba(255,255,255,0.016); text-transform:uppercase; pointer-events:none; user-select:none; white-space:nowrap; z-index:0; line-height:1; }
        .cs-slash { position:absolute; top:0; bottom:0; left:48%; width:1px; background:linear-gradient(to bottom,transparent,#f97316 25%,#f97316 75%,transparent); transform:rotate(-14deg) scaleY(1.5); opacity:0.05; pointer-events:none; z-index:1; }
        .cs-header { position:relative; z-index:2; display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap; padding:44px 20px 28px; border-bottom:1px solid #111; }
        @media(min-width:768px){ .cs-header{padding:56px 48px 34px;} }
        .cs-eyebrow { font-size:0.58rem; letter-spacing:0.28em; text-transform:uppercase; color:#f97316; display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .cs-eyebrow-line { display:inline-block; width:28px; height:1px; background:#f97316; }
        .cs-title { font-size:clamp(2.2rem,5.5vw,5rem); font-weight:900; line-height:0.88; letter-spacing:-0.04em; color:#fff; text-transform:uppercase; }
        .cs-title-accent { color:#f97316; }
        .cs-header-right { display:flex; flex-direction:column; align-items:flex-end; gap:16px; flex-shrink:0; }
        .cs-count-wrap { text-align:right; }
        .cs-count-num { font-size:clamp(3rem,7vw,6rem); font-weight:900; line-height:0.85; letter-spacing:-0.06em; color:#fff; opacity:0.12; display:block; transition:opacity 0.3s ease; }
        .cs-section:hover .cs-count-num { opacity:0.2; }
        .cs-count-label { font-size:0.85rem; letter-spacing:0.18em; text-transform:uppercase; color:#888; margin-top:4px; display:block; }
        .cs-marquee-wrap { position:relative; z-index:2; overflow:hidden; }
        .cs-marquee-row { display:flex; overflow:hidden; border-bottom:1px solid #0d0d0d; }
        .cs-marquee-row:first-child { border-top:1px solid #0d0d0d; }
        @keyframes cs-fwd { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes cs-rev { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        .cs-track     { display:flex; width:max-content; animation:cs-fwd 32s linear infinite; will-change:transform; }
        .cs-track-rev { display:flex; width:max-content; animation:cs-rev 44s linear infinite; will-change:transform; }
        .cs-marquee-wrap:hover .cs-track, .cs-marquee-wrap:hover .cs-track-rev { animation-play-state:paused; }
        .cs-card { display:flex; align-items:center; gap:18px; padding:18px 28px; border-right:1px solid #0d0d0d; flex-shrink:0; position:relative; cursor:default; transition:background 0.25s ease; min-width:260px; height:80px; overflow:hidden; }
        .cs-card::before { content:''; position:absolute; inset:0; background:#f97316; transform:translateY(101%); transition:transform 0.32s cubic-bezier(0.76,0,0.24,1); z-index:0; }
        .cs-card:hover::before { transform:translateY(0); }
        .cs-logo-wrap { width:100px; height:54px; display:flex; align-items:center; justify-content:center; flex-shrink:0; position:relative; z-index:1; }
        .cs-logo { max-width:100%; max-height:100%; object-fit:contain; filter:brightness(0) invert(1); opacity:0.35; transition:opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease; }
        .cs-card:hover .cs-logo { opacity:1; filter:brightness(0); transform:scale(1.08); }
        .cs-name { font-size:0.7rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#bdbdbd; white-space:nowrap; transition:color 0.25s ease; position:relative; z-index:1; }
        .cs-card:hover .cs-name { color:#000; }
        .cs-sep { font-size:0.45rem; color:#1c1c1c; flex-shrink:0; position:relative; z-index:1; transition:color 0.25s ease; }
        .cs-card:hover .cs-sep { color:rgba(0,0,0,0.3); }
        .cs-card-ghost .cs-logo { opacity:0.1; }
        .cs-card-ghost .cs-name { color:#2a2a2a; }
        .cs-card-ghost:hover .cs-name { color:#000; }
        .cs-card-ghost:hover .cs-logo { opacity:1; filter:brightness(0); }
        .cs-explore-strip { position:relative; z-index:2; display:flex; align-items:center; justify-content:flex-end; padding:20px; border-top:1px solid #111; }
        @media(min-width:768px){ .cs-explore-strip{padding:20px 48px;} }
        .cs-stat-bar { display:flex; flex-wrap:wrap; border-top:1px solid #111; position:relative; z-index:2; }
        .cs-stat-cell { flex:1; min-width:120px; padding:22px 24px; border-right:1px solid #111; display:flex; flex-direction:column; gap:5px; transition:background 0.22s ease; cursor:default; position:relative; overflow:hidden; }
        .cs-stat-cell::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:#f97316; transform:scaleX(0); transform-origin:left; transition:transform 0.3s cubic-bezier(0.76,0,0.24,1); }
        .cs-stat-cell:hover::before { transform:scaleX(1); }
        .cs-stat-cell:last-child { border-right:none; }
        .cs-stat-cell:hover { background:#070707; }
        .cs-stat-val { font-size:clamp(1.6rem,3.5vw,2.4rem); font-weight:900; letter-spacing:-0.04em; color:#fff; line-height:1; }
        .cs-stat-lbl { font-size:0.55rem; letter-spacing:0.22em; text-transform:uppercase; color:#777; transition:color 0.2s ease; }
        .cs-stat-cell:hover .cs-stat-lbl { color:#f97316; }
        @media(max-width:480px){ .cs-card{padding:14px 18px;min-width:180px;height:70px;} .cs-logo-wrap{width:72px;height:40px;} .cs-name{font-size:0.6rem;} }
      `}</style>

      <main className="bg-black text-white min-h-screen">
        {/* Grain */}
        <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.025]"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"128px 128px", mixBlendMode:"overlay" }}
        />

        <SiteNav />

        {/* HERO */}
        <section className="relative w-full overflow-hidden" style={{ minHeight:"100svh" }}>
          <video
            src="https://res.cloudinary.com/dta1dl0pj/video/upload/q_auto/f_auto/v1779299532/old_reel_revamped_du8rtf.mp4"
            autoPlay muted loop playsInline preload="auto"
            style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:0 }}
          />
          <div style={{ position:"absolute", inset:0, zIndex:1, background:"linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.75) 100%)" }} />
          <div style={{ position:"relative", zIndex:3 }} className="px-5 md:px-8 pt-24 pb-16 md:pb-24 flex flex-col justify-end min-h-[100svh]">
            <p className="text-orange-500 uppercase tracking-[0.25em] md:tracking-[0.3em] text-xs md:text-sm mb-5">Creative Strategy Studio</p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] max-w-5xl">
              Culture-First Branding For Brands That Refuse To Look Average.
            </h2>
            <p className="text-gray-300 mt-6 md:mt-8 max-w-2xl text-base md:text-xl leading-relaxed">
              UNFLTR Is A Multidisciplinary Creative Studio Blending Branding, Marketing, Motion, And Strategy Into Culturally Relevant Brand Systems.
            </p>
            <div className="mt-8 md:mt-12">
              <div className="flex flex-wrap items-center gap-3 md:gap-5 mb-5 md:mb-6">
                <div className="flex items-center gap-2">
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#f97316", display:"inline-block", animation:"pulse-dot 2s ease-in-out infinite" }} />
                  <span className="text-xs uppercase tracking-[0.16em] text-white/50">Showreel 2025</span>
                </div>
                <div style={{ height:1, width:28, background:"rgba(255,255,255,0.18)" }} className="hidden sm:block" />
                <span className="text-xs uppercase tracking-[0.16em] text-white/30 hidden sm:inline">Est. 2024</span>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href="/clients" className="hero-clients-cta">
                  <span className="hero-cta-dot" />
                  Our Clients
                  <span className="hero-cta-arrow">→</span>
                </Link>
                <Link href="/services" className="hero-services-cta">
                  <span>Services We Offer</span>
                  <span className="svc-arrow">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* OUR WORK title + portfolio grid */}
        <OurWorkTitle />
        <PortfolioGrid />

        {/* CLIENTS */}
        <ClientsSection />

        {/* FOOTER MARQUEE */}
        <ChatMarquee />
      </main>
    </>
  );
}

/* ─── FOOTER MARQUEE ─── */
function ChatMarquee() {
  return (
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
  );
}

/* ─── CLIENTS SECTION ─── */
function ClientsSection() {
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);
  const statsRef = useRef(null);

  const clients = [
    { name:"MNST",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/MNST_vyaeim.png" },
    { name:"Cava",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/cava_jxvtci.png" },
    { name:"Mekada",         logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/mekada_ng33kr.png" },
    { name:"Astro",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/astro_oyrcy8.png" },
    { name:"Amazonia",       logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/amazonia_xe1tup.png" },
    { name:"142B Lounge",    logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/142b_lounge_v2zyac.png" },
    { name:"Four Seasons",   logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/4_seasons_cdfk2v.png" },
    { name:"Blunt",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/blunt_bjssqi.png" },
    { name:"Lalit",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/lalit_n2bxlz.png" },
    { name:"Aquila",         logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/aquila_h9muin.png" },
    { name:"Taj Hotels",     logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747618/Taj_ht3b3n.png" },
    { name:"BookMyShow",     logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747614/Book_My_Show_Logo-02_White_iwdyfp.png" },
    { name:"Ishq FM Radio",  logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747617/ishq_fm_radio_pawtjy.png" },
    { name:"Ignite Ent",     logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747617/IGNITE_ENT_new_fhvse1.png" },
    { name:"Bombay Monks",   logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747614/bombay_monks_wyhy8q.png" },
    { name:"Tryst",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747618/tryst_unuryj.png" },
    { name:"Nirvana",        logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747615/nirvana_xo2ed2.png" },
    { name:"Race Lounge Bar",logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747616/Race_-_Lounge_Bar_jjnhzi.png" },
  ];
  const row1 = [...clients, ...clients];
  const row2 = [...clients, ...clients].reverse();

  useEffect(() => {
    [[headerRef,0],[marqueeRef,100],[statsRef,200]].forEach(([ref,delay]) => {
      const el = ref.current; if (!el) return;
      el.style.opacity = "0"; el.style.transform = "translateY(32px)";
      el.style.transition = `opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`;
      const obs = new IntersectionObserver(([e]) => {
        el.style.opacity = e.isIntersecting ? "1" : "0";
        el.style.transform = e.isIntersecting ? "translateY(0)" : "translateY(32px)";
      }, { threshold: 0.08 });
      obs.observe(el);
    });
  }, []);

  return (
    <section className="cs-section" id="clients-section">
      <div className="cs-watermark" aria-hidden="true">TRUSTED</div>
      <div className="cs-slash" aria-hidden="true" />

      <div className="cs-header" ref={headerRef}>
        <div>
          <p className="cs-eyebrow"><span className="cs-eyebrow-line" />Trusted By</p>
          <h2 className="cs-title">Brands That<br /><span className="cs-title-accent">Chose Bold.</span></h2>
        </div>
        <div className="cs-header-right">
          <div className="cs-count-wrap">
            <span className="cs-count-num">37</span>
            <span className="cs-count-label">Clients & Counting</span>
          </div>
        </div>
      </div>

      <div className="cs-marquee-wrap" ref={marqueeRef}>
        <div className="cs-marquee-row">
          <div className="cs-track">
            {row1.map((c,i) => (
              <div key={i} className="cs-card">
                <div className="cs-logo-wrap"><img src={c.logo} alt={c.name} className="cs-logo" loading="lazy" /></div>
                <span className="cs-name">{c.name}</span>
                <span className="cs-sep">✦</span>
              </div>
            ))}
          </div>
        </div>
        <div className="cs-marquee-row">
          <div className="cs-track-rev">
            {row2.map((c,i) => (
              <div key={i} className="cs-card cs-card-ghost">
                <div className="cs-logo-wrap"><img src={c.logo} alt={c.name} className="cs-logo" loading="lazy" /></div>
                <span className="cs-name">{c.name}</span>
                <span className="cs-sep" style={{ color:"#f97316", opacity:0.2 }}>—</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cs-explore-strip">
        <Link href="/clients" className="brutal-link">
          View More Brands
          <span className="brutal-link-arrow">→</span>
        </Link>
      </div>

      <div className="cs-stat-bar" ref={statsRef}>
        {[
          { val:"37+", lbl:"Clients Served" },
          { val:"3+",  lbl:"Years Active" },
          { val:"110+",lbl:"Projects Delivered" },
          { val:"∞",   lbl:"Culturally Driven" },
        ].map((s) => (
          <div key={s.lbl} className="cs-stat-cell">
            <span className="cs-stat-val">{s.val}</span>
            <span className="cs-stat-lbl">{s.lbl}</span>
          </div>
        ))}
      </div>
    </section>
  );
}