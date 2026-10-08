-- LuxMebel: Supabase Auth üçün SQL (SQL Editor-da işlədin).
-- Əvvəlcə supabase/schema.sql işlədilməlidir (profiles, orders və s. cədvəllər orada yaranır).
-- Bu fayl təkrar işlədilə bilər (idempotent).

-- 1) Profilə Google şəkli üçün sütun
alter table public.profiles add column if not exists avatar_url text;

-- 2) Yeni istifadəçi (e-poçt və ya Google) qeydiyyatdan keçəndə profil sətrini avtomatik yarat
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'phone', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3) Mövcud (trigger-dən əvvəl yaranmış) istifadəçilər üçün profilləri doldur
insert into public.profiles (id, full_name, phone, avatar_url)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', ''),
  coalesce(u.raw_user_meta_data->>'phone', ''),
  coalesce(u.raw_user_meta_data->>'avatar_url', u.raw_user_meta_data->>'picture')
from auth.users u
on conflict (id) do nothing;
