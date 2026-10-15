import type { Metadata } from "next";
import { Noto_Sans, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteChrome from "@/components/SiteChrome";
import { site } from "@/lib/site";

// "latin-ext" olmadan ə, ı, ş, ç, ğ, ö, ü kimi Azərbaycan hərfləri başqa şriftə düşür.
const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin", "latin-ext"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "LuxMebel — zərif və müasir mebellər",
    template: "%s | LuxMebel",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "az_AZ",
    title: "LuxMebel — zərif və müasir mebellər",
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="az"
      className={`${notoSans.variable} ${oswald.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <SmoothScroll>
          <SiteChrome>{children}</SiteChrome>
        </SmoothScroll>
      </body>
    </html>
  );
}
