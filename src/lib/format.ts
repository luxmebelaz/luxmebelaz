// 1800 -> "1 800 ₼"
export function formatPrice(value: number): string {
  const grouped = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${grouped} ₼`;
}

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

// +994 55 201 01 38, 055 201 01 38, 0552010138 və s. formaları qəbul edir
export function isPhone(value: string): boolean {
  const digits = value.replace(/[^\d]/g, '');
  return digits.length >= 9 && digits.length <= 13;
}
