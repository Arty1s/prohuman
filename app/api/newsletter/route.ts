const API_URL = process.env.PROHUMAN_API_URL?.replace(/\/$/, "");

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const input = contentType.includes("application/json") ? await request.json() : Object.fromEntries((await request.formData()).entries());
  const email = String(input.email ?? "").trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) return Response.json({ error: { code: "INVALID_EMAIL", message: "Enter a valid email address." } }, { status: 422 });
  const payload = { email, locale: input.locale ?? "sk", source: input.source ?? "article-sidebar", consent: true };
  if (!API_URL) return Response.json({ ok: true, mode: "mock", data: payload }, { status: 202 });
  const response = await fetch(`${API_URL}/v1/newsletter/subscriptions`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  return new Response(response.body, { status: response.status, headers: { "Content-Type": "application/json" } });
}
