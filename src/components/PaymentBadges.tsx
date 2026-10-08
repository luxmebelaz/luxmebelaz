import React from 'react';

const badge =
  'h-8 px-2.5 rounded-md flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.25)] select-none whitespace-nowrap';

// Qəbul olunan kart sistemləri və rəqəmsal pul kisələri (sadələşdirilmiş nişanlar)
export default function PaymentBadges({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Ödəniş üsulları">
      <li className={`${badge} bg-white w-14`} title="Visa">
        <span className="text-[#1a1f71] font-black italic text-[17px] tracking-tight leading-none" aria-hidden="true">VISA</span>
        <span className="sr-only">Visa</span>
      </li>
      <li className={`${badge} bg-white w-14`} title="Mastercard">
        <span className="flex items-center" aria-hidden="true">
          <span className="w-[18px] h-[18px] rounded-full bg-[#eb001b]" />
          <span className="w-[18px] h-[18px] rounded-full bg-[#f79e1b] -ml-2 mix-blend-multiply" />
        </span>
        <span className="sr-only">Mastercard</span>
      </li>
      <li className={`${badge} bg-white w-14`} title="Maestro">
        <span className="flex items-center" aria-hidden="true">
          <span className="w-[18px] h-[18px] rounded-full bg-[#eb001b]" />
          <span className="w-[18px] h-[18px] rounded-full bg-[#00a2e5] -ml-2 mix-blend-multiply" />
        </span>
        <span className="sr-only">Maestro</span>
      </li>
      <li className={`${badge} bg-[#2e77bc] w-16`} title="American Express">
        <span className="text-white font-extrabold text-[11px] tracking-wide leading-none" aria-hidden="true">AMEX</span>
        <span className="sr-only">American Express</span>
      </li>
      <li className={`${badge} bg-white w-[4.75rem] gap-1.5`} title="UnionPay">
        <span className="flex" aria-hidden="true">
          <span className="w-1.5 h-4 -skew-x-12 bg-[#e21836]" />
          <span className="w-1.5 h-4 -skew-x-12 bg-[#00447c]" />
          <span className="w-1.5 h-4 -skew-x-12 bg-[#007b84]" />
        </span>
        <span className="text-[11px] font-bold text-[#1f2a44] leading-none">UnionPay</span>
      </li>
      <li className={`${badge} bg-white w-14`} title="JCB">
        <span className="text-[15px] font-black leading-none tracking-tight" aria-hidden="true">
          <span className="text-[#0e4c96]">J</span><span className="text-[#d4001a]">C</span><span className="text-[#007940]">B</span>
        </span>
        <span className="sr-only">JCB</span>
      </li>
      <li className={`${badge} bg-white w-[4.5rem] gap-1`} title="Discover">
        <span className="text-[10px] font-extrabold text-[#222] leading-none tracking-tight">DISCOV</span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#f58220]" aria-hidden="true" />
        <span className="sr-only">Discover</span>
      </li>
      <li className={`${badge} bg-white w-[4.5rem] gap-1`} title="Diners Club">
        <span className="w-4 h-4 rounded-full border-[3px] border-[#0079be]" aria-hidden="true" />
        <span className="text-[10px] font-bold text-[#0079be] leading-none">Diners</span>
      </li>
      <li className={`${badge} bg-white w-16`} title="Google Pay">
        <span className="text-[13px] font-bold text-[#3c4043] leading-none">
          <span className="text-[#4285f4]">G</span> Pay
        </span>
      </li>
      <li className={`${badge} bg-black w-[5.25rem]`} title="Apple Pay">
        <span className="text-[13px] font-bold text-white leading-none">Apple Pay</span>
      </li>
      <li className={`${badge} bg-[#1428a0] w-[5.5rem]`} title="Samsung Pay">
        <span className="text-[11px] font-bold text-white leading-none">Samsung Pay</span>
      </li>
    </ul>
  );
}
