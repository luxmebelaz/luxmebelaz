import React from 'react';

const badge =
  'h-8 px-2.5 rounded-md flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.25)] select-none';

// Ödəniş üsullarının sadə nişanları (Visa, Mastercard, Google Pay, Apple Pay)
export default function PaymentBadges({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Ödəniş üsulları">
      <li className={`${badge} bg-white w-14`} title="Visa">
        <span className="text-[#1a1f71] font-black italic text-[17px] tracking-tight leading-none">VISA</span>
        <span className="sr-only">Visa</span>
      </li>
      <li className={`${badge} bg-white w-14`} title="Mastercard">
        <span className="relative flex items-center" aria-hidden="true">
          <span className="w-[18px] h-[18px] rounded-full bg-[#eb001b]" />
          <span className="w-[18px] h-[18px] rounded-full bg-[#f79e1b] -ml-2 mix-blend-multiply" />
        </span>
        <span className="sr-only">Mastercard</span>
      </li>
      <li className={`${badge} bg-white w-16`} title="Google Pay">
        <span className="text-[13px] font-bold text-[#3c4043] leading-none whitespace-nowrap">
          <span className="text-[#4285f4]">G</span> Pay
        </span>
      </li>
      <li className={`${badge} bg-black w-[5.25rem]`} title="Apple Pay">
        <span className="text-[13px] font-bold text-white leading-none whitespace-nowrap">Apple Pay</span>
      </li>
    </ul>
  );
}
