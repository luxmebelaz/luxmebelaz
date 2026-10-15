import 'server-only';

import { getAdminSupabase } from '@/lib/supabase/admin';
import type { PaymentStatus } from '@/lib/payments/types';

// SERVER TƏRƏFİ SAXLAMA QATI.
// SUPABASE_SERVICE_ROLE_KEY təyin olunubsa, məlumat bazaya yazılır (RLS-i keçən server açarı ilə).
// Təyin olunmayıbsa (yerli inkişaf), müraciətlər yalnız server jurnalına yazılır.

export type Inquiry = {
  name: string;
  phone: string;
  space?: string;
  message: string;
};

export type OrderRecord = {
  orderNumber: string;
  userId?: string;
  customer: { name: string; phone: string; email?: string; city: string; address: string };
  items: { slug: string; name: string; qty: number; price: number }[];
  total: number;
  payment: string;
  note?: string;
  // Yalnız onlayn ödənişdə (supabase/payments.sql sütunları)
  online?: { provider: string };
};

export async function saveInquiry(inquiry: Inquiry): Promise<void> {
  const db = getAdminSupabase();
  if (!db) {
    console.log('[inquiry]', JSON.stringify({ ...inquiry, at: new Date().toISOString() }));
    return;
  }
  const { error } = await db.from('inquiries').insert({
    name: inquiry.name,
    phone: inquiry.phone,
    space: inquiry.space ?? null,
    message: inquiry.message,
  });
  if (error) {
    console.error('[inquiry:error]', error.message);
    throw new Error('inquiry_save_failed');
  }
}

export async function saveOrder(order: OrderRecord): Promise<void> {
  const db = getAdminSupabase();
  if (!db) {
    console.log('[order]', JSON.stringify({ ...order, at: new Date().toISOString() }));
    return;
  }
  const { error } = await db.from('orders').insert({
    order_number: order.orderNumber,
    user_id: order.userId ?? null,
    customer_name: order.customer.name,
    phone: order.customer.phone,
    email: order.customer.email ?? null,
    city: order.customer.city,
    address: order.customer.address,
    note: order.note ?? null,
    payment: order.payment,
    total: order.total,
    items: order.items,
    ...(order.online ? { payment_status: 'pending', payment_provider: order.online.provider } : {}),
  });
  if (error) {
    console.error('[order:error]', error.message);
    throw new Error('order_save_failed');
  }
}

export type OrderPayment = {
  orderNumber: string;
  total: number;
  paymentId: string | null;
  status: PaymentStatus;
};

export async function getOrderPayment(by: { orderNumber: string } | { paymentId: string }): Promise<OrderPayment | null> {
  const db = getAdminSupabase();
  if (!db) return null;
  const query = db.from('orders').select('order_number,total,payment_id,payment_status');
  const { data, error } = await ('orderNumber' in by
    ? query.eq('order_number', by.orderNumber)
    : query.eq('payment_id', by.paymentId)
  ).maybeSingle();
  if (error || !data) return null;
  return {
    orderNumber: data.order_number,
    total: Number(data.total),
    paymentId: data.payment_id,
    status: (data.payment_status ?? 'pending') as PaymentStatus,
  };
}

// Ödənilmiş sifariş bir daha dəyişdirilmir (təkrar callback-lər üçün idempotent)
export async function updateOrderPayment(
  orderNumber: string,
  patch: { paymentId?: string; status?: PaymentStatus },
): Promise<void> {
  const db = getAdminSupabase();
  if (!db) return;
  const { error } = await db
    .from('orders')
    .update({
      ...(patch.paymentId ? { payment_id: patch.paymentId } : {}),
      ...(patch.status ? { payment_status: patch.status } : {}),
      ...(patch.status === 'paid' ? { paid_at: new Date().toISOString() } : {}),
    })
    .eq('order_number', orderNumber)
    .neq('payment_status', 'paid');
  if (error) console.error('[payment:update:error]', orderNumber, error.message);
}
