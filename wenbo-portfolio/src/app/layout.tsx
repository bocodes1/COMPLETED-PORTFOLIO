import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "opsz"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wenbo Zhao — Builder · Quant-Track Developer",
  description:
    "Wenbo Zhao. Commerce at UofT. I build and ship real things end-to-end — a low-latency trading engine, a multi-agent ops platform, full products. Technical depth, business judgment, fast execution.",
  keywords: [
    "Wenbo Zhao",
    "quant developer",
    "trading systems",
    "low-latency",
    "builder",
    "Next.js",
    "Python",
    "Toronto",
    "Vancouver",
    "University of Toronto",
  ],
  authors: [{ name: "Wenbo Zhao" }],
  openGraph: {
    title: "Wenbo Zhao — Builder · Quant-Track Developer",
    description:
      "I ship businesses — and systems that trade in milliseconds.",
    type: "website",
    locale: "en_CA",
    siteName: "Wenbo Zhao",
  },
  twitter: {
    card: "summary",
    creator: "@Boboscales",
    title: "Wenbo Zhao — Builder · Quant-Track Developer",
    description:
      "I ship businesses — and systems that trade in milliseconds.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plexMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
