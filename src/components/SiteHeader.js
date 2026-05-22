"use client";
import Link from "next/link";
import { useCallback, useRef, useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   NAV ITEM — KATANA CUT (proven, untouched)
   ───────────────────────────────────────────────────────────── */
function NavItem({ href, label, onClick }) {
  const inner = (
    <>
      <span className="cl-nav-impact" aria-hidden="true" />
      <span className="cl-nav-speedlines" aria-hidden="true">
        <span className="cl-speedline cl-speedline-1" />
        <span className="cl-speedline cl-speedline-2" />
        <span className="cl-speedline cl-speedline-3" />
        <span className="cl-speedline cl-speedline-4" />
        <span className="cl-speedline cl-speedline-5" />
      </span>
      <span className="cl-nav-top" aria-hidden="true">{label}</span>
      <span className="cl-nav-bottom" aria-hidden="true">{label}</span>
      <span className="cl-nav-slash" aria-hidden="true">
        <span className="cl-nav-slash-afterimage" />
        <span className="cl-nav-slash-blade" />
        <span className="cl-nav-slash-flash" />
        <span className="cl-nav-slash-spark" />
      </span>
      <span className="cl-nav-debris" aria-hidden="true">
        <span className="cl-ember cl-ember-1" />
        <span className="cl-ember cl-ember-2" />
        <span className="cl-ember cl-ember-3" />
        <span className="cl-ember cl-ember-4" />
        <span className="cl-ember cl-ember-5" />
        <span className="cl-ember cl-ember-6" />
      </span>
      <span className="cl-nav-sr">{label}</span>
    </>
  );
  if (onClick) return <button onClick={onClick} className="cl-nav-item" type="button">{inner}</button>;
  return <Link href={href} className="cl-nav-item">{inner}</Link>;
}

/* ─────────────────────────────────────────────────────────────────
   LETTER SPLIT MAP
   Blade-cut: top half flies up, bottom half falls down.
   Diagonal cut line (~±4%) gives a katana-slash feel.
   ───────────────────────────────────────────────────────────── */
const SPLITS = {
  U: { top:{c:"polygon(0% 0%,100% 0%,100% 46%,0% 54%)",dx:-4,dy:-30,r:-6}, bot:{c:"polygon(0% 54%,100% 46%,100% 100%,0% 100%)",dx:4,dy:30,r:6} },
  N: { top:{c:"polygon(0% 0%,100% 0%,100% 44%,0% 56%)",dx:-5,dy:-28,r:-8}, bot:{c:"polygon(0% 56%,100% 44%,100% 100%,0% 100%)",dx:5,dy:28,r:8} },
  F: { top:{c:"polygon(0% 0%,100% 0%,100% 48%,0% 52%)",dx:-6,dy:-32,r:-5}, bot:{c:"polygon(0% 52%,100% 48%,100% 100%,0% 100%)",dx:6,dy:32,r:5} },
  L: { top:{c:"polygon(0% 0%,100% 0%,100% 45%,0% 55%)",dx:-4,dy:-29,r:-9}, bot:{c:"polygon(0% 55%,100% 45%,100% 100%,0% 100%)",dx:4,dy:29,r:9} },
  T: { top:{c:"polygon(0% 0%,100% 0%,100% 47%,0% 53%)",dx:-3,dy:-31,r:-6}, bot:{c:"polygon(0% 53%,100% 47%,100% 100%,0% 100%)",dx:3,dy:31,r:6} },
  R: { top:{c:"polygon(0% 0%,100% 0%,100% 43%,0% 57%)",dx:-5,dy:-29,r:-10}, bot:{c:"polygon(0% 57%,100% 43%,100% 100%,0% 100%)",dx:5,dy:29,r:10} },
  S: { top:{c:"polygon(0% 0%,100% 0%,100% 49%,0% 51%)",dx:-6,dy:-28,r:-5}, bot:{c:"polygon(0% 51%,100% 49%,100% 100%,0% 100%)",dx:6,dy:28,r:5} },
  D: { top:{c:"polygon(0% 0%,100% 0%,100% 46%,0% 54%)",dx:-4,dy:-33,r:-7}, bot:{c:"polygon(0% 54%,100% 46%,100% 100%,0% 100%)",dx:4,dy:33,r:7} },
  I: { top:{c:"polygon(0% 0%,100% 0%,100% 50%,0% 50%)",dx:-7,dy:-26,r:-12}, bot:{c:"polygon(0% 50%,100% 50%,100% 100%,0% 100%)",dx:7,dy:26,r:12} },
  O: { top:{c:"polygon(0% 0%,100% 0%,100% 45%,0% 55%)",dx:-5,dy:-30,r:-6}, bot:{c:"polygon(0% 55%,100% 45%,100% 100%,0% 100%)",dx:5,dy:30,r:6} },
};

function SplitLetter({ ch, isStudio, hitDelay }) {
  const split = SPLITS[ch] || {
    top:{c:"polygon(0% 0%,100% 0%,100% 50%,0% 50%)",dx:0,dy:-22,r:0},
    bot:{c:"polygon(0% 50%,100% 50%,100% 100%,0% 100%)",dx:0,dy:22,r:0},
  };
  return (
    <span className="cl-split-letter" style={{ "--hit-delay":`${hitDelay}ms` }}>
      <span className="cl-split-base">{ch}</span>
      <span
        className={`cl-split-piece ${isStudio?"cl-piece-studio":"cl-piece-main"}`}
        aria-hidden="true"
        style={{
          clipPath:split.top.c, WebkitClipPath:split.top.c,
          "--pdx":`${split.top.dx}px`, "--pdy":`${split.top.dy}px`, "--pr":`${split.top.r}deg`,
        }}
      >{ch}</span>
      <span
        className={`cl-split-piece ${isStudio?"cl-piece-studio":"cl-piece-main"}`}
        aria-hidden="true"
        style={{
          clipPath:split.bot.c, WebkitClipPath:split.bot.c,
          "--pdx":`${split.bot.dx}px`, "--pdy":`${split.bot.dy}px`, "--pr":`${split.bot.r}deg`,
        }}
      >{ch}</span>
      <span className="cl-split-sr">{ch}</span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   ASTERISK LOGO — main body + chip fragment + shockwave rings
   ───────────────────────────────────────────────────────────── */
function AsteriskLogo() {
  return (
    <span className="cl-aster-wrap" aria-hidden="true">
      <svg className="cl-aster-svg" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g className="cl-aster-body">
          <path className="cl-aster-path"
            d="M88,30.5l-9.2,-15.9l-25,14.4V0H35.6v29L10.2,14.6L1,30.5l25.1,14.5l-9,5.2c1.8,2.4,3.6,4.7,5.5,7.1l-3.8,5.2c1.3,1.9,2.7,3.7,4,5.6l12.5,-7.2v29h18.4v-28.9l25,14.4l9.2,-15.9l-25.1,-14.5L88,30.5z"
          />
        </g>
        <g className="cl-aster-chip">
          <path className="cl-aster-chip-path"
            d="M1,58.5l9.2,15.9l10.7,-6.2c-1.8,-2.1,-3.6,-4.2,-5.4,-6.3c1.3,-1.8,2.7,-3.5,4,-5.3c-1.7,-2,-3.4,-3.9,-5.2,-5.9L1,58.5z"
          />
        </g>
        {/* Three fracture lines — flash at break moment */}
        <line className="cl-aster-fracture cl-aster-fracture-1" x1="2" y1="50" x2="26" y2="64" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round"/>
        <line className="cl-aster-fracture cl-aster-fracture-2" x1="5" y1="56" x2="20" y2="44" stroke="#f97316" strokeWidth="1.0" strokeLinecap="round"/>
        <line className="cl-aster-fracture cl-aster-fracture-3" x1="2" y1="43" x2="16" y2="55" stroke="#f97316" strokeWidth="0.6" strokeLinecap="round"/>
      </svg>

      {/* Shockwave rings — emanate at chip-break moment */}
      <span className="cl-ring cl-ring-1" aria-hidden="true" />
      <span className="cl-ring cl-ring-2" aria-hidden="true" />
      <span className="cl-ring cl-ring-3" aria-hidden="true" />
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TIMING — single source of truth, all ms values.
   ───────────────────────────────────────────────────────────── */
const TIMING = {
  WINDUP_END: 600,    // 0-600ms    windup + anticipation
  TRAVEL_END: 1900,   // 600-1900ms roll across wordmark
  HALT_END:   2260,   // 1900-2260ms  overshoot + spring
  BREAK_END:  2800,   // 2260-2800ms  chip snap + shockwave
  TOTAL:      2800,
};
// Percentages (used as literal values in keyframes below)
// WINDUP_END ≈ 21.4%  TRAVEL_END ≈ 67.9%  HALT_END ≈ 80.7%

export default function SiteHeader({ scrollWork = false }) {
  const brandRef   = useRef(null);
  const wordmarkRef = useRef(null);
  const [travelEnd, setTravelEnd] = useState(160);

  useEffect(() => {
    const measure = () => {
      if (!brandRef.current || !wordmarkRef.current) return;
      const bRect = brandRef.current.getBoundingClientRect();
      const wRect = wordmarkRef.current.getBoundingClientRect();
      /*
        The SVG starts at brand's left edge.
        We want it to travel to 24px PAST the wordmark's right edge.
        travelEnd = (wordmarkRight - brandLeft) + overshoot
      */
      const overshoot = 24;
      setTravelEnd(Math.max(100, wRect.right - bRect.left + overshoot));
    };

    // Measure immediately (rough estimate with fallback font)
    measure();
    // Re-measure once the custom font is loaded for pixel-perfect accuracy
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleWork = useCallback(() => {
    if (scrollWork) {
      document.getElementById("work-section")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#work-section";
    }
  }, [scrollWork]);

  /*
    Letter hit timing: wheel passes over all 12 letters in the travel window.
    HIT_BASE = WINDUP_END + 60ms offset (wheel already in motion)
    HIT_RANGE spread evenly across 11 gaps.
  */
  const HIT_BASE  = TIMING.WINDUP_END + 60;
  const HIT_RANGE = TIMING.TRAVEL_END - HIT_BASE - 100;
  const HIT_STEP  = HIT_RANGE / 11;

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');

        .cl-nav-wrap *, .cl-nav-wrap *::before, .cl-nav-wrap *::after {
          font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif;
          box-sizing: border-box;
        }

        /* ═══════════════════════════════════════════════════════
           NAV — dynamic height via content, smooth padding change
           ═══════════════════════════════════════════════════════ */
        .cl-nav-wrap {
          overflow: visible;
          transition: padding 0.3s cubic-bezier(0.4,0,0.2,1);
        }

        /* ─────────────────────────────────────────────
           BRAND — spring scale on hover
           ───────────────────────────────────────────── */
        .cl-brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          line-height: 1;
          position: relative;
          padding: 8px 4px;
          transform-origin: left center;
          transition: transform 0.55s cubic-bezier(0.34,1.58,0.4,1);
        }
        .cl-brand:hover { transform: scale(1.1); }

        /* Impact flash — white radial bloom from logo position at halt */
        .cl-brand::before {
          content: '';
          position: absolute;
          inset: -12px -8px;
          background: radial-gradient(ellipse at 12% 50%,
            rgba(255,255,255,0.92) 0%,
            rgba(249,115,22,0.75)  14%,
            rgba(249,115,22,0.2)   32%,
            transparent            58%);
          opacity: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          z-index: 30;
          border-radius: 6px;
        }
        .cl-brand:hover::before {
          animation: cl-impact-flash ${TIMING.TOTAL}ms linear forwards;
        }
        @keyframes cl-impact-flash {
          0%,79.5% { opacity:0; }
          81%      { opacity:1; }
          84%      { opacity:0.5; }
          88%      { opacity:0; }
          100%     { opacity:0; }
        }

        /* ─────────────────────────────────────────────
           ASTERISK WRAPPER
           ───────────────────────────────────────────── */
        .cl-aster-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* Persistent orange glow — grows at break */
        .cl-aster-wrap::after {
          content: '';
          position: absolute;
          inset: -28px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center,
            rgba(249,115,22,0.7)  0%,
            rgba(249,115,22,0.35) 30%,
            transparent           68%);
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity;
        }
        .cl-brand:hover .cl-aster-wrap::after {
          animation: cl-aster-glow ${TIMING.TOTAL}ms linear forwards;
        }
        @keyframes cl-aster-glow {
          0%,78%  { opacity:0; transform:scale(0.5); }
          82%     { opacity:1; transform:scale(1.3); }
          87%     { opacity:0.8; transform:scale(1.7); }
          92%     { opacity:0.3; transform:scale(2.2); }
          100%    { opacity:0; transform:scale(2.6); }
        }

        /* ─────────────────────────────────────────────
           ASTERISK SVG — the rolling wheel
           ───────────────────────────────────────────── */
        .cl-aster-svg {
          width: auto;
          height: 1.1em;
          display: block;
          position: relative;
          z-index: 6;
          transform-origin: center center;
          will-change: transform;
        }
        .cl-aster-path, .cl-aster-chip-path {
          fill: #ffffff;
          transition: fill 0.35s ease;
        }
        .cl-aster-chip-path { transform-origin: 10px 60px; }
        .cl-aster-fracture  { opacity: 0; }

        /* ═══════════════════════════════════════════════════════
           ★ WHEEL ROLL SEQUENCE — ${TIMING.TOTAL}ms, linear timing.
           Keyframe placement encodes all physics.
           Phases: anticipation → windup → travel → squash-halt → settle
           ═══════════════════════════════════════════════════════ */
        .cl-brand:hover .cl-aster-svg {
          animation: cl-aster-journey ${TIMING.TOTAL}ms linear forwards;
        }
        .cl-brand:hover .cl-aster-path,
        .cl-brand:hover .cl-aster-chip-path { fill: #f97316; }

        @keyframes cl-aster-journey {
          /* ─── ANTICIPATION — brief pull-back before launch ─── */
          0%   { transform: translateX(0)    translateY(0)    scale(1)      rotate(0deg); }
          4%   { transform: translateX(-3px) translateY(1px)  scale(0.9)    rotate(-22deg); }

          /* ─── WINDUP — scale up, accelerate rotation ─── */
          11%  { transform: translateX(0)    translateY(-1px) scale(1.18)   rotate(162deg); }
          21%  { transform: translateX(3px)  translateY(0)    scale(1.38)   rotate(576deg); }

          /* ─── TRAVEL — smooth roll across wordmark ───
             Y oscillation (±2–3px) simulates wheel riding over each letter.
             Spin is proportional to distance (~9 full revolutions at peak).  */
          29%  { transform: translateX(calc(var(--travel-end)*0.13)) translateY(-3px) scale(1.38) rotate(1116deg); }
          37%  { transform: translateX(calc(var(--travel-end)*0.28)) translateY(2.5px) scale(1.38) rotate(1764deg); }
          45%  { transform: translateX(calc(var(--travel-end)*0.45)) translateY(-3px) scale(1.38) rotate(2448deg); }
          53%  { transform: translateX(calc(var(--travel-end)*0.62)) translateY(2.5px) scale(1.38) rotate(3132deg); }
          61%  { transform: translateX(calc(var(--travel-end)*0.81)) translateY(-2px) scale(1.38) rotate(3780deg); }
          68%  { transform: translateX(var(--travel-end))            translateY(0)    scale(1.38) rotate(4176deg); }

          /* ─── HALT — squash on impact, spring back ───
             scale(x,y): squash wide on overshoot, tall on rebound */
          72%  { transform: translateX(calc(var(--travel-end) + 18px)) translateY(-6px) scale(1.6,0.68)  rotate(4320deg); }
          77%  { transform: translateX(calc(var(--travel-end) -  9px)) translateY(4px)  scale(0.82,1.24) rotate(4284deg); }
          81%  { transform: translateX(var(--travel-end))              translateY(0)    scale(1.30,1)    rotate(4298deg); }

          /* ─── SETTLE — breathe down after impact ─── */
          88%  { transform: translateX(var(--travel-end)) translateY(0) scale(1.26) rotate(4298deg); }
          100% { transform: translateX(var(--travel-end)) translateY(0) scale(1.22) rotate(4298deg); }
        }

        /* ─── CHIP BREAK — violent snap-off, flies off and disappears ─── */
        .cl-brand:hover .cl-aster-chip-path {
          animation: cl-chip-break ${TIMING.TOTAL}ms linear forwards;
        }
        @keyframes cl-chip-break {
          0%,80%  { transform: translate(0,0)      rotate(0deg);   opacity:1; }
          /* Micro-shudder at halt */
          83%     { transform: translate(-3px,4px)  rotate(-14deg); opacity:1; }
          /* Violent snap — fragment accelerates away */
          88%     { transform: translate(-12px,18px) rotate(-44deg); opacity:0.95; }
          94%     { transform: translate(-24px,36px) rotate(-78deg); opacity:0.65; }
          /* Completely flies off — disappears */
          100%    { transform: translate(-34px,50px) rotate(-105deg); opacity:0; }
        }

        /* ─── FRACTURE LINES — bright flash at break ─── */
        .cl-brand:hover .cl-aster-fracture {
          animation: cl-fracture-flash ${TIMING.TOTAL}ms linear forwards;
        }
        .cl-brand:hover .cl-aster-fracture-2 { animation-delay: 28ms; }
        .cl-brand:hover .cl-aster-fracture-3 { animation-delay: 60ms; }
        @keyframes cl-fracture-flash {
          0%,80%  { opacity:0; }
          82%     { opacity:0; }
          83%     { opacity:1; }
          88%     { opacity:0.75; }
          96%     { opacity:0.1; }
          100%    { opacity:0; }
        }

        /* ─── SHOCKWAVE RINGS — three concentric pulses ─── */
        .cl-ring {
          position: absolute;
          top: 50%; left: 50%;
          width: 56px; height: 56px;
          margin-top: -28px; margin-left: -28px;
          border-radius: 50%;
          border: 2.5px solid rgba(249,115,22,1);
          opacity: 0;
          transform: scale(0);
          pointer-events: none;
          will-change: transform, opacity;
          z-index: 5;
        }
        .cl-ring-2 { border-color: rgba(255,255,255,0.85); border-width: 1.5px; }
        .cl-ring-3 { border-color: rgba(249,115,22,0.6);  border-width: 1px;   }
        .cl-brand:hover .cl-ring-1 {
          animation: cl-shockwave ${TIMING.TOTAL}ms linear forwards;
        }
        .cl-brand:hover .cl-ring-2 {
          animation: cl-shockwave ${TIMING.TOTAL}ms linear ${80}ms forwards;
        }
        .cl-brand:hover .cl-ring-3 {
          animation: cl-shockwave ${TIMING.TOTAL}ms linear ${160}ms forwards;
        }
        @keyframes cl-shockwave {
          0%,80%  { transform:scale(0); opacity:0; }
          82%     { transform:scale(0.15); opacity:1; }
          88%     { transform:scale(3.2); opacity:0.55; }
          95%     { transform:scale(6.0); opacity:0.15; }
          100%    { transform:scale(8.0); opacity:0; }
        }

        /* ═══════════════════════════════════════════════════════
           WORDMARK
           ═══════════════════════════════════════════════════════ */
        .cl-wordmark {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.005em;
          line-height: 1;
          color: #ffffff;
          margin: 0; padding: 0;
          display: inline-flex;
          align-items: center;
          height: 1em;
          position: relative;
        }
        @media(min-width:768px){ .cl-wordmark{ font-size:1.4rem; } }
        .cl-wordmark-space { display:inline-block; width:0.32em; }

        .cl-sr-only, .cl-split-sr {
          position:absolute; width:1px; height:1px;
          overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap;
        }

        /* ─────────────────────────────────────────────
           SPLIT LETTER — two halves, blade-cut style
           ───────────────────────────────────────────── */
        .cl-split-letter {
          position: relative;
          display: inline-block;
          line-height: 1;
        }
        .cl-split-base {
          display: inline-block;
          color: transparent;
          pointer-events: none;
        }
        .cl-split-piece {
          position: absolute;
          inset: 0;
          display: inline-block;
          pointer-events: none;
          transform: translate(0,0) rotate(0deg);
          transform-origin: center center;
          opacity: 1;
          /* Return (mouse-leave) — spring snap back */
          transition:
            transform 0.6s cubic-bezier(0.34,1.45,0.5,1),
            opacity   0.45s ease;
        }
        .cl-piece-main   { color: #ffffff; }
        .cl-piece-studio { color: #f97316; }

        /* ON HOVER — fly apart when wheel passes over */
        .cl-brand:hover .cl-split-piece {
          transform: translate(var(--pdx),var(--pdy)) rotate(var(--pr));
          opacity: 0;
          transition:
            transform 1.05s cubic-bezier(0.16,0.7,0.3,1) var(--hit-delay),
            opacity   0.95s cubic-bezier(0.4,0,0.6,1)    var(--hit-delay);
        }

        /* Cut-line flash — horizontal blade at contact point */
        .cl-split-letter::before {
          content:'';
          position:absolute;
          left:-2px; right:-2px;
          top:44%; height:3px;
          background:linear-gradient(90deg,
            transparent 0%,
            rgba(255,255,255,0.95) 22%,
            rgba(249,115,22,0.9)   50%,
            rgba(255,255,255,0.95) 78%,
            transparent 100%);
          transform:scaleX(0);
          transform-origin:center;
          opacity:0;
          pointer-events:none;
          z-index:10;
        }
        .cl-brand:hover .cl-split-letter::before {
          animation: cl-cut-line 0.4s cubic-bezier(0.05,0.95,0.15,1) forwards;
          animation-delay: var(--hit-delay);
        }
        @keyframes cl-cut-line {
          0%   { opacity:0; transform:scaleX(0); }
          15%  { opacity:1; transform:scaleX(1.2); }
          55%  { opacity:0.7; transform:scaleX(1); }
          100% { opacity:0; transform:scaleX(0.9); }
        }

        /* Impact bloom per letter */
        .cl-split-letter::after {
          content:'';
          position:absolute;
          inset:-6px -3px;
          background:radial-gradient(ellipse at center,
            rgba(255,255,255,0.5) 0%,
            rgba(249,115,22,0.3)  25%,
            transparent 65%);
          opacity:0;
          pointer-events:none;
          mix-blend-mode:screen;
        }
        .cl-brand:hover .cl-split-letter::after {
          animation: cl-letter-flash 0.42s ease forwards;
          animation-delay: var(--hit-delay);
        }
        @keyframes cl-letter-flash {
          0%   { opacity:0; }
          12%  { opacity:1; }
          55%  { opacity:0.3; }
          100% { opacity:0; }
        }

        /* ═══════════════════════════════════════════════════════
           NAV ITEM — KATANA CUT (proven, untouched)
           ═══════════════════════════════════════════════════════ */
        .cl-nav-item {
          position:relative; display:inline-block; padding:12px 24px;
          cursor:pointer; user-select:none; overflow:visible;
          background:none; border:none; text-decoration:none;
          font-family:inherit; line-height:1;
        }
        .cl-nav-sr {
          position:absolute; width:1px; height:1px;
          overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap;
        }
        .cl-nav-top, .cl-nav-bottom {
          display:block; font-size:0.82rem; font-weight:500;
          letter-spacing:0.09em; color:#9ca3af; line-height:1;
          white-space:nowrap; text-transform:uppercase; will-change:transform;
          transition:transform 0.45s cubic-bezier(0.34,1.7,0.4,1), color 0.25s ease;
        }
        .cl-nav-top    { clip-path:polygon(0% 0%,100% 0%,100% 32%,0% 68%); }
        .cl-nav-bottom { clip-path:polygon(0% 68%,100% 32%,100% 100%,0% 100%); margin-top:-1em; }
        .cl-nav-item:hover .cl-nav-top    { transform:translate(4.8px,-13.2px) skewX(20deg); color:#ffffff; }
        .cl-nav-item:hover .cl-nav-bottom { transform:translate(-4.8px,13.2px) skewX(20deg); color:#ffffff; }
        .cl-nav-slash {
          position:absolute; top:60%; left:-28px; right:-28px; height:2.5px;
          transform:translateY(-50%) scaleX(0) rotate(-10deg);
          transform-origin:left center;
          transition:transform 0.36s cubic-bezier(0.05,0.95,0.15,1);
          pointer-events:none; z-index:25; display:flex; align-items:center;
          filter:drop-shadow(0 0 5px #f97316) drop-shadow(0 0 12px rgba(249,115,22,0.7)) drop-shadow(0 0 2px rgba(255,255,255,1));
        }
        .cl-nav-item:hover .cl-nav-slash { transform:translateY(-50%) scaleX(1) rotate(-10deg); }
        .cl-nav-slash-blade {
          flex:1; height:100%;
          background:linear-gradient(90deg,transparent 0%,rgba(249,115,22,0) 3%,#f97316 10%,#ffb347 28%,#ffffff 48%,#ffffff 52%,#ffd99c 72%,#f97316 90%,rgba(249,115,22,0) 97%,transparent 100%);
          clip-path:polygon(0% 35%,96% 8%,100% 50%,96% 92%,0% 65%);
          border-radius:1px;
        }
        .cl-nav-slash-flash {
          position:absolute; top:50%; left:0; right:0; height:3.5px;
          transform:translateY(-50%) translateX(-130%);
          background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,1) 50%,transparent 100%);
          filter:blur(1.4px); pointer-events:none; opacity:0;
        }
        .cl-nav-item:hover .cl-nav-slash-flash { animation:cl-flash 0.3s cubic-bezier(0.05,0.95,0.15,1) forwards; }
        @keyframes cl-flash {
          0%   { transform:translateY(-50%) translateX(-130%); opacity:0; }
          12%  { opacity:1; }
          70%  { opacity:0.95; }
          100% { transform:translateY(-50%) translateX(130%); opacity:0; }
        }
        .cl-nav-slash-spark {
          position:absolute; right:-6px; top:50%;
          transform:translateY(-50%) scale(0);
          width:10px; height:10px; border-radius:50%;
          background:radial-gradient(circle,rgba(255,255,255,1) 0%,rgba(255,220,150,0.9) 30%,rgba(249,115,22,0.5) 60%,transparent 100%);
          filter:blur(0.8px); pointer-events:none; opacity:0;
        }
        .cl-nav-item:hover .cl-nav-slash-spark { animation:cl-spark 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.24s forwards; }
        @keyframes cl-spark {
          0%   { transform:translateY(-50%) scale(0); opacity:0; }
          30%  { transform:translateY(-50%) scale(3); opacity:1; }
          100% { transform:translateY(-50%) scale(0.5); opacity:0; }
        }
        .cl-nav-slash-afterimage {
          position:absolute; inset:0;
          background:linear-gradient(90deg,transparent 0%,rgba(249,115,22,0) 5%,rgba(249,115,22,0.4) 30%,rgba(255,200,120,0.6) 50%,rgba(249,115,22,0.4) 70%,rgba(249,115,22,0) 95%,transparent 100%);
          filter:blur(3px); opacity:0; transform:scaleX(0.8); transform-origin:left center;
        }
        .cl-nav-item:hover .cl-nav-slash-afterimage { animation:cl-afterimage 0.55s cubic-bezier(0.05,0.95,0.15,1) 0.08s forwards; }
        @keyframes cl-afterimage {
          0%   { opacity:0; transform:scaleX(0); }
          30%  { opacity:0.9; transform:scaleX(1.1); }
          100% { opacity:0; transform:scaleX(1); }
        }
        .cl-nav-impact {
          position:absolute; inset:-8px;
          background:radial-gradient(ellipse at center,rgba(249,115,22,0.18) 0%,rgba(249,115,22,0.06) 30%,transparent 70%);
          opacity:0; pointer-events:none; z-index:1; mix-blend-mode:screen;
        }
        .cl-nav-item:hover .cl-nav-impact { animation:cl-impact 0.55s cubic-bezier(0.05,0.95,0.15,1) forwards; }
        @keyframes cl-impact {
          0%   { opacity:0; transform:scale(0.8); }
          15%  { opacity:1; transform:scale(1.1); }
          100% { opacity:0; transform:scale(1); }
        }
        .cl-nav-speedlines { position:absolute; inset:-20px; pointer-events:none; z-index:2; overflow:visible; }
        .cl-speedline {
          position:absolute; height:1px;
          background:linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.8) 40%,rgba(249,115,22,0.9) 60%,transparent 100%);
          transform-origin:left center; opacity:0;
          filter:drop-shadow(0 0 2px rgba(249,115,22,0.8));
        }
        .cl-speedline-1 { top:35%; left:-40px; width:30px; }
        .cl-speedline-2 { top:48%; left:-50px; width:22px; }
        .cl-speedline-3 { top:62%; left:-36px; width:35px; }
        .cl-speedline-4 { top:72%; left:-28px; width:18px; }
        .cl-speedline-5 { top:28%; left:-32px; width:26px; }
        .cl-nav-item:hover .cl-speedline { animation:cl-speedline 0.42s cubic-bezier(0.05,0.95,0.15,1) forwards; }
        .cl-nav-item:hover .cl-speedline-1 { animation-delay:0.02s; }
        .cl-nav-item:hover .cl-speedline-2 { animation-delay:0.06s; }
        .cl-nav-item:hover .cl-speedline-3 { animation-delay:0s; }
        .cl-nav-item:hover .cl-speedline-4 { animation-delay:0.08s; }
        .cl-nav-item:hover .cl-speedline-5 { animation-delay:0.04s; }
        @keyframes cl-speedline {
          0%   { opacity:0; transform:translateX(-30px) rotate(-10deg) scaleX(0); }
          25%  { opacity:1; transform:translateX(0) rotate(-10deg) scaleX(1); }
          70%  { opacity:1; transform:translateX(20px) rotate(-10deg) scaleX(1); }
          100% { opacity:0; transform:translateX(60px) rotate(-10deg) scaleX(0.5); }
        }
        .cl-nav-debris { position:absolute; top:60%; left:50%; width:1px; height:1px; pointer-events:none; z-index:24; }
        .cl-ember {
          position:absolute; width:3px; height:3px; border-radius:50%;
          background:radial-gradient(circle,#ffffff 0%,#ffd99c 40%,#f97316 80%,transparent 100%);
          filter:drop-shadow(0 0 3px #f97316) drop-shadow(0 0 6px rgba(249,115,22,0.6));
          opacity:0; top:0; left:0;
        }
        .cl-nav-item:hover .cl-ember { animation:cl-ember-fly 0.7s cubic-bezier(0.16,0.7,0.3,1) 0.22s forwards; }
        .cl-nav-item:hover .cl-ember-1 { --ex:24px;  --ey:-8px;  animation-delay:0.22s; }
        .cl-nav-item:hover .cl-ember-2 { --ex:32px;  --ey:-14px; animation-delay:0.26s; }
        .cl-nav-item:hover .cl-ember-3 { --ex:18px;  --ey:6px;   animation-delay:0.24s; }
        .cl-nav-item:hover .cl-ember-4 { --ex:38px;  --ey:-4px;  animation-delay:0.20s; }
        .cl-nav-item:hover .cl-ember-5 { --ex:14px;  --ey:12px;  animation-delay:0.28s; }
        .cl-nav-item:hover .cl-ember-6 { --ex:28px;  --ey:2px;   animation-delay:0.25s; }
        @keyframes cl-ember-fly {
          0%   { opacity:0; transform:translate(0,0) scale(0); }
          20%  { opacity:1; transform:translate(calc(var(--ex)*0.3),calc(var(--ey)*0.3)) scale(1.5); }
          70%  { opacity:0.7; transform:translate(calc(var(--ex)*0.85),calc(var(--ey)*0.85)) scale(1); }
          100% { opacity:0; transform:translate(var(--ex),var(--ey)) scale(0.3); }
        }

        /* ─── CONTACT BUTTON ─── */
        .cl-contact-btn {
          position:relative; overflow:hidden;
          border:1.5px solid #f97316; color:#f97316;
          padding:0; width:110px; height:36px; border-radius:0;
          font-size:0.7rem; letter-spacing:0.18em; text-transform:uppercase;
          font-weight:700; cursor:pointer; background:transparent;
          transition:color 0.28s ease; display:inline-flex;
          align-items:center; justify-content:center;
          clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
          font-family:inherit; text-decoration:none;
        }
        .cl-contact-btn::before {
          content:''; position:absolute; inset:0; background:#f97316;
          clip-path:polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%);
          transform:translateX(-105%);
          transition:transform 0.3s cubic-bezier(0.76,0,0.24,1); z-index:0;
        }
        .cl-contact-btn:hover::before { transform:translateX(0); }
        .cl-contact-btn:hover { color:#000; }
        .cl-contact-btn-inner { position:relative; z-index:1; display:flex; align-items:center; gap:6px; line-height:1; }
        .cl-contact-arrow { color:#f97316; transition:color 0.28s ease, transform 0.2s ease; font-size:0.85rem; }
        .cl-contact-btn:hover .cl-contact-arrow { color:#000; transform:translateX(3px); }
        .cl-insta { display:flex; align-items:center; justify-content:center; color:#fff; transition:color 0.2s ease; }
        .cl-insta:hover { color:#f97316; }

        /* ─── REDUCED MOTION ─── */
        @media (prefers-reduced-motion: reduce) {
          .cl-brand:hover .cl-aster-svg,
          .cl-brand:hover .cl-aster-chip-path,
          .cl-brand:hover .cl-aster-fracture,
          .cl-brand:hover .cl-ring,
          .cl-brand:hover .cl-aster-wrap::after,
          .cl-brand:hover::before,
          .cl-brand:hover .cl-split-piece,
          .cl-brand:hover .cl-split-letter::before,
          .cl-brand:hover .cl-split-letter::after,
          .cl-nav-item:hover .cl-speedline,
          .cl-nav-item:hover .cl-ember,
          .cl-nav-item:hover .cl-nav-slash-flash,
          .cl-nav-item:hover .cl-nav-slash-spark,
          .cl-nav-item:hover .cl-nav-slash-afterimage,
          .cl-nav-item:hover .cl-nav-impact { animation:none !important; }
          .cl-brand { transition:none !important; }
        }
      `}</style>

      <nav className="cl-nav-wrap sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 md:py-5 backdrop-blur-md bg-black/55 border-b border-zinc-900">

        <Link href="/">
          <div
            ref={brandRef}
            className="cl-brand"
            aria-label="UNFLTR STUDIO — Home"
            style={{ "--travel-end": `${travelEnd}px` }}
          >
            <AsteriskLogo />

            <h1 className="cl-wordmark" ref={wordmarkRef}>
              <span className="cl-sr-only">UNFLTR STUDIO</span>

              <span aria-hidden="true" style={{ display:"inline-flex", alignItems:"center" }}>
                {["U","N","F","L","T","R"].map((ch, i) => (
                  <SplitLetter
                    key={`u${i}`}
                    ch={ch}
                    isStudio={false}
                    hitDelay={Math.round(HIT_BASE + i * HIT_STEP)}
                  />
                ))}
                <span className="cl-wordmark-space" />
                {["S","T","U","D","I","O"].map((ch, i) => (
                  <SplitLetter
                    key={`s${i}`}
                    ch={ch}
                    isStudio={true}
                    hitDelay={Math.round(HIT_BASE + (i + 6) * HIT_STEP)}
                  />
                ))}
              </span>
            </h1>
          </div>
        </Link>

        <div className="hidden md:flex items-center">
          <NavItem href="/services" label="Services" />
          <NavItem href="#"         label="Work"     onClick={handleWork} />
          <NavItem href="/clients"  label="Clients" />
          <NavItem href="/about"    label="About" />
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ=="
            target="_blank" rel="noopener noreferrer"
            className="cl-insta" aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="6" ry="6" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none"/>
              <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor"/>
            </svg>
          </a>
          <Link href="/contact" className="cl-contact-btn">
            <span className="cl-contact-btn-inner">
              <span className="cl-contact-arrow">→</span>Contact
            </span>
          </Link>
        </div>

      </nav>
    </>
  );
}
