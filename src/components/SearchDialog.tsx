'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Loader2, Search, X } from 'lucide-react';
import { formatPrice } from '@/lib/format';
import { panels, usePanel } from '@/lib/ui';

type Result = {
  products: { slug: string; name: string; price: number; image: string; categoryName: string }[];
  categories: { slug: string; name: string }[];
};

const EMPTY: Result = { products: [], categories: [] };

// Üst menyudakı axtarış: məhsul və kateqoriyaları canlı axtarır
export default function SearchDialog() {
  const open = usePanel() === 'search';
  const lenis = useLenis();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Result>(EMPTY);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && panels.close();
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);
    };
  }, [open, lenis]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal });
        const json = await res.json();
        setResult(json.ok ? json.results : EMPTY);
      } catch {
        // sorğu ləğv olunub və ya şəbəkə xətası — nəticələr dəyişmir
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 220);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  const q = query.trim();
  const active = q.length >= 2;
  const shown = active ? result : EMPTY;
  const nothing = active && !loading && shown.products.length === 0 && shown.categories.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Axtarış">
          <motion.div
            className="absolute inset-0 bg-black/35 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={panels.close}
          />
          <motion.div
            className="absolute left-1/2 top-4 sm:top-24 w-[calc(100%-1.5rem)] max-w-2xl -translate-x-1/2 rounded-3xl bg-gradient-to-b from-[#f0f0f0] to-[#d6d6d6] border border-white/70 shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden"
            initial={{ opacity: 0, y: -24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3 px-5 h-16 border-b border-black/10">
              {loading ? <Loader2 className="w-5 h-5 animate-spin shrink-0" /> : <Search className="w-5 h-5 shrink-0" />}
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Məhsul və ya kateqoriya axtarın..."
                aria-label="Axtarış"
                className="flex-1 bg-transparent outline-none text-base sm:text-lg placeholder:text-neutral-500"
              />
              <button type="button" onClick={panels.close} aria-label="Axtarışı bağla" className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center hover:bg-black/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto overscroll-contain p-3">
              {!active && <p className="px-3 py-6 text-center text-sm text-neutral-600">Axtarmaq üçün ən azı 2 hərf yazın.</p>}
              {nothing && <p className="px-3 py-6 text-center text-sm text-neutral-700">“{q}” üzrə heç nə tapılmadı.</p>}

              {shown.categories.length > 0 && (
                <div className="mb-2">
                  <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600">Kateqoriyalar</p>
                  {shown.categories.map((c) => (
                    <Link key={c.slug} href={`/kateqoriyalar/${c.slug}`} onClick={panels.close} className="block px-3 py-2.5 rounded-xl font-semibold hover:bg-black/5">
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}

              {shown.products.length > 0 && (
                <div>
                  <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-neutral-600">Məhsullar</p>
                  {shown.products.map((p) => (
                    <Link key={p.slug} href={`/magaza/${p.slug}`} onClick={panels.close} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5">
                      <span className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#b5aba0]">
                        <Image src={p.image} alt="" fill sizes="56px" className="object-cover" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-semibold truncate">{p.name}</span>
                        <span className="block text-xs text-neutral-600">{p.categoryName}</span>
                      </span>
                      <span className="font-extrabold text-sm shrink-0">{formatPrice(p.price)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
