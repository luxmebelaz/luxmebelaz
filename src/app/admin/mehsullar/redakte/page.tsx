import type { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductForm from '@/components/admin/ProductForm';
import { requireAdmin } from '@/lib/admin';
import { getProductFresh } from '@/lib/admin-data';
import { categories } from '@/lib/data/categories';

export const metadata: Metadata = { title: 'Məhsulu redaktə et' };

type SearchParams = PageProps<'/admin/mehsullar/redakte'>['searchParams'];

// Ünvan: /admin/mehsullar/redakte?slug=... (statik marşrut — kök layout-dakı usePathname prerender-də bloklanmır)
async function EditProduct({ searchParams }: { searchParams: SearchParams }) {
  const admin = await requireAdmin();
  const { slug } = await searchParams;
  if (typeof slug !== 'string' || !slug) notFound();
  const product = await getProductFresh(slug);
  if (!product) notFound();

  return (
    <>
      <AdminHeader email={admin.email} />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
        <p className="text-sm text-neutral-500 mb-6">Ünvan: /magaza/{product.slug}</p>
        <ProductForm product={product} categories={categories} />
      </main>
    </>
  );
}

export default function EditProductPage(props: PageProps<'/admin/mehsullar/redakte'>) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>}>
      <EditProduct searchParams={props.searchParams} />
    </Suspense>
  );
}
