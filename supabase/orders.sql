-- LuxMebel: sifarişlərin idarəsi, konum, məhsul kodu, ölçü/rəng seçimləri (Supabase → SQL Editor).
-- Ardıcıllıq: schema.sql → auth.sql → catalog.sql → payments.sql → bu fayl. Təkrar işlədilə bilər.

-- 1) Məhsul: 6 rəqəmli kod, ölçü və rəng seçimləri
alter table public.products add column if not exists code text;
alter table public.products add column if not exists sizes text[] not null default '{}';
alter table public.products add column if not exists colors jsonb not null default '[]'; -- [{"name":"Bej","hex":"#d8c8a8"}]

-- Kodu olmayan mövcud məhsullara unikal 6 rəqəmli kod ver
do $$
declare r record; c text;
begin
  for r in select slug from public.products where code is null loop
    loop
      c := lpad((floor(random() * 900000) + 100000)::int::text, 6, '0');
      exit when not exists (select 1 from public.products where code = c);
    end loop;
    update public.products set code = c where slug = r.slug;
  end loop;
end $$;

create unique index if not exists products_code_key on public.products (code);

-- 2) Sifariş: konum və status tarixçəsi
alter table public.orders add column if not exists location_lat double precision;
alter table public.orders add column if not exists location_lng double precision;
alter table public.orders add column if not exists status_history jsonb not null default '[]';
alter table public.orders add column if not exists status_updated_at timestamptz;

-- Statuslar: new (yeni) → confirmed (təsdiqləndi) → preparing (hazırlanır) → delivering (çatdırılır) → delivered (çatdırıldı) | cancelled (ləğv edildi)
alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders add constraint orders_status_check
  check (status in ('new', 'confirmed', 'preparing', 'delivering', 'delivered', 'cancelled'));

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);
