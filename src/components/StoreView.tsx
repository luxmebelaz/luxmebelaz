'use client';

import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import type { Category, Product } from '@/lib/data/types';

type Sort = 'default' | 'price-asc' | 'price-desc' | 'name';

export default function StoreView({
  products,
  categories,
  initialCategory = 'all',
}: {
  products: Product[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<Sort>('default');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('az');
    let list = products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!q || p.name.toLocaleLowerCase('az').includes(q) || p.summary.toLocaleLowerCase('az').includes(q)),
    );
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'az'));
    return list;
  }, [products, category, sort, query]);

  const chip = (active: boolean) =>
    `px-4 h-10 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
      active ? 'bg-[#111] text-white' : 'bg-white/40 border border-white/60 text-neutral-800 hover:bg-white/70'
    }`;

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap" role="tablist" aria-label="Kateqoriya">
          <button type="button" className={chip(category === 'all')} onClick={() => setCategory('all')}>
            Hamısı
          </button>
          {categories.map((c) => (
            <button key={c.slug} type="button" className={chip(category === c.slug)} onClick={() => setCategory(c.slug)}>
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <label className="relative block">
            <span className="sr-only">Məhsul axtar</span>
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Axtar..."
              className="w-full sm:w-56 h-11 pl-10 pr-4 rounded-full bg-white/40 border border-white/60 text-sm outline-none focus:border-black/50"
            />
          </label>
          <label className="block">
            <span className="sr-only">Sıralama</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="w-full sm:w-auto h-11 px-4 rounded-full bg-white/40 border border-white/60 text-sm font-medium outline-none focus:border-black/50 cursor-pointer"
            >
              <option value="default">Sıralama: standart</option>
              <option value="price-asc">Qiymət: ucuzdan bahaya</option>
              <option value="price-desc">Qiymət: bahadan ucuza</option>
              <option value="name">Ada görə (A–Z)</option>
            </select>
          </label>
        </div>
      </div>

      <p className="text-sm text-neutral-700 mb-5" aria-live="polite">{visible.length} məhsul tapıldı</p>

      {visible.length === 0 ? (
        <div className="glass-light rounded-3xl p-10 text-center">
          <p className="text-lg font-semibold mb-2">Heç nə tapılmadı</p>
          <p className="text-neutral-700 mb-5">Axtarışı və ya kateqoriyanı dəyişməyi sınayın.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
            className="h-11 px-6 rounded-full bg-[#111] text-white text-sm font-semibold"
          >
            Süzgəcləri təmizlə
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {visible.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
