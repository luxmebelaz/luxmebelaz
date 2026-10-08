'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Clock, Loader2 } from 'lucide-react';

const fieldClass =
  'w-full bg-white/35 border border-white/50 rounded-xl p-4 text-[15px] text-neutral-900 placeholder:text-neutral-500 outline-none focus:border-black/50 focus:bg-white/50 transition-colors';

const labelClass = 'block text-xs font-bold tracking-wider uppercase text-neutral-700 mb-2';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          space: data.get('space'),
          message: data.get('message'),
          website: data.get('website'),
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setError(json?.error ?? 'Göndərmək mümkün olmadı. Bir az sonra yenidən cəhd edin.');
        setStatus('error');
        return;
      }
      form.reset();
      setStatus('success');
    } catch {
      setError('Şəbəkə xətası. İnternet bağlantınızı yoxlayıb yenidən cəhd edin.');
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => status !== 'idle' && status !== 'sending' && setStatus('idle')}
      className="flex flex-col gap-5"
      noValidate={false}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={labelClass}>Ad, soyad*</label>
          <input id="cf-name" name="name" type="text" required minLength={2} autoComplete="name" className={fieldClass} placeholder="Ad Soyad" />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelClass}>Telefon*</label>
          <input id="cf-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={fieldClass} placeholder="+994 55 000 00 00" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-space" className={labelClass}>Məkan</label>
        <div className="relative">
          <select id="cf-space" name="space" defaultValue="" className={`${fieldClass} appearance-none cursor-pointer pr-12`}>
            <option value="">Məkanı seçin...</option>
            <option>Qonaq Otağı</option>
            <option>Yataq Otağı</option>
            <option>Mətbəx</option>
            <option>Ofis</option>
          </select>
          <ChevronDown className="w-5 h-5 text-neutral-700 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>Məkan barədə bizə məlumat verin*</label>
        <textarea
          id="cf-message"
          name="message"
          rows={6}
          required
          minLength={5}
          className={`${fieldClass} resize-none`}
          placeholder="Otağınızın sahəsi, ümumi tərz və ağlınızda olan mebel modeli barədə qeydlərinizi yazın..."
        ></textarea>
      </div>

      {/* Bot tələsi: real istifadəçilər bu sahəni görmür */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Veb sayt
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" id="cf-terms" required className="mt-0.5 w-4 h-4 accent-black cursor-pointer shrink-0" />
        <label htmlFor="cf-terms" className="text-xs leading-relaxed text-neutral-800 cursor-pointer">
          Göndərməklə <Link href="/mexfilik" className="underline underline-offset-2">məxfilik siyasəti</Link> və{' '}
          <Link href="/sertler" className="underline underline-offset-2">istifadə şərtləri</Link> ilə razılaşırsınız.
        </label>
      </div>

      <div className="flex items-start gap-3 text-xs uppercase tracking-wide text-neutral-700">
        <Clock className="w-4 h-4 shrink-0 mt-0.5" />
        <span>Dizaynerlə zəng üçün 4 saat ərzində sizinlə əlaqə saxlayacağıq.</span>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 bg-[#111] text-white w-full py-5 rounded-full text-sm font-bold tracking-wider uppercase shadow-[inset_0_2px_8px_rgba(255,255,255,0.15)] hover:bg-black transition-colors disabled:opacity-60"
      >
        {status === 'sending' && <Loader2 className="w-4 h-4 animate-spin" />}
        {status === 'sending' ? 'Göndərilir...' : 'Göndər'}
      </button>

      <div role="status" aria-live="polite" className="min-h-6">
        {status === 'success' && (
          <p className="text-sm font-semibold text-emerald-800">Sorğunuz qəbul olundu. Tezliklə sizinlə əlaqə saxlayacağıq.</p>
        )}
        {status === 'error' && <p className="text-sm font-semibold text-red-700">{error}</p>}
      </div>
    </form>
  );
}
