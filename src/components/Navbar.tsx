import React from 'react';
import { ShoppingCart } from 'lucide-react';

const links = [
  { label: 'Mağaza', href: '#magaza' },
  { label: 'Bloq', href: '#bloq' },
  { label: 'Əlaqə', href: '#elaqe' },
  { label: 'Haqqımızda', href: '#haqqimizda' },
];

export default function Navbar() {
  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        aria-label="Əsas menyu"
        className="flex items-center gap-3 md:gap-6 bg-gradient-to-b from-[#ececec] to-[#cbcbcb] text-black pl-5 md:pl-6 pr-2 py-2 rounded-full border border-white/70 shadow-[inset_0_2px_6px_rgba(255,255,255,0.9),0_12px_40px_rgba(0,0,0,0.35)] w-full max-w-4xl"
      >
        <a href="#top" className="font-sans text-xl md:text-2xl font-semibold tracking-tight mr-auto md:mr-0 md:flex-1">
          LuxMebel
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-600 font-medium">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-black transition-colors">
              {link.label}
            </a>
          ))}
          <button
            type="button"
            aria-label="Səbət"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-black/80 text-black hover:bg-black hover:text-white transition-colors"
          >
            <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex items-center gap-2 md:flex-1 md:justify-end">
          <button
            type="button"
            aria-label="Səbət"
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full border border-black/80"
          >
            <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.75} />
          </button>
          <a
            href="#elaqe"
            className="bg-[#111] shadow-[inset_0_2px_8px_rgba(255,255,255,0.22)] text-white px-4 md:px-6 py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors"
          >
            Sifariş Et
          </a>
        </div>
      </nav>
    </div>
  );
}
