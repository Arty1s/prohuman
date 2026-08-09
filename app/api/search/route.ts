import { searchArticles } from "../../../lib/backend";
import type { Locale } from "../../../lib/contracts";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = (url.searchParams.get("locale") ?? "sk") as Locale;
  const query = url.searchParams.get("q")?.trim() ?? "";
  if (!query) return Response.json({ items: [], page: 1, pageSize: 20, totalItems: 0, totalPages: 0 });
  return Response.json(await searchArticles(locale, query));
}
