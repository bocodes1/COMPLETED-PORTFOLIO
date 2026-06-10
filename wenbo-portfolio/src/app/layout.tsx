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
  title: "Wen Bo Zhao — Builder · Quant-Track Developer",
  description:
    "Wen Bo Zhao. Commerce at UofT. I build and ship real things end-to-end — a low-latency trading engine, a multi-agent ops platform, full products. Technical depth, business judgment, fast execution.",
  keywords: [
    "Wen Bo Zhao",
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
  authors: [{ name: "Wen Bo Zhao" }],
  openGraph: {
    title: "Wen Bo Zhao — Builder · Quant-Track Developer",
    description:
      "I ship businesses — and systems that trade in milliseconds.",
    type: "website",
    locale: "en_CA",
    siteName: "Wen Bo Zhao",
  },
  twitter: {
    card: "summary",
    creator: "@Boboscales",
    title: "Wen Bo Zhao — Builder · Quant-Track Developer",
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
