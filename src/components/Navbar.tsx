'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { Menu, Phone, ShoppingCart, User as UserIcon, X } from 'lucide-react';
import { navLinks, site } from '@/lib/site';
import { useCart } from '@/lib/cart';
import { useUser } from '@/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { count } = useCart();
  const user = useUser();
  const [open, setOpen] = useState(false);

  // Mobil menyu açıq olarkən səhifənin sürüşməsini dayandır
  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Ana səhifədəykən "Ana səhifə" axışla yuxarı qaytarır, başqa səhifədən isə ana səhifəyə keçir
  const handleHome = (e: React.MouseEvent) => {
    setOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      if (lenis) lenis.scrollTo(0, { duration: 1.6 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const close = () => setOpen(false);

  const firstName = user?.name.split(' ')[0];

  return (
    <header className="fixed top-3 md:top-5 left-0 right-0 z-50 flex justify-center px-3 md:px-4">
      <div className="w-full max-w-6xl relative">
        <nav
          aria-label="Əsas menyu"
          className="flex items-center gap-2 bg-gradient-to-b from-[#ececec] to-[#cbcbcb] text-black pl-5 pr-2 py-2 rounded-full border border-white/70 shadow-[inset_0_2px_6px_rgba(255,255,255,0.9),0_12px_40px_rgba(0,0,0,0.35)]"
        >
          <Link
            href="/"
            onClick={handleHome}
            className="text-xl md:text-2xl font-extrabold tracking-tight mr-auto lg:mr-4 lg:shrink-0"
          >
            LuxMebel
          </Link>

          <ul className="hidden lg:flex items-center gap-0.5 mr-auto">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={link.href === '/' ? handleHome : undefined}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                    isActive(link.href)
                      ? 'bg-black/10 text-black'
                      : 'text-neutral-600 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/sebet"
            aria-label={`Səbət${count ? `, ${count} məhsul` : ''}`}
            className="relative w-11 h-11 shrink-0 flex items-center justify-center rounded-full border border-black/80 text-black hover:bg-black hover:text-white transition-colors"
          >
            <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.75} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-black text-white text-[11px] font-bold flex items-center justify-center ring-2 ring-[#dcdcdc]">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>

          <Link
            href={user ? '/hesab' : '/qeydiyyat'}
            className="hidden sm:flex items-center gap-2 bg-[#111] shadow-[inset_0_2px_8px_rgba(255,255,255,0.22)] text-white px-5 h-11 rounded-full text-sm font-semibold hover:bg-black transition-colors whitespace-nowrap"
          >
            {user && <UserIcon className="w-4 h-4" />}
            {user ? firstName : 'Qeydiyyat'}
          </Link>

          <button
            type="button"
            aria-label={open ? 'Menyunu bağla' : 'Menyunu aç'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-11 h-11 shrink-0 flex items-center justify-center rounded-full bg-[#111] text-white"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {open && (
          <div
            id="mobile-menu"
            className="lg:hidden absolute left-0 right-0 top-full mt-2 rounded-3xl bg-gradient-to-b from-[#ececec] to-[#d2d2d2] border border-white/70 shadow-[0_24px_60px_rgba(0,0,0,0.45)] p-3 max-h-[calc(100dvh-6rem)] overflow-y-auto"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={link.href === '/' ? handleHome : close}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-base font-semibold ${
                      isActive(link.href) ? 'bg-black/10' : 'active:bg-black/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-black/10">
              <Link
                href="/giris"
                onClick={close}
                className={`${user ? 'hidden' : 'flex'} items-center justify-center h-12 rounded-full border border-black/80 text-sm font-semibold`}
              >
                Giriş
              </Link>
              <Link
                href={user ? '/hesab' : '/qeydiyyat'}
                onClick={close}
                className={`${user ? 'col-span-2' : ''} flex items-center justify-center h-12 rounded-full bg-[#111] text-white text-sm font-semibold`}
              >
                {user ? `Hesabım (${firstName})` : 'Qeydiyyat'}
              </Link>
            </div>
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-2 mt-3 py-3 text-sm font-semibold text-neutral-700"
            >
              <Phone className="w-4 h-4" />
              {site.phone}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
