import HeroSection from '@/components/HeroSection';
import ManifestoSection from '@/components/ManifestoSection';
import ProductsSection from '@/components/ProductsSection';
import BannerSection from '@/components/BannerSection';
import CategoriesSection from '@/components/CategoriesSection';
import FaqSection from '@/components/FaqSection';
import ContactSection from '@/components/ContactSection';
import { getFaqs, getFeaturedProducts, getNewProducts } from '@/lib/repository';

export default async function Home() {
  const [products, newProducts, faqs] = await Promise.all([getFeaturedProducts(), getNewProducts(), getFaqs()]);

  return (
    <main className="overflow-x-clip bg-[#141414] text-white selection:bg-white/30">
      <HeroSection />
      <ManifestoSection />
      <ProductsSection products={products} />
      {newProducts.length > 0 && (
        <ProductsSection products={newProducts} id="yeni" eyebrow="Kolleksiyaya yeni əlavələr" title="Yeni gələnlər" marquee={false} />
      )}
      <BannerSection />
      <CategoriesSection />
      <FaqSection faqs={faqs.slice(0, 6)} />
      <ContactSection />
    </main>
  );
}
