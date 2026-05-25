import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Work from '@/lib/models/Work';
import Client from '@/lib/models/Client';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// ── Static works (25 projects) ────────────────────────────────────────────────
const STATIC_WORKS = [
  {
    title:    "Talwiinder Sponsorship Deck 2024",
    category: "Concert Deck",
    slug:     "talwiinder-sponsorship-deck-2024",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778517729/Talwiinder_Sponsorship_Deck_2024_concert_fyuxcm.jpg",
    desc:     "A high-impact sponsorship deck built to place Talwiinder's world-tour in front of the right money. Every page engineered to convert — market positioning, audience data, and visual storytelling fused into a document that closes deals.",
  },
  {
    title:    "Infected Mushroom 2024",
    category: "Concert Visuals",
    slug:     "infected-mushroom-2024",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778517728/Infected_Mushroom_2024_Concert__deluyq.jpg",
    desc:     "Psychedelic precision. Visual identities for one of electronic music's most iconic acts, translated into India-ready concert collateral — from stage graphics to ticketing assets. Trippy by design, sharp by intent.",
  },
  {
    title:    "Keinemusik Artwork Concept",
    category: "Concept Art",
    slug:     "keinemusik-artwork-concept",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778517729/Keinemusik_artwork_Concept_Artwork_for_Team_Innovation_avjlsk.png",
    desc:     "An unsolicited concept that refused to stay quiet. Inspired by Keinemusik's raw collective energy, this artwork strips the brand back to texture, grain, and pure mood — no polish, just presence.",
  },
  {
    title:    "Ace Graphic Design",
    category: "Social Media",
    slug:     "ace-graphic-design",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778517727/Ace_Graphic_Design_For_social_Media_uisefk.jpg",
    desc:     "Social-first design built to stop the scroll. Bold type, aggressive color contrast, and layout logic that makes every format — story, reel, grid tile — feel intentional and unmissable.",
  },
  {
    title:    "Cosmic Fri Nights",
    category: "Event Design",
    slug:     "cosmic-fri-nights",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778517728/cosmic_fri_nights_for_Four_Seasons_Hotel_Event_2024_hhkhav.png",
    desc:     "Four Seasons asked for Friday night energy. We delivered a universe. A recurring event identity that blends celestial aesthetics with luxury hospitality — making every week feel like a premiere.",
  },
  {
    title:    "Team Innovation Concept",
    category: "Video Production",
    slug:     "1st-patt",
    image:    "https://res.cloudinary.com/dta1dl0pj/video/upload/q_auto/f_auto/so_0/v1778521162/1st_pattx2.jpg",
    video:    "https://res.cloudinary.com/dta1dl0pj/video/upload/q_auto/f_auto/v1778521162/1st_pattx2.mp4",
    desc:     "Motion as a brief. This production concept pushes cinematic language into the cultural space — tight editing rhythm, visceral sound design, and imagery that hits before the brain catches up.",
  },
  {
    title:    "Karan Aujla Concept",
    category: "Concept Artwork",
    slug:     "karan-aujla-concept",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778517727/karan_Aujla_concept_artwork_for_team_innovation_dc8rj3.jpg",
    desc:     "Fan energy, professional execution. A concept artwork series for one of Punjab's biggest exports, capturing the raw street-to-stadium trajectory in visual form. No brief — just respect for the art.",
  },
  {
    title:    "Chic Therapy Decor",
    category: "Marketing Ad",
    slug:     "chic-therapy-decor-2025",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778517727/Chic_Therapy_Decor_AD_Marketing_2025_ikrfkt.jpg",
    desc:     "Luxury interior design meets performance marketing. Ad creative built to sell aspirational living — every frame curated like a magazine spread, every CTA engineered for conversion.",
  },
  {
    title:    "Afroboss London",
    category: "Event Branding",
    slug:     "afroboss-london-2024",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778517727/Afroboss_event_in_london_2024__degan9.jpg",
    desc:     "Afrobeats meets London grit. A full event brand identity crossing continents in its visual DNA — warm earth tones cut with brutalist type, created to pack rooms and trend on timelines simultaneously.",
  },
  {
    title:    "UNFLTR",
    category: "Video Production",
    slug:     "unfltr",
    image:    "https://res.cloudinary.com/dta1dl0pj/video/upload/q_auto/f_auto/so_0/v1778522412/UNFLTR_h303fp.jpg",
    video:    "https://res.cloudinary.com/dta1dl0pj/video/upload/q_auto/f_auto/v1778522412/UNFLTR_h303fp.mp4",
    desc:     "This is us, unfiltered. Our own showreel — built to demonstrate everything we preach. Kinetic editing, culturally native references, and motion work that proves the brand walks the talk.",
  },
  {
    title:    "Hype Hijacking Tryst",
    category: "DJ Event",
    slug:     "hype-hijacking-tryst-2023",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519894/hype_hijacking_tryst_Tej_DJ_event_2023_ef7w95.png",
    desc:     "A takeover needs visuals that own the room before the music drops. Built for Tej's residency at Tryst — aggressive, dark, and wired — the kind of creative that makes people screenshot the flyer.",
  },
  {
    title:    "Yzy Slides AD",
    category: "Product Marketing",
    slug:     "yzy-slides-mainstreet-marketplace",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519894/Yzy_Slides_AD_for_Mainstreet_Marketplace_wgilel.jpg",
    desc:     "Streetwear ad language applied to resale culture. A product shoot-meets-editorial for one of sneaker culture's most divisive silhouettes — minimal, deliberate, and built for the people who get it.",
  },
  {
    title:    "Acoustic Night",
    category: "Live Music",
    slug:     "acoustic-night-amann-soni-2024",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519894/acoustic_night_by_amann_soni_Saqi_2024_ouah9y.png",
    desc:     "Intimate energy, big design. Event creative for Amann Soni's acoustic set at Saqi — the brief was warmth. The output is a visual identity that makes a small room feel like a moment worth remembering.",
  },
  {
    title:    "Daddy Cool",
    category: "Graphic Design",
    slug:     "daddy-cool-2021",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778517729/daddy_cool_Graphic_Design_2021_tyg2tq.png",
    desc:     "Retro nostalgia weaponised. A graphic design piece that mines 70s confidence and reframes it for a modern audience — loud colours, thick fonts, and zero apologies. A reminder that cool never ages.",
  },
  {
    title:    "Taj Lands End Bar Night",
    category: "Tech House Event",
    slug:     "taj-lands-end-tech-house-2025",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519894/Taj_Lands_End_bar_Night_Tech_House_2025_p0mnkd.jpg",
    desc:     "Five-star venue, underground sound. The rare brief where luxury and rave culture share the same brief. We found the intersection — clinical grids, dark palettes, and the Taj's heritage used as counterpoint.",
  },
  {
    title:    "Bollywood Soirée",
    category: "Event Branding",
    slug:     "bollywood-soiree-july",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519893/Copy_of_bollywood_soiree_20_th_july_v1.1_uezspp.png",
    desc:     "Old Bollywood glamour, reimagined without the kitsch. A recurring event brand that treats Hindi cinema as a genuine aesthetic movement — saturated, filmic, and intoxicatingly nostalgic.",
  },
  {
    title:    "Akhil The Singer Concert",
    category: "Concert Poster",
    slug:     "akhil-singer-concert-2024",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519891/Akhil_The_Singer_Concert_2024_dzjtbd.jpg",
    desc:     "Akhil commands rooms with his voice — the poster had to match that gravity. A concert identity built around emotional pull: soft haze, strong typography, and a visual hierarchy that puts the artist first.",
  },
  {
    title:    "Chic Therapy Marketing",
    category: "AD Marketing",
    slug:     "chic-therapy-marketing-2025",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519891/Chic_Therapy_AD_Marketing_2025_lob323.jpg",
    desc:     "Performance creative that looks expensive. A 2025 campaign for Chic Therapy built to convert at scale — aspirational enough to stop the scroll, direct enough to drive purchase.",
  },
  {
    title:    "House of Horrors",
    category: "BMS Banner",
    slug:     "house-of-horrors-2024",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519893/House_of_Horrors_book_my_show_banner_2024_kmwwjw.png",
    desc:     "BookMyShow banner work that earns its real estate. Built to drive clicks in a high-competition environment — horror aesthetic dialled to eleven, with ticket-sale urgency baked into every design decision.",
  },
  {
    title:    "Chic Therapy Decor",
    category: "Performance Marketing",
    slug:     "chic-therapy-decor-performance",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519891/Chic_Thearpy_Decor_Ad_for_Performance_Marketing_bjcktk.jpg",
    desc:     "Data-driven creative that refuses to look data-driven. Performance ad assets built for Chic Therapy's decor vertical — each variation designed to test without feeling like a test.",
  },
  {
    title:    "Certified Thrift Ad 2025",
    category: "Advertisement",
    slug:     "certified-thrift-ad-2025",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519891/certified_thrift_Ad_2025_wsusjk.jpg",
    desc:     "Second-hand culture, first-class creative. An ad campaign for India's premium thrift market — the brief was making pre-owned feel like a flex. Mission accomplished.",
  },
  {
    title:    "A Night Under The Stars",
    category: "Event Design",
    slug:     "a-night-under-the-stars-la-mar",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519891/a_night_under_the_stars_Event_La_Mar_2024_qvdzmp.png",
    desc:     "La Mar's rooftop dining experience deserved a visual identity as atmospheric as the setting. Celestial typography, deep indigo gradients, and a layout that makes the event feel unmissable before a single word is read.",
  },
  {
    title:    "House Party Event HYPE",
    category: "Visual Design",
    slug:     "house-party-event-2023",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519892/house_party_event_2023_HYPE_fpsjos.png",
    desc:     "Underground energy, above-ground execution. HYPE's house party series needed visuals that felt like bass in your chest — raw, kinetic, and instantly identifiable as something worth showing up for.",
  },
  {
    title:    "Swiped Dating App Party",
    category: "Event Branding",
    slug:     "swiped-dating-app-party-2023",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778519893/swiped_Dating_App_Party_Event_2023_vlajxp.jpg",
    desc:     "When a dating app throws a party, the creative has to carry the flirt. A bold, irreverent event identity for Swiped — playful but never cheap, designed to make the app feel like a cultural movement.",
  },
  {
    title:    "Ain't Bros",
    category: "Album Art",
    slug:     "aint-bros-v2",
    image:    "https://res.cloudinary.com/dta1dl0pj/image/upload/q_auto/f_auto/v1778523420/Ain_t_Bros_tvg7qe.jpg",
    desc:     "Album art that sets the tone before the first track plays. A visual statement for the project — confrontational, textured, and built to live as loudly on streaming thumbnails as it does on merchandise.",
  },
];

