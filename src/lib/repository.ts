import 'server-only';

// Məlumat əldə etmə qatı. Məhsullar Supabase "products" cədvəlindən oxunur (admin paneldən idarə olunur),
// kateqoriyalar və suallar src/lib/data/ altındakı sabit fayllardandır.
// Kataloq keşlənir; admin paneldə hər dəyişiklikdən sonra CATALOG_TAG yenilənir.
import { cacheLife, cacheTag } from 'next/cache';
import { categories } from '@/lib/data/categories';
import { faqs } from '@/lib/data/faqs';
import type { Category, Faq, Product } from '@/lib/data/types';
import { compareProducts, mapProduct, PRODUCT_COLUMNS, type ProductRow } from '@/lib/catalog';
import { getPublicSupabase } from '@/lib/supabase/public';

export const CATALOG_TAG = 'catalog';

async function getCatalog(): Promise<Product[]> {
  'use cache';
  cacheTag(CATALOG_TAG);
  cacheLife('hours');

  const supabase = getPublicSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase.from('products').select(PRODUCT_COLUMNS);
  if (error) {
    console.error('[catalog:error]', error.message);
    return [];
  }
  return (data as ProductRow[]).map(mapProduct).sort(compareProducts);
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return categories.find((c) => c.slug === slug);
}

export async function getProducts(category?: string): Promise<Product[]> {
  const products = await getCatalog();
  return category ? products.filter((p) => p.category === category) : products;
}

// Ana səhifənin "Məhsullarımız" bölməsi. Admin heç bir məhsulu seçməyibsə, ən son məhsullar göstərilir.
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await getCatalog();
  const featured = products.filter((p) => p.featured);
  return (featured.length > 0 ? featured : products).slice(0, limit);
}

// Ana səhifənin "Yeni gələnlər" bölməsi (yalnız admin paneldə işarələnənlər)
export async function getNewProducts(limit = 8): Promise<Product[]> {
  return (await getCatalog()).filter((p) => p.isNew).slice(0, limit);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getCatalog()).find((p) => p.slug === slug);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return (await getCatalog()).filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, limit);
}

// Kateqoriya kartının şəkli: həmin kateqoriyanın ilk məhsulunun şəkli
export async function getCategoryCovers(): Promise<Record<string, string>> {
  const covers: Record<string, string> = {};
  for (const p of await getCatalog()) {
    if (p.image && !covers[p.category]) covers[p.category] = p.image;
  }
  return covers;
}

export async function getFaqs(): Promise<Faq[]> {
  return faqs;
}

// Üst menyudakı axtarış üçün
export async function searchCatalog(query: string) {
  const q = query.trim().toLocaleLowerCase('az');
  const products = await getCatalog();
  const matchedProducts = products
    .filter((p) => p.name.toLocaleLowerCase('az').includes(q) || p.summary.toLocaleLowerCase('az').includes(q))
    .slice(0, 8)
    .map((p) => ({
      slug: p.slug,
      name: p.name,
      price: p.price,
      image: p.image,
      categoryName: categories.find((c) => c.slug === p.category)?.name ?? '',
    }));
  const matchedCategories = categories
    .filter((c) => c.name.toLocaleLowerCase('az').includes(q))
    .map((c) => ({ slug: c.slug, name: c.name }));
  return { products: matchedProducts, categories: matchedCategories };
}
