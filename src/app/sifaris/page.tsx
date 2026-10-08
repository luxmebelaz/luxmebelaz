import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import CheckoutForm from '@/components/CheckoutForm';

export const metadata: Metadata = {
  title: 'Sifarişin rəsmiləşdirilməsi',
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Alış-veriş"
        title="Sifariş"
        crumbs={[{ label: 'Səbət', href: '/sebet' }, { label: 'Sifariş' }]}
      />
      <PageSection>
        <CheckoutForm />
      </PageSection>
    </>
  );
}
