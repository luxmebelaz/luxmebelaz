import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin', '/sebet', '/sifaris', '/sifaris-izle', '/odenis', '/hesab', '/giris', '/qeydiyyat', '/auth/', '/sifremi-unutdum', '/sifre-yenile'] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
