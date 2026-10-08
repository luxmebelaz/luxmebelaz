import React from 'react';
import { Check, Clock } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="bg-[#dcd8d3] text-black py-32 px-8 md:px-16 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-gray-800">
          Get in touch
        </h4>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none mb-16">
          Let's Talk
        </h2>

        <div className="flex flex-col md:flex-row gap-16 md:gap-8">
          
          {/* Left Side Info */}
          <div className="flex-1 md:pr-16 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-gray-800" />
              <span className="font-medium text-gray-900">DELIVERY AND INSTALLATION</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-800" />
              <span className="font-medium text-gray-900 uppercase">We reply within 4 hours to arrange a call with a lighting designer.</span>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
               <label className="block text-xs font-bold tracking-wider uppercase text-gray-600 mb-2">Space</label>
               <select className="w-full bg-[#e8e6e1] border-none rounded-xl p-4 text-gray-800 outline-none appearance-none cursor-pointer">
                 <option>Select a space...</option>
                 <option>Living Room</option>
                 <option>Bedroom</option>
                 <option>Kitchen</option>
                 <option>Office</option>
               </select>
            </div>
            
            <div>
               <label className="block text-xs font-bold tracking-wider uppercase text-gray-600 mb-2">Tell us about the space*</label>
               <textarea 
                 rows={6}
                 className="w-full bg-[#e8e6e1] border-none rounded-xl p-4 text-gray-800 outline-none resize-none"
                 placeholder="Tell us about the room, ceiling height, mood and any lamp from the collection you already have in mind (e.g. living room, 3.2 m ceiling, warm light...)"
               ></textarea>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input type="checkbox" id="terms" className="mt-1 cursor-pointer" />
              <label htmlFor="terms" className="text-[10px] font-bold tracking-wider uppercase text-gray-800 cursor-pointer">
                By submitting, you agree to our terms and privacy policy.
              </label>
            </div>

            <div className="flex items-center gap-3 mt-4 text-xs font-bold uppercase text-gray-700">
              <Clock className="w-4 h-4" />
              <span>We reply within 4 hours to arrange a call with a lighting designer.</span>
            </div>

            <button className="bg-[#0a0a0a] text-white w-full py-5 rounded-full text-sm font-bold tracking-wider uppercase hover:bg-black/80 transition-colors mt-4">
              Request My Lighting Plan
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
