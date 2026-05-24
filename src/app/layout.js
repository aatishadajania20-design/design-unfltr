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
    "UNFLTR Studio is a multidisciplinary creative studio blending branding, marketing, motion, and strategy into culturally relevant brand systems.",

  keywords: [
    "UNFLTR",
    "UNFLTR Studio",
    "Creative Studio",
    "Branding",
    "Design Agency",
    "Motion Design",
    "Creative Direction",
    "Portfolio",
    "Marketing",
    "Visual Identity",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} font-sans bg-black text-white`}
      >
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