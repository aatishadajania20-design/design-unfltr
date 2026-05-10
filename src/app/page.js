import Link from "next/link";
import PortfolioGrid from "@/components/PortfolioGrid";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen font-['Helvetica_Neue',_'Arial',_sans-serif]">

      {/* GRAIN OVERLAY — fixed, covers entire viewport */}
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

        {/* MENU — kinetic underline on hover */}
        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          {["Branding", "Strategy", "Marketing", "Motion"].map((item) => (
            <div key={item} className="group relative cursor-pointer overflow-hidden py-1">
              <span className="block transition-transform duration-150 group-hover:-translate-y-full">
                {item}
              </span>
              <span className="absolute top-full left-0 block text-white font-bold tracking-widest uppercase transition-transform duration-150 group-hover:-translate-y-full">
                {item}
              </span>
              {/* mechanical sliding underline */}
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-orange-500 transition-all duration-200 ease-in-out group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">

          {/* INSTAGRAM SVG */}
          
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

          {/* CONTACT */}
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

      {/* ALL WORKS MARQUEE — bottom of page */}
      <AllWorksMarquee />

    </main>
  );
}

/* ─── ALL WORKS MARQUEE ─────────────────────────────────────── */
function AllWorksMarquee() {
  const text = "ALL WORKS — ";
  const repeated = Array(12).fill(text).join("");

  return (
    <section
      className="group w-full overflow-hidden border-t border-zinc-900 bg-black py-5 cursor-pointer select-none"
    >
      <style>{`
        @keyframes marquee-normal {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-fast {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-normal 14s linear infinite;
        }
        .marquee-section:hover .marquee-track {
          animation: marquee-fast 5s linear infinite;
          color: #ef4444;
        }
        .marquee-section:hover {
          background-color: #000;
          filter: invert(1);
        }
      `}</style>

      <div className="marquee-section overflow-hidden">
        <div className="marquee-track">
          {/* doubled for seamless loop */}
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