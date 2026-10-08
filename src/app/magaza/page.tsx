import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import StoreView from '@/components/StoreView';
import { getCategories, getProducts } from '@/lib/repository';

export const metadata: Metadata = {
  title: 'Mağaza',
  description: 'LuxMebel kolleksiyası: divanlar, yataq otağı mebelləri, kreslolar, masalar və şkaflar. Çatdırılma və quraşdırma xidməti ilə.',
};

export default async function StorePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <>
      <PageHero
        eyebrow="Mebel Kolleksiyası"
        title="Mağaza"
        description="Evinizin hər otağı üçün düşünülmüş mebellər. Kateqoriyaya görə süzün, axtarın və bəyəndiyinizi səbətə əlavə edin."
        crumbs={[{ label: 'Mağaza' }]}
      />
      <PageSection>
        <StoreView products={products} categories={categories} />
      </PageSection>
    </>
  );
}
