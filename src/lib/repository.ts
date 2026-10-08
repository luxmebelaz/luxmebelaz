// Məlumat əldə etmə qatı. Hazırda statik məlumatlardan oxuyur.
// Supabase qoşulanda yalnız bu faylın daxili hissəsi dəyişəcək, səhifələr eyni qalacaq.
import { categories } from '@/lib/data/categories';
import { products } from '@/lib/data/products';
import { faqs } from '@/lib/data/faqs';
import type { Category, Faq, Product } from '@/lib/data/types';

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return categories.find((c) => c.slug === slug);
}

export async function getProducts(category?: string): Promise<Product[]> {
  return category ? products.filter((p) => p.category === category) : products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((p) => p.featured);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, limit);
}

export async function getFaqs(): Promise<Faq[]> {
  return faqs;
}

// Üst menyudakı axtarış üçün. Supabase-də ilike/full-text sorğusu ilə əvəz oluna bilər.
export async function searchCatalog(query: string) {
  const q = query.trim().toLocaleLowerCase('az');
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
