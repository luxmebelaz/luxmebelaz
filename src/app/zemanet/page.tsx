import type { Metadata } from 'next';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Zəmanət və geri qaytarma',
  description: 'LuxMebel məhsullarına zəmanət və geri qaytarma qaydaları.',
};

export default function WarrantyPage() {
  return (
    <LegalPage
      eyebrow="Dəstək"
      title="Zəmanət və geri qaytarma"
      intro="Məhsullarımızın keyfiyyətinə inanırıq. Zəmanət və geri qaytarma qaydalarımız aşağıda göstərilib."
      sections={[
        {
          heading: 'Zəmanət',
          paragraphs: [
            'Mebellərimizə istehsal qüsurlarına qarşı zəmanət verilir. Zəmanət müddəti məhsulun növündən asılı olaraq müəyyən edilir və sifariş təsdiqlənərkən sizə yazılı şəkildə təqdim olunur.',
          ],
        },
        {
          heading: 'Zəmanətə aid olmayan hallar',
          list: [
            'Düzgün istifadə qaydalarına əməl edilməməsi nəticəsində yaranan zədələr.',
            'Mexaniki zədələr, yanıq, nəmlik və ya birbaşa istilik təsiri nəticəsində yaranan nasazlıqlar.',
            'Məhsulun icazəsiz təmiri və ya dəyişdirilməsi.',
            'Təbii aşınma və parça/dəri üzərində normal istifadədən yaranan dəyişikliklər.',
          ],
        },
        {
          heading: 'Zəmanət müraciəti',
          paragraphs: [
            'Qüsur aşkar etdikdə sifariş nömrəsini və problemin şəkillərini bizə göndərin. Komandamız müraciəti araşdırıb həll yolunu (təmir, dəyişdirmə və s.) təklif edəcək.',
          ],
        },
        {
          heading: 'Geri qaytarma',
          paragraphs: [
            'Geri qaytarma Azərbaycan Respublikasının istehlakçıların hüquqlarının müdafiəsi haqqında qanunvericiliyinə uyğun həyata keçirilir. Fərdi ölçü və ya xüsusi tələblə hazırlanmış sifarişlər qanunvericiliyin müəyyən etdiyi hallar istisna olmaqla geri qaytarıla bilməz.',
            'Geri qaytarma şərtləri və müddətləri sifarişi təsdiqləyərkən sizə yazılı şəkildə təqdim olunur.',
          ],
        },
      ]}
    />
  );
}
