"use client";
import Link from "next/link";
import { useCallback } from "react";

/* ─────────────────────────────────────────────────────────────────
   NAV ITEM — KATANA CUT (unchanged, working perfectly)
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
   SHATTERED LETTER COMPONENT
   ─────────────────────────────────────────────────────────────
   Each letter is rendered as a single semantic <span> for screen readers,
   plus N overlapping aria-hidden duplicates — each clipped to a unique
   jagged polygon shard. On brand hover, each shard transforms along its
   own trajectory (dx/dy/rotate) defined via CSS custom properties.

   Shape vocabulary (clip-paths chosen to look like real fracture lines):
   - 3-shard letters (U): asymmetric vertical-ish split + diagonal break
   - 2-shard letters (F, N, L, T, R): one jagged diagonal fracture
   ───────────────────────────────────────────────────────────── */

const SHARD_MAP = {
  U: [
    { clip: "polygon(0% 0%, 42% 0%, 38% 38%, 48% 62%, 30% 100%, 0% 100%)",     dx:-18, dy:-6, r:-14 },
    { clip: "polygon(42% 0%, 78% 0%, 70% 30%, 82% 64%, 62% 100%, 30% 100%, 48% 62%, 38% 38%)", dx: 4, dy:14, r: 8 },
    { clip: "polygon(78% 0%, 100% 0%, 100% 100%, 62% 100%, 82% 64%, 70% 30%)", dx:16, dy:-4, r:18 },
  ],
  N: [
    { clip: "polygon(0% 0%, 36% 0%, 52% 48%, 30% 78%, 0% 100%)",            dx:-14, dy: 8, r:-12 },
    { clip: "polygon(36% 0%, 70% 0%, 82% 36%, 56% 70%, 30% 78%, 52% 48%)",  dx:  6, dy:-4, r:  6 },
    { clip: "polygon(70% 0%, 100% 0%, 100% 100%, 56% 70%, 82% 36%)",         dx: 18, dy:10, r: 16 },
  ],
  F: [
    { clip: "polygon(0% 0%, 100% 0%, 100% 22%, 40% 30%, 48% 58%, 30% 100%, 0% 100%)", dx:-12, dy:-8, r:-10 },
    { clip: "polygon(40% 30%, 100% 22%, 100% 60%, 48% 58%, 30% 100%, 100% 100%)",     dx: 14, dy:12, r: 14 },
  ],
  L: [
    { clip: "polygon(0% 0%, 38% 0%, 30% 62%, 20% 100%, 0% 100%)",              dx:-10, dy:-10, r:-14 },
    { clip: "polygon(38% 0%, 100% 0%, 100% 100%, 20% 100%, 30% 62%)",          dx: 12, dy:  8, r:  8 },
  ],
  T: [
    { clip: "polygon(0% 0%, 100% 0%, 100% 26%, 58% 22%, 60% 100%, 40% 100%, 38% 22%, 0% 26%)", dx:-8,  dy:-12, r:-8 },
    { clip: "polygon(38% 22%, 62% 22%, 60% 100%, 40% 100%)",                                    dx: 0,  dy: 16, r: 6 },
    { clip: "polygon(58% 22%, 100% 26%, 100% 100%, 60% 100%)",                                  dx: 14, dy: 6,  r: 14 },
  ],
  R: [
    { clip: "polygon(0% 0%, 56% 0%, 60% 38%, 38% 56%, 50% 100%, 0% 100%)",                 dx:-14, dy:-6, r:-12 },
    { clip: "polygon(56% 0%, 100% 0%, 100% 44%, 60% 38%)",                                  dx: 12, dy:-10, r: 10 },
    { clip: "polygon(60% 38%, 100% 44%, 100% 100%, 50% 100%, 38% 56%)",                     dx: 10, dy: 14, r: 18 },
  ],
};

