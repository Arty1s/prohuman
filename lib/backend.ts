import type { Article, ArticleSummary, Locale, Paginated } from "./contracts";

const API_URL = process.env.PROHUMAN_API_URL?.replace(/\/$/, "");
const API_TOKEN = process.env.PROHUMAN_API_TOKEN;

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL) throw new Error("BACKEND_NOT_CONFIGURED");
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { Accept: "application/json", "Content-Type": "application/json", ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}), ...init?.headers },
    next: { revalidate: 60 },
  });
  if (!response.ok) throw new Error(`BACKEND_${response.status}`);
  return response.json() as Promise<T>;
}

const titles = [
  "Ako pripraviť komunitu na mimoriadne udalosti",
  "Kybernetická bezpečnosť v každodennej praxi",
  "Krízová komunikácia a dôvera verejnosti",
  "Bezpečné mestá: dáta, prevencia a spolupráca",
  "Etické hranice moderných bezpečnostných technológií",
];

export const mockArticles: ArticleSummary[] = titles.map((title, index) => ({
  id: String(index + 1), slug: `ukazkovy-clanok-${index + 1}`, locale: "sk", title,
  excerpt: "Odborný pohľad, praktické odporúčania a aktuálne poznatky pre výskumníkov aj širšiu verejnosť.",
  category: { id: "security", slug: "bezpecnostne-vedy", name: "Bezpečnostné vedy" },
  author: { id: "editorial", name: "Redakcia", slug: "redakcia" },
  image: { id: `image-${index + 1}`, url: "/reference-content.png", alt: title },
  publishedAt: `2025-0${6 - Math.min(index, 1)}-${String(12 - index).padStart(2, "0")}T09:00:00Z`, readingMinutes: 4 + index, viewCount: 12840 - index * 910,
}));

export async function getCategoryArticles(locale: Locale, slug: string, page = 1): Promise<Paginated<ArticleSummary>> {
  if (API_URL) return apiFetch(`/v1/articles?locale=${locale}&category=${encodeURIComponent(slug)}&page=${page}&pageSize=5`);
  return { items: mockArticles.map((item) => ({ ...item, locale })), page, pageSize: 5, totalItems: 42, totalPages: 9 };
}

export async function getArticle(locale: Locale, idOrSlug: string): Promise<Article> {
  if (API_URL) return apiFetch(`/v1/articles/${encodeURIComponent(idOrSlug)}?locale=${locale}`);
  const base = mockArticles[0];
  return {
    ...base, id: idOrSlug, locale,
    title: 'Podcast vytvorený umelou inteligenciou "Prohuman AI" dostupný na Spotify aj Apple Podcasts',
    excerpt: "Podcast prináša odborné rozhovory k vybraným témam spoločenských a humanitných vied.",
    abstract: "Pre čitateľov, ktorí aj radi počúvajú sme pripravili podcast dostupný na Spotify, Apple Podcasts, Google Podcasts a ďalších platformách.",
    body: [{ type: "paragraph", text: "Obsah článku poskytne backend ako bezpečné štruktúrované bloky." }], related: mockArticles.slice(1, 4),
    readingMinutes: 1, viewCount: 33903, publishedAt: "2025-02-21T09:00:00Z", updatedAt: "2025-02-21T09:00:00Z",
    seo: { title: "Prohuman AI podcast | ProHuman", description: "Podcast vytvorený umelou inteligenciou." },
  };
}

export async function searchArticles(locale: Locale, query: string): Promise<Paginated<ArticleSummary>> {
  if (API_URL) return apiFetch(`/v1/search?locale=${locale}&q=${encodeURIComponent(query)}`);
  const items = mockArticles.filter((article) => article.title.toLowerCase().includes(query.toLowerCase()));
  return { items, page: 1, pageSize: 20, totalItems: items.length, totalPages: 1 };
}
