import React from 'react';

export default function BannerSection() {
  return (
    <>
      {/* Banner Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-[#2d2922]">
        <div className="absolute inset-0 bg-[#2d2922] bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1713] to-transparent"></div>
        <div className="absolute left-1/4 top-1/4 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute left-1/4 bottom-1/4 w-40 h-40 bg-white/20 rounded-full blur-xl"></div>

        <div className="relative z-10 text-center flex flex-col items-center w-full">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b8a587] mb-12">
            Light Manifesto
          </h4>
          
          <div className="flex justify-center items-center gap-12 md:gap-24 w-full mb-16 px-4">
            <span className="text-[100px] md:text-[140px] lg:text-[180px] leading-none font-bold tracking-tight scale-y-[1.3] text-white">FORM</span>
            <div className="w-[1px] h-32 bg-white/10 hidden md:block"></div>
            <span className="text-[100px] md:text-[140px] lg:text-[180px] leading-none font-bold tracking-tight scale-y-[1.3] text-white">LIGHT</span>
            <div className="w-[1px] h-32 bg-white/10 hidden md:block"></div>
            <span className="text-[100px] md:text-[140px] lg:text-[180px] leading-none font-bold tracking-tight scale-y-[1.3] text-white">ART</span>
          </div>
          
          <p className="text-gray-300 max-w-lg text-lg md:text-xl font-medium leading-relaxed mt-4">
            From bridges classical sculpture meets generative design technology — transforming spaces into living, living experiences.
          </p>
        </div>
      </section>

      {/* Categories Header (Start of next section) */}
      <section className="bg-[#e4e1dc] text-black pt-32 pb-16 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-gray-500">
            Shop by Type
          </h4>
          <h2 className="text-6xl font-bold tracking-tighter uppercase leading-none">
            Our Categories
          </h2>
        </div>
      </section>
    </>
  );
}
