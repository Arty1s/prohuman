export type Locale = "sk" | "en" | "cs" | "de" | "uk";

export interface MediaAsset {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  credit?: string;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: MediaAsset;
}

export interface Category {
  id: string;
  slug: string;
  locale: Locale;
  name: string;
  description?: string;
  articleCount?: number;
}

export interface ArticleSummary {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  category: Pick<Category, "id" | "slug" | "name">;
  author: Pick<Author, "id" | "name" | "slug">;
  image: MediaAsset;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  viewCount: number;
}

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "link"; label: string; url: string };

export interface Article extends ArticleSummary {
  abstract: string;
  body: ArticleBlock[];
  related: ArticleSummary[];
  seo: { title: string; description: string; canonical?: string };
}

export interface Paginated<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface NewsletterSubscription {
  email: string;
  locale: Locale;
  source?: string;
  consent: true;
}

export interface ApiErrorPayload {
  error: { code: string; message: string; fieldErrors?: Record<string, string> };
}
