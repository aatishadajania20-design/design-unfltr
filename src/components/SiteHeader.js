"use client";
import Link from "next/link";
import { useCallback } from "react";

function NavItem({ href, label, onClick }) {
  const inner = (
    <>
      <span className="cl-nav-top" aria-hidden="true">{label}</span>
      <span className="cl-nav-bottom" aria-hidden="true">{label}</span>
      <span className="cl-nav-slash" aria-hidden="true">
        <span className="cl-nav-slash-blade" />
        <span className="cl-nav-slash-flash" />
        <span className="cl-nav-slash-spark" />
      </span>
      <span className="cl-nav-sr">{label}</span>
    </>
  );
  if (onClick) return <button onClick={onClick} className="cl-nav-item" type="button">{inner}</button>;
  return <Link href={href} className="cl-nav-item">{inner}</Link>;
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

        /*
          ─────────────────────────────────────────────
          GEOMETRY — single source of truth
          Cut angle: -20°  (steeper, more dramatic anime feel)
          tan(20°) ≈ 0.364 → cut drops 36.4% across the width
          Clip:  68% on left → 32% on right (= 36% drop)
          Blade: rotate(-20deg)
          All values derive from this one angle.
          ─────────────────────────────────────────────
        */

        /* ─── BRAND — logo cap-height EXACTLY matches text cap-height ─── */
        .cl-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
          line-height: 1;
        }

        /*
          Critical alignment trick:
          The logo SVG has a viewBox of roughly 88x89 — meaning the glyph
          fills its own box. We size the SVG to match the FONT cap-height
          (not full line-height). For a 1.25rem font, cap-height ≈ 0.72em ≈ 14.4px.
          But the SVG visually reads as a solid mark, so it needs MORE height
          to feel balanced. Sweet spot: 1.05em — slightly taller than cap-height
          but matching the visual mass of bold uppercase letters.
        */
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
          /*
            Font-size drives EVERYTHING. The SVG uses em units,
            so changing this scales both perfectly together.
          */
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
        @media(min-width: 768px) {
          .cl-wordmark { font-size: 1.4rem; }
        }

        .cl-wordmark-letter {
          display: inline-block;
          line-height: 1;
          color: #ffffff;
          transition: color 0.22s ease, transform 0.34s cubic-bezier(0.34, 1.56, 0.64, 1);
          transition-delay: 0ms;
        }
        .cl-wordmark-studio { color: #f97316; }
        .cl-brand:hover .cl-wordmark-letter {
          color: #ffffff;
          transform: translateY(-3px);
          transition-delay: calc(var(--i) * 38ms);
        }
        .cl-wordmark-space { display: inline-block; width: 0.32em; }

        /* ─────────────────────────────────────────────
           NAV ITEM — KATANA CUT @ -20°
           ───────────────────────────────────────────── */
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
          /*
            ANIME SPRING — overshoots, snaps, settles.
            (0.34, 1.7, 0.4, 1) gives more bounce than standard.
          */
          transition:
            transform 0.45s cubic-bezier(0.34, 1.7, 0.4, 1),
            color     0.25s ease;
        }

        /* DIAGONAL CLIP at -20° — cut drops 36% across width */
        .cl-nav-top {
          clip-path: polygon(0% 0%, 100% 0%, 100% 32%, 0% 68%);
        }
        .cl-nav-bottom {
          clip-path: polygon(0% 68%, 100% 32%, 100% 100%, 0% 100%);
          margin-top: -1em;
        }

        /*
          Perpendicular displacement to -20° cut:
          Normal vector = (sin20°, cos20°) ≈ (0.342, 0.940)
          Magnitude ~14px → (4.8, -13.2) and (-4.8, 13.2)
        */
        .cl-nav-item:hover .cl-nav-top {
          transform: translate(4.8px, -13.2px) skewX(20deg);
          color: #ffffff;
        }
        .cl-nav-item:hover .cl-nav-bottom {
          transform: translate(-4.8px, 13.2px) skewX(20deg);
          color: #ffffff;
        }

        /* ─────────────────────────────────────────────
           THE KATANA BLADE — runs at SHALLOWER angle than the split
           Cut stays at -20° but blade rests at -10° for a more
           grounded katana feel — the slash is the visible path,
           the split is the dramatic aftermath.
           ───────────────────────────────────────────── */
        .cl-nav-slash {
          position: absolute;
          /* Drop the line lower — sits at 60% instead of dead-center */
          top: 60%;
          left: -28px;
          right: -28px;
          height: 2.5px;
          /* Shallower -10deg blade angle */
          transform: translateY(-50%) scaleX(0) rotate(-10deg);
          transform-origin: left center;
          /*
            KATANA STRIKE — Demon Slayer feel.
            (0.05, 0.95, 0.15, 1) — instant draw, smooth settle.
          */
          transition: transform 0.36s cubic-bezier(0.05, 0.95, 0.15, 1);
          pointer-events: none;
          z-index: 25;
          display: flex;
          align-items: center;
          filter:
            drop-shadow(0 0 5px #f97316)
            drop-shadow(0 0 12px rgba(249, 115, 22, 0.7))
            drop-shadow(0 0 2px rgba(255, 255, 255, 1));
        }
        .cl-nav-item:hover .cl-nav-slash {
          transform: translateY(-50%) scaleX(1) rotate(-10deg);
        }

        /* The blade body — bright white core, orange edges */
        .cl-nav-slash-blade {
          flex: 1;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent           0%,
            rgba(249, 115, 22, 0.0)  3%,
            #f97316              10%,
            #ffb347              28%,
            #ffffff              48%,
            #ffffff              52%,
            #ffd99c              72%,
            #f97316              90%,
            rgba(249, 115, 22, 0.0) 97%,
            transparent         100%
          );
          /* Tapered tip silhouette */
          clip-path: polygon(0% 35%, 96% 8%, 100% 50%, 96% 92%, 0% 65%);
          border-radius: 1px;
        }

        /* The white-hot flash that streaks ahead of the blade */
        .cl-nav-slash-flash {
          position: absolute;
          top: 50%; left: 0; right: 0;
          height: 3.5px;
          transform: translateY(-50%) translateX(-130%);
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 1) 50%,
            transparent 100%
          );
          filter: blur(1.4px);
          pointer-events: none;
          opacity: 0;
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

        /* ANIME SPARK BURST — explodes at tip when blade lands */
        .cl-nav-slash-spark {
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%) scale(0);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 220, 150, 0.9) 30%,
            rgba(249, 115, 22, 0.5) 60%,
            transparent 100%
          );
          filter: blur(0.8px);
          pointer-events: none;
          opacity: 0;
        }
        .cl-nav-item:hover .cl-nav-slash-spark {
          animation: cl-spark 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.24s forwards;
        }
        @keyframes cl-spark {
          0%   { transform: translateY(-50%) scale(0);   opacity: 0; }
          30%  { transform: translateY(-50%) scale(3);   opacity: 1; }
          100% { transform: translateY(-50%) scale(0.5); opacity: 0; }
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
          <div className="cl-brand">
            <svg
              className="cl-logo-svg"
              viewBox="0 0 88.82 89.67"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path className="cl-logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
              <path className="cl-logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
            </svg>

            <h1 className="cl-wordmark" aria-label="UNFLTR STUDIO">
              {["U","N","F","L","T","R"].map((ch, i) => (
                <span key={`u${i}`} className="cl-wordmark-letter" style={{ "--i": i }} aria-hidden="true">{ch}</span>
              ))}
              <span className="cl-wordmark-space" aria-hidden="true" />
              {["S","T","U","D","I","O"].map((ch, i) => (
                <span key={`s${i}`} className="cl-wordmark-letter cl-wordmark-studio" style={{ "--i": i + 7 }} aria-hidden="true">{ch}</span>
              ))}
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