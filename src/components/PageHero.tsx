'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

type Crumb = { label: string; href?: string };

// Daxili səhifələrin başlıq bloku (sabit menyunun altında qalmasın deyə yuxarıdan boşluq var)
export default function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-paper text-black pt-32 md:pt-40 pb-8 md:pb-12 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        className="max-w-6xl mx-auto"
      >
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Səhifə yolu" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-600">
              <li>
                <Link href="/" className="hover:text-black transition-colors">Ana səhifə</Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-black transition-colors">{c.label}</Link>
                  ) : (
                    <span className="text-black font-medium" aria-current="page">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3 text-neutral-800">{eyebrow}</p>
        )}
        <h1 className="font-display text-[42px] sm:text-6xl md:text-7xl uppercase leading-[1.05]">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-neutral-700 text-base md:text-lg leading-relaxed">{description}</p>
        )}
        {children}
      </motion.div>
    </section>
  );
}
