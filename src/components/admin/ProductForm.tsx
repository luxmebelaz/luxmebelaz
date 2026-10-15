'use client';

import { useRef, useState, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ImagePlus, Loader2, Star, X } from 'lucide-react';
import { saveProduct, type ProductInput } from '@/app/admin/actions';
import type { Category, Product } from '@/lib/data/types';
import { adminCard, adminInput, adminLabel, adminTextarea } from './styles';

const MAX_SIDE = 2000;
const MAX_IMAGES = 12;

// Brauzerdə şəkli kiçildib JPEG-ə çevirir (yükləmə sürəti və Vercel 4.5 MB limiti üçün)
async function compress(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b ?? file), 'image/jpeg', 0.86));
}

async function upload(file: File): Promise<string> {
  const blob = await compress(file);
  const body = new FormData();
  body.append('file', new File([blob], 'image.jpg', { type: 'image/jpeg' }));
  const res = await fetch('/api/admin/upload', { method: 'POST', body });
  const json = (await res.json().catch(() => ({}))) as { ok?: boolean; url?: string; error?: string };
  if (!res.ok || !json.ok || !json.url) throw new Error(json.error ?? 'Şəkil yüklənmədi.');
  return json.url;
}

const specsToText = (specs: Product['specs']) => specs.map((s) => `${s.label}: ${s.value}`).join('\n');
const textToSpecs = (text: string) =>
  text
    .split('\n')
    .map((line) => {
      const i = line.indexOf(':');
      return i > 0 ? { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() } : null;
    })
    .filter((s): s is { label: string; value: string } => !!s && !!s.label && !!s.value);
const lines = (text: string) => text.split('\n').map((l) => l.trim()).filter(Boolean);

