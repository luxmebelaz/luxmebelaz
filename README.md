# LuxMebel

Next.js (App Router) ilə hazırlanmış mebel mağazası saytı. Dil: Azərbaycan. Ünvan: https://luxmebelaz.com

```bash
npm run dev     # inkişaf
npm run build   # istehsal build-i
npm run lint
```

## Strukturu

| Qovluq | Məzmun |
| --- | --- |
| `src/app/` | Səhifələr (`/magaza`, `/kateqoriyalar`, `/sebet`, `/sifaris`, `/hesab`, `/elaqe` …) və API (`/api/inquiry`, `/api/orders`) |
| `src/app/admin/` | İdarəetmə paneli: məhsul əlavə et / redaktə et / sil, ana səhifə bölmələri |
| `src/components/` | UI komponentləri (ana səhifə bölmələri, mağaza, səbət, formalar, `admin/`) |
| `src/lib/site.ts` | Telefon, e-poçt, VÖEN, xəritə, sosial şəbəkə ünvanları |
| `src/lib/data/` | Sabit məlumatlar: kateqoriyalar, suallar |
| `src/lib/repository.ts` | **Bütün ictimai məlumat oxuması buradan keçir** (məhsullar Supabase-dən, keşlə) |
| `src/lib/db.ts` | **Server tərəfi yazma (sorğu, sifariş)** |
| `src/lib/auth.ts` | Hesab (Supabase Auth: e-poçt + Google) |
| `src/lib/admin.ts` | Admin icazəsinin yoxlanması (`ADMIN_EMAILS`) |

## Supabase

SQL Editor-da ardıcıl işlədin: `supabase/schema.sql` → `supabase/auth.sql` → `supabase/catalog.sql`.

- Məhsullar `products` cədvəlindədir və yalnız admin paneldən dəyişdirilir (yazma serverdə, service role açarı ilə).
- Kataloq `"use cache"` + `cacheTag('catalog')` ilə keşlənir; admin paneldə hər dəyişiklik `updateTag('catalog')` çağırır, sayt dərhal yenilənir.
- Admin hesabı Supabase → Authentication → Users → **Add user** ilə yaradılır; e-poçt `ADMIN_EMAILS`-də olmalıdır.

## imgbb

Admin paneldə seçilən şəkil brauzerdə kiçildilir (maks. 2000 px, JPEG), `/api/admin/upload` marşrutu ilə imgbb-yə göndərilir və `https://i.ibb.co/...` ünvanı məhsulun `images` sahəsinə yazılır. `IMGBB_API_KEY` yalnız serverdədir.

## Mühit dəyişənləri

`.env.example` faylına baxın. `SUPABASE_SERVICE_ROLE_KEY` və `IMGBB_API_KEY` heç vaxt `NEXT_PUBLIC_` ilə başlamamalıdır.
