"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   SERVICE DATA
───────────────────────────────────────────── */
const SERVICES = [
  {
    id: "01",
    name: "Branding",
    tagline: "Raw Identity. Zero Compromise.",
    tags: ["Strategy", "Design", "Consulting"],
    desc: "We excavate the core truth of your brand and arm it with an unfiltered visual language. Deep-dive Strategy, identity Design, and sharp Consulting that cuts through every category.",
    color: "#f97316",
  },
  {
    id: "02",
    name: "Content",
    tagline: "Fuel For Modern Attention.",
    tags: ["Marketing", "Advertising", "Campaigns"],
    desc: "Multi-channel Content ecosystems bridging raw creativity and high-conversion Marketing. High-impact Advertising and culturally native Campaigns engineered to dominate every feed.",
    color: "#ff6a00",
  },
  {
    id: "03",
    name: "Films",
    tagline: "Cinematic Precision. Pure Reaction.",
    tags: ["Production", "Storytelling", "Direction", "Editing"],
    desc: "Full-lifecycle Production house. Creative Direction on set, meticulous Editing in post. Premium visual Storytelling built to provoke, move, and convert.",
    color: "#ea580c",
  },
  {
    id: "04",
    name: "CGI",
    tagline: "No Physical Limits. Pure Imagination.",
    tags: ["Motion", "Visuals"],
    desc: "Photorealistic and hyper-stylized 3D rendering merged with cutting-edge Motion design. Surreal worlds, product physics, and abstract Visuals that add insane production value.",
    color: "#c2410c",
  },
  {
    id: "05",
    name: "Web",
    tagline: "Digital Flagships. Zero Templates.",
    tags: ["Websites"],
    desc: "Raw, high-performance, unapologetic Websites built from scratch. Brutalist grids, kinetic typography, seamless transitions, and maximum engagement — no cookie-cutter DNA.",
    color: "#f97316",
  },
];

/* ─────────────────────────────────────────────
   ANIMATED GRAPHICS PER SERVICE
───────────────────────────────────────────── */
function BrandingGraphic({ active }) {
  const r = useRef(null);
  useEffect(() => {
    if (!r.current) return;
    let frame, angle = 0;
    const tick = () => {
      if (!active) return;
      angle += 0.4;
      r.current.style.transform = `rotate(${angle}deg)`;
      frame = requestAnimationFrame(tick);
    };
    if (active) frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" stroke="rgba(249,115,22,0.2)" strokeWidth="1" />
      <circle cx="50" cy="50" r="32" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="4 4" />
      <g ref={r} style={{ transformOrigin: "50px 50px" }}>
        <polygon points="50,8 92,32 92,68 50,92 8,68 8,32" stroke="#f97316" strokeWidth="1" fill="none" opacity={active ? 1 : 0.3} />
        <line x1="50" y1="8" x2="50" y2="92" stroke="rgba(249,115,22,0.4)" strokeWidth="0.5" />
        <line x1="8" y1="32" x2="92" y2="68" stroke="rgba(249,115,22,0.4)" strokeWidth="0.5" />
        <line x1="8" y1="68" x2="92" y2="32" stroke="rgba(249,115,22,0.4)" strokeWidth="0.5" />
      </g>
      <circle cx="50" cy="50" r="3" fill={active ? "#f97316" : "rgba(249,115,22,0.3)"} />
    </svg>
  );
}

function ContentGraphic({ active }) {
  const [bars, setBars] = useState([0.3, 0.6, 0.45, 0.8, 0.55, 0.7, 0.4]);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setBars(prev => prev.map(() => 0.2 + Math.random() * 0.78));
    }, 280);
    return () => clearInterval(id);
  }, [active]);
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 14 + 2}
          y={80 - h * 76}
          width="10"
          height={h * 76}
          fill="none"
          stroke={active ? "#f97316" : "rgba(249,115,22,0.3)"}
          strokeWidth="1"
          style={{ transition: "y 0.22s ease, height 0.22s ease" }}
        />
      ))}
      <line x1="0" y1="79" x2="100" y2="79" stroke="rgba(249,115,22,0.25)" strokeWidth="0.5" />
    </svg>
  );
}

