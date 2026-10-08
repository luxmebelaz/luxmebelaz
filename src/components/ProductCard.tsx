import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/lib/data/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col rounded-3xl overflow-hidden bg-[#0a0a0a] text-white shadow-[0_18px_40px_rgba(0,0,0,0.3)]">
      <Link href={`/magaza/${product.slug}`} className="block relative aspect-[4/3.4] overflow-hidden bg-[#b5aba0]" aria-label={`${product.name} — ətraflı bax`}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {!product.inStock && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 text-xs font-semibold">Stokda yoxdur</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col justify-between gap-5 p-5 sm:p-6">
        <div>
          <h3 className="text-xl sm:text-[22px] font-semibold leading-tight tracking-[-0.01em] mb-2">
            <Link href={`/magaza/${product.slug}`} className="hover:text-[#e4d093] transition-colors">{product.name}</Link>
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed">{product.summary}</p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] block mb-1">Qiymət</span>
            <span className="text-xl font-bold">{formatPrice(product.price)}</span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
