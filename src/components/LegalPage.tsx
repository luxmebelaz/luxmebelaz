import React from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import { site } from '@/lib/site';

export type LegalSection = { heading: string; paragraphs?: string[]; list?: string[] };

// Mətn xarakterli səhifələr üçün ortaq şablon
export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={intro} crumbs={[{ label: title }]} />
      <PageSection narrow>
        <div className="flex flex-col gap-9">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="text-2xl font-bold mb-3">{i + 1}. {s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="text-neutral-800 leading-[1.75] mb-3">{p}</p>
              ))}
              {s.list && (
                <ul className="list-disc pl-6 flex flex-col gap-2 text-neutral-800 leading-relaxed">
                  {s.list.map((li) => <li key={li}>{li}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>
        <div className="glass-light rounded-3xl p-6 mt-12">
          <p className="font-bold mb-1">Sualınız var?</p>
          <p className="text-neutral-700 text-[15px]">
            Bizimlə əlaqə saxlayın: <a href={site.phoneHref} className="font-semibold underline">{site.phone}</a>,{' '}
            <a href={site.emailHref} className="font-semibold underline">{site.email}</a> və ya{' '}
            <Link href="/elaqe" className="font-semibold underline">əlaqə səhifəsi</Link>.
          </p>
        </div>
      </PageSection>
    </>
  );
}
