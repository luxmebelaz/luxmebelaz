import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import { LoginForm } from '@/components/AuthForms';

export const metadata: Metadata = {
  title: 'Giriş',
  description: 'LuxMebel hesabınıza daxil olun.',
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <>
      <PageHero eyebrow="Hesab" title="Giriş" description="Sifarişlərinizi izləmək üçün hesabınıza daxil olun." crumbs={[{ label: 'Giriş' }]} />
      <PageSection narrow>
        <div className="max-w-xl mx-auto">
          <LoginForm />
        </div>
      </PageSection>
    </>
  );
}
