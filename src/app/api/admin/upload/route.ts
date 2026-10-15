import { getAdminUser } from '@/lib/admin';

// Admin paneldən şəkil yükləmə: fayl imgbb-yə göndərilir, birbaşa ünvan (https://i.ibb.co/...) qaytarılır.
// API açarı yalnız serverdə qalır.
const MAX_BYTES = 4 * 1024 * 1024; // Vercel funksiya limiti 4.5 MB-dır; brauzer şəkli əvvəlcədən kiçildir
const TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export async function POST(request: Request) {
  if (!(await getAdminUser())) return Response.json({ ok: false, error: 'İcazə yoxdur.' }, { status: 401 });

  const key = process.env.IMGBB_API_KEY;
  if (!key) return Response.json({ ok: false, error: 'IMGBB_API_KEY təyin olunmayıb.' }, { status: 500 });

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get('file');
  } catch {
    return Response.json({ ok: false, error: 'Fayl oxunmadı.' }, { status: 400 });
  }
  if (!(file instanceof File)) return Response.json({ ok: false, error: 'Fayl seçilməyib.' }, { status: 400 });
  if (!TYPES.has(file.type)) return Response.json({ ok: false, error: 'Yalnız JPG, PNG və ya WEBP.' }, { status: 415 });
  if (file.size > MAX_BYTES) return Response.json({ ok: false, error: 'Şəkil 4 MB-dan böyükdür.' }, { status: 413 });

  const body = new FormData();
  body.append('image', file);
  body.append('name', `luxmebel-${Date.now()}`);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`, { method: 'POST', body });
    const json = (await res.json()) as { success?: boolean; data?: { url?: string }; error?: { message?: string } };
    const url = json.data?.url;
    if (!res.ok || !json.success || !url?.startsWith('https://i.ibb.co/')) {
      console.error('[imgbb:error]', res.status, json.error?.message);
      return Response.json({ ok: false, error: 'imgbb şəkli qəbul etmədi.' }, { status: 502 });
    }
    return Response.json({ ok: true, url });
  } catch (e) {
    console.error('[imgbb:error]', e);
    return Response.json({ ok: false, error: 'imgbb-yə qoşulmaq mümkün olmadı.' }, { status: 502 });
  }
}
