'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Camera, Loader2, Trash2 } from 'lucide-react';
import { updateProfile, type Gender, type User } from '@/lib/auth';
import { uploadImage } from '@/lib/image-compress';
import { isPhone } from '@/lib/format';
import { fieldClass, labelClass, primaryButton, secondaryButton } from '@/components/ui';

export const GENDER_LABEL: Record<Gender, string> = { male: 'Kişi', female: 'Qadın' };

export default function ProfileEditor({ user, onDone }: { user: User; onDone: () => void }) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(user.avatar ?? null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function onFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      setAvatar(await uploadImage(file, '/api/profile/avatar', 600));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Şəkil yüklənmədi.');
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get('name') ?? '').trim();
    const phone = String(f.get('phone') ?? '').trim();
    const gender = String(f.get('gender') ?? '') as Gender | '';
    if (name.length < 2) return setError('Adınızı daxil edin.');
    if (phone && !isPhone(phone)) return setError('Telefon nömrəsi düzgün deyil.');
    setSaving(true);
    setError('');
    const result = await updateProfile({ name, phone, gender, avatar: avatar !== (user.avatar ?? null) ? avatar : undefined });
    setSaving(false);
    if (!result.ok) return setError(result.error ?? 'Yadda saxlanmadı.');
    onDone();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden bg-[#111] text-white flex items-center justify-center text-2xl font-bold">
          {avatar ? (
            <Image src={avatar} alt="" fill sizes="80px" className="object-cover" referrerPolicy="no-referrer" unoptimized />
          ) : (
            user.name.slice(0, 1).toLocaleUpperCase('az')
          )}
          {uploading && (
            <span className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin" />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button type="button" onClick={() => fileInput.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 disabled:opacity-60">
            <Camera className="w-4 h-4" /> {avatar ? 'Şəkli dəyiş' : 'Şəkil əlavə et'}
          </button>
          {avatar && (
            <button type="button" onClick={() => setAvatar(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-red-700">
              <Trash2 className="w-4 h-4" /> Şəkli sil
            </button>
          )}
        </div>
        <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => onFile(e.target.files?.[0])} />
      </div>

      <div>
        <label htmlFor="pf-name" className={labelClass}>Ad, soyad*</label>
        <input id="pf-name" name="name" required minLength={2} maxLength={120} defaultValue={user.name} autoComplete="name" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="pf-phone" className={labelClass}>Telefon</label>
        <input id="pf-phone" name="phone" type="tel" inputMode="tel" maxLength={40} defaultValue={user.phone} autoComplete="tel" placeholder="+994 55 000 00 00" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="pf-gender" className={labelClass}>Cins</label>
        <select id="pf-gender" name="gender" defaultValue={user.gender ?? ''} className={fieldClass}>
          <option value="">Göstərilməyib</option>
          <option value="male">{GENDER_LABEL.male}</option>
          <option value="female">{GENDER_LABEL.female}</option>
        </select>
      </div>

      {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}

      <div className="flex flex-col gap-2.5">
        <button type="submit" disabled={saving || uploading} className={`${primaryButton} w-full`}>
          {saving && <Loader2 className="w-4 h-4 animate-spin" />} Yadda saxla
        </button>
        <button type="button" onClick={onDone} className={`${secondaryButton} w-full !h-12`}>Ləğv et</button>
      </div>
    </form>
  );
}
