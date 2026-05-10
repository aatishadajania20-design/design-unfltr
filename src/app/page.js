import Link from "next/link";
import PortfolioGrid from "@/components/PortfolioGrid";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen font-['Helvetica_Neue',_'Arial',_sans-serif]">

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

        {/* LOGO */}
        <h1 className="text-orange-500 text-xl font-semibold tracking-tight">
          UNFLTR Studio®
        </h1>

       {/* MENU */}
<div className="hidden md:flex items-center gap-2 text-sm">
  <style>{`
    .nav-item {
      position: relative;
      cursor: pointer;
      padding: 6px 16px;
      overflow: hidden;
    }

    /* The diagonal red slash — starts offscreen bottom-left, sweeps to top-right */
    .nav-item::before {
      content: '';
      position: absolute;
      bottom: -2px;
      left: -100%;
      width: 100%;
      height: 2px;
      background: #f97316;
      transform: skewX(-20deg);
      transition: left 0.22s cubic-bezier(0.76, 0, 0.24, 1);
    }

    .nav-item:hover::before {
      left: 0;
    }

    /* Dot that appears top-right corner */
    .nav-item::after {
      content: '●';
      position: absolute;
      top: 2px;
      right: 4px;
      font-size: 5px;
      color: #f97316;
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.15s ease 0.1s, transform 0.15s ease 0.1s;
    }

    .nav-item:hover::after {
      opacity: 1;
      transform: scale(1);
    }

    .nav-label {
      display: block;
      color: #9ca3af;
      letter-spacing: 0.04em;
      transition: color 0.2s ease, letter-spacing 0.3s cubic-bezier(0.76, 0, 0.24, 1);
    }

    .nav-item:hover .nav-label {
      color: #ffffff;
      letter-spacing: 0.12em;
    }
  `}</style>

  {["Branding", "Strategy", "Marketing", "Motion"].map((item) => (
    <div key={item} className="nav-item">
      <span className="nav-label">{item}</span>
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
            <button className="border border-orange-500 text-orange-500 px-6 py-2 rounded-xl hover:bg-orange-500 hover:text-black transition">
              Contact
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
  );
}

function AllWorksMarquee() {
  const text = "ALL WORKS — ";
  const repeated = Array(12).fill(text).join("");

  return (
    <section className="w-full overflow-hidden border-t border-zinc-900 bg-black py-5 cursor-pointer select-none marquee-section">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-section .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 14s linear infinite;
        }
        .marquee-section:hover .marquee-track {
          animation: marquee-scroll 5s linear infinite;
        }
        .marquee-section:hover {
          filter: invert(1);
        }
      `}</style>

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