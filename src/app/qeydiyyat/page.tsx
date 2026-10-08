import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import { RegisterForm } from '@/components/AuthForms';

export const metadata: Metadata = {
  title: 'Qeydiyyat',
  description: 'LuxMebel-də qeydiyyatdan keçin: sifarişlərinizi izləyin və növbəti alışda vaxta qənaət edin.',
  robots: { index: false },
};

export default function RegisterPage() {
  return (
    <>
      <PageHero eyebrow="Hesab" title="Qeydiyyat" description="Hesab yaradın, sifarişlərinizi bir yerdə izləyin." crumbs={[{ label: 'Qeydiyyat' }]} />
      <PageSection narrow>
        <div className="max-w-xl mx-auto">
          <RegisterForm />
        </div>
      </PageSection>
    </>
  );
}
