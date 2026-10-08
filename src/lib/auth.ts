'use client';

// Supabase Auth ilə hesab sistemi: e-poçt + şifrə və Google ilə giriş.
import { useSyncExternalStore } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { getBrowserSupabase } from '@/lib/supabase/client';
import { isSupabaseConfigured } from '@/lib/supabase/env';

export type User = { id: string; name: string; email: string; phone: string; avatar?: string };

type AuthState = { user: User | null; loading: boolean };

const INITIAL: AuthState = { user: null, loading: true };
let state: AuthState = INITIAL;
let started = false;
const listeners = new Set<() => void>();

const NOT_CONFIGURED = 'Hesab sistemi hələ aktiv deyil. Bir az sonra yenidən cəhd edin.';

function setState(next: AuthState) {
  state = next;
  listeners.forEach((l) => l());
}

function mapUser(u: SupabaseUser | null | undefined): User | null {
  if (!u) return null;
  const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === 'string' ? v : '');
  const email = u.email ?? '';
  return {
    id: u.id,
    email,
    name: str(meta.full_name) || str(meta.name) || email.split('@')[0],
    phone: str(meta.phone) || u.phone || '',
    avatar: str(meta.avatar_url) || str(meta.picture) || undefined,
  };
}

function start() {
  if (started) return;
  started = true;
  const supabase = getBrowserSupabase();
  if (!supabase) {
    setState({ user: null, loading: false });
    return;
  }
  supabase.auth.getSession().then(({ data }) => {
    setState({ user: mapUser(data.session?.user), loading: false });
  });
  supabase.auth.onAuthStateChange((_event, session) => {
    setState({ user: mapUser(session?.user), loading: false });
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  start();
  return () => {
    listeners.delete(listener);
  };
}

export function useAuth(): AuthState {
  return useSyncExternalStore(subscribe, () => state, () => INITIAL);
}

export function useUser(): User | null {
  return useAuth().user;
}

export const authAvailable = isSupabaseConfigured;

export type AuthResult =
  | { ok: true; user: User | null; needsConfirmation?: boolean }
  | { ok: false; error: string };

function translate(message: string): string {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials')) return 'E-poçt və ya şifrə yanlışdır.';
  if (m.includes('email not confirmed')) return 'E-poçt ünvanınız hələ təsdiqlənməyib. Gələn qutunuzu yoxlayın.';
  if (m.includes('already registered') || m.includes('already been registered')) return 'Bu e-poçt ilə artıq qeydiyyatdan keçilib. Daxil olmağa cəhd edin.';
  if (m.includes('password should be at least')) return 'Şifrə çox qısadır.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Çox sayda cəhd edildi. Bir az sonra yenidən cəhd edin.';
  if (m.includes('same password')) return 'Yeni şifrə əvvəlkindən fərqli olmalıdır.';
  return 'Əməliyyat alınmadı. Bir az sonra yenidən cəhd edin.';
}

export async function registerUser(input: { name: string; email: string; phone: string; password: string }): Promise<AuthResult> {
  const supabase = getBrowserSupabase();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };

  const { data, error } = await supabase.auth.signUp({
    email: input.email.trim().toLowerCase(),
    password: input.password,
    options: {
      data: { full_name: input.name.trim(), phone: input.phone.trim() },
      emailRedirectTo: `${window.location.origin}/auth/callback?next=/hesab`,
    },
  });
  if (error) return { ok: false, error: translate(error.message) };

  // E-poçt artıq mövcuddursa, Supabase təhlükəsizlik üçün xəta əvəzinə boş "identities" qaytarır
  if (data.user && data.user.identities?.length === 0) {
    return { ok: false, error: 'Bu e-poçt ilə artıq qeydiyyatdan keçilib. Daxil olmağa cəhd edin.' };
  }
  return { ok: true, user: mapUser(data.session?.user), needsConfirmation: !data.session };
}

export async function loginUser(email: string, password: string): Promise<AuthResult> {
  const supabase = getBrowserSupabase();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
  if (error) return { ok: false, error: translate(error.message) };
  return { ok: true, user: mapUser(data.user) };
}

export async function signInWithGoogle(next = '/hesab'): Promise<{ ok: false; error: string } | { ok: true }> {
  const supabase = getBrowserSupabase();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
  });
  if (error) return { ok: false, error: translate(error.message) };
  return { ok: true }; // brauzer Google-a yönləndirilir
}

export async function logoutUser() {
  await getBrowserSupabase()?.auth.signOut();
}

export async function requestPasswordReset(email: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = getBrowserSupabase();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: `${window.location.origin}/auth/callback?next=/sifre-yenile`,
  });
  return error ? { ok: false, error: translate(error.message) } : { ok: true };
}

export async function updatePassword(password: string): Promise<{ ok: boolean; error?: string }> {
  const supabase = getBrowserSupabase();
  if (!supabase) return { ok: false, error: NOT_CONFIGURED };
  const { error } = await supabase.auth.updateUser({ password });
  return error ? { ok: false, error: translate(error.message) } : { ok: true };
}
