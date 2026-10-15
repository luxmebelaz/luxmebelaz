import type { Product, ProductColor } from '@/lib/data/types';

// Supabase "products" cədvəlinin sətri (supabase/schema.sql + supabase/catalog.sql)
export type ProductRow = {
  slug: string;
  code?: string | null;
  name: string;
  category: string;
  price: number | string;
  summary: string | null;
  description: string | null;
  image: string | null;
  images: string[] | null;
  image_alt: string | null;
  features: string[] | null;
  specs: { label: string; value: string }[] | null;
  sizes?: string[] | null;
  colors?: ProductColor[] | null;
  in_stock: boolean;
  featured: boolean;
  is_new: boolean | null;
  sort_order: number | null;
  created_at: string;
};

// "*" — SQL miqrasiyası (supabase/orders.sql) hələ işlədilməyibsə də, kataloq oxunmağa davam edir
export const PRODUCT_COLUMNS = '*';

export function mapProduct(row: ProductRow): Product {
  const images = (row.images ?? []).filter(Boolean);
  if (images.length === 0 && row.image) images.push(row.image);
  return {
    slug: row.slug,
    code: row.code ?? '',
    name: row.name,
    category: row.category,
    price: Number(row.price),
    summary: row.summary ?? '',
    description: row.description ?? '',
    image: images[0] ?? '',
    images,
    imageAlt: row.image_alt || row.name,
    features: row.features ?? [],
    specs: Array.isArray(row.specs) ? row.specs : [],
    sizes: Array.isArray(row.sizes) ? row.sizes.filter(Boolean) : [],
    colors: Array.isArray(row.colors) ? row.colors.filter((c) => c && typeof c.name === 'string' && c.name) : [],
    inStock: row.in_stock,
    featured: row.featured,
    isNew: row.is_new ?? false,
    sortOrder: row.sort_order ?? 0,
    createdAt: row.created_at,
  };
}

// Sıra: əvvəl "sort_order" (kiçik rəqəm öndə), sonra ən yenilər
export function compareProducts(a: Product, b: Product): number {
  return a.sortOrder - b.sortOrder || b.createdAt.localeCompare(a.createdAt);
}

const AZ_MAP: Record<string, string> = { ə: 'e', ı: 'i', i̇: 'i', ö: 'o', ü: 'u', ş: 's', ç: 'c', ğ: 'g' };

// "Künc Divan Moderna" -> "kunc-divan-moderna"
export function slugify(value: string): string {
  return value
    .toLocaleLowerCase('az')
    .replace(/[əıöüşçğ]|i̇/g, (ch) => AZ_MAP[ch] ?? ch)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

// Müştəri üçün 6 rəqəmli nömrə (sifariş və məhsul kodu): 100000–999999
export function sixDigits(): string {
  const n = new Uint32Array(1);
  crypto.getRandomValues(n);
  return String(100000 + (n[0] % 900000));
}

// Seçimlər üçün oxunaqlı etiket: "Boz · 220×95 sm"
export function optionLabel(o: { color?: string; size?: string }): string {
  return [o.color, o.size].filter(Boolean).join(' · ');
}
