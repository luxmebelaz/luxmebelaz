import React from 'react';

const products = [
  {
    title: 'Alabaster Globe Pendant',
    desc: 'Mouth-blown alabaster glass, brass hardware',
    price: '€800',
    bgColor: 'bg-[#dcd8d3]'
  },
  {
    title: 'Matte Black Cone Pendant',
    desc: 'Powder-coated steel, braided textile cord',
    price: '€1.400',
    bgColor: 'bg-[#b0aba3]'
  },
  {
    title: 'Brass Arc Floor Lamp',
    desc: 'Brushed brass-plated steel, marble base, linen shade',
    price: '€98',
    bgColor: 'bg-[#dfcbb3]'
  },
  {
    title: 'Ribbed Ceramic Table Lamp',
    desc: 'Hand-thrown ribbed ceramic, cotton drum shade',
    price: '€450',
    bgColor: 'bg-[#edeae5]'
  }
];

export default function ProductsSection() {
  return (
    <section className="bg-[#e4e1dc] text-black pt-0 pb-32">
      {/* Marquee Banner */}
      <div className="bg-[#e0ca94] py-3 overflow-hidden border-y border-black/10 whitespace-nowrap flex relative">
        <div className="animate-marquee flex gap-8 text-xs font-semibold tracking-widest uppercase">
          <span>Brand Identity</span> <span>•</span> 
          <span>Web Design</span> <span>•</span> 
          <span>Motion</span> <span>•</span> 
          <span>Packaging</span> <span>•</span> 
          <span>Senior-Led. Fully Remote. Precision-Built.</span> <span>•</span> 
          <span>Award-calibre creative, without the agency overhead.</span> <span>•</span>
          {/* Repeat to ensure seamless scrolling */}
          <span>Brand Identity</span> <span>•</span> 
          <span>Web Design</span> <span>•</span> 
          <span>Motion</span> <span>•</span> 
          <span>Packaging</span> <span>•</span> 
          <span>Senior-Led. Fully Remote. Precision-Built.</span> <span>•</span> 
          <span>Award-calibre creative, without the agency overhead.</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-16 pt-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4">Ego Store</h4>
            <h2 className="text-6xl font-bold tracking-tighter uppercase leading-none">Our Lamps</h2>
          </div>
          <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">
            View Full Collection &rarr;
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="flex flex-col h-[500px] rounded-3xl overflow-hidden shadow-sm group">
              <div className={`h-[60%] ${product.bgColor} relative`}>
                <div className="absolute inset-0 flex items-center justify-center text-black/10 font-bold text-2xl">
                  Image
                </div>
              </div>
              <div className="h-[40%] bg-[#0a0a0a] text-white p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-medium mb-3 leading-tight group-hover:text-[#e0ca94] transition-colors">{product.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{product.desc}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Price</span>
                  <span className="text-xl font-bold">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
