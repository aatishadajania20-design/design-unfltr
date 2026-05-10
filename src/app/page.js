import Link from "next/link";
import { Instagram as InstagramIcon } from "lucide-react";
import PortfolioGrid from "@/components/PortfolioGrid";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-md bg-black/40 border-b border-zinc-900">

        {/* LOGO */}
        <h1 className="text-orange-500 text-xl font-semibold">
          UNFLTR Studio®
        </h1>

        {/* MENU */}
        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <p>Branding</p>
          <p>Strategy</p>
          <p>Marketing</p>
          <p>Motion</p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">

          {/* INSTAGRAM */}
          <a
            href="https://www.instagram.com/unfltrr?igsh=MWN0Y2ozZjk4NHpubQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-500 transition"
          >
            <InstagramIcon size={22} />
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

    </main>
  );
}