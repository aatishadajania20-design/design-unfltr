"use client";
import Link from "next/link";
import { useCallback } from "react";

/*
  ─────────────────────────────────────────────────────────────────
  UNFLTR STUDIO — SHARED SITE HEADER
  Import and drop into any page:

    import SiteHeader from "@/components/SiteHeader";
    <SiteHeader />

  On pages where "Work" should scroll to #work-section (homepage),
  pass the prop: <SiteHeader scrollWork />
  On all other pages it links back to /#work-section.
  ─────────────────────────────────────────────────────────────────
*/

function NavItem({ href, label, onClick }) {
  const inner = (
    <>
      <span className="sh-nav-top" aria-hidden="true">{label}</span>
      <span className="sh-nav-bottom">{label}</span>
      <span className="sh-nav-katana" aria-hidden="true">
        <span className="sh-nav-katana-blade" />
        <span className="sh-nav-katana-flash" />
      </span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="sh-nav-item" type="button">
        {inner}
      </button>
    );
  }
  return (
    <Link href={href} className="sh-nav-item">
      {inner}
    </Link>
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

        /* ─── RESET FOR HEADER ELEMENTS ─── */
        .sh-wrap *, .sh-wrap *::before, .sh-wrap *::after {
          font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif;
          box-sizing: border-box;
        }

        /* ─── LOGO SVG ─── */
        .sh-logo-svg {
          transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1);
          transform-origin: center;
          flex-shrink: 0;
        }
        .sh-logo-path { fill: #ffffff; transition: fill 0.35s ease; }
        .sh-brand:hover .sh-logo-svg { transform: rotate(180deg) scale(1.15); }
        .sh-brand:hover .sh-logo-path { fill: #f97316; }

        /* ─── WORDMARK ─── */
        /* Sized to match 26px SVG height */
        .sh-wordmark {
          font-size: 1.05rem;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -0.01em;
          display: inline-flex;
          align-items: center;
          margin: 0; padding: 0;
        }
        @media(min-width: 768px) { .sh-wordmark { font-size: 1.15rem; } }

        /*
          All 13 spans (U N F L T R space S T U D I O) share .sh-letter.
          The CSS-variable --i drives per-letter stagger delay.
          UNFLTR letters: --i 0-5  → color white
          space:          --i 6    → transparent gap
          STUDIO letters: --i 7-12 → color #f97316 at rest
        */
        .sh-letter {
          display: inline-block;
          color: #fff;
          transition:
            color  0.25s ease,
            transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1);
          transition-delay: 0ms;
        }
        .sh-letter-studio { color: #f97316; }
        .sh-letter-space  { display: inline-block; color: transparent; }

        /* On brand hover: every letter bounces in sequence */
        .sh-brand:hover .sh-letter {
          color: #fff;
          transform: translateY(-3px);
          transition-delay: calc(var(--i) * 42ms);
        }

        /* ─── NAV ITEM ─── */
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
            transform 0.58s cubic-bezier(0.22, 1, 0.36, 1),
            color     0.30s ease;
        }
        .sh-nav-top    { clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%); }
        .sh-nav-bottom { clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%); margin-top: -1em; }

        /* Clean diagonal cut — like a real blade swing */
        .sh-nav-item:hover .sh-nav-top    { transform: translate(12px, -12px) skewX(20deg); color: #fff; }
        .sh-nav-item:hover .sh-nav-bottom { transform: translate(-12px, 12px) skewX(20deg); color: #fff; }

        /* ─── KATANA BLADE ─── */
        .sh-nav-katana {
          position: absolute;
          top: 50%;
          left: -18px; right: -18px;
          height: 2px;
          transform: translateY(-50%) scaleX(0) rotate(-9deg);
          transform-origin: left center;
          /* Smooth decel — blade slides in and rests */
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
          z-index: 20;
          display: flex;
          align-items: center;
        }
        .sh-nav-item:hover .sh-nav-katana {
          transform: translateY(-50%) scaleX(1) rotate(-9deg);
        }

        /* Polished steel gradient with orange glow */
        .sh-nav-katana-blade {
          flex: 1;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.2) 5%,
            #f97316 18%,
            #ffb347 45%,
            #f97316 72%,
            rgba(255,255,255,0.25) 92%,
            transparent 100%
          );
          box-shadow:
            0 0 5px  rgba(249, 115, 22, 0.6),
            0 0 14px rgba(249, 115, 22, 0.28);
          border-radius: 1px;
        }

        /* Light flash that races along the blade */
        .sh-nav-katana-flash {
          position: absolute;
          top: 50%; left: 0; right: 0;
          height: 3px;
          transform: translateY(-50%) translateX(-120%);
          background: linear-gradient(
            90deg, transparent 0%, rgba(255,255,255,0.95) 50%, transparent 100%
          );
          filter: blur(1.5px);
          pointer-events: none;
          opacity: 0;
        }
        .sh-nav-item:hover .sh-nav-katana-flash {
          opacity: 1;
          animation: sh-katana-flash 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.04s forwards;
        }
        @keyframes sh-katana-flash {
          0%   { transform: translateY(-50%) translateX(-120%); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { transform: translateY(-50%) translateX(120%);  opacity: 0; }
        }

        /* ─── CONTACT BUTTON ─── */
        .sh-contact-btn {
          position: relative;
          overflow: hidden;
          border: 1.5px solid #f97316;
          color: #f97316;
          padding: 0;
          width: 110px;
          height: 36px;
          border-radius: 0;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          transition: color 0.28s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          font-family: inherit;
          text-decoration: none;
        }
        .sh-contact-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #f97316;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transform: translateX(-105%);
          transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 0;
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

        /* ─── INSTAGRAM ─── */
        .sh-insta {
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          transition: color 0.2s ease;
        }
        .sh-insta:hover { color: #f97316; }
      `}</style>

      <nav className="sh-wrap sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 backdrop-blur-md bg-black/55 border-b border-zinc-900">

        {/* ── BRAND ── */}
        <Link href="/">
          <div className="sh-brand flex items-center gap-2 cursor-pointer select-none">
            <svg
              className="sh-logo-svg"
              width="26" height="26"
              viewBox="0 0 88.82 89.67"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path className="sh-logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
                <path className="sh-logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
              </g>
            </svg>

            <h1 className="sh-wordmark">
              {/* UNFLTR — indices 0-5, white */}
              {["U","N","F","L","T","R"].map((ch, i) => (
                <span key={`u${i}`} className="sh-letter" style={{ "--i": i }}>{ch}</span>
              ))}
              {/* Space — index 6 */}
              <span className="sh-letter sh-letter-space" style={{ "--i": 6 }}>&nbsp;</span>
              {/* STUDIO — indices 7-12, orange at rest */}
              {["S","T","U","D","I","O"].map((ch, i) => (
                <span key={`s${i}`} className="sh-letter sh-letter-studio" style={{ "--i": i + 7 }}>{ch}</span>
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

        {/* ── RIGHT: Instagram + Contact ── */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="sh-insta"
            aria-label="Instagram"
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