function ShatteredLetter({ ch, isStudio, letterIndex }) {
  const shards = SHARD_MAP[ch] || [{ clip: "none", dx: 0, dy: 0, r: 0 }];

  return (
    <span
      className="cl-shatter-letter"
      style={{ "--li": letterIndex }}
    >
      {/* Screen-reader-visible base layer (also provides intrinsic sizing) */}
      <span className="cl-shatter-base">{ch}</span>

      {/* Visual shards stacked over the base, clipped to fracture polygons */}
      {shards.map((s, i) => (
        <span
          key={i}
          className={`cl-shard ${isStudio ? "cl-shard-studio" : "cl-shard-main"}`}
          aria-hidden="true"
          style={{
            clipPath: s.clip,
            WebkitClipPath: s.clip,
            "--dx": `${s.dx}px`,
            "--dy": `${s.dy}px`,
            "--r":  `${s.r}deg`,
            /* Stagger so the shatter ripples slightly */
            transitionDelay: `${i * 14 + letterIndex * 8}ms`,
          }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function SiteHeader({ scrollWork = false }) {
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

        .cl-nav-wrap *, .cl-nav-wrap *::before, .cl-nav-wrap *::after {
          font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif;
          box-sizing: border-box;
        }

        /* ─────────────────────────────────────────────
           BRAND CONTAINER — locked vertical bounding box
           ───────────────────────────────────────────── */
        .cl-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          line-height: 1;
          position: relative;
        }

        .cl-logo-svg {
          width: auto;
          height: 1.05em;
          flex-shrink: 0;
          display: block;
          transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-origin: center;
        }
        .cl-logo-path { fill: #ffffff; transition: fill 0.3s ease; }
        .cl-brand:hover .cl-logo-svg  { transform: rotate(180deg) scale(1.15); }
        .cl-brand:hover .cl-logo-path { fill: #f97316; }

        .cl-wordmark {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: -0.005em;
          line-height: 1;
          color: #ffffff;
          margin: 0;
          padding: 0;
          display: inline-flex;
          align-items: center;
          height: 1em;
        }
        @media(min-width: 768px) { .cl-wordmark { font-size: 1.4rem; } }
        .cl-wordmark-space { display: inline-block; width: 0.32em; }

        /* ─────────────────────────────────────────────
           SHATTERED LETTER
           ─────────────────────────────────────────────
           .cl-shatter-letter — inline-block container, holds base + N shards
           .cl-shatter-base   — invisible-but-occupies-space original letter
                                (provides intrinsic width/height for layout)
           .cl-shard          — absolutely positioned duplicate, clip-pathed
                                to one fracture polygon
           ───────────────────────────────────────────── */
        .cl-shatter-letter {
          position: relative;
          display: inline-block;
          /* Critical: keep the layout intact regardless of shard transforms */
          line-height: 1;
        }

        /* Base letter — invisible but provides natural sizing */
        .cl-shatter-base {
          display: inline-block;
          color: transparent;          /* hide visually */
          /* Important: still rendered so width/height are computed naturally */
          pointer-events: none;
        }

        /* Each shard is a positioned duplicate */
        .cl-shard {
          position: absolute;
          inset: 0;
          display: inline-block;
          color: #ffffff;
          will-change: transform, opacity;
          /*
            VIOLENT SNAPPY OVERSHOOT
            (0.08, 0.82, 0.17, 1) — explosive acceleration, snap settle.
          */
          transition:
            transform 0.48s cubic-bezier(0.08, 0.82, 0.17, 1),
            opacity   0.28s ease;
          pointer-events: none;
          /* Reset state — all shards align exactly over the base */
          transform: translate(0, 0) rotate(0deg);
          transform-origin: center center;
        }
        .cl-shard-studio { color: #f97316; }

        /* ★ THE SHATTER ★ — fly outward along per-shard trajectories */
        .cl-brand:hover .cl-shard {
          transform: translate(var(--dx), var(--dy)) rotate(var(--r));
        }

        /* ─────────────────────────────────────────────
           FRACTURE FLASH — white-hot line that streaks
           across the wordmark at the moment of impact
           ───────────────────────────────────────────── */
        .cl-fracture-flash {
          position: absolute;
          top: 50%; left: -8px; right: -8px;
          height: 2px;
          transform: translateY(-50%) scaleX(0) rotate(-8deg);
          transform-origin: left center;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.95) 35%,
            rgba(249, 115, 22, 1) 50%,
            rgba(255, 255, 255, 0.95) 65%,
            transparent 100%
          );
          filter:
            drop-shadow(0 0 4px #f97316)
            drop-shadow(0 0 8px rgba(249, 115, 22, 0.7))
            drop-shadow(0 0 2px rgba(255, 255, 255, 1));
          pointer-events: none;
          z-index: 5;
          opacity: 0;
        }
        .cl-brand:hover .cl-fracture-flash {
          animation: cl-fracture-flash 0.42s cubic-bezier(0.08, 0.82, 0.17, 1) 0.02s forwards;
        }
        @keyframes cl-fracture-flash {
          0%   { transform: translateY(-50%) scaleX(0) rotate(-8deg); opacity: 0; }
          15%  { opacity: 1; }
          50%  { transform: translateY(-50%) scaleX(1) rotate(-8deg); opacity: 1; }
          100% { transform: translateY(-50%) scaleX(1.2) rotate(-8deg); opacity: 0; }
        }

        /* Impact pulse — quick orange glow behind the wordmark */
        .cl-wordmark-impact {
          position: absolute;
          inset: -10px -20px;
          background: radial-gradient(
            ellipse at center,
            rgba(249, 115, 22, 0.22) 0%,
            rgba(249, 115, 22, 0.05) 50%,
            transparent 80%
          );
          opacity: 0;
          pointer-events: none;
          z-index: -1;
          mix-blend-mode: screen;
        }
        .cl-brand:hover .cl-wordmark-impact {
          animation: cl-impact-pulse 0.55s cubic-bezier(0.08, 0.82, 0.17, 1) forwards;
        }
        @keyframes cl-impact-pulse {
          0%   { opacity: 0; transform: scale(0.8); }
          25%  { opacity: 1; transform: scale(1.15); }
          100% { opacity: 0; transform: scale(1); }
        }

        /* ═══════════════════════════════════════════════════════════
           NAV ITEM — KATANA CUT (unchanged proven geometry)
           ═══════════════════════════════════════════════════════════ */
        .cl-nav-item {
          position: relative;
          display: inline-block;
          padding: 12px 24px;
          cursor: pointer;
          user-select: none;
          overflow: visible;
          background: none;
          border: none;
          text-decoration: none;
          font-family: inherit;
          line-height: 1;
        }
        .cl-nav-sr {
          position: absolute; width: 1px; height: 1px;
          overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap;
        }
        .cl-nav-top, .cl-nav-bottom {
          display: block;
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.09em;
          color: #9ca3af;
          line-height: 1;
          white-space: nowrap;
          text-transform: uppercase;
          will-change: transform;
          transition:
            transform 0.45s cubic-bezier(0.34, 1.7, 0.4, 1),
            color     0.25s ease;
        }
        .cl-nav-top    { clip-path: polygon(0% 0%, 100% 0%, 100% 32%, 0% 68%); }
        .cl-nav-bottom { clip-path: polygon(0% 68%, 100% 32%, 100% 100%, 0% 100%); margin-top: -1em; }
        .cl-nav-item:hover .cl-nav-top    { transform: translate(4.8px, -13.2px) skewX(20deg); color: #ffffff; }
        .cl-nav-item:hover .cl-nav-bottom { transform: translate(-4.8px, 13.2px) skewX(20deg); color: #ffffff; }

        .cl-nav-slash {
          position: absolute;
          top: 60%; left: -28px; right: -28px; height: 2.5px;
          transform: translateY(-50%) scaleX(0) rotate(-10deg);
          transform-origin: left center;
          transition: transform 0.36s cubic-bezier(0.05, 0.95, 0.15, 1);
          pointer-events: none;
          z-index: 25;
          display: flex; align-items: center;
          filter:
            drop-shadow(0 0 5px #f97316)
            drop-shadow(0 0 12px rgba(249, 115, 22, 0.7))
            drop-shadow(0 0 2px rgba(255, 255, 255, 1));
        }
        .cl-nav-item:hover .cl-nav-slash { transform: translateY(-50%) scaleX(1) rotate(-10deg); }

        .cl-nav-slash-blade {
          flex: 1; height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%, rgba(249,115,22,0) 3%,
            #f97316 10%, #ffb347 28%, #ffffff 48%, #ffffff 52%,
            #ffd99c 72%, #f97316 90%, rgba(249,115,22,0) 97%, transparent 100%
          );
          clip-path: polygon(0% 35%, 96% 8%, 100% 50%, 96% 92%, 0% 65%);
          border-radius: 1px;
        }
        .cl-nav-slash-flash {
          position: absolute;
          top: 50%; left: 0; right: 0; height: 3.5px;
          transform: translateY(-50%) translateX(-130%);
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 50%, transparent 100%);
          filter: blur(1.4px); pointer-events: none; opacity: 0;
        }
        .cl-nav-item:hover .cl-nav-slash-flash {
          animation: cl-flash 0.3s cubic-bezier(0.05, 0.95, 0.15, 1) forwards;
        }
        @keyframes cl-flash {
          0%   { transform: translateY(-50%) translateX(-130%); opacity: 0; }
          12%  { opacity: 1; }
          70%  { opacity: 0.95; }
          100% { transform: translateY(-50%) translateX(130%); opacity: 0; }
        }
        .cl-nav-slash-spark {
          position: absolute;
          right: -6px; top: 50%;
          transform: translateY(-50%) scale(0);
          width: 10px; height: 10px; border-radius: 50%;
          background: radial-gradient(circle,
            rgba(255,255,255,1) 0%, rgba(255,220,150,0.9) 30%,
            rgba(249,115,22,0.5) 60%, transparent 100%);
          filter: blur(0.8px); pointer-events: none; opacity: 0;
        }
        .cl-nav-item:hover .cl-nav-slash-spark {
          animation: cl-spark 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.24s forwards;
        }
        @keyframes cl-spark {
          0%   { transform: translateY(-50%) scale(0); opacity: 0; }
          30%  { transform: translateY(-50%) scale(3); opacity: 1; }
          100% { transform: translateY(-50%) scale(0.5); opacity: 0; }
        }
        .cl-nav-slash-afterimage {
          position: absolute; inset: 0;
          background: linear-gradient(90deg,
            transparent 0%, rgba(249,115,22,0) 5%,
            rgba(249,115,22,0.4) 30%, rgba(255,200,120,0.6) 50%,
            rgba(249,115,22,0.4) 70%, rgba(249,115,22,0) 95%, transparent 100%);
          filter: blur(3px); opacity: 0;
          transform: scaleX(0.8); transform-origin: left center;
        }
        .cl-nav-item:hover .cl-nav-slash-afterimage {
          animation: cl-afterimage 0.55s cubic-bezier(0.05, 0.95, 0.15, 1) 0.08s forwards;
        }
        @keyframes cl-afterimage {
          0%   { opacity: 0; transform: scaleX(0); }
          30%  { opacity: 0.9; transform: scaleX(1.1); }
          70%  { opacity: 0.4; }
          100% { opacity: 0; transform: scaleX(1); }
        }
        .cl-nav-impact {
          position: absolute; inset: -8px;
          background: radial-gradient(ellipse at center,
            rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.06) 30%, transparent 70%);
          opacity: 0; pointer-events: none; z-index: 1; mix-blend-mode: screen;
        }
        .cl-nav-item:hover .cl-nav-impact {
          animation: cl-impact 0.55s cubic-bezier(0.05, 0.95, 0.15, 1) forwards;
        }
        @keyframes cl-impact {
          0%   { opacity: 0; transform: scale(0.8); }
          15%  { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(1); }
        }
        .cl-nav-speedlines {
          position: absolute; inset: -20px;
          pointer-events: none; z-index: 2; overflow: visible;
        }
        .cl-speedline {
          position: absolute; height: 1px;
          background: linear-gradient(90deg, transparent 0%,
            rgba(255,255,255,0.8) 40%, rgba(249,115,22,0.9) 60%, transparent 100%);
          transform-origin: left center; opacity: 0;
          filter: drop-shadow(0 0 2px rgba(249,115,22,0.8));
        }
        .cl-speedline-1 { top: 35%; left: -40px; width: 30px; }
        .cl-speedline-2 { top: 48%; left: -50px; width: 22px; }
        .cl-speedline-3 { top: 62%; left: -36px; width: 35px; }
        .cl-speedline-4 { top: 72%; left: -28px; width: 18px; }
        .cl-speedline-5 { top: 28%; left: -32px; width: 26px; }
        .cl-nav-item:hover .cl-speedline {
          animation: cl-speedline 0.42s cubic-bezier(0.05, 0.95, 0.15, 1) forwards;
        }
        .cl-nav-item:hover .cl-speedline-1 { animation-delay: 0.02s; }
        .cl-nav-item:hover .cl-speedline-2 { animation-delay: 0.06s; }
        .cl-nav-item:hover .cl-speedline-3 { animation-delay: 0s; }
        .cl-nav-item:hover .cl-speedline-4 { animation-delay: 0.08s; }
        .cl-nav-item:hover .cl-speedline-5 { animation-delay: 0.04s; }
        @keyframes cl-speedline {
          0%   { opacity: 0; transform: translateX(-30px) rotate(-10deg) scaleX(0); }
          25%  { opacity: 1; transform: translateX(0) rotate(-10deg) scaleX(1); }
          70%  { opacity: 1; transform: translateX(20px) rotate(-10deg) scaleX(1); }
          100% { opacity: 0; transform: translateX(60px) rotate(-10deg) scaleX(0.5); }
        }
        .cl-nav-debris {
          position: absolute; top: 60%; left: 50%;
          width: 1px; height: 1px; pointer-events: none; z-index: 24;
        }
        .cl-ember {
          position: absolute; width: 3px; height: 3px; border-radius: 50%;
          background: radial-gradient(circle, #ffffff 0%, #ffd99c 40%, #f97316 80%, transparent 100%);
          filter: drop-shadow(0 0 3px #f97316) drop-shadow(0 0 6px rgba(249,115,22,0.6));
          opacity: 0; top: 0; left: 0;
        }
        .cl-nav-item:hover .cl-ember {
          animation: cl-ember-fly 0.7s cubic-bezier(0.16, 0.7, 0.3, 1) 0.22s forwards;
        }
        .cl-nav-item:hover .cl-ember-1 { --ex: 24px;  --ey: -8px;  animation-delay: 0.22s; }
        .cl-nav-item:hover .cl-ember-2 { --ex: 32px;  --ey: -14px; animation-delay: 0.26s; }
        .cl-nav-item:hover .cl-ember-3 { --ex: 18px;  --ey: 6px;   animation-delay: 0.24s; }
        .cl-nav-item:hover .cl-ember-4 { --ex: 38px;  --ey: -4px;  animation-delay: 0.20s; }
        .cl-nav-item:hover .cl-ember-5 { --ex: 14px;  --ey: 12px;  animation-delay: 0.28s; }
        .cl-nav-item:hover .cl-ember-6 { --ex: 28px;  --ey: 2px;   animation-delay: 0.25s; }
        @keyframes cl-ember-fly {
          0%   { opacity: 0; transform: translate(0, 0) scale(0); }
          20%  { opacity: 1; transform: translate(calc(var(--ex) * 0.3), calc(var(--ey) * 0.3)) scale(1.5); }
          70%  { opacity: 0.7; transform: translate(calc(var(--ex) * 0.85), calc(var(--ey) * 0.85)) scale(1); }
          100% { opacity: 0; transform: translate(var(--ex), var(--ey)) scale(0.3); }
        }

        /* ─── CONTACT BUTTON ─── */
        .cl-contact-btn {
          position: relative; overflow: hidden;
          border: 1.5px solid #f97316; color: #f97316;
          padding: 0; width: 110px; height: 36px; border-radius: 0;
          font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
          font-weight: 700; cursor: pointer; background: transparent;
          transition: color 0.28s ease; display: inline-flex;
          align-items: center; justify-content: center;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          font-family: inherit; text-decoration: none;
        }
        .cl-contact-btn::before {
          content: ''; position: absolute; inset: 0; background: #f97316;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transform: translateX(-105%);
          transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1); z-index: 0;
        }
        .cl-contact-btn:hover::before { transform: translateX(0); }
        .cl-contact-btn:hover { color: #000; }
        .cl-contact-btn-inner {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 6px; line-height: 1;
        }
        .cl-contact-arrow {
          color: #f97316;
          transition: color 0.28s ease, transform 0.2s ease;
          font-size: 0.85rem;
        }
        .cl-contact-btn:hover .cl-contact-arrow { color: #000; transform: translateX(3px); }
        .cl-insta {
          display: flex; align-items: center; justify-content: center;
          color: #fff; transition: color 0.2s ease;
        }
        .cl-insta:hover { color: #f97316; }
      `}</style>

      <nav className="cl-nav-wrap sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 backdrop-blur-md bg-black/55 border-b border-zinc-900">

        <Link href="/">
          <div className="cl-brand" aria-label="UNFLTR STUDIO — Home">

            <svg
              className="cl-logo-svg"
              viewBox="0 0 88.82 89.67"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path className="cl-logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
              <path className="cl-logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
            </svg>

            <h1 className="cl-wordmark">
              {/* Glow pulse behind wordmark at moment of shatter */}
              <span className="cl-wordmark-impact" aria-hidden="true" />

              {/* Fracture flash — high-contrast line across all letters */}
              <span className="cl-fracture-flash" aria-hidden="true" />

              {/* Screen-reader-only plain text */}
              <span style={{
                position: "absolute",
                width: "1px", height: "1px",
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
                whiteSpace: "nowrap",
              }}>
                UNFLTR STUDIO
              </span>

              {/* Visual letters — each shattered into shards on hover */}
              <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center" }}>
                {["U","N","F","L","T","R"].map((ch, i) => (
                  <ShatteredLetter key={`u${i}`} ch={ch} isStudio={false} letterIndex={i} />
                ))}
                <span className="cl-wordmark-space" />
                {["S","T","U","D","I","O"].map((ch, i) => (
                  <ShatteredLetter key={`s${i}`} ch={ch} isStudio={true} letterIndex={i + 7} />
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
              <rect x="2" y="2" width="20" height="20" rx="6" ry="6" stroke="currentColor" strokeWidth="1.8" fill="none" />
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
              <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" />
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