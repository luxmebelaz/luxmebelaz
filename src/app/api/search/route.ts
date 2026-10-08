import { searchCatalog } from '@/lib/repository';

export async function GET(request: Request) {
  const q = (new URL(request.url).searchParams.get('q') ?? '').trim().slice(0, 80);
  if (q.length < 2) return Response.json({ ok: true, results: { products: [], categories: [] } });
  return Response.json({ ok: true, results: await searchCatalog(q) });
}
