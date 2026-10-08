import React from 'react';
import { MessageCircle, Camera, Briefcase, PenTool } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#dcd8d3] pt-16 pb-8 px-8 md:px-16 text-black">
      <div className="max-w-7xl mx-auto bg-[#cfcac4] rounded-t-[40px] p-12 md:p-16 shadow-[inset_0_2px_20px_rgba(255,255,255,0.4)]">
        <div className="flex flex-col md:flex-row gap-16 justify-between">
          
          {/* Left Side */}
          <div className="max-w-sm">
            <h2 className="text-4xl font-bold tracking-tighter mb-4">EGO</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              Liquid glass interfaces, crafted with care for modern products and teams that love detail.
            </p>
            <div className="flex bg-[#e4e1dc] rounded-full overflow-hidden p-1 w-full max-w-xs shadow-inner">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent border-none outline-none px-4 text-sm w-full"
              />
              <button className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Side Links */}
          <div className="flex gap-12 md:gap-24">
            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase mb-6">Product</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Collection</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Legal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase mb-6">Company</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">About EGO</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Shop</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Articles</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase mb-6">Resources</h4>
              <ul className="flex flex-col gap-4 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Socials & Payments */}
        <div className="mt-24 pt-8 flex justify-end items-center gap-6 border-t border-black/10">
          <div className="flex gap-4 items-center">
            <a href="#" className="text-gray-600 hover:text-black"><MessageCircle className="w-5 h-5" /></a>
            <a href="#" className="text-gray-600 hover:text-black"><Camera className="w-5 h-5" /></a>
            <a href="#" className="text-gray-600 hover:text-black"><Briefcase className="w-5 h-5" /></a>
            <a href="#" className="text-gray-600 hover:text-black"><PenTool className="w-5 h-5" /></a>
          </div>
          {/* Mock payment icons */}
          <div className="flex gap-2 items-center text-[10px] font-bold text-white uppercase tracking-wider">
             <div className="bg-black px-2 py-1 rounded">Pay</div>
             <div className="bg-[#eb001b] px-2 py-1 rounded flex items-center justify-center">
               <div className="w-3 h-3 bg-[#f79e1b] rounded-full -ml-1"></div>
             </div>
             <div className="bg-black px-2 py-1 rounded">G Pay</div>
             <div className="bg-[#003087] text-white px-2 py-1 rounded font-serif italic">P</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
