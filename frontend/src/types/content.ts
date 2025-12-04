export type Service = {
  id?: number;
  title: string;
  description: string;
  icon?: string;
  category?: string;
  valueProposition?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Project = {
  id?: number;
  title: string;
  description: string;
  sector?: string;
  location?: string;
  impact?: string;
  image?: string;
  imageUrl?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogPost = {
  id?: number;
  slug: string;
  title: string;
  author?: string;
  date?: string;
  excerpt?: string;
  intro?: string;
  content?: string[] | string;
  image?: string;
  heroImage?: string;
  tags?: string[];
  readMinutes?: number;
  publishedAt?: string;
};
