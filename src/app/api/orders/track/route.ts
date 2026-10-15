import { getAdminSupabase } from '@/lib/supabase/admin';
import { getServerSupabase } from '@/lib/supabase/server';

// Sifarişin izlənməsi. İcazə: sifariş daxil olmuş istifadəçiyə məxsusdursa və ya
// sifarişdəki telefon nömrəsi düzgün yazılıbsa (qonaq sifarişləri üçün).
const digits = (v: string) => v.replace(/\D/g, '').slice(-9); // 0552010138 və +994552010138 -> 552010138

// Hər sorğu üçün yeni Response (gövdə yalnız bir dəfə oxuna bilər)
const notFound = () => Response.json(
  { ok: false, error: 'Sifariş tapılmadı. Nömrəni və telefonu yoxlayın.' },
  { status: 404, headers: { 'Cache-Control': 'no-store' } },
);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Yanlış sorğu.' }, { status: 400 });
  }
  const orderNumber = String(body.orderNumber ?? '').replace(/\D/g, '');
  const phone = String(body.phone ?? '');
  if (!/^\d{6}$/.test(orderNumber)) return Response.json({ ok: false, error: '6 rəqəmli sifariş nömrəsini yazın.' }, { status: 422 });

  const db = getAdminSupabase();
  if (!db) return Response.json({ ok: false, error: 'Xidmət müvəqqəti əlçatmazdır.' }, { status: 503 });

  const { data: o } = await db.from('orders').select('*').eq('order_number', orderNumber).maybeSingle();
  if (!o) return notFound();

  let allowed = false;
  if (o.user_id) {
    const supabase = await getServerSupabase();
    const userId = (await supabase?.auth.getUser())?.data.user?.id;
    allowed = userId === o.user_id;
  }
  if (!allowed && phone && digits(phone).length === 9) allowed = digits(phone) === digits(String(o.phone ?? ''));
  if (!allowed) return notFound();

  const history = (Array.isArray(o.status_history) ? o.status_history : []) as { status: string; at: string; note?: string }[];
  return Response.json(
    {
      ok: true,
      order: {
        orderNumber: o.order_number,
        createdAt: o.created_at,
        status: o.status,
        // admin e-poçtu ("by") müştəriyə göstərilmir
        history: history.map((h) => ({ status: h.status, at: h.at, note: h.note })),
        items: Array.isArray(o.items) ? o.items : [],
        total: Number(o.total),
        payment: o.payment,
        paymentStatus: o.payment_status ?? null,
        address: `${o.city}, ${o.address}`,
        hasLocation: o.location_lat != null,
      },
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
