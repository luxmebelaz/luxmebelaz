import React from 'react';
import { Check, X } from 'lucide-react';
import { isOrderStatus, ORDER_STATUS_LABEL, type OrderStatus } from '@/lib/order-status';

const FLOW: OrderStatus[] = ['new', 'confirmed', 'preparing', 'delivering', 'delivered'];
const STEP_LABEL: Record<OrderStatus, string> = { ...ORDER_STATUS_LABEL, new: 'Sifariş verildi' };

const dateFmt = new Intl.DateTimeFormat('az-AZ', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Baku' });

export type TimelineEntry = { status: string; at: string; note?: string };

// Müştəri üçün sifarişin gedişatı: hər mərhələ və onun tarixi
export default function OrderTimeline({ status, createdAt, history }: { status: string; createdAt: string; history: TimelineEntry[] }) {
  const current: OrderStatus = isOrderStatus(status) ? status : 'new';
  const reachedAt = (s: OrderStatus) => (s === 'new' ? createdAt : [...history].reverse().find((h) => h.status === s)?.at);
  const noteFor = (s: OrderStatus) => [...history].reverse().find((h) => h.status === s)?.note;
  const currentIndex = FLOW.indexOf(current);

  if (current === 'cancelled') {
    const at = reachedAt('cancelled');
    return (
      <div className="flex items-start gap-3 rounded-2xl bg-red-50/70 border border-red-200 p-4">
        <X className="w-5 h-5 text-red-700 shrink-0" />
        <div>
          <p className="font-bold text-red-800">Sifariş ləğv edilib</p>
          {at && <p className="text-xs text-red-800/80">{dateFmt.format(new Date(at))}</p>}
          {noteFor('cancelled') && <p className="text-sm text-red-900 mt-1">{noteFor('cancelled')}</p>}
        </div>
      </div>
    );
  }

  return (
    <ol className="relative flex flex-col gap-5">
      {FLOW.map((s, i) => {
        const done = i <= currentIndex;
        const at = done ? reachedAt(s) : undefined;
        const note = done ? noteFor(s) : undefined;
        return (
          <li key={s} className="relative flex gap-3">
            {i < FLOW.length - 1 && (
              <span className={`absolute left-[13px] top-7 -bottom-5 w-0.5 ${i < currentIndex ? 'bg-emerald-700' : 'bg-black/15'}`} aria-hidden="true" />
            )}
            <span
              className={`relative z-10 w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                done ? 'bg-emerald-700 text-white' : 'bg-white/60 border border-black/15 text-neutral-500'
              } ${i === currentIndex ? 'ring-4 ring-emerald-700/20' : ''}`}
            >
              {done ? <Check className="w-4 h-4" /> : i + 1}
            </span>
            <div className="pt-0.5">
              <p className={done ? 'font-bold' : 'font-semibold text-neutral-500'}>{STEP_LABEL[s]}</p>
              {at && <p className="text-xs text-neutral-600">{dateFmt.format(new Date(at))}</p>}
              {note && <p className="text-sm text-neutral-800 mt-0.5">{note}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
