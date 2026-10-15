import { getOrderPayment, updateOrderPayment } from '@/lib/db';
import { getPaymentProvider } from '@/lib/payments';

// Müştəri bankdan qayıdanda /odenis səhifəsi bu marşrutu çağırır.
// Status bankın serverindən yoxlanılır; URL-dəki parametrlərə etibar edilmir.
export async function GET(request: Request) {
  const orderNumber = (new URL(request.url).searchParams.get('sifaris') ?? '').trim().slice(0, 40);
  if (!/^LM-[A-Z0-9]{5,12}$/.test(orderNumber)) return Response.json({ ok: false }, { status: 400 });

  const order = await getOrderPayment({ orderNumber });
  if (!order) return Response.json({ ok: false }, { status: 404 });

  let status = order.status;
  const provider = getPaymentProvider();
  if (status === 'pending' && order.paymentId && provider) {
    try {
      status = await provider.getStatus(order.paymentId);
      if (status !== 'pending') await updateOrderPayment(orderNumber, { status });
    } catch (e) {
      console.error('[payment:status:error]', orderNumber, e);
    }
  }

  return Response.json(
    { ok: true, orderNumber, total: order.total, status },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
