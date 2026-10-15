'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Loader2, MapPin, Phone } from 'lucide-react';
import OrderTimeline, { type TimelineEntry } from '@/components/OrderTimeline';
import { optionLabel } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import { site } from '@/lib/site';
import { fieldClass, labelClass, primaryButton } from '@/components/ui';

type TrackedOrder = {
  orderNumber: string;
  createdAt: string;
  status: string;
  history: TimelineEntry[];
  items: { name: string; qty: number; price: number; size?: string; color?: string; code?: string }[];
  total: number;
  payment: string;
  paymentStatus: string | null;
  address: string;
  hasLocation: boolean;
};

const dateFmt = new Intl.DateTimeFormat('az-AZ', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Baku' });

// /sifaris-izle (nömrə + telefon) və /hesab/sifaris?n=... (daxil olmuş istifadəçi, avtomatik)
export default function OrderTracker({ requirePhone = true }: { requirePhone?: boolean }) {
  const params = useSearchParams();
  const initialNumber = params.get('n') ?? '';
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [loading, setLoading] = useState(!requirePhone && !!initialNumber);
  const [error, setError] = useState('');

  const track = useCallback(async (orderNumber: string, phone: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/orders/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, phone }),
        cache: 'no-store',
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setOrder(null);
        setError(json?.error ?? 'Sifariş tapılmadı.');
      } else {
        setOrder(json.order);
      }
    } catch {
      setError('Şəbəkə xətası. Yenidən cəhd edin.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (requirePhone || !initialNumber) return;
    // Daxil olmuş istifadəçi: icazə sessiya ilə yoxlanılır, telefon tələb olunmur
    // eslint-disable-next-line react-hooks/set-state-in-effect
    track(initialNumber, '');
  }, [requirePhone, initialNumber, track]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    track(String(f.get('orderNumber') ?? ''), String(f.get('phone') ?? ''));
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 lg:gap-8 items-start">
      {requirePhone ? (
        <form onSubmit={handleSubmit} className="glass-light rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold">Sifarişi izlə</h2>
          <div>
            <label htmlFor="tr-number" className={labelClass}>Sifariş nömrəsi*</label>
            <input id="tr-number" name="orderNumber" required inputMode="numeric" pattern="\d{6}" maxLength={6} defaultValue={initialNumber} placeholder="482913" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="tr-phone" className={labelClass}>Sifarişdəki telefon*</label>
            <input id="tr-phone" name="phone" type="tel" required inputMode="tel" placeholder="+994 55 000 00 00" className={fieldClass} />
          </div>
          <button type="submit" disabled={loading} className={`${primaryButton} w-full`}>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Yoxla
          </button>
          {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
          <p className="text-xs text-neutral-700">Hesabınız varsa, bütün sifarişlərinizi <Link href="/hesab" className="underline">Hesabım</Link> bölməsində görə bilərsiniz.</p>
        </form>
      ) : (
        error && <p role="alert" className="glass-light rounded-3xl p-6 text-sm font-semibold text-red-700">{error}</p>
      )}

      {loading && !order && <div className="glass-light rounded-3xl h-64 animate-pulse lg:col-start-2" aria-hidden="true" />}

      {order && (
        <div className={`glass-light rounded-3xl p-6 sm:p-8 ${requirePhone ? '' : 'lg:col-span-2'}`}>
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <h2 className="text-2xl font-extrabold tracking-wide">Sifariş №{order.orderNumber}</h2>
            <p className="text-sm text-neutral-700">{dateFmt.format(new Date(order.createdAt))}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <OrderTimeline status={order.status} createdAt={order.createdAt} history={order.history} />

            <div className="flex flex-col gap-4">
              <ul className="flex flex-col gap-2 text-sm">
                {order.items.map((i, idx) => (
                  <li key={idx} className="flex justify-between gap-3">
                    <span>
                      {i.name} × {i.qty}
                      {(i.color || i.size) && <span className="block text-xs text-neutral-600">{optionLabel(i)}</span>}
                    </span>
                    <span className="font-semibold whitespace-nowrap">{formatPrice(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between pt-3 border-t border-black/10 font-extrabold">
                <span>Cəmi</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <dl className="text-sm flex flex-col gap-2">
                <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-600">Ödəniş</dt><dd>{order.payment}{order.paymentStatus === 'paid' && ' — ödənilib'}</dd></div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-wider text-neutral-600">Çatdırılma ünvanı</dt>
                  <dd>{order.address}{order.hasLocation && <span className="inline-flex items-center gap-1 ml-2 text-emerald-800 text-xs font-semibold"><MapPin className="w-3.5 h-3.5" /> xəritədə qeyd olunub</span>}</dd>
                </div>
              </dl>
              <a href={site.phoneHref} className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">
                <Phone className="w-4 h-4" /> Sualınız var? {site.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
