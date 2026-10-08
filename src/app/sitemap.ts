import type { MetadataRoute } from 'next';
import { getCategories, getProducts } from '@/lib/repository';
import { site } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const staticPaths = ['', '/magaza', '/kateqoriyalar', '/haqqimizda', '/elaqe', '/suallar', '/catdirilma', '/zemanet', '/mexfilik', '/sertler'];

  return [
    ...staticPaths.map((p) => ({ url: `${site.url}${p}` })),
    ...categories.map((c) => ({ url: `${site.url}/kateqoriyalar/${c.slug}` })),
    ...products.map((p) => ({ url: `${site.url}/magaza/${p.slug}` })),
  ];
}
