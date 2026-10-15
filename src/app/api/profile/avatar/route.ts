import { uploadResponse, uploadToImgbb } from '@/lib/imgbb';
import { getServerSupabase } from '@/lib/supabase/server';

// Daxil olmuş istifadəçinin profil şəkli (imgbb). Ünvanı brauzer auth.updateUser ilə profilə yazır.
export async function POST(request: Request) {
  const supabase = await getServerSupabase();
  const user = (await supabase?.auth.getUser())?.data.user;
  if (!user) return Response.json({ ok: false, error: 'Hesaba daxil olun.' }, { status: 401 });
  return uploadResponse(await uploadToImgbb(request, `avatar-${user.id.slice(0, 8)}`));
}