function FilmsGraphic({ active }) {
  const scanRef = useRef(null);
  useEffect(() => {
    if (!scanRef.current) return;
    let y = 0, dir = 1, frame;
    const tick = () => {
      if (!active) return;
      y += dir * 1.2;
      if (y >= 96 || y <= 0) dir *= -1;
      scanRef.current.setAttribute("y1", y);
      scanRef.current.setAttribute("y2", y);
      frame = requestAnimationFrame(tick);
    };
    if (active) frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="92" height="92" stroke="rgba(249,115,22,0.2)" strokeWidth="1" />
      <rect x="16" y="16" width="68" height="68" stroke="rgba(249,115,22,0.12)" strokeWidth="1" strokeDasharray="3 3" />
      {[0,1,2,3,4].map(i => (
        <line key={i} x1={20 + i*16} y1="16" x2={20 + i*16} y2="84" stroke="rgba(249,115,22,0.07)" strokeWidth="0.5" />
      ))}
      <line ref={scanRef} x1="4" y1="50" x2="96" y2="50"
        stroke={active ? "#f97316" : "rgba(249,115,22,0.15)"} strokeWidth="1.5"
        style={{ filter: active ? "drop-shadow(0 0 3px #f97316)" : "none" }}
      />
      <circle cx="50" cy="50" r="6" stroke={active ? "#f97316" : "rgba(249,115,22,0.3)"} strokeWidth="1" fill="none" />
      <circle cx="50" cy="50" r="2" fill={active ? "#f97316" : "rgba(249,115,22,0.3)"} />
    </svg>
  );
}

function CGIGraphic({ active }) {
  const gRef = useRef(null);
  useEffect(() => {
    if (!gRef.current) return;
    let t = 0, frame;
    const tick = () => {
      if (!active) return;
      t += 0.012;
      const rx = Math.sin(t) * 360;
      const ry = Math.cos(t * 0.7) * 360;
      gRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      frame = requestAnimationFrame(tick);
    };
    if (active) frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);
  return (
    <div style={{ width:100, height:100, perspective:200, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div ref={gRef} style={{ width:60, height:60, transformStyle:"preserve-3d", transition: active ? "none" : "transform 0.5s ease" }}>
        {[0,1,2].map(i => (
          <svg key={i} width="60" height="60" viewBox="0 0 60 60" fill="none"
            style={{ position:"absolute", inset:0, transform:`rotateY(${i*60}deg) translateZ(30px)` }}>
            <rect x="4" y="4" width="52" height="52" stroke={active ? "#f97316" : "rgba(249,115,22,0.3)"}
              strokeWidth="1" fill="none" opacity={0.4 + i*0.2} />
            <line x1="4" y1="4" x2="56" y2="56" stroke="rgba(249,115,22,0.3)" strokeWidth="0.5" />
            <line x1="56" y1="4" x2="4" y2="56" stroke="rgba(249,115,22,0.3)" strokeWidth="0.5" />
          </svg>
        ))}
      </div>
    </div>
  );
}

function WebGraphic({ active }) {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      setCursor({ x: 10 + Math.random() * 80, y: 10 + Math.random() * 80 });
      setCount(c => c + Math.floor(Math.random() * 7 + 1));
    }, 320);
    return () => clearInterval(id);
  }, [active]);
  return (
    <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Browser chrome */}
      <rect x="2" y="2" width="106" height="86" stroke="rgba(249,115,22,0.25)" strokeWidth="1" />
      <line x1="2" y1="16" x2="108" y2="16" stroke="rgba(249,115,22,0.2)" strokeWidth="1" />
      <circle cx="12" cy="9" r="2" fill="rgba(249,115,22,0.3)" />
      <circle cx="22" cy="9" r="2" fill="rgba(249,115,22,0.15)" />
      <circle cx="32" cy="9" r="2" fill="rgba(249,115,22,0.1)" />
      {/* Grid lines */}
      {[28,44,60,76].map(y => <line key={y} x1="8" y1={y} x2="102" y2={y} stroke="rgba(249,115,22,0.06)" strokeWidth="0.5" />)}
      {[8,8+24,8+48,8+72,8+94].map(x => <line key={x} x1={x} y1="20" x2={x} y2="84" stroke="rgba(249,115,22,0.06)" strokeWidth="0.5" />)}
      {/* Cursor */}
      <circle cx={cursor.x} cy={cursor.y + 18} r="3"
        fill="none" stroke={active ? "#f97316" : "rgba(249,115,22,0.2)"} strokeWidth="1.5"
        style={{ transition: "cx 0.3s ease, cy 0.3s ease", filter: active ? "drop-shadow(0 0 4px #f97316)" : "none" }}
      />
      {/* Counter */}
      <text x="86" y="85" fontSize="7" fill={active ? "#f97316" : "rgba(249,115,22,0.3)"}
        fontFamily="monospace" letterSpacing="0.5">{String(count).padStart(4,"0")}</text>
    </svg>
  );
}

