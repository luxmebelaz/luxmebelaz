import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import { getPosts } from '@/lib/repository';

export const metadata: Metadata = {
  title: 'Bloq',
  description: 'Mebel seçimi, interyer dizaynı və evə qulluq barədə faydalı məqalələr və ilham.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        eyebrow="Fikirlər və İlham"
        title="Bloq"
        description="Mebel seçimi, interyer üslubları və məkana qulluq barədə praktik məsləhətlər."
        crumbs={[{ label: 'Bloq' }]}
      />
      <PageSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="glass-light group rounded-3xl overflow-hidden flex flex-col">
              <Link href={`/bloq/${post.slug}`} className="relative block h-60 overflow-hidden bg-[#b5aba0]" aria-label={post.title}>
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </Link>
              <div className="p-6 sm:p-7 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider uppercase text-neutral-600 mb-3">
                  <span>{post.category}</span>
                  <span className="w-1 h-1 bg-neutral-500 rounded-full" />
                  <time dateTime={post.date}>{post.dateLabel}</time>
                </div>
                <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.01em] mb-3">
                  <Link href={`/bloq/${post.slug}`} className="hover:underline underline-offset-4">{post.title}</Link>
                </h2>
                <p className="text-neutral-600 text-[15px] leading-relaxed mb-6 flex-1">{post.excerpt}</p>
                <Link href={`/bloq/${post.slug}`} className="self-start bg-[#111] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors">
                  Məqaləni Oxu
                </Link>
              </div>
            </article>
          ))}
        </div>
      </PageSection>
    </>
  );
}
