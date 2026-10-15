import 'server-only';

import type { CreatePaymentInput, CreatePaymentResult, PaymentProvider, PaymentStatus } from './types';

// Unibank virtual POS (e-commerce) adapteri.
// Unibank-ın e-commerce API sənədləri (endpoint-lər, imza/autentifikasiya üsulu, status kodları) açıq deyil —
// müqavilədən sonra bank tərəfindən verilir. Sənədlər gələndə yalnız bu faylın içi doldurulur, sayt dəyişmir.
//
// Mühit dəyişənləri (Vercel → Environment Variables):
//   UNIBANK_API_URL       — bankın API ünvanı (test və ya canlı)
//   UNIBANK_MERCHANT_ID   — merchant / terminal ID
//   UNIBANK_API_KEY       — API açarı və ya sertifikat şifrəsi
//   UNIBANK_SECRET        — callback imzasını yoxlamaq üçün gizli açar (bank verirsə)

// Adapter bankın sənədlərinə uyğun tamamlanana qədər false qalır — "Onlayn kartla" seçimi saytda görünmür.
const IMPLEMENTED = false;

const config = () => ({
  apiUrl: process.env.UNIBANK_API_URL ?? '',
  merchantId: process.env.UNIBANK_MERCHANT_ID ?? '',
  apiKey: process.env.UNIBANK_API_KEY ?? '',
  secret: process.env.UNIBANK_SECRET ?? '',
});

const notReady = () => new Error('Unibank adapteri hələ tamamlanmayıb (src/lib/payments/unibank.ts).');

export const unibank: PaymentProvider = {
  id: 'unibank',

  isReady() {
    const c = config();
    return IMPLEMENTED && Boolean(c.apiUrl && c.merchantId && c.apiKey);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    // TODO(Unibank sənədləri): ödəniş sifarişi yaradan sorğu.
    // Məbləğ adətən qəpiklə (Math.round(input.amount * 100)) göndərilir; cavabdan paymentId və redirectUrl götürülür.
    throw notReady();
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getStatus(paymentId: string): Promise<PaymentStatus> {
    // TODO(Unibank sənədləri): status sorğusu və bankın status kodlarının 'paid' | 'failed' | 'cancelled' | 'pending'-ə çevrilməsi.
    throw notReady();
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async parseCallback(request: Request): Promise<string | null> {
    // TODO(Unibank sənədləri): callback formatı (JSON / form), imzanın UNIBANK_SECRET ilə yoxlanması.
    return null;
  },
};
