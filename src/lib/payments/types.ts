// Onlayn ödəniş provayderinin (virtual POS) ümumi interfeysi.
// Sayt yalnız bu interfeysdən istifadə edir; bankın konkret API-si adapter faylındadır (məs. unibank.ts).

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'cancelled';

export type CreatePaymentInput = {
  orderNumber: string;
  amount: number; // AZN, məs. 1800.5
  currency: 'AZN';
  description: string;
  returnUrl: string; // müştəri ödənişdən sonra bura qayıdır
  callbackUrl: string; // bank serverdən-serverə nəticəni bura göndərir
  language: 'az';
  customer: { name: string; phone: string; email?: string };
};

export type CreatePaymentResult = {
  paymentId: string; // bankın əməliyyat/sifariş identifikatoru
  redirectUrl: string; // bankın ödəniş səhifəsi
};

export interface PaymentProvider {
  id: string;
  // Bütün açarlar təyin olunubsa və adapter tamamlanıbsa true — yalnız onda saytda "Onlayn kartla" görünür
  isReady(): boolean;
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  // Statusu HƏMİŞƏ bankın serverindən soruşuruq (müştərinin URL-dəki parametrlərinə etibar edilmir)
  getStatus(paymentId: string): Promise<PaymentStatus>;
  // Bankın callback sorğusundan paymentId-ni çıxarır (imza varsa, burada yoxlanır). Etibarsızdırsa null.
  parseCallback(request: Request): Promise<string | null>;
}
