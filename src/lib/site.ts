// Saytın bütün sabit məlumatları bir yerdə: əlaqə, VÖEN, xəritə, sosial şəbəkələr.
export const site = {
  name: 'LuxMebel',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luxmebelaz.com',
  description:
    'LuxMebel: klassik və müasir dizaynı birləşdirən eksklüziv mebel kolleksiyası. Divanlar, yataq otağı, kreslolar, masalar və fərdi sifarişlər.',
  voen: '2003599962',
  phone: '+994 55 201 01 38',
  phoneHref: 'tel:+994552010138',
  email: 'info@luxmebelaz.com',
  emailHref: 'mailto:info@luxmebelaz.com',
  map: {
    lat: 40.4583542,
    lng: 49.7324028,
    openUrl: 'https://www.google.com/maps?q=40.4583542,49.7324028&z=17&hl=az',
    embedUrl: 'https://www.google.com/maps?q=40.4583542,49.7324028&z=17&hl=az&output=embed',
  },
  // Sosial şəbəkə ünvanlarını burada real hesablarla əvəz edin.
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
  },
} as const;

// Hər məhsul səhifəsində göstərilən standart qeydlər
// (yeni qeyd əlavə etmək üçün siyahıya sətir yazmaq kifayətdir)
export const productNotes = [
  'Məhsul şəkildəki ilə tam eynidir',
  'Rəsmi zəmanət verilir',
  'Çatdırılma və yerində quraşdırma komandamız tərəfindən',
  'Ödəniş çatdırılma zamanı — nağd və ya kartla',
  'Fərdi ölçü və rəng sifarişlə mümkündür',
] as const;

export const navLinks = [
  { label: 'Ana səhifə', href: '/' },
  { label: 'Mağaza', href: '/magaza' },
  { label: 'Kateqoriyalar', href: '/kateqoriyalar' },
  { label: 'Haqqımızda', href: '/haqqimizda' },
  { label: 'Əlaqə', href: '/elaqe' },
] as const;
