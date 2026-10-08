'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { loginUser, registerUser } from '@/lib/auth';
import { isEmail, isPhone } from '@/lib/format';
import { fieldClass, labelClass, primaryButton } from '@/components/ui';

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const phone = String(data.get('phone') ?? '').trim();
    const password = String(data.get('password') ?? '');
    const confirm = String(data.get('confirm') ?? '');

    if (name.length < 2) return setError('Adınızı daxil edin.');
    if (!isEmail(email)) return setError('E-poçt ünvanı düzgün deyil.');
    if (!isPhone(phone)) return setError('Telefon nömrəsi düzgün deyil.');
    if (password.length < 8) return setError('Şifrə ən azı 8 simvol olmalıdır.');
    if (password !== confirm) return setError('Şifrələr üst-üstə düşmür.');

    setBusy(true);
    setError('');
    const result = await registerUser({ name, email, phone, password });
    setBusy(false);
    if (!result.ok) return setError(result.error);
    router.push('/hesab');
  }

  return (
    <form onSubmit={handleSubmit} className="glass-light rounded-3xl p-6 sm:p-9 flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="rg-name" className={labelClass}>Ad, soyad*</label>
        <input id="rg-name" name="name" required autoComplete="name" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="rg-email" className={labelClass}>E-poçt*</label>
        <input id="rg-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="rg-phone" className={labelClass}>Telefon*</label>
        <input id="rg-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="+994 55 000 00 00" className={fieldClass} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="rg-password" className={labelClass}>Şifrə*</label>
          <input id="rg-password" name="password" type="password" required minLength={8} autoComplete="new-password" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="rg-confirm" className={labelClass}>Şifrənin təkrarı*</label>
          <input id="rg-confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className={fieldClass} />
        </div>
      </div>
      <p className="text-xs text-neutral-700">Şifrə ən azı 8 simvoldan ibarət olmalıdır.</p>

      <div className="flex items-start gap-3">
        <input type="checkbox" id="rg-terms" required className="mt-0.5 w-4 h-4 accent-black cursor-pointer shrink-0" />
        <label htmlFor="rg-terms" className="text-xs leading-relaxed text-neutral-800 cursor-pointer">
          <Link href="/sertler" className="underline underline-offset-2">İstifadə şərtləri</Link> və{' '}
          <Link href="/mexfilik" className="underline underline-offset-2">məxfilik siyasəti</Link> ilə razıyam.
        </label>
      </div>

      <button type="submit" disabled={busy} className={primaryButton}>
        {busy && <Loader2 className="w-4 h-4 animate-spin" />}
        Qeydiyyatdan keç
      </button>
      {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
      <p className="text-sm text-neutral-700 text-center">
        Artıq hesabınız var? <Link href="/giris" className="font-bold underline underline-offset-4">Daxil olun</Link>
      </p>
    </form>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '').trim();
    const password = String(data.get('password') ?? '');
    if (!isEmail(email)) return setError('E-poçt ünvanı düzgün deyil.');
    if (!password) return setError('Şifrəni daxil edin.');

    setBusy(true);
    setError('');
    const result = await loginUser(email, password);
    setBusy(false);
    if (!result.ok) return setError(result.error);
    router.push('/hesab');
  }

  return (
    <form onSubmit={handleSubmit} className="glass-light rounded-3xl p-6 sm:p-9 flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="lg-email" className={labelClass}>E-poçt</label>
        <input id="lg-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="lg-password" className={labelClass}>Şifrə</label>
        <input id="lg-password" name="password" type="password" required autoComplete="current-password" className={fieldClass} />
      </div>
      <button type="submit" disabled={busy} className={primaryButton}>
        {busy && <Loader2 className="w-4 h-4 animate-spin" />}
        Daxil ol
      </button>
      {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
      <p className="text-sm text-neutral-700 text-center">
        Hesabınız yoxdur? <Link href="/qeydiyyat" className="font-bold underline underline-offset-4">Qeydiyyatdan keçin</Link>
      </p>
    </form>
  );
}
