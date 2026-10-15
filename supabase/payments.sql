-- LuxMebel: onlayn ödəniş (virtual POS) üçün SQL (Supabase → SQL Editor). Təkrar işlədilə bilər.
-- Ardıcıllıq: schema.sql → auth.sql → catalog.sql → bu fayl.

alter table public.orders add column if not exists payment_status text not null default 'unpaid'
  check (payment_status in ('unpaid', 'pending', 'paid', 'failed', 'cancelled'));
alter table public.orders add column if not exists payment_provider text;
alter table public.orders add column if not exists payment_id text;
alter table public.orders add column if not exists paid_at timestamptz;

create unique index if not exists orders_payment_id_key on public.orders (payment_id) where payment_id is not null;
