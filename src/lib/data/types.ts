// Bu tiplər Supabase cədvəllərinin sütunları ilə üst-üstə düşəcək şəkildə seçilib.
export type Category = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string; // Category.slug
  price: number; // AZN
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
  specs: { label: string; value: string }[];
  inStock: boolean;
  featured?: boolean;
};

export type Faq = { q: string; a: string };
