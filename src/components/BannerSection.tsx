"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function BannerSection() {
  return (
    <>
      {/* Banner Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-[#2d2922]">
        <div className="absolute inset-0 bg-[#2d2922] bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1713] to-transparent"></div>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute left-1/4 top-1/4 w-32 h-32 bg-white/20 rounded-full blur-xl"
        ></motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute left-1/4 bottom-1/4 w-40 h-40 bg-white/20 rounded-full blur-xl"
        ></motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.2 }}
          className="relative z-10 text-center flex flex-col items-center w-full"
        >
          <motion.h4 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b8a587] mb-12"
          >
            LuxMebel
          </motion.h4>
          
          <div className="flex justify-center items-center gap-12 md:gap-24 w-full mb-16 px-4">
            <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring" as const, bounce: 0.4 } } }} className="text-[70px] md:text-[100px] lg:text-[140px] leading-none font-bold tracking-tight scale-y-[1.3] text-white">FORMA</motion.span>
            <motion.div variants={{ hidden: { height: 0 }, visible: { height: 128, transition: { duration: 1 } } }} className="w-[1px] bg-white/10 hidden md:block"></motion.div>
            <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring" as const, bounce: 0.4 } } }} className="text-[70px] md:text-[100px] lg:text-[140px] leading-none font-bold tracking-tight scale-y-[1.3] text-white">FUNKSİYA</motion.span>
            <motion.div variants={{ hidden: { height: 0 }, visible: { height: 128, transition: { duration: 1 } } }} className="w-[1px] bg-white/10 hidden md:block"></motion.div>
            <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring" as const, bounce: 0.4 } } }} className="text-[70px] md:text-[100px] lg:text-[140px] leading-none font-bold tracking-tight scale-y-[1.3] text-white">DİZAYN</motion.span>
          </div>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="text-gray-300 max-w-lg text-lg md:text-xl font-medium leading-relaxed mt-4"
          >
            Hər bir detalında sənət və keyfiyyəti birləşdirən, yaşayış sahələrinizi unikal təcrübəyə çevirən mebellər.
          </motion.p>
        </motion.div>
      </section>

      {/* Categories Header (Start of next section) */}
      <section className="bg-[#e4e1dc] text-black pt-32 pb-16 px-8 md:px-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-gray-500">
            Kataloq
          </h4>
          <h2 className="text-6xl font-bold tracking-tighter uppercase leading-none">
            Kateqoriyalar
          </h2>
        </motion.div>
      </section>
    </>
  );
}
