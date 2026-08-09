# ProHuman backend integration

The frontend runs with mock data until `PROHUMAN_API_URL` is configured. The integration boundary is `lib/backend.ts`; UI components should not call a CMS directly.

## Required backend endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/v1/articles?locale=sk&category=bezpecnostne-vedy&page=1&pageSize=5` | Paginated category listing |
| GET | `/v1/articles/{id-or-slug}?locale=sk` | Full localized article |
| GET | `/v1/search?locale=sk&q=term` | Search |
| POST | `/v1/newsletter/subscriptions` | Newsletter opt-in |
| POST | `/v1/articles/{id}/views` | Optional deduplicated view event |
| GET | `/v1/categories?locale=sk` | Localized category navigation |
| GET | `/v1/site-config?locale=sk` | Navigation, services, notices and footer |

Supported locale codes are `sk`, `en`, `cs`, `de`, and `uk`. API responses should follow the TypeScript contracts in `lib/contracts.ts`. Return errors as `{ "error": { "code": "...", "message": "...", "fieldErrors": {} } }`.

## Content guidance

- Store article bodies as structured blocks matching `ArticleBlock`; avoid returning unsanitized HTML.
- Use ISO 8601 UTC timestamps and numeric view counts.
- Media should provide URL, alt text, dimensions and optional credit.
- Article slugs should be unique within a locale. IDs must remain stable across translations.
- Pagination responses must include `page`, `pageSize`, `totalItems`, and `totalPages`.
- Draft and preview content should require server-side authentication and must never be exposed through public environment variables.

## Frontend proxy routes

- `POST /api/newsletter` validates and forwards newsletter subscriptions.
- `GET /api/search?locale=sk&q=...` provides a stable same-origin search endpoint.

## Handoff checklist

1. Copy `.env.example` to `.env.local` and set the backend URL.
2. Implement the endpoints above using the contracts as the source of truth.
3. Replace or extend only functions in `lib/backend.ts`; keep UI pages backend-agnostic.
4. Add authentication for author/admin workflows and CSRF protection for state-changing endpoints.
5. Add rate limiting to search, newsletter, view tracking and contact forms.
6. Add image storage/CDN, content validation, audit logs, backups and monitoring.
7. Run the production build and exercise every locale before release.
