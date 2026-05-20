"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const ALL_CLIENTS = [
  { name:"MNST",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/MNST_vyaeim.png" },
  { name:"Cava",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/cava_jxvtci.png" },
  { name:"Mekada",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/mekada_ng33kr.png" },
  { name:"Astro",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/astro_oyrcy8.png" },
  { name:"Amazonia",        logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/amazonia_xe1tup.png" },
  { name:"142B Lounge",     logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/142b_lounge_v2zyac.png" },
  { name:"Four Seasons",    logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/4_seasons_cdfk2v.png" },
  { name:"Blunt",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/blunt_bjssqi.png" },
  { name:"Lalit",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/lalit_n2bxlz.png" },
  { name:"Aquila",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/aquila_h9muin.png" },
  { name:"V Are",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747618/V_Are_xbmhqd.png" },
  { name:"Taj Hotels",      logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747618/Taj_ht3b3n.png" },
  { name:"Tryst",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747618/tryst_unuryj.png" },
  { name:"Thakkar",         logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747618/Thakkar_zmbx4v.png" },
  { name:"Sobo",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747617/sobo_yri4ql.png" },
  { name:"Kaam",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/kaam_y0o5ua.png" },
  { name:"Ishq FM Radio",   logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747617/ishq_fm_radio_pawtjy.png" },
  { name:"Ignite Ent",      logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747617/IGNITE_ENT_new_fhvse1.png" },
  { name:"Saqi",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747617/saqi_q5c7ph.png" },
  { name:"Gear",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747616/gear_qknfze.png" },
  { name:"Hype",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747617/hype_logo_smaxvs.png" },
  { name:"Rajiv",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747617/rajiv_nltffy.png" },
  { name:"Icarus",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747616/icarus_kkmhpz.png" },
  { name:"Race Lounge Bar", logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747616/Race_-_Lounge_Bar_jjnhzi.png" },
  { name:"Paradise",        logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747616/Paradise_Logo_d3jlyr.png" },
  { name:"Purly",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747616/purly_g0zl2p.png" },
  { name:"Certified Thrift",logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747614/certified_thrift_fm9w9l.png" },
  { name:"Emergence",       logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747616/EMERGENCE_bbe1tx.png" },
  { name:"Dot",             logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747616/dot_gikxtq.png" },
  { name:"C9 Energy",       logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747615/open_file_of_logo_c9_energy_drink-01_zjt0ko.png" },
  { name:"Nirvana",         logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747615/nirvana_xo2ed2.png" },
  { name:"Oracle",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747615/orcale_hvrqwy.png" },
  { name:"BookMyShow",      logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747614/Book_My_Show_Logo-02_White_iwdyfp.png" },
  { name:"Bombay Monks",    logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747614/bombay_monks_wyhy8q.png" },
  { name:"Clique",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747614/clique_qjgnsu.png" },
  { name:"Monet",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747614/monet_zp3wjm.png" },
  { name:"Logo 2",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778747615/logo_2_kv9jqv.png" },
];

export default function ClientsPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const gridRef = useRef(null);
  const cellRefs = useRef([]);

  // Scroll-triggered reveal for each grid cell
  useEffect(() => {
    const observers = [];
    cellRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = `opacity 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${(i % 4) * 60}ms, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${(i % 4) * 60}ms`;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        } else {
          el.style.opacity = "0";
          el.style.transform = "translateY(28px)";
        }
      }, { threshold: 0.08 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        *, *::before, *::after {
          font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif;
          box-sizing: border-box;
        }

        /* ── LOGO ANIMATIONS ── */
        .cl-logo-svg { transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1); transform-origin: center; }
        .cl-logo-path { fill: #fff; transition: fill 0.35s ease; }
        .cl-brand:hover .cl-logo-svg { transform: rotate(180deg) scale(1.15); }
        .cl-brand:hover .cl-logo-path { fill: #f97316; }
        .cl-brand-letter { display:inline-block; transition:color 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .cl-brand:hover .cl-brand-letter { color:#fff; }
        .cl-brand:hover .cl-brand-letter:nth-child(1){transform:translateY(-3px);transition-delay:0ms}
        .cl-brand:hover .cl-brand-letter:nth-child(2){transform:translateY(-3px);transition-delay:40ms}
        .cl-brand:hover .cl-brand-letter:nth-child(3){transform:translateY(-3px);transition-delay:80ms}
        .cl-brand:hover .cl-brand-letter:nth-child(4){transform:translateY(-3px);transition-delay:120ms}
        .cl-brand:hover .cl-brand-letter:nth-child(5){transform:translateY(-3px);transition-delay:160ms}
        .cl-brand:hover .cl-brand-letter:nth-child(6){transform:translateY(-3px);transition-delay:200ms}
        .cl-brand-suffix { color:#f97316; transition:color 0.2s ease 0.24s; }
        .cl-brand:hover .cl-brand-suffix { color:#fff; }

        /* ── KATANA NAV ── */
        .cl-nav-item { position:relative; cursor:pointer; padding:10px 18px; user-select:none; overflow:visible; }
        .cl-nav-top,.cl-nav-bottom { display:block; font-size:0.8rem; font-weight:500; letter-spacing:0.07em; color:#9ca3af; line-height:1; white-space:nowrap; transition:transform 0.38s cubic-bezier(0.76,0,0.24,1),color 0.25s ease; will-change:transform; text-transform:uppercase; }
        .cl-nav-top { clip-path:polygon(0% 0%,100% 0%,100% 50%,0% 50%); }
        .cl-nav-bottom { clip-path:polygon(0% 50%,100% 50%,100% 100%,0% 100%); margin-top:-1em; }
        .cl-nav-item:hover .cl-nav-top { transform:translate(6px,-8px) skewX(14deg); color:#fff; }
        .cl-nav-item:hover .cl-nav-bottom { transform:translate(-6px,8px) skewX(14deg); color:#fff; }
        .cl-nav-slash { position:absolute; top:50%; left:-6px; right:-6px; height:1.5px; background:linear-gradient(90deg,transparent 0%,#f97316 15%,#ff9a4d 50%,#f97316 85%,transparent 100%); transform:translateY(-50%) scaleX(0) rotate(-5deg); transform-origin:left center; transition:transform 0.32s cubic-bezier(0.76,0,0.24,1); pointer-events:none; z-index:20; filter:drop-shadow(0 0 3px #f97316cc); }
        .cl-nav-item:hover .cl-nav-slash { transform:translateY(-50%) scaleX(1) rotate(-5deg); }

        /* ── CONTACT BTN ── */
        .cl-contact-btn { position:relative; overflow:hidden; border:1.5px solid #f97316; color:#f97316; padding:0; width:110px; height:36px; border-radius:0; font-size:0.7rem; letter-spacing:0.18em; text-transform:uppercase; font-weight:700; cursor:pointer; background:transparent; transition:color 0.28s ease; display:inline-flex; align-items:center; justify-content:center; clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%); }
        .cl-contact-btn::before { content:''; position:absolute; inset:0; background:#f97316; clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%); transform:translateX(-105%); transition:transform 0.3s cubic-bezier(0.76,0,0.24,1); z-index:0; }
        .cl-contact-btn:hover::before { transform:translateX(0); }
        .cl-contact-btn:hover { color:#000; }
        .cl-contact-btn-text { position:relative; z-index:1; display:flex; align-items:center; gap:6px; line-height:1; }
        .cl-contact-arrow { color:#f97316; transition:color 0.28s ease, transform 0.2s ease; }
        .cl-contact-btn:hover .cl-contact-arrow { color:#000; transform:translateX(3px); }

        /* ── GRID BACKGROUND ANIMATION ── */
        @keyframes gridPan {
          0%   { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
        .cl-grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridPan 8s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        /* ── HEADER ── */
        .cl-hero {
          position: relative;
          z-index: 2;
          border-bottom: 1px solid #141414;
          padding: 56px 20px 40px;
          overflow: hidden;
        }
        @media(min-width:768px){ .cl-hero { padding: 72px 48px 48px; } }

        .cl-hero-eyebrow {
          font-size: 0.58rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: #f97316;
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 16px;
        }
        .cl-hero-line { display:inline-block; width:28px; height:1px; background:#f97316; }

        .cl-hero-title {
          font-size: clamp(3rem, 10vw, 9rem);
          font-weight: 900; line-height: 0.85;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #fff;
          margin-bottom: 32px;
        }
        .cl-hero-title-accent { color: #f97316; display:block; }

        /* RAW DATA TABLE */
        .cl-data-table {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          border: 1px solid #1a1a1a;
          margin-top: 32px;
          max-width: 640px;
        }
        .cl-data-cell {
          flex: 1;
          min-width: 140px;
          padding: 16px 20px;
          border-right: 1px solid #1a1a1a;
          position: relative;
          overflow: hidden;
          transition: background 0.2s ease;
          cursor: default;
        }
        .cl-data-cell:last-child { border-right: none; }
        .cl-data-cell:hover { background: #080808; }
        .cl-data-cell::before {
          content: ''; position: absolute; top:0; left:0; right:0; height:2px;
          background: #f97316; transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.76,0,0.24,1);
        }
        .cl-data-cell:hover::before { transform: scaleX(1); }
        .cl-data-val {
          font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 900;
          letter-spacing: -0.04em; color: #fff; line-height: 1; display:block;
        }
        .cl-data-lbl {
          font-size: 0.52rem; letter-spacing: 0.24em;
          text-transform: uppercase; color: #555; margin-top: 4px; display:block;
        }

        /* ── WATERMARK ── */
        .cl-watermark {
          position: absolute; bottom: -20%; right: -2%;
          font-size: clamp(6rem, 18vw, 14rem); font-weight: 900;
          letter-spacing: -0.06em; color: rgba(255,255,255,0.015);
          text-transform: uppercase; pointer-events: none; user-select: none;
          line-height: 1; transform: rotate(-6deg);
        }

        /* ── CLIENT GRID ── */
        .cl-grid-section {
          position: relative; z-index: 2;
          padding: 0 0 0 0;
        }
        .cl-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-left: 1px solid #111;
          border-top: 1px solid #111;
        }
        @media(min-width:600px){ .cl-grid { grid-template-columns: repeat(3,1fr); } }
        @media(min-width:900px){ .cl-grid { grid-template-columns: repeat(4,1fr); } }
        @media(min-width:1200px){ .cl-grid { grid-template-columns: repeat(5,1fr); } }

        /* ── CLIENT CELL ── */
        .cl-cell {
          position: relative;
          border-right: 1px solid #111;
          border-bottom: 1px solid #111;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          cursor: default;
          background: #000;
        }

        /* Logo container — centered, generous */
        .cl-cell-logo-wrap {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
          z-index: 1;
        }
        .cl-cell-logo {
          max-width: 100%; max-height: 100%;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.45;
          transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.35s ease;
          width: 100%; height: 100%;
        }
        .cl-cell:hover .cl-cell-logo-wrap {
          opacity: 0;
          transform: scale(0.85);
        }

        /* HOVER OVERLAY — full orange flood + running name text */
        .cl-cell-overlay {
          position: absolute; inset: 0; z-index: 2;
          background: #f97316;
          clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
          transition: clip-path 0.38s cubic-bezier(0.76,0,0.24,1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .cl-cell:hover .cl-cell-overlay {
          clip-path: polygon(0 0%, 100% 0%, 100% 100%, 0 100%);
        }

        /* Running name text inside overlay */
        @keyframes name-run {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .cl-cell-name-track {
          display: flex;
          width: max-content;
          animation: name-run 4s linear infinite;
          will-change: transform;
        }
        .cl-cell-name-seg {
          font-size: clamp(1.2rem, 3.5vw, 2rem);
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: #000;
          white-space: nowrap;
          padding-right: 2rem;
          line-height: 1;
        }

        /* × UNFLTR suffix */
        .cl-cell-name-suffix {
          color: rgba(0,0,0,0.35);
          font-size: 0.7em;
          font-weight: 900;
        }

        /* Corner index */
        .cl-cell-index {
          position: absolute; top: 10px; left: 12px; z-index: 3;
          font-size: 0.52rem; letter-spacing: 0.16em;
          color: rgba(255,255,255,0.2); font-weight: 700;
          transition: color 0.25s ease;
          pointer-events: none;
        }
        .cl-cell:hover .cl-cell-index { color: rgba(0,0,0,0.4); }

        /* Orange top-rule per cell, visible at rest */
        .cl-cell::before {
          content: ''; position: absolute; top:0; left:0; right:0; height:2px;
          background: #f97316; opacity:0;
          transition: opacity 0.25s ease; z-index: 4;
        }
        .cl-cell:hover::before { opacity: 1; }

       /* ── FOOTER MARQUEE ── */
@keyframes marquee-scroll {
  0% { transform: translateX(0) }
  100% { transform: translateX(-50%) }
}

.chat-marquee-section {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  background: #000;
  border-top: 1px solid #1a1a1a;

  /* reduced height */
  padding: 12px 0;

  transition: background 0.4s ease;
}

.chat-marquee-section:hover {
  background: #f97316;
}

.chat-marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 22s linear infinite;
}

.chat-marquee-section:hover .chat-marquee-track {
  animation: marquee-scroll 10s linear infinite;
}

.chat-marquee-word {
  /* slightly smaller text */
  font-size: clamp(1.2rem, 3vw, 2.8rem);

  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  white-space: nowrap;

  /* smaller spacing */
  padding-right: 1.5rem;

  color: #fff;
  transition: color 0.4s ease;
  line-height: 1;
}

.chat-marquee-section:hover .chat-marquee-word {
  color: #000;
}

.chat-marquee-dot {
  color: #f97316;
  transition: color 0.4s ease;
}

.chat-marquee-section:hover .chat-marquee-dot {
  color: #000;
}

.chat-cta-hint {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  gap: 6px;

  /* slightly smaller */
  font-size: 0.55rem;

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

@keyframes pulse-dot {
  0%,100% { opacity:1; transform:scale(1) }
  50% { opacity:0.4; transform:scale(0.7) }
}
      `}</style>

      <main className="bg-black text-white min-h-screen" style={{ position:"relative" }}>

        {/* ANIMATED GRID BG */}
        <div className="cl-grid-bg" aria-hidden="true" />

        {/* GRAIN */}
        <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.022]"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"128px 128px", mixBlendMode:"overlay" }}
        />

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 backdrop-blur-md bg-black/60 border-b border-zinc-900" style={{ position:"relative", zIndex:50 }}>
          <Link href="/">
            <div className="cl-brand flex items-center gap-2 cursor-pointer select-none">
              <svg className="cl-logo-svg" width="26" height="26" viewBox="0 0 88.82 89.67" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path className="cl-logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
                  <path className="cl-logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
                </g>
              </svg>
              <span className="text-orange-500 text-lg md:text-xl font-semibold tracking-tight leading-none">
                {"UNFLTR".split("").map((char,i) => <span key={i} className="cl-brand-letter">{char}</span>)}
                <span className="cl-brand-suffix"> Studio®</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center">
            {["Branding","Strategy","Marketing","Motion"].map((item) => (
              <div key={item} className="cl-nav-item">
                <span className="cl-nav-top" aria-hidden="true">{item}</span>
                <span className="cl-nav-bottom">{item}</span>
                <span className="cl-nav-slash" aria-hidden="true" />
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
              <button className="cl-contact-btn">
                <span className="cl-contact-btn-text"><span className="cl-contact-arrow">→</span>Contact</span>
              </button>
            </Link>
          </div>
        </nav>

        {/* HERO HEADER */}
        <div className="cl-hero" style={{ position:"relative", zIndex:2 }}>
          <div className="cl-watermark" aria-hidden="true">ROSTER</div>

          <p className="cl-hero-eyebrow">
            <span className="cl-hero-line" />
            The Complete Roster
          </p>

          <h1 className="cl-hero-title">
            The UNFLTR
            <span className="cl-hero-title-accent">Roster.</span>
          </h1>

          {/* RAW DATA TABLE */}
          <div className="cl-data-table">
            {[
              { val:"37+",  lbl:"Clients Served" },
              { val:"110+", lbl:"Projects Done" },
              { val:"3+",   lbl:"Years Active" },
              { val:"∞",    lbl:"Culturally Driven" },
            ].map((d) => (
              <div key={d.lbl} className="cl-data-cell">
                <span className="cl-data-val">{d.val}</span>
                <span className="cl-data-lbl">{d.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* GRID */}
        <div className="cl-grid-section" style={{ position:"relative", zIndex:2 }}>
          <div className="cl-grid" ref={gridRef}>
            {ALL_CLIENTS.map((client, i) => {
              const nameRepeated = Array(8).fill(`${client.name} × UNFLTR `).join("");
              return (
                <div
                  key={i}
                  className="cl-cell"
                  ref={(el) => (cellRefs.current[i] = el)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Index */}
                  <span className="cl-cell-index">{String(i + 1).padStart(2,"0")}</span>

                  {/* Logo */}
                  <div className="cl-cell-logo-wrap">
                    <img src={client.logo} alt={client.name} className="cl-cell-logo" loading="lazy" />
                  </div>

                  {/* Hover Overlay */}
                  <div className="cl-cell-overlay">
                    <div className="cl-cell-name-track">
                      {[0,1,2,3].map((j) => (
                        <span key={j} className="cl-cell-name-seg">
                          {client.name}
                          <span className="cl-cell-name-suffix"> × UNFLTR </span>
                        </span>
                      ))}
                      {[0,1,2,3].map((j) => (
                        <span key={`b${j}`} className="cl-cell-name-seg">
                          {client.name}
                          <span className="cl-cell-name-suffix"> × UNFLTR </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER MARQUEE */}
        <Link href="/contact">
          <section className="chat-marquee-section" style={{ position:"relative", zIndex:2 }}>
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