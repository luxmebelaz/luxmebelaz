import HeroSection from '@/components/HeroSection';
import ManifestoSection from '@/components/ManifestoSection';
import ProductsSection from '@/components/ProductsSection';
import BannerSection from '@/components/BannerSection';
import CategoriesSection from '@/components/CategoriesSection';
import TestimonialSection from '@/components/TestimonialSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import { getFaqs, getFeaturedProducts } from '@/lib/repository';

export default async function Home() {
  const [products, faqs] = await Promise.all([getFeaturedProducts(), getFaqs()]);

  return (
    <main className="overflow-x-clip bg-[#141414] text-white selection:bg-white/30">
      <HeroSection />
      <ManifestoSection />
      <ProductsSection products={products} />
      <BannerSection />
      <CategoriesSection />
      <TestimonialSection />
      <FaqSection faqs={faqs.slice(0, 6)} />
      <ContactSection />
    </main>
  );
}
