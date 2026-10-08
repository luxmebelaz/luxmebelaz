import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import PageSkeleton from '@/components/PageSkeleton';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import ProductCard from '@/components/ProductCard';
import { getCategories, getCategory, getProducts } from '@/lib/repository';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<'/kateqoriyalar/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  return { title: category.name, description: category.description };
}

async function CategoryPageContent({ params }: { params: PageProps<'/kateqoriyalar/[slug]'>['params'] }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const [products, categories] = await Promise.all([getProducts(slug), getCategories()]);

  return (
    <>
      <PageHero
        eyebrow={category.tagline}
        title={category.name}
        description={category.description}
        crumbs={[{ label: 'Kateqoriyalar', href: '/kateqoriyalar' }, { label: category.name }]}
      />
      <PageSection>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap mb-8">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/kateqoriyalar/${c.slug}`}
              aria-current={c.slug === slug ? 'page' : undefined}
              className={`px-4 h-10 inline-flex items-center rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                c.slug === slug ? 'bg-[#111] text-white' : 'bg-white/40 border border-white/60 text-neutral-800 hover:bg-white/70'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <p className="glass-light rounded-3xl p-10 text-center text-neutral-700">Bu kateqoriyada hələ məhsul yoxdur.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </PageSection>
    </>
  );
}

export default function CategoryPage(props: PageProps<'/kateqoriyalar/[slug]'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CategoryPageContent params={props.params} />
    </Suspense>
  );
}
