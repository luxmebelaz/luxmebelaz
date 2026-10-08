import Image from 'next/image';
import { ShoppingCart, Plus, Check } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#dedede] text-black">
      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-2 py-2 bg-[#f4f4f4] rounded-full shadow-lg shadow-black/5 w-11/12 max-w-4xl border border-white/50">
        <div className="pl-6 text-xl font-bold tracking-tight">EGO</div>
        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-black/60">
          <a href="#" className="hover:text-black">Store</a>
          <a href="#" className="hover:text-black">Blog</a>
          <a href="#" className="hover:text-black">Contact</a>
          <a href="#" className="hover:text-black">Legal</a>
          <button className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
        <button className="px-6 py-2.5 text-xs font-semibold bg-[#111] text-white rounded-full hover:bg-black transition-colors">
          Get Started
        </button>
      </nav>

      {/* Hero */}
      <section className="relative h-[95vh] bg-[#0b0b0b] text-white overflow-hidden flex flex-col justify-end pb-12 px-8 md:px-16">
        <div className="absolute inset-0 z-0">
          <Image src="/Photo/1.png" alt="Hero" fill className="object-cover opacity-60 mix-blend-lighten" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-[family-name:var(--font-inter)] tracking-tighter leading-[0.95] max-w-2xl">
            Light Shapes<br/>Every Space
          </h1>
          <p className="text-xs md:text-sm text-white/60 max-w-[280px] mb-2 font-light leading-relaxed">
            Minimalist lamps where classical sculpture meets generative design technology.
          </p>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-center mt-12 pt-6 border-t border-white/20 text-[10px] md:text-xs font-medium tracking-widest text-white/50 uppercase">
          <div>EGO COLLECTION — EST. 2024</div>
          <a href="#" className="hover:text-white transition-colors">DISCOVER ↓</a>
        </div>
      </section>

      {/* Logos */}
      <section className="bg-[#0b0b0b] py-16 px-8 flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-40">
        <div className="font-bold text-lg md:text-2xl tracking-tighter italic">Coca-Cola</div>
        <div className="font-bold text-lg md:text-xl uppercase tracking-widest">Mercedes</div>
        <div className="font-bold text-lg md:text-xl tracking-widest">TESLA</div>
        <div className="font-bold text-lg md:text-2xl tracking-tighter">airbnb</div>
        <div className="font-bold text-lg md:text-2xl tracking-tighter">Apple</div>
        <div className="font-bold text-lg md:text-xl uppercase tracking-widest">adidas</div>
      </section>

      {/* Manifesto 1 */}
      <section className="bg-[#0b0b0b] pt-24 pb-0 text-white flex flex-col items-center text-center px-6">
        <div className="text-[10px] md:text-xs font-semibold tracking-widest text-white/40 uppercase mb-8">LIGHT MANIFESTO</div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-medium tracking-tighter mb-8 max-w-3xl font-[family-name:var(--font-inter)]">
          Where Form Meets Light<br/>And Light Becomes Art
        </h2>
        <p className="text-xs md:text-sm text-white/60 max-w-xl mb-24 leading-relaxed font-light">
          We craft lamps that go beyond illumination. Each piece is a sculptural object merging classical aesthetics with generative AI design — transforming spaces into unique, living experiences.
        </p>

        {/* The Grey Stats Card */}
        <div className="bg-[#e4e4e4] text-black w-full max-w-5xl rounded-t-[40px] md:rounded-t-[60px] rounded-b-[10px] p-8 md:p-16 lg:p-24 relative overflow-hidden h-72 md:h-96 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="text-left">
              <div className="text-5xl md:text-7xl lg:text-[7rem] font-bold font-[family-name:var(--font-antonio)] tracking-tighter leading-none mb-2">200+</div>
              <div className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest opacity-60">Unique Designs</div>
            </div>
            <div className="text-right">
              <div className="text-5xl md:text-7xl lg:text-[7rem] font-bold font-[family-name:var(--font-antonio)] tracking-tighter leading-none mb-2">98%</div>
              <div className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest opacity-60">Satisfied Clients</div>
            </div>
          </div>
          <div className="flex justify-center text-center absolute bottom-8 md:bottom-12 left-0 right-0">
            <div>
              <div className="text-5xl md:text-7xl lg:text-[7rem] font-bold font-[family-name:var(--font-antonio)] tracking-tighter leading-none mb-2">15</div>
              <div className="text-[9px] md:text-[10px] font-semibold uppercase tracking-widest opacity-60">Years Crafting</div>
            </div>
          </div>
        </div>
      </section>

      {/* Yellow separator */}
      <div className="h-6 w-full bg-[#fdf5b8]" />

      {/* FORM LIGHT ART section */}
      <section className="py-32 md:py-48 px-6 bg-[#dedede] relative flex flex-col items-center text-center overflow-hidden">
        <div className="text-[10px] md:text-xs font-semibold tracking-widest text-black/30 uppercase mb-8 relative z-10">LIGHT MANIFESTO</div>
        
        {/* HUGE background text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] select-none pointer-events-none">
          <div className="text-[15vw] md:text-[12vw] font-bold font-[family-name:var(--font-antonio)] leading-none whitespace-nowrap">
            FORM LIGHT ART
          </div>
        </div>
        
        <p className="text-lg md:text-3xl lg:text-4xl text-black/60 max-w-4xl leading-snug font-light relative z-10 mix-blend-multiply">
          From bridges classical sculpture meets generative design technology — transforming spaces into living, living experiences.
        </p>
      </section>

      {/* Store section (Using images 2,3,4,5) */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-[#dedede]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="text-[10px] md:text-xs font-semibold tracking-widest text-black/40 uppercase mb-2">EGO STORE</div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-antonio)] font-bold tracking-tight uppercase">OUR LAMPS</h2>
          </div>
          <a href="#" className="text-xs font-semibold hover:opacity-70 transition-opacity uppercase tracking-widest">View Full Collection →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Alabaster Globe Pendant', desc: 'Mouth-blown alabaster glass', price: '€800', img: '/Photo/2.png' },
            { name: 'Matte Black Cone', desc: 'Powder-coated steel', price: '€1.400', img: '/Photo/3.png' },
            { name: 'Brass Arc Floor Lamp', desc: 'Brushed brass-plated steel', price: '€98', img: '/Photo/4.png' },
            { name: 'Ribbed Ceramic Table', desc: 'Hand-thrown ribbed ceramic', price: '€450', img: '/Photo/5.png' },
          ].map((product, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[3/4] bg-[#e4e4e4] rounded-2xl mb-6 overflow-hidden shadow-sm border border-white/50">
                <Image src={product.img} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold tracking-tight leading-snug">{product.name}</h3>
                <p className="text-xs text-black/50">{product.desc}</p>
                <div className="text-sm font-semibold mt-2">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-[#dedede]">
        <div className="text-[10px] md:text-xs font-semibold tracking-widest text-black/40 uppercase mb-2">SHOP BY TYPE</div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-antonio)] font-bold tracking-tight mb-16 uppercase">OUR CATEGORIES</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#e9e9e9] border border-white/40 p-10 md:p-12 rounded-[32px] md:rounded-[40px] flex flex-col shadow-sm">
            <div className="w-10 h-10 mb-16 opacity-70 border border-black rounded-full flex items-center justify-center">
               <div className="w-2.5 h-5 border-b-2 border-x-2 border-black rounded-b-sm" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-antonio)] mb-4 uppercase">Floor</h3>
            <p className="text-xs md:text-sm text-black/60 mb-12 flex-grow leading-relaxed max-w-xs">Floor lamps for living, study, and bedroom environments. Adjustable height and unique sculptural designs.</p>
            <a href="#" className="text-xs font-semibold hover:opacity-70">View Floor</a>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111] text-white p-10 md:p-12 rounded-[32px] md:rounded-[40px] flex flex-col shadow-xl">
            <div className="w-10 h-10 mb-16 opacity-70 border border-white rounded-full flex items-center justify-center">
               <div className="w-4 h-4 bg-white rounded-full" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-antonio)] mb-4 uppercase">Table</h3>
            <p className="text-xs md:text-sm text-white/60 mb-12 flex-grow leading-relaxed max-w-xs">Table lamps crafted from ceramic, glass, and brass. Ideal for bedside, office, and reading nooks.</p>
            <a href="#" className="text-xs font-semibold hover:opacity-70">View Table</a>
          </div>

          {/* Card 3 */}
          <div className="bg-[#e9e9e9] border border-white/40 p-10 md:p-12 rounded-[32px] md:rounded-[40px] flex flex-col shadow-sm">
            <div className="w-10 h-10 mb-16 opacity-70 border border-black rounded-full flex items-center justify-center">
               <div className="w-4 h-2.5 border-t-2 border-x-2 border-black rounded-t-sm" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-antonio)] mb-4 uppercase">Pendant</h3>
            <p className="text-xs md:text-sm text-black/60 mb-12 flex-grow leading-relaxed max-w-xs">Suspended pendants that transform any ceiling into a focal point. From minimalist to sculptural forms.</p>
            <a href="#" className="text-xs font-semibold hover:opacity-70">View Pendant</a>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-[#dedede]">
        <div className="text-[10px] md:text-xs font-semibold tracking-widest text-black/40 uppercase mb-2">SOCIAL PROOF</div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-antonio)] font-bold tracking-tight mb-16 uppercase">OUR CLIENTS</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start pl-8 pt-4">
             <div className="relative w-32 h-40 md:w-40 md:h-48 bg-black/5 rounded-xl overflow-hidden border border-white/50 -rotate-6 z-10 shadow-lg">
                <Image src="/Photo/6.png" alt="Client" fill className="object-cover opacity-90" />
             </div>
             <div className="relative w-32 h-40 md:w-40 md:h-48 bg-black/5 rounded-xl overflow-hidden border border-white/50 ml-12 -mt-16 rotate-3 z-20 shadow-lg">
                <Image src="/Photo/7.png" alt="Client" fill className="object-cover opacity-90" />
             </div>
             <div className="relative w-32 h-40 md:w-40 md:h-48 bg-black/5 rounded-xl overflow-hidden border border-white/50 ml-6 -mt-16 -rotate-2 z-30 shadow-lg">
                <Image src="/Photo/8.png" alt="Client" fill className="object-cover opacity-90" />
             </div>
          </div>
          <div className="lg:col-span-8 pt-8 lg:pt-16">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.3] mb-12 max-w-3xl text-black/90">
              Switching to this platform transformed the way our team collaborates. Everything is faster, cleaner, and incredibly intuitive. We saw measurable improvements within the first few weeks.
            </h3>
            <div className="flex items-center gap-4 mb-16 md:mb-24">
              <div className="font-bold text-sm">Sarah Mitchell</div>
              <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-black/50">Product Director, Nova Labs</div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-12 max-w-2xl">
               <div>
                 <div className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-antonio)] tracking-tighter mb-3">2.8x</div>
                 <div className="text-[9px] md:text-[10px] text-black/50 uppercase tracking-widest">faster team collaboration</div>
               </div>
               <div>
                 <div className="text-4xl md:text-6xl font-bold font-[family-name:var(--font-antonio)] tracking-tighter mb-3">42%</div>
                 <div className="text-[9px] md:text-[10px] text-black/50 uppercase tracking-widest">increase in productivity</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-[#dedede]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="text-[10px] md:text-xs font-semibold tracking-widest text-black/40 uppercase mb-2">IDEAS & INSPIRATION</div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-antonio)] font-bold tracking-tight uppercase">FROM THE BLOG</h2>
          </div>
          <a href="#" className="text-xs font-semibold hover:opacity-70 transition-opacity">View All Articles</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: 'LIGHTING GUIDE', date: '31 JUL 2026', title: 'The Art of Pendant Lighting: Choosing the Perfect Drop', desc: 'Height, shade size, and bulb type — the three decisions that make or break a pendant installation.', img: '/Photo/6.png' },
            { tag: 'LIGHTING GUIDE', date: '29 JUL 2026', title: 'Warm vs. Cool Light: Understanding Color Temperature', desc: 'From 2200K candlelight to 6500K daylight — a practical guide to choosing the right color temperature for every room.', img: '/Photo/7.png' },
            { tag: 'STYLE & DESIGN', date: '26 JUL 2026', title: 'Industrial vs. Scandinavian: Two Lighting Philosophies', desc: 'Two dominant lighting aesthetics — one raw and unapologetic, the other restrained and organic...', img: '/Photo/8.png' }
          ].map((post, i) => (
            <div key={i} className="bg-[#e9e9e9] border border-white/50 rounded-[32px] p-8 md:p-10 flex flex-col shadow-sm relative overflow-hidden group min-h-[400px]">
              <div className="absolute inset-0 opacity-10 mix-blend-multiply z-0">
                 <Image src={post.img} alt="blog" fill className="object-cover" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 text-[9px] font-semibold tracking-widest text-black/50 mb-8 uppercase">
                  <span>{post.tag}</span>
                  <span className="w-1 h-1 rounded-full bg-black/20" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 leading-snug">{post.title}</h3>
                <p className="text-xs md:text-sm text-black/60 mb-12 leading-relaxed flex-grow">{post.desc}</p>
                <div className="mt-auto">
                  <span className="inline-flex px-6 py-3 bg-[#111] text-white text-[10px] font-bold rounded-full uppercase tracking-widest group-hover:bg-black transition-colors">
                    Read Article
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQS & Contact */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-[#dedede]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          {/* FAQs */}
          <div>
            <div className="text-[10px] md:text-xs font-semibold tracking-widest text-black/40 uppercase mb-2">GOOD TO KNOW</div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-antonio)] font-bold tracking-tight uppercase mb-8">FAQS</h2>
            <p className="text-3xl md:text-4xl tracking-tight font-medium mb-8 leading-snug">
              Everything about lead times, light and living with our lamps.
            </p>
            <p className="text-sm text-black/60 mb-12 max-w-md leading-relaxed">
              Still unsure about a fixture, a ceiling height or a finish? Write to us and the studio replies with a concrete recommendation.
            </p>
            <div className="text-[9px] text-black/40 tracking-widest uppercase font-semibold mb-12 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-black/40" /> STUDIO REPLIES WITHIN ONE BUSINESS DAY
            </div>

            <div className="space-y-3">
              {[
                'How long does delivery take?',
                'Which bulb and colour temperature should I use?',
                'Can you help me plan the lighting for a whole room?',
                'Do the lamps come ready to install?',
                'What is your returns and warranty policy?',
                'Do you ship internationally?'
              ].map((faq, i) => (
                <div key={i} className="flex justify-between items-center p-5 md:p-6 bg-[#e4e4e4] border border-white/50 rounded-xl md:rounded-2xl cursor-pointer hover:bg-[#ebebeb] transition-colors shadow-sm">
                  <span className="text-sm font-semibold">{faq}</span>
                  <Plus className="w-4 h-4 opacity-50" />
                </div>
              ))}
            </div>
          </div>

          {/* Let's Talk */}
          <div>
            <div className="text-[10px] md:text-xs font-semibold tracking-widest text-black/40 uppercase mb-2">GET IN TOUCH</div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-antonio)] font-bold tracking-tight uppercase mb-8">LET'S TALK</h2>
            <p className="text-3xl md:text-4xl tracking-tight font-medium mb-8 leading-snug">
              Looking for the right light for your space?
            </p>
            
            <ul className="space-y-4 mb-12 text-[11px] md:text-xs font-semibold opacity-70 tracking-wide">
              <li className="flex items-center gap-3"><Check className="w-4 h-4" /> LIGHTING PLAN TAILORED TO YOUR SPACE</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4" /> RECOMMENDED LAMPS AND FINISHES</li>
              <li className="flex items-center gap-3"><Check className="w-4 h-4" /> DELIVERY AND INSTALLATION TIMELINE</li>
            </ul>

            <div className="text-[9px] text-black/40 tracking-widest uppercase font-semibold mb-12 flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-black/40" /> WE REPLY WITHIN 4 HOURS TO ARRANGE A CALL WITH A LIGHTING DESIGNER.
            </div>
            
            <div className="bg-[#e4e4e4] border border-white/50 p-8 md:p-10 lg:p-12 rounded-3xl md:rounded-[32px] shadow-sm">
              <form className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <input type="text" placeholder="NAME*" className="w-full bg-transparent border-b border-black/20 pb-3 text-[10px] md:text-xs font-semibold tracking-widest focus:outline-none focus:border-black" />
                    <input type="email" placeholder="EMAIL*" className="w-full bg-transparent border-b border-black/20 pb-3 text-[10px] md:text-xs font-semibold tracking-widest focus:outline-none focus:border-black" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <input type="text" placeholder="CITY / COUNTRY*" className="w-full bg-transparent border-b border-black/20 pb-3 text-[10px] md:text-xs font-semibold tracking-widest focus:outline-none focus:border-black" />
                    <input type="tel" placeholder="PHONE" className="w-full bg-transparent border-b border-black/20 pb-3 text-[10px] md:text-xs font-semibold tracking-widest focus:outline-none focus:border-black" />
                 </div>
                 <div className="pt-2">
                    <label className="block text-[9px] md:text-[10px] text-black/50 mb-3 tracking-widest font-semibold">WHERE WILL THE LAMP LIVE?*</label>
                    <select className="w-full bg-transparent border-b border-black/20 pb-3 text-[10px] md:text-xs font-semibold tracking-widest focus:outline-none focus:border-black appearance-none">
                       <option>Select a space</option>
                    </select>
                 </div>
                 <div className="pt-2">
                    <input type="text" placeholder="TELL US ABOUT THE SPACE*" className="w-full bg-transparent border-b border-black/20 pb-3 text-[10px] md:text-xs font-semibold tracking-widest focus:outline-none focus:border-black" />
                 </div>
                 <div className="pt-8">
                    <button type="button" className="w-full py-5 bg-[#111] text-white text-[10px] md:text-xs font-bold rounded-full hover:bg-black transition-colors uppercase tracking-widest">
                      Request My Lighting Plan
                    </button>
                 </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#dedede] px-6 pb-6">
        <div className="max-w-7xl mx-auto bg-[#e1e1e1] border border-white/50 rounded-[32px] md:rounded-[40px] p-8 md:p-12 lg:p-16 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="text-3xl font-bold tracking-tight mb-4">EGO</div>
              <p className="text-xs text-black/60 max-w-xs mb-8 leading-relaxed">
                Liquid glass interfaces, crafted with care for modern products and teams that love detail.
              </p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="bg-black/5 border border-black/10 rounded-full px-5 py-3 text-xs w-56 focus:outline-none font-semibold" />
                <button className="px-6 py-3 bg-[#111] text-white text-[10px] tracking-widest font-bold rounded-full hover:bg-black transition-colors uppercase">Subscribe</button>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-[10px] font-bold tracking-widest uppercase mb-6 opacity-50">Product</h4>
              <ul className="space-y-4 text-xs font-semibold">
                <li><a href="#" className="hover:opacity-60 transition-opacity">Collection</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Blog</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Contact</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Legal</a></li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <h4 className="text-[10px] font-bold tracking-widest uppercase mb-6 opacity-50">Company</h4>
              <ul className="space-y-4 text-xs font-semibold">
                <li><a href="#" className="hover:opacity-60 transition-opacity">About EGO</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Shop</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Articles</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Contact</a></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[10px] font-bold tracking-widest uppercase mb-6 opacity-50">Resources</h4>
              <ul className="space-y-4 text-xs font-semibold">
                <li><a href="#" className="hover:opacity-60 transition-opacity">Blog</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Support</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Community</a></li>
                <li><a href="#" className="hover:opacity-60 transition-opacity">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-black/10 pt-8 gap-4">
             <div className="text-[10px] text-black/40 tracking-wider">Create a free website with Framer...</div>
             <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-xs font-semibold">X</div>
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-xs font-semibold">In</div>
                <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-xs font-semibold">Ig</div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
