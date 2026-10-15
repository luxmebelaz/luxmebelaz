import { after } from 'next/server';
import { saveOrder, updateOrderPayment, type OrderItem, type OrderRecord } from '@/lib/db';
import { sixDigits } from '@/lib/catalog';
import { confirmOrderToCustomer, notifyNewOrder } from '@/lib/email';
import { getPaymentProvider } from '@/lib/payments';
import { isEmail, isPhone } from '@/lib/format';
import { getProduct } from '@/lib/repository';
import { getServerSupabase } from '@/lib/supabase/server';
import { site } from '@/lib/site';

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

const PAYMENTS: Record<string, string> = {
  on_delivery: 'Çatdırılma zamanı (nağd və ya kartla)',
  online: 'Saytda kartla (onlayn)',
  // köhnə açarlar (keşdə qalmış səhifələr üçün)
  cash: 'Çatdırılma zamanı (nağd və ya kartla)',
  card_on_delivery: 'Çatdırılma zamanı (nağd və ya kartla)',
};

function parseLocation(raw: unknown): { lat: number; lng: number } | undefined {
  if (!raw || typeof raw !== 'object') return undefined;
  const { lat, lng } = raw as Record<string, unknown>;
  if (typeof lat !== 'number' || typeof lng !== 'number' || !Number.isFinite(lat) || !Number.isFinite(lng)) return undefined;
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return undefined;
  return { lat: Math.round(lat * 1e6) / 1e6, lng: Math.round(lng * 1e6) / 1e6 };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Yanlış sorğu formatı.' }, { status: 400 });
  }

  if (clean(body.website, 100)) return Response.json({ ok: true, orderNumber: sixDigits(), total: 0, items: [] });

  const customer = (body.customer ?? {}) as Record<string, unknown>;
  const name = clean(customer.name, 120);
  const phone = clean(customer.phone, 40);
  const email = clean(customer.email, 160);
  const city = clean(customer.city, 80);
  const address = clean(customer.address, 300);
  const note = clean(body.note, 1000);
  const paymentKey = clean(body.payment, 40);

  if (name.length < 2) return Response.json({ ok: false, error: 'Adınızı daxil edin.' }, { status: 422 });
  if (!isPhone(phone)) return Response.json({ ok: false, error: 'Telefon nömrəsi düzgün deyil.' }, { status: 422 });
  if (email && !isEmail(email)) return Response.json({ ok: false, error: 'E-poçt düzgün deyil.' }, { status: 422 });
  if (city.length < 2) return Response.json({ ok: false, error: 'Şəhəri daxil edin.' }, { status: 422 });
  if (address.length < 5) return Response.json({ ok: false, error: 'Ünvanı daxil edin.' }, { status: 422 });
  if (!PAYMENTS[paymentKey]) return Response.json({ ok: false, error: 'Ödəniş üsulunu seçin.' }, { status: 422 });
  const provider = paymentKey === 'online' ? getPaymentProvider() : null;
  if (paymentKey === 'online' && !provider) {
    return Response.json({ ok: false, error: 'Onlayn ödəniş hazırda mövcud deyil. Başqa üsul seçin.' }, { status: 422 });
  }

  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 50) : [];
  const items: OrderItem[] = [];

  // Qiymətlər və seçimlər klientdən yox, serverdəki kataloqdan yoxlanılır.
  for (const raw of rawItems as Record<string, unknown>[]) {
    const slug = clean(raw?.slug, 120);
    const qty = Number(raw?.qty);
    if (!slug || !Number.isInteger(qty) || qty < 1 || qty > 20) continue;
    const product = await getProduct(slug);
    if (!product || !product.inStock) continue;
    const size = clean(raw?.size, 80);
    const color = clean(raw?.color, 80);
    if (product.sizes.length > 0 && !product.sizes.includes(size)) {
      return Response.json({ ok: false, error: `“${product.name}” üçün ölçü seçin (səbətdən silib yenidən əlavə edin).` }, { status: 422 });
    }
    if (product.colors.length > 0 && !product.colors.some((c) => c.name === color)) {
      return Response.json({ ok: false, error: `“${product.name}” üçün rəng seçin (səbətdən silib yenidən əlavə edin).` }, { status: 422 });
    }
    items.push({
      slug,
      code: product.code || undefined,
      name: product.name,
      qty,
      price: product.price,
      size: product.sizes.length > 0 ? size : undefined,
      color: product.colors.length > 0 ? color : undefined,
    });
  }

  if (items.length === 0) return Response.json({ ok: false, error: 'Səbət boşdur və ya məhsullar mövcud deyil.' }, { status: 422 });

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const location = parseLocation(body.location);

  // Giriş edibsə, sifariş hesabına bağlanır
  let userId: string | undefined;
  try {
    const supabase = await getServerSupabase();
    userId = (await supabase?.auth.getUser())?.data.user?.id;
  } catch {
    userId = undefined;
  }

  const record: OrderRecord = {
    orderNumber: sixDigits(),
    userId,
    customer: { name, phone, email: email || undefined, city, address },
    items,
    total,
    payment: PAYMENTS[paymentKey],
    note: note || undefined,
    location,
    online: provider ? { provider: provider.id } : undefined,
  };

  // 6 rəqəmli nömrə təsadüfidir; nadir təkrar halında yeni nömrə ilə yenidən yazılır
  let saved = false;
  for (let attempt = 0; attempt < 5 && !saved; attempt++) {
    try {
      await saveOrder(record);
      saved = true;
    } catch (e) {
      if (e instanceof Error && e.message === 'order_number_taken') {
        record.orderNumber = sixDigits();
        continue;
      }
      break;
    }
  }
  const orderNumber = record.orderNumber;
  if (!saved) {
    return Response.json(
      { ok: false, error: `Sifarişi yadda saxlamaq mümkün olmadı. Zəhmət olmasa zəng edin: ${site.phone}` },
      { status: 500 },
    );
  }

  // Bildiriş məktubları cavab göndəriləndən sonra (Resend); müştəriyə təsdiq yalnız onlayn olmayan ödənişdə
  after(async () => {
    await Promise.all([notifyNewOrder(record), provider ? Promise.resolve() : confirmOrderToCustomer(record)]);
  });

  // Onlayn ödəniş: bankda ödəniş yaradılır, müştəri bankın səhifəsinə yönləndirilir.
  // Sifariş "pending" statusunda saxlanılıb; nəticə /api/payments/callback və /odenis səhifəsində təsdiqlənir.
  if (provider) {
    const origin = new URL(request.url).origin;
    try {
      const payment = await provider.createPayment({
        orderNumber,
        amount: total,
        currency: 'AZN',
        description: `LuxMebel sifarişi ${orderNumber}`,
        returnUrl: `${origin}/odenis?sifaris=${encodeURIComponent(orderNumber)}`,
        callbackUrl: `${origin}/api/payments/callback`,
        language: 'az',
        customer: { name, phone, email: email || undefined },
      });
      await updateOrderPayment(orderNumber, { paymentId: payment.paymentId });
      return Response.json({ ok: true, orderNumber, total, payment: PAYMENTS[paymentKey], items, redirectUrl: payment.redirectUrl });
    } catch (e) {
      console.error('[payment:create:error]', orderNumber, e);
      await updateOrderPayment(orderNumber, { status: 'failed' });
      return Response.json(
        { ok: false, error: `Ödəniş səhifəsini açmaq mümkün olmadı. Başqa ödəniş üsulu seçin və ya zəng edin: ${site.phone}` },
        { status: 502 },
      );
    }
  }

  return Response.json({ ok: true, orderNumber, total, payment: PAYMENTS[paymentKey], items });
}
