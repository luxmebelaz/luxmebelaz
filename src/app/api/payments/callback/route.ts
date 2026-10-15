import { getOrderPayment, updateOrderPayment } from '@/lib/db';
import { getPaymentProvider } from '@/lib/payments';

// Bankın serverdən-serverə bildirişi (callback / webhook).
// Callback-in özünə etibar etmirik: paymentId götürülür və status bankın API-sindən yenidən soruşulur.
async function handle(request: Request) {
  const provider = getPaymentProvider();
  if (!provider) return new Response('disabled', { status: 503 });

  const paymentId = await provider.parseCallback(request);
  if (!paymentId) return new Response('invalid', { status: 400 });

  const order = await getOrderPayment({ paymentId });
  if (!order) return new Response('unknown order', { status: 404 });
  if (order.status === 'paid') return new Response('OK');

  try {
    const status = await provider.getStatus(paymentId);
    if (status !== 'pending') await updateOrderPayment(order.orderNumber, { status });
    return new Response('OK');
  } catch (e) {
    console.error('[payment:callback:error]', order.orderNumber, e);
    return new Response('error', { status: 502 }); // bank adətən sonra təkrar göndərir
  }
}

export const POST = handle;
export const GET = handle;
