"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Clock } from 'lucide-react';
import type { Faq } from '@/lib/data/types';
import { motion } from 'framer-motion';

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  return (
    <section id="suallar" className="bg-paper text-black pt-20 pb-20 px-6 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-8">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex-1 md:pr-16"
        >
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-neutral-800">
            Bilməyiniz Faydalıdır
          </h4>
          <p className="font-display text-[40px] sm:text-6xl md:text-7xl uppercase leading-none mb-12">
            Suallar
          </p>
          <h2 className="text-4xl md:text-5xl font-normal tracking-[-0.03em] leading-[1.05] mb-8">
            Mebellərimiz, sifariş və çatdırılma haqqında hər şey.
          </h2>
          <p className="text-neutral-600 mb-8 max-w-md leading-relaxed">
            Mebel seçimi, ölçülər və ya materiallarla bağlı suallarınız var? Bizə yazın, komandamız dərhal köməklik göstərsin.
          </p>
          <div className="flex items-center gap-2 text-xs tracking-wider text-neutral-600 uppercase">
            <Clock className="w-4 h-4" />
            <span>Studio 1 iş günü ərzində cavablandırır</span>
          </div>
          <Link href="/suallar" className="inline-block mt-8 text-sm font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity">
            Bütün suallara bax &rarr;
          </Link>
        </motion.div>

        {/* Right Side - Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex-1 flex flex-col gap-3 md:pt-28"
        >
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white/35 border border-white/40 rounded-2xl hover:bg-white/50 transition-colors"
              >
                <button
                  type="button"
                  id={`faq-q-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${index}`}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="w-full p-6 flex justify-between items-center gap-4 text-left cursor-pointer"
                >
                  <span className="font-medium text-neutral-900">{faq.q}</span>
                  <Plus
                    className={`w-5 h-5 shrink-0 text-neutral-700 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  />
                </button>
                <div
                  id={`faq-a-${index}`}
                  role="region"
                  aria-labelledby={`faq-q-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-neutral-600 text-[15px] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
