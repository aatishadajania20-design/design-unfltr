"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ContactPage() {
  const revealRefs = useRef([]);
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observers = [];
    revealRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(48px)";
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          } else {
            el.style.opacity = "0";
            el.style.transform = "translateY(48px)";
          }
        },
        { threshold: 0.08 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const r = (i, delay = 0) => (el) => {
    if (el) {
      el.style.transitionDelay = `${delay}ms`;
      revealRefs.current[i] = el;
    }
  };

  const LogoSVG = ({ size = 26, className = "" }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 88.82 89.67" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path className="c-logo-path" d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" />
        <path className="c-logo-path" d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" />
      </g>
    </svg>
  );

  const SERVICES = ["Branding", "Strategy", "Marketing", "Motion", "Identity", "Direction", "Creative", "Systems"];

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        *, *::before, *::after {
          font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif;
          box-sizing: border-box;
        }

        /* ── LOGO (mirrors page.js exactly) ── */
        .c-logo-svg {
          transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1);
          transform-origin: center;
        }
        .c-logo-path { fill: #ffffff; transition: fill 0.35s ease; }
        .c-brand-wrap:hover .c-logo-svg { transform: rotate(180deg) scale(1.15); }
        .c-brand-wrap:hover .c-logo-path { fill: #f97316; }

        .c-brand-letter {
          display: inline-block;
          transition: color 0.2s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        .c-brand-wrap:hover .c-brand-letter { color: #fff; }
        .c-brand-wrap:hover .c-brand-letter:nth-child(1) { transform: translateY(-3px); transition-delay: 0ms; }
        .c-brand-wrap:hover .c-brand-letter:nth-child(2) { transform: translateY(-3px); transition-delay: 40ms; }
        .c-brand-wrap:hover .c-brand-letter:nth-child(3) { transform: translateY(-3px); transition-delay: 80ms; }
        .c-brand-wrap:hover .c-brand-letter:nth-child(4) { transform: translateY(-3px); transition-delay: 120ms; }
        .c-brand-wrap:hover .c-brand-letter:nth-child(5) { transform: translateY(-3px); transition-delay: 160ms; }
        .c-brand-wrap:hover .c-brand-letter:nth-child(6) { transform: translateY(-3px); transition-delay: 200ms; }
        .c-brand-suffix { transition: color 0.2s ease 0.24s; color: #f97316; }
        .c-brand-wrap:hover .c-brand-suffix { color: #fff; }

        /* ── KATANA NAV (mirrors page.js exactly) ── */
        .c-nav-item {
          position: relative;
          cursor: pointer;
          padding: 10px 18px;
          user-select: none;
          overflow: visible;
        }
        .c-nav-top,
        .c-nav-bottom {
          display: block;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.07em;
          color: #9ca3af;
          line-height: 1;
          white-space: nowrap;
          transition: transform 0.38s cubic-bezier(0.76,0,0.24,1), color 0.25s ease;
          will-change: transform;
          text-transform: uppercase;
        }
        .c-nav-top { clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%); }
        .c-nav-bottom { clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%); margin-top: -1em; }
        .c-nav-item:hover .c-nav-top { transform: translate(6px,-8px) skewX(14deg); color: #fff; }
        .c-nav-item:hover .c-nav-bottom { transform: translate(-6px,8px) skewX(14deg); color: #fff; }
        .c-nav-slash {
          position: absolute;
          top: 50%; left: -6px; right: -6px;
          height: 1.5px;
          background: linear-gradient(90deg, transparent 0%, #f97316 15%, #ff9a4d 50%, #f97316 85%, transparent 100%);
          transform: translateY(-50%) scaleX(0) rotate(-5deg);
          transform-origin: left center;
          transition: transform 0.32s cubic-bezier(0.76,0,0.24,1);
          pointer-events: none;
          z-index: 20;
          filter: drop-shadow(0 0 3px #f97316cc);
        }
        .c-nav-item:hover .c-nav-slash { transform: translateY(-50%) scaleX(1) rotate(-5deg); }

        /* ── CONTACT BUTTON (mirrors page.js exactly) ── */
        .c-contact-btn {
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
        }
        .c-contact-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #f97316;
          clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
          transform: translateX(-105%);
          transition: transform 0.3s cubic-bezier(0.76,0,0.24,1);
          z-index: 0;
        }
        .c-contact-btn:hover::before { transform: translateX(0); }
        .c-contact-btn:hover { color: #000; }
        .c-contact-btn-text {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 6px; line-height: 1;
        }
        .c-contact-arrow {
          color: #f97316;
          transition: color 0.28s ease, transform 0.2s ease;
          font-size: 0.85rem;
        }
        .c-contact-btn:hover .c-contact-arrow { color: #000; transform: translateX(3px); }

        /* ── REVEAL ── */
        .cr {
          opacity: 0;
          transform: translateY(48px);
          transition: opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94),
                      transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94);
        }

        /* ── TITLE WIPE ── */
        .title-line { display: block; overflow: hidden; }
        .title-inner {
          display: block;
          transform: translateY(105%);
          animation: wipeUp 1s cubic-bezier(0.76,0,0.24,1) forwards;
        }
        @keyframes wipeUp { to { transform: translateY(0); } }

        /* ── BRUTAL FIELDS ── */
        .brutal-field {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid #2a2a2a;
color: #f5f5f5;
          font-size: 1.05rem;
          padding: 18px 0 14px;
          outline: none;
          letter-spacing: 0.03em;
          font-family: inherit;
          resize: none;
          transition: border-color 0.3s ease;
        }
       .brutal-field::placeholder {
  color: #6b7280;
  letter-spacing: 0.05em;
}
        .brutal-field:focus { border-color: transparent; }

        .field-wrap { position: relative; }
        .field-label {
  display: block;
  font-size: 0.55rem;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: #8b8b8b;
  margin-bottom: 2px;
  transition: color 0.25s ease;
}
        .field-wrap.active .field-label { color: #f97316; }
        .field-bar {
          position: absolute; bottom: 0; left: 0;
          height: 1px; width: 100%;
          background: #1a1a1a; overflow: hidden;
        }
        .field-bar::after {
          content: '';
          position: absolute; inset: 0;
          background: #f97316;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.76,0,0.24,1);
        }
        .field-wrap.active .field-bar::after { transform: scaleX(1); }

        /* ── SUBMIT BUTTON ── */
        .submit-btn {
          position: relative; overflow: hidden;
          background: transparent;
          border: 1.5px solid #f97316;
          color: #f97316;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.24em; text-transform: uppercase;
          cursor: pointer;
          padding: 20px 56px;
          clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
          transition: color 0.32s ease;
          font-family: inherit;
          display: inline-block;
        }
        .submit-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #f97316;
          transform: translateX(-106%);
          transition: transform 0.38s cubic-bezier(0.76,0,0.24,1);
          z-index: 0;
        }
        .submit-btn:hover::before { transform: translateX(0); }
        .submit-btn:hover { color: #000; }
        .submit-btn span { position: relative; z-index: 1; }
        .btn-arrow { display: inline-block; margin-left: 10px; transition: transform 0.25s ease; }
        .submit-btn:hover .btn-arrow { transform: translateX(5px); }

        /* ── SUCCESS ── */
        .success-box {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 16px 28px;
          border: 1px solid rgba(249,115,22,0.35);
          color: #f97316;
          font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
          animation: fadeIn 0.5s ease forwards;
        }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }

        /* ── STATS ── */
        .stat-num {
          font-size: clamp(2.8rem, 4.5vw, 5rem);
          font-weight: 900; line-height: 0.88;
          color: #fff; letter-spacing: -0.05em;
        }
        .stat-label {
          font-size: 0.55rem; letter-spacing: 0.24em;
          text-transform: uppercase; color: #333; margin-top: 8px;
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px) scale(0.92); }
          to   { opacity: 1; transform: none; }
        }
        .stat-anim { animation: countUp 0.7s cubic-bezier(0.34,1.56,0.64,1) both; }

        /* ── ORANGE RULE ── */
        .o-rule { width: 52px; height: 2px; background: #f97316; margin-bottom: 28px; }

        /* ── LOGO STRIP ── */
        @keyframes lscroll  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes lscrollR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .logo-track     { display: flex; width: max-content; animation: lscroll  20s linear infinite; }
        .logo-track-rev { display: flex; width: max-content; animation: lscrollR 26s linear infinite; }
        .logo-row:hover .logo-track,
        .logo-row:hover .logo-track-rev { animation-play-state: paused; }
        .logo-item {
          display: flex; align-items: center; gap: 12px;
          padding: 0 28px; color: #1c1c1c;
          white-space: nowrap; transition: color 0.25s ease; cursor: default;
        }
        .logo-item:hover { color: #f97316; }
        .logo-item-label { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; }

        /* ── RIGHT PANEL VIDEO ── */
        .rp-video-wrap { position: relative; overflow: hidden; background: #050505; }
        .rp-video-wrap video {
          width: 100%; height: 100%; object-fit: cover;
          opacity: 0.65; filter: saturate(0.8) contrast(1.1);
          transition: opacity 0.5s ease, filter 0.5s ease;
        }
        .rp-video-wrap:hover video { opacity: 0.85; filter: saturate(1.1) contrast(1.05); }
        .rp-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(150deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 55%, rgba(249,115,22,0.07) 100%);
          pointer-events: none;
        }
        .rp-badge {
          position: absolute; top: 18px; right: 18px;
          display: flex; align-items: center; gap: 8px;
          padding: 6px 14px;
          border: 1px solid rgba(249,115,22,0.3);
          font-size: 0.56rem; letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(255,255,255,0.45); backdrop-filter: blur(8px);
        }
        .rp-label {
          position: absolute; bottom: 20px; left: 20px;
          font-size: 0.56rem; letter-spacing: 0.22em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
        }
        .rp-watermark {
          position: absolute; bottom: -10%; right: -5%;
          font-size: clamp(5rem,12vw,10rem); font-weight: 900;
          color: rgba(255,255,255,0.04); letter-spacing: -0.06em;
          text-transform: uppercase; transform: rotate(-14deg);
          pointer-events: none; user-select: none; line-height: 1;
        }

        /* ── SERVICE TAGS ── */
        .svc-tag {
          font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: #2a2a2a; padding: 5px 12px; border: 1px solid #181818;
          transition: color 0.2s, border-color 0.2s; cursor: default;
        }
        .svc-tag:hover { color: #f97316; border-color: #f97316; }

        /* ── CORNER BRACKETS ── */
        .corner-br { position: absolute; width: 20px; height: 20px; pointer-events: none; }
        .corner-br.tl { top:12px; left:12px; border-top:1.5px solid #f97316; border-left:1.5px solid #f97316; }
        .corner-br.tr { top:12px; right:12px; border-top:1.5px solid #f97316; border-right:1.5px solid #f97316; }
        .corner-br.bl { bottom:12px; left:12px; border-bottom:1.5px solid #f97316; border-left:1.5px solid #f97316; }
        .corner-br.br { bottom:12px; right:12px; border-bottom:1.5px solid #f97316; border-right:1.5px solid #f97316; }

        /* ── SCAN LINES ── */
        .scan-lines {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px);
          pointer-events: none; z-index: 5;
        }

        /* ── PULSE DOT ── */
        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.35; transform:scale(0.65); }
        }

        /* ── RIGHT PANEL desktop only ── */
        .right-panel-desktop { display: none; }
        @media (min-width: 1024px) { .right-panel-desktop { display: flex !important; } }

        /* ── INSTA ── */
        .c-insta-link {
          display: flex; align-items: center; justify-content: center;
          color: #fff; transition: color 0.2s ease;
        }
        .c-insta-link:hover { color: #f97316; }
      `}</style>

      <main className="bg-black text-white" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>

        {/* GRAIN */}
        <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat", backgroundSize: "128px 128px", mixBlendMode: "overlay",
          }}
        />

        {/* ── NAVBAR — identical structure to page.js ── */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 backdrop-blur-md bg-black/50 border-b border-zinc-900">

          {/* LOGO — clickable, same animation as homepage */}
          <Link href="/">
            <div className="c-brand-wrap flex items-center gap-2 cursor-pointer select-none">
              <LogoSVG size={26} className="c-logo-svg" />
              <h1 className="text-orange-500 text-lg md:text-xl font-semibold tracking-tight leading-none">
                {"UNFLTR".split("").map((char, i) => (
                  <span key={i} className="c-brand-letter">{char}</span>
                ))}
                <span className="c-brand-suffix"> Studio®</span>
              </h1>
            </div>
          </Link>

          {/* KATANA NAV — same as homepage */}
          <div className="hidden md:flex items-center">
            {["Branding", "Strategy", "Marketing", "Motion"].map((item) => (
              <div key={item} className="c-nav-item">
                <span className="c-nav-top" aria-hidden="true">{item}</span>
                <span className="c-nav-bottom">{item}</span>
                <span className="c-nav-slash" aria-hidden="true" />
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            
            <a
  href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ=="
  target="_blank"
  rel="noopener noreferrer"
  className="c-insta-link"
  aria-label="Instagram"
>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="6" ry="6" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" fill="none" />
                <circle cx="17.8" cy="6.2" r="1.1" fill="currentColor" />
              </svg>
            </a>
            {/* Contact button is intentionally dimmed since we're already on this page */}
            <button className="c-contact-btn" style={{ opacity: 0.35, pointerEvents: "none" }}>
              <span className="c-contact-btn-text">
                <span className="c-contact-arrow">→</span>
                Contact
              </span>
            </button>
          </div>

        </nav>

        {/* ── MAIN SPLIT — full remaining viewport height ── */}
        <div style={{ flex: 1, display: "flex", minHeight: "calc(100svh - 65px)" }}>

          {/* LEFT — FORM */}
          <div
            className="flex flex-col"
            style={{
              flex: 1,
              padding: "clamp(28px,4vw,60px) clamp(20px,5vw,56px)",
              justifyContent: "center",
            }}
          >

            {/* EYEBROW */}
            <p className="cr" ref={r(0, 0)} style={{
              color: "#f97316", fontSize: "0.6rem", letterSpacing: "0.28em",
              textTransform: "uppercase", marginBottom: 20,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ width: 24, height: 1, background: "#f97316", display: "inline-block" }} />
              New Project Inquiry
            </p>

            {/* TITLE */}
            <h1 className="cr" ref={r(1, 60)} style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 900, lineHeight: 0.88,
              letterSpacing: "-0.03em", margin: "0 0 24px",
            }}>
              <span className="title-line">
                <span className="title-inner" style={{ animationDelay: "0ms", display: "block" }}>Let&apos;s</span>
              </span>
              <span className="title-line">
                <span className="title-inner" style={{ animationDelay: "80ms", display: "block" }}>Build</span>
              </span>
              <span className="title-line">
                <span className="title-inner" style={{ animationDelay: "160ms", display: "block", color: "#f97316" }}>Something.</span>
              </span>
            </h1>

            {/* ORANGE RULE */}
            <div className="o-rule cr" ref={r(2, 120)} />

            {/* SUBTEXT */}
            <p className="cr" ref={r(3, 160)} style={{
              color: "#555", fontSize: "0.88rem", lineHeight: 1.7,
              maxWidth: 400, marginBottom: "clamp(20px,3vw,36px)",
            }}>
              Branding, strategy, marketing, or full creative direction — we build systems that
              <span style={{ color: "#f97316" }}> refuse to look average.</span>
            </p>

            {/* STATS */}
            <div className="cr" ref={r(4, 200)} style={{
              display: "flex", gap: "clamp(16px,3vw,40px)",
              marginBottom: "clamp(20px,3vw,40px)",
            }}>
              {[
                { num: "40+", label: "Projects Done" },
                { num: "3+",  label: "Years Active"  },
                { num: "∞",   label: "Culturally Driven" },
              ].map((s, i) => (
                <div key={s.label} className="stat-anim" style={{ animationDelay: `${280 + i * 80}ms` }}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>

            {/* FORM */}
            <form
              action="https://formsubmit.co/unfltrstudios@gmail.com"
              method="POST"
              className="cr"
              ref={r(5, 240)}
              style={{ display: "flex", flexDirection: "column", gap: 28 }}
              onSubmit={() => setSubmitted(true)}
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              {[
                { name: "name",  label: "Your Name",     type: "text",  placeholder: "e.g. Rahul Mehta"     },
                { name: "email", label: "Email Address", type: "email", placeholder: "you@yourbrand.com"    },
              ].map((field) => (
                <div key={field.name} className={`field-wrap ${focused === field.name ? "active" : ""}`}>
                  <label className="field-label">{field.label}</label>
                  <input
                    type={field.type} name={field.name}
                    placeholder={field.placeholder}
                    className="brutal-field" required
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                  />
                  <div className="field-bar" />
                </div>
              ))}

              <div className={`field-wrap ${focused === "message" ? "active" : ""}`}>
                <label className="field-label">Your Message</label>
                <textarea
                  name="message"
                  placeholder="Tell us about your project, timeline, budget, and vision..."
                  className="brutal-field"
                  style={{ height: 100, paddingTop: 14 }}
                  required
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                />
                <div className="field-bar" />
              </div>

              {submitted ? (
                <div className="success-box">
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#f97316", display: "inline-block",
                    animation: "pulse-dot 1.5s ease-in-out infinite",
                  }} />
                  Message received — we&apos;ll be in touch shortly.
                </div>
              ) : (
                <div>
                  <button type="submit" className="submit-btn">
                    <span>Send It <span className="btn-arrow">→</span></span>
                  </button>
                </div>
              )}
            </form>

          </div>

          {/* RIGHT PANEL — desktop only */}
          <div
            className="right-panel-desktop flex-col"
            style={{ width: "42%", borderLeft: "1px solid #111" }}
          >

            {/* VIDEO */}
            <div className="rp-video-wrap" style={{ flex: "0 0 62%" }}>
              <video
                src="https://res.cloudinary.com/dta1dl0pj/video/upload/q_auto/f_auto/v1778434734/1.5_lrsfll.mp4"
                autoPlay muted loop playsInline preload="auto"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div className="rp-overlay" />
              <div className="scan-lines" />
              <div className="rp-watermark">UNFLTR</div>
              <div className="corner-br tl" /><div className="corner-br tr" />
              <div className="corner-br bl" /><div className="corner-br br" />
              <div className="rp-badge">
                <span style={{ width:6, height:6, borderRadius:"50%", background:"#f97316", display:"inline-block", animation:"pulse-dot 2s ease-in-out infinite" }} />
                Showreel 2025
              </div>
              <div className="rp-label">UNFLTR Studio — Culture-First Creative</div>
            </div>

            {/* LOGO STRIP */}
            <div style={{
              flex: "0 0 38%", borderTop: "1px solid #111",
              background: "#000", display: "flex", flexDirection: "column",
              justifyContent: "center", overflow: "hidden",
            }}>

              <div style={{ padding: "20px 28px 14px" }}>
                <p style={{ fontSize:"0.52rem", letterSpacing:"0.24em", textTransform:"uppercase", color:"#2a2a2a", marginBottom:12 }}>What We Do</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px 10px" }}>
                  {SERVICES.map((s) => <span key={s} className="svc-tag">{s}</span>)}
                </div>
              </div>

              <div className="logo-row" style={{ overflow:"hidden", borderTop:"1px solid #0e0e0e", padding:"14px 0" }}>
                <div className="logo-track">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="logo-item">
                      <svg width="16" height="16" viewBox="0 0 88.82 89.67" xmlns="http://www.w3.org/2000/svg">
                        <path d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" fill="currentColor"/>
                        <path d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" fill="currentColor"/>
                      </svg>
                      <span className="logo-item-label">UNFLTR</span>
                      <span style={{ fontSize:"0.45rem", color:"#f97316" }}>®</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="logo-row" style={{ overflow:"hidden", borderTop:"1px solid #0e0e0e", padding:"14px 0" }}>
                <div className="logo-track-rev">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="logo-item" style={{ color:"#f97316" }}>
                      <svg width="16" height="16" viewBox="0 0 88.82 89.67" xmlns="http://www.w3.org/2000/svg">
                        <path d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z" fill="currentColor"/>
                        <path d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9" fill="currentColor"/>
                      </svg>
                      <span className="logo-item-label">Studio</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* FOOTER BAR */}
        <div style={{ height:1, background:"#111" }} />
        <div style={{
          padding: "14px clamp(20px,5vw,40px)",
          display:"flex", justifyContent:"space-between", alignItems:"center",
        }}>
          <span style={{ fontSize:"0.55rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#2a2a2a" }}>© 2025 UNFLTR Studio</span>
          <span style={{ fontSize:"0.55rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#f97316" }}>Culture-First</span>
        </div>

      </main>
    </>
  );
}