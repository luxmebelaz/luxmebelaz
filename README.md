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
2. `src/lib/db.ts` — `saveInquiry` və `saveOrder` hazırda yalnız server jurnalına yazır; `supabase.from('inquiries'|'orders').insert(...)` ilə əvəz edin.
3. `src/lib/auth.ts` — `registerUser`, `loginUser`, `logoutUser` hazırda brauzer yaddaşında işləyən **demo**dur (başqa cihazda işləmir). Supabase Auth ilə əvəz edin. Sifariş tarixçəsi (`src/lib/orders.ts`) də `orders` cədvəlindən oxunmalıdır.

Cədvəl sxemi `supabase/schema.sql` faylındadır. Mühit dəyişənləri üçün `.env.example` faylına baxın. `SUPABASE_SERVICE_ROLE_KEY` və `IMGBB_API_KEY` yalnız server tərəfində istifadə olunmalıdır.

## imgbb qoşulması

`next.config.ts`-də `i.ibb.co` şəkil mənbəyi olaraq icazəlidir. imgbb-yə yüklənmiş şəkilin birbaşa ünvanını (`https://i.ibb.co/...`) məhsulun `image` sahəsinə yazmaq kifayətdir. Yükləmə (API açarı ilə) yalnız server marşrutunda aparılmalıdır.

## Qeyd

Hazırda məhsul, qiymət və rəy məzmunu **nümunədir** — real məlumatla əvəz edin.
