"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { images } from '@/lib/images';

export default function BannerSection() {
  return (
    <>
      {/* Banner Section */}
      <section className="relative min-h-[600px] py-24 flex items-center justify-center overflow-hidden bg-[#2d2922]">
        <Image
          src={images.banner}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center brightness-[0.55] sepia-[0.3]"
        />
        <div className="absolute inset-0 bg-[#2d2922]/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1713] via-[#1a1713]/20 to-[#1a1713]/50"></div>
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
            className="text-xs font-semibold tracking-[0.25em] uppercase text-[#d8c9a8] mb-10"
          >
            LuxMebel
          </motion.h4>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8 lg:gap-12 xl:gap-16 w-full mb-10 md:mb-12 px-4">
            <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring" as const, bounce: 0.4 } } }} className="font-display text-[64px] lg:text-[84px] xl:text-[104px] 2xl:text-[130px] leading-[0.9] font-normal text-[#f2f2f2]">FORMA</motion.span>
            <motion.div variants={{ hidden: { height: 0 }, visible: { height: 128, transition: { duration: 1 } } }} className="w-[1px] bg-white/10 hidden md:block"></motion.div>
            <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring" as const, bounce: 0.4 } } }} className="font-display text-[64px] lg:text-[84px] xl:text-[104px] 2xl:text-[130px] leading-[0.9] font-normal text-[#f2f2f2]">FUNKSİYA</motion.span>
            <motion.div variants={{ hidden: { height: 0 }, visible: { height: 128, transition: { duration: 1 } } }} className="w-[1px] bg-white/10 hidden md:block"></motion.div>
            <motion.span variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: "spring" as const, bounce: 0.4 } } }} className="font-display text-[64px] lg:text-[84px] xl:text-[104px] 2xl:text-[130px] leading-[0.9] font-normal text-[#f2f2f2]">DİZAYN</motion.span>
          </div>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="text-neutral-300 max-w-xl text-lg md:text-xl leading-relaxed px-4"
          >
            Hər bir detalında sənət və keyfiyyəti birləşdirən, yaşayış sahələrinizi unikal təcrübəyə çevirən mebellər.
          </motion.p>
        </motion.div>
      </section>

      {/* Categories Header (Start of next section) */}
      <section id="kateqoriyalar" className="bg-paper text-black pt-32 pb-12 px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-neutral-800">
            Kataloq
          </h4>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="font-display text-[40px] sm:text-6xl md:text-7xl uppercase leading-none">
              Kateqoriyalar
            </h2>
            <Link href="/kateqoriyalar" className="text-sm font-semibold hover:opacity-70 transition-opacity">
              Bütün kateqoriyalar &rarr;
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
