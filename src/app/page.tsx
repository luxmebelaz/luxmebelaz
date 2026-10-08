import Image from 'next/image';
import { ArrowRight, ChevronRight, Menu } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="text-2xl font-bold tracking-tighter">EGO</div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#" className="hover:text-white transition-colors">Store</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">Legal</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:block px-5 py-2.5 text-sm font-semibold bg-white text-black rounded-full hover:bg-white/90 transition-colors">
            Get Started
          </button>
          <button className="md:hidden">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <Image src="/Photo/1.png" alt="Hero Background" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] mb-8 uppercase">
              Light<br/>Shapes<br/>Every<br/>Space
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 font-light">
              Minimalist lamps where classical sculpture meets generative design technology.
              <br/>Ego Collection — Est. 2024
            </p>
            <button className="flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform">
              DISCOVER <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Manifesto Section */}
        <section className="py-24 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-8">Light Manifesto</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                  Where Form<br/>Meets Light<br/>And Light<br/>Becomes Art
                </h2>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-12">
                  We craft lamps that go beyond illumination. Each piece is a sculptural object merging classical aesthetics with generative AI design — transforming spaces into unique, living experiences.
                </p>
                <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
                  <div>
                    <div className="text-4xl font-bold mb-2">200+</div>
                    <div className="text-sm text-white/50 uppercase tracking-wider">Unique Designs</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">15</div>
                    <div className="text-sm text-white/50 uppercase tracking-wider">Years Crafting</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">98%</div>
                    <div className="text-sm text-white/50 uppercase tracking-wider">Satisfied Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Store Section */}
        <section className="py-24 px-6 bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <div className="text-sm font-semibold tracking-widest text-black/50 uppercase mb-4">EGO STORE</div>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Our Lamps</h2>
              </div>
              <a href="#" className="flex items-center gap-2 font-semibold hover:gap-4 transition-all">
                View Full Collection <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { name: 'Alabaster Globe Pendant', desc: 'Mouth-blown alabaster glass, brass hardware', price: '€800', img: '/Photo/2.png' },
                { name: 'Matte Black Cone Pendant', desc: 'Powder-coated steel, braided textile cord', price: '€1.400', img: '/Photo/3.png' },
                { name: 'Brass Arc Floor Lamp', desc: 'Brushed brass-plated steel, marble base, linen shade', price: '€98', img: '/Photo/4.png' },
                { name: 'Ribbed Ceramic Table Lamp', desc: 'Hand-thrown ribbed ceramic, cotton drum shade', price: '€450', img: '/Photo/5.png' },
              ].map((product, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-[4/5] bg-gray-100 mb-6 overflow-hidden">
                    <Image src={product.img} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                      <p className="text-black/60">{product.desc}</p>
                    </div>
                    <div className="text-xl font-medium">{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 px-6 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto">
            <div className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4">SHOP BY TYPE</div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-16">Our Categories</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Floor', desc: 'Floor lamps for living, study, and bedroom environments. Adjustable height and unique sculptural designs.', link: 'View Floor', img: '/Photo/6.png' },
                { title: 'Table', desc: 'Table lamps crafted from ceramic, glass, and brass. Ideal for bedside, office, and reading nooks.', link: 'View Table', img: '/Photo/7.png' },
                { title: 'Pendant', desc: 'Suspended pendants that transform any ceiling into a focal point. From minimalist to sculptural forms.', link: 'View Pendant', img: '/Photo/8.png' },
              ].map((cat, i) => (
                <div key={i} className="flex flex-col group">
                  <div className="relative aspect-square bg-white/5 mb-8 overflow-hidden rounded-2xl">
                    <Image src={cat.img} alt={cat.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{cat.title}</h3>
                  <p className="text-white/60 mb-8 flex-grow">{cat.desc}</p>
                  <a href="#" className="flex items-center gap-2 font-semibold text-white/90 hover:text-white">
                    {cat.link} <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 px-6 border-y border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-16 text-center">SOCIAL PROOF</div>
            
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-medium leading-tight mb-16">
                "Switching to this platform transformed the way our team collaborates. Everything is faster, cleaner, and incredibly intuitive. We saw measurable improvements within the first few weeks."
              </h2>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 mb-4 overflow-hidden relative">
                  <Image src="/Photo/1.png" alt="Sarah Mitchell" fill className="object-cover" />
                </div>
                <div className="font-bold text-lg">Sarah Mitchell</div>
                <div className="text-white/50 mb-12">Product Director, Nova Labs</div>
                
                <div className="flex justify-center gap-16 border-t border-white/10 pt-12 w-full">
                  <div>
                    <div className="text-4xl font-bold mb-2">2.8x</div>
                    <div className="text-sm text-white/50">faster team collaboration</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold mb-2">42%</div>
                    <div className="text-sm text-white/50">increase in productivity</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-24 px-6 bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <div className="text-sm font-semibold tracking-widest text-black/50 uppercase mb-4">IDEAS & INSPIRATION</div>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">From the Blog</h2>
              </div>
              <a href="#" className="flex items-center gap-2 font-semibold hover:gap-4 transition-all">
                View All Articles <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { category: 'Lighting Guide', date: '31 jul 2026', title: 'The Art of Pendant Lighting: Choosing the Perfect Drop', desc: 'Height, shade size, and bulb type — the three decisions that make or break a pendant installation.', img: '/Photo/2.png' },
                { category: 'Lighting Guide', date: '29 jul 2026', title: 'Warm vs. Cool Light: Understanding Color Temperature', desc: 'From 2200K candlelight to 6500K daylight — a practical guide to choosing the right color temperature for every room.', img: '/Photo/3.png' },
                { category: 'Style & Design', date: '26 jul 2026', title: 'Industrial vs. Scandinavian: Two Lighting Philosophies', desc: 'Two dominant lighting aesthetics — one raw and unapologetic, the other restrained and organic. Here\'s how they differ and when to mix them.', img: '/Photo/4.png' }
              ].map((post, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] bg-gray-100 mb-6 overflow-hidden rounded-xl">
                    <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex items-center gap-4 text-sm font-semibold text-black/50 mb-4">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-black/20" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                  <p className="text-black/60 mb-6">{post.desc}</p>
                  <span className="font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ & Contact Section */}
        <section className="py-24 px-6 bg-black text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
            
            {/* FAQ */}
            <div>
              <div className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4">GOOD TO KNOW</div>
              <h2 className="text-5xl font-bold tracking-tighter mb-8">FAQs</h2>
              <p className="text-xl text-white/70 mb-12">Everything about lead times, light and living with our lamps.</p>
              
              <div className="space-y-6 border-t border-white/10 pt-8">
                {[
                  'How long does delivery take?',
                  'Which bulb and colour temperature should I use?',
                  'Can you help me plan the lighting for a whole room?',
                  'Do the lamps come ready to install?',
                  'What is your returns and warranty policy?',
                  'Do you ship internationally?'
                ].map((faq, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-white/10 cursor-pointer hover:text-white/70 transition-colors">
                    <span className="text-lg font-medium">{faq}</span>
                    <ChevronRight className="w-5 h-5 text-white/50" />
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#111] p-8 md:p-12 rounded-3xl">
              <div className="text-sm font-semibold tracking-widest text-white/50 uppercase mb-4">GET IN TOUCH</div>
              <h2 className="text-4xl font-bold tracking-tighter mb-6">Let’s Talk</h2>
              <p className="text-white/70 mb-12">Looking for the right light for your space?</p>
              
              <ul className="space-y-4 mb-12 text-white/80">
                <li className="flex items-center gap-3"><ArrowRight className="w-4 h-4 text-white/50" /> Lighting plan tailored to your space</li>
                <li className="flex items-center gap-3"><ArrowRight className="w-4 h-4 text-white/50" /> Recommended lamps and finishes</li>
                <li className="flex items-center gap-3"><ArrowRight className="w-4 h-4 text-white/50" /> Delivery and installation timeline</li>
              </ul>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="NAME*" className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-white transition-colors" />
                  <input type="email" placeholder="EMAIL*" className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-white transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="CITY / COUNTRY*" className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-white transition-colors" />
                  <input type="tel" placeholder="PHONE" className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-white transition-colors" />
                </div>
                
                <div className="pt-6">
                  <label className="block text-sm text-white/50 mb-4">WHERE WILL THE LAMP LIVE?*</label>
                  <select className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-white transition-colors appearance-none">
                    <option value="" disabled selected>Select a space</option>
                    <option value="living" className="text-black">Living room</option>
                    <option value="dining" className="text-black">Dining room</option>
                    <option value="bedroom" className="text-black">Bedroom</option>
                    <option value="office" className="text-black">Studio or office</option>
                    <option value="retail" className="text-black">Hospitality or retail</option>
                    <option value="full" className="text-black">Full project, several rooms</option>
                  </select>
                </div>

                <div className="pt-6">
                  <input type="text" placeholder="TELL US ABOUT THE SPACE*" className="w-full bg-transparent border-b border-white/20 pb-3 focus:outline-none focus:border-white transition-colors" />
                </div>

                <div className="pt-8">
                  <p className="text-xs text-white/50 mb-6 uppercase tracking-wider">By submitting, you agree to our terms and privacy policy.</p>
                  <button className="w-full py-5 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors">
                    REQUEST MY LIGHTING PLAN
                  </button>
                  <p className="text-center text-sm text-white/50 mt-6">We reply within 4 hours to arrange a call with a lighting designer.</p>
                </div>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="text-4xl font-bold tracking-tighter mb-6">EGO</div>
            <p className="text-white/60 max-w-sm mb-8">Liquid glass interfaces, crafted with care for modern products and teams that love detail.</p>
            <div className="flex gap-4">
              <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded-full px-6 py-3 w-64 focus:outline-none focus:border-white/30" />
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors">Subscribe</button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Legal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#" className="hover:text-white transition-colors">About EGO</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shop</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Articles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-white/40">
          <p>Create a free website with Framer, the website builder loved by startups, designers and agencies.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
