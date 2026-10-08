import React from 'react';
import { LampFloor, LampDesk, LampCeiling } from 'lucide-react';

export default function CategoriesSection() {
  return (
    <section className="bg-[#e4e1dc] text-black pb-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Floor Category */}
        <div className="bg-[#e8e6e1] rounded-[40px] p-10 shadow-[inset_0_2px_20px_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between h-[450px]">
          <LampFloor className="w-8 h-8 mb-8" strokeWidth={1.5} />
          <div>
            <h3 className="text-3xl font-bold tracking-tighter uppercase mb-4">Floor</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Floor lamps for living, study, and bedroom environments. Adjustable height and unique sculptural designs.
            </p>
          </div>
          <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">
            View Floor
          </a>
        </div>

        {/* Table Category */}
        <div className="bg-[#111] text-white rounded-[40px] p-10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between h-[450px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d9af62] rounded-full blur-[100px] opacity-10"></div>
          <LampDesk className="w-8 h-8 mb-8 text-[#d9af62]" strokeWidth={1.5} />
          <div className="relative z-10">
            <h3 className="text-3xl font-bold tracking-tighter uppercase mb-4">Table</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Table lamps crafted from ceramic, glass, and brass. Ideal for bedside, office, and reading nooks.
            </p>
          </div>
          <a href="#" className="text-sm font-medium text-[#d9af62] hover:opacity-70 transition-opacity relative z-10">
            View Table
          </a>
        </div>

        {/* Pendant Category */}
        <div className="bg-[#e8e6e1] rounded-[40px] p-10 shadow-[inset_0_2px_20px_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.05)] flex flex-col justify-between h-[450px]">
          <LampCeiling className="w-8 h-8 mb-8" strokeWidth={1.5} />
          <div>
            <h3 className="text-3xl font-bold tracking-tighter uppercase mb-4">Pendant</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Suspended pendants that transform any ceiling into a focal point. From minimalist to sculptural forms.
            </p>
          </div>
          <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">
            View Pendant
          </a>
        </div>

      </div>
    </section>
  );
}
