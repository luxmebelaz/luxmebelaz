import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import OrderTracker from '@/components/OrderTracker';

export const metadata: Metadata = {
  title: 'Sifarişi izlə',
  description: 'Sifariş nömrəsi və telefonla sifarişinizin vəziyyətini yoxlayın.',
  robots: { index: false },
};

export default function TrackOrderPage() {
  return (
    <>
      <PageHero eyebrow="Alış-veriş" title="Sifarişi izlə" crumbs={[{ label: 'Sifarişi izlə' }]} />
      <PageSection>
        <Suspense fallback={<div className="glass-light rounded-3xl h-64 animate-pulse" aria-hidden="true" />}>
          <OrderTracker />
        </Suspense>
      </PageSection>
    </>
  );
}
