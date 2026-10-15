'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';

// Hər səhifə keçidində səhifə həmişə ən yuxarıdan açılır (aşağıda olsanız belə).
export default function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname, lenis]);

  // Ehtiyat: şəkillər/məlumat yükləndikdən sonra Lenis səhifənin yeni hündürlüyünü yenidən ölçsün
  useEffect(() => {
    if (!lenis) return;
    const resize = () => lenis.resize();
    const timers = [300, 1200, 3000].map((ms) => window.setTimeout(resize, ms));
    window.addEventListener('load', resize);
    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener('load', resize);
    };
  }, [pathname, lenis]);

  return null;
}
