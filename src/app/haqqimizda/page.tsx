import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Gem, Hammer, Handshake, Ruler, Truck, MessageSquare } from 'lucide-react';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import { images } from '@/lib/images';
import { primaryButton, secondaryButton } from '@/components/ui';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Haqqımızda',
  description: 'LuxMebel — klassik və müasir dizaynı birləşdirən mebel brendi. Fəlsəfəmiz, dəyərlərimiz və iş prosesimiz.',
};

const stats = [
  { value: '500+', label: 'Unikal model' },
  { value: '15+', label: 'İllik ustalıq' },
  { value: '99%', label: 'Məmnun müştəri' },
];

const values = [
  { icon: Gem, title: 'Keyfiyyət', text: 'Yüksək keyfiyyətli material və diqqətlə seçilmiş detallar — mebel illərlə xidmət etməlidir.' },
  { icon: Hammer, title: 'Ustalıq', text: 'Hər model təcrübəli ustaların nəzarəti altında hazırlanır, hər tikiş və birləşmə yoxlanılır.' },
  { icon: Ruler, title: 'Fərdi yanaşma', text: 'Ölçü, parça və rəng seçimi sizin məkanınıza və zövqünüzə uyğunlaşdırılır.' },
  { icon: Handshake, title: 'Etibar', text: 'Sizinlə açıq ünsiyyət: qiymət, müddət və şərtlər sifarişdən əvvəl aydın təqdim olunur.' },
];

const steps = [
  { icon: MessageSquare, title: 'Məsləhət', text: 'Tələblərinizi və otaq barədə məlumatı dinləyirik.' },
  { icon: Ruler, title: 'Dizayn və ölçü', text: 'Uyğun model seçilir, ölçülər dəqiqləşdirilir.' },
  { icon: Hammer, title: 'İstehsal', text: 'Mebel təsdiqlənmiş şərtlərə uyğun hazırlanır.' },
  { icon: Truck, title: 'Çatdırılma və quraşdırma', text: 'Komandamız mebeli ünvana çatdırır və yerində quraşdırır.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="LuxMebel Fəlsəfəsi"
        title="Haqqımızda"
        description="Rahatlığın və eleqantlığın təcəssümü: biz sadəcə mebel yaratmırıq — evinizi estetik bir incəsənət əsərinə çevirməyə kömək edirik."
        crumbs={[{ label: 'Haqqımızda' }]}
      />

      <PageSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="relative aspect-[4/3.2] rounded-3xl overflow-hidden bg-[#b5aba0] shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <Image src={images.about.story} alt="İşıqlı və səliqəli qonaq otağı" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <h2 className="font-display text-4xl md:text-5xl uppercase leading-[1.05] mb-5">Klassik zəriflik, müasir rahatlıq</h2>
            <p className="text-neutral-800 leading-relaxed mb-4">
              LuxMebel klassik və müasir üslubun mükəmməl ahəngini yaradan, komfortlu və keyfiyyətli mebellər təqdim edir.
              Kolleksiyamızda qonaq otağı divanlarından yataq otağı dəstlərinə, nahar masalarından saxlama həllərinə qədər
              evin hər guşəsi üçün seçimlər var.
            </p>
            <p className="text-neutral-800 leading-relaxed mb-8">
              Hər detal diqqətlə seçilir və fərdi yanaşma ilə hazırlanır ki, eviniz həm funksional, həm də gözəl olsun.
              İstəyiniz standart modeldən kənardırsa, fərdi sifariş imkanları ilə sizə kömək edirik.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="glass-light rounded-2xl py-5 px-2 text-center">
                  <p className="font-display text-4xl sm:text-5xl leading-none">{s.value}</p>
                  <p className="text-xs sm:text-sm font-semibold mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection className="pt-0">
        <h2 className="font-display text-4xl md:text-5xl uppercase mb-8">Dəyərlərimiz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass-light rounded-3xl p-6">
              <Icon className="w-8 h-8 mb-5" strokeWidth={1.5} />
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-sm text-neutral-700 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <section className="bg-[#141414] text-white px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#e4d093] mb-3">İş prosesi</p>
          <h2 className="font-display text-4xl md:text-6xl uppercase leading-[1.05] mb-10">Sifarişdən quraşdırmaya qədər</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="glass-dark rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <Icon className="w-7 h-7 text-[#e4d093]" strokeWidth={1.5} />
                  <span className="font-display text-3xl text-white/30">0{i + 1}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PageSection className="pt-16 md:pt-24">
        <div className="glass-light rounded-[32px] p-8 md:p-14 text-center">
          <h2 className="font-display text-4xl md:text-5xl uppercase mb-4">Gəlin birlikdə yaradaq</h2>
          <p className="text-neutral-700 max-w-xl mx-auto mb-8">
            Layihənizi bizimlə bölüşün — komandamız sizə uyğun həlli təklif etsin. VÖEN: {site.voen}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/elaqe" className={primaryButton}>Bizimlə əlaqə</Link>
            <Link href="/magaza" className={secondaryButton}>Kolleksiyaya bax</Link>
          </div>
        </div>
      </PageSection>
    </>
  );
}
