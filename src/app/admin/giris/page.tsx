import type { Metadata } from 'next';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export const metadata: Metadata = { title: 'Giriş' };

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <p className="font-display text-2xl uppercase text-center mb-1">LuxMebel</p>
        <p className="text-center text-sm text-neutral-600 mb-8">İdarəetmə panelinə giriş</p>
        <AdminLoginForm />
      </div>
    </main>
  );
}
