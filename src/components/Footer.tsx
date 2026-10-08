import React from 'react';

const columns = [
  {
    title: 'Məhsullar',
    links: ['Kolleksiyalar', 'Yeniliklər', 'Xüsusi Sifariş', 'Kataloq'],
  },
  {
    title: 'Şirkət',
    links: ['Haqqımızda', 'Mağazalar', 'Bloq', 'Əlaqə'],
  },
  {
    title: 'Dəstək',
    links: ['Tez-tez verilən suallar', 'Çatdırılma şərtləri', 'Zəmanət', 'Məxfilik Siyasəti'],
  },
];

const socials = [
  {
    label: 'Instagram',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: 'Facebook',
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: 'WhatsApp',
    icon: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  },
  {
    label: 'YouTube',
    icon: (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-paper pt-10 pb-10 px-4 md:px-8 text-black">
      <div className="glass-light max-w-6xl mx-auto rounded-[40px] p-8 md:p-14">
        <div className="flex flex-col md:flex-row gap-14 justify-between">

          {/* Left Side */}
          <div className="max-w-sm">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">LuxMebel</h2>
            <p className="text-neutral-600 mb-8 leading-relaxed text-[15px]">
              Eviniz üçün modern və klassik üslubun mükəmməl ahəngini yaradan, komfortlu və keyfiyyətli mebellər.
            </p>
            <form className="flex bg-white/40 border border-white/50 rounded-full overflow-hidden p-1 w-full max-w-sm">
              <label htmlFor="newsletter" className="sr-only">E-poçt ünvanınız</label>
              <input
                id="newsletter"
                type="email"
                placeholder="E-poçt ünvanınız"
                className="bg-transparent border-none outline-none px-4 text-sm w-full placeholder:text-neutral-500"
              />
              <button type="submit" className="bg-[#111] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors shrink-0">
                Abunə Ol
              </button>
            </form>
          </div>

          {/* Right Side Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-6">{col.title}</h4>
                <ul className="flex flex-col gap-4 text-[15px] text-neutral-600">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="hover:text-black transition-colors">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Socials & Payments */}
        <div className="mt-16 pt-8 flex flex-col-reverse gap-8 md:flex-row justify-between md:items-end border-t border-black/10">
          <p className="text-xs font-medium text-neutral-600">© 2026 LuxMebel. Bütün hüquqlar qorunur.</p>
          <div className="flex flex-col md:items-end gap-4">
            <div className="flex gap-3 items-center">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full bg-white/40 border border-white/60 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8)] flex items-center justify-center text-neutral-800 hover:bg-black hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
            {/* Ödəniş nişanları */}
            <div className="flex gap-2 items-center text-[11px] font-bold uppercase tracking-wide">
               <div className="bg-black text-white px-3 py-1.5 rounded-md">Apple Pay</div>
               <div className="bg-[#1a1a1a] px-3 py-1.5 rounded-md flex items-center justify-center">
                 <span className="w-3.5 h-3.5 bg-[#eb001b] rounded-full"></span>
                 <span className="w-3.5 h-3.5 bg-[#f79e1b] rounded-full -ml-1.5 mix-blend-screen"></span>
               </div>
               <div className="bg-white text-neutral-800 px-3 py-1.5 rounded-md">G Pay</div>
               <div className="bg-white text-[#003087] px-3 py-1.5 rounded-md font-serif italic text-sm leading-none">P</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
