import React from 'react';

const articles = [
  {
    category: 'Lighting Guide',
    date: '31 Jul 2026',
    title: 'The Art of Pendant Lighting: Choosing the Perfect Drop',
    desc: 'Height, shade size, and bulb type — the three decisions that make or break a pendant installation.',
  },
  {
    category: 'Lighting Guide',
    date: '29 Jul 2026',
    title: 'Warm vs. Cool Light: Understanding Color Temperature',
    desc: 'From 2200K candlelight to 6500K daylight — a practical guide to choosing the right color...',
  },
  {
    category: 'Style & Design',
    date: '26 Jul 2026',
    title: 'Industrial vs. Scandinavian: Two Lighting Philosophies',
    desc: 'Two dominant lighting aesthetics — one raw and unapologetic, the other restrained and organic....',
  }
];

export default function BlogSection() {
  return (
    <section className="bg-[#dcd8d3] text-black pb-32 px-8 md:px-16 border-t border-black/5">
      <div className="max-w-7xl mx-auto pt-32">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase mb-4 text-gray-500">
              Ideas & Inspiration
            </h4>
            <h2 className="text-6xl font-bold tracking-tighter uppercase leading-none">
              From the Blog
            </h2>
          </div>
          <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity mt-6 md:mt-0">
            View All Articles
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-[#e8e6e1] rounded-3xl p-3 shadow-[inset_0_2px_10px_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.05)] border border-white/50 flex flex-col">
              <div className="h-64 bg-[#b5aba0] rounded-2xl mb-6 relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center text-black/10 font-bold text-2xl">Image</div>
              </div>
              <div className="px-5 pb-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider uppercase text-gray-500 mb-4">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span>{article.date}</span>
                </div>
                <h3 className="text-2xl font-medium mb-3 leading-tight text-gray-900">{article.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{article.desc}</p>
                <div className="w-full h-[1px] bg-black/10 mb-6"></div>
                <button className="bg-[#1f1d1e] text-white self-start px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
                  Read Article
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
