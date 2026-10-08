import { saveInquiry } from '@/lib/db';
import { isPhone } from '@/lib/format';

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Yanlış sorğu formatı.' }, { status: 400 });
  }

  // Bot tələsi: gizli sahə doludursa, uğurlu kimi cavab veririk, lakin saxlamırıq.
  if (clean(body.website, 100)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const space = clean(body.space, 60);
  const message = clean(body.message, 3000);

  if (name.length < 2) return Response.json({ ok: false, error: 'Adınızı daxil edin.' }, { status: 422 });
  if (!isPhone(phone)) return Response.json({ ok: false, error: 'Telefon nömrəsi düzgün deyil.' }, { status: 422 });
  if (message.length < 5) return Response.json({ ok: false, error: 'Mesajınızı yazın.' }, { status: 422 });

  await saveInquiry({ name, phone, space: space || undefined, message });
  return Response.json({ ok: true });
}
