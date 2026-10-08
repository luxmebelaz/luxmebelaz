import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import { getCategories, getProducts } from '@/lib/repository';

export const metadata: Metadata = {
  title: 'Kateqoriyalar',
  description: 'Divanlar, yataq otağı, kreslolar, masalar və şkaflar — LuxMebel kateqoriyaları.',
};

export default async function CategoriesPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <>
      <PageHero
        eyebrow="Kataloq"
        title="Kateqoriyalar"
        description="Mebel növünə görə kolleksiyamızı kəşf edin."
        crumbs={[{ label: 'Kateqoriyalar' }]}
      />
      <PageSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {categories.map((c) => {
            const count = products.filter((p) => p.category === c.slug).length;
            return (
              <Link
                key={c.slug}
                href={`/kateqoriyalar/${c.slug}`}
                className="group relative block rounded-3xl overflow-hidden aspect-[4/4.2] bg-[#222] shadow-[0_18px_40px_rgba(0,0,0,0.3)]"
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#e4d093] mb-2">{count} məhsul</p>
                  <h2 className="font-display text-4xl uppercase leading-none mb-2">{c.name}</h2>
                  <p className="text-sm text-neutral-300 mb-4">{c.tagline}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                    Bax <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </PageSection>
    </>
  );
}
