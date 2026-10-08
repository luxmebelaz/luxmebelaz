-- LuxMebel üçün Supabase sxemi (SQL Editor-da işlədin).
-- Qeyd: sayt hələ bu cədvəllərə qoşulmayıb; qoşulma src/lib/repository.ts, db.ts, auth.ts-dədir.

create table if not exists public.categories (
  slug text primary key,
  name text not null,
  tagline text not null default '',
  description text not null default '',
  image text not null default '',
  sort_order int not null default 0
);

create table if not exists public.products (
  slug text primary key,
  name text not null,
  category text not null references public.categories(slug),
  price numeric(10,2) not null check (price >= 0),
  summary text not null default '',
  description text not null default '',
  image text not null default '',
  image_alt text not null default '',
  features text[] not null default '{}',
  specs jsonb not null default '[]',
  in_stock boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id bigint generated always as identity primary key,
  question text not null,
  answer text not null,
  sort_order int not null default 0
);

-- İstifadəçi profili (giriş məlumatını Supabase Auth saxlayır)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text not null default '',
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  space text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  order_number text not null unique,
  user_id uuid references auth.users(id) on delete set null,
  customer_name text not null,
  phone text not null,
  email text,
  city text not null,
  address text not null,
  note text,
  payment text not null,
  total numeric(10,2) not null,
  status text not null default 'new',
  items jsonb not null,
  created_at timestamptz not null default now()
);

-- Təhlükəsizlik: cədvəllərdə RLS aktivdir.
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.faqs enable row level security;
alter table public.profiles enable row level security;
alter table public.inquiries enable row level security;
alter table public.orders enable row level security;

-- Kataloq hamıya oxunur
create policy "catalog readable" on public.categories for select using (true);
create policy "products readable" on public.products for select using (true);
create policy "faqs readable" on public.faqs for select using (true);

-- Profil yalnız sahibinə
create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile write" on public.profiles for insert with check (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);

-- Sifariş yalnız sahibi tərəfindən oxunur; yazma server tərəfindən (service role) aparılır
create policy "own orders read" on public.orders for select using (auth.uid() = user_id);

-- inquiries: heç bir public siyasət yoxdur — yalnız server (service role) yazır/oxuyur.
