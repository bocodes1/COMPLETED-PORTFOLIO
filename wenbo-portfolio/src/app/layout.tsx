import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wenbo Zhao | Business Builder & Creative Strategist",
  description:
    "Wenbo Zhao — I design and build businesses combining marketing, creative strategy, and full-stack execution. Based in Toronto, Canada.",
  keywords: [
    "business building",
    "marketing strategy",
    "creative direction",
    "front-end development",
    "ecommerce",
    "Toronto",
    "Wenbo Zhao",
    "portfolio",
    "full-stack",
    "Shopify",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Wenbo Zhao" }],
  openGraph: {
    title: "Wenbo Zhao | Business Builder & Creative Strategist",
    description:
      "I design and build businesses — combining marketing, creative strategy, and full-stack execution.",
    type: "website",
    locale: "en_CA",
    siteName: "Wenbo Zhao Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Boboscales",
    title: "Wenbo Zhao | Business Builder & Creative Strategist",
    description:
      "I design and build businesses — combining marketing, creative strategy, and full-stack execution.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
