import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <nav className="flex items-center gap-8 bg-[#e8e6e1]/90 text-black px-6 py-3 rounded-full shadow-[0_0_30px_rgba(255,255,255,0.4)] border border-white/50 backdrop-blur-xl w-full max-w-4xl mx-4">
        <div className="text-2xl font-bold tracking-tight mr-auto">LuxMebel</div>
        
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-700 font-medium tracking-wide">
          <a href="#" className="hover:text-black transition-colors">Mağaza</a>
          <a href="#" className="hover:text-black transition-colors">Bloq</a>
          <a href="#" className="hover:text-black transition-colors">Əlaqə</a>
          <a href="#" className="hover:text-black transition-colors">Haqqımızda</a>
        </div>
        
        <div className="flex items-center gap-4 ml-auto md:ml-0">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-black/20 hover:bg-black/5 transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
          <button className="bg-[#1f1d1e] shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
            Sifariş Et
          </button>
        </div>
      </nav>
    </div>
  );
}
