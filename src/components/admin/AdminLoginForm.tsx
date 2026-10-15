'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { loginUser, logoutUser } from '@/lib/auth';
import { adminInput, adminLabel } from './styles';

export default function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    setError('');
    const result = await loginUser(String(data.get('email') ?? ''), String(data.get('password') ?? ''));
    if (!result.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }
    // İcazəni server yoxlayır: admin deyilsə, /admin yenidən bura yönləndirir
    const res = await fetch('/api/admin/me', { cache: 'no-store' });
    if (!res.ok) {
      await logoutUser();
      setError('Bu hesabın admin panelə icazəsi yoxdur.');
      setLoading(false);
      return;
    }
    router.replace('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 flex flex-col gap-4">
      <div>
        <label htmlFor="email" className={adminLabel}>E-poçt</label>
        <input id="email" name="email" type="email" autoComplete="username" required className={adminInput} />
      </div>
      <div>
        <label htmlFor="password" className={adminLabel}>Şifrə</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={adminInput} />
      </div>
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={loading} className="h-11 rounded-full bg-[#111] text-white text-sm font-bold hover:bg-black disabled:opacity-60 inline-flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />} Daxil ol
      </button>
    </form>
  );
}
