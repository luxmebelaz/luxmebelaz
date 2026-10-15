import { getAdminUser } from '@/lib/admin';
import { uploadResponse, uploadToImgbb } from '@/lib/imgbb';

// Admin paneldən məhsul şəkli yükləmə
export async function POST(request: Request) {
  if (!(await getAdminUser())) return Response.json({ ok: false, error: 'İcazə yoxdur.' }, { status: 401 });
  return uploadResponse(await uploadToImgbb(request, 'luxmebel'));
}
