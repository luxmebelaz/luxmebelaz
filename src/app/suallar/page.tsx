import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import FaqList from '@/components/FaqList';
import { getFaqs } from '@/lib/repository';
import { primaryButton } from '@/components/ui';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tez-tez verilən suallar',
  description: 'Çatdırılma, sifariş, zəmanət və ödəniş barədə tez-tez verilən suallar və cavablar.',
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <PageHero
        eyebrow="Bilməyiniz Faydalıdır"
        title="Suallar"
        description="Mebellərimiz, sifariş və çatdırılma haqqında ən çox verilən suallara cavablar."
        crumbs={[{ label: 'Suallar' }]}
      />
      <PageSection>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-14 items-start">
          <div className="glass-light rounded-3xl p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl font-bold leading-tight mb-3">Cavabını tapa bilmədiniz?</h2>
            <p className="text-neutral-700 leading-relaxed mb-6">
              Mebel seçimi, ölçülər və ya materiallarla bağlı suallarınız var? Bizə yazın və ya zəng edin, komandamız köməklik göstərsin.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/elaqe" className={primaryButton}>Bizə yazın</Link>
              <a href={site.phoneHref} className="text-center text-sm font-bold underline underline-offset-4">{site.phone}</a>
            </div>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </PageSection>
    </>
  );
}
