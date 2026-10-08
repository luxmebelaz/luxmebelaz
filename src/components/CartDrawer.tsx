'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/format';
import { panels, usePanel } from '@/lib/ui';
import { primaryButton, secondaryButton } from '@/components/ui';

// Səbət işarəsinə vuranda sağdan açılan, arxası bulanıq çəkməcə
export default function CartDrawer() {
  const open = usePanel() === 'cart';
  const lenis = useLenis();
  const { items, total, count, setQty, remove } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && panels.close();
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Səbət">
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={panels.close}
          />
          <motion.aside
            className="absolute right-0 top-0 h-dvh w-full max-w-md flex flex-col bg-gradient-to-b from-[#ececec] to-[#d2d2d2] text-black shadow-[-24px_0_60px_rgba(0,0,0,0.4)] border-l border-white/60"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-5 sm:px-6 h-20 shrink-0 border-b border-black/10">
              <h2 className="text-xl font-extrabold">
                Səbət{count > 0 && <span className="ml-2 text-sm font-semibold text-neutral-600">({count})</span>}
              </h2>
              <button
                ref={closeRef}
                type="button"
                onClick={panels.close}
                aria-label="Səbəti bağla"
                className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <ShoppingBag className="w-12 h-12 mb-4 text-neutral-600" strokeWidth={1.5} />
                <p className="text-lg font-bold mb-1">Səbətiniz boşdur</p>
                <p className="text-neutral-700 text-sm mb-6">Kolleksiyamıza baxın və bəyəndiyinizi əlavə edin.</p>
                <Link href="/magaza" onClick={panels.close} className={primaryButton}>Mağazaya keç</Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto overscroll-contain px-5 sm:px-6 py-4 flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={item.slug} className="flex gap-3">
                      <Link href={`/magaza/${item.slug}`} onClick={panels.close} className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-[#b5aba0]">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2">
                          <Link href={`/magaza/${item.slug}`} onClick={panels.close} className="font-bold text-[15px] leading-tight hover:underline">{item.name}</Link>
                          <button type="button" onClick={() => remove(item.slug)} aria-label={`${item.name} məhsulunu sil`} className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center hover:bg-black/10">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center h-9 rounded-full border border-black/25 bg-white/40">
                            <button type="button" aria-label="Sayı azalt" onClick={() => setQty(item.slug, item.qty - 1)} className="w-9 h-full flex items-center justify-center hover:bg-black/5 rounded-l-full"><Minus className="w-3.5 h-3.5" /></button>
                            <span className="w-7 text-center text-sm font-semibold">{item.qty}</span>
                            <button type="button" aria-label="Sayı artır" onClick={() => setQty(item.slug, item.qty + 1)} className="w-9 h-full flex items-center justify-center hover:bg-black/5 rounded-r-full"><Plus className="w-3.5 h-3.5" /></button>
                          </div>
                          <p className="font-extrabold">{formatPrice(item.price * item.qty)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="shrink-0 px-5 sm:px-6 py-5 border-t border-black/10 bg-white/30">
                  <div className="flex justify-between text-lg mb-1">
                    <span className="font-bold">Cəmi</span>
                    <span className="font-extrabold">{formatPrice(total)}</span>
                  </div>
                  <p className="text-xs text-neutral-700 mb-4">Çatdırılma haqqı sifarişi təsdiqləyərkən bildirilir.</p>
                  <Link href="/sifaris" onClick={panels.close} className={`${primaryButton} w-full`}>Sifarişi rəsmiləşdir</Link>
                  <Link href="/sebet" onClick={panels.close} className={`${secondaryButton} w-full mt-2.5 !h-12`}>Səbətə bax</Link>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
