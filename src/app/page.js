import Link from "next/link";
import PortfolioGrid from "@/components/PortfolioGrid";

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        * {
          font-family: 'Neue Haas Grotesk Display Pro', 'Helvetica Neue', Arial, sans-serif;
        }

        .brand-letter {
          display: inline-block;
          transition: color 0.2s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .brand-wrap:hover .brand-letter {
          color: #ffffff;
        }
        .brand-wrap:hover .brand-letter:nth-child(1) { transform: translateY(-3px); transition-delay: 0ms; }
        .brand-wrap:hover .brand-letter:nth-child(2) { transform: translateY(-3px); transition-delay: 40ms; }
        .brand-wrap:hover .brand-letter:nth-child(3) { transform: translateY(-3px); transition-delay: 80ms; }
        .brand-wrap:hover .brand-letter:nth-child(4) { transform: translateY(-3px); transition-delay: 120ms; }
        .brand-wrap:hover .brand-letter:nth-child(5) { transform: translateY(-3px); transition-delay: 160ms; }
        .brand-wrap:hover .brand-letter:nth-child(6) { transform: translateY(-3px); transition-delay: 200ms; }
        .brand-suffix {
          transition: color 0.2s ease 0.24s;
          color: #f97316;
        }
        .brand-wrap:hover .brand-suffix {
          color: #ffffff;
        }

        .logo-svg {
          transition: filter 0.3s ease, transform 0.3s ease;
        }
        .brand-wrap:hover .logo-svg {
          filter: invert(1) sepia(1) saturate(5) hue-rotate(340deg) brightness(1);
          transform: rotate(15deg) scale(1.1);
        }

        .contact-btn {
          position: relative;
          overflow: hidden;
          border: 1px solid #f97316;
          color: #f97316;
          padding: 8px 24px;
          border-radius: 4px;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          transition: color 0.3s ease;
        }
        .contact-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #f97316;
          transform: translateX(-101%);
          transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 0;
        }
        .contact-btn:hover::before {
          transform: translateX(0);
        }
        .contact-btn:hover {
          color: #000;
        }
        .contact-btn-text {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .contact-arrow {
          display: inline-block;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s ease 0.1s, transform 0.2s ease 0.1s;
        }
        .contact-btn:hover .contact-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .nav-item {
          position: relative;
          cursor: pointer;
          padding: 6px 16px;
          overflow: hidden;
        }
        .nav-label {
          display: block;
          color: #9ca3af;
          letter-spacing: 0.04em;
          transition: color 0.2s ease, letter-spacing 0.35s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .nav-item:hover .nav-label {
          color: #ffffff;
          letter-spacing: 0.14em;
        }
        .nav-slash {
          position: absolute;
          bottom: 2px;
          left: 16px;
          right: 16px;
          height: 2px;
          background: #f97316;
          transform: translateX(-110%) skewX(-20deg);
          transition: transform 0.25s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .nav-item:hover .nav-slash {
          transform: translateX(0%) skewX(-20deg);
        }
        .nav-dot {
          position: absolute;
          top: 4px;
          right: 6px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #f97316;
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.15s ease 0.12s, transform 0.15s ease 0.12s;
        }
        .nav-item:hover .nav-dot {
          opacity: 1;
          transform: scale(1);
        }

        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-section .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 20s linear infinite;
        }
        .marquee-section:hover .marquee-track {
          animation: marquee-scroll 10s linear infinite;
        }
        .marquee-section:hover {
          filter: invert(1);
        }
      `}</style>

      <main className="bg-black text-white min-h-screen">

        {/* GRAIN OVERLAY */}
        <div
          className="fixed inset-0 z-[999] pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            mixBlendMode: "overlay",
          }}
        />

        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-black/40 border-b border-zinc-900">

          {/* LOGO + BRAND */}
          <div className="brand-wrap flex items-center gap-3 cursor-pointer select-none">
            <svg
              className="logo-svg"
              width="28"
              height="28"
              viewBox="0 0 88.82 89.67"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M87.83,30.06l-9.18-15.9-25.02,14.44V-.31h-18.36v28.96L10.17,14.16.99,30.06l25.06,14.47-8.94,5.16c1.82,2.36,3.63,4.73,5.45,7.09l-3.75,5.23c1.33,1.86,2.66,3.73,3.99,5.59l12.47-7.2v28.96h18.36v-28.91l25.02,14.44,9.18-15.9-25.06-14.46,25.06-14.47Z"
                  fill="white"
                />
                <path
                  d="M.99,58.99l9.18,15.9,10.68-6.16c-1.79-2.09-3.57-4.17-5.36-6.26,1.33-1.76,2.66-3.51,3.99-5.27-1.72-1.97-3.44-3.93-5.16-5.9"
                  fill="white"
                />
              </g>
            </svg>

            <h1 className="text-orange-500 text-xl font-semibold tracking-tight leading-none">
              {"UNFLTR".split("").map((char, i) => (
                <span key={i} className="brand-letter">{char}</span>
              ))}
              <span className="brand-suffix"> Studio®</span>
            </h1>
          </div>

          {/* MENU */}
          <div className="hidden md:flex items-center gap-2 text-sm">
            {["Branding", "Strategy", "Marketing", "Motion"].map((item) => (
              <div key={item} className="nav-item">
                <span className="nav-label">{item}</span>
                <span className="nav-slash" aria-hidden="true" />
                <span className="nav-dot" aria-hidden="true" />
              </div>
            ))}
          </div>

         {/* ACTIONS */}
<div className="flex items-center gap-4">

  <a
    href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ=="
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-orange-500 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-4.74-4.74 4 4 0 0 1 4.74 4.74z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  </a>

  <Link href="/contact">
    <button className="contact-btn">
      <span className="contact-btn-text">
        <span className="contact-arrow">→</span>
        Contact
      </span>
    </button>
  </Link>

</div>

        </nav>

        {/* HERO SECTION */}
        <section className="px-8 mt-24 pb-10">
          <p className="text-orange-500 uppercase tracking-[0.3em] text-sm">
            Creative Strategy Studio
          </p>
          <h2 className="text-6xl md:text-8xl font-bold leading-[0.95] max-w-6xl mt-6">
            Building brands people remember, trust, and talk about.
          </h2>
          <p className="text-gray-400 mt-10 max-w-3xl text-xl leading-relaxed">
            UNFLTR is a multidisciplinary creative studio blending branding, strategy, marketing,
            visual identity, and digital design.
          </p>
        </section>

        {/* PORTFOLIO */}
        <PortfolioGrid />

        {/* ALL WORKS MARQUEE */}
        <AllWorksMarquee />

      </main>
    </>
  );
}

function AllWorksMarquee() {
  const text = "ALL WORKS — ";
  const repeated = Array(12).fill(text).join("");

  return (
    <section className="w-full overflow-hidden border-t border-zinc-900 bg-black py-5 cursor-pointer select-none marquee-section">
      <div className="overflow-hidden">
        <div className="marquee-track">
          <span className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase whitespace-nowrap pr-8">
            {repeated}
          </span>
          <span className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase whitespace-nowrap pr-8">
            {repeated}
          </span>
        </div>
      </div>
    </section>
  );
}