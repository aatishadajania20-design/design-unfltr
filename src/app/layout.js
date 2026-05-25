import "./globals.css";

import Script from "next/script";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata = {
  metadataBase: new URL("https://unfltrstudio.in"),

  title: {
    default: "UNFLTR Studio",
    template: "%s | UNFLTR Studio",
  },

  description:
    "UNFLTR Studio is a multidisciplinary creative studio based in India — branding, content, films, CGI, and web for brands that refuse to look average. 37+ clients. 110+ projects.",

  keywords: [
    "UNFLTR Studio",
    "UNFLTR",
    "Creative Studio India",
    "Branding Agency India",
    "Design Agency India",
    "Motion Design India",
    "CGI Studio India",
    "Film Production India",
    "Web Design Agency India",
    "Brand Identity Design",
    "Creative Direction India",
    "Event Branding India",
    "Content Marketing India",
    "Visual Identity",
    "Culture-First Creative",
    "Multidisciplinary Creative Studio",
    "Concert Visual Design",
    "Music Artist Branding",
    "Luxury Brand Design India",
    "Performance Marketing Creative",
  ],

  authors: [
    {
      name: "UNFLTR Studio",
      url: "https://unfltrstudio.in",
    },
  ],

  creator: "UNFLTR Studio",

  publisher: "UNFLTR Studio",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],

    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],

    shortcut: "/icon-32.png",
  },

  openGraph: {
    title: "UNFLTR Studio",

    description:
      "UNFLTR Studio is a multidisciplinary creative studio blending branding, marketing, motion, and strategy into culturally relevant brand systems.",

    url: "https://unfltrstudio.in",

    siteName: "UNFLTR Studio",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UNFLTR Studio",
      },
    ],

    locale: "en_US",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "UNFLTR Studio",

    description:
      "UNFLTR Studio is a multidisciplinary creative studio blending branding, marketing, motion, and strategy into culturally relevant brand systems.",

    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://unfltrstudio.in",
  },
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://unfltrstudio.in/#organization",
      name: "UNFLTR Studio",
      alternateName: "UNFLTR",
      description:
        "Multidisciplinary creative studio based in India specialising in branding, content marketing, film production, CGI, and web design. Culture-first creative for brands that refuse to look average.",
      url: "https://unfltrstudio.in",
      logo: {
        "@type": "ImageObject",
        "@id": "https://unfltrstudio.in/#logo",
        url: "https://unfltrstudio.in/icon-512.png",
        width: 512,
        height: 512,
        caption: "UNFLTR Studio",
      },
      image: "https://unfltrstudio.in/og-image.png",
      email: "unfltrstudios@gmail.com",
      telephone: "+918849752299",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      foundingDate: "2022",
      slogan: "Culture-First Creative Studio",
      areaServed: "Worldwide",
      knowsAbout: [
        "Brand Identity Design",
        "Visual Identity",
        "Motion Design",
        "CGI Production",
        "Film Production",
        "Content Marketing",
        "Creative Direction",
        "Web Design",
        "Event Branding",
        "Advertising",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Creative Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Branding",
              description:
                "Raw identity systems — deep-dive strategy, visual identity design, and brand architecture consulting.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Content",
              description:
                "Multi-channel content ecosystems, high-impact advertising, and culturally native campaigns.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Films",
              description:
                "Full-lifecycle film production — creative direction, cinematography, and post-production editing.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "CGI",
              description:
                "Photorealistic 3D rendering and hyper-stylized motion design with no physical limits.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Design",
              description:
                "High-performance bespoke websites built from scratch — brutalist grids, kinetic typography, no templates.",
            },
          },
        ],
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "unfltrstudios@gmail.com",
        telephone: "+918849752299",
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://unfltrstudio.in/#website",
      url: "https://unfltrstudio.in",
      name: "UNFLTR Studio",
      description:
        "Portfolio and services of UNFLTR Studio — a culture-first multidisciplinary creative agency based in India.",
      publisher: { "@id": "https://unfltrstudio.in/#organization" },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body
        className={`${spaceGrotesk.variable} font-sans bg-black text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
        {children}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="817bbb5a-f692-4356-8cb7-3805a3b4f4a9"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}