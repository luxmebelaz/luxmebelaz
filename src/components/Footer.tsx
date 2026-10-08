import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import PaymentBadges from '@/components/PaymentBadges';
import { site } from '@/lib/site';

const columns = [
  {
    title: 'Mağaza',
    links: [
      { label: 'Bütün məhsullar', href: '/magaza' },
      { label: 'Kateqoriyalar', href: '/kateqoriyalar' },
      { label: 'Səbət', href: '/sebet' },
      { label: 'Hesabım', href: '/hesab' },
    ],
  },
  {
    title: 'Şirkət',
    links: [
      { label: 'Haqqımızda', href: '/haqqimizda' },
      { label: 'Bloq', href: '/bloq' },
      { label: 'Əlaqə', href: '/elaqe' },
      { label: 'Suallar', href: '/suallar' },
    ],
  },
  {
    title: 'Dəstək',
    links: [
      { label: 'Çatdırılma şərtləri', href: '/catdirilma' },
      { label: 'Zəmanət', href: '/zemanet' },
      { label: 'Məxfilik siyasəti', href: '/mexfilik' },
      { label: 'İstifadə şərtləri', href: '/sertler' },
    ],
  },
];

const socials = [
  {
    label: 'Instagram',
    href: site.social.instagram,
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
    href: site.social.facebook,
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
];

export default function Footer() {
  return (
    <footer className="bg-paper pt-10 pb-8 px-3 md:px-8 text-black">
      <div className="glass-light max-w-6xl mx-auto rounded-[32px] md:rounded-[40px] p-6 sm:p-8 md:p-14">
        <div className="flex flex-col lg:flex-row gap-12 justify-between">

          {/* Left Side */}
          <div className="max-w-sm">
            <Link href="/" className="inline-block text-3xl font-extrabold tracking-tight mb-4">LuxMebel</Link>
            <p className="text-neutral-700 mb-6 leading-relaxed text-[15px]">
              Eviniz üçün modern və klassik üslubun mükəmməl ahəngini yaradan, komfortlu və keyfiyyətli mebellər.
            </p>
            <ul className="flex flex-col gap-3 text-[15px] mb-6">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 font-semibold hover:opacity-70 transition-opacity">
                  <Phone className="w-4 h-4 shrink-0" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="flex items-center gap-3 font-semibold hover:opacity-70 transition-opacity break-all">
                  <Mail className="w-4 h-4 shrink-0" /> {site.email}
                </a>
              </li>
              <li>
                <a href={site.map.openUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold hover:opacity-70 transition-opacity">
                  <MapPin className="w-4 h-4 shrink-0" /> Xəritədə bax
                </a>
              </li>
            </ul>
            <div className="flex gap-3 items-center">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 rounded-full bg-white/40 border border-white/60 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8)] flex items-center justify-center text-neutral-800 hover:bg-black hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-10 md:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold tracking-[0.18em] uppercase mb-5">{col.title}</h4>
                <ul className="flex flex-col gap-3.5 text-[15px] text-neutral-700">
                  {col.links.map((link) => (
                    <li key={link.href}><Link href={link.href} className="hover:text-black transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: payments, copyright, VÖEN */}
        <div className="mt-14 pt-8 flex flex-col gap-6 md:flex-row justify-between md:items-center border-t border-black/10">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-medium text-neutral-700">© 2026 LuxMebel. Bütün hüquqlar qorunur.</p>
            <p className="text-[11px] text-neutral-600">VÖEN: {site.voen}</p>
          </div>
          <PaymentBadges />
        </div>
      </div>
    </footer>
  );
}
