'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart, useHydrated } from '@/lib/cart';
import { formatPrice } from '@/lib/format';
import { primaryButton, secondaryButton } from '@/components/ui';

export default function CartView() {
  const hydrated = useHydrated();
  const { items, total, count, setQty, remove, clear } = useCart();

  if (!hydrated) {
    return <div className="glass-light rounded-3xl h-64 animate-pulse" aria-hidden="true" />;
  }

  if (items.length === 0) {
    return (
      <div className="glass-light rounded-3xl p-10 md:p-16 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto mb-5 text-neutral-700" strokeWidth={1.5} />
        <h2 className="text-2xl font-bold mb-2">Səbətiniz boşdur</h2>
        <p className="text-neutral-700 mb-7">Kolleksiyamıza baxın və bəyəndiyiniz məhsulları əlavə edin.</p>
        <Link href="/magaza" className={primaryButton}>Mağazaya keç</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.slug} className="glass-light rounded-3xl p-3 sm:p-4 flex gap-3 sm:gap-5">
            <Link href={`/magaza/${item.slug}`} className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-2xl overflow-hidden bg-[#b5aba0]">
              <Image src={item.image} alt={item.name} fill sizes="128px" className="object-cover" />
            </Link>
            <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
              <div className="flex justify-between gap-3">
                <div className="min-w-0">
                  <Link href={`/magaza/${item.slug}`} className="font-bold text-base sm:text-lg leading-tight hover:underline">{item.name}</Link>
                  <p className="text-sm text-neutral-700 mt-1">{formatPrice(item.price)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(item.slug)}
                  aria-label={`${item.name} məhsulunu sil`}
                  className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center h-10 rounded-full border border-black/25 bg-white/40">
                  <button type="button" aria-label="Sayı azalt" onClick={() => setQty(item.slug, item.qty - 1)} className="w-10 h-full flex items-center justify-center hover:bg-black/5 rounded-l-full">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                  <button type="button" aria-label="Sayı artır" onClick={() => setQty(item.slug, item.qty + 1)} className="w-10 h-full flex items-center justify-center hover:bg-black/5 rounded-r-full">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-bold text-lg">{formatPrice(item.price * item.qty)}</p>
              </div>
            </div>
          </li>
        ))}
        <li>
          <button type="button" onClick={clear} className="text-sm font-semibold text-neutral-700 hover:text-black underline underline-offset-4">
            Səbəti təmizlə
          </button>
        </li>
      </ul>

      <aside className="glass-light rounded-3xl p-6 lg:sticky lg:top-28">
        <h2 className="text-xl font-bold mb-5">Sifariş xülasəsi</h2>
        <dl className="flex flex-col gap-3 text-[15px]">
          <div className="flex justify-between"><dt className="text-neutral-700">Məhsul sayı</dt><dd className="font-semibold">{count}</dd></div>
          <div className="flex justify-between"><dt className="text-neutral-700">Çatdırılma</dt><dd className="font-semibold text-right">Təsdiq zamanı bildirilir</dd></div>
          <div className="flex justify-between pt-4 mt-1 border-t border-black/10 text-lg"><dt className="font-bold">Cəmi</dt><dd className="font-extrabold">{formatPrice(total)}</dd></div>
        </dl>
        <Link href="/sifaris" className={`${primaryButton} w-full mt-6`}>Sifarişi rəsmiləşdir</Link>
        <Link href="/magaza" className={`${secondaryButton} w-full mt-3`}>Alış-verişə davam et</Link>
      </aside>
    </div>
  );
}
