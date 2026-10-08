import React from 'react';
import Link from 'next/link';
import { Check, Mail, Phone } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { site } from '@/lib/site';

const perks = [
  'Çatdırılma və quraşdırılma',
  'Məsləhət və ölçü təklifi',
  'Fərdi sifariş və rəng seçimi',
];

export default function ContactSection() {
  return (
    <section id="elaqe" className="bg-paper text-black py-16 md:py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h4 className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 text-neutral-800">
          Bizimlə Əlaqə
        </h4>
        <h2 className="font-display text-[42px] sm:text-6xl md:text-7xl uppercase leading-none mb-10 md:mb-14">
          Gəlin Danışaq
        </h2>

        <div className="flex flex-col md:flex-row gap-10 md:gap-8">

          {/* Left Side Info */}
          <div className="flex-1 md:pr-12 flex flex-col gap-4">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3 glass-light rounded-2xl px-5 py-4">
                <Check className="w-5 h-5 text-neutral-900 shrink-0" />
                <span className="text-sm font-semibold uppercase tracking-wide text-neutral-900">{perk}</span>
              </div>
            ))}

            <a href={site.phoneHref} className="flex items-center gap-3 glass-light rounded-2xl px-5 py-4 hover:brightness-105 transition">
              <Phone className="w-5 h-5 shrink-0" />
              <span className="font-bold">{site.phone}</span>
            </a>
            <a href={site.emailHref} className="flex items-center gap-3 glass-light rounded-2xl px-5 py-4 hover:brightness-105 transition">
              <Mail className="w-5 h-5 shrink-0" />
              <span className="font-bold break-all">{site.email}</span>
            </a>

            <Link href="/elaqe" className="text-sm font-semibold underline underline-offset-4 px-1 self-start">
              Xəritə və bütün əlaqə məlumatları →
            </Link>
          </div>

          {/* Right Side Form */}
          <div className="flex-1">
            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
