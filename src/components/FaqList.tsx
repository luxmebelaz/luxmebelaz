'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Faq } from '@/lib/data/types';

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.q} className="bg-white/35 border border-white/40 rounded-2xl hover:bg-white/50 transition-colors">
            <button
              type="button"
              id={`faqp-q-${index}`}
              aria-expanded={isOpen}
              aria-controls={`faqp-a-${index}`}
              onClick={() => setOpen(isOpen ? null : index)}
              className="w-full p-5 sm:p-6 flex justify-between items-center gap-4 text-left cursor-pointer"
            >
              <span className="font-semibold text-neutral-900">{faq.q}</span>
              <Plus className={`w-5 h-5 shrink-0 text-neutral-700 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
            </button>
            <div
              id={`faqp-a-${index}`}
              role="region"
              aria-labelledby={`faqp-q-${index}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 sm:px-6 pb-6 text-neutral-700 text-[15px] leading-relaxed">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
