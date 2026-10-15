'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[4/4.4] rounded-3xl overflow-hidden bg-[#b5aba0] shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
        {current && <Image src={current} alt={alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Şəkil ${i + 1}`}
              aria-pressed={i === active}
              className={`relative aspect-square rounded-xl overflow-hidden bg-[#b5aba0] border-2 transition-colors ${
                i === active ? 'border-black' : 'border-transparent hover:border-black/30'
              }`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
