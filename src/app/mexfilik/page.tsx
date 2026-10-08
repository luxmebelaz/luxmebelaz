import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Məxfilik siyasəti',
  description: 'LuxMebel şəxsi məlumatların toplanması, istifadəsi və qorunması siyasəti.',
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Hüquqi"
      title="Məxfilik siyasəti"
      intro="Şəxsi məlumatlarınızın məxfiliyi bizim üçün vacibdir. Bu səhifədə hansı məlumatları topladığımızı və necə istifadə etdiyimizi izah edirik."
      sections={[
        {
          heading: 'Topladığımız məlumatlar',
          paragraphs: ['Saytdan istifadə zamanı aşağıdakı məlumatları toplaya bilərik:'],
          list: [
            'Ad, soyad, telefon nömrəsi və e-poçt ünvanı (sifariş, qeydiyyat və ya əlaqə formasını doldurduqda).',
            'Çatdırılma ünvanı və sifariş məlumatları.',
            'Saytın texniki istifadəsi barədə ümumi məlumatlar (cihaz və brauzer növü).',
          ],
        },
        {
          heading: 'Məlumatlardan istifadə məqsədi',
          list: [
            'Sifarişlərin qəbulu, təsdiqi və çatdırılması.',
            'Müraciətlərə cavab verilməsi və sizinlə əlaqə saxlanılması.',
            'Xidmətin keyfiyyətinin yaxşılaşdırılması.',
          ],
        },
        {
          heading: 'Məlumatların ötürülməsi',
          paragraphs: [
            'Şəxsi məlumatlarınız üçüncü tərəflərə satılmır. Məlumatlar yalnız sifarişin icrası üçün zəruri olduqda (məsələn, çatdırılma) və ya qanunvericiliyin tələbi ilə ötürülə bilər.',
          ],
        },
        {
          heading: 'Məlumatların qorunması',
          paragraphs: ['Məlumatlarınızın icazəsiz əldə edilməsinin qarşısını almaq üçün məqsədəuyğun texniki və təşkilati tədbirlər görürük.'],
        },
        {
          heading: 'Çərəzlər və brauzer yaddaşı',
          paragraphs: [
            'Sayt səbətinizi və giriş məlumatlarınızı xatırlamaq üçün brauzerinizin yaddaşından istifadə edə bilər. Brauzer yaddaşını istənilən vaxt təmizləyə bilərsiniz.',
          ],
        },
        {
          heading: 'Hüquqlarınız',
          paragraphs: [
            `Şəxsi məlumatlarınıza giriş, onların düzəldilməsi və ya silinməsi barədə sorğu ilə bizə ${site.email} ünvanı vasitəsilə müraciət edə bilərsiniz.`,
          ],
        },
      ]}
    />
  );
}
