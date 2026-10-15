import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import OrderTracker from '@/components/OrderTracker';

export const metadata: Metadata = { title: 'Sifarişim', robots: { index: false } };

// Ünvan: /hesab/sifaris?n=482913 — daxil olmuş istifadəçinin öz sifarişi
export default function AccountOrderPage() {
  return (
    <>
      <PageHero eyebrow="Hesab" title="Sifarişim" crumbs={[{ label: 'Hesabım', href: '/hesab' }, { label: 'Sifariş' }]} />
      <PageSection>
        <Suspense fallback={<div className="glass-light rounded-3xl h-64 animate-pulse" aria-hidden="true" />}>
          <OrderTracker requirePhone={false} />
        </Suspense>
      </PageSection>
    </>
  );
}
