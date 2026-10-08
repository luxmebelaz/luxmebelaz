'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Daxili səhifələrin əsas məzmun konteyneri; ekrana girəndə yumşaq animasiya ilə açılır
export default function PageSection({
  children,
  className = '',
  narrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <section className={`bg-paper text-black px-4 md:px-8 pb-16 md:pb-24 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.04 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`${narrow ? 'max-w-3xl' : 'max-w-6xl'} mx-auto`}
      >
        {children}
      </motion.div>
    </section>
  );
}
