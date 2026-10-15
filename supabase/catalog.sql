-- LuxMebel: admin panel və kataloq üçün SQL (Supabase → SQL Editor-da işlədin).
-- Ardıcıllıq: 1) schema.sql  2) auth.sql  3) bu fayl. Təkrar işlədilə bilər (idempotent).

-- 1) Məhsullara admin paneli üçün sütunlar
alter table public.products add column if not exists images text[] not null default '{}';
alter table public.products add column if not exists is_new boolean not null default false;
alter table public.products add column if not exists sort_order int not null default 0;
alter table public.products add column if not exists updated_at timestamptz not null default now();

create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (featured) where featured;

-- 2) Kateqoriyalar (src/lib/data/categories.ts ilə eyni slug-lar olmalıdır)
insert into public.categories (slug, name, sort_order) values
  ('divanlar', 'Divanlar', 1),
  ('yataq-otagi', 'Yataq otağı', 2),
  ('kreslolar', 'Kreslolar', 3),
  ('masalar', 'Masalar', 4),
  ('skaflar', 'Şkaf və komodlar', 5)
on conflict (slug) do update set name = excluded.name, sort_order = excluded.sort_order;

-- 3) Kataloq hamıya oxunur (schema.sql-də də var — burada təkrar təmin olunur).
--    Yazma yalnız serverdən (service role açarı ilə, admin yoxlamasından sonra) aparılır,
--    ona görə insert/update/delete üçün public siyasət YOXDUR.
alter table public.products enable row level security;
drop policy if exists "products readable" on public.products;
create policy "products readable" on public.products for select using (true);
