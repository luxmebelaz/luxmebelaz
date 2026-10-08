import 'server-only';

import { createServerClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { isSupabaseConfigured, supabaseKey, supabaseUrl } from './env';

// Server tərəfi müştəri: istifadəçinin cookie sessiyasını oxuyur (yalnız marşrut işləyicilərində istifadə edin)
export async function getServerSupabase(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured) return null;
  const store = await cookies();
  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Server komponentində cookie yazmaq mümkün deyil — marşrut işləyicilərində işləyir
        }
      },
    },
  });
}
