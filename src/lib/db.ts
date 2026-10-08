import 'server-only';

// SERVER TƏRƏFİ SAXLAMA QATI.
// Hazırda məlumat bazası qoşulmayıb: müraciətlər yalnız server jurnalına (Vercel → Logs) yazılır.
// Supabase qoşulanda aşağıdakı iki funksiyanın içi supabase.from('inquiries'|'orders').insert(...)
// ilə əvəz olunmalıdır. API marşrutları dəyişməyəcək.

export type Inquiry = {
  name: string;
  phone: string;
  space?: string;
  message: string;
};

export type OrderRecord = {
  orderNumber: string;
  customer: { name: string; phone: string; email?: string; city: string; address: string };
  items: { slug: string; name: string; qty: number; price: number }[];
  total: number;
  payment: string;
  note?: string;
};

export async function saveInquiry(inquiry: Inquiry): Promise<void> {
  console.log('[inquiry]', JSON.stringify({ ...inquiry, at: new Date().toISOString() }));
}

export async function saveOrder(order: OrderRecord): Promise<void> {
  console.log('[order]', JSON.stringify({ ...order, at: new Date().toISOString() }));
}
