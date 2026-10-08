"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { images } from '@/lib/images';

const articles = [
  {
    category: 'Mebel Bələdçisi',
    date: '31 İyul 2026',
    title: 'Qonaq Otağı Üçün Divan Seçimi: İdeal Formanı Necə Tapmalı?',
    desc: 'Ölçü, parça növü və rəng uyğunluğu — evinizin ab-havasını dəyişdirəcək üç vacib addım.',
    image: images.blog.sofa,
    alt: 'Qonaq otağında boz divan',
  },
  {
    category: 'İnteryer Dizayn',
    date: '29 İyul 2026',
    title: 'Modern və Klassik Üslub: Fərqlər və Uyğunluqlar',
    desc: 'Məkanınızı necə tərzə uyğunlaşdırmaq olar — praktik bələdçi və məsləhətlər...',
    image: images.blog.style,
    alt: 'Güzgülər və təbii tonlarla bəzədilmiş qonaq otağı',
  },
  {
    category: 'Stil və Dekor',
    date: '26 İyul 2026',
    title: 'Evinizə Təbiilik Qatın: Taxta Mebellərin Üstünlükləri',
    desc: 'Təbii materialların interyerdə yaratdığı isti və rahat mühit barədə bilmədikləriniz.',
    image: images.blog.wood,
    alt: 'İsti tonlu yataq otağı interyeri',
  }
];

export default function BlogSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" as const } 
    }
  };

  return (
    <section id="bloq" className="bg-paper text-black pb-28 px-6 md:px-8">
      <div className="max-w-6xl mx-auto pt-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between md:items-end mb-12"
        >
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-neutral-800">
              Fikirlər və İlham
            </h4>
            <h2 className="font-display text-6xl md:text-7xl uppercase leading-none">
              Bloqdan Yeniliklər
            </h2>
          </div>
          <a href="#bloq" className="text-sm font-medium hover:opacity-70 transition-opacity mt-6 md:mt-0">
            Bütün Məqalələr
          </a>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {articles.map((article, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-light rounded-3xl overflow-hidden flex flex-col group cursor-pointer"
            >
              <div className="h-64 bg-[#b5aba0] mb-6 relative overflow-hidden">
                 <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                 <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                   <Image
                     src={article.image}
                     alt={article.alt}
                     fill
                     sizes="(max-width: 768px) 100vw, 380px"
                     className="object-cover"
                   />
                 </div>
              </div>
              <div className="px-7 pb-7 flex-1 flex flex-col">
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-neutral-600 mb-4">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-[26px] font-normal tracking-[-0.02em] mb-3 leading-[1.15] text-neutral-900 group-hover:text-black transition-colors">{article.title}</h3>
                <p className="text-neutral-500 text-[15px] leading-relaxed mb-6 flex-1">{article.desc}</p>
                <div className="w-full h-[1px] bg-black/10 mb-6"></div>
                <button type="button" className="bg-[#111] text-white self-start px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors group-hover:bg-black group-hover:shadow-md">
                  Məqaləni Oxu
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
