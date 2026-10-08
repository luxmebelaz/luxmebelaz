import type { Metadata } from "next";
import { Noto_Sans, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchDialog from "@/components/SearchDialog";
import ScrollToTop from "@/components/ScrollToTop";
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
    default: "LuxMebel — Eleqant və Müasir Mebellər",
    template: "%s | LuxMebel",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "az_AZ",
    title: "LuxMebel — Eleqant və Müasir Mebellər",
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="az"
      className={`${notoSans.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <ScrollToTop />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <CartDrawer />
          <SearchDialog />
        </SmoothScroll>
      </body>
    </html>
  );
}
