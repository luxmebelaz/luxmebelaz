'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchDialog from '@/components/SearchDialog';
import ScrollToTop from '@/components/ScrollToTop';

// Admin paneldə saytın menyusu, footer-i, səbəti və axtarışı göstərilmir
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return <>{children}</>;

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
      <CartDrawer />
      <SearchDialog />
    </>
  );
}
