import type { Metadata } from 'next';
import { ExternalLink, FileText, Mail, MapPin, Phone } from 'lucide-react';
import PageHero from '@/components/PageHero';
import PageSection from '@/components/PageSection';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Əlaqə',
  description: `LuxMebel ilə əlaqə: ${site.phone}, ${site.email}. Xəritədə ünvanımız və sorğu forması.`,
};

const cardClass = 'glass-light flex items-center gap-4 rounded-2xl p-4 sm:p-5 hover:brightness-105 transition';

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Bizimlə Əlaqə"
        title="Gəlin Danışaq"
        description="Sualınız, sifarişiniz və ya layihəniz var? Zəng edin, yazın və ya forma ilə müraciət edin."
        crumbs={[{ label: 'Əlaqə' }]}
      />

      <PageSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="flex flex-col gap-4">
            <a href={site.phoneHref} className={cardClass}>
              <span className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center shrink-0"><Phone className="w-5 h-5" /></span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-600">Telefon</span>
                <span className="block text-lg font-extrabold">{site.phone}</span>
              </span>
            </a>
            <a href={site.emailHref} className={cardClass}>
              <span className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center shrink-0"><Mail className="w-5 h-5" /></span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-600">E-poçt</span>
                <span className="block text-lg font-extrabold break-all">{site.email}</span>
              </span>
            </a>
            <a href={site.map.openUrl} target="_blank" rel="noopener noreferrer" className={cardClass}>
              <span className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center shrink-0"><MapPin className="w-5 h-5" /></span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-600">Ünvan</span>
                <span className="flex items-center gap-2 text-lg font-extrabold">Google Xəritədə aç <ExternalLink className="w-4 h-4" /></span>
              </span>
            </a>
            <div className={`${cardClass} hover:brightness-100`}>
              <span className="w-12 h-12 rounded-full bg-[#111] text-white flex items-center justify-center shrink-0"><FileText className="w-5 h-5" /></span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-600">VÖEN</span>
                <span className="block text-lg font-extrabold">{site.voen}</span>
              </span>
            </div>

            <div className="relative rounded-3xl overflow-hidden border-[3px] border-white/60 shadow-[0_18px_40px_rgba(0,0,0,0.25)] bg-[#bdbdbd] h-[320px] sm:h-[400px] mt-2">
              <iframe
                title="LuxMebel ünvanı — Google Xəritə"
                src={site.map.embedUrl}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div className="glass-light rounded-3xl p-5 sm:p-8">
            <h2 className="text-2xl font-bold mb-1">Mesaj göndərin</h2>
            <p className="text-neutral-700 text-sm mb-6">Sahələri doldurun, sizinlə əlaqə saxlayaq.</p>
            <ContactForm />
          </div>
        </div>
      </PageSection>
    </>
  );
}
