import 'server-only';

import type { CreatePaymentInput, CreatePaymentResult, PaymentProvider, PaymentStatus } from './types';

// LEO Bank virtual POS adapteri.
// LEO Bank-ın e-commerce API sənədləri (endpoint-lər, imza/autentifikasiya üsulu, status kodları) açıq deyil —
// müqavilədən sonra bank tərəfindən verilir. Sənədlər gələndə yalnız bu faylın içi doldurulur, sayt dəyişmir.
//
// Mühit dəyişənləri (Vercel → Environment Variables):
//   LEOBANK_API_URL       — bankın API ünvanı (test və ya canlı)
//   LEOBANK_MERCHANT_ID   — merchant / terminal ID
//   LEOBANK_API_KEY       — API açarı və ya sertifikat şifrəsi
//   LEOBANK_SECRET        — callback imzasını yoxlamaq üçün gizli açar (bank verirsə)

// Adapter bankın sənədlərinə uyğun tamamlanana qədər false qalır — "Onlayn kartla" seçimi saytda görünmür.
const IMPLEMENTED = false;

const config = () => ({
  apiUrl: process.env.LEOBANK_API_URL ?? '',
  merchantId: process.env.LEOBANK_MERCHANT_ID ?? '',
  apiKey: process.env.LEOBANK_API_KEY ?? '',
  secret: process.env.LEOBANK_SECRET ?? '',
});

const notReady = () => new Error('LEO Bank adapteri hələ tamamlanmayıb (src/lib/payments/leobank.ts).');

export const leobank: PaymentProvider = {
  id: 'leobank',

  isReady() {
    const c = config();
    return IMPLEMENTED && Boolean(c.apiUrl && c.merchantId && c.apiKey);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    // TODO(LEO Bank sənədləri): ödəniş sifarişi yaradan sorğu.
    // Məbləğ adətən qəpiklə (Math.round(input.amount * 100)) göndərilir; cavabdan paymentId və redirectUrl götürülür.
    throw notReady();
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getStatus(paymentId: string): Promise<PaymentStatus> {
    // TODO(LEO Bank sənədləri): status sorğusu və bankın status kodlarının 'paid' | 'failed' | 'cancelled' | 'pending'-ə çevrilməsi.
    throw notReady();
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async parseCallback(request: Request): Promise<string | null> {
    // TODO(LEO Bank sənədləri): callback formatı (JSON / form), imzanın LEOBANK_SECRET ilə yoxlanması.
    return null;
  },
};
