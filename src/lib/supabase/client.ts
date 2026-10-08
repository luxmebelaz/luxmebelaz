'use client';

import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from './env';

let client: SupabaseClient | null = null;

// Brauzer tərəfi Supabase müştərisi (anon açarı ilə; təhlükəsizliyi RLS qaydaları təmin edir)
export function getBrowserSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  client ??= createBrowserClient(supabaseUrl!, supabaseKey!);
  return client;
}
