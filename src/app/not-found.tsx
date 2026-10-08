import Link from 'next/link';
import PageSection from '@/components/PageSection';
import { primaryButton, secondaryButton } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <div className="bg-paper h-32 md:h-40" />
      <PageSection>
        <div className="glass-light rounded-[32px] p-10 md:p-16 text-center">
          <p className="font-display text-8xl md:text-9xl leading-none mb-4">404</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Səhifə tapılmadı</h1>
          <p className="text-neutral-700 mb-8 max-w-md mx-auto">Axtardığınız səhifə mövcud deyil və ya köçürülüb.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className={primaryButton}>Ana səhifə</Link>
            <Link href="/magaza" className={secondaryButton}>Mağazaya keç</Link>
          </div>
        </div>
      </PageSection>
    </>
  );
}
