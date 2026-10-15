import 'server-only';

import type { Product } from '@/lib/data/types';
import { compareProducts, mapProduct, PRODUCT_COLUMNS, type ProductRow } from '@/lib/catalog';
import { getAdminSupabase } from '@/lib/supabase/admin';

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
