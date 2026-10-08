import React from 'react';

const BrandLogos = () => (
  <div className="flex justify-between items-center opacity-40 grayscale gap-4 overflow-hidden py-6">
    <span className="text-xl font-bold">TESLA</span>
    <span className="text-xl font-bold">airbnb</span>
    <span className="text-xl font-bold">Apple</span>
    <span className="text-xl font-bold">adidas</span>
    <span className="text-xl font-bold">Oculus</span>
    <span className="text-xl font-bold italic">Coca-Cola</span>
    <span className="text-xl font-bold">Mercedes</span>
  </div>
);

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[800px] flex flex-col justify-end px-8 md:px-16 pb-8 pt-32 overflow-hidden bg-[#1f1d19]">
      {/* Background decoration to simulate the lamp glow */}
      <div className="absolute inset-0 z-0 bg-[#161513]"></div>
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[#fcae3f] rounded-full blur-[150px] opacity-15"></div>
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#d9af62] rounded-full blur-[100px] opacity-10"></div>
      
      <div className="relative z-10 flex flex-col h-full justify-end max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <h1 className="text-6xl md:text-8xl lg:text-[100px] leading-[1.1] font-medium tracking-tight">
            Light Shapes<br />
            Every Space
          </h1>
          
          <p className="text-gray-300 max-w-sm text-lg md:text-xl pb-4">
            Minimalist lamps where classical sculpture meets generative design technology.
          </p>
        </div>

        <div className="w-full h-[1px] bg-white/20 mb-6"></div>

        <div className="flex justify-between items-center text-xs md:text-sm tracking-widest text-gray-400 mb-8 uppercase">
          <span>EGO COLLECTION — EST. 2024</span>
          <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
            DISCOVER <span>↓</span>
          </span>
        </div>

        <BrandLogos />
      </div>
    </section>
  );
}
