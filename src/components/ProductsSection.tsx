"use client";

import React from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    title: 'Minimalist Divan',
    desc: 'Yüksək keyfiyyətli parça, fıstıq ağacından ayaqlar',
    price: '₼ 1,800',
    bgColor: 'bg-[#dcd8d3]'
  },
  {
    title: 'Klassik Masa',
    desc: 'Təbii palıd ağacı, premium örtük',
    price: '₼ 1,400',
    bgColor: 'bg-[#b0aba3]'
  },
  {
    title: 'Lüks Kreslo',
    desc: 'Erqonomik dizayn, təbii dəri',
    price: '₼ 850',
    bgColor: 'bg-[#dfcbb3]'
  },
  {
    title: 'Modul Şkaf',
    desc: 'Geniş həcmli, modern fasad',
    price: '₼ 2,450',
    bgColor: 'bg-[#edeae5]'
  }
];

export default function ProductsSection() {
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
      transition: { duration: 0.6,  } 
    }
  };

  return (
    <section className="bg-[#e4e1dc] text-black pt-0 pb-32">
      {/* Marquee Banner */}
      <div className="bg-[#e0ca94] py-3 overflow-hidden border-y border-black/10 whitespace-nowrap flex relative">
        <div className="animate-marquee flex gap-8 text-xs font-semibold tracking-widest uppercase">
          <span>Yüksək Keyfiyyət</span> <span>•</span> 
          <span>Eksklüziv Dizayn</span> <span>•</span> 
          <span>Zəmanət</span> <span>•</span> 
          <span>Rahat Çatdırılma</span> <span>•</span> 
          <span>Hər evə uyğun mebellər.</span> <span>•</span> 
          <span>Modern və klassik üslubun vəhdəti.</span> <span>•</span>
          {/* Repeat to ensure seamless scrolling */}
          <span>Yüksək Keyfiyyət</span> <span>•</span> 
          <span>Eksklüziv Dizayn</span> <span>•</span> 
          <span>Zəmanət</span> <span>•</span> 
          <span>Rahat Çatdırılma</span> <span>•</span> 
          <span>Hər evə uyğun mebellər.</span> <span>•</span> 
          <span>Modern və klassik üslubun vəhdəti.</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12"
        >
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4">Mebel Kolleksiyası</h4>
            <h2 className="text-6xl font-bold tracking-tighter uppercase leading-none">Məhsullarımız</h2>
          </div>
          <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Bütün Kolleksiyaya Bax &rarr;
          </a>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="flex flex-col h-[500px] rounded-3xl overflow-hidden shadow-[inset_0_2px_15px_rgba(255,255,255,0.6),0_15px_35px_rgba(0,0,0,0.15)] group relative cursor-pointer"
            >
              <div className="absolute inset-0 rounded-3xl border-[0.5px] border-white/40 pointer-events-none z-20"></div>
              <div className={`h-[55%] ${product.bgColor} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent mix-blend-overlay"></div>
                <div className="absolute inset-0 flex items-center justify-center text-black/10 font-bold text-2xl transition-transform duration-700 group-hover:scale-110">
                  Şəkil
                </div>
              </div>
              <div className="h-[45%] bg-[#0a0a0a] text-white p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-medium mb-3 leading-tight group-hover:text-[#e0ca94] transition-colors duration-300">{product.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{product.desc}</p>
                </div>
                <div className="relative z-10">
                  <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Qiymət</span>
                  <span className="text-xl font-bold">{product.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
