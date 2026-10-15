-- LuxMebel: istifadəçi profili — cins sütunu (Supabase → SQL Editor). Təkrar işlədilə bilər.
alter table public.profiles add column if not exists gender text;
alter table public.profiles drop constraint if exists profiles_gender_check;
alter table public.profiles add constraint profiles_gender_check check (gender is null or gender in ('male', 'female'));
alter table public.profiles add column if not exists updated_at timestamptz not null default now();
