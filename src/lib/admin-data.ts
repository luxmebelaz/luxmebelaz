import 'server-only';

import type { Product } from '@/lib/data/types';
import { compareProducts, mapProduct, PRODUCT_COLUMNS, type ProductRow } from '@/lib/catalog';
import { getAdminSupabase } from '@/lib/supabase/admin';
import type { OrderItem } from '@/lib/db';
import { isOrderStatus, type OrderStatus } from '@/lib/order-status';

// Admin panel üçün keşsiz (həmişə təzə) oxuma — service role ilə
export async function listProductsFresh(): Promise<{ products: Product[]; error?: string }> {
  const db = getAdminSupabase();
  if (!db) return { products: [], error: 'SUPABASE_SERVICE_ROLE_KEY təyin olunmayıb — Vercel mühit dəyişənlərini yoxlayın.' };
  const { data, error } = await db.from('products').select(PRODUCT_COLUMNS);
  if (error) return { products: [], error: `Məhsullar oxunmadı: ${error.message}. supabase/catalog.sql işlədilibmi?` };
  return { products: (data as ProductRow[]).map(mapProduct).sort(compareProducts) };
}

export async function getProductFresh(slug: string): Promise<Product | null> {
  const db = getAdminSupabase();
  if (!db) return null;
  const { data } = await db.from('products').select(PRODUCT_COLUMNS).eq('slug', slug).maybeSingle();
  return data ? mapProduct(data as ProductRow) : null;
}

export type AdminOrder = {
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; at: string; by?: string; note?: string }[];
  customer: { name: string; phone: string; email: string | null; city: string; address: string };
  note: string | null;
  payment: string;
  paymentStatus: string | null;
  total: number;
  items: OrderItem[];
  location: { lat: number; lng: number } | null;
  userId: string | null;
};

type OrderRow = Record<string, unknown>;

function mapOrder(r: OrderRow): AdminOrder {
  const lat = r.location_lat == null ? null : Number(r.location_lat);
  const lng = r.location_lng == null ? null : Number(r.location_lng);
  return {
    orderNumber: String(r.order_number),
    createdAt: String(r.created_at),
    status: isOrderStatus(r.status) ? r.status : 'new',
    statusHistory: Array.isArray(r.status_history) ? (r.status_history as AdminOrder['statusHistory']) : [],
    customer: {
      name: String(r.customer_name ?? ''),
      phone: String(r.phone ?? ''),
      email: (r.email as string | null) ?? null,
      city: String(r.city ?? ''),
      address: String(r.address ?? ''),
    },
    note: (r.note as string | null) ?? null,
    payment: String(r.payment ?? ''),
    paymentStatus: (r.payment_status as string | null) ?? null,
    total: Number(r.total),
    items: Array.isArray(r.items) ? (r.items as OrderItem[]) : [],
    location: lat != null && lng != null && Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null,
    userId: (r.user_id as string | null) ?? null,
  };
}

export async function listOrdersFresh(status?: OrderStatus): Promise<{ orders: AdminOrder[]; counts: Record<string, number>; error?: string }> {
  const db = getAdminSupabase();
  if (!db) return { orders: [], counts: {}, error: 'SUPABASE_SERVICE_ROLE_KEY təyin olunmayıb.' };
  let query = db.from('orders').select('*').order('created_at', { ascending: false }).limit(300);
  if (status) query = query.eq('status', status);
  const [{ data, error }, { data: all }] = await Promise.all([query, db.from('orders').select('status').limit(5000)]);
  if (error) return { orders: [], counts: {}, error: `Sifarişlər oxunmadı: ${error.message}` };
  const counts: Record<string, number> = {};
  for (const r of (all ?? []) as { status: string }[]) counts[r.status] = (counts[r.status] ?? 0) + 1;
  return { orders: (data as OrderRow[]).map(mapOrder), counts };
}

export async function getOrderFresh(orderNumber: string): Promise<AdminOrder | null> {
  const db = getAdminSupabase();
  if (!db) return null;
  const { data } = await db.from('orders').select('*').eq('order_number', orderNumber).maybeSingle();
  return data ? mapOrder(data as OrderRow) : null;
}
