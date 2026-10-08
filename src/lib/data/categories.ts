import { unsplash } from '@/lib/images';
import type { Category } from './types';

export const categories: Category[] = [
  {
    slug: 'divanlar',
    name: 'Divanlar',
    tagline: 'Qonaq otağının əsas aksenti',
    description:
      'Qonaq otağınız üçün müasir və klassik dizaynlı, erqonomik divanlar. Həm rahatlıq, həm də estetika axtaranlar üçün.',
    image: unsplash('1555041469-a586c61ea9bc'),
  },
  {
    slug: 'yataq-otagi',
    name: 'Yataq Otağı',
    tagline: 'Dincəlmək üçün düşünülmüş dizayn',
    description:
      'Günün yorğunluğunu ata biləcəyiniz, keyfiyyətli taxta və materiallardan hazırlanmış yataq mebelləri.',
    image: unsplash('1616594039964-ae9021a400a0'),
  },
  {
    slug: 'kreslolar',
    name: 'Kreslolar',
    tagline: 'Fərdi toxunuşlar və rahatlıq',
    description:
      'Rahatlığınız üçün fərdi toxunuşlar. Otağınıza xüsusi rəng qatacaq lüks kreslo və stul kolleksiyası.',
    image: unsplash('1586023492125-27b2c045efd7'),
  },
  {
    slug: 'masalar',
    name: 'Masalar',
    tagline: 'Yemək və iş masaları',
    description:
      'Ailə yeməkləri və qonaqlıqlar üçün təbii materiallardan hazırlanmış nahar və dekorativ masalar.',
    image: unsplash('1519710164239-da123dc03ef4'),
  },
  {
    slug: 'skaflar',
    name: 'Şkaf və Komodlar',
    tagline: 'Səliqəli və geniş saxlama',
    description:
      'Geniş həcmli, müasir fasadlı şkaflar, komodlar və rəflər — məkanınızı səliqəli və funksional edir.',
    image: unsplash('1594026112284-02bb6f3352fe'),
  },
];
