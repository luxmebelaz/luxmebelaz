import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import CartView from '@/components/CartView';

export const metadata: Metadata = {
  title: 'Səbət',
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHero eyebrow="Alış-veriş" title="Səbət" crumbs={[{ label: 'Səbət' }]} />
      <PageSection>
        <CartView />
      </PageSection>
    </>
  );
}
