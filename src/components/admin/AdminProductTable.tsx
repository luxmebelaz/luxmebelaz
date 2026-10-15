'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { deleteProduct, setProductFlag } from '@/app/admin/actions';
import { formatPrice } from '@/lib/format';
import type { Category, Product } from '@/lib/data/types';
import { adminCard } from './styles';

type Flag = 'featured' | 'isNew' | 'inStock';

function Toggle({ on, label, disabled, onClick }: { on: boolean; label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={on}
      className={`h-7 px-2.5 rounded-full text-xs font-semibold border transition-colors disabled:opacity-50 ${
        on ? 'bg-[#111] text-white border-[#111]' : 'bg-white text-neutral-600 border-black/15 hover:border-black/40'
      }`}
    >
      {label}
    </button>
  );
}

export default function AdminProductTable({ products, categories }: { products: Product[]; categories: Category[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;
  const visible = filter === 'all' ? products : products.filter((p) => p.category === filter);

  function run(slug: string, action: () => Promise<{ ok: boolean; error?: string }>) {
    setBusy(slug);
    setError('');
    startTransition(async () => {
      const result = await action();
      if (!result.ok) setError(result.error ?? 'Xəta baş verdi.');
      router.refresh();
      setBusy(null);
    });
  }

  const toggle = (p: Product, flag: Flag) => run(p.slug, () => setProductFlag(p.slug, flag, !p[flag]));

  const remove = (p: Product) => {
    if (!window.confirm(`"${p.name}" silinsin? Bu əməliyyat geri qaytarılmır.`)) return;
    run(p.slug, () => deleteProduct(p.slug));
  };

  return (
    <div className={adminCard}>
      <div className="flex flex-wrap gap-2 p-4 border-b border-black/5">
        {[{ slug: 'all', name: 'Hamısı' }, ...categories].map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setFilter(c.slug)}
            aria-pressed={filter === c.slug}
            className={`h-8 px-3 rounded-full text-xs font-semibold ${filter === c.slug ? 'bg-[#111] text-white' : 'bg-black/5 hover:bg-black/10'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {error && <p role="alert" className="px-4 pt-4 text-sm text-red-700">{error}</p>}

      <ul className="divide-y divide-black/5">
        {visible.map((p) => {
          const disabled = pending && busy === p.slug;
          return (
            <li key={p.slug} className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 ${disabled ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-neutral-200">
                  {p.image && <Image src={p.image} alt="" fill sizes="64px" className="object-cover" />}
                </div>
                <div className="min-w-0">
                  <Link href={`/admin/mehsullar/redakte?slug=${encodeURIComponent(p.slug)}`} className="font-semibold hover:underline block truncate">{p.name}</Link>
                  <p className="text-xs text-neutral-500">
                    {p.code && <>#{p.code} · </>}{categoryName(p.category)} · {formatPrice(p.price)} · Sıra: {p.sortOrder}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <Toggle on={p.featured} label="Ana səhifədə" disabled={disabled} onClick={() => toggle(p, 'featured')} />
                <Toggle on={p.isNew} label="Yeni" disabled={disabled} onClick={() => toggle(p, 'isNew')} />
                <Toggle on={p.inStock} label={p.inStock ? 'Mövcuddur' : 'Mövcud deyil'} disabled={disabled} onClick={() => toggle(p, 'inStock')} />
                <Link href={`/magaza/${p.slug}`} target="_blank" className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-black/5" title="Saytda bax">
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <Link href={`/admin/mehsullar/redakte?slug=${encodeURIComponent(p.slug)}`} className="w-8 h-8 inline-flex items-center justify-center rounded-full hover:bg-black/5" title="Redaktə et">
                  <Pencil className="w-4 h-4" />
                </Link>
                <button type="button" onClick={() => remove(p)} disabled={disabled} className="w-8 h-8 inline-flex items-center justify-center rounded-full text-red-700 hover:bg-red-50" title="Sil">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </li>
          );
        })}
        {visible.length === 0 && <li className="p-6 text-sm text-neutral-500 text-center">Bu kateqoriyada məhsul yoxdur.</li>}
      </ul>
    </div>
  );
}
