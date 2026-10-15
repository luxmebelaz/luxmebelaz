'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Minus, Plus, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { panels } from '@/lib/ui';
import type { Product } from '@/lib/data/types';

type Props = {
  product: Pick<Product, 'slug' | 'name' | 'price' | 'image' | 'inStock'> & Partial<Pick<Product, 'sizes' | 'colors'>>;
  variant?: 'compact' | 'full';
};

const chip = (active: boolean) =>
  `inline-flex items-center gap-2 h-10 px-4 rounded-full border text-sm font-semibold transition-colors ${
    active ? 'bg-[#111] text-white border-[#111]' : 'bg-white/40 border-black/20 hover:border-black/60'
  }`;

export default function AddToCartButton({ product, variant = 'compact' }: Props) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const sizes = product.sizes ?? [];
  const colors = product.colors ?? [];
  const hasOptions = sizes.length > 0 || colors.length > 0;
  // Tək seçim varsa, avtomatik seçilir
  const [size, setSize] = useState(sizes.length === 1 ? sizes[0] : '');
  const [color, setColor] = useState(colors.length === 1 ? colors[0].name : '');
  const [hint, setHint] = useState('');

  const handleAdd = () => {
    if (sizes.length > 0 && !size) return setHint('Ölçü seçin.');
    if (colors.length > 0 && !color) return setHint('Rəng seçin.');
    setHint('');
    add(
      { slug: product.slug, name: product.name, price: product.price, image: product.image, size: size || undefined, color: color || undefined },
      qty,
    );
    setAdded(true);
    panels.openCart();
    window.setTimeout(() => setAdded(false), 2200);
  };

  if (!product.inStock) {
    return (
      <span className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-black/10 text-sm font-semibold text-neutral-600">
        Mövcud deyil
      </span>
    );
  }

  if (variant === 'compact') {
    const compactClass =
      'inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full bg-white text-black text-sm font-semibold whitespace-nowrap hover:bg-[#e4d093] transition-colors';
    // Rəng/ölçü seçimi olan məhsul kartdan birbaşa əlavə olunmur — seçim məhsul səhifəsindədir
    if (hasOptions) {
      return (
        <Link href={`/magaza/${product.slug}`} className={compactClass} aria-label={`${product.name} — seçim et`}>
          <SlidersHorizontal className="w-4 h-4" /> Seçim et
        </Link>
      );
    }
    return (
      <button type="button" onClick={handleAdd} aria-label={`${product.name} məhsulunu səbətə əlavə et`} className={compactClass}>
        {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
        {added ? 'Əlavə olundu' : 'Əlavə et'}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {colors.length > 0 && (
        <fieldset>
          <legend className="text-xs font-bold tracking-wider uppercase text-neutral-700 mb-2">
            Rəng{color && <span className="normal-case tracking-normal font-semibold text-neutral-900">: {color}</span>}
          </legend>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button key={c.name} type="button" aria-pressed={color === c.name} onClick={() => setColor(c.name)} className={chip(color === c.name)}>
                {c.hex && <span className="w-4 h-4 rounded-full border border-black/20" style={{ background: c.hex }} aria-hidden="true" />}
                {c.name}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      {sizes.length > 0 && (
        <fieldset>
          <legend className="text-xs font-bold tracking-wider uppercase text-neutral-700 mb-2">Ölçü</legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <button key={s} type="button" aria-pressed={size === s} onClick={() => setSize(s)} className={chip(size === s)}>
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center h-14 rounded-full border border-black/30 bg-white/40">
          <button
            type="button"
            aria-label="Sayı azalt"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-12 h-full flex items-center justify-center hover:bg-black/5 rounded-l-full"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-semibold" aria-live="polite">{qty}</span>
          <button
            type="button"
            aria-label="Sayı artır"
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="w-12 h-full flex items-center justify-center hover:bg-black/5 rounded-r-full"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 min-w-48 h-14 inline-flex items-center justify-center gap-2 rounded-full bg-[#111] text-white font-semibold shadow-[inset_0_2px_8px_rgba(255,255,255,0.18)] hover:bg-black transition-colors"
        >
          {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
          {added ? 'Səbətə əlavə olundu' : 'Səbətə əlavə et'}
        </button>
      </div>
      {hint && <p role="alert" className="text-sm font-semibold text-red-700">{hint}</p>}
    </div>
  );
}
