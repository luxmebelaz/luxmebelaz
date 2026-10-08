import React from 'react';

const badge =
  'h-6 px-1.5 rounded flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.25)] select-none whitespace-nowrap';

// Qəbul olunan kart sistemləri və rəqəmsal pul kisələri (sadələşdirilmiş, kiçik nişanlar)
export default function PaymentBadges({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-1.5 ${className}`} aria-label="Ödəniş üsulları">
      <li className={`${badge} bg-white w-10`} title="Visa">
        <span className="text-[#1a1f71] font-black italic text-[12px] tracking-tight leading-none" aria-hidden="true">VISA</span>
        <span className="sr-only">Visa</span>
      </li>
      <li className={`${badge} bg-white w-10`} title="Mastercard">
        <span className="flex items-center" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#eb001b]" />
          <span className="w-3 h-3 rounded-full bg-[#f79e1b] -ml-1.5 mix-blend-multiply" />
        </span>
        <span className="sr-only">Mastercard</span>
      </li>
      <li className={`${badge} bg-white w-10`} title="Maestro">
        <span className="flex items-center" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#eb001b]" />
          <span className="w-3 h-3 rounded-full bg-[#00a2e5] -ml-1.5 mix-blend-multiply" />
        </span>
        <span className="sr-only">Maestro</span>
      </li>
      <li className={`${badge} bg-[#2e77bc] w-11`} title="American Express">
        <span className="text-white font-extrabold text-[8px] tracking-wide leading-none" aria-hidden="true">AMEX</span>
        <span className="sr-only">American Express</span>
      </li>
      <li className={`${badge} bg-white w-[3.4rem] gap-1`} title="UnionPay">
        <span className="flex" aria-hidden="true">
          <span className="w-1 h-3 -skew-x-12 bg-[#e21836]" />
          <span className="w-1 h-3 -skew-x-12 bg-[#00447c]" />
          <span className="w-1 h-3 -skew-x-12 bg-[#007b84]" />
        </span>
        <span className="text-[8px] font-bold text-[#1f2a44] leading-none">UnionPay</span>
      </li>
      <li className={`${badge} bg-white w-10`} title="JCB">
        <span className="text-[11px] font-black leading-none tracking-tight" aria-hidden="true">
          <span className="text-[#0e4c96]">J</span><span className="text-[#d4001a]">C</span><span className="text-[#007940]">B</span>
        </span>
        <span className="sr-only">JCB</span>
      </li>
      <li className={`${badge} bg-white w-12 gap-0.5`} title="Discover">
        <span className="text-[7px] font-extrabold text-[#222] leading-none tracking-tight">DISCOV</span>
        <span className="w-2 h-2 rounded-full bg-[#f58220]" aria-hidden="true" />
        <span className="sr-only">Discover</span>
      </li>
      <li className={`${badge} bg-white w-12 gap-0.5`} title="Diners Club">
        <span className="w-3 h-3 rounded-full border-2 border-[#0079be]" aria-hidden="true" />
        <span className="text-[8px] font-bold text-[#0079be] leading-none">Diners</span>
      </li>
      <li className={`${badge} bg-white w-12`} title="Google Pay">
        <span className="text-[10px] font-bold text-[#3c4043] leading-none">
          <span className="text-[#4285f4]">G</span> Pay
        </span>
      </li>
      <li className={`${badge} bg-black w-[3.4rem]`} title="Apple Pay">
        <span className="text-[10px] font-bold text-white leading-none">Apple Pay</span>
      </li>
    </ul>
  );
}
