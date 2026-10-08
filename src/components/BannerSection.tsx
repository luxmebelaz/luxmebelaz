import React from 'react';

export default function BannerSection() {
  return (
    <>
      {/* Banner Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-[#2d2922]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1713] to-transparent"></div>
        <div className="absolute left-1/4 top-1/4 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute left-1/4 bottom-1/4 w-40 h-40 bg-white/20 rounded-full blur-xl"></div>

        <div className="relative z-10 text-center flex flex-col items-center w-full">
          <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#b8a587] mb-8">
            Light Manifesto
          </h4>
          
          <div className="flex justify-center items-center gap-8 md:gap-16 w-full mb-12">
            <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">FORM</span>
            <div className="w-[1px] h-24 bg-white/20"></div>
            <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">LIGHT</span>
            <div className="w-[1px] h-24 bg-white/20"></div>
            <span className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter">ART</span>
          </div>
          
          <p className="text-gray-300 max-w-lg text-lg md:text-xl font-medium leading-relaxed">
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
