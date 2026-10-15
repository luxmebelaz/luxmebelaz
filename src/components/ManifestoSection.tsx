"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ruler, Trees, Truck } from 'lucide-react';

const pillars = [
  { icon: Ruler, title: 'Fərdi ölçü', text: 'Mebel otağınızın ölçüsünə, seçdiyiniz parça və rəngə uyğun hazırlanır.' },
  { icon: Trees, title: 'Keyfiyyətli material', text: 'Davamlı karkas, seçilmiş parça və taxta — illərlə xidmət etməsi üçün.' },
  { icon: Truck, title: 'Çatdırılma və quraşdırma', text: 'Sifarişinizi ünvana çatdırır və komandamız yerində quraşdırır.' },
];

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
    <section id="felsefe" className="bg-[#141414] py-24 px-6 md:px-16 text-center relative overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.2 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <motion.h4 variants={revealVariants} className="text-xs tracking-[0.2em] text-gold uppercase mb-6 font-semibold">
          LuxMebel fəlsəfəsi
        </motion.h4>
        <motion.h2 variants={revealVariants} className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.03em] leading-[1.05] mb-8 text-[#ececec]">
          Rahatlığın və<br />
          zərifliyin təcəssümü
        </motion.h2>
        <motion.p variants={revealVariants} className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto text-left"
      >
        {pillars.map(({ icon: Icon, title, text }) => (
          <motion.div
            key={title}
            variants={revealVariants}
            className="glass-dark group relative overflow-hidden rounded-[28px] p-8 md:p-9 flex flex-col justify-between min-h-[300px]"
          >
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#d9af62] rounded-full blur-[90px] opacity-10 transition-opacity duration-500 group-hover:opacity-25" />
            <Icon className="relative w-8 h-8 text-gold" strokeWidth={1.5} />
            <div className="relative">
              <h3 className="font-display text-3xl uppercase leading-none mb-3 text-[#ececec]">{title}</h3>
              <p className="text-neutral-400 text-[14px] leading-relaxed">{text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
