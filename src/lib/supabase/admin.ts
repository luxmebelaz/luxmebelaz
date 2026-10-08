import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { supabaseUrl } from './env';

let admin: SupabaseClient | null = null;

// DİQQƏT: service role açarı bütün RLS qaydalarını keçir. Yalnız server kodunda istifadə edin.
export function getAdminSupabase(): SupabaseClient | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !key) return null;
  admin ??= createClient(supabaseUrl, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return admin;
}
