import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import AccountView from '@/components/AccountView';

export const metadata: Metadata = {
  title: 'Hesabım',
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <>
      <PageHero eyebrow="Hesab" title="Hesabım" crumbs={[{ label: 'Hesabım' }]} />
      <PageSection>
        <AccountView />
      </PageSection>
    </>
  );
}
