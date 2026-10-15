'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, LogOut, Package, Pencil } from 'lucide-react';
import { logoutUser, useAuth } from '@/lib/auth';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { useOrders, type StoredOrder } from '@/lib/orders';
import { formatPrice } from '@/lib/format';
import { optionLabel } from '@/lib/catalog';
import { isOrderStatus, ORDER_STATUS_LABEL, ORDER_STATUS_STYLE } from '@/lib/order-status';
import { primaryButton, secondaryButton } from '@/components/ui';
import ProfileEditor, { GENDER_LABEL } from '@/components/ProfileEditor';

type OrderRow = {
  order_number: string;
  created_at: string;
  total: number | string;
  payment: string;
  status?: string;
  items: { name: string; qty: number; price: number; size?: string; color?: string }[];
};

// Daxil olmuş istifadəçinin sifarişlərini Supabase-dən oxuyur (RLS yalnız öz sifarişlərini verir)
function useRemoteOrders(userId: string | undefined) {
  const [orders, setOrders] = useState<StoredOrder[] | null>(null);

  useEffect(() => {
    const supabase = getBrowserSupabase();
    if (!supabase || !userId) return;
    let cancelled = false;
    supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        setOrders(
          (data as OrderRow[]).map((r) => ({
            orderNumber: r.order_number,
            createdAt: r.created_at,
            total: Number(r.total),
            payment: r.payment,
            status: r.status,
            items: r.items ?? [],
          })),
        );
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return orders;
}

export default function AccountView() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const localOrders = useOrders();
  const remoteOrders = useRemoteOrders(user?.id);
  const orders = remoteOrders ?? localOrders;
  const [editing, setEditing] = useState(false);

  if (loading) return <div className="glass-light rounded-3xl h-64 animate-pulse" aria-hidden="true" />;

  if (!user) {
    return (
      <div className="glass-light rounded-3xl p-10 md:p-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Hesabınıza daxil olun</h2>
        <p className="text-neutral-700 mb-7">Sifarişlərinizi görmək üçün daxil olun və ya qeydiyyatdan keçin.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/giris" className={primaryButton}>Daxil ol</Link>
          <Link href="/qeydiyyat" className={secondaryButton}>Qeydiyyat</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
      <section className="glass-light rounded-3xl p-6 sm:p-8">
        {editing ? (
          <>
            <h2 className="text-xl font-bold mb-5">Profili redaktə et</h2>
            <ProfileEditor user={user} onDone={() => setEditing(false)} />
          </>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-5">
              {user.avatar ? (
                <Image src={user.avatar} alt="" width={64} height={64} className="w-16 h-16 rounded-full object-cover" referrerPolicy="no-referrer" unoptimized />
              ) : (
                <span className="w-16 h-16 rounded-full bg-[#111] text-white flex items-center justify-center text-xl font-bold">
                  {user.name.slice(0, 1).toLocaleUpperCase('az')}
                </span>
              )}
              <h2 className="text-xl font-bold">Profil</h2>
            </div>
            <dl className="flex flex-col gap-4 text-[14px]">
              <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">Ad, soyad</dt><dd className="font-semibold">{user.name}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">E-poçt</dt><dd className="font-semibold break-all">{user.email}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">Telefon</dt><dd className="font-semibold">{user.phone || <span className="text-neutral-500 font-normal">Əlavə edilməyib</span>}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">Cins</dt><dd className="font-semibold">{user.gender ? GENDER_LABEL[user.gender] : <span className="text-neutral-500 font-normal">Göstərilməyib</span>}</dd></div>
            </dl>
            <button type="button" onClick={() => setEditing(true)} className={`${primaryButton} w-full mt-7 !h-12`}>
              <Pencil className="w-4 h-4" /> Profili redaktə et
            </button>
            <button
              type="button"
              onClick={async () => {
                await logoutUser();
                router.push('/');
              }}
              className={`${secondaryButton} w-full mt-3 !h-12`}
            >
              <LogOut className="w-4 h-4" /> Çıxış
            </button>
          </>
        )}
      </section>

      <section className="glass-light rounded-3xl p-6 sm:p-8">
        <h2 className="text-xl font-bold mb-5">Sifarişlərim</h2>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-10 h-10 mx-auto mb-3 text-neutral-600" strokeWidth={1.5} />
            <p className="text-neutral-700 mb-5">Hələ sifarişiniz yoxdur.</p>
            <Link href="/magaza" className={primaryButton}>Mağazaya keç</Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {orders.map((o) => (
              <li key={o.orderNumber} className="rounded-2xl bg-white/35 border border-white/50 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <p className="font-extrabold tracking-wide flex items-center gap-2">
                    №{o.orderNumber}
                    {isOrderStatus(o.status) && (
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${ORDER_STATUS_STYLE[o.status]}`}>{ORDER_STATUS_LABEL[o.status]}</span>
                    )}
                  </p>
                  <p className="text-sm text-neutral-700">{new Date(o.createdAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <ul className="text-sm text-neutral-800 flex flex-col gap-1 mb-3">
                  {o.items.map((i, idx) => (
                    <li key={idx} className="flex justify-between gap-3"><span>{i.name}{(i.color || i.size) && ` (${optionLabel(i)})`} × {i.qty}</span><span className="font-semibold">{formatPrice(i.price * i.qty)}</span></li>
                  ))}
                </ul>
                <div className="flex flex-wrap justify-between gap-2 pt-3 border-t border-black/10 text-sm">
                  <span className="text-neutral-700">{o.payment}</span>
                  <span className="font-extrabold">Cəmi: {formatPrice(o.total)}</span>
                </div>
                {/^\d{6}$/.test(o.orderNumber) && (
                  <Link href={`/hesab/sifaris?n=${o.orderNumber}`} className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold underline underline-offset-4">
                    Sifarişi izlə <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
