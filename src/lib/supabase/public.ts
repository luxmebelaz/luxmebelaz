import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from './env';

let client: SupabaseClient | null = null;

// Sessiyasız (cookie oxumayan) anon müştəri — "use cache" daxilində ictimai kataloq oxumaq üçün.
export function getPublicSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  client ??= createClient(supabaseUrl!, supabaseKey!, { auth: { persistSession: false, autoRefreshToken: false } });
  return client;
}