export default function ProductForm({ product, categories }: { product?: Product; categories: Category[] }) {
  const router = useRouter();
  const fileInput = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState('');
  const [saving, startSaving] = useTransition();

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    const list = Array.from(files).slice(0, MAX_IMAGES - images.length);
    setError('');
    setUploading((n) => n + list.length);
    await Promise.all(
      list.map(async (file) => {
        try {
          const url = await upload(file);
          setImages((prev) => (prev.length < MAX_IMAGES ? [...prev, url] : prev));
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Şəkil yüklənmədi.');
        } finally {
          setUploading((n) => n - 1);
        }
      }),
    );
    if (fileInput.current) fileInput.current.value = '';
  }

  const move = (from: number, to: number) =>
    setImages((prev) => {
      if (to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (uploading > 0) return setError('Şəkillərin yüklənməsini gözləyin.');
    const f = new FormData(e.currentTarget);
    const input: ProductInput = {
      name: String(f.get('name') ?? ''),
      category: String(f.get('category') ?? ''),
      price: Number(String(f.get('price') ?? '').replace(',', '.')),
      summary: String(f.get('summary') ?? ''),
      description: String(f.get('description') ?? ''),
      images,
      imageAlt: String(f.get('imageAlt') ?? ''),
      features: lines(String(f.get('features') ?? '')),
      specs: textToSpecs(String(f.get('specs') ?? '')),
      inStock: f.get('inStock') === 'on',
      featured: f.get('featured') === 'on',
      isNew: f.get('isNew') === 'on',
      sortOrder: Number(f.get('sortOrder') ?? 0) || 0,
    };
    setError('');
    startSaving(async () => {
      const result = await saveProduct(input, product?.slug);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.push('/admin');
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
      <div className="flex flex-col gap-6">
        <section className={`${adminCard} p-5 flex flex-col gap-4`}>
          <h2 className="font-bold">Əsas məlumat</h2>
          <div>
            <label htmlFor="name" className={adminLabel}>Ad *</label>
            <input id="name" name="name" required minLength={2} maxLength={120} defaultValue={product?.name} className={adminInput} placeholder="Məs.: Künc divan Moderna" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className={adminLabel}>Kateqoriya *</label>
              <select id="category" name="category" required defaultValue={product?.category ?? ''} className={adminInput}>
                <option value="" disabled>Seçin</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price" className={adminLabel}>Qiymət (₼) *</label>
              <input id="price" name="price" required inputMode="decimal" pattern="[0-9]+([.,][0-9]{1,2})?" defaultValue={product?.price} className={adminInput} placeholder="1800" />
            </div>
          </div>
          <div>
            <label htmlFor="summary" className={adminLabel}>Qısa təsvir (kartda görünür)</label>
            <input id="summary" name="summary" maxLength={220} defaultValue={product?.summary} className={adminInput} placeholder="Məs.: Məxmər parça, fıstıq ağacından ayaqlar" />
          </div>
          <div>
            <label htmlFor="description" className={adminLabel}>Ətraflı təsvir</label>
            <textarea id="description" name="description" rows={5} maxLength={5000} defaultValue={product?.description} className={adminTextarea} />
          </div>
        </section>

        <section className={`${adminCard} p-5 flex flex-col gap-4`}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Şəkillər *</h2>
            <span className="text-xs text-neutral-500">{images.length}/{MAX_IMAGES} · birinci şəkil əsasdır</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((url, i) => (
              <div key={url} className="relative aspect-square rounded-xl overflow-hidden bg-neutral-200 group">
                <Image src={url} alt="" fill sizes="200px" className="object-cover" />
                {i === 0 && <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/80 text-white text-[11px] font-semibold">Əsas</span>}
                <div className="absolute inset-x-0 bottom-0 flex justify-between p-1.5 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex gap-1">
                    <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0} className="w-7 h-7 rounded-full bg-white/90 inline-flex items-center justify-center disabled:opacity-40" title="Sola">
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button type="button" onClick={() => move(i, i + 1)} disabled={i === images.length - 1} className="w-7 h-7 rounded-full bg-white/90 inline-flex items-center justify-center disabled:opacity-40" title="Sağa">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    {i > 0 && (
                      <button type="button" onClick={() => move(i, 0)} className="w-7 h-7 rounded-full bg-white/90 inline-flex items-center justify-center" title="Əsas şəkil et">
                        <Star className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <button type="button" onClick={() => setImages((prev) => prev.filter((u) => u !== url))} className="w-7 h-7 rounded-full bg-white/90 text-red-700 inline-flex items-center justify-center" title="Sil">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {Array.from({ length: uploading }, (_, i) => (
              <div key={`u${i}`} className="aspect-square rounded-xl bg-neutral-100 border border-dashed border-black/20 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-neutral-500" />
              </div>
            ))}
            {images.length + uploading < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInput.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-black/20 hover:border-black/50 flex flex-col items-center justify-center gap-1.5 text-xs font-semibold text-neutral-600"
              >
                <ImagePlus className="w-6 h-6" /> Şəkil əlavə et
              </button>
            )}
          </div>
          <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={(e) => onFiles(e.target.files)} />
          <div>
            <label htmlFor="imageAlt" className={adminLabel}>Şəkil təsviri (SEO, boş qalsa ad istifadə olunur)</label>
            <input id="imageAlt" name="imageAlt" maxLength={160} defaultValue={product?.imageAlt === product?.name ? '' : product?.imageAlt} className={adminInput} placeholder="Məs.: Yaşıl məxmər künc divan" />
          </div>
        </section>

        <section className={`${adminCard} p-5 grid grid-cols-1 md:grid-cols-2 gap-4`}>
          <div>
            <label htmlFor="features" className={adminLabel}>Üstünlüklər (hər sətirdə biri)</label>
            <textarea id="features" name="features" rows={6} defaultValue={product?.features.join('\n')} className={adminTextarea} placeholder={'Aşınmaya davamlı parça\nÇıxarıla bilən yastıqlar'} />
          </div>
          <div>
            <label htmlFor="specs" className={adminLabel}>Xüsusiyyətlər (hər sətirdə “Ad: dəyər”)</label>
            <textarea id="specs" name="specs" rows={6} defaultValue={product ? specsToText(product.specs) : ''} className={adminTextarea} placeholder={'Material: Məxmər, fıstıq ağacı\nÖlçü: 240 × 160 sm\nRəng: Zümrüd yaşıl'} />
          </div>
        </section>
      </div>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
        <section className={`${adminCard} p-5 flex flex-col gap-3`}>
          <h2 className="font-bold">Görünmə</h2>
          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input type="checkbox" name="featured" defaultChecked={product?.featured ?? false} className="mt-0.5 w-4 h-4 accent-black" />
            <span><b>Ana səhifədə göstər</b><br /><span className="text-neutral-500">“Məhsullarımız” bölməsi</span></span>
          </label>
          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input type="checkbox" name="isNew" defaultChecked={product?.isNew ?? false} className="mt-0.5 w-4 h-4 accent-black" />
            <span><b>Yeni gələnlər</b><br /><span className="text-neutral-500">Ana səhifədəki “Yeni gələnlər” bölməsi</span></span>
          </label>
          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input type="checkbox" name="inStock" defaultChecked={product?.inStock ?? true} className="mt-0.5 w-4 h-4 accent-black" />
            <span><b>Satışda mövcuddur</b><br /><span className="text-neutral-500">Söndürülsə, səbətə əlavə olunmur</span></span>
          </label>
          <div>
            <label htmlFor="sortOrder" className={adminLabel}>Sıra (kiçik rəqəm öndə)</label>
            <input id="sortOrder" name="sortOrder" type="number" step={1} min={-9999} max={9999} defaultValue={product?.sortOrder ?? 0} className={adminInput} />
          </div>
        </section>

        {error && <p role="alert" className={`${adminCard} p-4 text-sm text-red-700`}>{error}</p>}

        <button type="submit" disabled={saving || uploading > 0} className="h-12 rounded-full bg-[#111] text-white text-sm font-bold hover:bg-black disabled:opacity-60 inline-flex items-center justify-center gap-2">
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {product ? 'Dəyişiklikləri yadda saxla' : 'Məhsulu əlavə et'}
        </button>
        <Link href="/admin" className="h-11 rounded-full border border-black/20 text-sm font-semibold inline-flex items-center justify-center hover:bg-white">
          Ləğv et
        </Link>
      </aside>
    </form>
  );
}
