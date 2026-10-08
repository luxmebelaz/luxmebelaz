import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ManifestoSection from '@/components/ManifestoSection';
import ProductsSection from '@/components/ProductsSection';
import BannerSection from '@/components/BannerSection';
import CategoriesSection from '@/components/CategoriesSection';
import TestimonialSection from '@/components/TestimonialSection';
import BlogSection from '@/components/BlogSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#141414] text-white selection:bg-white/30">
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <ProductsSection />
      <BannerSection />
      <CategoriesSection />
      <TestimonialSection />
      <BlogSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
