'use client';

import React, { useState } from 'react';
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { panels } from '@/lib/ui';
import type { Product } from '@/lib/data/types';

type Props = {
  product: Pick<Product, 'slug' | 'name' | 'price' | 'image' | 'inStock'>;
  variant?: 'compact' | 'full';
};

export default function AddToCartButton({ product, variant = 'compact' }: Props) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add({ slug: product.slug, name: product.name, price: product.price, image: product.image }, qty);
    setAdded(true);
    panels.openCart();
    window.setTimeout(() => setAdded(false), 2200);
  };

  if (!product.inStock) {
    return (
      <span className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-black/10 text-sm font-semibold text-neutral-600">
        Stokda yoxdur
      </span>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleAdd}
        aria-label={`${product.name} məhsulunu səbətə əlavə et`}
        className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full bg-white text-black text-sm font-semibold whitespace-nowrap hover:bg-[#e4d093] transition-colors"
      >
        {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
        {added ? 'Əlavə olundu' : 'Səbətə at'}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3">
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
    </div>
  );
}
