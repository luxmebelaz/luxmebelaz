import 'server-only';

import { getAdminSupabase } from '@/lib/supabase/admin';

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
  });
  if (error) {
    console.error('[order:error]', error.message);
    throw new Error('order_save_failed');
  }
}
