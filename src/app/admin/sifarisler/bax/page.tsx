import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Loader2, Mail, MessageCircle, Phone } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import OrderStatusControl from '@/components/admin/OrderStatusControl';
import DeleteOrderButton from '@/components/admin/DeleteOrderButton';
import { adminCard } from '@/components/admin/styles';
import { requireAdmin } from '@/lib/admin';
import { getOrderFresh } from '@/lib/admin-data';
import { optionLabel } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import { ORDER_STATUS_LABEL, ORDER_STATUS_STYLE } from '@/lib/order-status';

export const metadata: Metadata = { title: 'Sifariş' };

const dateFmt = new Intl.DateTimeFormat('az-AZ', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Baku' });

// +994 55 201 01 38 / 055 201 01 38 -> 994552010138 (WhatsApp keçidi üçün)
function waNumber(phone: string): string {
  const d = phone.replace(/\D/g, '');
  if (d.startsWith('994')) return d;
  if (d.startsWith('0')) return `994${d.slice(1)}`;
  return d.length === 9 ? `994${d}` : d;
}

const PAYMENT_STATUS: Record<string, string> = {
  pending: 'Ödəniş gözlənilir',
  paid: 'Ödənilib',
  failed: 'Ödəniş alınmadı',
  cancelled: 'Ödəniş ləğv edildi',
};

async function OrderDetail({ searchParams }: { searchParams: PageProps<'/admin/sifarisler/bax'>['searchParams'] }) {
  const admin = await requireAdmin();
  const { n } = await searchParams;
  if (typeof n !== 'string' || !n) notFound();
  const order = await getOrderFresh(n);
  if (!order) notFound();
  const { customer, location } = order;

  return (
    <>
      <AdminHeader email={admin.email} />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <Link href="/admin/sifarisler" className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-600 hover:text-black mb-4">
          <ArrowLeft className="w-4 h-4" /> Sifarişlər
        </Link>
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold">Sifariş №{order.orderNumber}</h1>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${ORDER_STATUS_STYLE[order.status]}`}>{ORDER_STATUS_LABEL[order.status]}</span>
          <span className="text-sm text-neutral-500">{dateFmt.format(new Date(order.createdAt))}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          <div className="flex flex-col gap-6">
            <section className={`${adminCard} p-5`}>
              <h2 className="font-bold mb-3">Məhsullar</h2>
              <ul className="divide-y divide-black/5">
                {order.items.map((i, idx) => (
                  <li key={idx} className="flex justify-between gap-4 py-2.5 text-sm">
                    <div>
                      <Link href={`/magaza/${i.slug}`} target="_blank" className="font-semibold hover:underline">{i.name}</Link>
                      <p className="text-neutral-500 text-xs mt-0.5">
                        {[i.code && `Kod: ${i.code}`, (i.color || i.size) && optionLabel(i)].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p>{i.qty} × {formatPrice(i.price)}</p>
                      <p className="font-bold">{formatPrice(i.price * i.qty)}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between pt-3 mt-1 border-t border-black/10 font-bold">
                <span>Cəmi</span>
                <span>{formatPrice(order.total)}</span>
              </div>
              <p className="text-sm text-neutral-600 mt-3">
                Ödəniş: <b>{order.payment}</b>
                {order.paymentStatus && order.paymentStatus !== 'unpaid' && <> · {PAYMENT_STATUS[order.paymentStatus] ?? order.paymentStatus}</>}
              </p>
            </section>

            <section className={`${adminCard} p-5`}>
              <h2 className="font-bold mb-3">Çatdırılma ünvanı</h2>
              <p className="text-sm">{customer.city}, {customer.address}</p>
              {order.note && <p className="text-sm text-neutral-600 mt-2 whitespace-pre-line">Qeyd: {order.note}</p>}
              {location ? (
                <div className="mt-4">
                  <iframe
                    title="Müştərinin konumu"
                    src={`https://www.google.com/maps?q=${location.lat},${location.lng}&z=17&hl=az&output=embed`}
                    className="w-full h-72 rounded-xl border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold underline underline-offset-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Google Maps-də marşrut ({location.lat.toFixed(5)}, {location.lng.toFixed(5)})
                  </a>
                </div>
              ) : (
                <p className="text-xs text-neutral-500 mt-3">Müştəri xəritədə konum seçməyib.</p>
              )}
            </section>

            {order.statusHistory.length > 0 && (
              <section className={`${adminCard} p-5`}>
                <h2 className="font-bold mb-3">Status tarixçəsi</h2>
                <ol className="flex flex-col gap-2 text-sm">
                  <li className="flex gap-3"><span className="text-neutral-500 w-40 shrink-0">{dateFmt.format(new Date(order.createdAt))}</span> Sifariş verildi</li>
                  {order.statusHistory.map((h, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-neutral-500 w-40 shrink-0">{dateFmt.format(new Date(h.at))}</span>
                      <span>
                        <b>{ORDER_STATUS_LABEL[h.status] ?? h.status}</b>
                        {h.note && <span className="text-neutral-600"> — {h.note}</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
            <section className={`${adminCard} p-5`}>
              <h2 className="font-bold mb-3">Müştəri</h2>
              <p className="font-semibold">{customer.name}</p>
              <div className="flex flex-col gap-2 mt-3 text-sm">
                <a href={`tel:${customer.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2 hover:underline"><Phone className="w-4 h-4" /> {customer.phone}</a>
                <a href={`https://wa.me/${waNumber(customer.phone)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline"><MessageCircle className="w-4 h-4" /> WhatsApp</a>
                {customer.email && <a href={`mailto:${customer.email}`} className="inline-flex items-center gap-2 hover:underline break-all"><Mail className="w-4 h-4" /> {customer.email}</a>}
              </div>
              <p className="text-xs text-neutral-500 mt-3">{order.userId ? 'Qeydiyyatlı müştəri' : 'Qonaq sifarişi'}</p>
            </section>

            <OrderStatusControl orderNumber={order.orderNumber} status={order.status} />
            <DeleteOrderButton orderNumber={order.orderNumber} />
          </aside>
        </div>
      </main>
    </>
  );
}

export default function OrderDetailPage(props: PageProps<'/admin/sifarisler/bax'>) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>}>
      <OrderDetail searchParams={props.searchParams} />
    </Suspense>
  );
}