// ── Static clients (36 clients) ───────────────────────────────────────────────
const STATIC_CLIENTS = [
  { name: "MNST",               logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/MNST_vyaeim.png" },
  { name: "Cava",               logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/cava_jxvtci.png" },
  { name: "Astro",              logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/astro_oyrcy8.png" },
  { name: "Amazonia",           logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/amazonia_xe1tup.png" },
  { name: "142B Lounge",        logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/142b_lounge_v2zyac.png" },
  { name: "Four Seasons",       logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/4_seasons_cdfk2v.png" },
  { name: "Blunt",              logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/blunt_bjssqi.png" },
  { name: "Lalit",              logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/lalit_n2bxlz.png" },
  { name: "Aquila",             logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747613/aquila_h9muin.png" },
  { name: "V Are",              logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747618/V_Are_xbmhqd.png" },
  { name: "Taj Hotels",         logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747618/Taj_ht3b3n.png" },
  { name: "Tryst",              logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747618/tryst_unuryj.png" },
  { name: "Thakkar",            logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747618/Thakkar_zmbx4v.png" },
  { name: "Kaam",               logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/kaam_y0o5ua.png" },
  { name: "Ishq FM Radio",      logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/ishq_fm_radio_pawtjy.png" },
  { name: "Ignite Ent",         logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/IGNITE_ENT_new_fhvse1.png" },
  { name: "Saqi",               logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/saqi_q5c7ph.png" },
  { name: "Gear",               logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/gear_qknfze.png" },
  { name: "Hype",               logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/hype_logo_smaxvs.png" },
  { name: "Rajiv",              logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747617/rajiv_nltffy.png" },
  { name: "Icarus",             logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/icarus_kkmhpz.png" },
  { name: "Race Lounge Bar",    logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/Race_-_Lounge_Bar_jjnhzi.png" },
  { name: "Paradise",           logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/Paradise_Logo_d3jlyr.png" },
  { name: "Purly",              logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/purly_g0zl2p.png" },
  { name: "Certified Thrift",   logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/certified_thrift_fm9w9l.png" },
  { name: "Emergence",          logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/EMERGENCE_bbe1tx.png" },
  { name: "Dot",                logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747616/dot_gikxtq.png" },
  { name: "C9 Energy",          logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747615/open_file_of_logo_c9_energy_drink-01_zjt0ko.png" },
  { name: "Nirvana",            logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747615/nirvana_xo2ed2.png" },
  { name: "Oracle",             logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747615/orcale_hvrqwy.png" },
  { name: "BookMyShow",         logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/Book_My_Show_Logo-02_White_iwdyfp.png" },
  { name: "Bombay Monks",       logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/bombay_monks_wyhy8q.png" },
  { name: "Clique",             logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/clique_qjgnsu.png" },
  { name: "Monet",              logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/monet_zp3wjm.png" },
  { name: "Mekada",             logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747614/mekada_ng33kr.png" },
  { name: "Ansh Entertainment", logo: "https://res.cloudinary.com/dta1dl0pj/image/upload/v1778747615/logo_2_kv9jqv.png" },
];

export async function POST() {
  const isDev = process.env.NODE_ENV === 'development';
  if (!isDev) {
    const user = await requireAuth();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    // ── Seed Works ──────────────────────────────────────────────────────────
    const workOps = STATIC_WORKS.map((p, i) => ({
      updateOne: {
        filter: { slug: p.slug },
        update: {
          $setOnInsert: {
            title:    p.title,
            slug:     p.slug,
            category: p.category,
            desc:     p.desc     || '',
            image:    p.image    || '',
            video:    p.video    || '',
            client:   p.client   || '',
            services: p.services || [],
            order:    i,
          },
        },
        upsert: true,
      },
    }));

    let workResult;
    const workErrors = [];
    try {
      workResult = await Work.bulkWrite(workOps, { ordered: false });
    } catch (e) {
      workResult = e.result ?? { upsertedCount: 0, matchedCount: 0 };
      if (e.writeErrors) {
        e.writeErrors.forEach(we =>
          workErrors.push(`slug:${STATIC_WORKS[we.index]?.slug} — ${we.errmsg}`)
        );
      }
    }

    // ── Seed Clients ────────────────────────────────────────────────────────
    const clientOps = STATIC_CLIENTS.map((c, i) => ({
      updateOne: {
        filter: { name: c.name },
        update: {
          $setOnInsert: {
            name:         c.name,
            logo:         c.logo     || '',
            subtitle:     c.subtitle || '',
            order:        i,
            gridPosition: i,
            featured:     false,
          },
        },
        upsert: true,
      },
    }));

    let clientResult;
    const clientErrors = [];
    try {
      clientResult = await Client.bulkWrite(clientOps, { ordered: false });
    } catch (e) {
      clientResult = e.result ?? { upsertedCount: 0, matchedCount: 0 };
      if (e.writeErrors) {
        e.writeErrors.forEach(we =>
          clientErrors.push(`name:${STATIC_CLIENTS[we.index]?.name} — ${we.errmsg}`)
        );
      }
    }

    const [totalWorks, totalClients] = await Promise.all([
      Work.countDocuments(),
      Client.countDocuments(),
    ]);

    return NextResponse.json({
      ok: true,
      works: {
        inserted: workResult.upsertedCount  ?? 0,
        existed:  workResult.matchedCount   ?? 0,
        total:    totalWorks,
        errors:   workErrors,
      },
      clients: {
        inserted: clientResult.upsertedCount ?? 0,
        existed:  clientResult.matchedCount  ?? 0,
        total:    totalClients,
        errors:   clientErrors,
      },
    });
  } catch (err) {
    const isDnsError =
      err?.code === 'EREFUSED' ||
      err?.code === 'ENOTFOUND' ||
      err?.code === 'ESERVFAIL' ||
      /querySrv|queryTxt/.test(String(err?.message));
    if (isDnsError) {
      return NextResponse.json({
        ok: false,
        error: 'DNS_RESOLUTION_FAILED',
        message: 'Could not reach MongoDB Atlas via DNS. This is a local network issue — try switching DNS to 1.1.1.1 / 8.8.8.8 or use a different network. Production deployment is not affected.',
        detail: String(err?.message || err),
      }, { status: 503 });
    }
    return NextResponse.json({
      ok: false,
      error: 'DB_OPERATION_FAILED',
      message: 'Database operation failed.',
      detail: String(err?.message || err),
    }, { status: 500 });
  }
}
