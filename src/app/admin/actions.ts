'use server';

import { updateTag } from 'next/cache';
import { getAdminUser } from '@/lib/admin';
import { slugify } from '@/lib/catalog';
import { categories } from '@/lib/data/categories';
import { CATALOG_TAG } from '@/lib/repository';
import { getAdminSupabase } from '@/lib/supabase/admin';

export type ProductInput = {
  name: string;
  category: string;
  price: number;
  summary: string;
  description: string;
  images: string[];
  imageAlt: string;
  features: string[];
  specs: { label: string; value: string }[];
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  sortOrder: number;
};

export type ActionResult = { ok: true; slug?: string } | { ok: false; error: string };

const NOT_ADMIN: ActionResult = { ok: false, error: 'Sessiyanın vaxtı bitib və ya icazəniz yoxdur. Yenidən daxil olun.' };
const NO_DB: ActionResult = { ok: false, error: 'Verilənlər bazası qoşulmayıb (SUPABASE_SERVICE_ROLE_KEY yoxdur).' };

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const isImageUrl = (v: unknown): v is string => typeof v === 'string' && /^https:\/\/i\.ibb\.co\/[^\s"'<>]+$/.test(v);

function validate(input: ProductInput): { error: string } | { row: Record<string, unknown> } {
  const name = str(input.name, 120);
  if (name.length < 2) return { error: 'Məhsulun adını yazın.' };
  if (!categories.some((c) => c.slug === input.category)) return { error: 'Kateqoriya seçin.' };
  const price = Number(input.price);
  if (!Number.isFinite(price) || price < 0 || price > 10_000_000) return { error: 'Qiyməti düzgün yazın.' };

  const images = Array.isArray(input.images) ? input.images.filter(isImageUrl).slice(0, 12) : [];
  if (images.length === 0) return { error: 'Ən azı bir şəkil yükləyin.' };

  const features = (Array.isArray(input.features) ? input.features : [])
    .map((f) => str(f, 160))
    .filter(Boolean)
    .slice(0, 20);
  const specs = (Array.isArray(input.specs) ? input.specs : [])
    .map((s) => ({ label: str(s?.label, 60), value: str(s?.value, 160) }))
    .filter((s) => s.label && s.value)
    .slice(0, 20);
  const sortOrder = Number.isInteger(Number(input.sortOrder)) ? Math.max(-9999, Math.min(9999, Number(input.sortOrder))) : 0;

  return {
    row: {
      name,
      category: input.category,
      price: Math.round(price * 100) / 100,
      summary: str(input.summary, 220),
      description: str(input.description, 5000),
      image: images[0],
      images,
      image_alt: str(input.imageAlt, 160) || name,
      features,
      specs,
      in_stock: Boolean(input.inStock),
      featured: Boolean(input.featured),
      is_new: Boolean(input.isNew),
      sort_order: sortOrder,
      updated_at: new Date().toISOString(),
    },
  };
}

// Yeni məhsul (originalSlug yoxdur) və ya mövcud məhsulun redaktəsi
export async function saveProduct(input: ProductInput, originalSlug?: string): Promise<ActionResult> {
  if (!(await getAdminUser())) return NOT_ADMIN;
  const db = getAdminSupabase();
  if (!db) return NO_DB;

  const result = validate(input);
  if ('error' in result) return { ok: false, error: result.error };

  if (originalSlug) {
    const { error } = await db.from('products').update(result.row).eq('slug', originalSlug);
    if (error) return { ok: false, error: `Yadda saxlanmadı: ${error.message}` };
    updateTag(CATALOG_TAG);
    return { ok: true, slug: originalSlug };
  }

  // Unikal slug: "divan", "divan-2", "divan-3" ...
  const base = slugify(String(result.row.name)) || 'mehsul';
  const { data: existing, error: lookupError } = await db.from('products').select('slug').like('slug', `${base}%`);
  if (lookupError) return { ok: false, error: `Yadda saxlanmadı: ${lookupError.message}` };
  const taken = new Set((existing ?? []).map((r: { slug: string }) => r.slug));
  let slug = base;
  for (let i = 2; taken.has(slug); i++) slug = `${base}-${i}`;

  const { error } = await db.from('products').insert({ ...result.row, slug });
  if (error) return { ok: false, error: `Yadda saxlanmadı: ${error.message}` };
  updateTag(CATALOG_TAG);
  return { ok: true, slug };
}

export async function deleteProduct(slug: string): Promise<ActionResult> {
  if (!(await getAdminUser())) return NOT_ADMIN;
  const db = getAdminSupabase();
  if (!db) return NO_DB;
  const { error } = await db.from('products').delete().eq('slug', slug);
  if (error) return { ok: false, error: `Silinmədi: ${error.message}` };
  updateTag(CATALOG_TAG);
  return { ok: true };
}

const FLAGS = { featured: 'featured', isNew: 'is_new', inStock: 'in_stock' } as const;

// Siyahıdan bir kliklə: ana səhifədə göstər / yeni gələnlər / stok vəziyyəti
export async function setProductFlag(slug: string, flag: keyof typeof FLAGS, value: boolean): Promise<ActionResult> {
  if (!(await getAdminUser())) return NOT_ADMIN;
  if (!(flag in FLAGS)) return { ok: false, error: 'Yanlış sahə.' };
  const db = getAdminSupabase();
  if (!db) return NO_DB;
  const { error } = await db
    .from('products')
    .update({ [FLAGS[flag]]: Boolean(value), updated_at: new Date().toISOString() })
    .eq('slug', slug);
  if (error) return { ok: false, error: `Dəyişmədi: ${error.message}` };
  updateTag(CATALOG_TAG);
  return { ok: true };
}
