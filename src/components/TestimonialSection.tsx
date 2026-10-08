import React from 'react';

export default function TestimonialSection() {
  return (
    <section className="bg-[#dcd8d3] text-black py-32 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Social Proof
          </h4>
          <h2 className="text-6xl font-bold tracking-tighter uppercase leading-none">
            Our Clients
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-center">
          {/* Images Left Side */}
          <div className="flex gap-4 relative">
             <div className="w-[2px] bg-[#c5b59a] absolute -left-6 top-0 bottom-12"></div>
             <div className="flex flex-col gap-4">
               <div className="w-64 h-64 bg-[#b5aba0] overflow-hidden rounded-lg relative">
                 {/* Placeholder for client image */}
                 <div className="absolute inset-0 flex items-center justify-center text-white/30 font-bold text-xl">Client Photo</div>
               </div>
               <div className="w-64 h-24 bg-[#b5aba0] overflow-hidden rounded-t-lg relative opacity-50">
                 {/* Placeholder for next client image */}
                 <div className="absolute inset-0 flex items-center justify-center text-white/30 font-bold text-xl">Photo 2</div>
               </div>
             </div>
          </div>

          {/* Text Right Side */}
          <div className="flex-1 max-w-3xl">
            <h3 className="text-3xl md:text-4xl lg:text-[40px] leading-snug font-medium mb-12 text-gray-800">
              "Implementation took less than a week, and the results exceeded our expectations. Our workflows became more efficient, and customer satisfaction improved immediately."
            </h3>
            <div>
              <p className="font-bold text-lg">David Kim</p>
              <p className="text-gray-500">Operations Manager, BrightFlow</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
