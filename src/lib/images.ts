// Bütün saytın şəkilləri bir yerdə. Öz şəkillərinizi (məs. imgbb: https://i.ibb.co/...)
// istifadə etmək üçün yalnız bu fayldakı və src/lib/data/ altındakı ünvanları dəyişmək kifayətdir.
// next.config.ts-də images.unsplash.com və i.ibb.co üçün icazə verilib.
export const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`;

export const images = {
  hero: unsplash("1616594039964-ae9021a400a0"),
  manifesto: {
    left: unsplash("1550581190-9c1c48d21d6c"),
    center: unsplash("1618221195710-dd6b41faaea6"),
    right: unsplash("1538688525198-9b88f6f53126"),
  },
  banner: unsplash("1556228453-efd6c1ff04f6"),
  testimonial: {
    portrait: unsplash("1494790108377-be9c29b29330"),
    room: unsplash("1616486338812-3dadae4b4ace"),
  },
  about: {
    story: unsplash("1600210492486-724fe5c67fb0"),
    workshop: unsplash("1583847268964-b28dc8f51f92"),
  },
  contact: unsplash("1615874959474-d609969a20ed"),
} as const;
