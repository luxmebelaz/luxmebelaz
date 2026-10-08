"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { images } from '@/lib/images';

export default function TestimonialSection() {
  return (
    <section className="bg-paper text-black py-24 px-6 md:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <div className="mb-16">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Rəylər
          </h4>
          <h2 className="font-display text-[40px] sm:text-6xl md:text-7xl uppercase leading-none">
            Müştərilərimiz
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          {/* Images Left Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-4 relative"
          >
             <motion.div 
               initial={{ height: 0 }} 
               whileInView={{ height: "100%" }} 
               viewport={{ once: true }} 
               transition={{ duration: 1 }} 
               className="w-[2px] bg-[#b9a66c] absolute -left-6 top-0 bottom-12"
             ></motion.div>
             <div className="flex flex-col gap-4">
               <div className="w-40 h-52 md:w-44 md:h-56 bg-[#b5aba0] overflow-hidden rounded-md relative shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                 <Image
                   src={images.testimonial.portrait}
                   alt="Aygün Məmmədova"
                   fill
                   sizes="176px"
                   className="object-cover"
                 />
               </div>
               <div className="w-40 h-24 md:w-44 bg-[#b5aba0] overflow-hidden rounded-t-md relative opacity-60">
                 <Image
                   src={images.testimonial.room}
                   alt="Müştərinin yeni qonaq otağı"
                   fill
                   sizes="176px"
                   className="object-cover"
                 />
               </div>
             </div>
          </motion.div>

          {/* Text Right Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 max-w-3xl"
          >
            <h3 className="text-3xl md:text-4xl lg:text-[40px] leading-[1.25] font-normal mb-10 text-neutral-900 tracking-[-0.025em]">
              Sifarişim gözlədiyimdən də tez çatdırıldı və nəticə möhtəşəm idi. Yeni mebellərimiz qonaq otağına tam fərqli bir atmosfer qatdı. Keyfiyyət və xidmət həqiqətən də yüksək səviyyədədir.
            </h3>
            <div>
              <p className="font-semibold text-lg">Aygün Məmmədova</p>
              <p className="text-neutral-600">Müştəri, Bakı</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
