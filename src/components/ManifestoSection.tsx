"use client";

import React from 'react';
import { motion } from 'framer-motion';

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
    <section className="bg-[#0f0f0f] py-32 px-8 md:px-16 text-center relative overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.2 }}
        className="max-w-4xl mx-auto mb-24"
      >
        <motion.h4 variants={revealVariants} className="text-xs tracking-[0.2em] text-[#b8a587] uppercase mb-6 font-semibold">
          LuxMebel Fəlsəfəsi
        </motion.h4>
        <motion.h2 variants={revealVariants} className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-8 text-white">
          Rahatlığın və<br />
          Eleqantlığın Təcəssümü
        </motion.h2>
        <motion.p variants={revealVariants} className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Biz sadəcə mebel yaratmırıq. Hər bir detal diqqətlə seçilir və fərdi yanaşma ilə
          hazırlanır ki, eviniz həm funksional, həm də estetik bir incəsənət əsərinə çevrilsin.
        </motion.p>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ staggerChildren: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-0 h-[600px] max-w-7xl mx-auto"
      >
        {/* Left Column */}
        <motion.div variants={revealVariants} className="flex flex-col h-full bg-[#1c1c1c] rounded-tl-3xl rounded-bl-3xl overflow-hidden border-r border-black/50">
          <div className="bg-[#dcd8d3] text-black py-8 flex flex-col justify-center items-center h-[25%]">
            <h3 className="text-5xl font-bold tracking-tighter mb-1">500<span className="text-3xl">+</span></h3>
            <p className="text-sm font-medium">Unikal Model</p>
          </div>
          <div className="bg-[#2a2a2a] h-[75%] relative">
             <div className="absolute inset-0 bg-gradient-to-b from-[#2a2a2a] to-[#111]"></div>
             <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-4xl">Şəkil</div>
          </div>
        </motion.div>

        {/* Center Column */}
        <motion.div variants={revealVariants} className="flex flex-col h-full bg-[#1c1c1c] overflow-hidden border-r border-black/50">
          <div className="bg-[#3a352d] h-[80%] relative">
             <div className="absolute inset-0 bg-gradient-to-t from-[#3a352d] to-[#1f1d19]"></div>
             <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-4xl">Şəkil</div>
          </div>
          <div className="bg-[#dcd8d3] text-black flex flex-col justify-center items-center h-[20%]">
            <h3 className="text-5xl font-bold tracking-tighter">15+ İL</h3>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={revealVariants} className="flex flex-col h-full bg-[#1c1c1c] rounded-tr-3xl rounded-br-3xl overflow-hidden">
          <div className="bg-[#dcd8d3] text-black py-8 flex flex-col justify-center items-center h-[25%]">
            <h3 className="text-5xl font-bold tracking-tighter mb-1">99<span className="text-3xl">%</span></h3>
            <p className="text-sm font-medium">Məmnun Müştəri</p>
          </div>
          <div className="bg-[#1f1d1c] h-[75%] relative">
             <div className="absolute inset-0 bg-gradient-to-b from-[#1f1d1c] to-[#0a0a0a]"></div>
             <div className="absolute inset-0 flex items-center justify-center text-white/10 font-bold text-4xl">Şəkil</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
