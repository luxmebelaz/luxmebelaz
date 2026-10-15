import 'server-only';

import { leobank } from './leobank';
import type { PaymentProvider } from './types';

export type { PaymentStatus } from './types';

// Aktiv provayder. Başqa banka keçmək üçün yalnız burada adapteri dəyişmək kifayətdir.
const provider: PaymentProvider = leobank;

export function getPaymentProvider(): PaymentProvider | null {
  return provider.isReady() ? provider : null;
}

export const isOnlinePaymentEnabled = () => getPaymentProvider() !== null;
