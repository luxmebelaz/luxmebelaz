"use client";

import React from 'react';
import { Sofa, BedDouble, Armchair } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CategoriesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7,  } 
    }
  };

  return (
    <section className="bg-paper text-black pb-32 px-6 md:px-8">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        
        {/* Floor Category */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="glass-light rounded-[40px] p-10 flex flex-col justify-between min-h-[400px] md:h-[380px]"
        >
          <Sofa className="w-8 h-8 mb-4" strokeWidth={1.5} />
          <div>
            <h3 className="font-display text-4xl uppercase mb-3">Divanlar</h3>
            <p className="text-neutral-800 text-[15px] leading-relaxed mb-6">
              Qonaq otağınız üçün müasir və klassik dizaynlı, erqonomik divanlar. Həm rahatlıq, həm də estetika axtaranlar üçün.
            </p>
          </div>
          <Link href="/kateqoriyalar/divanlar" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Divanlara Bax
          </Link>
        </motion.div>

        {/* Table Category */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="glass-dark group text-white rounded-[40px] p-10 flex flex-col justify-between min-h-[400px] md:h-[380px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d9af62] rounded-full blur-[100px] opacity-10 transition-opacity duration-500 group-hover:opacity-30"></div>
          <BedDouble className="w-8 h-8 mb-4 text-gold relative z-10" strokeWidth={1.5} />
          <div className="relative z-10">
            <h3 className="font-display text-4xl uppercase mb-3">Yataq Otağı</h3>
            <p className="text-neutral-300 text-[15px] leading-relaxed mb-6">
              Günün yorğunluğunu ata biləcəyiniz, keyfiyyətli taxta və materiallardan hazırlanmış yataq mebelləri.
            </p>
          </div>
          <Link href="/kateqoriyalar/yataq-otagi" className="text-sm font-medium text-gold hover:opacity-70 transition-opacity relative z-10">
            Yataq Otağına Bax
          </Link>
        </motion.div>

        {/* Pendant Category */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="glass-light rounded-[40px] p-10 flex flex-col justify-between min-h-[400px] md:h-[380px]"
        >
          <Armchair className="w-8 h-8 mb-4" strokeWidth={1.5} />
          <div>
            <h3 className="font-display text-4xl uppercase mb-3">Kreslolar</h3>
            <p className="text-neutral-800 text-[15px] leading-relaxed mb-6">
              Rahatlığınız üçün fərdi toxunuşlar. Otağınıza xüsusi rəng qatacaq lüks kreslo kolleksiyası.
            </p>
          </div>
          <Link href="/kateqoriyalar/kreslolar" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Kreslolara Bax
          </Link>
        </motion.div>

      </motion.div>
    </section>
  );
}
