'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useCart, useHydrated } from '@/lib/cart';
import { useUser } from '@/lib/auth';
import { saveLocalOrder } from '@/lib/orders';
import { formatPrice } from '@/lib/format';
import PaymentBadges from '@/components/PaymentBadges';
import { fieldClass, labelClass, primaryButton, secondaryButton } from '@/components/ui';
import { site } from '@/lib/site';

type Confirmation = { orderNumber: string; total: number };

const payments = [
  { key: 'cash', label: 'Çatdırılma zamanı nağd' },
  { key: 'card_on_delivery', label: 'Çatdırılma zamanı kartla' },
];

export default function CheckoutForm() {
  const hydrated = useHydrated();
  const { items, total, clear } = useCart();
  const user = useUser();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState<Confirmation | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: {
            name: data.get('name'),
            phone: data.get('phone'),
            email: data.get('email'),
            city: data.get('city'),
            address: data.get('address'),
          },
          note: data.get('note'),
          payment: data.get('payment'),
          website: data.get('website'),
          items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setError(json?.error ?? 'Sifarişi göndərmək mümkün olmadı. Bir az sonra yenidən cəhd edin.');
        return;
      }
      saveLocalOrder({
        orderNumber: json.orderNumber,
        createdAt: new Date().toISOString(),
        total: json.total,
        payment: json.payment,
        items: (json.items as { name: string; qty: number; price: number }[]).map((i) => ({
          name: i.name,
          qty: i.qty,
          price: i.price,
        })),
      });
      clear();
      setDone({ orderNumber: json.orderNumber, total: json.total });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Şəbəkə xətası. İnternet bağlantınızı yoxlayıb yenidən cəhd edin.');
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="glass-light rounded-3xl p-8 md:p-14 text-center max-w-2xl mx-auto">
        <CheckCircle2 className="w-14 h-14 mx-auto mb-5 text-emerald-700" strokeWidth={1.5} />
        <h2 className="font-display text-4xl uppercase mb-3">Sifarişiniz qəbul olundu</h2>
        <p className="text-neutral-700 mb-2">Sifariş nömrəniz:</p>
        <p className="text-2xl font-extrabold tracking-wide mb-5">{done.orderNumber}</p>
        <p className="text-neutral-700 mb-8">
          Komandamız sifarişi təsdiqləmək və çatdırılma detallarını dəqiqləşdirmək üçün tezliklə sizinlə əlaqə saxlayacaq.
          Təcili sualınız üçün: <a href={site.phoneHref} className="font-bold underline">{site.phone}</a>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/hesab" className={primaryButton}>Sifarişlərim</Link>
          <Link href="/magaza" className={secondaryButton}>Alış-verişə davam et</Link>
        </div>
      </div>
    );
  }

  if (!hydrated) return <div className="glass-light rounded-3xl h-64 animate-pulse" aria-hidden="true" />;

  if (items.length === 0) {
    return (
      <div className="glass-light rounded-3xl p-10 md:p-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Səbətiniz boşdur</h2>
        <p className="text-neutral-700 mb-7">Sifariş vermək üçün əvvəlcə məhsul seçin.</p>
        <Link href="/magaza" className={primaryButton}>Mağazaya keç</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 lg:gap-8 items-start">
      <div className="glass-light rounded-3xl p-5 sm:p-8 flex flex-col gap-5">
        <h2 className="text-xl font-bold">Çatdırılma məlumatları</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="co-name" className={labelClass}>Ad, soyad*</label>
            <input id="co-name" name="name" required minLength={2} autoComplete="name" defaultValue={user?.name} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="co-phone" className={labelClass}>Telefon*</label>
            <input id="co-phone" name="phone" type="tel" required inputMode="tel" autoComplete="tel" defaultValue={user?.phone} placeholder="+994 55 000 00 00" className={fieldClass} />
          </div>
        </div>
        <div>
          <label htmlFor="co-email" className={labelClass}>E-poçt</label>
          <input id="co-email" name="email" type="email" autoComplete="email" defaultValue={user?.email} className={fieldClass} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-5">
          <div>
            <label htmlFor="co-city" className={labelClass}>Şəhər*</label>
            <input id="co-city" name="city" required minLength={2} autoComplete="address-level2" defaultValue="Bakı" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="co-address" className={labelClass}>Ünvan*</label>
            <input id="co-address" name="address" required minLength={5} autoComplete="street-address" placeholder="Küçə, bina, mənzil" className={fieldClass} />
          </div>
        </div>
        <div>
          <label htmlFor="co-note" className={labelClass}>Qeyd</label>
          <textarea id="co-note" name="note" rows={3} className={`${fieldClass} resize-none`} placeholder="Çatdırılma vaxtı, mərtəbə, əlavə istəklər..." />
        </div>

        <fieldset>
          <legend className={labelClass}>Ödəniş üsulu*</legend>
          <div className="flex flex-col gap-3">
            {payments.map((p, i) => (
              <label key={p.key} className="flex items-center gap-3 rounded-xl bg-white/35 border border-white/50 p-4 cursor-pointer has-[:checked]:border-black has-[:checked]:bg-white/60">
                <input type="radio" name="payment" value={p.key} defaultChecked={i === 0} className="w-4 h-4 accent-black" />
                <span className="font-semibold text-[15px]">{p.label}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-neutral-700">
            <PaymentBadges />
            <span>Onlayn kart ödənişi ödəniş sistemi qoşulduqdan sonra aktiv olacaq.</span>
          </div>
        </fieldset>

        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Veb sayt<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>

        <div className="flex items-start gap-3">
          <input type="checkbox" id="co-terms" required className="mt-0.5 w-4 h-4 accent-black cursor-pointer shrink-0" />
          <label htmlFor="co-terms" className="text-xs leading-relaxed text-neutral-800 cursor-pointer">
            <Link href="/sertler" className="underline underline-offset-2">İstifadə şərtləri</Link> və{' '}
            <Link href="/mexfilik" className="underline underline-offset-2">məxfilik siyasəti</Link> ilə razıyam.
          </label>
        </div>
      </div>

      <aside className="glass-light rounded-3xl p-5 sm:p-6 lg:sticky lg:top-28">
        <h2 className="text-xl font-bold mb-4">Sifarişiniz</h2>
        <ul className="flex flex-col gap-3 mb-5">
          {items.map((i) => (
            <li key={i.slug} className="flex gap-3 items-center">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#b5aba0]">
                <Image src={i.image} alt={i.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">{i.name}</p>
                <p className="text-xs text-neutral-700">{i.qty} × {formatPrice(i.price)}</p>
              </div>
              <p className="text-sm font-bold">{formatPrice(i.price * i.qty)}</p>
            </li>
          ))}
        </ul>
        <div className="flex justify-between pt-4 border-t border-black/10 text-lg">
          <span className="font-bold">Cəmi</span>
          <span className="font-extrabold">{formatPrice(total)}</span>
        </div>
        <p className="text-xs text-neutral-700 mt-2">Çatdırılma haqqı sifarişi təsdiqləyərkən bildirilir.</p>

        <button type="submit" disabled={sending} className={`${primaryButton} w-full mt-5`}>
          {sending && <Loader2 className="w-4 h-4 animate-spin" />}
          {sending ? 'Göndərilir...' : 'Sifarişi təsdiqlə'}
        </button>
        {error && <p role="alert" className="mt-4 text-sm font-semibold text-red-700">{error}</p>}
        <Link href="/sebet" className="block text-center text-sm font-semibold underline underline-offset-4 mt-4">Səbətə qayıt</Link>
      </aside>
    </form>
  );
}
