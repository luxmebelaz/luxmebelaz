import { after } from 'next/server';
import { saveOrder, updateOrderPayment, type OrderRecord } from '@/lib/db';
import { confirmOrderToCustomer, notifyNewOrder } from '@/lib/email';
import { getPaymentProvider } from '@/lib/payments';
import { isEmail, isPhone } from '@/lib/format';
import { getProduct } from '@/lib/repository';
import { getServerSupabase } from '@/lib/supabase/server';
import { site } from '@/lib/site';

const clean = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

const PAYMENTS: Record<string, string> = {
  cash: 'Çatdırılma zamanı nağd',
  card_on_delivery: 'Çatdırılma zamanı kartla',
  online: 'Onlayn kartla',
};

function makeOrderNumber() {
  const time = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `LM-${time}${rand}`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Yanlış sorğu formatı.' }, { status: 400 });
  }

  if (clean(body.website, 100)) return Response.json({ ok: true, orderNumber: makeOrderNumber(), total: 0, items: [] });

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
  const items: { slug: string; name: string; qty: number; price: number }[] = [];

  // Qiymətlər klientdən yox, serverdəki kataloqdan götürülür.
  for (const raw of rawItems as Record<string, unknown>[]) {
    const slug = clean(raw?.slug, 120);
    const qty = Number(raw?.qty);
    if (!slug || !Number.isInteger(qty) || qty < 1 || qty > 20) continue;
    const product = await getProduct(slug);
    if (!product || !product.inStock) continue;
    items.push({ slug, name: product.name, qty, price: product.price });
  }

  if (items.length === 0) return Response.json({ ok: false, error: 'Səbət boşdur və ya məhsullar mövcud deyil.' }, { status: 422 });

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const orderNumber = makeOrderNumber();

  // Giriş edibsə, sifariş hesabına bağlanır
  let userId: string | undefined;
  try {
    const supabase = await getServerSupabase();
    userId = (await supabase?.auth.getUser())?.data.user?.id;
  } catch {
    userId = undefined;
  }

  const record: OrderRecord = {
    orderNumber,
    userId,
    customer: { name, phone, email: email || undefined, city, address },
    items,
    total,
    payment: PAYMENTS[paymentKey],
    note: note || undefined,
    online: provider ? { provider: provider.id } : undefined,
  };

  try {
    await saveOrder(record);
  } catch {
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
