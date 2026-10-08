// Bütün saytın şəkilləri bir yerdə. Öz şəkillərinizi istifadə etmək üçün
// yalnız bu fayldakı ünvanları dəyişmək kifayətdir (məs. /public qovluğundan "/foto.jpg").
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`;

export const images = {
  hero: unsplash("1616594039964-ae9021a400a0"),
  manifesto: {
    left: unsplash("1550581190-9c1c48d21d6c"),
    center: unsplash("1618221195710-dd6b41faaea6"),
    right: unsplash("1538688525198-9b88f6f53126"),
  },
  banner: unsplash("1556228453-efd6c1ff04f6"),
  products: {
    sofa: unsplash("1555041469-a586c61ea9bc"),
    table: unsplash("1519710164239-da123dc03ef4"),
    armchair: unsplash("1586023492125-27b2c045efd7"),
    cabinet: unsplash("1594026112284-02bb6f3352fe"),
  },
  testimonial: {
    portrait: unsplash("1494790108377-be9c29b29330"),
    room: unsplash("1616486338812-3dadae4b4ace"),
  },
  blog: {
    sofa: unsplash("1493663284031-b7e3aefcae8e"),
    style: unsplash("1631679706909-1844bbd07221"),
    wood: unsplash("1505693416388-ac5ce068fe85"),
  },
} as const;
