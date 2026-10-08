import React from 'react';
import { ShoppingCart } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <nav className="flex items-center gap-8 bg-[#e8e6e1] text-black px-6 py-3 rounded-full shadow-lg border border-white/20 backdrop-blur-md w-full max-w-4xl mx-4">
        <div className="text-xl font-bold tracking-widest mr-auto">EGO</div>
        
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-600 font-medium">
          <a href="#" className="hover:text-black transition-colors">Store</a>
          <a href="#" className="hover:text-black transition-colors">Blog</a>
          <a href="#" className="hover:text-black transition-colors">Contact</a>
          <a href="#" className="hover:text-black transition-colors">Legal</a>
        </div>
        
        <div className="flex items-center gap-3 ml-auto md:ml-0">
          <button className="p-2 rounded-full border border-gray-400 hover:bg-black/5 transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
          <button className="bg-[#1f1d1e] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors">
            Get Started
          </button>
        </div>
      </nav>
    </div>
  );
}
