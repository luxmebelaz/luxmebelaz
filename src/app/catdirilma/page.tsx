import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Çatdırılma şərtləri',
  description: 'LuxMebel çatdırılma və quraşdırma şərtləri.',
};

export default function DeliveryPage() {
  return (
    <LegalPage
      eyebrow="Dəstək"
      title="Çatdırılma şərtləri"
      intro="Sifarişinizin sizə necə çatdırıldığı və quraşdırıldığı barədə əsas məlumatlar."
      sections={[
        {
          heading: 'Sifarişin təsdiqi',
          paragraphs: [
            'Sifariş verdikdən sonra komandamız sizinlə əlaqə saxlayaraq sifarişi, ünvanı və çatdırılma vaxtını dəqiqləşdirir. Sifariş yalnız təsdiqləndikdən sonra icraya götürülür.',
          ],
        },
        {
          heading: 'Çatdırılma müddəti',
          paragraphs: [
            'Çatdırılma müddəti məhsulun stokda olub-olmamasından, sifarişin növündən (standart və ya fərdi sifariş) və ünvandan asılıdır. Dəqiq müddət sifarişin təsdiqi zamanı sizə bildirilir.',
          ],
        },
        {
          heading: 'Çatdırılma haqqı',
          paragraphs: ['Çatdırılma haqqı ünvana və məhsulun gabaritinə görə müəyyən edilir və sifariş təsdiqlənərkən sizə əvvəlcədən bildirilir.'],
        },
        {
          heading: 'Quraşdırma',
          paragraphs: [
            'Böyük gabaritli məhsulları (divan, şkaf, çarpayı və s.) komandamız yerində quraşdırır. Quraşdırma şərtləri sifarişin təsdiqi zamanı dəqiqləşdirilir.',
          ],
        },
        {
          heading: 'Məhsulun qəbulu',
          paragraphs: ['Məhsulu qəbul edərkən qablaşdırmanı və məhsulun xarici görünüşünü yoxlayın. Hər hansı zədə aşkar etsəniz, dərhal bizə bildirin.'],
          list: ['Qəbul zamanı məhsulu çatdırılma işçisi ilə birlikdə yoxlayın.', 'Zədə və ya uyğunsuzluq olarsa, fotoşəkil çəkib bizə göndərin.'],
        },
        {
          heading: 'Çatdırılma ərazisi',
          paragraphs: ['Çatdırılma imkanları ünvana görə fərdi şəkildə müzakirə olunur. Əlavə məlumat üçün bizimlə əlaqə saxlayın.'],
        },
      ]}
    />
  );
}
