"use client";
import Link from "next/link";
import { useCallback, useState, useEffect } from "react";

function NavItem({ href, label, onClick }) {
  const inner = (
    <>
      <span className="sh-top" aria-hidden="true">{label}</span>
      <span className="sh-bot" aria-hidden="true">{label}</span>
      <span className="sh-blade" aria-hidden="true">
        <span className="sh-blade-body" />
        <span className="sh-blade-flash" />
        <span className="sh-blade-tip" />
      </span>
    </>
  );
  if (onClick) return <button onClick={onClick} className="sh-nav-item" type="button">{inner}</button>;
  return <Link href={href} className="sh-nav-item">{inner}</Link>;
}

/*
  BROKEN LETTER SVG COMPONENT
  Each letter is drawn as multiple SVG fragment-polygons that shift apart on hover,
  revealing an orange crack line between them. The crack follows the exact same
  diagonal as the katana blade — so the whole header feels like one single cut.

  Letters are drawn at 32×44 viewport (roughly matching 1.35rem bold cap height).
  Each letter has 2–3 fragments separated by a jagged cut line at ~-10deg.
*/

const CUT_ANGLE_DEG = -10; // Must match blade rotate in CSS

// Each fragment: { path, dx, dy, rotate } — dx/dy/rotate = hover offset
const LETTERS = {
  U: {
    frags: [
      // Left arm + bottom curve (top fragment — above cut)
      { d:"M2,0 L2,28 C2,36 8,42 16,42 C24,42 30,36 30,28 L30,0 L24,0 L24,28 C24,32 20,36 16,36 C12,36 8,32 8,28 L8,0 Z", dx:-1.5, dy:-2, r:-0.4 },
      // Middle piece cut by diagonal
      { d:"M2,28 C2,36 8,42 16,42 C24,42 30,36 30,28 L30,32 C30,38 24,44 16,44 C8,44 2,38 2,32 Z", dx:0, dy:1.5, r:0.2 },
    ],
    w:32
  },
  N: {
    frags: [
      // Left post + diagonal (top)
      { d:"M2,0 L8,0 L8,18 L24,0 L30,0 L30,8 L14,28 L14,44 L8,44 L8,26 L2,44 L2,0 Z", dx:-1.5, dy:-1.5, r:-0.3 },
      // Right post (bottom)
      { d:"M24,16 L30,8 L30,44 L24,44 Z", dx:1.5, dy:1.5, r:0.3 },
    ],
    w:32
  },
  F: {
    frags: [
      // Vertical stem + top bar
      { d:"M2,0 L30,0 L30,6 L8,6 L8,18 L26,18 L26,24 L8,24 L8,44 L2,44 Z", dx:-1, dy:-2, r:-0.3 },
      // Bottom half of stem below cut line
      { d:"M2,26 L8,26 L8,44 L2,44 Z", dx:1, dy:2, r:0.3 },
    ],
    w:32
  },
  L: {
    frags: [
      // Vertical stem (top)
      { d:"M2,0 L8,0 L8,38 L30,38 L30,44 L2,44 Z", dx:-1, dy:-2, r:-0.3 },
      // Bottom bar (below cut)
      { d:"M8,38 L30,38 L30,44 L8,44 Z", dx:1.5, dy:2, r:0.4 },
    ],
    w:32
  },
  T: {
    frags: [
      // Top bar
      { d:"M2,0 L30,0 L30,6 L19,6 L19,18 L13,18 L13,6 L2,6 Z", dx:0, dy:-2.5, r:0 },
      // Stem below cut
      { d:"M13,18 L19,18 L19,44 L13,44 Z", dx:0, dy:2.5, r:0.3 },
    ],
    w:32
  },
  R: {
    frags: [
      // Top bowl + vertical stem
      { d:"M2,0 L18,0 C26,0 30,4 30,12 C30,18 26,22 20,23 L30,44 L23,44 L14,24 L8,24 L8,44 L2,44 Z M8,6 L8,18 L17,18 C21,18 24,16 24,12 C24,8 21,6 17,6 Z", dx:-1.5, dy:-1.5, r:-0.3 },
      // Leg fragment
      { d:"M16,22 L23,44 L30,44 L22,22 Z", dx:2, dy:2, r:0.5 },
    ],
    w:32
  },
  S: {
    frags: [
      // Top curve
      { d:"M28,4 C24,0 18,0 14,0 C8,0 2,4 2,10 C2,16 6,18 14,20 C20,22 24,24 24,28 C24,32 20,36 14,36 C10,36 6,34 4,30 L2,40 C6,44 10,44 14,44 C22,44 30,38 30,28 C30,22 26,18 18,16 Z", dx:-1.5, dy:-2, r:-0.4 },
      // Bottom curve (the bottom half after cut)
      { d:"M14,20 C20,22 24,24 24,28 C24,32 20,36 14,36 L14,42 C22,42 30,36 30,28 C30,22 26,18 18,16 Z", dx:1.5, dy:2, r:0.3 },
    ],
    w:32
  },
  // T already defined above
  // U already defined above
  D: {
    frags: [
      // Top arc + stem
      { d:"M2,0 L14,0 C24,0 30,8 30,22 C30,36 24,44 14,44 L2,44 Z M8,6 L8,38 L13,38 C20,38 24,32 24,22 C24,12 20,6 13,6 Z", dx:-1.5, dy:-1.5, r:-0.3 },
      // Bottom fragment
      { d:"M8,28 L8,38 L14,38 C18,38 22,34 23,28 Z", dx:1.5, dy:2, r:0.4 },
    ],
    w:32
  },
  I: {
    frags: [
      // Top bar + upper stem
      { d:"M2,0 L30,0 L30,6 L19,6 L19,20 L13,20 L13,6 L2,6 Z", dx:-0.5, dy:-2, r:-0.2 },
      // Lower stem + bottom bar
      { d:"M13,20 L19,20 L19,38 L30,38 L30,44 L2,44 L2,38 L13,38 Z", dx:0.5, dy:2, r:0.2 },
    ],
    w:32
  },
  O: {
    frags: [
      // Top arc
      { d:"M16,0 C8,0 2,8 2,22 C2,26 3,30 5,33 L28,6 C25,2 21,0 16,0 Z", dx:-1.5, dy:-2, r:-0.4 },
      // Bottom arc
      { d:"M5,33 C8,40 12,44 16,44 C24,44 30,36 30,22 C30,14 28,8 24,4 Z", dx:1.5, dy:2, r:0.4 },
    ],
    w:32
  },
};

