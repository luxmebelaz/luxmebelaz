'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';
import { Menu, Phone, Search, ShoppingCart, User as UserIcon, X } from 'lucide-react';
import { navLinks, site } from '@/lib/site';
import { useCart } from '@/lib/cart';
import { useUser } from '@/lib/auth';
import { panels } from '@/lib/ui';

const iconButton =
  'relative w-10 h-10 shrink-0 flex items-center justify-center rounded-full text-black hover:bg-black hover:text-white transition-colors';

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

  const searchButton = (
    <button type="button" aria-label="Axtarış" onClick={() => { setOpen(false); panels.openSearch(); }} className={iconButton}>
      <Search className="w-[18px] h-[18px]" strokeWidth={1.9} />
    </button>
  );

  const cartButton = (
    <button
      type="button"
      aria-label={`Səbət${count ? `, ${count} məhsul` : ''}`}
      onClick={() => { setOpen(false); panels.openCart(); }}
      className={iconButton}
    >
      <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.9} />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#dcdcdc]">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </button>
  );

  const logo = (
    <Link href="/" onClick={handleHome} className="text-xl lg:text-[22px] font-extrabold tracking-tight leading-none whitespace-nowrap">
      LuxMebel
    </Link>
  );

  return (
    <header className="fixed top-3 md:top-4 left-0 right-0 z-50 flex justify-center px-3 md:px-4">
      <div className="w-full max-w-5xl relative">
        <nav
          aria-label="Əsas menyu"
          className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 bg-gradient-to-b from-[#ececec] to-[#cbcbcb] text-black px-2 lg:pl-6 lg:pr-2 py-1.5 rounded-full border border-white/70 shadow-[inset_0_2px_6px_rgba(255,255,255,0.9),0_12px_40px_rgba(0,0,0,0.35)]"
        >
          {/* Sol: mobildə axtarış + səbət, masaüstündə loqo */}
          <div className="justify-self-start flex items-center gap-1">
            <div className="lg:hidden flex items-center gap-1">
              {searchButton}
              {cartButton}
            </div>
            <div className="hidden lg:block">{logo}</div>
          </div>

          {/* Mərkəz: mobildə loqo, masaüstündə linklər */}
          <div className="justify-self-center">
            <div className="lg:hidden">{logo}</div>
            <ul className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={link.href === '/' ? handleHome : undefined}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-semibold transition-colors whitespace-nowrap ${
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
          </div>

          {/* Sağ: masaüstündə axtarış, səbət, qeydiyyat; mobildə hamburger */}
          <div className="justify-self-end flex items-center gap-1">
            <div className="hidden lg:flex items-center gap-1">
              {searchButton}
              {cartButton}
              <Link
                href={user ? '/hesab' : '/qeydiyyat'}
                className="ml-1 flex items-center gap-2 bg-[#111] shadow-[inset_0_2px_8px_rgba(255,255,255,0.22)] text-white px-5 h-10 rounded-full text-[13.5px] font-semibold hover:bg-black transition-colors whitespace-nowrap"
              >
                {user && <UserIcon className="w-4 h-4" />}
                {user ? firstName : 'Qeydiyyat'}
              </Link>
            </div>
            <button
              type="button"
              aria-label={open ? 'Menyunu bağla' : 'Menyunu aç'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-[#111] text-white"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
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
                    className={`flex items-center px-4 py-3.5 rounded-2xl text-base font-semibold ${
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
