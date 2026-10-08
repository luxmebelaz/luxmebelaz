import React from 'react';
import { Check, Clock } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="bg-[#dcd8d3] text-black py-32 px-8 md:px-16 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-gray-800">
          Bizimlə Əlaqə
        </h4>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none mb-16">
          Gəlin Danışaq
        </h2>

        <div className="flex flex-col md:flex-row gap-16 md:gap-8">
          
          {/* Left Side Info */}
          <div className="flex-1 md:pr-16 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-gray-800" />
              <span className="font-medium text-gray-900">ÇATDIRILMA VƏ QURAŞDIRILMA</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-800" />
              <span className="font-medium text-gray-900 uppercase">Mütəxəssislərimiz sizə 4 saat ərzində geri dönüş edəcək.</span>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
               <label className="block text-xs font-bold tracking-wider uppercase text-gray-600 mb-2">Məkan</label>
               <select className="w-full bg-[#e8e6e1] border-none rounded-xl p-4 text-gray-800 outline-none appearance-none cursor-pointer">
                 <option>Məkanı seçin...</option>
                 <option>Qonaq Otağı</option>
                 <option>Yataq Otağı</option>
                 <option>Mətbəx</option>
                 <option>Ofis</option>
               </select>
            </div>
            
            <div>
               <label className="block text-xs font-bold tracking-wider uppercase text-gray-600 mb-2">Məkan barədə bizə məlumat verin*</label>
               <textarea 
                 rows={6}
                 className="w-full bg-[#e8e6e1] border-none rounded-xl p-4 text-gray-800 outline-none resize-none"
                 placeholder="Otağınızın sahəsi, ümumi tərz və ağlınızda olan mebel modeli barədə qeydlərinizi yazın..."
               ></textarea>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input type="checkbox" id="terms" className="mt-1 cursor-pointer" />
              <label htmlFor="terms" className="text-[10px] font-bold tracking-wider uppercase text-gray-800 cursor-pointer">
                Göndərməklə məxfilik siyasəti və istifadə şərtləri ilə razılaşırsınız.
              </label>
            </div>

            <div className="flex items-center gap-3 mt-4 text-xs font-bold uppercase text-gray-700">
              <Clock className="w-4 h-4" />
              <span>Dizaynerlə zəng üçün 4 saat ərzində sizinlə əlaqə saxlayacağıq.</span>
            </div>

            <button className="bg-[#0a0a0a] text-white w-full py-5 rounded-full text-sm font-bold tracking-wider uppercase hover:bg-black/80 transition-colors mt-4">
              Məsləhət Üçün Göndər
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