const GRAPHICS = [BrandingGraphic, ContentGraphic, FilmsGraphic, CGIGraphic, WebGraphic];

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ServicesPage() {
  const [activeService, setActiveService] = useState(null);
  const [expandedService, setExpandedService] = useState(null);
  const heroRef = useRef(null);
  const rowRefs = useRef([]);
  const statsRef = useRef(null);

  // Spring reveals
  useEffect(() => {
    const obs = [];

    // Hero
    if (heroRef.current) {
      const el = heroRef.current;
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)";
      setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 80);
    }

    // Stats bar
    if (statsRef.current) {
      const el = statsRef.current;
      el.style.opacity = "0"; el.style.transform = "translateY(16px)";
      el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 200ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 200ms";
      const o = new IntersectionObserver(([e]) => {
        el.style.opacity = e.isIntersecting ? "1" : "0";
        el.style.transform = e.isIntersecting ? "translateY(0)" : "translateY(16px)";
      }, { threshold: 0.1 });
      o.observe(el); obs.push(o);
    }

    // Service rows
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0"; el.style.transform = "translateX(-20px)";
      el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`;
      const o = new IntersectionObserver(([e]) => {
        el.style.opacity = e.isIntersecting ? "1" : "0";
        el.style.transform = e.isIntersecting ? "translateX(0)" : "translateX(-20px)";
      }, { threshold: 0.08 });
      o.observe(el); obs.push(o);
    });

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

        /* ── SHARED NAV STYLES ── */
        .logo-svg { transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1); transform-origin: center; }
        .logo-path { fill: #ffffff; transition: fill 0.35s ease; }
        .brand-wrap:hover .logo-svg { transform: rotate(180deg) scale(1.15); }
        .brand-wrap:hover .logo-path { fill: #f97316; }
        .brand-letter { display: inline-block; transition: color 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .brand-wrap:hover .brand-letter { color: #fff; }
        .brand-wrap:hover .brand-letter:nth-child(1){transform:translateY(-3px);transition-delay:0ms}
        .brand-wrap:hover .brand-letter:nth-child(2){transform:translateY(-3px);transition-delay:40ms}
        .brand-wrap:hover .brand-letter:nth-child(3){transform:translateY(-3px);transition-delay:80ms}
        .brand-wrap:hover .brand-letter:nth-child(4){transform:translateY(-3px);transition-delay:120ms}
        .brand-wrap:hover .brand-letter:nth-child(5){transform:translateY(-3px);transition-delay:160ms}
        .brand-wrap:hover .brand-letter:nth-child(6){transform:translateY(-3px);transition-delay:200ms}
        .studio-letter { display: inline-block; transition: color 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1); color: #f97316; }
        .brand-wrap:hover .studio-letter { color: #fff; }
        .brand-wrap:hover .studio-letter:nth-child(1){transform:translateY(-3px);transition-delay:240ms}
        .brand-wrap:hover .studio-letter:nth-child(2){transform:translateY(-3px);transition-delay:280ms}
        .brand-wrap:hover .studio-letter:nth-child(3){transform:translateY(-3px);transition-delay:320ms}
        .brand-wrap:hover .studio-letter:nth-child(4){transform:translateY(-3px);transition-delay:360ms}
        .brand-wrap:hover .studio-letter:nth-child(5){transform:translateY(-3px);transition-delay:400ms}
        .brand-wrap:hover .studio-letter:nth-child(6){transform:translateY(-3px);transition-delay:440ms}

        .nav-item { position:relative; cursor:pointer; padding:10px 18px; user-select:none; overflow:visible; }
        .nav-top,.nav-bottom { display:block; font-size:0.8rem; font-weight:500; letter-spacing:0.07em; color:#9ca3af; line-height:1; white-space:nowrap; transition:transform 0.38s cubic-bezier(0.76,0,0.24,1),color 0.25s ease; will-change:transform; text-transform:uppercase; }
        .nav-top { clip-path:polygon(0% 0%,100% 0%,100% 50%,0% 50%); }
        .nav-bottom { clip-path:polygon(0% 50%,100% 50%,100% 100%,0% 100%); margin-top:-1em; }
        .nav-item:hover .nav-top { transform:translate(6px,-8px) skewX(14deg); color:#fff; }
        .nav-item:hover .nav-bottom { transform:translate(-6px,8px) skewX(14deg); color:#fff; }
        .nav-slash { position:absolute; top:50%; left:-6px; right:-6px; height:1.5px; background:linear-gradient(90deg,transparent 0%,#f97316 15%,#ff9a4d 50%,#f97316 85%,transparent 100%); transform:translateY(-50%) scaleX(0) rotate(-5deg); transform-origin:left center; transition:transform 0.32s cubic-bezier(0.76,0,0.24,1); pointer-events:none; z-index:20; filter:drop-shadow(0 0 3px #f97316cc); }
        .nav-item:hover .nav-slash { transform:translateY(-50%) scaleX(1) rotate(-5deg); }

        .contact-btn { position:relative; overflow:hidden; border:1.5px solid #f97316; color:#f97316; padding:0; width:110px; height:36px; border-radius:0; font-size:0.7rem; letter-spacing:0.18em; text-transform:uppercase; font-weight:700; cursor:pointer; background:transparent; transition:color 0.28s ease; display:inline-flex; align-items:center; justify-content:center; clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%); }
        .contact-btn::before { content:''; position:absolute; inset:0; background:#f97316; clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%); transform:translateX(-105%); transition:transform 0.3s cubic-bezier(0.76,0,0.24,1); z-index:0; }
        .contact-btn:hover::before { transform:translateX(0); }
        .contact-btn:hover { color:#000; }
        .contact-btn-text { position:relative; z-index:1; display:flex; align-items:center; gap:6px; line-height:1; }
        .contact-arrow { color:#f97316; transition:color 0.28s ease,transform 0.2s ease; font-size:0.85rem; }
        .contact-btn:hover .contact-arrow { color:#000; transform:translateX(3px); }

        /* ── GRID BG ── */
        @keyframes gridPan { 0%{background-position:0 0} 100%{background-position:40px 40px} }
        .sv-grid-bg { position:fixed; inset:0; background-image:linear-gradient(rgba(249,115,22,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,0.025) 1px,transparent 1px); background-size:40px 40px; animation:gridPan 14s linear infinite; pointer-events:none; z-index:0; }

        /* ── HERO ── */
        .sv-hero { position:relative; z-index:2; padding:56px 20px 48px; border-bottom:1px solid #141414; overflow:hidden; }
        @media(min-width:768px){ .sv-hero { padding:72px 48px 56px; } }

        .sv-hero-eyebrow { font-size:0.56rem; letter-spacing:0.34em; text-transform:uppercase; color:#f97316; display:flex; align-items:center; gap:12px; margin-bottom:22px; }
        .sv-hero-line { display:inline-block; width:24px; height:1px; background:#f97316; }

        .sv-hero-title { font-size:clamp(2.6rem,9vw,8rem); font-weight:900; line-height:0.84; letter-spacing:-0.04em; text-transform:uppercase; }
        .sv-hero-title-solid { color:#fff; }
        .sv-hero-title-outline { color:transparent; -webkit-text-stroke:2px #f97316; display:block; }

        /* Data table */
        .sv-data-table { display:flex; flex-wrap:wrap; border:1px solid #1a1a1a; margin-top:40px; max-width:680px; }
        .sv-data-cell { flex:1; min-width:130px; padding:18px 22px; border-right:1px solid #1a1a1a; position:relative; overflow:hidden; transition:background 0.28s ease; cursor:default; }
        .sv-data-cell:last-child { border-right:none; }
        .sv-data-cell:hover { background:#060606; }
        .sv-data-cell::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:#f97316; transform:scaleX(0); transform-origin:left; transition:transform 0.38s cubic-bezier(0.16,1,0.3,1); }
        .sv-data-cell:hover::before { transform:scaleX(1); }
        .sv-data-val { font-size:clamp(1.6rem,3.5vw,2.6rem); font-weight:900; letter-spacing:-0.04em; color:#fff; line-height:1; display:block; }
        .sv-data-lbl { font-size:0.5rem; letter-spacing:0.24em; text-transform:uppercase; color:#777; margin-top:5px; display:block; transition:color 0.25s ease; }
        .sv-data-cell:hover .sv-data-lbl { color:#f97316; }

        /* Watermark */
        .sv-watermark { position:absolute; bottom:-10%; right:0; font-size:clamp(5rem,14vw,12rem); font-weight:900; letter-spacing:-0.06em; color:rgba(255,255,255,0.013); text-transform:uppercase; pointer-events:none; user-select:none; line-height:1; transform:rotate(-4deg); }

        /* ── SERVICES SECTION HEADER ── */
        .sv-section-header { position:relative; z-index:2; display:flex; align-items:center; justify-content:space-between; padding:18px 20px; border-bottom:1px solid #111; flex-wrap:wrap; gap:8px; }
        @media(min-width:768px){ .sv-section-header { padding:18px 48px; } }
        .sv-section-header-label { font-size:0.5rem; letter-spacing:0.3em; text-transform:uppercase; color:#444; display:flex; align-items:center; gap:8px; }
        .sv-section-header-count { font-size:0.5rem; letter-spacing:0.22em; text-transform:uppercase; color:#f97316; }

        /* ── SERVICE ROW ── */
        .sv-row {
          position:relative; z-index:2;
          display:grid;
          grid-template-columns: 52px 1fr;
          border-bottom:1px solid #0f0f0f;
          cursor:pointer;
          overflow:hidden;
          background:#000;
          transition:background 0.3s ease;
        }
        @media(min-width:768px){
          .sv-row { grid-template-columns: 72px 1fr 280px; }
        }
        .sv-row:hover { background:#050505; }

        /* Left index column */
        .sv-row-index {
          display:flex; align-items:flex-start; justify-content:center;
          padding:28px 0 28px;
          border-right:1px solid #0f0f0f;
          font-size:0.44rem; font-weight:800; letter-spacing:0.2em;
          color:rgba(255,255,255,0.12); text-transform:uppercase;
          transition:color 0.3s ease;
          position:relative; overflow:hidden;
        }
        .sv-row:hover .sv-row-index { color:rgba(249,115,22,0.6); }

        /* Index fill wipe */
        .sv-row-index::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(180deg, rgba(249,115,22,0.06) 0%, transparent 100%);
          transform:translateY(100%); transition:transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .sv-row:hover .sv-row-index::before { transform:translateY(0); }

        /* Main content column */
        .sv-row-main { padding:28px 24px 28px; display:flex; flex-direction:column; gap:12px; }
        @media(min-width:768px){ .sv-row-main { padding:32px 36px 32px; } }

        .sv-row-name-wrap { display:flex; align-items:baseline; gap:16px; flex-wrap:wrap; }
        .sv-row-name {
          font-size:clamp(2rem,5vw,4.5rem); font-weight:900;
          line-height:0.9; letter-spacing:-0.03em; text-transform:uppercase;
          color:#fff;
          transition:color 0.3s ease;
          position:relative;
        }
        /* Orange underline sweeps in */
        .sv-row-name::after {
          content:''; position:absolute; bottom:-2px; left:0; right:0; height:2px;
          background:#f97316; transform:scaleX(0); transform-origin:left;
          transition:transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .sv-row:hover .sv-row-name::after { transform:scaleX(1); }

        .sv-row-tagline { font-size:0.75rem; font-weight:600; letter-spacing:0.16em; text-transform:uppercase; color:#666; transition:color 0.3s ease; align-self:flex-end; padding-bottom:4px; }
        @media(min-width:768px){ .sv-row-tagline { font-size:0.85rem; } }
        .sv-row:hover .sv-row-tagline { color:#f97316; }

        .sv-row-tags { display:flex; flex-wrap:wrap; gap:7px; }
        .sv-row-tag {
          font-size:0.6rem; font-weight:700; letter-spacing:0.14em; text-transform:uppercase;
          color:#555; border:1px solid #222; padding:5px 12px;
          transition:color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        @media(min-width:768px){ .sv-row-tag { font-size:0.68rem; padding:6px 14px; } }
        .sv-row:hover .sv-row-tag { color:#f97316; border-color:rgba(249,115,22,0.35); background:rgba(249,115,22,0.04); }

        .sv-row-desc {
          font-size:0.9rem; line-height:1.7; color:#555;
          max-height:0; overflow:hidden;
          transition:max-height 0.55s cubic-bezier(0.16,1,0.3,1), color 0.3s ease, opacity 0.3s ease;
          opacity:0;
        }
        @media(min-width:768px){ .sv-row-desc { font-size:1rem; line-height:1.75; } }
        .sv-row.is-expanded .sv-row-desc { max-height:200px; color:#aaa; opacity:1; }
        .sv-row:hover .sv-row-desc { color:#888; }

        /* Graphic column */
        .sv-row-graphic {
          display:none;
          align-items:center; justify-content:center;
          border-left:1px solid #0f0f0f;
          padding:24px;
          position:relative; overflow:hidden;
        }
        @media(min-width:768px){ .sv-row-graphic { display:flex; } }

        /* Expand indicator */
        .sv-row-expand {
          position:absolute; bottom:24px; right:24px;
          font-size:0.6rem; letter-spacing:0.18em; text-transform:uppercase;
          color:#444; display:flex; align-items:center; gap:6px;
          transition:color 0.25s ease;
        }
        @media(min-width:768px){ .sv-row-expand { font-size:0.68rem; } }
        .sv-row:hover .sv-row-expand { color:#f97316; }
        .sv-row-expand-arrow { display:inline-block; transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1); font-size:0.9rem; }
        .sv-row.is-expanded .sv-row-expand-arrow { transform:rotate(45deg); }

        /* Horizontal accent rule that sweeps across row on hover */
        .sv-row-rule {
          position:absolute; bottom:0; left:0; right:0; height:1px;
          background:linear-gradient(90deg, #f97316 0%, rgba(249,115,22,0.2) 60%, transparent 100%);
          transform:scaleX(0); transform-origin:left;
          transition:transform 0.5s cubic-bezier(0.16,1,0.3,1);
          z-index:3;
        }
        .sv-row:hover .sv-row-rule { transform:scaleX(1); }

        /* ── MARQUEE FOOTER ── */
        @keyframes marquee-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .sv-marquee-section { position:relative; overflow:hidden; cursor:pointer; background:#000; border-top:1px solid #141414; padding:14px 0; transition:background 0.4s ease; }
        .sv-marquee-section:hover { background:#f97316; }
        .sv-marquee-track { display:flex; width:max-content; animation:marquee-scroll 28s linear infinite; }
        .sv-marquee-section:hover .sv-marquee-track { animation:marquee-scroll 9s linear infinite; }
        .sv-marquee-word { font-size:clamp(1.4rem,4vw,3.2rem); font-weight:900; text-transform:uppercase; letter-spacing:-0.02em; white-space:nowrap; padding-right:2rem; color:#fff; transition:color 0.4s ease; line-height:1; }
        .sv-marquee-section:hover .sv-marquee-word { color:#000; }
        .sv-marquee-dot { color:#f97316; transition:color 0.4s ease; }
        .sv-marquee-section:hover .sv-marquee-dot { color:#000; }
        .sv-marquee-hint { position:absolute; right:20px; top:50%; transform:translateY(-50%); display:flex; align-items:center; gap:5px; font-size:0.52rem; letter-spacing:0.15em; text-transform:uppercase; color:#f97316; transition:color 0.4s ease,transform 0.3s ease; z-index:2; pointer-events:none; }
        .sv-marquee-section:hover .sv-marquee-hint { color:#000; transform:translateY(-50%) translateX(4px); }

        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
      `}</style>

      <main className="bg-black text-white min-h-screen" style={{ position:"relative" }}>
        {/* Grid bg */}
        <div className="sv-grid-bg" aria-hidden="true" />

        {/* Grain overlay */}
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
              <h1 className="text-orange-500 text-lg font-semibold tracking-tight leading-none">
                {"UNFLTR".split("").map((char,i) => <span key={i} className="brand-letter">{char}</span>)}
                <span>&nbsp;</span>
                {"STUDIO".split("").map((char,i) => <span key={i} className="studio-letter">{char}</span>)}
              </h1>
            </div>
          </Link>

          <div className="hidden md:flex items-center">
            {["Branding","Strategy","Marketing","Motion"].map((item) => (
              <div key={item} className="nav-item">
                <span className="nav-top" aria-hidden="true">{item}</span>
                <span className="nav-bottom">{item}</span>
                <span className="nav-slash" aria-hidden="true" />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500 transition-colors duration-200" aria-label="Instagram">
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

        {/* ── HERO ── */}
        <div className="sv-hero" ref={heroRef}>
          <div className="sv-watermark" aria-hidden="true">CRAFT</div>
          <p className="sv-hero-eyebrow"><span className="sv-hero-line" />What We Do</p>
          <h1 className="sv-hero-title">
            <span className="sv-hero-title-solid">Our</span>{" "}
            <span className="sv-hero-title-solid">Capabilities</span>
            <span className="sv-hero-title-outline">Unfiltered.</span>
          </h1>

          {/* Studio stats */}
          <div className="sv-data-table">
            {[
              { val:"5",     lbl:"Core Disciplines" },
              { val:"16",    lbl:"Industry Terms" },
              { val:"110+",  lbl:"Projects Delivered" },
              { val:"∞",     lbl:"Creative Range" },
            ].map(d => (
              <div key={d.lbl} className="sv-data-cell">
                <span className="sv-data-val">{d.val}</span>
                <span className="sv-data-lbl">{d.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES SECTION HEADER ── */}
        <div className="sv-section-header" ref={statsRef}>
          <span className="sv-section-header-label">
            <span style={{ width:16, height:1, background:"#333", display:"inline-block" }} />
            Service Pillars
          </span>
          <span className="sv-section-header-count">
            {SERVICES.length} Disciplines — Click To Expand
          </span>
        </div>

        {/* ── SERVICE ROWS ── */}
        <div style={{ position:"relative", zIndex:2 }}>
          {SERVICES.map((service, i) => {
            const isActive = activeService === i;
            const isExpanded = expandedService === i;
            const Graphic = GRAPHICS[i];
            return (
              <div
                key={service.id}
                className={`sv-row${isExpanded ? " is-expanded" : ""}`}
                ref={el => (rowRefs.current[i] = el)}
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
                onClick={() => setExpandedService(isExpanded ? null : i)}
              >
                {/* Left index */}
                <div className="sv-row-index">
                  <span style={{ writingMode:"vertical-rl", transform:"rotate(180deg)", fontSize:"0.42rem", letterSpacing:"0.18em" }}>
                    {service.id}
                  </span>
                </div>

                {/* Main content */}
                <div className="sv-row-main">
                  <div className="sv-row-name-wrap">
                    <span className="sv-row-name">{service.name}</span>
                    <span className="sv-row-tagline">{service.tagline}</span>
                  </div>
                  <div className="sv-row-tags">
                    {service.tags.map(tag => (
                      <span key={tag} className="sv-row-tag">{tag}</span>
                    ))}
                  </div>
                  <p className="sv-row-desc">{service.desc}</p>
                  <div className="sv-row-expand">
                    <span>{isExpanded ? "Close" : "Explore"}</span>
                    <span className="sv-row-expand-arrow">+</span>
                  </div>
                </div>

                {/* Graphic column */}
                <div className="sv-row-graphic">
                  <Graphic active={isActive} />
                </div>

                {/* Bottom rule sweep */}
                <div className="sv-row-rule" aria-hidden="true" />
              </div>
            );
          })}
        </div>

        {/* ── CAPABILITIES WORD CLOUD STRIP ── */}
        <div style={{ position:"relative", zIndex:2, borderTop:"1px solid #0f0f0f", borderBottom:"1px solid #0f0f0f", padding:"20px 20px", background:"#030303", overflow:"hidden" }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px 20px", alignItems:"center" }}>
            {["Branding","Strategy","Marketing","Content","Production","Design","Motion","CGI","Visuals","Websites","Advertising","Campaigns","Storytelling","Direction","Editing","Consulting"].map((word, i) => (
              <span
                key={word}
                style={{
                  fontSize:"0.5rem", letterSpacing:"0.22em", textTransform:"uppercase",
                  color: i % 5 === 0 ? "#f97316" : i % 3 === 0 ? "#555" : "#2a2a2a",
                  fontWeight:700, transition:"color 0.25s ease", cursor:"default",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#f97316"}
                onMouseLeave={e => e.currentTarget.style.color = i % 5 === 0 ? "#f97316" : i % 3 === 0 ? "#555" : "#2a2a2a"}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* ── FOOTER MARQUEE ── */}
        <Link href="/contact">
          <section className="sv-marquee-section" style={{ position:"relative", zIndex:2 }}>
            <div style={{ overflow:"hidden" }}>
              <div className="sv-marquee-track">
                {Array(12).fill(null).map((_,i) => (
                  <span key={i} className="sv-marquee-word">
                    Let&apos;s Build Couture Experiences <span className="sv-marquee-dot">—</span> Get In Touch&nbsp;
                  </span>
                ))}
              </div>
            </div>
            <div className="sv-marquee-hint">
              <span className="hidden sm:inline">Get In Touch</span>
              <span>→</span>
            </div>
          </section>
        </Link>
      </main>
    </>
  );
}