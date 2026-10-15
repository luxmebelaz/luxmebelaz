import type { Category } from './types';

// Kateqoriyalar sabitdir. Yeni kateqoriya əlavə edəndə eyni slug-ı supabase/catalog.sql-də də əlavə edin
// (products.category sütunu categories cədvəlinə istinad edir).
export const categories: Category[] = [
  {
    slug: 'divanlar',
    name: 'Divanlar',
    tagline: 'Qonaq otağının əsas aksenti',
    description:
      'Qonaq otağınız üçün müasir və klassik dizaynlı, erqonomik divanlar. Həm rahatlıq, həm də estetika axtaranlar üçün.',
  },
  {
    slug: 'yataq-otagi',
    name: 'Yataq otağı',
    tagline: 'Dincəlmək üçün düşünülmüş dizayn',
    description:
      'Günün yorğunluğunu ata biləcəyiniz, keyfiyyətli taxta və materiallardan hazırlanmış yataq otağı mebelləri.',
  },
  {
    slug: 'kreslolar',
    name: 'Kreslolar',
    tagline: 'Fərdi toxunuş və rahatlıq',
    description:
      'Otağınıza xüsusi rəng qatacaq kreslo və stul kolleksiyası.',
  },
  {
    slug: 'masalar',
    name: 'Masalar',
    tagline: 'Yemək və iş masaları',
    description:
      'Ailə yeməkləri və qonaqlıqlar üçün təbii materiallardan hazırlanmış nahar və dekorativ masalar.',
  },
  {
    slug: 'skaflar',
    name: 'Şkaf və komodlar',
    tagline: 'Səliqəli və geniş saxlama',
    description:
      'Geniş həcmli, müasir fasadlı şkaflar, komodlar və rəflər — məkanınızı səliqəli və funksional edir.',
  },
];
