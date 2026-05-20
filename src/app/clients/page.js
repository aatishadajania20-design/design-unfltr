"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";

const ALL_CLIENTS = [
  { name:"MNST",             logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/MNST_vyaeim.png" },
  { name:"Cava",             logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/cava_jxvtci.png" },
  { name:"Astro",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/astro_oyrcy8.png" },
  { name:"Amazonia",         logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/amazonia_xe1tup.png" },
  { name:"142B Lounge",      logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/142b_lounge_v2zyac.png" },
  { name:"Four Seasons",     logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/4_seasons_cdfk2v.png" },
  { name:"Blunt",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/blunt_bjssqi.png" },
  { name:"Lalit",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/lalit_n2bxlz.png" },
  { name:"Aquila",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/aquila_h9muin.png" },
  { name:"V Are",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747618/V_Are_xbmhqd.png" },
  { name:"Taj Hotels",       logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747618/Taj_ht3b3n.png" },
  { name:"Tryst",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747618/tryst_unuryj.png" },
  { name:"Thakkar",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747618/Thakkar_zmbx4v.png" },
  { name:"Kaam",             logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/kaam_y0o5ua.png" },
  { name:"Ishq FM Radio",    logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/ishq_fm_radio_pawtjy.png" },
  { name:"Ignite Ent",       logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/IGNITE_ENT_new_fhvse1.png" },
  { name:"Saqi",             logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/saqi_q5c7ph.png" },
  { name:"Gear",             logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/gear_qknfze.png" },
  { name:"Hype",             logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/hype_logo_smaxvs.png" },
  { name:"Rajiv",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/rajiv_nltffy.png" },
  { name:"Icarus",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/icarus_kkmhpz.png" },
  { name:"Race Lounge Bar",  logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/Race_-_Lounge_Bar_jjnhzi.png" },
  { name:"Paradise",         logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/Paradise_Logo_d3jlyr.png" },
  { name:"Purly",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/purly_g0zl2p.png" },
  { name:"Certified Thrift", logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/certified_thrift_fm9w9l.png" },
  { name:"Emergence",        logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/EMERGENCE_bbe1tx.png" },
  { name:"Dot",              logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/dot_gikxtq.png" },
  { name:"C9 Energy",        logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747615/open_file_of_logo_c9_energy_drink-01_zjt0ko.png" },
  { name:"Nirvana",          logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747615/nirvana_xo2ed2.png" },
  { name:"Oracle",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747615/orcale_hvrqwy.png" },
  { name:"BookMyShow",       logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/Book_My_Show_Logo-02_White_iwdyfp.png" },
  { name:"Bombay Monks",     logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/bombay_monks_wyhy8q.png" },
  { name:"Clique",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/clique_qjgnsu.png" },
  { name:"Monet",            logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/monet_zp3wjm.png" },
  { name:"Mekada",           logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/mekada_ng33kr.png" },
  { name:"Ansh Entertainment",logo:"https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747615/logo_2_kv9jqv.png" },
];

export default function ClientsPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cellRefs = useRef([]);
  const gridRef = useRef(null);

  // Staggered spring reveal
  useEffect(() => {
    const observers = [];
    cellRefs.current.forEach((el, i) => {
      if (!el) return;
      const col = i % 5;
      const row = Math.floor(i / 5);
      const delay = col * 60 + row * 25;
      el.style.opacity = "0";
      el.style.transform = "translateY(28px) scale(0.96)";
      el.style.transition = `opacity 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
      const obs = new IntersectionObserver(([entry]) => {
        el.style.opacity = entry.isIntersecting ? "1" : "0";
        el.style.transform = entry.isIntersecting ? "translateY(0) scale(1)" : "translateY(28px) scale(0.96)";
      }, { threshold: 0.05 });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Cursor tracking for magnetic effect
  const handleMouseMove = useCallback((e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        *, *::before, *::after {
          font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif;
          box-sizing: border-box;
        }

        /* ── SHARED NAV (exact match to homepage) ── */
        .logo-svg { transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1); transform-origin: center; }
        .logo-path { fill: #ffffff; transition: fill 0.35s ease; }
        .brand-wrap:hover .logo-svg { transform: rotate(180deg) scale(1.15); }
        .brand-wrap:hover .logo-path { fill: #f97316; }
        .brand-letter { display: inline-block; transition: color 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .brand-wrap:hover .brand-letter { color: #fff; }
        .brand-wrap:hover .brand-letter:nth-child(1) { transform: translateY(-3px); transition-delay: 0ms; }
        .brand-wrap:hover .brand-letter:nth-child(2) { transform: translateY(-3px); transition-delay: 40ms; }
        .brand-wrap:hover .brand-letter:nth-child(3) { transform: translateY(-3px); transition-delay: 80ms; }
        .brand-wrap:hover .brand-letter:nth-child(4) { transform: translateY(-3px); transition-delay: 120ms; }
        .brand-wrap:hover .brand-letter:nth-child(5) { transform: translateY(-3px); transition-delay: 160ms; }
        .brand-wrap:hover .brand-letter:nth-child(6) { transform: translateY(-3px); transition-delay: 200ms; }
        .brand-suffix { transition: color 0.2s ease 0.24s; color: #f97316; }
        .brand-wrap:hover .brand-suffix { color: #fff; }

        .nav-item { position: relative; cursor: pointer; padding: 10px 18px; user-select: none; overflow: visible; }
        .nav-top, .nav-bottom {
          display: block; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.07em;
          color: #9ca3af; line-height: 1; white-space: nowrap;
          transition: transform 0.38s cubic-bezier(0.76,0,0.24,1), color 0.25s ease;
          will-change: transform; text-transform: uppercase;
        }
        .nav-top { clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%); }
        .nav-bottom { clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%); margin-top: -1em; }
        .nav-item:hover .nav-top { transform: translate(6px,-8px) skewX(14deg); color: #fff; }
        .nav-item:hover .nav-bottom { transform: translate(-6px,8px) skewX(14deg); color: #fff; }
        .nav-slash {
          position: absolute; top: 50%; left: -6px; right: -6px; height: 1.5px;
          background: linear-gradient(90deg, transparent 0%, #f97316 15%, #ff9a4d 50%, #f97316 85%, transparent 100%);
          transform: translateY(-50%) scaleX(0) rotate(-5deg); transform-origin: left center;
          transition: transform 0.32s cubic-bezier(0.76,0,0.24,1);
          pointer-events: none; z-index: 20; filter: drop-shadow(0 0 3px #f97316cc);
        }
        .nav-item:hover .nav-slash { transform: translateY(-50%) scaleX(1) rotate(-5deg); }

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

        /* ── FOOTER MARQUEE (exact match to homepage) ── */
        @keyframes marquee-scroll {
          0% { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
        .chat-marquee-section {
          position: relative; overflow: hidden; cursor: pointer;
          background: #000; border-top: 1px solid #1a1a1a;
          padding: 10px 0; transition: background 0.4s ease;
        }
        .chat-marquee-section:hover { background: #f97316; }
        .chat-marquee-track {
          display: flex; width: max-content;
          animation: marquee-scroll 22s linear infinite;
        }
        .chat-marquee-section:hover .chat-marquee-track { animation: marquee-scroll 10s linear infinite; }
        .chat-marquee-word {
          font-size: clamp(1.2rem, 3vw, 2.6rem); font-weight: 900;
          text-transform: uppercase; letter-spacing: -0.02em;
          white-space: nowrap; padding-right: 1.2rem;
          color: #fff; transition: color 0.4s ease; line-height: 1;
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

        /* ── BRUTAL LINK ── */
        .brutal-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.62rem; font-weight: 800; letter-spacing: 0.22em;
          text-transform: uppercase; color: #444; text-decoration: none;
          position: relative; padding-bottom: 2px; transition: color 0.22s ease;
          white-space: nowrap;
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

        /* ── ANIMATED GRID BG ── */
        @keyframes gridPan { 0%{background-position:0 0} 100%{background-position:40px 40px} }
        .cl-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(249,115,22,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridPan 14s linear infinite;
          pointer-events: none; z-index: 0;
        }

        /* ── HERO ── */
        .cl-hero {
          position: relative; z-index: 2;
          border-bottom: 1px solid #141414;
          padding: 56px 20px 44px; overflow: hidden;
        }
        @media(min-width:768px){ .cl-hero { padding: 72px 48px 52px; } }

        .cl-hero-eyebrow {
          font-size: 0.56rem; letter-spacing: 0.32em;
          text-transform: uppercase; color: #f97316;
          display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
        }
        .cl-hero-line { display:inline-block; width:24px; height:1px; background:#f97316; }

        .cl-hero-title {
          font-size: clamp(2.8rem, 9.5vw, 8.5rem); font-weight: 900;
          line-height: 0.84; letter-spacing: -0.04em;
          text-transform: uppercase; color: #fff;
        }
        .cl-hero-title-accent {
          display: block; color: transparent;
          -webkit-text-stroke: 2px #f97316;
        }

        .cl-data-table {
          display: flex; flex-wrap: wrap;
          border: 1px solid #181818; margin-top: 36px; max-width: 680px;
        }
        .cl-data-cell {
          flex: 1; min-width: 130px; padding: 18px 22px;
          border-right: 1px solid #181818;
          position: relative; overflow: hidden;
          transition: background 0.25s ease; cursor: default;
        }
        .cl-data-cell:last-child { border-right: none; }
        .cl-data-cell:hover { background: #060606; }
        .cl-data-cell::after {
          content: ''; position: absolute; top:0; left:0; right:0; height:2px;
          background: #f97316; transform: scaleX(0); transform-origin: left;
          transition: transform 0.32s cubic-bezier(0.76,0,0.24,1);
        }
        .cl-data-cell:hover::after { transform: scaleX(1); }
        .cl-data-val {
          font-size: clamp(1.6rem, 3.5vw, 2.6rem); font-weight: 900;
          letter-spacing: -0.04em; color: #fff; line-height: 1; display:block;
        }
        .cl-data-lbl {
          font-size: 0.5rem; letter-spacing: 0.26em;
          text-transform: uppercase; color: #444; margin-top: 5px; display:block;
        }

        .cl-watermark {
          position: absolute; bottom: -18%; right: -1%;
          font-size: clamp(5rem, 16vw, 13rem); font-weight: 900;
          letter-spacing: -0.06em; color: rgba(255,255,255,0.012);
          text-transform: uppercase; pointer-events: none; user-select: none;
          line-height: 1; transform: rotate(-5deg);
        }

        /* ── DYNAMIC WABI-SABI GRID ── */
        .cl-roster-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          position: relative; z-index: 2;
        }
        @media(min-width:540px)  { .cl-roster-grid { grid-template-columns: repeat(3,1fr); } }
        @media(min-width:820px)  { .cl-roster-grid { grid-template-columns: repeat(4,1fr); } }
        @media(min-width:1100px) { .cl-roster-grid { grid-template-columns: repeat(5,1fr); } }

        /* ── WABI-SABI CELL ── */
        .cl-cell {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #000;
          cursor: default;
          border-right: 1px solid #0d0d0d;
          border-bottom: 1px solid #0d0d0d;
          isolation: isolate;
        }

        /* Organic scan-line grain — embracing imperfection */
        .cl-cell::after {
          content: '';
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.006) 2px,
            rgba(255,255,255,0.006) 3px
          );
          pointer-events: none; z-index: 8; mix-blend-mode: screen;
        }

        /* ── HOVER: elegant frame expansion (not abrupt flood) ── */
        /* Fine-line frame that materializes */
        .cl-cell-frame {
          position: absolute; inset: 0; z-index: 7; pointer-events: none;
        }
        .cl-cell-frame::before, .cl-cell-frame::after {
          content: '';
          position: absolute;
          background: #f97316;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        /* Top + bottom bars */
        .cl-cell-frame::before {
          top: 0; left: 0; right: 0; height: 1.5px;
          transform: scaleX(0); transform-origin: left;
        }
        .cl-cell:hover .cl-cell-frame::before { transform: scaleX(1); }
        .cl-cell-frame::after {
          bottom: 0; left: 0; right: 0; height: 1.5px;
          transform: scaleX(0); transform-origin: right;
          transition-delay: 0.04s;
        }
        .cl-cell:hover .cl-cell-frame::after { transform: scaleX(1); }

        /* Left + right bars via pseudo on inner div */
        .cl-cell-frame-sides::before, .cl-cell-frame-sides::after {
          content: '';
          position: absolute;
          width: 1.5px; background: #f97316;
          top: 0; bottom: 0;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.08s;
        }
        .cl-cell-frame-sides::before { left: 0; transform: scaleY(0); transform-origin: top; }
        .cl-cell-frame-sides::after  { right: 0; transform: scaleY(0); transform-origin: bottom; }
        .cl-cell:hover .cl-cell-frame-sides::before { transform: scaleY(1); }
        .cl-cell:hover .cl-cell-frame-sides::after  { transform: scaleY(1); }

        /* Corner crosshairs */
        .cl-cell-corner {
          position: absolute; width: 10px; height: 10px;
          pointer-events: none; z-index: 9;
          opacity: 0; transition: opacity 0.35s ease 0.15s;
        }
        .cl-cell:hover .cl-cell-corner { opacity: 1; }
        .cl-cell-corner.tl { top:7px; left:7px; border-top:1px solid rgba(249,115,22,0.7); border-left:1px solid rgba(249,115,22,0.7); }
        .cl-cell-corner.tr { top:7px; right:7px; border-top:1px solid rgba(249,115,22,0.7); border-right:1px solid rgba(249,115,22,0.7); }
        .cl-cell-corner.bl { bottom:7px; left:7px; border-bottom:1px solid rgba(249,115,22,0.7); border-left:1px solid rgba(249,115,22,0.7); }
        .cl-cell-corner.br { bottom:7px; right:7px; border-bottom:1px solid rgba(249,115,22,0.7); border-right:1px solid rgba(249,115,22,0.7); }

        /* Index number — metadata read-out */
        .cl-cell-index {
          position: absolute; bottom: 9px; right: 10px; z-index: 9;
          font-size: 0.44rem; letter-spacing: 0.16em;
          color: rgba(255,255,255,0.1); font-weight: 700;
          transition: color 0.35s ease, opacity 0.35s ease;
          pointer-events: none; font-variant-numeric: tabular-nums;
        }
        .cl-cell:hover .cl-cell-index { color: rgba(249,115,22,0.6); }

        /* Dimension readout top-left — micro editorial detail */
        .cl-cell-dim {
          position: absolute; top: 9px; left: 10px; z-index: 9;
          font-size: 0.38rem; letter-spacing: 0.12em;
          color: rgba(255,255,255,0.07); font-weight: 600;
          transition: color 0.35s ease, opacity 0.35s ease;
          pointer-events: none; font-variant-numeric: tabular-nums;
          text-transform: uppercase;
        }
        .cl-cell:hover .cl-cell-dim { color: rgba(249,115,22,0.45); }

        /* ── WABI-SABI LOGO LAYER ── */
        /* Natural dimensions, not forced uniform */
        .cl-cell-logo-wrap {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 22px; z-index: 2;
          transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .cl-cell:hover .cl-cell-logo-wrap { opacity: 0; transform: scale(0.88) translateY(-8px); }

        .cl-cell-logo {
          /* Let natural aspect ratio breathe — wabi-sabi */
          max-width: 72%; max-height: 58%;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.45;
          transition: opacity 0.4s ease;
          /* Embrace pixel texture for low-res logos */
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }

        /* Very small logos: float in a void — intentional negative space */
        .cl-cell-logo.is-tiny {
          max-width: 40%; max-height: 36%;
          opacity: 0.3;
        }

        /* ── MULTI-LAYERED HOVER OVERLAY ── elegant slide-reveal, not flood ── */
        /* Dark tinted layer slides up first */
        .cl-cell-overlay-bg {
          position: absolute; inset: 0; z-index: 3;
          background: rgba(10,5,0,0.82);
          transform: translateY(100%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .cl-cell:hover .cl-cell-overlay-bg { transform: translateY(0); }

        /* Orange accent panel slides in from bottom with slight delay */
        .cl-cell-overlay-accent {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px; z-index: 5;
          background: linear-gradient(90deg, #f97316, #ff6a00);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.18s;
        }
        .cl-cell:hover .cl-cell-overlay-accent { transform: scaleX(1); }

        /* Content container */
        .cl-cell-overlay-content {
          position: absolute; inset: 0; z-index: 6;
          display: flex; flex-direction: column; justify-content: center;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.3s ease 0.15s;
        }
        .cl-cell:hover .cl-cell-overlay-content { opacity: 1; }

        /* Row 1 — solid name marquee forward */
        @keyframes name-run-fwd { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes name-run-rev { from{transform:translateX(-50%)} to{transform:translateX(0)} }

        .cl-name-track {
          display: flex; width: max-content;
          animation: name-run-fwd 5s linear infinite; will-change: transform;
        }
        .cl-name-track-rev {
          display: flex; width: max-content;
          animation: name-run-rev 7.5s linear infinite; will-change: transform;
        }
        .cl-name-seg {
          font-size: clamp(0.85rem, 2.2vw, 1.4rem); font-weight: 900;
          text-transform: uppercase; letter-spacing: -0.01em;
          color: #fff; white-space: nowrap; padding-right: 1.4rem; line-height: 1.15;
        }
        .cl-name-seg-ghost {
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.2);
        }
        .cl-name-divider {
          width: 100%; height: 1px; background: rgba(255,255,255,0.08); flex-shrink: 0;
        }

        /* Metadata strip slides up from bottom */
        .cl-cell-meta {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 7px 11px; z-index: 7; background: rgba(249,115,22,0.92);
          transform: translateY(100%);
          transition: transform 0.42s cubic-bezier(0.16,1,0.3,1) 0.1s;
          display: flex; justify-content: space-between; align-items: center;
          pointer-events: none;
        }
        .cl-cell:hover .cl-cell-meta { transform: translateY(0); }
        .cl-cell-meta-name {
          font-size: 0.44rem; font-weight: 800;
          letter-spacing: 0.22em; text-transform: uppercase; color: #000;
        }
        .cl-cell-meta-tag {
          font-size: 0.38rem; letter-spacing: 0.14em;
          text-transform: uppercase; color: rgba(0,0,0,0.5);
        }

        /* ── COUNT STRIP ── */
        .cl-count-strip {
          position: relative; z-index: 2;
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 20px; border-bottom: 1px solid #0d0d0d; flex-wrap: wrap; gap: 8px;
        }
        @media(min-width:768px){ .cl-count-strip { padding: 12px 48px; } }
        .cl-count-strip-label {
          font-size: 0.5rem; letter-spacing: 0.28em;
          text-transform: uppercase; color: #2a2a2a;
          display: flex; align-items: center; gap: 8px;
        }
        .cl-count-strip-num {
          font-size: 0.5rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: #f97316;
        }

        /* ── SECTION DIVIDER between grid rows — organic separator ── */
        .cl-grid-section-marker {
          grid-column: 1 / -1;
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; border-bottom: 1px solid #0d0d0d;
          border-top: 1px solid #0d0d0d;
          background: #030303; position: relative; z-index: 3; overflow: hidden;
        }
        .cl-grid-section-marker-line {
          flex: 1; height: 1px; background: linear-gradient(90deg, #f97316 0%, transparent 100%); opacity: 0.15;
        }
        .cl-grid-section-marker-label {
          font-size: 0.4rem; letter-spacing: 0.32em; text-transform: uppercase; color: #333;
          white-space: nowrap;
        }
        .cl-grid-section-marker-dot {
          width: 4px; height: 4px; border-radius: 50%; background: #f97316; opacity: 0.4;
          flex-shrink: 0;
        }
      `}</style>

      <main
        className="bg-black text-white min-h-screen"
        style={{ position:"relative" }}
        onMouseMove={handleMouseMove}
      >
        {/* ANIMATED GRID BG */}
        <div className="cl-grid-bg" aria-hidden="true" />

        {/* GRAIN OVERLAY */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 998,
            opacity: 0.025,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            mixBlendMode: "overlay"
          }}
        />

        {/* ── NAVBAR — exact match to homepage ── */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 backdrop-blur-md bg-black/50 border-b border-zinc-900">
          <Link href="/">
            <div className="brand-wrap flex items-center gap-2 cursor-pointer select-none">
              <svg className="logo-svg" width="26" height="26" viewBox="0 0 88.82 89.67" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path className="logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
                  <path className="logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
                </g>
              </svg>
              <h1 className="text-orange-500 text-lg md:text-xl font-semibold tracking-tight leading-none">
                {"UNFLTR".split("").map((char, i) => (
                  <span key={i} className="brand-letter">{char}</span>
                ))}
                <span className="brand-suffix"> STUDIO</span>
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
            <a
              href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ=="
              target="_blank" rel="noopener noreferrer"
              className="text-white hover:text-orange-500 transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="6" ry="6" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" />
              </svg>
            </a>
            <Link href="/contact">
              <button className="contact-btn">
                <span className="contact-btn-text">
                  <span className="contact-arrow">→</span>Contact
                </span>
              </button>
            </Link>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div className="cl-hero">
          <div className="cl-watermark" aria-hidden="true">ROSTER</div>
          <p className="cl-hero-eyebrow">
            <span className="cl-hero-line" />The Complete Roster
          </p>
          <h1 className="cl-hero-title">
            The UNFLTR
            <span className="cl-hero-title-accent">Roster.</span>
          </h1>
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

        {/* COUNT STRIP */}
        <div className="cl-count-strip">
          <span className="cl-count-strip-label">
            <span style={{ width:16, height:1, background:"#222", display:"inline-block" }} />
            Client Roster
          </span>
          <span className="cl-count-strip-num">{ALL_CLIENTS.length} Brands Listed</span>
        </div>

        {/* ── WABI-SABI GRID ── */}
        <div style={{ position:"relative", zIndex:2 }}>
          <div className="cl-roster-grid" ref={gridRef}>

            {ALL_CLIENTS.map((client, i) => (
              <div
                key={i}
                className="cl-cell"
                ref={(el) => (cellRefs.current[i] = el)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Fine-line frame materialises on hover */}
                <div className="cl-cell-frame" aria-hidden="true" />
                <div
                  className="cl-cell-frame-sides"
                  style={{ position:"absolute", inset:0, zIndex:7, pointerEvents:"none" }}
                  aria-hidden="true"
                />

                {/* Corner crosshairs */}
                <div className="cl-cell-corner tl" aria-hidden="true" />
                <div className="cl-cell-corner tr" aria-hidden="true" />
                <div className="cl-cell-corner bl" aria-hidden="true" />
                <div className="cl-cell-corner br" aria-hidden="true" />

                {/* Micro metadata readouts — editorial texture */}
                <span className="cl-cell-index" aria-hidden="true">
                  {String(i + 1).padStart(2,"0")}
                </span>
                <span className="cl-cell-dim" aria-hidden="true">
                  UNFLTR × {String(i + 1).padStart(2,"0")}
                </span>

                {/* Logo — wabi-sabi natural sizing */}
                <div className="cl-cell-logo-wrap">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="cl-cell-logo"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                {/* Hover: dark overlay slides up */}
                <div className="cl-cell-overlay-bg" aria-hidden="true" />

                {/* Hover: content — multi-row name marquee */}
                <div className="cl-cell-overlay-content" aria-hidden="true">
                  {/* Row 1 — solid name forward */}
                  <div style={{ overflow:"hidden", width:"100%" }}>
                    <div className="cl-name-track">
                      {Array(10).fill(null).map((_, j) => (
                        <span key={j} className="cl-name-seg">{client.name}&nbsp;</span>
                      ))}
                      {Array(10).fill(null).map((_, j) => (
                        <span key={`b${j}`} className="cl-name-seg">{client.name}&nbsp;</span>
                      ))}
                    </div>
                  </div>

                  <div className="cl-name-divider" />

                  {/* Row 2 — ghost text reverse */}
                  <div style={{ overflow:"hidden", width:"100%" }}>
                    <div className="cl-name-track-rev">
                      {Array(10).fill(null).map((_, j) => (
                        <span key={j} className="cl-name-seg cl-name-seg-ghost">{client.name}&nbsp;</span>
                      ))}
                      {Array(10).fill(null).map((_, j) => (
                        <span key={`b${j}`} className="cl-name-seg cl-name-seg-ghost">{client.name}&nbsp;</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Orange accent bottom bar */}
                <div className="cl-cell-overlay-accent" aria-hidden="true" />

                {/* Metadata strip */}
                <div className="cl-cell-meta">
                  <span className="cl-cell-meta-name">{client.name}</span>
                  <span className="cl-cell-meta-tag">× UNFLTR</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FOOTER MARQUEE — exact match to homepage ── */}
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