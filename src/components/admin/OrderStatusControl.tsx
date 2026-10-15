'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';
import { setOrderStatus } from '@/app/admin/actions';
import { ORDER_STATUS_LABEL, type OrderStatus } from '@/lib/order-status';
import { adminCard, adminInput, adminLabel } from './styles';

// İş axını: Yeni → Təsdiqləndi → Hazırlanır → Çatdırılır → Çatdırıldı (istənilən mərhələdə Ləğv)
const FLOW: OrderStatus[] = ['new', 'confirmed', 'preparing', 'delivering', 'delivered'];

export default function OrderStatusControl({ orderNumber, status }: { orderNumber: string; status: OrderStatus }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const currentIndex = FLOW.indexOf(status);
  const next = currentIndex >= 0 && currentIndex < FLOW.length - 1 ? FLOW[currentIndex + 1] : null;

  function change(to: OrderStatus) {
    if (to === 'cancelled' && !window.confirm('Sifariş ləğv edilsin?')) return;
    setError('');
    startTransition(async () => {
      const result = await setOrderStatus(orderNumber, to, note || undefined);
      if (!result.ok) return setError(result.error);
      setNote('');
      router.refresh();
    });
  }

  return (
    <section className={`${adminCard} p-5 flex flex-col gap-4`}>
      <h2 className="font-bold">Sifarişin gedişatı</h2>

      <ol className="flex flex-col gap-2">
        {FLOW.map((s, i) => {
          const done = status !== 'cancelled' && currentIndex >= i;
          return (
            <li key={s} className="flex items-center gap-3 text-sm">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-emerald-700 text-white' : 'bg-black/10 text-neutral-500'}`}>
                {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </span>
              <span className={done ? 'font-semibold' : 'text-neutral-500'}>{ORDER_STATUS_LABEL[s]}</span>
            </li>
          );
        })}
        {status === 'cancelled' && <li className="text-sm font-semibold text-red-700">Sifariş ləğv edilib</li>}
      </ol>

      <div>
        <label htmlFor="status-note" className={adminLabel}>Qeyd (istəyə bağlı, tarixçəyə yazılır)</label>
        <input id="status-note" value={note} onChange={(e) => setNote(e.target.value)} maxLength={300} className={adminInput} placeholder="Məs.: çatdırılma 18 oktyabr, 14:00" />
      </div>

      {next && (
        <button
          type="button"
          onClick={() => change(next)}
          disabled={pending}
          className="h-11 rounded-full bg-[#111] text-white text-sm font-bold hover:bg-black disabled:opacity-60 inline-flex items-center justify-center gap-2"
        >
          {pending && <Loader2 className="w-4 h-4 animate-spin" />} “{ORDER_STATUS_LABEL[next]}” et
        </button>
      )}

      <details className="text-sm">
        <summary className="cursor-pointer text-neutral-600 font-semibold">Başqa status seç</summary>
        <div className="flex flex-wrap gap-2 mt-3">
          {[...FLOW, 'cancelled' as const]
            .filter((s) => s !== status)
            .map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => change(s)}
                disabled={pending}
                className={`h-8 px-3 rounded-full text-xs font-semibold border disabled:opacity-60 ${
                  s === 'cancelled' ? 'border-red-300 text-red-700 hover:bg-red-50' : 'border-black/15 hover:border-black/40'
                }`}
              >
                {ORDER_STATUS_LABEL[s]}
              </button>
            ))}
        </div>
      </details>

      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
    </section>
  );
}
