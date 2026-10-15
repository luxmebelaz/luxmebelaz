'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';
import { deleteOrder } from '@/app/admin/actions';
import { adminCard } from './styles';

export default function DeleteOrderButton({ orderNumber }: { orderNumber: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');

  function remove() {
    if (!window.confirm(`Sifariş №${orderNumber} silinsin? Bu əməliyyat geri qaytarılmır.`)) return;
    setError('');
    startTransition(async () => {
      const result = await deleteOrder(orderNumber);
      if (!result.ok) return setError(result.error);
      router.replace('/admin/sifarisler');
      router.refresh();
    });
  }

  return (
    <section className={`${adminCard} p-5`}>
      <button
        type="button"
        onClick={remove}
        disabled={pending}
        className="w-full h-11 rounded-full border border-red-300 text-red-700 text-sm font-bold hover:bg-red-50 disabled:opacity-60 inline-flex items-center justify-center gap-2"
      >
        {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />} Sifarişi sil
      </button>
      {error && <p role="alert" className="text-sm text-red-700 mt-3">{error}</p>}
    </section>
  );
}
