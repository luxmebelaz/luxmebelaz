"use client";

import React, { useState } from 'react';
import { Check, Clock, ChevronDown } from 'lucide-react';

const perks = [
  'Çatdırılma və quraşdırılma',
  'Pulsuz məsləhət və ölçü təklifi',
  'Fərdi sifariş və rəng seçimi',
  'Showroom-da modellərlə tanışlıq',
];

const fieldClass =
  'w-full bg-white/35 border border-white/50 rounded-xl p-4 font-mono text-sm text-neutral-800 placeholder:text-neutral-500 outline-none focus:border-black/50 focus:bg-white/50 transition-colors';

const labelClass = 'block font-mono text-[11px] tracking-wider uppercase text-neutral-700 mb-2';

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Hələlik backend yoxdur: forma yalnız təsdiq göstərir və sahələri təmizləyir.
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <section id="elaqe" className="bg-paper text-black py-20 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-neutral-800">
          Bizimlə Əlaqə
        </h4>
        <h2 className="font-display text-6xl md:text-7xl uppercase leading-none mb-14">
          Gəlin Danışaq
        </h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-8">

          {/* Left Side Info */}
          <div className="flex-1 md:pr-16 flex flex-col gap-4">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3 glass-light rounded-2xl px-5 py-4">
                <Check className="w-5 h-5 text-neutral-900 shrink-0" />
                <span className="font-mono text-sm uppercase tracking-wide text-neutral-900">{perk}</span>
              </div>
            ))}
            <div className="flex items-center gap-3 mt-2 px-1">
              <Clock className="w-5 h-5 text-neutral-700 shrink-0" />
              <span className="font-mono text-xs uppercase tracking-wide text-neutral-700">Mütəxəssislərimiz sizə 4 saat ərzində geri dönüş edəcək.</span>
            </div>
          </div>

          {/* Right Side Form */}
          <form onSubmit={handleSubmit} onChange={() => sent && setSent(false)} className="flex-1 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className={labelClass}>Ad, soyad*</label>
                <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} placeholder="Ad Soyad" />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Telefon*</label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" className={fieldClass} placeholder="+994 __ ___ __ __" />
              </div>
            </div>

            <div>
               <label htmlFor="space" className={labelClass}>Məkan</label>
               <div className="relative">
                 <select id="space" name="space" defaultValue="" className={`${fieldClass} appearance-none cursor-pointer pr-12`}>
                   <option value="" disabled>Məkanı seçin...</option>
                   <option>Qonaq Otağı</option>
                   <option>Yataq Otağı</option>
                   <option>Mətbəx</option>
                   <option>Ofis</option>
                 </select>
                 <ChevronDown className="w-5 h-5 text-neutral-700 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
               </div>
            </div>

            <div>
               <label htmlFor="message" className={labelClass}>Məkan barədə bizə məlumat verin*</label>
               <textarea
                 id="message"
                 name="message"
                 rows={6}
                 required
                 className={`${fieldClass} resize-none`}
                 placeholder="Otağınızın sahəsi, ümumi tərz və ağlınızda olan mebel modeli barədə qeydlərinizi yazın..."
               ></textarea>
            </div>

            <div className="flex items-start gap-3">
              <input type="checkbox" id="terms" required className="mt-0.5 w-4 h-4 accent-black cursor-pointer" />
              <label htmlFor="terms" className="font-mono text-[11px] tracking-wider uppercase text-neutral-800 cursor-pointer">
                Göndərməklə məxfilik siyasəti və istifadə şərtləri ilə razılaşırsınız.
              </label>
            </div>

            <div className="flex items-start gap-3 font-mono text-xs uppercase text-neutral-700">
              <Clock className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Dizaynerlə zəng üçün 4 saat ərzində sizinlə əlaqə saxlayacağıq.</span>
            </div>

            <button
              type="submit"
              className="bg-[#111] text-white w-full py-5 rounded-full text-sm font-semibold tracking-wider uppercase shadow-[inset_0_2px_8px_rgba(255,255,255,0.15)] hover:bg-black transition-colors"
            >
              Məsləhət Üçün Göndər
            </button>

            <p role="status" aria-live="polite" className={`font-mono text-xs uppercase tracking-wide text-neutral-800 ${sent ? '' : 'hidden'}`}>
              Sorğunuz qəbul olundu. Tezliklə sizinlə əlaqə saxlayacağıq.
            </p>
          </form>

        </div>
      </div>
    </section>
  );
}
