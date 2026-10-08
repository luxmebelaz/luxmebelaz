// Məlumat əldə etmə qatı. Hazırda statik məlumatlardan oxuyur.
// Supabase qoşulanda yalnız bu faylın daxili hissəsi dəyişəcək, səhifələr eyni qalacaq.
import { categories } from '@/lib/data/categories';
import { products } from '@/lib/data/products';
import { posts } from '@/lib/data/posts';
import { faqs } from '@/lib/data/faqs';
import type { Category, Faq, Post, Product } from '@/lib/data/types';

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

export async function getPosts(): Promise<Post[]> {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return posts.find((p) => p.slug === slug);
}

export async function getFaqs(): Promise<Faq[]> {
  return faqs;
}
