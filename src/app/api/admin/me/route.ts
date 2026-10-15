import { getAdminUser } from '@/lib/admin';

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return Response.json({ ok: false }, { status: 401 });
  return Response.json({ ok: true, email: admin.email });
}
