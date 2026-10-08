'use client';

import { useSyncExternalStore } from 'react';

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

const KEY = 'luxmebel:cart';
const EMPTY: CartItem[] = [];
const MAX_QTY = 20;

let cache: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function sanitize(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return EMPTY;
  return raw
    .filter(
      (i): i is CartItem =>
        !!i &&
        typeof i.slug === 'string' &&
        typeof i.name === 'string' &&
        typeof i.price === 'number' &&
        typeof i.image === 'string' &&
        Number.isInteger(i.qty) &&
        i.qty > 0,
    )
    .map((i) => ({ ...i, qty: Math.min(i.qty, MAX_QTY) }));
}

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function write(items: CartItem[]) {
  cache = items.length ? items : EMPTY;
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // Brauzer saxlamağa icazə vermirsə, səbət yalnız cari səhifədə işləyəcək.
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = read();
      emit();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function getSnapshot() {
  if (!loaded) {
    cache = read();
    loaded = true;
  }
  return cache;
}

const getServerSnapshot = () => EMPTY;

export const cartActions = {
  add(item: Omit<CartItem, 'qty'>, qty = 1) {
    const items = getSnapshot();
    const existing = items.find((i) => i.slug === item.slug);
    if (existing) {
      write(items.map((i) => (i.slug === item.slug ? { ...i, qty: Math.min(i.qty + qty, MAX_QTY) } : i)));
    } else {
      write([...items, { ...item, qty: Math.min(qty, MAX_QTY) }]);
    }
  },
  setQty(slug: string, qty: number) {
    const items = getSnapshot();
    if (qty <= 0) return write(items.filter((i) => i.slug !== slug));
    write(items.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, MAX_QTY) } : i)));
  },
  remove(slug: string) {
    write(getSnapshot().filter((i) => i.slug !== slug));
  },
  clear() {
    write(EMPTY);
  },
};

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);
  return { items, count, total, ...cartActions };
}

// Səhifə brauzerdə hazır olana qədər "səbət boşdur" yanıb-sönməsin deyə
const noopSubscribe = () => () => {};
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
