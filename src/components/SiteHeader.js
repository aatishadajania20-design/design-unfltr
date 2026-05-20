"use client";
import Link from "next/link";
import { useCallback } from "react";

function NavItem({ href, label, onClick }) {
  const inner = (
    <>
      <span className="sh-nav-top" aria-hidden="true">{label}</span>
      <span className="sh-nav-bottom">{label}</span>
      <span className="sh-nav-katana" aria-hidden="true">
        <span className="sh-nav-katana-blade" />
        <span className="sh-nav-katana-flash" />
        <span className="sh-nav-katana-tip" />
      </span>
    </>
  );
  if (onClick) {
    return <button onClick={onClick} className="sh-nav-item" type="button">{inner}</button>;
  }
  return <Link href={href} className="sh-nav-item">{inner}</Link>;
}

export default function SiteHeader({ scrollWork = false }) {
  const handleWork = useCallback(() => {
    if (scrollWork) {
      document.getElementById("work-section")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#work-section";
    }
  }, [scrollWork]);

  /*
    WORDMARK STRUCTURE
    ─────────────────
    "UNFLTR STUDIO" is broken into segments separated by invisible crack-gaps.
    Each segment is a <span class="sh-crack-seg"> containing individual sh-letter spans.
    On hover, segments drift apart slightly (translateX/Y/rotate) then snap back —
    like tectonic plates after a tremor. The cracks between them are visible as
    thin negative-space lines rendered via ::after pseudo-elements.

    Segment map (indices 0-12):
      seg-0: U N F   (0-2)
      crack
      seg-1: L T R   (3-5)
      space
      seg-2: S T U   (7-9)
      crack
      seg-3: D I O   (10-12)
  */

  const UNFLTR = [
    { seg: 0, chars: ["U","N","F"],   baseI: 0 },
    { seg: 1, chars: ["L","T","R"],   baseI: 3 },
  ];
  const STUDIO = [
    { seg: 2, chars: ["S","T","U"],   baseI: 7  },
    { seg: 3, chars: ["D","I","O"],   baseI: 10 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');

        .sh-wrap *, .sh-wrap *::before, .sh-wrap *::after {
          font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif;
          box-sizing: border-box;
        }

        /* ── LOGO ── */
        .sh-logo-svg {
          /* height exactly matches line-height of wordmark */
          width: auto; height: 1em;
          transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1);
          transform-origin: center; flex-shrink: 0;
        }
        .sh-logo-path { fill: #ffffff; transition: fill 0.35s ease; }
        .sh-brand:hover .sh-logo-svg  { transform: rotate(180deg) scale(1.15); }
        .sh-brand:hover .sh-logo-path { fill: #f97316; }

        /* ── WORDMARK container ── */
        .sh-wordmark {
          /*
            font-size controls BOTH the SVG height (via 1em on svg)
            and the text height. They are exactly equal.
          */
          font-size: clamp(1rem, 2.2vw, 1.35rem);
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.01em;
          display: inline-flex;
          align-items: center;
          margin: 0; padding: 0;
          gap: 0;
        }

        /* ── Individual letter ── */
        .sh-letter {
          display: inline-block;
          color: #fff;
          transition:
            color     0.25s ease,
            transform 0.42s cubic-bezier(0.34,1.56,0.64,1);
          transition-delay: 0ms;
        }
        .sh-letter-studio { color: #f97316; }

        /* On brand hover: wave bounce through all letters */
        .sh-brand:hover .sh-letter {
          color: #fff;
          transform: translateY(-3px);
          transition-delay: calc(var(--i) * 38ms);
        }

        /* ── CRACK SEGMENT ── */
        /*
          Each segment is a tightly-packed inline-flex.
          Between segments we insert a ::after pseudo crack — a 1px gap
          with a hair-thin line that looks like fractured stone.
        */
        .sh-crack-seg {
          display: inline-flex;
          position: relative;
          transition:
            transform  0.55s cubic-bezier(0.16, 1, 0.3, 1),
            filter     0.55s ease;
          transform-origin: center bottom;
        }

        /* The visible crack line between segments */
        .sh-crack {
          display: inline-block;
          width: 2px;
          position: relative;
          flex-shrink: 0;
          self-align: stretch;
        }
        .sh-crack::before {
          content: '';
          position: absolute;
          top: 10%; bottom: 10%;
          left: 50%;
          width: 1px;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(249,115,22,0.0) 15%,
            rgba(249,115,22,0.18) 35%,
            rgba(249,115,22,0.22) 50%,
            rgba(249,115,22,0.18) 65%,
            rgba(249,115,22,0.0) 85%,
            transparent 100%
          );
          transform: translateX(-50%);
          clip-path: polygon(
            40% 0%, 60% 0%,
            65% 20%, 45% 22%,
            55% 45%, 35% 47%,
            60% 70%, 40% 72%,
            55% 100%, 45% 100%
          );
          transition: opacity 0.3s ease, background 0.3s ease;
        }

        /* SPACE between UNFLTR and STUDIO */
        .sh-wordmark-space {
          display: inline-block;
          width: 0.35em;
          flex-shrink: 0;
        }

        /*
          EARTHQUAKE hover on the brand:
          Each segment drifts in a different direction — like tectonic plates
          shearing apart. The motion is subtle (2-4px) but unmistakable.
          Stagger via transition-delay so they shift sequentially.
        */
        .sh-brand:hover .sh-crack-seg-0 {
          transform: translate(-2px, -1px) rotate(-0.4deg);
          transition-delay: 0ms;
        }
        .sh-brand:hover .sh-crack-seg-1 {
          transform: translate(1px, 1px) rotate(0.3deg);
          transition-delay: 40ms;
        }
        .sh-brand:hover .sh-crack-seg-2 {
          transform: translate(-1px, -1.5px) rotate(-0.35deg);
          transition-delay: 80ms;
        }
        .sh-brand:hover .sh-crack-seg-3 {
          transform: translate(2px, 0.5px) rotate(0.45deg);
          transition-delay: 120ms;
        }

        /* Cracks illuminate orange on hover */
        .sh-brand:hover .sh-crack::before {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(249,115,22,0.0) 10%,
            rgba(249,115,22,0.55) 30%,
            rgba(249,115,22,0.7)  50%,
            rgba(249,115,22,0.55) 70%,
            rgba(249,115,22,0.0) 90%,
            transparent 100%
          );
          filter: drop-shadow(0 0 2px rgba(249,115,22,0.6));
        }

        /* ── NAV ITEM ── */
        .sh-nav-item {
          position: relative;
          cursor: pointer;
          padding: 10px 20px;
          user-select: none;
          overflow: visible;
          text-decoration: none;
          background: none;
          border: none;
          font-family: inherit;
          display: inline-block;
        }

        .sh-nav-top,
        .sh-nav-bottom {
          display: block;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: #9ca3af;
          line-height: 1;
          white-space: nowrap;
          text-transform: uppercase;
          will-change: transform;
          transition:
            transform 0.46s cubic-bezier(0.22, 1, 0.36, 1),
            color     0.25s ease;
        }
        .sh-nav-top    { clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%); }
        .sh-nav-bottom { clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%); margin-top: -1em; }

        /*
          KATANA REFINEMENT:
          The cut angle is -10deg. The text halves split at EXACTLY that angle:
          top half flies up-right with +skewX(10deg) (matching the blade tilt)
          bottom half flies down-left with -skewX(10deg)
          This makes the text look genuinely sliced along the blade line.
        */
        .sh-nav-item:hover .sh-nav-top {
          transform: translate(14px, -13px) skewX(10deg);
          color: #fff;
        }
        .sh-nav-item:hover .sh-nav-bottom {
          transform: translate(-14px, 13px) skewX(10deg);
          color: #fff;
        }

        /* ── KATANA BLADE ── */
        .sh-nav-katana {
          position: absolute;
          top: 50%; left: -22px; right: -22px;
          height: 2px;
          /* Same -10deg as the text split */
          transform: translateY(-50%) scaleX(0) rotate(-10deg);
          transform-origin: left center;
          /*
            Ease: fast entry (sword strike speed) then settle.
            cubic-bezier(0.12, 0.8, 0.28, 1) — sharp initial velocity,
            smooth deceleration as blade settles in the cut.
          */
          transition: transform 0.38s cubic-bezier(0.12, 0.8, 0.28, 1);
          pointer-events: none;
          z-index: 20;
          display: flex;
          align-items: center;
        }
        .sh-nav-item:hover .sh-nav-katana {
          transform: translateY(-50%) scaleX(1) rotate(-10deg);
        }

        /* Blade gradient — sharp tip on right, fuller on left */
        .sh-nav-katana-blade {
          flex: 1; height: 100%;
          background: linear-gradient(
            90deg,
            transparent           0%,
            rgba(255,255,255,0.1)  4%,
            #f97316               14%,
            #ffb347               40%,
            #ff7a00               60%,
            #f97316               80%,
            rgba(255,200,100,0.5) 94%,
            transparent           100%
          );
          box-shadow:
            0 0 4px  rgba(249,115,22,0.65),
            0 0 10px rgba(249,115,22,0.25);
          border-radius: 0 1px 1px 0;
          /* Blade is slightly tapered — thicker at guard, thinner at tip */
          clip-path: polygon(0% 0%, 98% 20%, 100% 50%, 98% 80%, 0% 100%);
        }

        /* Bright reflection that streaks along the blade instantly */
        .sh-nav-katana-flash {
          position: absolute;
          top: 50%; left: 0; right: 0;
          height: 2px;
          transform: translateY(-50%) translateX(-130%);
          background: linear-gradient(
            90deg, transparent 0%, rgba(255,255,255,1) 50%, transparent 100%
          );
          filter: blur(1px);
          pointer-events: none;
          opacity: 0;
        }
        .sh-nav-item:hover .sh-nav-katana-flash {
          opacity: 1;
          /* Flash leads the blade — runs faster than the blade draw */
          animation: sh-flash 0.3s cubic-bezier(0.12, 0.8, 0.28, 1) 0s forwards;
        }
        @keyframes sh-flash {
          0%   { transform: translateY(-50%) translateX(-130%); opacity: 0; }
          15%  { opacity: 1; }
          70%  { opacity: 0.7; }
          100% { transform: translateY(-50%) translateX(130%); opacity: 0; }
        }

        /* Tiny tip glow — the point where the blade exits */
        .sh-nav-katana-tip {
          position: absolute;
          right: -4px; top: 50%;
          transform: translateY(-50%) scale(0);
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,200,120,0.9);
          filter: blur(2px);
          pointer-events: none;
          opacity: 0;
        }
        .sh-nav-item:hover .sh-nav-katana-tip {
          opacity: 1;
          /* Tip flares briefly as blade hits the far edge */
          animation: sh-tip 0.5s cubic-bezier(0.12, 0.8, 0.28, 1) 0.28s forwards;
        }
        @keyframes sh-tip {
          0%   { transform: translateY(-50%) scale(0); opacity: 0; }
          40%  { transform: translateY(-50%) scale(2); opacity: 1; }
          100% { transform: translateY(-50%) scale(0); opacity: 0; }
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
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          font-family: inherit; text-decoration: none;
        }
        .sh-contact-btn::before {
          content: ''; position: absolute; inset: 0; background: #f97316;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transform: translateX(-105%);
          transition: transform 0.3s cubic-bezier(0.76,0,0.24,1); z-index: 0;
        }
        .sh-contact-btn:hover::before { transform: translateX(0); }
        .sh-contact-btn:hover { color: #000; }
        .sh-contact-btn-inner {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 6px; line-height: 1;
        }
        .sh-contact-arrow {
          color: #f97316;
          transition: color 0.28s ease, transform 0.2s ease;
          font-size: 0.85rem;
        }
        .sh-contact-btn:hover .sh-contact-arrow { color: #000; transform: translateX(3px); }

        /* ── INSTAGRAM ── */
        .sh-insta {
          display: flex; align-items: center; justify-content: center;
          color: #fff; transition: color 0.2s ease;
        }
        .sh-insta:hover { color: #f97316; }
      `}</style>

      <nav className="sh-wrap sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 backdrop-blur-md bg-black/55 border-b border-zinc-900">

        {/* ── BRAND ── */}
        <Link href="/">
          <div className="sh-brand flex items-center gap-2 cursor-pointer select-none">

            {/*
              SVG uses height="1em" so it scales exactly with the wordmark font-size.
              viewBox is preserved so the glyph never distorts.
            */}
            <svg
              className="sh-logo-svg"
              viewBox="0 0 88.82 89.67"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path className="sh-logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
              <path className="sh-logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
            </svg>

            {/* ── WORDMARK with earthquake crack segments ── */}
            <h1 className="sh-wordmark" aria-label="UNFLTR STUDIO">

              {/* UNFLTR — two cracked segments */}
              {UNFLTR.map(({ seg, chars, baseI }, segIdx) => (
                <>
                  {segIdx > 0 && <span className="sh-crack" aria-hidden="true" key={`crack-unfltr-${segIdx}`} />}
                  <span className={`sh-crack-seg sh-crack-seg-${seg}`} key={`seg-${seg}`} aria-hidden="true">
                    {chars.map((ch, ci) => (
                      <span
                        key={`${seg}-${ci}`}
                        className="sh-letter"
                        style={{ "--i": baseI + ci }}
                      >{ch}</span>
                    ))}
                  </span>
                </>
              ))}

              {/* Gap between UNFLTR and STUDIO */}
              <span className="sh-wordmark-space" aria-hidden="true" />

              {/* STUDIO — two cracked segments */}
              {STUDIO.map(({ seg, chars, baseI }, segIdx) => (
                <>
                  {segIdx > 0 && <span className="sh-crack" aria-hidden="true" key={`crack-studio-${segIdx}`} />}
                  <span className={`sh-crack-seg sh-crack-seg-${seg}`} key={`seg-${seg}`} aria-hidden="true">
                    {chars.map((ch, ci) => (
                      <span
                        key={`${seg}-${ci}`}
                        className="sh-letter sh-letter-studio"
                        style={{ "--i": baseI + ci }}
                      >{ch}</span>
                    ))}
                  </span>
                </>
              ))}

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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="6" ry="6" stroke="currentColor" strokeWidth="1.8" fill="none" />
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
              <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" />
            </svg>
          </a>

          <Link href="/contact" className="sh-contact-btn">
            <span className="sh-contact-btn-inner">
              <span className="sh-contact-arrow">→</span>
              Contact
            </span>
          </Link>
        </div>

      </nav>
    </>
  );
}