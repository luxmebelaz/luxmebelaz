// Saytın bütün sabit məlumatları bir yerdə: əlaqə, VÖEN, xəritə, sosial şəbəkələr.
export const site = {
  name: 'LuxMebel',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luxmebel.az',
  description:
    'LuxMebel: klassik və müasir dizaynı birləşdirən eksklüziv mebel kolleksiyası. Divanlar, yataq otağı, kreslolar, masalar və fərdi sifarişlər.',
  voen: '2003599962',
  phone: '+994 55 201 01 38',
  phoneHref: 'tel:+994552010138',
  email: 'info@luxmebel.az',
  emailHref: 'mailto:info@luxmebel.az',
  map: {
    lat: 40.4583542,
    lng: 49.7324028,
    openUrl: 'https://www.google.com/maps?q=40.4583542,49.7324028&z=17&hl=tr',
    embedUrl: 'https://www.google.com/maps?q=40.4583542,49.7324028&z=17&hl=tr&output=embed',
  },
  // Sosial şəbəkə ünvanlarını burada real hesablarla əvəz edin.
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
  },
} as const;

export const navLinks = [
  { label: 'Ana səhifə', href: '/' },
  { label: 'Mağaza', href: '/magaza' },
  { label: 'Kateqoriyalar', href: '/kateqoriyalar' },
  { label: 'Haqqımızda', href: '/haqqimizda' },
  { label: 'Əlaqə', href: '/elaqe' },
] as const;
