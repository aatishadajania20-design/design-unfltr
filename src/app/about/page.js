"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const TEAM = [
  {
    id: "01",
    name: "Creative Direction",
    role: "The Vision",
    desc: "Every brand system we build starts with a singular, unfiltered truth. Our creative directors push past the brief to find the cultural angle no one else is seeing.",
  },
  {
    id: "02",
    name: "Strategy",
    role: "The Spine",
    desc: "We don't decorate problems — we solve them. Deep market insight, positioning frameworks, and brand architecture that give every visual decision a reason to exist.",
  },
  {
    id: "03",
    name: "Design & Motion",
    role: "The Execution",
    desc: "From raw identity systems to kinetic motion design and full CGI production. Every pixel and frame is built to provoke a reaction.",
  },
];

const STATS = [
  { val: "37+",  lbl: "Clients Served" },
  { val: "110+", lbl: "Projects Delivered" },
  { val: "3+",   lbl: "Years Active" },
  { val: "∞",    lbl: "Culturally Driven" },
];

const VALUES = [
  { label: "Unfiltered", desc: "No watered-down work. We say what we mean and build what we believe in." },
  { label: "Culture-First", desc: "Every decision is rooted in cultural relevance. Trends fade; culture compounds." },
  { label: "Anti-Average", desc: "Average is a choice. We actively refuse it on every single project." },
  { label: "Systems Thinking", desc: "We don't make logos. We build brand operating systems that scale." },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const cellRefs = useRef([]);
  const [visibleStats, setVisibleStats] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    // Hero entrance
    if (heroRef.current) {
      heroRef.current.style.opacity = "0";
      heroRef.current.style.transform = "translateY(22px)";
      heroRef.current.style.transition = "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)";
      setTimeout(() => {
        if (heroRef.current) { heroRef.current.style.opacity = "1"; heroRef.current.style.transform = "translateY(0)"; }
      }, 80);
    }

    // Staggered reveals
    const obs = [];
    cellRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0"; el.style.transform = "translateY(24px)";
      el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`;
      const o = new IntersectionObserver(([e]) => {
        el.style.opacity = e.isIntersecting ? "1" : "0";
        el.style.transform = e.isIntersecting ? "translateY(0)" : "translateY(24px)";
      }, { threshold: 0.08 });
      o.observe(el); obs.push(o);
    });

    // Stats
    if (statsRef.current) {
      const o = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setVisibleStats(true);
      }, { threshold: 0.2 });
      o.observe(statsRef.current); obs.push(o);
    }

    return () => obs.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        *, *::before, *::after {
          font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif;
          box-sizing: border-box;
        }

        /* ── NAV (shared) ── */
        .logo-svg { transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1); transform-origin: center; }
        .logo-path { fill: #fff; transition: fill 0.35s ease; }
        .brand-wrap:hover .logo-svg { transform: rotate(180deg) scale(1.15); }
        .brand-wrap:hover .logo-path { fill: #f97316; }
        .brand-wordmark { font-size: 1.05rem; line-height:1; font-weight:700; letter-spacing:-0.01em; display:inline-flex; align-items:center; margin:0; padding:0; }
        @media(min-width:768px){ .brand-wordmark { font-size:1.15rem; } }
        .brand-letter { display:inline-block; color:#fff; transition:color 0.25s ease,transform 0.38s cubic-bezier(0.34,1.56,0.64,1); transition-delay:0ms; }
        .brand-letter-studio { color:#f97316; }
        .brand-wrap:hover .brand-letter { color:#fff; transform:translateY(-3px); transition-delay:calc(var(--i)*42ms); }

        .nav-item { position:relative; cursor:pointer; padding:10px 20px; user-select:none; overflow:visible; text-decoration:none; background:none; border:none; font-family:inherit; }
        .nav-top,.nav-bottom { display:block; font-size:0.78rem; font-weight:500; letter-spacing:0.08em; color:#9ca3af; line-height:1; white-space:nowrap; transition:transform 0.58s cubic-bezier(0.22,1,0.36,1),color 0.3s ease; will-change:transform; text-transform:uppercase; }
        .nav-top { clip-path:polygon(0% 0%,100% 0%,100% 50%,0% 50%); }
        .nav-bottom { clip-path:polygon(0% 50%,100% 50%,100% 100%,0% 100%); margin-top:-1em; }
        .nav-item:hover .nav-top { transform:translate(12px,-12px) skewX(20deg); color:#fff; }
        .nav-item:hover .nav-bottom { transform:translate(-12px,12px) skewX(20deg); color:#fff; }
        .nav-katana { position:absolute; top:50%; left:-18px; right:-18px; height:2px; transform:translateY(-50%) scaleX(0) rotate(-9deg); transform-origin:left center; transition:transform 0.55s cubic-bezier(0.22,1,0.36,1); pointer-events:none; z-index:20; display:flex; align-items:center; }
        .nav-item:hover .nav-katana { transform:translateY(-50%) scaleX(1) rotate(-9deg); }
        .nav-katana-blade { flex:1; height:100%; background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.2) 5%,#f97316 18%,#ffb347 45%,#f97316 72%,rgba(255,255,255,0.25) 92%,transparent 100%); box-shadow:0 0 5px rgba(249,115,22,0.6),0 0 14px rgba(249,115,22,0.28); border-radius:1px; }
        .nav-katana-flash { position:absolute; top:50%; left:0; right:0; height:3px; transform:translateY(-50%) translateX(-120%); background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.95) 50%,transparent 100%); filter:blur(1.5px); pointer-events:none; opacity:0; }
        .nav-item:hover .nav-katana-flash { opacity:1; animation:katana-flash 0.55s cubic-bezier(0.22,1,0.36,1) 0.04s forwards; }
        @keyframes katana-flash { 0%{transform:translateY(-50%) translateX(-120%);opacity:0} 20%{opacity:1} 80%{opacity:0.8} 100%{transform:translateY(-50%) translateX(120%);opacity:0} }

        .contact-btn { position:relative; overflow:hidden; border:1.5px solid #f97316; color:#f97316; padding:0; width:110px; height:36px; border-radius:0; font-size:0.7rem; letter-spacing:0.18em; text-transform:uppercase; font-weight:700; cursor:pointer; background:transparent; transition:color 0.28s ease; display:inline-flex; align-items:center; justify-content:center; clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%); }
        .contact-btn::before { content:''; position:absolute; inset:0; background:#f97316; clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%); transform:translateX(-105%); transition:transform 0.3s cubic-bezier(0.76,0,0.24,1); z-index:0; }
        .contact-btn:hover::before { transform:translateX(0); }
        .contact-btn:hover { color:#000; }
        .contact-btn-text { position:relative; z-index:1; display:flex; align-items:center; gap:6px; line-height:1; }
        .contact-arrow { color:#f97316; transition:color 0.28s ease,transform 0.2s ease; font-size:0.85rem; }
        .contact-btn:hover .contact-arrow { color:#000; transform:translateX(3px); }

        /* ── GRID BG ── */
        @keyframes gridPan { 0%{background-position:0 0} 100%{background-position:40px 40px} }
        .ab-grid-bg { position:fixed; inset:0; background-image:linear-gradient(rgba(249,115,22,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.022) 1px,transparent 1px); background-size:40px 40px; animation:gridPan 14s linear infinite; pointer-events:none; z-index:0; }

        /* ── HERO ── */
        .ab-hero { position:relative; z-index:2; padding:64px 20px 52px; border-bottom:1px solid #141414; overflow:hidden; }
        @media(min-width:768px){ .ab-hero { padding:80px 52px 60px; } }
        .ab-eyebrow { font-size:0.56rem; letter-spacing:0.34em; text-transform:uppercase; color:#f97316; display:flex; align-items:center; gap:12px; margin-bottom:22px; }
        .ab-eyebrow-line { display:inline-block; width:24px; height:1px; background:#f97316; }
        .ab-title { font-size:clamp(2.8rem,10vw,9rem); font-weight:900; line-height:0.84; letter-spacing:-0.04em; text-transform:uppercase; }
        .ab-title-solid { color:#fff; }
        .ab-title-outline { display:block; color:transparent; -webkit-text-stroke:2px #f97316; }
        .ab-subtitle { font-size:clamp(0.9rem,1.8vw,1.2rem); line-height:1.72; color:#888; max-width:560px; margin-top:28px; }
        .ab-subtitle em { color:#f97316; font-style:normal; }
        .ab-watermark { position:absolute; bottom:-12%; right:-2%; font-size:clamp(5rem,15vw,13rem); font-weight:900; letter-spacing:-0.06em; color:rgba(255,255,255,0.012); text-transform:uppercase; pointer-events:none; user-select:none; line-height:1; transform:rotate(-5deg); }

        /* ── STATS BAR ── */
        .ab-stat-bar { position:relative; z-index:2; display:flex; flex-wrap:wrap; border-bottom:1px solid #111; }
        .ab-stat-cell { flex:1; min-width:130px; padding:24px 28px; border-right:1px solid #111; position:relative; overflow:hidden; transition:background 0.25s ease; cursor:default; }
        .ab-stat-cell:last-child { border-right:none; }
        .ab-stat-cell:hover { background:#060606; }
        .ab-stat-cell::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:#f97316; transform:scaleX(0); transform-origin:left; transition:transform 0.38s cubic-bezier(0.16,1,0.3,1); }
        .ab-stat-cell:hover::before { transform:scaleX(1); }
        .ab-stat-val { font-size:clamp(2rem,4vw,3.2rem); font-weight:900; letter-spacing:-0.05em; color:#fff; line-height:1; display:block; }
        .ab-stat-lbl { font-size:0.52rem; letter-spacing:0.24em; text-transform:uppercase; color:#777; margin-top:6px; display:block; transition:color 0.25s ease; }
        .ab-stat-cell:hover .ab-stat-lbl { color:#f97316; }
        @keyframes count-in { from{opacity:0;transform:translateY(14px) scale(0.9)} to{opacity:1;transform:none} }
        .ab-stat-val.animate { animation:count-in 0.7s cubic-bezier(0.34,1.56,0.64,1) both; }

        /* ── STUDIO PILLARS ── */
        .ab-pillars-header { position:relative; z-index:2; display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid #0f0f0f; flex-wrap:wrap; gap:8px; }
        @media(min-width:768px){ .ab-pillars-header { padding:16px 52px; } }
        .ab-pillars-label { font-size:0.5rem; letter-spacing:0.3em; text-transform:uppercase; color:#333; display:flex; align-items:center; gap:8px; }
        .ab-pillar-row { position:relative; z-index:2; display:grid; grid-template-columns:56px 1fr; border-bottom:1px solid #0f0f0f; overflow:hidden; background:#000; transition:background 0.28s ease; }
        @media(min-width:768px){ .ab-pillar-row { grid-template-columns:72px 1fr; } }
        .ab-pillar-row:hover { background:#040404; }
        .ab-pillar-idx { display:flex; align-items:flex-start; justify-content:center; padding:28px 0; border-right:1px solid #0f0f0f; font-size:0.44rem; font-weight:800; letter-spacing:0.18em; color:rgba(255,255,255,0.1); position:relative; overflow:hidden; transition:color 0.3s ease; }
        .ab-pillar-row:hover .ab-pillar-idx { color:rgba(249,115,22,0.55); }
        .ab-pillar-idx::before { content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(249,115,22,0.05) 0%,transparent 100%); transform:translateY(100%); transition:transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .ab-pillar-row:hover .ab-pillar-idx::before { transform:translateY(0); }
        .ab-pillar-main { padding:28px 28px; display:flex; flex-direction:column; gap:10px; }
        @media(min-width:768px){ .ab-pillar-main { padding:32px 40px; } }
        .ab-pillar-name { font-size:clamp(1.8rem,4.5vw,4rem); font-weight:900; line-height:0.9; letter-spacing:-0.03em; text-transform:uppercase; color:#fff; position:relative; display:inline-block; }
        .ab-pillar-name::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:2px; background:#f97316; transform:scaleX(0); transform-origin:left; transition:transform 0.45s cubic-bezier(0.16,1,0.3,1); }
        .ab-pillar-row:hover .ab-pillar-name::after { transform:scaleX(1); }
        .ab-pillar-role { font-size:0.62rem; font-weight:600; letter-spacing:0.2em; text-transform:uppercase; color:#555; transition:color 0.3s ease; }
        .ab-pillar-row:hover .ab-pillar-role { color:#f97316; }
        .ab-pillar-desc { font-size:0.82rem; line-height:1.7; color:#666; max-width:520px; transition:color 0.3s ease; }
        .ab-pillar-row:hover .ab-pillar-desc { color:#999; }
        .ab-pillar-rule { position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,#f97316 0%,rgba(249,115,22,0.2) 60%,transparent 100%); transform:scaleX(0); transform-origin:left; transition:transform 0.5s cubic-bezier(0.16,1,0.3,1); z-index:3; }
        .ab-pillar-row:hover .ab-pillar-rule { transform:scaleX(1); }

        /* ── VALUES GRID ── */
        .ab-values-section { position:relative; z-index:2; border-top:1px solid #141414; }
        .ab-values-header { padding:40px 20px 24px; border-bottom:1px solid #111; }
        @media(min-width:768px){ .ab-values-header { padding:48px 52px 28px; } }
        .ab-values-title { font-size:clamp(1.8rem,5vw,4rem); font-weight:900; line-height:0.88; letter-spacing:-0.04em; text-transform:uppercase; color:#fff; }
        .ab-values-title span { color:#f97316; }
        .ab-values-grid { display:grid; grid-template-columns:1fr 1fr; border-left:1px solid #111; }
        @media(min-width:768px){ .ab-values-grid { grid-template-columns:repeat(4,1fr); } }
        .ab-value-cell { border-right:1px solid #111; border-bottom:1px solid #111; padding:28px 24px; position:relative; overflow:hidden; transition:background 0.25s ease; cursor:default; }
        @media(min-width:768px){ .ab-value-cell { padding:36px 32px; } }
        .ab-value-cell:hover { background:#060606; }
        .ab-value-cell::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:#f97316; transform:scaleX(0); transform-origin:left; transition:transform 0.38s cubic-bezier(0.16,1,0.3,1); }
        .ab-value-cell:hover::before { transform:scaleX(1); }
        .ab-value-num { font-size:0.44rem; letter-spacing:0.2em; color:rgba(255,255,255,0.1); font-weight:700; margin-bottom:16px; transition:color 0.25s ease; }
        .ab-value-cell:hover .ab-value-num { color:rgba(249,115,22,0.5); }
        .ab-value-name { font-size:clamp(1rem,2.2vw,1.6rem); font-weight:900; letter-spacing:-0.02em; text-transform:uppercase; color:#fff; margin-bottom:10px; }
        .ab-value-desc { font-size:0.72rem; line-height:1.68; color:#555; transition:color 0.25s ease; }
        .ab-value-cell:hover .ab-value-desc { color:#888; }

        /* ── CTA STRIP ── */
        .ab-cta-strip { position:relative; z-index:2; background:#000; border-top:1px solid #141414; padding:clamp(40px,7vw,72px) clamp(20px,5vw,52px); display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:24px; overflow:hidden; }
        .ab-cta-text { font-size:clamp(1.8rem,5vw,4.5rem); font-weight:900; line-height:0.88; letter-spacing:-0.04em; text-transform:uppercase; color:#fff; }
        .ab-cta-text span { color:#f97316; display:block; }
        .ab-cta-btn { position:relative; overflow:hidden; display:inline-flex; align-items:center; gap:12px; padding:18px 40px; border:1.5px solid #f97316; color:#f97316; font-size:0.72rem; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; text-decoration:none; clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%); transition:color 0.3s ease; }
        .ab-cta-btn::before { content:''; position:absolute; inset:0; background:#f97316; transform:translateX(-106%); transition:transform 0.35s cubic-bezier(0.76,0,0.24,1); z-index:0; }
        .ab-cta-btn:hover::before { transform:translateX(0); }
        .ab-cta-btn:hover { color:#000; }
        .ab-cta-btn span { position:relative; z-index:1; }
        .ab-cta-arrow { display:inline-block; position:relative; z-index:1; transition:transform 0.25s ease; }
        .ab-cta-btn:hover .ab-cta-arrow { transform:translateX(5px); }
        .ab-cta-watermark { position:absolute; bottom:-15%; right:0; font-size:clamp(4rem,12vw,11rem); font-weight:900; color:rgba(255,255,255,0.012); letter-spacing:-0.06em; text-transform:uppercase; transform:rotate(-5deg); pointer-events:none; user-select:none; }

        /* ── FOOTER MARQUEE ── */
        @keyframes marquee-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ab-marquee { position:relative; overflow:hidden; cursor:pointer; background:#000; border-top:1px solid #141414; padding:10px 0; transition:background 0.4s ease; }
        .ab-marquee:hover { background:#f97316; }
        .ab-marquee-track { display:flex; width:max-content; animation:marquee-scroll 22s linear infinite; }
        .ab-marquee:hover .ab-marquee-track { animation:marquee-scroll 10s linear infinite; }
        .ab-marquee-word { font-size:clamp(1.2rem,3vw,2.6rem); font-weight:900; text-transform:uppercase; letter-spacing:-0.02em; white-space:nowrap; padding-right:1.2rem; color:#fff; transition:color 0.4s ease; line-height:1; }
        .ab-marquee:hover .ab-marquee-word { color:#000; }
        .ab-marquee-dot { color:#f97316; transition:color 0.4s ease; }
        .ab-marquee:hover .ab-marquee-dot { color:#000; }
        .ab-marquee-hint { position:absolute; right:16px; top:50%; transform:translateY(-50%); display:flex; align-items:center; gap:5px; font-size:0.52rem; letter-spacing:0.15em; text-transform:uppercase; color:#f97316; transition:color 0.4s ease,transform 0.3s ease; z-index:2; pointer-events:none; }
        .ab-marquee:hover .ab-marquee-hint { color:#000; transform:translateY(-50%) translateX(4px); }

        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
      `}</style>

      <main className="bg-black text-white min-h-screen" style={{ position:"relative" }}>
        <div className="ab-grid-bg" aria-hidden="true" />

        {/* Grain */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex:998, opacity:0.022, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"128px 128px", mixBlendMode:"overlay" }} />

        {/* ── NAV ── */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 backdrop-blur-md bg-black/50 border-b border-zinc-900">
          <Link href="/">
            <div className="brand-wrap flex items-center gap-2 cursor-pointer select-none">
              <svg className="logo-svg" width="26" height="26" viewBox="0 0 88.82 89.67" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path className="logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
                  <path className="logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
                </g>
              </svg>
              <h1 className="brand-wordmark">
                {"UNFLTR".split("").map((char,i) => <span key={`u${i}`} className="brand-letter" style={{ "--i":i }}>{char}</span>)}
                <span style={{ display:"inline-block" }}>&nbsp;</span>
                {"STUDIO".split("").map((char,i) => <span key={`s${i}`} className="brand-letter brand-letter-studio" style={{ "--i":i+7 }}>{char}</span>)}
              </h1>
            </div>
          </Link>

          <div className="hidden md:flex items-center">
            {[
              { href:"/services", label:"Services" },
              { href:"/",        label:"Work" },
              { href:"/clients", label:"Clients" },
              { href:"/about",   label:"About" },
            ].map(({ href, label }) => (
              <Link key={label} href={href} className="nav-item">
                <span className="nav-top" aria-hidden="true">{label}</span>
                <span className="nav-bottom">{label}</span>
                <span className="nav-katana" aria-hidden="true">
                  <span className="nav-katana-blade" />
                  <span className="nav-katana-flash" />
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ==" target="_blank" rel="noopener noreferrer"
              className="text-white hover:text-orange-500 transition-colors duration-200" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="6" ry="6" stroke="currentColor" strokeWidth="1.8" fill="none"/><circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none"/><circle cx="17.8" cy="6.2" r="1.1" fill="currentColor"/></svg>
            </a>
            <Link href="/contact">
              <button className="contact-btn">
                <span className="contact-btn-text"><span className="contact-arrow">→</span>Contact</span>
              </button>
            </Link>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div className="ab-hero" ref={heroRef}>
          <div className="ab-watermark" aria-hidden="true">ABOUT</div>
          <p className="ab-eyebrow"><span className="ab-eyebrow-line" />Who We Are</p>
          <h1 className="ab-title">
            <span className="ab-title-solid">Built On</span>
            <span className="ab-title-outline">Conviction.</span>
          </h1>
          <p className="ab-subtitle">
            UNFLTR Studio is a <em>multidisciplinary creative studio</em> based in India — blending branding, strategy, content, film, and web into culturally sharp brand systems. We exist for brands that <em>refuse to look average.</em>
          </p>
        </div>

        {/* ── STATS ── */}
        <div className="ab-stat-bar" ref={statsRef}>
          {STATS.map((s, i) => (
            <div key={s.lbl} className="ab-stat-cell">
              <span className={`ab-stat-val${visibleStats ? " animate" : ""}`}
                style={{ animationDelay: visibleStats ? `${i * 90}ms` : "0ms" }}>
                {s.val}
              </span>
              <span className="ab-stat-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* ── PILLARS ── */}
        <div className="ab-pillars-header">
          <span className="ab-pillars-label">
            <span style={{ width:14, height:1, background:"#333", display:"inline-block" }} />
            Studio Pillars
          </span>
          <span style={{ fontSize:"0.5rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#f97316" }}>
            {TEAM.length} Disciplines
          </span>
        </div>

        {TEAM.map((t, i) => (
          <div key={t.id} className="ab-pillar-row" ref={el => cellRefs.current[i] = el}>
            <div className="ab-pillar-idx">
              <span style={{ writingMode:"vertical-rl", transform:"rotate(180deg)", fontSize:"0.42rem", letterSpacing:"0.18em" }}>{t.id}</span>
            </div>
            <div className="ab-pillar-main">
              <div style={{ display:"flex", alignItems:"baseline", gap:14, flexWrap:"wrap" }}>
                <span className="ab-pillar-name">{t.name}</span>
                <span className="ab-pillar-role">{t.role}</span>
              </div>
              <p className="ab-pillar-desc">{t.desc}</p>
            </div>
            <div className="ab-pillar-rule" aria-hidden="true" />
          </div>
        ))}

        {/* ── VALUES ── */}
        <div className="ab-values-section">
          <div className="ab-values-header">
            <h2 className="ab-values-title">
              How We <span>Think.</span>
            </h2>
          </div>
          <div className="ab-values-grid">
            {VALUES.map((v, i) => (
              <div key={v.label} className="ab-value-cell" ref={el => cellRefs.current[TEAM.length + i] = el}>
                <div className="ab-value-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="ab-value-name">{v.label}</div>
                <p className="ab-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA STRIP ── */}
        <div className="ab-cta-strip" ref={el => cellRefs.current[TEAM.length + VALUES.length] = el}>
          <div className="ab-cta-watermark" aria-hidden="true">BUILD</div>
          <div className="ab-cta-text">
            Ready To Build
            <span>Something Bold?</span>
          </div>
          <Link href="/contact" className="ab-cta-btn">
            <span>Start A Project</span>
            <span className="ab-cta-arrow">→</span>
          </Link>
        </div>

        {/* ── FOOTER MARQUEE ── */}
        <Link href="/contact">
          <section className="ab-marquee">
            <div style={{ overflow:"hidden" }}>
              <div className="ab-marquee-track">
                {Array(16).fill(null).map((_,i) => (
                  <span key={i} className="ab-marquee-word">
                    Let&apos;s Have A Chat <span className="ab-marquee-dot">—</span>&nbsp;
                  </span>
                ))}
              </div>
            </div>
            <div className="ab-marquee-hint"><span className="hidden sm:inline">Get In Touch</span><span>→</span></div>
          </section>
        </Link>

      </main>
    </>
  );
}