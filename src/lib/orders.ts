'use client';

// Müştərinin öz brauzerində saxlanan sifariş tarixçəsi ("Hesabım" səhifəsi üçün).
// Supabase qoşulanda bu, orders cədvəlindən oxunan sorğu ilə əvəz olunacaq.
import { useSyncExternalStore } from 'react';

export type StoredOrder = {
  orderNumber: string;
  createdAt: string;
  total: number;
  payment: string;
  items: { name: string; qty: number; price: number }[];
};

const KEY = 'luxmebel:orders';
const EMPTY: StoredOrder[] = [];

let cache: StoredOrder[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): StoredOrder[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function saveLocalOrder(order: StoredOrder) {
  cache = [order, ...getSnapshot()].slice(0, 50);
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // saxlanıla bilmədi
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  if (!loaded) {
    cache = read();
    loaded = true;
  }
  return cache;
}

export function useOrders() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}
