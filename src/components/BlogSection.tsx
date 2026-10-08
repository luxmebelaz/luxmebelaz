"use client";

import React from 'react';
import { motion } from 'framer-motion';

const articles = [
  {
    category: 'Mebel Bələdçisi',
    date: '31 İyul 2026',
    title: 'Qonaq Otağı Üçün Divan Seçimi: İdeal Formanı Necə Tapmalı?',
    desc: 'Ölçü, parça növü və rəng uyğunluğu — evinizin ab-havasını dəyişdirəcək üç vacib addım.',
  },
  {
    category: 'İnteryer Dizayn',
    date: '29 İyul 2026',
    title: 'Modern və Klassik Üslub: Fərqlər və Uyğunluqlar',
    desc: 'Məkanınızı necə tərzə uyğunlaşdırmaq olar — praktik bələdçi və məsləhətlər...',
  },
  {
    category: 'Stil və Dekor',
    date: '26 İyul 2026',
    title: 'Evinizə Təbiilik Qatın: Taxta Mebellərin Üstünlükləri',
    desc: 'Təbii materialların interyerdə yaratdığı isti və rahat mühit barədə bilmədikləriniz.',
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
      transition: { duration: 0.6, ease: "easeOut" as any } 
    }
  };

  return (
    <section className="bg-[#dcd8d3] text-black pb-32 px-8 md:px-16 border-t border-black/5">
      <div className="max-w-7xl mx-auto pt-32">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16"
        >
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-gray-500">
              Fikirlər və İlham
            </h4>
            <h2 className="text-6xl font-bold tracking-tighter uppercase leading-none">
              Bloqdan Yeniliklər
            </h2>
          </div>
          <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity mt-6 md:mt-0">
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
              className="bg-[#e8e6e1] rounded-3xl p-3 shadow-[inset_0_2px_10px_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.05)] border border-white/50 flex flex-col group cursor-pointer"
            >
              <div className="h-64 bg-[#b5aba0] rounded-2xl mb-6 relative overflow-hidden">
                 <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                 <div className="absolute inset-0 flex items-center justify-center text-black/10 font-bold text-2xl transition-transform duration-700 group-hover:scale-110">Şəkil</div>
              </div>
              <div className="px-5 pb-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-gray-500 mb-4">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-2xl font-medium mb-3 leading-tight text-gray-900 group-hover:text-black transition-colors">{article.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{article.desc}</p>
                <div className="w-full h-[1px] bg-black/10 mb-6"></div>
                <button className="bg-[#1f1d1e] text-white self-start px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors group-hover:bg-black group-hover:shadow-md">
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
