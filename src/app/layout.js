import "./globals.css";

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

  description: "Creative strategy and branding studio",

  keywords: [
    "UNFLTR",
    "UNFLTR Studio",
    "Creative Studio",
    "Branding",
    "Design Agency",
    "Portfolio",
  ],

  authors: [
    {
      name: "UNFLTR Studio",
    },
  ],

  creator: "UNFLTR Studio",

  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],

    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],

    shortcut: ["/icon.png"],
  },

  openGraph: {
    title: "UNFLTR Studio",
    description: "Creative strategy and branding studio",

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

    description: "Creative strategy and branding studio",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} font-sans bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}