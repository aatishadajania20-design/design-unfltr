import "./globals.css";

import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const LOGO_URL =
  "https://res.cloudinary.com/dta1dl0pj/image/upload/v1779453981/UNFLTR_Symbol_Logo_1_klt1he.png";

export const metadata = {
  title: "UNFLTR Studio",
  description: "Creative strategy and branding studio",
  metadataBase: new URL("https://www.unfltrstudio.in"),
  icons: {
    icon: LOGO_URL,
    shortcut: LOGO_URL,
    apple: LOGO_URL,
  },
  openGraph: {
    title: "UNFLTR Studio",
    description: "Creative strategy and branding studio",
    url: "https://www.unfltrstudio.in",
    siteName: "UNFLTR Studio",
    images: [
      {
        url: LOGO_URL,
        width: 1200,
        height: 630,
        alt: "UNFLTR Studio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UNFLTR Studio",
    description: "Creative strategy and branding studio",
    images: [LOGO_URL],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} font-sans bg-black text-white`}>

        {children}

      </body>
    </html>
  );
}