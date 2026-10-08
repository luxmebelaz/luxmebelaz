import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import { ForgotForm } from '@/components/AuthForms';

export const metadata: Metadata = {
  title: 'Şifrəni unutdum',
  robots: { index: false },
};

export default function ForgotPage() {
  return (
    <>
      <PageHero eyebrow="Hesab" title="Şifrəni bərpa et" description="E-poçt ünvanınızı yazın, şifrəni yeniləmək üçün link göndərək." crumbs={[{ label: 'Giriş', href: '/giris' }, { label: 'Şifrəni bərpa et' }]} />
      <PageSection narrow>
        <div className="max-w-xl mx-auto">
          <ForgotForm />
        </div>
      </PageSection>
    </>
  );
}
