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

export type PostSection = { heading: string; paragraphs: string[] };

export type Post = {
  slug: string;
  category: string;
  date: string; // ISO
  dateLabel: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  readMinutes: number;
  sections: PostSection[];
};

export type Faq = { q: string; a: string };
