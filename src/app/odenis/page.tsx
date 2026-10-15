import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import PaymentResult from '@/components/PaymentResult';

export const metadata: Metadata = {
  title: 'Ödənişin nəticəsi',
  robots: { index: false },
};

// Bankın ödəniş səhifəsindən qayıdış ünvanı: /odenis?sifaris=LM-...
export default function PaymentResultPage() {
  return (
    <>
      <PageHero eyebrow="Alış-veriş" title="Ödəniş" crumbs={[{ label: 'Ödəniş' }]} />
      <PageSection>
        <Suspense fallback={<div className="glass-light rounded-3xl h-64 animate-pulse" aria-hidden="true" />}>
          <PaymentResult />
        </Suspense>
      </PageSection>
    </>
  );
}
