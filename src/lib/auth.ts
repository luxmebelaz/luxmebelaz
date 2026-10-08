'use client';

// DİQQƏT: Bu yerli (brauzer daxili) DEMO hesab sistemidir. Real hesab yaratmır və
// başqa cihazda işləmir. Supabase Auth qoşulanda register/login/logout funksiyalarının
// daxili hissəsi supabase.auth.* çağırışları ilə əvəz olunmalıdır (imzalar eyni qala bilər).
import { useSyncExternalStore } from 'react';

export type User = { name: string; email: string; phone: string };

type StoredUser = User & { salt: string; hash: string };

const USERS_KEY = 'luxmebel:users';
const SESSION_KEY = 'luxmebel:session';

let sessionCache: User | null = null;
let loaded = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

async function sha256(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const u = JSON.parse(raw);
    return u && typeof u.email === 'string' ? { name: u.name, email: u.email, phone: u.phone } : null;
  } catch {
    return null;
  }
}

function setSession(user: User | null) {
  sessionCache = user;
  try {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    // saxlama mümkün deyil — sessiya yalnız cari səhifədə qalır
  }
  emit();
}

export type AuthResult = { ok: true; user: User } | { ok: false; error: string };

export async function registerUser(input: User & { password: string }): Promise<AuthResult> {
  const email = input.email.trim().toLowerCase();
  const users = readUsers();
  if (users.some((u) => u.email === email)) {
    return { ok: false, error: 'Bu e-poçt ilə artıq qeydiyyatdan keçilib. Daxil olmağa cəhd edin.' };
  }
  const salt = crypto.randomUUID();
  const hash = await sha256(salt + input.password);
  const user: User = { name: input.name.trim(), email, phone: input.phone.trim() };
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, { ...user, salt, hash }]));
  } catch {
    return { ok: false, error: 'Brauzer məlumatı saxlamağa icazə vermir.' };
  }
  setSession(user);
  return { ok: true, user };
}

export async function loginUser(emailInput: string, password: string): Promise<AuthResult> {
  const email = emailInput.trim().toLowerCase();
  const stored = readUsers().find((u) => u.email === email);
  const wrong = { ok: false as const, error: 'E-poçt və ya şifrə yanlışdır.' };
  if (!stored) return wrong;
  const hash = await sha256(stored.salt + password);
  if (hash !== stored.hash) return wrong;
  const user: User = { name: stored.name, email: stored.email, phone: stored.phone };
  setSession(user);
  return { ok: true, user };
}

export function logoutUser() {
  setSession(null);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === SESSION_KEY) {
      sessionCache = readSession();
      emit();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function getSnapshot(): User | null {
  if (!loaded) {
    sessionCache = readSession();
    loaded = true;
  }
  return sessionCache;
}

export function useUser(): User | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
