import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ManifestoSection from '@/components/ManifestoSection';
import ProductsSection from '@/components/ProductsSection';
import BannerSection from '@/components/BannerSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/30">
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <ProductsSection />
      <BannerSection />
    </main>
  );
}
