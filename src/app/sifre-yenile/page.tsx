import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import { ResetForm } from '@/components/AuthForms';

export const metadata: Metadata = {
  title: 'Yeni şifrə',
  robots: { index: false },
};

export default function ResetPage() {
  return (
    <>
      <PageHero eyebrow="Hesab" title="Yeni şifrə" description="Hesabınız üçün yeni şifrə təyin edin." crumbs={[{ label: 'Yeni şifrə' }]} />
      <PageSection narrow>
        <div className="max-w-xl mx-auto">
          <ResetForm />
        </div>
      </PageSection>
    </>
  );
}
