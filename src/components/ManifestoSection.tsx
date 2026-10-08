"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { images } from '@/lib/images';

export default function ManifestoSection() {
  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8,  }
    }
  };

  return (
    <section id="felsefe" className="bg-[#141414] py-32 px-6 md:px-16 text-center relative overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.2 }}
        className="max-w-4xl mx-auto mb-24"
      >
        <motion.h4 variants={revealVariants} className="text-xs tracking-[0.2em] text-gold uppercase mb-6 font-semibold">
          LuxMebel Fəlsəfəsi
        </motion.h4>
        <motion.h2 variants={revealVariants} className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.03em] leading-[1.05] mb-8 text-[#ececec]">
          Rahatlığın və<br />
          Eleqantlığın Təcəssümü
        </motion.h2>
        <motion.p variants={revealVariants} className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Biz sadəcə mebel yaratmırıq. Hər bir detal diqqətlə seçilir və fərdi yanaşma ilə
          hazırlanır ki, eviniz həm funksional, həm də estetik bir incəsənət əsərinə çevrilsin.
        </motion.p>
        <motion.div variants={revealVariants} className="mt-8">
          <Link href="/haqqimizda" className="inline-flex items-center h-12 px-7 rounded-full border border-white/40 text-sm font-bold text-white hover:bg-white hover:text-black transition-colors">
            Haqqımızda daha ətraflı
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-px md:gap-0 md:h-[640px] max-w-6xl mx-auto rounded-[28px] overflow-hidden border-[3px] border-[#cfcfcf]/90 bg-[#cfcfcf] shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_30px_80px_rgba(0,0,0,0.6)]"
      >
        {/* Left Column */}
        <motion.div variants={revealVariants} className="flex flex-col h-[520px] md:h-full bg-[#1c1c1c] overflow-hidden">
          <div className="bg-gradient-to-b from-[#d6d6d6] to-[#bdbdbd] text-black py-4 flex flex-col justify-center items-center h-[22%] shrink-0">
            <h3 className="font-display text-6xl leading-none mb-1">500<span className="text-4xl">+</span></h3>
            <p className="text-sm font-medium">Unikal Model</p>
          </div>
          <div className="bg-[#2a2a2a] flex-1 relative">
            <Image
              src={images.manifesto.left}
              alt="Tünd taxta divar fonunda künc divan"
              fill
              sizes="(max-width: 768px) 100vw, 350px"
              className="object-cover brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/50"></div>
          </div>
        </motion.div>

        {/* Center Column */}
        <motion.div variants={revealVariants} className="flex flex-col h-[520px] md:h-full bg-[#1c1c1c] overflow-hidden">
          <div className="bg-[#3a352d] flex-1 relative">
            <Image
              src={images.manifesto.center}
              alt="İsti işıqlı qonaq otağı interyeri"
              fill
              sizes="(max-width: 768px) 100vw, 350px"
              className="object-cover brightness-[0.85] sepia-[0.25]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3a352d]/60 to-transparent"></div>
          </div>
          <div className="bg-gradient-to-b from-[#d6d6d6] to-[#bdbdbd] text-black flex flex-col justify-center items-center h-[22%] shrink-0">
            <h3 className="font-display text-6xl leading-none mb-1">15<span className="text-4xl">+</span></h3>
            <p className="text-sm font-medium">İllik Ustalıq</p>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={revealVariants} className="flex flex-col h-[520px] md:h-full bg-[#1c1c1c] overflow-hidden">
          <div className="bg-gradient-to-b from-[#d6d6d6] to-[#bdbdbd] text-black py-4 flex flex-col justify-center items-center h-[22%] shrink-0">
            <h3 className="font-display text-6xl leading-none mb-1">99<span className="text-4xl">%</span></h3>
            <p className="text-sm font-medium">Məmnun Müştəri</p>
          </div>
          <div className="bg-[#1f1d1c] flex-1 relative">
            <Image
              src={images.manifesto.right}
              alt="Kərpic divarlı loft məkanında divan və masa"
              fill
              sizes="(max-width: 768px) 100vw, 350px"
              className="object-cover brightness-[0.8]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/55"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
