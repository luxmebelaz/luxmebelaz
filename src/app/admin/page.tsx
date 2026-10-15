import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { Loader2, Plus } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminProductTable from '@/components/admin/AdminProductTable';
import { adminCard } from '@/components/admin/styles';
import { requireAdmin } from '@/lib/admin';
import { listProductsFresh } from '@/lib/admin-data';
import { categories } from '@/lib/data/categories';

export const metadata: Metadata = { title: 'Məhsullar' };

async function AdminHome() {
  const admin = await requireAdmin();
  const { products, error } = await listProductsFresh();
  const featured = products.filter((p) => p.featured).length;
  const fresh = products.filter((p) => p.isNew).length;

  return (
    <>
      <AdminHeader email={admin.email} />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Məhsullar</h1>
            <p className="text-sm text-neutral-600 mt-1">
              Cəmi {products.length} · Ana səhifədə: {featured} · Yeni gələnlər: {fresh}
            </p>
          </div>
          <Link href="/admin/mehsullar/yeni" className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[#111] text-white text-sm font-bold hover:bg-black">
            <Plus className="w-4 h-4" /> Məhsul əlavə et
          </Link>
        </div>

        {error && <p className={`${adminCard} p-4 mb-6 text-sm text-red-700`}>{error}</p>}

        {products.length === 0 && !error ? (
          <div className={`${adminCard} p-10 text-center`}>
            <p className="font-semibold mb-1">Hələ məhsul yoxdur</p>
            <p className="text-sm text-neutral-600 mb-5">İlk məhsulu əlavə edin — saytda dərhal görünəcək.</p>
            <Link href="/admin/mehsullar/yeni" className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[#111] text-white text-sm font-bold">
              <Plus className="w-4 h-4" /> Məhsul əlavə et
            </Link>
          </div>
        ) : (
          <AdminProductTable products={products} categories={categories} />
        )}

        <section className={`${adminCard} p-5 mt-8 text-sm text-neutral-700 leading-relaxed`}>
          <h2 className="font-bold text-neutral-900 mb-2">Ana səhifə bölmələri necə işləyir?</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li><b>Ana səhifədə</b> işarəsi — məhsul ana səhifənin “Məhsullarımız” bölməsində görünür (ən çox 8). Heç biri seçilməyibsə, ən son məhsullar göstərilir.</li>
            <li><b>Yeni</b> işarəsi — məhsul ana səhifənin “Yeni gələnlər” bölməsində görünür. Heç biri seçilməyibsə, bölmə gizlənir.</li>
            <li><b>Sıra</b> — kiçik rəqəm öndə göstərilir (bərabərdirsə, ən yenisi öndə).</li>
            <li>Kateqoriya səhifələri, mağaza, axtarış və sayt xəritəsi avtomatik yenilənir.</li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin" /></div>}>
      <AdminHome />
    </Suspense>
  );
}
