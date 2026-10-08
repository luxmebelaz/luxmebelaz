"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { images } from '@/lib/images';

const products = [
  {
    title: 'Minimalist Divan',
    desc: 'Yüksək keyfiyyətli parça, fıstıq ağacından ayaqlar',
    price: '₼ 1,800',
    bgColor: 'bg-[#dcd8d3]',
    image: images.products.sofa,
    alt: 'Yaşıl məxmər divan'
  },
  {
    title: 'Klassik Masa',
    desc: 'Təbii palıd ağacı, premium örtük',
    price: '₼ 1,400',
    bgColor: 'bg-[#b0aba3]',
    image: images.products.table,
    alt: 'Ağ klassik masa və stul'
  },
  {
    title: 'Lüks Kreslo',
    desc: 'Erqonomik dizayn, təbii dəri',
    price: '₼ 850',
    bgColor: 'bg-[#dfcbb3]',
    image: images.products.armchair,
    alt: 'Sarı kreslo'
  },
  {
    title: 'Modul Şkaf',
    desc: 'Geniş həcmli, modern fasad',
    price: '₼ 2,450',
    bgColor: 'bg-[#edeae5]',
    image: images.products.cabinet,
    alt: 'Taxta modul şkaf'
  }
];

const marqueeItems = [
  'Yüksək Keyfiyyət',
  'Eksklüziv Dizayn',
  'Zəmanət',
  'Rahat Çatdırılma',
  'Hər evə uyğun mebellər.',
  'Modern və klassik üslubun vəhdəti.',
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
    <section id="magaza" className="bg-paper text-black pt-0 pb-32">
      {/* Marquee Banner */}
      <div className="bg-gradient-to-b from-[#ecdca8] to-[#d9c47f] py-3 overflow-hidden border-y border-black/15 whitespace-nowrap flex relative shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
        <div className="animate-marquee flex w-max text-xs font-semibold tracking-widest uppercase">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 min-w-[100vw] justify-around items-center gap-8 pr-8" aria-hidden={copy === 1}>
              {marqueeItems.map((item) => (
                <React.Fragment key={item}>
                  <span>{item}</span>
                  <span>•</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4 sm:flex-row justify-between sm:items-end mb-12"
        >
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-3">Mebel Kolleksiyası</h4>
            <h2 className="font-display text-6xl md:text-7xl uppercase leading-none">Məhsullarımız</h2>
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
              className="flex flex-col h-[520px] rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(0,0,0,0.3)] group relative cursor-pointer"
            >
              <div className="absolute inset-0 rounded-3xl border-[0.5px] border-white/40 pointer-events-none z-20"></div>
              <div className={`h-[55%] ${product.bgColor} relative overflow-hidden`}>
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="h-[45%] bg-[#0a0a0a] text-white p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="relative z-10">
                  <h3 className="text-[26px] font-normal tracking-[-0.02em] mb-3 leading-[1.1] group-hover:text-[#e0ca94] transition-colors duration-300">{product.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{product.desc}</p>
                </div>
                <div className="relative z-10">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.2em] block mb-1">Qiymət</span>
                  <span className="text-2xl font-semibold">{product.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
