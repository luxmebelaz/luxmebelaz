import 'server-only';

import { redirect } from 'next/navigation';
import { getServerSupabase } from '@/lib/supabase/server';

// Admin panelə giriş icazəsi olan e-poçtlar: Vercel-də ADMIN_EMAILS (vergüllə ayrılmış).
// Təyin olunmayıbsa, heç kim admin deyil.
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export type AdminUser = { id: string; email: string };

// Cookie sessiyasını Supabase serverində yoxlayır (getUser — tokeni serverdə təsdiqləyir)
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await getServerSupabase();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  if (!data.user || !email || !adminEmails().includes(email)) return null;
  return { id: data.user.id, email };
}

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminUser();
  if (!admin) redirect('/admin/giris');
  return admin;
}
