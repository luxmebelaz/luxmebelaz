'use client';

import { useSyncExternalStore } from 'react';

export type CartItem = {
  key: string; // slug + seçimlər: eyni məhsulun fərqli rəng/ölçüsü ayrı sətirdir
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  size?: string;
  color?: string;
};

export const cartKey = (i: { slug: string; size?: string; color?: string }) =>
  [i.slug, i.size ?? '', i.color ?? ''].join('|');

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
    .map((i) => ({
      ...i,
      size: typeof i.size === 'string' && i.size ? i.size : undefined,
      color: typeof i.color === 'string' && i.color ? i.color : undefined,
      key: cartKey(i),
      qty: Math.min(i.qty, MAX_QTY),
    }));
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
  add(item: Omit<CartItem, 'qty' | 'key'>, qty = 1) {
    const items = getSnapshot();
    const key = cartKey(item);
    const existing = items.find((i) => i.key === key);
    if (existing) {
      write(items.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + qty, MAX_QTY) } : i)));
    } else {
      write([...items, { ...item, key, qty: Math.min(qty, MAX_QTY) }]);
    }
  },
  setQty(key: string, qty: number) {
    const items = getSnapshot();
    if (qty <= 0) return write(items.filter((i) => i.key !== key));
    write(items.map((i) => (i.key === key ? { ...i, qty: Math.min(qty, MAX_QTY) } : i)));
  },
  remove(key: string) {
    write(getSnapshot().filter((i) => i.key !== key));
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
