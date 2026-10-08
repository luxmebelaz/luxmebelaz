"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gem, Trees, ShieldCheck, Truck, Ruler, Sofa } from 'lucide-react';
import { images } from '@/lib/images';

const badges = [
  { icon: Trees, label: 'Təbii Palıd' },
  { icon: Gem, label: 'Premium Parça' },
  { icon: ShieldCheck, label: 'Rəsmi Zəmanət' },
  { icon: Truck, label: 'Rahat Çatdırılma' },
  { icon: Ruler, label: 'Fərdi Ölçü' },
  { icon: Sofa, label: 'Əl İşi Karkas' },
];

const BrandLogos = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 0.4, y: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    className="edge-fade overflow-hidden py-6"
  >
    <div className="animate-marquee flex w-max">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center gap-16 pr-16 min-w-[100vw] justify-around" aria-hidden={copy === 1}>
          {badges.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-3 text-lg font-medium whitespace-nowrap text-white">
              <Icon className="w-6 h-6" strokeWidth={1.5} />
              {label}
            </span>
          ))}
        </div>
      ))}
    </div>
  </motion.div>
);

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotate: 2 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15
      }
    }
  };

  return (
    <section id="top" className="relative h-screen min-h-[800px] flex flex-col justify-end px-8 md:px-16 pb-8 pt-32 overflow-hidden bg-[#1f1d19]">
      <Image
        src={images.hero}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Background decoration to simulate the lamp glow */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 bg-[#161513]/80"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }} 
        animate={{ opacity: 0.15, scale: 1 }} 
        transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
        className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[#fcae3f] rounded-full blur-[150px]"
      ></motion.div>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 0.1 }} 
        transition={{ duration: 3, delay: 0.8, ease: "easeOut" }}
        className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#d9af62] rounded-full blur-[100px]"
      ></motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col h-full justify-end max-w-7xl mx-auto w-full">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 text-white"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-[100px] leading-[1.1] font-normal tracking-[-0.03em]"
          >
            Məkanınıza<br />
            Eleqantlıq Qatın
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-gray-300 max-w-sm text-lg md:text-xl pb-4">
            Klassik və müasir dizaynın mükəmməl harmoniyasını özündə birləşdirən eksklüziv mebel kolleksiyası.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeInOut" }}
          style={{ originX: 0 }}
          className="w-full h-[1px] bg-gold/80 mb-6"
        ></motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-between items-center font-mono text-xs md:text-sm tracking-widest text-gold mb-8 uppercase"
        >
          <span>LUXMEBEL KOLLEKSİYASI — EST. 2024</span>
          <a href="#haqqimizda" className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
            KƏŞF ET <span>↓</span>
          </a>
        </motion.div>

        <BrandLogos />
      </div>
    </section>
  );
}
