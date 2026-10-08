'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Package } from 'lucide-react';
import { logoutUser, useAuth } from '@/lib/auth';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { useOrders, type StoredOrder } from '@/lib/orders';
import { formatPrice } from '@/lib/format';
import { primaryButton, secondaryButton } from '@/components/ui';

type OrderRow = {
  order_number: string;
  created_at: string;
  total: number | string;
  payment: string;
  items: { name: string; qty: number; price: number }[];
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
      .select('order_number, created_at, total, payment, items')
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
        <div className="flex items-center gap-4 mb-5">
          {user.avatar ? (
            <Image src={user.avatar} alt="" width={56} height={56} className="rounded-full" referrerPolicy="no-referrer" unoptimized />
          ) : (
            <span className="w-14 h-14 rounded-full bg-[#111] text-white flex items-center justify-center text-xl font-bold">
              {user.name.slice(0, 1).toLocaleUpperCase('az')}
            </span>
          )}
          <h2 className="text-xl font-bold">Profil</h2>
        </div>
        <dl className="flex flex-col gap-4 text-[15px]">
          <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">Ad, soyad</dt><dd className="font-semibold">{user.name}</dd></div>
          <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">E-poçt</dt><dd className="font-semibold break-all">{user.email}</dd></div>
          {user.phone && (
            <div><dt className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">Telefon</dt><dd className="font-semibold">{user.phone}</dd></div>
          )}
        </dl>
        <button
          type="button"
          onClick={async () => {
            await logoutUser();
            router.push('/');
          }}
          className={`${secondaryButton} w-full mt-7`}
        >
          <LogOut className="w-4 h-4" /> Çıxış
        </button>
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
                  <p className="font-extrabold tracking-wide">{o.orderNumber}</p>
                  <p className="text-sm text-neutral-700">{new Date(o.createdAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <ul className="text-sm text-neutral-800 flex flex-col gap-1 mb-3">
                  {o.items.map((i) => (
                    <li key={i.name} className="flex justify-between gap-3"><span>{i.name} × {i.qty}</span><span className="font-semibold">{formatPrice(i.price * i.qty)}</span></li>
                  ))}
                </ul>
                <div className="flex flex-wrap justify-between gap-2 pt-3 border-t border-black/10 text-sm">
                  <span className="text-neutral-700">{o.payment}</span>
                  <span className="font-extrabold">Cəmi: {formatPrice(o.total)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
