import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import PageSkeleton from '@/components/PageSkeleton';
import { ArrowLeft } from 'lucide-react';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import { getPost, getPosts } from '@/lib/repository';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/bloq/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: 'article', publishedTime: post.date, images: [post.image] },
  };
}

async function PostPageContent({ params }: { params: PageProps<'/bloq/[slug]'>['params'] }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const others = (await getPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${post.category} · ${post.dateLabel} · ${post.readMinutes} dəq oxu`}
        title={post.title}
        crumbs={[{ label: 'Bloq', href: '/bloq' }, { label: post.title }]}
      />
      <PageSection narrow>
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-[#b5aba0] mb-10 shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
          <Image src={post.image} alt={post.imageAlt} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </div>

        <p className="text-xl text-neutral-800 leading-relaxed mb-8 font-medium">{post.excerpt}</p>

        <div className="flex flex-col gap-8">
          {post.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-3xl md:text-4xl uppercase mb-3">{s.heading}</h2>
              {s.paragraphs.map((para) => (
                <p key={para} className="text-neutral-800 text-[17px] leading-[1.75] mb-4 last:mb-0">{para}</p>
              ))}
            </section>
          ))}
        </div>

        <Link href="/bloq" className="inline-flex items-center gap-2 mt-12 text-sm font-bold underline underline-offset-4">
          <ArrowLeft className="w-4 h-4" /> Bütün məqalələr
        </Link>
      </PageSection>

      {others.length > 0 && (
        <PageSection className="pt-0">
          <h2 className="font-display text-4xl uppercase mb-6">Digər məqalələr</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/bloq/${o.slug}`} className="glass-light block h-full rounded-3xl p-6 hover:brightness-105 transition">
                  <p className="text-[11px] font-bold tracking-wider uppercase text-neutral-600 mb-3">{o.category} · {o.dateLabel}</p>
                  <p className="font-semibold text-lg leading-snug">{o.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </PageSection>
      )}
    </>
  );
}

export default function PostPage(props: PageProps<'/bloq/[slug]'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PostPageContent params={props.params} />
    </Suspense>
  );
}
