'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, MailCheck } from 'lucide-react';
import { loginUser, registerUser, requestPasswordReset, signInWithGoogle, updatePassword } from '@/lib/auth';
import { isEmail, isPhone } from '@/lib/format';
import { fieldClass, labelClass, primaryButton, secondaryButton } from '@/components/ui';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function GoogleButton({ label, onError }: { label: string; onError: (message: string) => void }) {
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    setBusy(true);
    const result = await signInWithGoogle('/hesab');
    // Uğurlu olduqda brauzer Google-a yönləndirilir; yalnız xəta olarsa buraya qayıdırıq
    if (!result.ok) {
      setBusy(false);
      onError(result.error);
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={busy} className={`${secondaryButton} w-full !border-black/25 bg-white/50 hover:!bg-white !text-black gap-3 disabled:opacity-60`}>
      {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <GoogleIcon />}
      {label}
    </button>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-neutral-600" aria-hidden="true">
      <span className="h-px flex-1 bg-black/15" /> və ya <span className="h-px flex-1 bg-black/15" />
    </div>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState('');

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
    if (result.needsConfirmation) return setConfirmEmail(email);
    router.push('/hesab');
  }

  if (confirmEmail) {
    return (
      <div className="glass-light rounded-3xl p-8 sm:p-10 text-center">
        <MailCheck className="w-12 h-12 mx-auto mb-4 text-emerald-700" strokeWidth={1.5} />
        <h2 className="text-2xl font-bold mb-2">E-poçtunuzu təsdiqləyin</h2>
        <p className="text-neutral-700 leading-relaxed">
          <strong className="break-all">{confirmEmail}</strong> ünvanına təsdiq linki göndərdik. Linkə vurun, hesabınız aktiv olacaq. Məktub gəlmirsə, spam qovluğuna baxın.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-light rounded-3xl p-6 sm:p-9 flex flex-col gap-5" noValidate>
      <GoogleButton label="Google ilə qeydiyyat" onError={setError} />
      <Divider />
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

// Google/e-poçt təsdiqi uğursuz olduqda /giris?xeta=giris ilə qayıdılır
function CallbackNotice() {
  const params = useSearchParams();
  if (params.get('xeta') !== 'giris') return null;
  return <p role="alert" className="text-sm font-semibold text-red-700">Giriş tamamlanmadı. Yenidən cəhd edin.</p>;
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
      <GoogleButton label="Google ilə davam et" onError={setError} />
      <Divider />
      <div>
        <label htmlFor="lg-email" className={labelClass}>E-poçt</label>
        <input id="lg-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="lg-password" className={labelClass}>Şifrə</label>
          <Link href="/sifremi-unutdum" className="text-xs font-semibold underline underline-offset-2 mb-2">Şifrəni unutdum</Link>
        </div>
        <input id="lg-password" name="password" type="password" required autoComplete="current-password" className={fieldClass} />
      </div>
      <button type="submit" disabled={busy} className={primaryButton}>
        {busy && <Loader2 className="w-4 h-4 animate-spin" />}
        Daxil ol
      </button>
      <Suspense fallback={null}>
        <CallbackNotice />
      </Suspense>
      {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
      <p className="text-sm text-neutral-700 text-center">
        Hesabınız yoxdur? <Link href="/qeydiyyat" className="font-bold underline underline-offset-4">Qeydiyyatdan keçin</Link>
      </p>
    </form>
  );
}

export function ForgotForm() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('email') ?? '').trim();
    if (!isEmail(email)) return setError('E-poçt ünvanı düzgün deyil.');
    setBusy(true);
    setError('');
    const result = await requestPasswordReset(email);
    setBusy(false);
    if (!result.ok) return setError(result.error ?? 'Əməliyyat alınmadı.');
    setSentTo(email);
  }

  if (sentTo) {
    return (
      <div className="glass-light rounded-3xl p-8 sm:p-10 text-center">
        <MailCheck className="w-12 h-12 mx-auto mb-4 text-emerald-700" strokeWidth={1.5} />
        <h2 className="text-2xl font-bold mb-2">Məktub göndərildi</h2>
        <p className="text-neutral-700 leading-relaxed">
          Bu e-poçt qeydiyyatlıdırsa, <strong className="break-all">{sentTo}</strong> ünvanına şifrəni yeniləmək üçün link göndərildi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-light rounded-3xl p-6 sm:p-9 flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="fg-email" className={labelClass}>E-poçt</label>
        <input id="fg-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
      </div>
      <button type="submit" disabled={busy} className={primaryButton}>
        {busy && <Loader2 className="w-4 h-4 animate-spin" />}
        Link göndər
      </button>
      {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
      <p className="text-sm text-center"><Link href="/giris" className="font-bold underline underline-offset-4">Girişə qayıt</Link></p>
    </form>
  );
}

export function ResetForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get('password') ?? '');
    const confirm = String(data.get('confirm') ?? '');
    if (password.length < 8) return setError('Şifrə ən azı 8 simvol olmalıdır.');
    if (password !== confirm) return setError('Şifrələr üst-üstə düşmür.');
    setBusy(true);
    setError('');
    const result = await updatePassword(password);
    setBusy(false);
    if (!result.ok) return setError(result.error ?? 'Əməliyyat alınmadı.');
    router.push('/hesab');
  }

  return (
    <form onSubmit={handleSubmit} className="glass-light rounded-3xl p-6 sm:p-9 flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="rs-password" className={labelClass}>Yeni şifrə</label>
        <input id="rs-password" name="password" type="password" required minLength={8} autoComplete="new-password" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="rs-confirm" className={labelClass}>Şifrənin təkrarı</label>
        <input id="rs-confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className={fieldClass} />
      </div>
      <button type="submit" disabled={busy} className={primaryButton}>
        {busy && <Loader2 className="w-4 h-4 animate-spin" />}
        Şifrəni yenilə
      </button>
      {error && <p role="alert" className="text-sm font-semibold text-red-700">{error}</p>}
    </form>
  );
}
