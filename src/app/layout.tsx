import type { Metadata } from "next";
import { Inter, Bebas_Neue, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

// "latin-ext" olmadan ə, ı, ş, ç, ğ, ö, ü kimi Azərbaycan hərfləri başqa şriftə düşür.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "LuxMebel — Eleqant və Müasir Mebellər",
  description:
    "LuxMebel: klassik və müasir dizaynı birləşdirən eksklüziv mebel kolleksiyası. Divanlar, yataq otağı, kreslolar və fərdi sifarişlər.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="az"
      className={`${inter.variable} ${bebas.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
