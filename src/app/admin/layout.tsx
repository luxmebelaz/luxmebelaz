import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { default: 'Admin panel', template: '%s | LuxMebel Admin' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<'/admin'>) {
  return <div className="min-h-screen bg-[#eeeeec] text-neutral-900">{children}</div>;
}
