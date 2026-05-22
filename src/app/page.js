"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PortfolioGrid from "@/components/PortfolioGrid";
import SiteHeader from "@/components/SiteHeader";

/* ─── OUR WORK TITLE ─── */
function OurWorkTitle() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const words = [{ text:"Our", accent:false }, { text:"Work.", accent:true }];
  return (
    <div className="work-marker" ref={ref} id="work-section">
      <span className="work-marker-num" aria-hidden="true">02</span>
      <p className="work-marker-eyebrow"><span className="work-marker-eyebrow-line" />Selected Projects</p>
      <h2 className="work-marker-title">
        {words.map((w, wi) => (
          <span key={wi} className="work-marker-word">
            {w.text.split("").map((ch, ci) => (
              <span key={ci} className={`work-marker-letter${w.accent ? " is-accent" : ""}`}
                style={{ animationDelay: visible ? `${(wi * w.text.length + ci) * 55}ms` : "0ms", animationPlayState: visible ? "running" : "paused" }}>
                {ch}
              </span>
            ))}
          </span>
        ))}
      </h2>
      <div className="work-marker-meta">
        <p className="work-marker-desc">A curated selection of culturally sharp brand identities, campaigns, and motion work — built for brands that refuse to look average.</p>
        <span className="work-marker-tag"><span className="work-marker-tag-dot" />110+ Projects Delivered</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        * { font-family: 'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif; }

        /* ── HERO CTAs ── */
        .hero-clients-cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 12px 24px; width: 100%;
          border: 1px solid rgba(255,255,255,0.22); background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          color: rgba(255,255,255,0.7); font-size: 0.65rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer;
          transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease;
          white-space: nowrap; font-family: inherit; border-radius: 2px; text-decoration: none;
        }
        @media(min-width:640px){ .hero-clients-cta { width:auto; padding:10px 22px; justify-content:flex-start; } }
        .hero-clients-cta:hover { border-color:rgba(249,115,22,0.6); background:rgba(249,115,22,0.09); color:#f97316; }
        .hero-cta-dot { width:5px; height:5px; border-radius:50%; background:#f97316; display:inline-block; animation:pulse-dot 2s ease-in-out infinite; flex-shrink:0; }
        .hero-cta-arrow { display:inline-block; transition:transform 0.25s ease; font-size:0.8rem; }
        .hero-clients-cta:hover .hero-cta-arrow { transform:translateX(4px); }

        .hero-services-cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 10px;
          padding: 12px 24px; width: 100%;
          border: 1.5px solid #f97316; background: rgba(249,115,22,0.10);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          color: #f97316; font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease;
          white-space: nowrap; font-family: inherit; border-radius: 2px;
          text-decoration: none; position: relative; overflow: hidden;
        }
        @media(min-width:640px){ .hero-services-cta { width:auto; padding:10px 22px; justify-content:flex-start; } }
        .hero-services-cta::before { content:''; position:absolute; inset:0; background:#f97316; transform:translateX(-105%); transition:transform 0.32s cubic-bezier(0.76,0,0.24,1); z-index:0; }
        .hero-services-cta:hover::before { transform:translateX(0); }
        .hero-services-cta:hover { color:#000; }
        .hero-services-cta span { position:relative; z-index:1; }
        .svc-arrow { display:inline-block; transition:transform 0.25s ease; font-size:0.8rem; position:relative; z-index:1; }
        .hero-services-cta:hover .svc-arrow { transform:translateX(3px); }

        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }

        /* ── OUR WORK TITLE ── */
        .work-marker { position:relative; z-index:2; background:#000; border-top:1px solid #141414; border-bottom:1px solid #141414; padding:clamp(52px,9vw,100px) clamp(20px,5vw,52px); overflow:hidden; }
        .work-marker-eyebrow { font-size:0.58rem; letter-spacing:0.34em; text-transform:uppercase; color:#f97316; display:flex; align-items:center; gap:14px; margin-bottom:22px; }
        .work-marker-eyebrow-line { display:inline-block; width:36px; height:1px; background:#f97316; transform:scaleX(0); transform-origin:left; animation:rule-grow 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s forwards; }
        @keyframes rule-grow { to { transform:scaleX(1); } }
        .work-marker-title { font-size:clamp(3.2rem,13vw,12rem); font-weight:900; line-height:0.86; letter-spacing:-0.05em; text-transform:uppercase; display:flex; flex-wrap:wrap; gap:0 clamp(16px,2.5vw,44px); }
        .work-marker-word { display:inline-flex; overflow:hidden; }
        .work-marker-letter { display:inline-block; transform:translateY(110%); opacity:0; animation:letter-rise 0.9s cubic-bezier(0.16,1,0.3,1) forwards; animation-play-state:paused; }
        @keyframes letter-rise { to { transform:translateY(0); opacity:1; } }
        .work-marker-letter.is-accent { color:transparent; -webkit-text-stroke:2px #f97316; }
        .work-marker-meta { margin-top:clamp(22px,3.5vw,36px); display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:16px; }
        .work-marker-desc { font-size:0.8rem; line-height:1.72; color:#666; max-width:440px; }
        .work-marker-tag { font-size:0.55rem; letter-spacing:0.28em; text-transform:uppercase; color:#444; display:flex; align-items:center; gap:8px; }
        .work-marker-tag-dot { width:5px; height:5px; border-radius:50%; background:#f97316; animation:pulse-dot 2s ease-in-out infinite; }
        .work-marker-num { position:absolute; top:20px; right:clamp(20px,5vw,52px); font-size:clamp(4rem,9vw,10rem); font-weight:900; color:transparent; -webkit-text-stroke:1px rgba(249,115,22,0.12); letter-spacing:-0.06em; line-height:1; pointer-events:none; user-select:none; }

        /* ── FOOTER MARQUEE ── */
        @keyframes marquee-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .chat-marquee-section { position:relative; overflow:hidden; cursor:pointer; background:#000; border-top:1px solid #1a1a1a; padding:10px 0; transition:background 0.4s ease; }
        .chat-marquee-section:hover { background:#f97316; }
        .chat-marquee-track { display:flex; width:max-content; animation:marquee-scroll 22s linear infinite; }
        .chat-marquee-section:hover .chat-marquee-track { animation:marquee-scroll 10s linear infinite; }
        .chat-marquee-word { font-size:clamp(1.2rem,3vw,2.6rem); font-weight:900; text-transform:uppercase; letter-spacing:-0.02em; white-space:nowrap; padding-right:1.2rem; color:#fff; transition:color 0.4s ease; line-height:1; }
        .chat-marquee-section:hover .chat-marquee-word { color:#000; }
        .chat-marquee-dot { color:#f97316; transition:color 0.4s ease; }
        .chat-marquee-section:hover .chat-marquee-dot { color:#000; }
        .chat-cta-hint { position:absolute; right:16px; top:50%; transform:translateY(-50%); display:flex; align-items:center; gap:5px; font-size:0.52rem; letter-spacing:0.15em; text-transform:uppercase; color:#f97316; transition:color 0.4s ease,transform 0.3s ease; z-index:2; pointer-events:none; }
        .chat-marquee-section:hover .chat-cta-hint { color:#000; transform:translateY(-50%) translateX(4px); }

        /* ── BRUTAL LINK ── */
        .brutal-link { display:inline-flex; align-items:center; gap:8px; font-size:0.62rem; font-weight:800; letter-spacing:0.22em; text-transform:uppercase; color:#444; text-decoration:none; position:relative; padding-bottom:2px; transition:color 0.22s ease; white-space:nowrap; }
        .brutal-link::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:#f97316; transform:scaleX(0); transform-origin:left; transition:transform 0.28s cubic-bezier(0.76,0,0.24,1); }
        .brutal-link:hover { color:#f97316; }
        .brutal-link:hover::after { transform:scaleX(1); }
        .brutal-link-arrow { transition:transform 0.22s ease; }
        .brutal-link:hover .brutal-link-arrow { transform:translateX(4px); }

        /* ── CLIENTS SECTION ── */
        .cs-section { position:relative; background:#000; border-top:1px solid #141414; overflow:hidden; }
        .cs-watermark { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%) rotate(-8deg); font-size:clamp(7rem,18vw,16rem); font-weight:900; letter-spacing:-0.06em; color:rgba(255,255,255,0.016); text-transform:uppercase; pointer-events:none; user-select:none; white-space:nowrap; z-index:0; line-height:1; }
        .cs-slash { position:absolute; top:0; bottom:0; left:48%; width:1px; background:linear-gradient(to bottom,transparent,#f97316 25%,#f97316 75%,transparent); transform:rotate(-14deg) scaleY(1.5); opacity:0.05; pointer-events:none; z-index:1; }
        .cs-header { position:relative; z-index:2; display:flex; align-items:flex-end; justify-content:space-between; gap:16px; flex-wrap:wrap; padding:44px 20px 28px; border-bottom:1px solid #111; }
        @media(min-width:768px){ .cs-header{padding:56px 48px 34px;} }
        .cs-eyebrow { font-size:0.58rem; letter-spacing:0.28em; text-transform:uppercase; color:#f97316; display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .cs-eyebrow-line { display:inline-block; width:28px; height:1px; background:#f97316; }
        .cs-title { font-size:clamp(2.2rem,5.5vw,5rem); font-weight:900; line-height:0.88; letter-spacing:-0.04em; color:#fff; text-transform:uppercase; }
        .cs-title-accent { color:#f97316; }
        .cs-header-right { display:flex; flex-direction:column; align-items:flex-end; gap:16px; flex-shrink:0; }
        .cs-count-num { font-size:clamp(3rem,7vw,6rem); font-weight:900; line-height:0.85; letter-spacing:-0.06em; color:#fff; opacity:0.12; display:block; transition:opacity 0.3s ease; }
        .cs-section:hover .cs-count-num { opacity:0.2; }
        .cs-count-label { font-size:0.85rem; letter-spacing:0.18em; text-transform:uppercase; color:#888; margin-top:4px; display:block; }
        .cs-marquee-wrap { position:relative; z-index:2; overflow:hidden; }
        .cs-marquee-row { display:flex; overflow:hidden; border-bottom:1px solid #0d0d0d; }
        .cs-marquee-row:first-child { border-top:1px solid #0d0d0d; }
        @keyframes cs-fwd { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes cs-rev { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        .cs-track { display:flex; width:max-content; animation:cs-fwd 32s linear infinite; will-change:transform; }
        .cs-track-rev { display:flex; width:max-content; animation:cs-rev 44s linear infinite; will-change:transform; }
        .cs-marquee-wrap:hover .cs-track,.cs-marquee-wrap:hover .cs-track-rev { animation-play-state:paused; }
        .cs-card { display:flex; align-items:center; gap:18px; padding:18px 28px; border-right:1px solid #0d0d0d; flex-shrink:0; position:relative; cursor:default; transition:background 0.25s ease; min-width:260px; height:80px; overflow:hidden; }
        .cs-card::before { content:''; position:absolute; inset:0; background:#f97316; transform:translateY(101%); transition:transform 0.32s cubic-bezier(0.76,0,0.24,1); z-index:0; }
        .cs-card:hover::before { transform:translateY(0); }
        .cs-logo-wrap { width:100px; height:54px; display:flex; align-items:center; justify-content:center; flex-shrink:0; position:relative; z-index:1; }
        .cs-logo { max-width:100%; max-height:100%; object-fit:contain; filter:brightness(0) invert(1); opacity:0.35; transition:opacity 0.3s ease,transform 0.3s ease,filter 0.3s ease; }
        .cs-card:hover .cs-logo { opacity:1; filter:brightness(0); transform:scale(1.08); }
        .cs-name { font-size:0.7rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#bdbdbd; white-space:nowrap; transition:color 0.25s ease; position:relative; z-index:1; }
        .cs-card:hover .cs-name { color:#000; }
        .cs-sep { font-size:0.45rem; color:#1c1c1c; flex-shrink:0; position:relative; z-index:1; transition:color 0.25s ease; }
        .cs-card:hover .cs-sep { color:rgba(0,0,0,0.3); }
        .cs-card-ghost .cs-logo { opacity:0.1; } .cs-card-ghost .cs-name { color:#2a2a2a; }
        .cs-card-ghost:hover .cs-name { color:#000; } .cs-card-ghost:hover .cs-logo { opacity:1; filter:brightness(0); }
        .cs-explore-strip { position:relative; z-index:2; display:flex; align-items:center; justify-content:flex-end; padding:20px; border-top:1px solid #111; }
        @media(min-width:768px){ .cs-explore-strip{padding:20px 48px;} }
        .cs-stat-bar { display:flex; flex-wrap:wrap; border-top:1px solid #111; position:relative; z-index:2; }
        .cs-stat-cell { flex:1; min-width:120px; padding:22px 24px; border-right:1px solid #111; display:flex; flex-direction:column; gap:5px; transition:background 0.22s ease; cursor:default; position:relative; overflow:hidden; }
        .cs-stat-cell::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:#f97316; transform:scaleX(0); transform-origin:left; transition:transform 0.3s cubic-bezier(0.76,0,0.24,1); }
        .cs-stat-cell:hover::before { transform:scaleX(1); }
        .cs-stat-cell:last-child { border-right:none; }
        .cs-stat-cell:hover { background:#070707; }
        .cs-stat-val { font-size:clamp(1.6rem,3.5vw,2.4rem); font-weight:900; letter-spacing:-0.04em; color:#fff; line-height:1; }
        .cs-stat-lbl { font-size:0.55rem; letter-spacing:0.22em; text-transform:uppercase; color:#777; transition:color 0.2s ease; }
        .cs-stat-cell:hover .cs-stat-lbl { color:#f97316; }
        @media(max-width:480px){ .cs-card{padding:14px 18px;min-width:180px;height:70px;} .cs-logo-wrap{width:72px;height:40px;} .cs-name{font-size:0.6rem;} }
      `}</style>

      <main className="bg-black text-white min-h-screen">
        <div className="fixed inset-0 z-[999] pointer-events-none opacity-[0.025]"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat:"repeat", backgroundSize:"128px 128px", mixBlendMode:"overlay" }}
        />

        <SiteHeader scrollWork />

        <section className="relative w-full overflow-hidden" style={{ minHeight:"100svh" }}>
          <video
            src="https://res.cloudinary.com/dta1dl0pj/video/upload/q_auto:best/f_auto/v1779299532/old_reel_revamped_du8rtf.mp4"
            autoPlay muted loop playsInline preload="auto"
            style={{
              position:"absolute", inset:0,
              width:"100%", height:"100%",
              objectFit:"cover", objectPosition:"center",
              zIndex:0,
              /* Boost clarity — extra contrast & saturation, sharper rendering */
              filter:"contrast(1.08) saturate(1.12) brightness(1.05)",
              imageRendering:"high-quality",
              WebkitBackfaceVisibility:"hidden",
              backfaceVisibility:"hidden",
              transform:"translateZ(0)",
            }}
          />
          {/* Lighter overlay — was 0.52→0.75 top/bot, now 0.35→0.55 so video reads brighter */}
          <div style={{ position:"absolute", inset:0, zIndex:1, background:"linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%)" }} />
          <div style={{ position:"relative", zIndex:3 }} className="px-5 md:px-8 pt-24 pb-16 md:pb-24 flex flex-col justify-end min-h-[100svh]">
            <p className="text-orange-500 uppercase tracking-[0.25em] md:tracking-[0.3em] text-xs md:text-sm mb-5">Creative Strategy Studio</p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] max-w-5xl">
              Culture-First Branding For Brands That Refuse To Look Average.
            </h2>
            <p className="text-gray-300 mt-6 md:mt-8 max-w-2xl text-base md:text-xl leading-relaxed">
              UNFLTR Is A Multidisciplinary Creative Studio Blending Branding, Marketing, Motion, And Strategy Into Culturally Relevant Brand Systems.
            </p>
            <div className="mt-8 md:mt-12">
              <div className="flex flex-wrap items-center gap-3 md:gap-5 mb-5 md:mb-6">
                <div className="flex items-center gap-2">
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#f97316", display:"inline-block", animation:"pulse-dot 2s ease-in-out infinite" }} />
                  <span className="text-xs uppercase tracking-[0.16em] text-white/50">Showreel 2025</span>
                </div>
                <div style={{ height:1, width:28, background:"rgba(255,255,255,0.18)" }} className="hidden sm:block" />
                <span className="text-xs uppercase tracking-[0.16em] text-white/30 hidden sm:inline">Est. 2024</span>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href="/about" className="hero-clients-cta md:hidden">
                  <span>About Us</span><span className="hero-cta-arrow">→</span>
                </Link>
                <Link href="/clients" className="hero-clients-cta">
                  <span className="hero-cta-dot" />Our Clients<span className="hero-cta-arrow">→</span>
                </Link>
                <Link href="/services" className="hero-services-cta">
                  <span>Services We Offer</span><span className="svc-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <OurWorkTitle />
        <PortfolioGrid />
        <ClientsSection />

        <Link href="/contact">
          <section className="chat-marquee-section">
            <div style={{ overflow:"hidden" }}>
              <div className="chat-marquee-track">
                {Array(16).fill(null).map((_,i) => (
                  <span key={i} className="chat-marquee-word">Let&apos;s Have A Chat <span className="chat-marquee-dot">—</span>&nbsp;</span>
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

function ClientsSection() {
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);
  const statsRef = useRef(null);
  const clients = [
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
  const row1 = [...clients, ...clients];
  const row2 = [...clients, ...clients].reverse();
  useEffect(() => {
    [[headerRef,0],[marqueeRef,100],[statsRef,200]].forEach(([ref,delay]) => {
      const el = ref.current; if (!el) return;
      el.style.opacity="0"; el.style.transform="translateY(32px)";
      el.style.transition=`opacity 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms, transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}ms`;
      const obs = new IntersectionObserver(([e]) => {
        el.style.opacity=e.isIntersecting?"1":"0";
        el.style.transform=e.isIntersecting?"translateY(0)":"translateY(32px)";
      }, { threshold:0.08 });
      obs.observe(el);
    });
  }, []);
  return (
    <section className="cs-section" id="clients-section">
      <div className="cs-watermark" aria-hidden="true">TRUSTED</div>
      <div className="cs-slash" aria-hidden="true" />
      <div className="cs-header" ref={headerRef}>
        <div>
          <p className="cs-eyebrow"><span className="cs-eyebrow-line" />Trusted By</p>
          <h2 className="cs-title">Brands That<br /><span className="cs-title-accent">Chose Bold.</span></h2>
        </div>
        <div className="cs-header-right">
          <div><span className="cs-count-num">{clients.length}</span><span className="cs-count-label">Clients & Counting</span></div>
        </div>
      </div>
      <div className="cs-marquee-wrap" ref={marqueeRef}>
        <div className="cs-marquee-row"><div className="cs-track">{row1.map((c,i) => (<div key={i} className="cs-card"><div className="cs-logo-wrap"><img src={c.logo} alt={c.name} className="cs-logo" loading="lazy" /></div><span className="cs-name">{c.name}</span><span className="cs-sep">✦</span></div>))}</div></div>
        <div className="cs-marquee-row"><div className="cs-track-rev">{row2.map((c,i) => (<div key={i} className="cs-card cs-card-ghost"><div className="cs-logo-wrap"><img src={c.logo} alt={c.name} className="cs-logo" loading="lazy" /></div><span className="cs-name">{c.name}</span><span className="cs-sep" style={{color:"#f97316",opacity:0.2}}>—</span></div>))}</div></div>
      </div>
      <div className="cs-explore-strip"><Link href="/clients" className="brutal-link">View More Brands<span className="brutal-link-arrow">→</span></Link></div>
      <div className="cs-stat-bar" ref={statsRef}>
        {[{val:`${clients.length}+`,lbl:"Clients Served"},{val:"3+",lbl:"Years Active"},{val:"110+",lbl:"Projects Delivered"},{val:"∞",lbl:"Culturally Driven"}].map(s => (
          <div key={s.lbl} className="cs-stat-cell"><span className="cs-stat-val">{s.val}</span><span className="cs-stat-lbl">{s.lbl}</span></div>
        ))}
      </div>
    </section>
  );
}