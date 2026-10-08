"use client";

import React from 'react';
import { motion } from 'framer-motion';

const BrandLogos = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 0.4, y: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
    className="flex justify-between items-center grayscale gap-4 overflow-hidden py-6"
  >
    <span className="text-xl font-bold">TESLA</span>
    <span className="text-xl font-bold">airbnb</span>
    <span className="text-xl font-bold">Apple</span>
    <span className="text-xl font-bold">adidas</span>
    <span className="text-xl font-bold">Oculus</span>
    <span className="text-xl font-bold italic">Coca-Cola</span>
    <span className="text-xl font-bold">Mercedes</span>
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
    <section className="relative h-screen min-h-[800px] flex flex-col justify-end px-8 md:px-16 pb-8 pt-32 overflow-hidden bg-[#1f1d19]">
      {/* Background decoration to simulate the lamp glow */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 bg-[#161513]"
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
      
      <div className="relative z-10 flex flex-col h-full justify-end max-w-7xl mx-auto w-full">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="visible" 
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 text-white"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl lg:text-[100px] leading-[1.1] font-medium tracking-tight"
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
          className="w-full h-[1px] bg-white/20 mb-6"
        ></motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-between items-center text-xs md:text-sm tracking-widest text-gray-400 mb-8 uppercase"
        >
          <span>LUXMEBEL KOLLEKSİYASI — EST. 2024</span>
          <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
            KƏŞF ET <span>↓</span>
          </span>
        </motion.div>

        <BrandLogos />
      </div>
    </section>
  );
}
