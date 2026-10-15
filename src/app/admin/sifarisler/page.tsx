import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import { adminCard } from '@/components/admin/styles';
import { requireAdmin } from '@/lib/admin';
import { listOrdersFresh } from '@/lib/admin-data';
import { formatPrice } from '@/lib/format';
import { isOrderStatus, ORDER_STATUSES, ORDER_STATUS_LABEL, ORDER_STATUS_STYLE } from '@/lib/order-status';

export const metadata: Metadata = { title: 'Sifarişlər' };

const dateFmt = new Intl.DateTimeFormat('az-AZ', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Baku' });

async function Orders({ searchParams }: { searchParams: PageProps<'/admin/sifarisler'>['searchParams'] }) {
  const admin = await requireAdmin();
  const { status: raw } = await searchParams;
  const status = isOrderStatus(raw) ? raw : undefined;
  const { orders, counts, error } = await listOrdersFresh(status);
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  const tab = (href: string, label: string, count: number, active: boolean) => (
    <Link
      key={href}
      href={href}
      className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-xs font-semibold whitespace-nowrap ${active ? 'bg-[#111] text-white' : 'bg-black/5 hover:bg-black/10'}`}
    >
      {label} <span className={active ? 'text-white/70' : 'text-neutral-500'}>{count}</span>
    </Link>
  );

  return (
    <>
      <AdminHeader email={admin.email} />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold mb-5">Sifarişlər</h1>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {tab('/admin/sifarisler', 'Hamısı', totalCount, !status)}
          {ORDER_STATUSES.map((s) => tab(`/admin/sifarisler?status=${s}`, ORDER_STATUS_LABEL[s], counts[s] ?? 0, status === s))}
        </div>

        {error && <p className={`${adminCard} p-4 mb-6 text-sm text-red-700`}>{error}</p>}

        <div className={adminCard}>
          {orders.length === 0 ? (
            <p className="p-10 text-center text-sm text-neutral-500">Sifariş yoxdur.</p>
          ) : (
            <ul className="divide-y divide-black/5">
              {orders.map((o) => (
                <li key={o.orderNumber}>
                  <Link href={`/admin/sifarisler/bax?n=${o.orderNumber}`} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 hover:bg-black/[0.02]">
                    <div className="flex items-center gap-3 sm:w-52 shrink-0">
                      <span className="font-bold tracking-wide">№{o.orderNumber}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${ORDER_STATUS_STYLE[o.status]}`}>{ORDER_STATUS_LABEL[o.status]}</span>
                    </div>
                    <div className="flex-1 min-w-0 text-sm">
                      <p className="font-semibold truncate">
                        {o.customer.name} · {o.customer.phone}
                        {o.location && <MapPin className="inline w-3.5 h-3.5 ml-1.5 -mt-0.5 text-emerald-700" aria-label="Konum var" />}
                      </p>
                      <p className="text-neutral-500 truncate">
                        {o.items.reduce((n, i) => n + i.qty, 0)} məhsul · {o.customer.city}, {o.customer.address}
                      </p>
                    </div>
                    <div className="flex sm:flex-col sm:items-end justify-between gap-1 text-sm shrink-0">
                      <span className="font-bold">{formatPrice(o.total)}</span>
                      <span className="text-neutral-500 text-xs">{dateFmt.format(new Date(o.createdAt))}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

export default function OrdersPage(props: PageProps<'/admin/sifarisler'>) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>}>
      <Orders searchParams={props.searchParams} />
    </Suspense>
  );
}
