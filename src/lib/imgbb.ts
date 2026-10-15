import 'server-only';

// imgbb-yə yükləmə (API açarı yalnız serverdə). Uğurlu olduqda birbaşa ünvan: https://i.ibb.co/...
const MAX_BYTES = 4 * 1024 * 1024; // Vercel funksiya limiti 4.5 MB-dır; brauzer şəkli əvvəlcədən kiçildir
const TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export type UploadResult = { ok: true; url: string } | { ok: false; error: string; status: number };

export async function uploadToImgbb(request: Request, namePrefix: string): Promise<UploadResult> {
  const key = process.env.IMGBB_API_KEY;
  if (!key) return { ok: false, error: 'IMGBB_API_KEY təyin olunmayıb.', status: 500 };

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get('file');
  } catch {
    return { ok: false, error: 'Fayl oxunmadı.', status: 400 };
  }
  if (!(file instanceof File)) return { ok: false, error: 'Fayl seçilməyib.', status: 400 };
  if (!TYPES.has(file.type)) return { ok: false, error: 'Yalnız JPG, PNG və ya WEBP.', status: 415 };
  if (file.size > MAX_BYTES) return { ok: false, error: 'Şəkil 4 MB-dan böyükdür.', status: 413 };

  const body = new FormData();
  body.append('image', file);
  body.append('name', `${namePrefix}-${Date.now()}`);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`, { method: 'POST', body });
    const json = (await res.json()) as { success?: boolean; data?: { url?: string }; error?: { message?: string } };
    const url = json.data?.url;
    if (!res.ok || !json.success || !url?.startsWith('https://i.ibb.co/')) {
      console.error('[imgbb:error]', res.status, json.error?.message);
      return { ok: false, error: 'imgbb şəkli qəbul etmədi.', status: 502 };
    }
    return { ok: true, url };
  } catch (e) {
    console.error('[imgbb:error]', e);
    return { ok: false, error: 'imgbb-yə qoşulmaq mümkün olmadı.', status: 502 };
  }
}

export const uploadResponse = (r: UploadResult) =>
  r.ok ? Response.json({ ok: true, url: r.url }) : Response.json({ ok: false, error: r.error }, { status: r.status });
