'use client';

// Brauzerdə şəkli kiçildib JPEG-ə çevirir (yükləmə sürəti və Vercel 4.5 MB limiti üçün)
export async function compressImage(file: File, maxSide = 2000, quality = 0.86): Promise<File> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
  return blob ? new File([blob], 'image.jpg', { type: 'image/jpeg' }) : file;
}

// Faylı verilən API marşrutuna göndərir, imgbb ünvanını qaytarır
export async function uploadImage(file: File, endpoint: string, maxSide?: number): Promise<string> {
  const body = new FormData();
  body.append('file', await compressImage(file, maxSide));
  const res = await fetch(endpoint, { method: 'POST', body });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string; error?: string };
  if (!res.ok || !json.ok || !json.url) throw new Error(json.error ?? 'Şəkil yüklənmədi.');
  return json.url;
}
