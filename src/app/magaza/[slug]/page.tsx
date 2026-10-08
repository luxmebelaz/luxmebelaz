import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import PageSkeleton from '@/components/PageSkeleton';
import { Check, Phone, Truck, ShieldCheck } from 'lucide-react';
import PageSection from '@/components/PageSection';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';
import { formatPrice } from '@/lib/format';
import { getCategory, getProduct, getProducts, getRelatedProducts } from '@/lib/repository';
import { site } from '@/lib/site';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/magaza/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} — ${product.summary}. Qiymət: ${formatPrice(product.price)}.`,
    openGraph: { images: [product.image] },
  };
}

async function ProductPageContent({ params }: { params: PageProps<'/magaza/[slug]'>['params'] }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [category, related] = await Promise.all([getCategory(product.category), getRelatedProducts(product)]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { '@type': 'Brand', name: site.name },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AZN',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${site.url}/magaza/${product.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="bg-paper text-black pt-32 md:pt-40 pb-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Səhifə yolu" className="mb-6 text-sm text-neutral-600">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-black">Ana səhifə</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/magaza" className="hover:text-black">Mağaza</Link></li>
              {category && (
                <>
                  <li aria-hidden="true">/</li>
                  <li><Link href={`/kateqoriyalar/${category.slug}`} className="hover:text-black">{category.name}</Link></li>
                </>
              )}
              <li aria-hidden="true">/</li>
              <li className="text-black font-medium" aria-current="page">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div className="relative aspect-[4/4.4] rounded-3xl overflow-hidden bg-[#b5aba0] shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
              <Image src={product.image} alt={product.imageAlt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>

            <div>
              {category && (
                <Link href={`/kateqoriyalar/${category.slug}`} className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-neutral-700 hover:text-black mb-3">
                  {category.name}
                </Link>
              )}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase leading-[1.05] mb-4">{product.name}</h1>
              <p className="text-neutral-700 text-lg mb-6">{product.summary}</p>

              <p className="text-4xl font-extrabold mb-1">{formatPrice(product.price)}</p>
              <p className={`text-sm font-semibold mb-7 ${product.inStock ? 'text-emerald-800' : 'text-red-700'}`}>
                {product.inStock ? 'Stokda var' : 'Stokda yoxdur'}
              </p>

              <AddToCartButton product={product} variant="full" />

              <a href={site.phoneHref} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-black">
                <Phone className="w-4 h-4" /> Sual var? Zəng edin: {site.phone}
              </a>

              <p className="text-neutral-800 leading-relaxed mt-8 mb-6">{product.description}</p>

              <ul className="flex flex-col gap-2.5 mb-8">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px]">
                    <Check className="w-5 h-5 shrink-0 mt-0.5 text-neutral-900" /> {f}
                  </li>
                ))}
              </ul>

              <dl className="glass-light rounded-3xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {product.specs.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">{s.label}</dt>
                    <dd className="font-semibold text-[15px]">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                <Link href="/catdirilma" className="flex items-center gap-3 rounded-2xl bg-white/35 border border-white/50 p-4 text-sm font-semibold hover:bg-white/60 transition-colors">
                  <Truck className="w-5 h-5 shrink-0" /> Çatdırılma və quraşdırma
                </Link>
                <Link href="/zemanet" className="flex items-center gap-3 rounded-2xl bg-white/35 border border-white/50 p-4 text-sm font-semibold hover:bg-white/60 transition-colors">
                  <ShieldCheck className="w-5 h-5 shrink-0" /> Zəmanət şərtləri
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <PageSection className="pt-6">
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-8">Bənzər məhsullar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </PageSection>
      )}
    </>
  );
}

export default function ProductPage(props: PageProps<'/magaza/[slug]'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProductPageContent params={props.params} />
    </Suspense>
  );
}
