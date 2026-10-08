"use client";

import React from 'react';
import { Sofa, BedDouble, Armchair } from 'lucide-react';
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
    <section className="bg-[#e4e1dc] text-black pb-32 px-8 md:px-16">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        
        {/* Floor Category */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="bg-[#e8e6e1] rounded-[40px] p-10 shadow-[inset_0_2px_20px_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between h-[450px]"
        >
          <Sofa className="w-8 h-8 mb-8" strokeWidth={1.5} />
          <div>
            <h3 className="text-3xl font-bold tracking-tighter uppercase mb-4">Divanlar</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Qonaq otağınız üçün müasir və klassik dizaynlı, erqonomik divanlar. Həm rahatlıq, həm də estetika axtaranlar üçün.
            </p>
          </div>
          <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Divanlara Bax
          </a>
        </motion.div>

        {/* Table Category */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="bg-[#111] text-white rounded-[40px] p-10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between h-[450px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d9af62] rounded-full blur-[100px] opacity-10 transition-opacity duration-500 group-hover:opacity-30"></div>
          <BedDouble className="w-8 h-8 mb-8 text-[#d9af62]" strokeWidth={1.5} />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold tracking-tighter uppercase mb-4">Yataq Otağı</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Günün yorğunluğunu ata biləcəyiniz, keyfiyyətli taxta və materiallardan hazırlanmış yataq mebelləri.
            </p>
          </div>
          <a href="#" className="text-sm font-medium text-[#d9af62] hover:opacity-70 transition-opacity relative z-10">
            Yataq Otağına Bax
          </a>
        </motion.div>

        {/* Pendant Category */}
        <motion.div 
          variants={cardVariants}
          whileHover={{ y: -5 }}
          className="bg-[#e8e6e1] rounded-[40px] p-10 shadow-[inset_0_2px_20px_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between h-[450px]"
        >
          <Armchair className="w-8 h-8 mb-8" strokeWidth={1.5} />
          <div>
            <h3 className="text-3xl font-bold tracking-tighter uppercase mb-4">Kreslolar</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Rahatlığınız üçün fərdi toxunuşlar. Otağınıza xüsusi rəng qatacaq lüks kreslo kolleksiyası.
            </p>
          </div>
          <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">
            Kreslolara Bax
          </a>
        </motion.div>

      </motion.div>
    </section>
  );
}
