// Sifarişin statusları (supabase/orders.sql → orders_status_check ilə eyni)
export const ORDER_STATUSES = ['new', 'confirmed', 'preparing', 'delivering', 'delivered', 'cancelled'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  new: 'Yeni',
  confirmed: 'Təsdiqləndi',
  preparing: 'Hazırlanır',
  delivering: 'Çatdırılır',
  delivered: 'Çatdırıldı',
  cancelled: 'Ləğv edildi',
};

export const ORDER_STATUS_STYLE: Record<OrderStatus, string> = {
  new: 'bg-blue-100 text-blue-900',
  confirmed: 'bg-indigo-100 text-indigo-900',
  preparing: 'bg-amber-100 text-amber-900',
  delivering: 'bg-orange-100 text-orange-900',
  delivered: 'bg-emerald-100 text-emerald-900',
  cancelled: 'bg-neutral-200 text-neutral-700',
};

export const isOrderStatus = (v: unknown): v is OrderStatus =>
  typeof v === 'string' && (ORDER_STATUSES as readonly string[]).includes(v);
