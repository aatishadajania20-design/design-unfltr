"use client";
import SiteHeader from "@/components/SiteHeader";

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
  const WA_URL = "https://wa.me/918849752299?text=Hi%20UNFLTR%20Studio%2C%20I%27d%20like%20to%20discuss%20a%20project.";

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        *, *::before, *::after {
          font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif;
          box-sizing: border-box;
        }

        .c-logo-svg { transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1); transform-origin: center; }
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

        .c-nav-item { position: relative; cursor: pointer; padding: 10px 18px; user-select: none; overflow: visible; }
        .c-nav-top, .c-nav-bottom { display: block; font-size: 0.8rem; font-weight: 500; letter-spacing: 0.07em; color: #9ca3af; line-height: 1; white-space: nowrap; transition: transform 0.38s cubic-bezier(0.76,0,0.24,1), color 0.25s ease; will-change: transform; text-transform: uppercase; }
        .c-nav-top { clip-path: polygon(0% 0%, 100% 0%, 100% 50%, 0% 50%); }
        .c-nav-bottom { clip-path: polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%); margin-top: -1em; }
        .c-nav-item:hover .c-nav-top { transform: translate(6px,-8px) skewX(14deg); color: #fff; }
        .c-nav-item:hover .c-nav-bottom { transform: translate(-6px,8px) skewX(14deg); color: #fff; }
        .c-nav-slash { position: absolute; top: 50%; left: -6px; right: -6px; height: 1.5px; background: linear-gradient(90deg, transparent 0%, #f97316 15%, #ff9a4d 50%, #f97316 85%, transparent 100%); transform: translateY(-50%) scaleX(0) rotate(-5deg); transform-origin: left center; transition: transform 0.32s cubic-bezier(0.76,0,0.24,1); pointer-events: none; z-index: 20; filter: drop-shadow(0 0 3px #f97316cc); }
        .c-nav-item:hover .c-nav-slash { transform: translateY(-50%) scaleX(1) rotate(-5deg); }

        .c-contact-btn { position: relative; overflow: hidden; border: 1.5px solid #f97316; color: #f97316; padding: 0; width: 110px; height: 36px; border-radius: 0; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; cursor: pointer; background: transparent; transition: color 0.28s ease; display: inline-flex; align-items: center; justify-content: center; clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); }
        .c-contact-btn::before { content: ''; position: absolute; inset: 0; background: #f97316; clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%); transform: translateX(-105%); transition: transform 0.3s cubic-bezier(0.76,0,0.24,1); z-index: 0; }
        .c-contact-btn:hover::before { transform: translateX(0); }
        .c-contact-btn:hover { color: #000; }
        .c-contact-btn-text { position: relative; z-index: 1; display: flex; align-items: center; gap: 6px; line-height: 1; }
        .c-contact-arrow { color: #f97316; transition: color 0.28s ease, transform 0.2s ease; font-size: 0.85rem; }
        .c-contact-btn:hover .c-contact-arrow { color: #000; transform: translateX(3px); }

        .cr { opacity: 0; transform: translateY(48px); transition: opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94); }

        .title-line { display: block; overflow: hidden; }
        .title-inner { display: block; transform: translateY(105%); animation: wipeUp 1s cubic-bezier(0.76,0,0.24,1) forwards; }
        @keyframes wipeUp { to { transform: translateY(0); } }

        .brutal-field { width: 100%; background: transparent; border: none; border-bottom: 1px solid #2a2a2a; color: #f5f5f5; font-size: 1.05rem; padding: 18px 0 14px; outline: none; letter-spacing: 0.03em; font-family: inherit; resize: none; transition: border-color 0.3s ease; }
        .brutal-field::placeholder { color: #6b7280; letter-spacing: 0.05em; }
        .brutal-field:focus { border-color: transparent; }

        .field-wrap { position: relative; }
        .field-label { display: block; font-size: 0.55rem; letter-spacing: 0.26em; text-transform: uppercase; color: #8b8b8b; margin-bottom: 2px; transition: color 0.25s ease; }
        .field-wrap.active .field-label { color: #f97316; }
        .field-bar { position: absolute; bottom: 0; left: 0; height: 1px; width: 100%; background: #1a1a1a; overflow: hidden; }
        .field-bar::after { content: ''; position: absolute; inset: 0; background: #f97316; transform: scaleX(0); transform-origin: left; transition: transform 0.35s cubic-bezier(0.76,0,0.24,1); }
        .field-wrap.active .field-bar::after { transform: scaleX(1); }

        /* ── SUBMIT BUTTON ── */
        .submit-btn { position: relative; overflow: hidden; background: transparent; border: 1.5px solid #f97316; color: #f97316; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; cursor: pointer; padding: 20px 56px; clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%); transition: color 0.32s ease; font-family: inherit; display: inline-block; }
        .submit-btn::before { content: ''; position: absolute; inset: 0; background: #f97316; transform: translateX(-106%); transition: transform 0.38s cubic-bezier(0.76,0,0.24,1); z-index: 0; }
        .submit-btn:hover::before { transform: translateX(0); }
        .submit-btn:hover { color: #000; }
        .submit-btn span { position: relative; z-index: 1; }
        .btn-arrow { display: inline-block; margin-left: 10px; transition: transform 0.25s ease; }
        .submit-btn:hover .btn-arrow { transform: translateX(5px); }

        /* ── WHATSAPP BUTTON ── */
        .wa-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent;
          border: 1.5px solid #25D366;
          color: #25D366;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          cursor: pointer; padding: 18px 32px;
          clip-path: polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%);
          transition: color 0.32s ease;
          font-family: inherit;
          text-decoration: none;
          position: relative; overflow: hidden;
        }
        .wa-btn::before {
          content: ''; position: absolute; inset: 0;
          background: #25D366;
          transform: translateX(-106%);
          transition: transform 0.38s cubic-bezier(0.76,0,0.24,1);
          z-index: 0;
        }
        .wa-btn:hover::before { transform: translateX(0); }
        .wa-btn:hover { color: #000; }
        .wa-btn span { position: relative; z-index: 1; }
        .wa-btn:hover .wa-icon { transform: scale(1.15) rotate(-8deg); }
        .wa-icon { position: relative; z-index: 1; transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); flex-shrink: 0; }

        /* Divider between buttons */
        .btn-divider {
          display: flex; align-items: center; gap: 12px;
          font-size: 0.46rem; letter-spacing: 0.26em; text-transform: uppercase; color: #333;
        }
        .btn-divider::before, .btn-divider::after {
          content: ''; flex: 1; height: 1px; background: #1e1e1e;
        }

        .success-box { display: inline-flex; align-items: center; gap: 12px; padding: 16px 28px; border: 1px solid rgba(249,115,22,0.35); color: #f97316; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; animation: fadeIn 0.5s ease forwards; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }

        .stat-num { font-size: clamp(2.8rem, 4.5vw, 5rem); font-weight: 900; line-height: 0.88; color: #fff; letter-spacing: -0.05em; }
        .stat-label { font-size: 0.55rem; letter-spacing: 0.24em; text-transform: uppercase; color: #888; margin-top: 8px; transition: color 0.2s ease; }
        .stat-item:hover .stat-label { color: #f97316; }
        @keyframes countUp { from { opacity: 0; transform: translateY(20px) scale(0.92); } to { opacity: 1; transform: none; } }
        .stat-anim { animation: countUp 0.7s cubic-bezier(0.34,1.56,0.64,1) both; }

        .o-rule { width: 52px; height: 2px; background: #f97316; margin-bottom: 28px; }

        @keyframes lscroll  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes lscrollR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .logo-track     { display: flex; width: max-content; animation: lscroll  20s linear infinite; }
        .logo-track-rev { display: flex; width: max-content; animation: lscrollR 26s linear infinite; }
        .logo-row:hover .logo-track, .logo-row:hover .logo-track-rev { animation-play-state: paused; }
        .logo-item { display: flex; align-items: center; gap: 12px; padding: 0 28px; color: #3a3a3a; white-space: nowrap; transition: color 0.25s ease; cursor: default; }
        .logo-item:hover { color: #f97316; }
        .logo-item-label { font-size: 0.7rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; }

        .rp-video-wrap { position: relative; overflow: hidden; background: #050505; }
        .rp-video-wrap video { width: 100%; height: 100%; object-fit: cover; opacity: 0.65; filter: saturate(0.8) contrast(1.1); transition: opacity 0.5s ease, filter 0.5s ease; }
        .rp-video-wrap:hover video { opacity: 0.85; filter: saturate(1.1) contrast(1.05); }
        .rp-overlay { position: absolute; inset: 0; background: linear-gradient(150deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 55%, rgba(249,115,22,0.07) 100%); pointer-events: none; }
        .rp-badge { position: absolute; top: 18px; right: 18px; display: flex; align-items: center; gap: 8px; padding: 6px 14px; border: 1px solid rgba(249,115,22,0.3); font-size: 0.56rem; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.45); backdrop-filter: blur(8px); }
        .rp-label { position: absolute; bottom: 20px; left: 20px; font-size: 0.56rem; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,255,255,0.3); }
        .rp-watermark { position: absolute; bottom: -10%; right: -5%; font-size: clamp(5rem,12vw,10rem); font-weight: 900; color: rgba(255,255,255,0.04); letter-spacing: -0.06em; text-transform: uppercase; transform: rotate(-14deg); pointer-events: none; user-select: none; line-height: 1; }

        .svc-tag { font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase; color: #888; padding: 5px 12px; border: 1px solid #2a2a2a; transition: color 0.2s, border-color 0.2s; cursor: default; }
        .svc-tag:hover { color: #f97316; border-color: #f97316; }

        .what-we-do-label { font-size: 0.52rem; letter-spacing: 0.24em; text-transform: uppercase; color: #666; margin-bottom: 12px; }

        .corner-br { position: absolute; width: 20px; height: 20px; pointer-events: none; }
        .corner-br.tl { top:12px; left:12px; border-top:1.5px solid #f97316; border-left:1.5px solid #f97316; }
        .corner-br.tr { top:12px; right:12px; border-top:1.5px solid #f97316; border-right:1.5px solid #f97316; }
        .corner-br.bl { bottom:12px; left:12px; border-bottom:1.5px solid #f97316; border-left:1.5px solid #f97316; }
        .corner-br.br { bottom:12px; right:12px; border-bottom:1.5px solid #f97316; border-right:1.5px solid #f97316; }
        .scan-lines { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px); pointer-events: none; z-index: 5; }

        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.35; transform:scale(0.65); } }

        .right-panel-desktop { display: none; }
        @media (min-width: 1024px) { .right-panel-desktop { display: flex !important; } }

        .c-insta-link { display: flex; align-items: center; justify-content: center; color: #fff; transition: color 0.2s ease; }
        .c-insta-link:hover { color: #f97316; }
      `}</style>

      <main className="bg-black text-white" style={{ minHeight: "100svh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>

        {/* GRAIN */}
        <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px 128px", mixBlendMode: "overlay" }}
        />

        {/* NAVBAR */}
        <SiteHeader />

        {/* MAIN SPLIT */}
        <div style={{ flex: 1, display: "flex", minHeight: "calc(100svh - 65px)" }}>

          {/* LEFT — FORM */}
          <div className="flex flex-col" style={{ flex: 1, padding: "clamp(28px,4vw,60px) clamp(20px,5vw,56px)", justifyContent: "center" }}>

            <p className="cr" ref={r(0, 0)} style={{ color: "#f97316", fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 24, height: 1, background: "#f97316", display: "inline-block" }} />
              New Project Inquiry
            </p>

            <h1 className="cr" ref={r(1, 60)} style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.03em", margin: "0 0 24px" }}>
              <span className="title-line"><span className="title-inner" style={{ animationDelay: "0ms", display: "block" }}>Let&apos;s</span></span>
              <span className="title-line"><span className="title-inner" style={{ animationDelay: "80ms", display: "block" }}>Build</span></span>
              <span className="title-line"><span className="title-inner" style={{ animationDelay: "160ms", display: "block", color: "#f97316" }}>Something.</span></span>
            </h1>

            <div className="o-rule cr" ref={r(2, 120)} />

            <p className="cr" ref={r(3, 160)} style={{ color: "#888", fontSize: "0.88rem", lineHeight: 1.7, maxWidth: 400, marginBottom: "clamp(20px,3vw,36px)" }}>
              Branding, strategy, marketing, or full creative direction — we build systems that
              <span style={{ color: "#f97316" }}> refuse to look average.</span>
            </p>

            {/* STATS */}
            <div className="cr" ref={r(4, 200)} style={{ display: "flex", gap: "clamp(16px,3vw,40px)", marginBottom: "clamp(20px,3vw,40px)" }}>
              {[
                { num: "40+", label: "Projects Done" },
                { num: "3+",  label: "Years Active"  },
                { num: "∞",   label: "Culturally Driven" },
              ].map((s, i) => (
                <div key={s.label} className="stat-item stat-anim" style={{ animationDelay: `${280 + i * 80}ms` }}>
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
                  <input type={field.type} name={field.name} placeholder={field.placeholder} className="brutal-field" required onFocus={() => setFocused(field.name)} onBlur={() => setFocused(null)} />
                  <div className="field-bar" />
                </div>
              ))}

              <div className={`field-wrap ${focused === "message" ? "active" : ""}`}>
                <label className="field-label">Your Message</label>
                <textarea name="message" placeholder="Tell us about your project, timeline, budget, and vision..." className="brutal-field" style={{ height: 100, paddingTop: 14 }} required onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
                <div className="field-bar" />
              </div>

              {submitted ? (
                <div className="success-box">
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", display: "inline-block", animation: "pulse-dot 1.5s ease-in-out infinite" }} />
                  Message received — we&apos;ll be in touch shortly.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {/* Send It button */}
                  <button type="submit" className="submit-btn">
                    <span>Send It <span className="btn-arrow">→</span></span>
                  </button>

                  {/* Divider */}
                  <div className="btn-divider">or reach us directly</div>

                  {/* WhatsApp button */}
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wa-btn"
                  >
                    {/* WhatsApp icon */}
                    <svg className="wa-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>Chat On WhatsApp</span>
                  </a>
                </div>
              )}
            </form>

          </div>

          {/* RIGHT PANEL — desktop only */}
          <div className="right-panel-desktop flex-col" style={{ width: "42%", borderLeft: "1px solid #111" }}>

            <div className="rp-video-wrap" style={{ flex: "0 0 62%" }}>
              <video src="https://res.cloudinary.com/dta1dl0pj/video/upload/q_auto/f_auto/v1778520760/1.5_1_gim6ct.mp4" autoPlay muted loop playsInline preload="auto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

            <div style={{ flex: "0 0 38%", borderTop: "1px solid #111", background: "#000", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ padding: "20px 28px 14px" }}>
                <p className="what-we-do-label">What We Do</p>
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

        {/* FOOTER */}
        <div style={{ height:1, background:"#111" }} />
        <div style={{ padding:"14px clamp(20px,5vw,40px)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:"0.55rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#444" }}>© 2025 UNFLTR Studio</span>
          <span style={{ fontSize:"0.55rem", letterSpacing:"0.22em", textTransform:"uppercase", color:"#f97316" }}>Culture-First</span>
        </div>

      </main>
    </>
  );
}