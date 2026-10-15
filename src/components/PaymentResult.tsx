'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { cartActions, useCart } from '@/lib/cart';
import { saveLocalOrder } from '@/lib/orders';
import { formatPrice } from '@/lib/format';
import { primaryButton, secondaryButton } from '@/components/ui';
import { site } from '@/lib/site';

type Status = 'loading' | 'pending' | 'paid' | 'failed' | 'cancelled' | 'unknown' | 'error';

const MAX_ATTEMPTS = 8;
const INTERVAL = 2500;

export default function PaymentResult() {
  const orderNumber = useSearchParams().get('sifaris') ?? '';
  const { items } = useCart();
  const [status, setStatus] = useState<Status>(orderNumber ? 'loading' : 'error');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!orderNumber) return;
    let cancelled = false;
    let attempt = 0;
    let timer: number | undefined;

    async function check() {
      attempt += 1;
      try {
        const res = await fetch(`/api/payments/status?sifaris=${encodeURIComponent(orderNumber)}`, { cache: 'no-store' });
        const json = await res.json().catch(() => null);
        if (cancelled) return;
        if (!res.ok || !json?.ok) return setStatus('error');
        setTotal(json.total);
        if (json.status === 'pending' && attempt < MAX_ATTEMPTS) {
          setStatus('pending');
          timer = window.setTimeout(check, INTERVAL);
          return;
        }
        setStatus(json.status === 'pending' ? 'unknown' : json.status);
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    check();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [orderNumber]);

  // Ödəniş təsdiqlənəndə sifariş "Hesabım"-a yazılır və səbət təmizlənir
  useEffect(() => {
    if (status !== 'paid' || items.length === 0) return;
    saveLocalOrder({
      orderNumber,
      createdAt: new Date().toISOString(),
      total,
      payment: 'Onlayn kartla',
      items: items.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
    });
    cartActions.clear();
  }, [status, items, orderNumber, total]);

  if (status === 'loading' || status === 'pending') {
    return (
      <div className="glass-light rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-auto">
        <Loader2 className="w-10 h-10 mx-auto mb-5 animate-spin" />
        <p className="font-semibold">Ödəniş yoxlanılır...</p>
        <p className="text-sm text-neutral-700 mt-2">Bu səhifəni bağlamayın.</p>
      </div>
    );
  }

  if (status === 'paid') {
    return (
      <div className="glass-light rounded-3xl p-8 md:p-14 text-center max-w-2xl mx-auto">
        <CheckCircle2 className="w-14 h-14 mx-auto mb-5 text-emerald-700" strokeWidth={1.5} />
        <h2 className="font-display text-4xl uppercase mb-3">Ödəniş uğurludur</h2>
        <p className="text-neutral-700 mb-2">Sifariş nömrəniz:</p>
        <p className="text-2xl font-extrabold tracking-wide mb-1">{orderNumber}</p>
        <p className="text-neutral-700 mb-8">Ödənilən məbləğ: {formatPrice(total)}. Çatdırılma üçün tezliklə sizinlə əlaqə saxlayacağıq.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/hesab" className={primaryButton}>Sifarişlərim</Link>
          <Link href="/magaza" className={secondaryButton}>Alış-verişə davam et</Link>
        </div>
      </div>
    );
  }

  const message =
    status === 'cancelled'
      ? 'Ödəniş ləğv edildi.'
      : status === 'failed'
        ? 'Ödəniş alınmadı. Kartdan vəsait tutulmayıbsa, yenidən cəhd edə bilərsiniz.'
        : status === 'unknown'
          ? 'Ödənişin nəticəsi hələ bəlli deyil. Kartdan vəsait tutulubsa, bizimlə əlaqə saxlayın — sifarişiniz qeydə alınıb.'
          : 'Ödənişin statusunu yoxlamaq mümkün olmadı.';

  return (
    <div className="glass-light rounded-3xl p-8 md:p-14 text-center max-w-2xl mx-auto">
      <XCircle className="w-14 h-14 mx-auto mb-5 text-red-700" strokeWidth={1.5} />
      <h2 className="font-display text-4xl uppercase mb-3">Ödəniş tamamlanmadı</h2>
      <p className="text-neutral-700 mb-2">{message}</p>
      {orderNumber && <p className="text-neutral-700 mb-2">Sifariş nömrəsi: <b>{orderNumber}</b></p>}
      <p className="text-neutral-700 mb-8">
        Sualınız varsa, zəng edin: <a href={site.phoneHref} className="font-bold underline">{site.phone}</a>
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/sifaris" className={primaryButton}>Yenidən cəhd et</Link>
        <Link href="/sebet" className={secondaryButton}>Səbətə qayıt</Link>
      </div>
    </div>
  );
}
