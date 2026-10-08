'use client';

// Səbət çəkməcəsi və axtarış pəncərəsinin açıq/bağlı vəziyyəti (yaddaşda, saxlanmır)
import { useSyncExternalStore } from 'react';

type Panel = 'cart' | 'search' | null;

let current: Panel = null;
const listeners = new Set<() => void>();

function set(next: Panel) {
  if (current === next) return;
  current = next;
  listeners.forEach((l) => l());
}

export const panels = {
  openCart: () => set('cart'),
  openSearch: () => set('search'),
  close: () => set(null),
  toggleCart: () => set(current === 'cart' ? null : 'cart'),
};

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function usePanel(): Panel {
  return useSyncExternalStore(subscribe, () => current, () => null);
}
