import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'İstifadə şərtləri',
  description: 'LuxMebel saytından istifadə və onlayn sifariş şərtləri.',
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Hüquqi"
      title="İstifadə şərtləri"
      intro="Saytımızdan istifadə etməklə aşağıdakı şərtlərlə razılaşmış olursunuz."
      sections={[
        {
          heading: 'Ümumi müddəalar',
          paragraphs: [
            `Bu sayt VÖEN: ${site.voen} olan LuxMebel tərəfindən idarə olunur. Saytdakı məlumatlar məhsulların və xidmətlərin təqdimatı məqsədi daşıyır.`,
          ],
        },
        {
          heading: 'Məhsul məlumatları və qiymətlər',
          paragraphs: [
            'Məhsul şəkilləri, təsvirləri və qiymətləri mümkün qədər dəqiq verilir, lakin rəng və ölçülərdə cüzi fərqlər ola bilər. Qiymətlər və stok vəziyyəti əvvəlcədən xəbərdarlıq edilmədən dəyişdirilə bilər.',
          ],
        },
        {
          heading: 'Sifariş',
          paragraphs: [
            'Saytda sifariş verilməsi sifarişin təklifi sayılır. Sifariş komandamız tərəfindən telefon və ya e-poçt vasitəsilə təsdiqləndikdən sonra qüvvəyə minir.',
          ],
        },
        {
          heading: 'Ödəniş',
          paragraphs: ['Ödəniş üsulları sifariş zamanı göstərilir. Ödənişlə bağlı əlavə şərtlər sifarişin təsdiqi zamanı razılaşdırılır.'],
        },
        {
          heading: 'Çatdırılma, zəmanət və geri qaytarma',
          paragraphs: ['Bu məsələlər “Çatdırılma şərtləri” və “Zəmanət və geri qaytarma” səhifələrində göstərilən qaydalarla tənzimlənir.'],
        },
        {
          heading: 'Hesab',
          paragraphs: ['Hesabınızın məlumatlarının və şifrənizin məxfiliyinə siz cavabdehsiniz. Hesabınızla bağlı şübhəli hal aşkar etsəniz, bizə bildirin.'],
        },
        {
          heading: 'Müəllif hüquqları',
          paragraphs: ['Saytdakı mətn, dizayn və şəkillər LuxMebel-ə və ya müvafiq hüquq sahiblərinə məxsusdur və icazəsiz istifadə oluna bilməz.'],
        },
        {
          heading: 'Şərtlərin dəyişdirilməsi',
          paragraphs: ['Bu şərtlər vaxtaşırı yenilənə bilər. Yenilənmiş şərtlər saytda dərc edildiyi andan qüvvəyə minir.'],
        },
      ]}
    />
  );
}