// Map the wordmark string to letter definitions
const WORD = [
  { key:"U", gap:false },
  { key:"N", gap:false },
  { key:"F", gap:false },
  { key:"L", gap:false },
  { key:"T", gap:false },
  { key:"R", gap:false },
  { key:"_", gap:true  }, // space
  { key:"S", gap:false, studio:true },
  { key:"T", gap:false, studio:true },
  { key:"U", gap:false, studio:true },
  { key:"D", gap:false, studio:true },
  { key:"I", gap:false, studio:true },
  { key:"O", gap:false, studio:true },
];

function BrokenLetter({ letterKey, isStudio, isHovered }) {
  const def = LETTERS[letterKey];
  if (!def) return null;

  return (
    <svg
      viewBox={`0 0 ${def.w} 44`}
      width={def.w * 0.85}
      height={44 * 0.85}
      style={{
        display: "inline-block",
        verticalAlign: "bottom",
        overflow: "visible",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {def.frags.map((frag, fi) => {
        const tx = isHovered ? frag.dx : 0;
        const ty = isHovered ? frag.dy : 0;
        const tr = isHovered ? frag.r : 0;
        const cx = def.w / 2;
        const cy = 22;
        return (
          <path
            key={fi}
            d={frag.d}
            fill={isStudio ? "#f97316" : "#ffffff"}
            style={{
              transition: `transform 0.45s cubic-bezier(0.16,1,0.3,1) ${fi * 30}ms, opacity 0.3s ease`,
              transform: `translate(${tx}px, ${ty}px) rotate(${tr}deg)`,
              transformOrigin: `${cx}px ${cy}px`,
              opacity: isHovered ? (fi === 0 ? 0.92 : 0.85) : (fi === 0 ? 0.88 : 0.6),
            }}
          />
        );
      })}
      {/* Crack line — diagonal at CUT_ANGLE_DEG, brightens on hover */}
      {isHovered && (
        <line
          x1={-4} y1={22 + 4 * Math.tan((CUT_ANGLE_DEG * Math.PI) / 180)}
          x2={def.w + 4} y2={22 - def.w * Math.tan((-CUT_ANGLE_DEG * Math.PI) / 180) + 4 * Math.tan((CUT_ANGLE_DEG * Math.PI) / 180)}
          stroke={isStudio ? "rgba(0,0,0,0.5)" : "rgba(249,115,22,0.7)"}
          strokeWidth="0.7"
          style={{
            filter: "drop-shadow(0 0 1.5px rgba(249,115,22,0.9))",
            transition: "opacity 0.2s ease",
          }}
        />
      )}
    </svg>
  );
}

export default function SiteHeader({ scrollWork = false }) {
  const [hovered, setHovered] = useState(false);

  const handleWork = useCallback(() => {
    if (scrollWork) {
      document.getElementById("work-section")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#work-section";
    }
  }, [scrollWork]);

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        .sh-wrap *, .sh-wrap *::before, .sh-wrap *::after {
          font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif;
          box-sizing: border-box;
        }

        /* ── BRAND LINK ── */
        .sh-brand {
          display: flex; align-items: center;
          gap: 10px; cursor: pointer; user-select: none;
          text-decoration: none;
        }

        /* ── LOGO SVG — height = wordmark cap height ── */
        .sh-logo-svg {
          height: 37px; width: auto; flex-shrink: 0;
          transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1);
          transform-origin: center;
        }
        .sh-logo-path { fill: #fff; transition: fill 0.35s ease; }
        .sh-brand:hover .sh-logo-svg  { transform: rotate(180deg) scale(1.15); }
        .sh-brand:hover .sh-logo-path { fill: #f97316; }

        /* ── WORDMARK ── */
        .sh-wordmark {
          display: inline-flex; align-items: flex-end;
          gap: 1px; height: 37px;
          margin: 0; padding: 0; line-height: 1;
        }
        .sh-wordmark-space { width: 10px; flex-shrink: 0; }

        /* ── NAV ITEM ── */
        .sh-nav-item {
          position: relative; cursor: pointer;
          padding: 10px 18px; user-select: none; overflow: visible;
          text-decoration: none; background: none; border: none;
          font-family: inherit; display: inline-block;
        }

        /*
          TEXT SPLIT:
          Both .sh-top and .sh-bot render the same text,
          clipped to top/bottom halves. They split along the SAME
          angle as the blade: skewX(${CUT_ANGLE_DEG}deg offset).
          The cut_angle is -10deg — so top goes translate(+x,-y) skewX(10)
          and bottom goes translate(-x,+y) skewX(10) — MATCHING blade angle.
        */
        .sh-top, .sh-bot {
          display: block;
          font-size: 0.78rem; font-weight: 500;
          letter-spacing: 0.1em; color: #9ca3af;
          line-height: 1; white-space: nowrap; text-transform: uppercase;
          will-change: transform;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), color 0.25s ease;
        }
        .sh-top    { clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%); }
        .sh-bot    { clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%); margin-top:-1em; }

        /*
          The key fix: skewX angle matches blade rotation.
          blade is rotate(-10deg). The text shear must also be
          skewX(-10deg equivalent in the split direction).
          Top half: move in direction of blade vector (+right, -up) with skewX(10)
          Bot half: move opposite (-right, +down) with skewX(10)
          This makes the two halves pull apart EXACTLY along the blade line.
        */
        .sh-nav-item:hover .sh-top { transform: translate(13px,-12px) skewX(-10deg); color:#fff; }
        .sh-nav-item:hover .sh-bot { transform: translate(-13px,12px) skewX(-10deg); color:#fff; }

        /* ── KATANA BLADE ── */
        .sh-blade {
          position: absolute;
          top: 50%; left: -20px; right: -20px; height: 2px;
          /* SAME -10deg as text split angle */
          transform: translateY(-50%) scaleX(0) rotate(-10deg);
          transform-origin: left center;
          /* Fast strike: cubic-bezier with near-instant start */
          transition: transform 0.35s cubic-bezier(0.1, 0.8, 0.25, 1);
          pointer-events: none; z-index: 20;
          display: flex; align-items: center;
        }
        .sh-nav-item:hover .sh-blade {
          transform: translateY(-50%) scaleX(1) rotate(-10deg);
        }

        /* Blade body — tapered toward tip (right side) */
        .sh-blade-body {
          flex: 1; height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.15) 3%,
            #f97316 12%,
            #ffb347 38%,
            #ff8c00 62%,
            #f97316 82%,
            rgba(255,220,120,0.4) 95%,
            transparent 100%
          );
          /* Taper: wide at guard (left), narrow at tip (right) */
          clip-path: polygon(0% 0%, 97% 25%, 100% 50%, 97% 75%, 0% 100%);
          box-shadow: 0 0 4px rgba(249,115,22,0.6), 0 0 10px rgba(249,115,22,0.2);
          border-radius: 0 1px 1px 0;
        }

        /* Flash races ahead of the blade — slightly faster */
        .sh-blade-flash {
          position: absolute; top: 50%; left: 0; right: 0; height: 2px;
          transform: translateY(-50%) translateX(-130%);
          background: linear-gradient(90deg, transparent 0%, #fff 50%, transparent 100%);
          filter: blur(0.8px); pointer-events: none; opacity: 0;
        }
        .sh-nav-item:hover .sh-blade-flash {
          animation: sh-flash 0.28s cubic-bezier(0.1,0.8,0.25,1) forwards;
        }
        @keyframes sh-flash {
          0%   { transform: translateY(-50%) translateX(-130%); opacity:0; }
          10%  { opacity:1; }
          80%  { opacity:0.8; }
          100% { transform: translateY(-50%) translateX(130%); opacity:0; }
        }

        /* Tip flare as blade exits */
        .sh-blade-tip {
          position: absolute; right:-3px; top:50%;
          transform: translateY(-50%) scale(0);
          width:7px; height:7px; border-radius:50%;
          background: rgba(255,200,100,0.95); filter: blur(2px);
          pointer-events: none; opacity:0;
        }
        .sh-nav-item:hover .sh-blade-tip {
          animation: sh-tip 0.45s ease 0.26s forwards;
        }
        @keyframes sh-tip {
          0%   { transform:translateY(-50%) scale(0); opacity:0; }
          40%  { transform:translateY(-50%) scale(2.5); opacity:1; }
          100% { transform:translateY(-50%) scale(0); opacity:0; }
        }

        /* ── CONTACT BUTTON ── */
        .sh-contact-btn {
          position: relative; overflow: hidden;
          border: 1.5px solid #f97316; color: #f97316;
          padding: 0; width: 110px; height: 36px; border-radius: 0;
          font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
          font-weight: 700; cursor: pointer; background: transparent;
          transition: color 0.28s ease; display: inline-flex;
          align-items: center; justify-content: center;
          clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
          font-family: inherit; text-decoration: none;
        }
        .sh-contact-btn::before {
          content:''; position:absolute; inset:0; background:#f97316;
          clip-path: polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
          transform: translateX(-105%);
          transition: transform 0.3s cubic-bezier(0.76,0,0.24,1); z-index:0;
        }
        .sh-contact-btn:hover::before { transform:translateX(0); }
        .sh-contact-btn:hover { color:#000; }
        .sh-contact-btn-inner { position:relative; z-index:1; display:flex; align-items:center; gap:6px; line-height:1; }
        .sh-contact-arrow { color:#f97316; transition:color 0.28s ease,transform 0.2s ease; font-size:0.85rem; }
        .sh-contact-btn:hover .sh-contact-arrow { color:#000; transform:translateX(3px); }

        /* ── INSTAGRAM ── */
        .sh-insta { display:flex; align-items:center; justify-content:center; color:#fff; transition:color 0.2s ease; }
        .sh-insta:hover { color:#f97316; }
      `}</style>

      <nav
        className="sh-wrap sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 backdrop-blur-md bg-black/55 border-b border-zinc-900"
      >
        {/* ── BRAND ── */}
        <Link href="/">
          <div
            className="sh-brand"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <svg
              className="sh-logo-svg"
              viewBox="0 0 88.82 89.67"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path className="sh-logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
              <path className="sh-logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
            </svg>

            {/* Broken letter wordmark */}
            <h1 className="sh-wordmark" aria-label="UNFLTR STUDIO">
              {WORD.map((item, idx) => {
                if (item.gap) return <span key={idx} className="sh-wordmark-space" aria-hidden="true" />;
                return (
                  <BrokenLetter
                    key={idx}
                    letterKey={item.key}
                    isStudio={!!item.studio}
                    isHovered={hovered}
                  />
                );
              })}
            </h1>
          </div>
        </Link>

        {/* ── DESKTOP NAV ── */}
        <div className="hidden md:flex items-center">
          <NavItem href="/services" label="Services" />
          <NavItem href="#"        label="Work"     onClick={handleWork} />
          <NavItem href="/clients" label="Clients" />
          <NavItem href="/about"   label="About" />
        </div>

        {/* ── RIGHT ── */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ=="
            target="_blank" rel="noopener noreferrer"
            className="sh-insta" aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="6" ry="6" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor"/>
            </svg>
          </a>
          <Link href="/contact" className="sh-contact-btn">
            <span className="sh-contact-btn-inner">
              <span className="sh-contact-arrow">→</span>Contact
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}