'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExternalLink, LogOut, Plus } from 'lucide-react';
import { logoutUser } from '@/lib/auth';

export default function AdminHeader({ email }: { email: string }) {
  const router = useRouter();

  async function logout() {
    await logoutUser();
    router.replace('/admin/giris');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-white/85 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
        <Link href="/admin" className="font-display text-xl uppercase tracking-wide">
          LuxMebel <span className="text-neutral-500">Admin</span>
        </Link>
        <nav className="flex items-center gap-1.5 sm:gap-2 text-sm font-semibold">
          <Link href="/admin/mehsullar/yeni" className="inline-flex items-center gap-1.5 h-9 px-3 sm:px-4 rounded-full bg-[#111] text-white hover:bg-black">
            <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Yeni məhsul</span>
          </Link>
          <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full hover:bg-black/5" title="Sayta bax">
            <ExternalLink className="w-4 h-4" /> <span className="hidden md:inline">Sayt</span>
          </Link>
          <span className="hidden lg:inline text-neutral-500 font-normal px-2">{email}</span>
          <button type="button" onClick={logout} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full hover:bg-black/5" title="Çıxış">
            <LogOut className="w-4 h-4" /> <span className="hidden md:inline">Çıxış</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
