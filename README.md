# LuxMebel

Next.js (App Router) ilə hazırlanmış mebel mağazası saytı. Dil: Azərbaycan.

```bash
npm run dev     # inkişaf
npm run build   # istehsal build-i
npm run lint
```

## Strukturu

| Qovluq | Məzmun |
| --- | --- |
| `src/app/` | Səhifələr (`/magaza`, `/kateqoriyalar`, `/sebet`, `/sifaris`, `/hesab`, `/elaqe` …) və API (`/api/inquiry`, `/api/orders`) |
| `src/components/` | UI komponentləri (ana səhifə bölmələri, mağaza, səbət, formalar) |
| `src/lib/site.ts` | Telefon, e-poçt, VÖEN, xəritə, sosial şəbəkə ünvanları |
| `src/lib/data/` | Nümunə məlumatlar: kateqoriyalar, məhsullar, məqalələr, suallar |
| `src/lib/repository.ts` | **Bütün məlumat oxuması buradan keçir** |
| `src/lib/db.ts` | **Server tərəfi yazma (sorğu, sifariş)** |
| `src/lib/auth.ts` | Hesab (hazırda yerli demo) |

## Supabase qoşulması

Qoşulma nöqtələri yalnız bu üç fayldır, səhifələr dəyişməməlidir:

1. `src/lib/repository.ts` — `getProducts`, `getProduct`, `getCategories`, `getFaqs`, `searchCatalog` funksiyalarının içini Supabase sorğuları ilə əvəz edin. Tiplər `src/lib/data/types.ts`-dədir. Məlumatı `fetch`/DB ilə oxuyanda `"use cache"` istifadə edin və ya `<Suspense>` daxilində saxlayın (`cacheComponents` aktivdir).
2. `src/lib/db.ts` — `saveInquiry` və `saveOrder` (service role açarı olmadıqda yalnız server jurnalına yazır).
3. `src/lib/auth.ts` — Supabase Auth ilə işləyir (e-poçt+şifrə, Google, şifrə bərpası). `/auth/callback` marşrutu Google/e-poçt təsdiqini sessiyaya çevirir. Cədvəllər üçün `supabase/schema.sql`, sonra `supabase/auth.sql` işlədin. `src/lib/db.ts` `SUPABASE_SERVICE_ROLE_KEY` varsa sifariş və sorğuları bazaya yazır.

Cədvəl sxemi `supabase/schema.sql` faylındadır. Mühit dəyişənləri üçün `.env.example` faylına baxın. `SUPABASE_SERVICE_ROLE_KEY` və `IMGBB_API_KEY` yalnız server tərəfində istifadə olunmalıdır.

## imgbb qoşulması

`next.config.ts`-də `i.ibb.co` şəkil mənbəyi olaraq icazəlidir. imgbb-yə yüklənmiş şəkilin birbaşa ünvanını (`https://i.ibb.co/...`) məhsulun `image` sahəsinə yazmaq kifayətdir. Yükləmə (API açarı ilə) yalnız server marşrutunda aparılmalıdır.

## Qeyd

Hazırda məhsul, qiymət və rəy məzmunu **nümunədir** — real məlumatla əvəz edin.
