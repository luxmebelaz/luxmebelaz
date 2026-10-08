import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase/server';

// Google girişi və e-poçt təsdiqi bura qayıdır: kodu sessiyaya çevirir və istifadəçini yönləndirir.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const nextParam = searchParams.get('next') ?? '/hesab';
  // Açıq yönləndirmənin qarşısını almaq üçün yalnız daxili yollara icazə veririk
  const next = nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/hesab';

  if (code) {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(`${origin}${next}`);
    }
  }
  return NextResponse.redirect(`${origin}/giris?xeta=giris`);
}
