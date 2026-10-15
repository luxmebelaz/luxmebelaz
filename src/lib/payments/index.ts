import 'server-only';

import { unibank } from './unibank';
import type { PaymentProvider } from './types';

export type { PaymentStatus } from './types';

// Aktiv provayder. Başqa banka keçmək üçün yalnız burada adapteri dəyişmək kifayətdir.
const provider: PaymentProvider = unibank;

export function getPaymentProvider(): PaymentProvider | null {
  return provider.isReady() ? provider : null;
}

export const isOnlinePaymentEnabled = () => getPaymentProvider() !== null;
