import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductForm from '@/components/admin/ProductForm';
import { requireAdmin } from '@/lib/admin';
import { categories } from '@/lib/data/categories';

export const metadata: Metadata = { title: 'Yeni məhsul' };

async function NewProduct() {
  const admin = await requireAdmin();
  return (
    <>
      <AdminHeader email={admin.email} />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Yeni məhsul</h1>
        <ProductForm categories={categories} />
      </main>
    </>
  );
}

export default function NewProductPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>}>
      <NewProduct />
    </Suspense>
  );
}
